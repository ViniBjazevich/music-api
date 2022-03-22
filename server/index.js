const express = require('express')
const {createConnection, endConnection} = require('../database/index')
const app = express()
const cors = require('cors')
const { response } = require('express')
const port = 5002

app.use(cors())
app.use(express.json())


app.get('/allProjects', async (req, res) => {
  const db = await createConnection()
  const query = `SELECT * FROM projects`

  try {
    const results = await db.query(query)

    res.send(results.rows)
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})

app.get('/projectByGenre/:genre', async (req, res) => {
  const db = await createConnection();
  const {genre} = req.params;
  const query = `SELECT * FROM projects WHERE genre = '${genre}'`

  try {
    const results = await db.query(query)

    res.send(results.rows)
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})

app.get('/allArtistsInGenre/:genre', async (req, res) => {
  const db = await createConnection();
  const {genre} = req.params;
  const query = `SELECT DISTINCT artist FROM projects WHERE genre = '${genre}';`

  try {
    const results = await db.query(query)

    res.send(results.rows)
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})


app.get('/projectsByArtist/:artist', async (req, res) => {
  const db = await createConnection();
  let {artist} = req.params;
  artist = artist.replace(/\'/g,`''`)
  const query = `SELECT * FROM projects WHERE artist = '${artist}'`

  try {
    const results = await db.query(query)

    res.send(results.rows)
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})


app.get('/:name/:artist', async (req, res) => {
  const db = await createConnection();
  let {name, artist} = req.params;
  let query;

  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

  if (name === 'empty' && artist === 'empty') {
    query = `SELECT * FROM projects`
  } else if (name === 'empty') {
    query = `SELECT * FROM projects WHERE artist = '${artist}'`
  } else if (artist === 'empty') {
    query = `SELECT * FROM projects WHERE name = '${name}'`
  } else {
    query = `SELECT * FROM projects WHERE name = '${name}' AND artist = '${artist}'`
  }

  try {
    const results = await db.query(query)

    res.send(results.rows)
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})


app.post('/', async (req, res) => {
  const db = await createConnection();
  let {name, artist, riaa, first_week_sales, release_date, streams, genre, project_type} = req.body;

  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

  const getIdQuery = 'SELECT id FROM projects ORDER BY id DESC LIMIT 1'

  try {
    const IDResponse = await db.query(getIdQuery)
    const id = IDResponse?.rows[0]?.id + 1;

    const insertQuery = `INSERT INTO projects
      (id, name, artist, riaa, first_week_sales, streams, release_date, genre, project_type)
      VALUES (${id}, '${name}', '${artist}', ${riaa}, ${first_week_sales}, ${streams}, ${release_date}, '${genre}', '${project_type}')`

    const results = await db.query(insertQuery)

    res.send(`${name} by ${artist} was successfully added to the database.`)
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})


app.put('/:id', async (req, res) => {
  const db = await createConnection();
  let {name, artist, riaa, first_week_sales, release_date, streams, genre, project_type} = req.body;
  const {id} = req.params;

  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

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
                    id = ${id}`

  try {
    const results = await db.query(query)

    res.send(`${name} by ${artist} was successfully updated in the database.`)
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})


app.delete('/:id', async (req, res) => {
  const db = await createConnection();
  const {id} = req.params;
  const query = `DELETE FROM projects WHERE id = ${id}`

  try {
    const results = await db.query(query)

    res.send('Project successfully deleted from the database.')
  } catch (e) {
    console.error(e.stack)
    res.send(e.stack)
  }

  endConnection(db)
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})