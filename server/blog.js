const { createConnection, endConnection } = require("../database/index");

async function addBlog(req, res) {
  const { blog, sections } = req.body;
  const db = await createConnection();

  const insertBlog = `INSERT INTO blogs (title, date, image, description)
    VALUES ('${blog.title}', '${blog.date}', '${blog.image}', '${blog.description}')
    RETURNING id;`;

  try {
    const result = await db.query(insertBlog);
    const blog_id = result.rows[0].id;

    sections.forEach(async (section, index) => {
      section = section.replace(/\'/g, `''`);
      const insertSection = `INSERT INTO blog_sections (info, position, blog_id)
        VALUES ('${section}', ${index}, ${blog_id});`;

      await db.query(insertSection);
    });

    res.send(`${blog.title} was successfully added to the database.`);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

async function getAllBlogs(req, res) {
  const db = await createConnection();
  const query = `SELECT * FROM blogs;`;

  try {
    const result = await db.query(query);

    res.send(result.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

async function getBlogSections(req, res) {
  const { id } = req.params;
  const db = await createConnection();
  const query = `SELECT * FROM blog_sections
    WHERE blog_id = ${id};`;

  try {
    const result = await db.query(query);

    res.send(result.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

async function deleteBlog(req, res) {
  const { id } = req.params;
  const db = await createConnection();
  const deleteBlogSections = `DELETE FROM blog_sections
    WHERE blog_id = ${id};`;
  const deleteBlog = `DELETE FROM blogs
    WHERE id = ${id};`;

  try {
    await db.query(deleteBlogSections);
    await db.query(deleteBlog);

    res.send('Blog successfully deleted');
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogSections,
  deleteBlog
};
