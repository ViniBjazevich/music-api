const { Pool } = require("pg");
const queries = require("./queries")

const connectionString = `postgresql://vini:cSgX65Afh5XGSm92bNsQnQ@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dvanzari-2603`;

const pool = new Pool({
  connectionString,
  allowExitOnIdle: true,
});

async function runQuery(query) {
  const db = await pool.connect();
  const results = await db.query(query);
  console.log(results.rows);

  db.release();
}

// runQuery(`INSERT INTO blogs (title, date, image, description)
//     VALUES ('Eminem is the best', '2022-05-13', 'https://www.billboard.com/wp-content/uploads/2020/04/eminem-press-photo-2019-aqu-billboard-1548-1587659998.jpg?w=1024', 'Article about Eminem')
//     RETURNING id;`);

runQuery(`Select * from blogs`)



