const cache = require('./cache.js')
const express = require('express')
const app = express()
const path = require('path')
const conn = require('./connection.js')
const axios = require('axios')

const dailyCache = new cache.DailyCache()

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/api/graph/:coin/history/:time', (req, res) => {
  const coin = req.params.coin
  const time = req.params.time

  if (dailyCache.isCachedDataGood(`${coin}_${time}`)) {
    res.status(200).send(dailyCache.getCachedData(`${coin}_${time}`))
  } else {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then(response => {
      const clientData = []

      for (const key in response.data.bpi) {
        clientData.push({
          y: response.data.bpi[key],
          x: key
        })
      }

      dailyCache.addToCache(`${coin}_${time}`, clientData)

      res.status(200).send(dailyCache.getCachedData(`${coin}_${time}`))
    }).catch(err => {
      console.error(err)
    })
  }
})

app.listen(conn.expressPort, () => {
  console.log(`App listening on ${conn.expressPort}`)
})
