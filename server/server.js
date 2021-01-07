const cache = require('./cache.js')
const express = require('express')
const app = express()
const path = require('path')
const conn = require('./connection.js')
const axios = require('axios')

const dailyCache = new cache.DailyCache()

function getCacheOrQueryThenSend (apiUrl, key, res, dataMunipulatorCallback) {
  if (dailyCache.isCachedDataGood(key)) {
    res.status(200).send(dailyCache.getCachedData(key))
  } else {
    axios.get(apiUrl).then(response => {
      return dataMunipulatorCallback(response)
    }).then(cleanedData => {
      dailyCache.addToCache(key, cleanedData)
      res.status(200).send(dailyCache.getCachedData(key))
    }).catch(err => {
      console.error(err)
      res.status(401).send(err)
    })
  }
}

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/api/graph/:coin/history/:time', (req, res) => {
  const coin = req.params.coin
  const time = req.params.time

  // bitcoin only atm
  getCacheOrQueryThenSend('https://api.coindesk.com/v1/bpi/historical/close.json', `graph_${coin}_${time}`, res, data => {
    const clientData = []
    for (const key in data.data.bpi) {
      clientData.push({
        y: data.data.bpi[key],
        x: key
      })
    }
    return clientData
  })
})

app.get('/api/assets', (req, res) => {
  getCacheOrQueryThenSend('https://api.cryptowat.ch/assets', 'assets', res, data => {
    let assets = data.data.result

    // git rid of some fields
    assets = assets.map(row => {
      return { orig_id: row.id, symbol: row.symbol, name: row.name }
    })

    // alphabatize and return
    return assets.sort((a, b) => {
      const smybolA = a.symbol.toUpperCase()
      const smybolB = b.symbol.toUpperCase()

      if (smybolA < smybolB) {
        return -1
      }

      if (smybolA > smybolB) {
        return 1
      }

      return 0
    })
  })
})

app.get('/api/info/:asset', (req, res) => {
  // currently only supporting USD and binance
  const asset = req.params.asset
  const currency = 'usd'
  const market = 'binance-us'
  const coinInfo = {}

  const baseApiEndpoint = 'https://api.cryptowat.ch/markets'
  const priceApiEndpoint = `${baseApiEndpoint}/${market}/${asset}${currency}/price`
  const ohlcApiEndpoint = `${baseApiEndpoint}/${market}/${asset}${currency}/ohlc`

  axios.get(priceApiEndpoint).then(priceResponse => {
    // get price
    if (priceResponse.data.result === undefined) {
      throw new Error(`Error getting price for ${asset} at ${market}.`)
    }

    return priceResponse.data.result.price
  }).then(price => {
    coinInfo.price = price

    return axios.get(ohlcApiEndpoint)
  }).then(ohlcResponse => {
    // get ohlc candlesticks
    if (ohlcResponse.data.result === undefined) {
      throw new Error(`Error getting OHLC for ${asset} at ${market}.`)
    }

    return ohlcResponse.data.result
  }).then(ohlcData => {
    // save to cache and send to client
    coinInfo.ohlc = ohlcData
    dailyCache.addToCache(`info_${asset}`, coinInfo)

    res.status(200).send(dailyCache.getCachedData(`info_${asset}`))
  }).catch(err => {
    console.error(`Error in /api/info/asset: ${err}`)
    res.status(401).send(err)
  })
})

app.listen(conn.expressPort, () => {
  console.log(`App listening on ${conn.expressPort}`)
})
