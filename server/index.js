const express = require('express')
const db = require('../database/index')
const app = express()
const cors = require('cors')
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/db', (req, res) => {
  db
    .query("SELECT * FROM project")
    .then(response => res.send(response.rows))
    .catch(e => {
      console.error(e.stack)
      res.send(e.stack)
    })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})