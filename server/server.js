const express = require('express')
const app = express()
const path = require('path')
const conn = require('./connection.js')
const axios = require('axios')
const helpers = require('./helpers.js')

const cache = {}

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/api/coins/:coin/history/:time', (req, res) => {
  const coin = req.params.coin
  const time = req.params.time

  if (time === 'all' && coin === 'btc') {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then(data => {
      res.status(200).send(data.data.bpi)
    }).catch(err => {
      console.error(err)
    })
  }
})

app.listen(conn.expressPort, () => {
  console.log(`App listening on ${conn.expressPort}`)
})
