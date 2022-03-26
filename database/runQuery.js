const { Pool } = require("pg");
const queries = require("./queries")

const connectionString = `postgresql://vini:cSgX65Afh5XGSm92bNsQnQ@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dvanzari-2603`;

const pool = new Pool({
  connectionString,
  allowExitOnIdle: true,
});

async function runQuery(query, secondQuery) {
  const db = await pool.connect();
  const results = await db.query(query);
  console.log(results.rows);

  if (secondQuery) {
    console.log('----------------------------------------')
    const blogId = results.rows[14].id;
    const insertBlogSection = `INSERT INTO blog_sections (info, position, blog_id)
    VALUES ('Paragraph 4 goes here', 4, ${blogId});`;
    const deleteBlogSection = `DELETE FROM blog_sections WHERE blog_id = ${blogId}`;
    const results2 = await db.query(insertBlogSection);
    console.log(results2.rows)
  }
  db.release();
}

// runQuery(queries.joinBlogAndBlogSections);
// runQuery('Select * from blogs',true);
// runQuery(queries.insertBlog)

runQuery(`SELECT * FROM blog_sections
    WHERE blog_id = 747762719886114817`);



