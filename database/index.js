const { Pool, Client } = require("pg");

const elephantSQLCredentials = {
  user: "gevrofht",
  host: "kashin.db.elephantsql.com",
  database: "gevrofht",
  password: "i40NAvdQRdWeCchb1FLulR5naQH2y-EF",
  port: 5432,
}

const pool = new Pool(elephantSQLCredentials);

module.exports = pool;