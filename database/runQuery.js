const { Pool } = require("pg");

const connectionString = `postgresql://vini:cSgX65Afh5XGSm92bNsQnQ@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dvanzari-2603`;

const pool = new Pool({
  connectionString,
  allowExitOnIdle: true,
});

const createTableQuery = `CREATE TABLE projects (
    id serial PRIMARY KEY,
    name VARCHAR ( 150 ),
    first_week_sales INT,
    riaa NUMERIC,
    release_date INT,
    streams INT,
    genre VARCHAR ( 50 ),
    artist VARCHAR ( 100 ),
    project_type VARCHAR ( 100 )
)`;

const dropTableQuery = `DROP TABLE IF EXISTS projects`;

const selectQuery = `SELECT * FROM projects`;

const insertQuery = `INSERT INTO projects (name, first_week_sales, riaa, release_date, streams, genre, artist, project_type)
    VALUES ('Boss', 1000000, 2, 2022, 12312312, 'Rap', 'Vini', 'Studio Album');`;

const deleteQuery = `DELETE FROM projects WHERE artist = 'Vini';`;

async function runQuery(query) {
  const db = await pool.connect();
  const results = await db.query(query);
  console.log(results.rows.length);
  db.release();
}

runQuery(selectQuery);
