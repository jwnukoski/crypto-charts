const express = require('express')
const compression = require('compression')
const app = express()
const path = require('path')
const cors = require('cors')

require('dotenv').config()

app.use(cors({
  origin: [`${process.env.REACT_APP_WEB_URL}:${process.env.REACT_APP_WEB_PORT}`,
          `${process.env.REACT_APP_WEB_URL}:${process.env.REACT_APP_API_PORT}`,
          `${process.env.REACT_APP_WEB_URL}:${process.env.CACHE_DB_PORT}`]
}))

app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))

// Port shouldn't matter, since its mapped in docker-compose
app.listen(3001, () => {
  console.log('Server started on 3001')
})
