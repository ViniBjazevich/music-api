const { createConnection, endConnection } = require("../database/index");

async function addBlog(req, res) {
  const { blog, sections } = req.body;
  const db = await createConnection();
  console.log('Add blog was hit')

  const insertBlog = `INSERT INTO blogs (title, date, image, description)
    VALUES ('${blog.title}', '${blog.date}', '${blog.image}', '${blog.description}')
    RETURNING id;`;

  console.log(insertBlog)

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

module.exports = {
  addBlog,
};

// const AlmasData = {
//     blog: {
//         title: 'Blog title'
//         date: '1997-07-30',
//         img: 'urlToImage',
//         description: 'something'
//     },
//     sections: [
//         '<div>First paragraph HTML</div>',
//         'Eminem',
//         '<div>Second paragraph HTML</div>',
//         '<div>Third paragraph HTML</div>',
//     ]
// }
