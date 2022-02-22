const { Pool, Client } = require("pg");

const elephantSQLCredentials = {
  user: "gevrofht",
  host: "kashin.db.elephantsql.com",
  database: "gevrofht",
  password: "i40NAvdQRdWeCchb1FLulR5naQH2y-EF",
  port: 5432,
}

function createConnection() {
  return pool = new Pool(elephantSQLCredentials);
}

async function endConnection(pool) {
  await pool.end
}

module.exports = {
  createConnection,
  endConnection
};