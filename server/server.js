const cache = require('./cache.js')
const express = require('express')
const compression = require('compression')
const app = express()
const path = require('path')
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

app.use(compression())
app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/api/pairinfo/:pair', (req, res) => {
  const pair = req.params.pair

  getCacheOrQueryThenSend(`https://api.cryptowat.ch/pairs/${pair}`, `pairinfo_${pair}`, res, data => {
    const row = data.data.result.base
    return { name: row.name, symbol: row.symbol }
  })
})

app.get('/api/markets/:currency', (req, res) => {
  const currency = req.params.currency

  getCacheOrQueryThenSend('https://api.cryptowat.ch/markets', 'markets', res, data => {
    const marketsObj = {}

    // condense and prevent duplicate exchange names
    data.data.result.forEach(row => {
      // only add if it contains currency
      if (row.pair.search(currency) >= 0) {
        const pair = { pair: row.pair, route: row.route }

        if (marketsObj[row.exchange] === undefined) {
          marketsObj[row.exchange] = [pair]
        } else {
          marketsObj[row.exchange].push(pair)
        }
      }
    })

    // turn into an array
    const marketsArr = []
    for (const key in marketsObj) {
      marketsArr.push({ exchange: key, pairs: marketsObj[key] })
    }

    // sort alphabetically
    return marketsArr.sort((a, b) => {
      const smybolA = a.exchange.toUpperCase()
      const smybolB = b.exchange.toUpperCase()

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

app.get('/api/info/:market/:asset/:currency', (req, res) => {
  const asset = req.params.asset
  const market = req.params.market
  const coinInfo = {}

  const baseApiEndpoint = 'https://api.cryptowat.ch/markets'
  const priceApiEndpoint = `${baseApiEndpoint}/${market}/${asset}/price`
  const ohlcApiEndpoint = `${baseApiEndpoint}/${market}/${asset}/ohlc`

  if (dailyCache.isCachedDataGood(`info_${asset}_${market}`)) {
    res.status(200).send(dailyCache.getCachedData(`info_${asset}_${market}`))
  } else {
    axios.get(priceApiEndpoint).then(priceResponse => {
      // price
      if (priceResponse.data.result === undefined) {
        throw new Error(`Error getting price for ${asset} at ${market}.`)
      }

      return priceResponse.data.result.price
    }).then(price => {
      coinInfo.price = price
      return axios.get(ohlcApiEndpoint)
    }).then(ohlcResponse => {
      // ohlc candlesticks
      if (ohlcResponse.data.result === undefined) {
        throw new Error(`Error getting OHLC for ${asset} at ${market}.`)
      }

      return ohlcResponse.data.result
    }).then(ohlcData => {
      // cache and respond
      coinInfo.ohlc = ohlcData
      dailyCache.addToCache(`info_${asset}_${market}`, coinInfo)
      res.status(200).send(dailyCache.getCachedData(`info_${asset}_${market}`))
    }).catch(err => {
      console.error(`Error in /api/info/asset: ${err}`)
      res.status(401).send(err)
    })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on ${process.env.PORT || 3000}`)
})
