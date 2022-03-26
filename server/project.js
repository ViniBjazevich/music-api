const { createConnection, endConnection } = require("../database/index");

// --------------------------  GET REQUESTS -----------------------------

async function getAllProjects(req, res) {
  const db = await createConnection();
  const query = `SELECT * FROM projects`;

  try {
    const results = await db.query(query);

    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

async function getProjectsByArtist(req, res) {
  const db = await createConnection();
  let { artist } = req.params;
  artist = artist.replace(/\'/g, `''`);
  const query = `SELECT * FROM projects WHERE artist = '${artist}'`;

  try {
    const results = await db.query(query);

    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

async function getProjectsByGenre(req, res) {
  const db = await createConnection();
  const { genre } = req.params;
  const query = `SELECT * FROM projects WHERE genre = '${genre}'`;

  try {
    const results = await db.query(query);

    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

async function getAllArtistsInGenre(req, res) {
  const db = await createConnection();
  const { genre } = req.params;
  const query = `SELECT DISTINCT artist FROM projects WHERE genre = '${genre}';`;

  try {
    const results = await db.query(query);

    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

async function searchProjectsByNameAndArtist(req, res) {
  const db = await createConnection();
  let { name, artist } = req.params;
  let query;

  name = name.replace(/\'/g, `''`);
  artist = artist.replace(/\'/g, `''`);

  if (name === "empty" && artist === "empty") {
    query = `SELECT * FROM projects`;
  } else if (name === "empty") {
    query = `SELECT * FROM projects WHERE artist = '${artist}'`;
  } else if (artist === "empty") {
    query = `SELECT * FROM projects WHERE name = '${name}'`;
  } else {
    query = `SELECT * FROM projects WHERE name = '${name}' AND artist = '${artist}'`;
  }

  try {
    const results = await db.query(query);

    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

module.exports = {
  getAllProjects,
  getAllArtistsInGenre,
  getProjectsByArtist,
  getProjectsByGenre,
  searchProjectsByNameAndArtist,
};
