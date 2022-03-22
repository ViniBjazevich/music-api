const { Pool } = require("pg");

const connectionString = `postgresql://vini:cSgX65Afh5XGSm92bNsQnQ@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dvanzari-2603`;

async function createConnection() {
  const pool = new Pool({
    connectionString,
    allowExitOnIdle: true,
  });
  return await pool.connect();
}

function endConnection(db) {
  db.release();
}

module.exports = {
  createConnection,
  endConnection,
};
