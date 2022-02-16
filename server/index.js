const express = require('express')
const db = require('../database/index')
const app = express()
const cors = require('cors')
const { response } = require('express')
const port = 5000

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  const query = `SELECT * FROM project`

  db
    .query(query)
    .then(data => res.send(data.rows))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})


app.get('/:genre'), (req, res) => {
  const {genre} = req.params;
  const query = `SELECT * FROM project WHERE genre = '${genre}'`

  db
    .query(query)
    .then(data => res.send(data.rows))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
}


app.get('/:name/:artist', (req, res) => {
  let {name, artist} = req.params;
  let query;

  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

  if (name === 'empty' && artist === 'empty') {
    query = `SELECT * FROM project`
  } else if (name === 'empty') {
    query = `SELECT * FROM project WHERE artist = '${artist}'`
  } else if (artist === 'empty') {
    query = `SELECT * FROM project WHERE name = '${name}'`
  } else {
    query = `SELECT * FROM project WHERE name = '${name}' AND artist = '${artist}'`
  }

  db
    .query(query)
    .then(data => res.send(data.rows))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})


app.post('/', (req, res) => {
  let {name, artist, riaa, first_week_sales, release_date, streams, genre, project_type} = req.body;

  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

  const query = `INSERT INTO project
    (name, artist, riaa, first_week_sales, streams, release_date, genre, project_type)
    VALUES ('${name}', '${artist}', ${riaa}, ${first_week_sales}, ${streams}, ${release_date}, '${genre}', '${project_type}')`

  db
    .query(query)
    .then(data => res.send(`${name} by ${artist} was successfully added to the database.`))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})


app.put('/:id', (req, res) => {
  let {name, artist, riaa, first_week_sales, release_date, streams, genre, project_type} = req.body;
  const {id} = req.params;

  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

  const query = `UPDATE project
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

  db
    .query(query)
    .then(data => res.send(`${name} by ${artist} was successfully updated in the database.`))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})


app.delete('/:id', (req, res) => {
  const {id} = req.params;

  db
    .query(`DELETE FROM project WHERE id = ${id}`)
    .then(data => res.send(`Project successfully deleted from the database.`))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})