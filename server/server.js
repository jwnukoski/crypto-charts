const express = require('express')
const app = express()
const path = require('path')
const conn = require('./connection.js')

app.use(express.static(path.join(__dirname, '../client/dist')))

app.listen(conn.expressPort, () => {
  console.log(`App listening on ${conn.expressPort}`)
})
