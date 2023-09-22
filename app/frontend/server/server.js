const express = require('express')
const compression = require('compression')
const app = express()
const path = require('path')

require('dotenv').config()

app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))

// Port shouldn't matter, since its mapped in docker-compose
app.listen(3001, () => {
  console.log('Server started on 3001')
})
