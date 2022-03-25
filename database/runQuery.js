const { Pool } = require("pg");

const connectionString = `postgresql://vini:cSgX65Afh5XGSm92bNsQnQ@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dvanzari-2603`;

const pool = new Pool({
  connectionString,
  allowExitOnIdle: true,
});

async function runQuery(query) {
  const db = await pool.connect();
  const results = await db.query(query);
  console.log(results.rows.length);
  db.release();
}

runQuery(selectQuery);
