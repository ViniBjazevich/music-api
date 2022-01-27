const express = require('express')
const db = require('../database/index')
const app = express()
const cors = require('cors')
const { response } = require('express')
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  db
    .query("SELECT * FROM project")
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

  db
    .query(`INSERT INTO project (name, artist, riaa, first_week_sales, streams, release_date, genre, project_type)
    VALUES ('${name}', '${artist}', ${riaa}, ${first_week_sales}, ${streams}, ${release_date}, '${genre}', '${project_type}')`)
    .then(data => res.send(`${name} by ${artist} was successfully added to the database.`))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})

app.put('/', (req, res) => {
  let {name, artist, riaa, first_week_sales, release_date, streams, genre, project_type} = req.body;
  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

  db
    .query(`INSERT INTO project (name, artist, riaa, first_week_sales, streams, release_date, genre, project_type)
    VALUES ('${name}', '${artist}', ${riaa}, ${first_week_sales}, ${streams}, ${release_date}, '${genre}', '${project_type}')`)
    .then(data => res.send(`${name} by ${artist} was successfully added to the database.`))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})

app.delete('/', (req, res) => {
  let {name, artist, riaa, first_week_sales, release_date, streams, genre, project_type} = req.body;
  name = name.replace(/\'/g,`''`)
  artist = artist.replace(/\'/g,`''`)

  db
    .query(`DELETE FROM project WHERE artist = '${artist}' AND name = '${name}'`)
    .then(data => res.send(`${name} by ${artist} was successfully deleted from the database.`))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})