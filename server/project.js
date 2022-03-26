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

// --------------------------  POST REQUESTS -----------------------------

async function insertProject(req, res) {
  const db = await createConnection();
  let {
    name,
    artist,
    riaa,
    first_week_sales,
    release_date,
    streams,
    genre,
    project_type,
  } = req.body;

  name = name.replace(/\'/g, `''`);
  artist = artist.replace(/\'/g, `''`);

  try {
    const insertQuery = `INSERT INTO projects
      (name, artist, riaa, first_week_sales, streams, release_date, genre, project_type)
      VALUES ('${name}', '${artist}', ${riaa}, ${first_week_sales}, ${streams}, ${release_date}, '${genre}', '${project_type}')`;

    const results = await db.query(insertQuery);

    res.send(`${name} by ${artist} was successfully added to the database.`);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

// --------------------------  PUT REQUESTS -----------------------------

async function updateProject(req, res) {
  const db = await createConnection();
  let {
    name,
    artist,
    riaa,
    first_week_sales,
    release_date,
    streams,
    genre,
    project_type,
  } = req.body;
  const { id } = req.params;

  name = name.replace(/\'/g, `''`);
  artist = artist.replace(/\'/g, `''`);

  const query = `UPDATE projects
                  SET
                    name = '${name}',
                    artist = '${artist}',
                    riaa = '${riaa}',
                    first_week_sales = '${first_week_sales}',
                    streams = '${streams}',
                    release_date = '${release_date}',
                    genre = '${genre}',
                    project_type = '${project_type}'
                  WHERE
                    id = ${id}`;

  try {
    const results = await db.query(query);

    res.send(`${name} by ${artist} was successfully updated in the database.`);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }

  endConnection(db);
}

// --------------------------  DELETE REQUESTS -----------------------------

async function deleteProject(req, res) {
  const db = await createConnection();
  const { id } = req.params;
  const query = `DELETE FROM projects WHERE id = ${id}`;

  try {
    const results = await db.query(query);

    res.send("Project successfully deleted from the database.");
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
  insertProject,
  updateProject,
  deleteProject,
};
