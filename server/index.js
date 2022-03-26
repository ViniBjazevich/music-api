const express = require("express");
const { createConnection, endConnection } = require("../database/index");
const app = express();
const cors = require("cors");
const { response } = require("express");
const port = 5002;

app.use(cors());
app.use(express.json());

const {
  getAllProjects,
  getProjectsByArtist,
  getProjectsByGenre,
  getAllArtistsInGenre,
  searchProjectsByNameAndArtist,
} = require("./project");
const { addBlog, getAllBlogs, getBlogSections } = require("./blog");

app.get("/allProjects", getAllProjects);

app.get("/projectByGenre/:genre", getProjectsByGenre);

app.get("/allArtistsInGenre/:genre", getAllArtistsInGenre);

app.get("/projectsByArtist/:artist", getProjectsByArtist);

app.get("/searchProjects/:name/:artist", searchProjectsByNameAndArtist);

app.post("/", async (req, res) => {
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
});

app.put("/:id", async (req, res) => {
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
});

app.delete("/:id", async (req, res) => {
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
});


app.get("/blog", getAllBlogs);

app.post("/blog", addBlog);

app.get("/sections/:id", getBlogSections);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
