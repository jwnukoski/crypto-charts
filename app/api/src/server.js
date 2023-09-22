const cache = require('./cache.js')
const express = require('express')
const compression = require('compression')
const app = express()
const path = require('path')
const axios = require('axios')
const cors = require('cors')

require('dotenv').config()

const dailyCache = new cache.DailyCache()

function getCacheOrQueryThenSend (apiUrl, key, res, dataMunipulatorCallback) {
  return dailyCache.getCachedData(key).then((val) => {
    if (val !== null) {
      res.status(200).send(val)
      return true
    } else {
      return axios.get(apiUrl).then(response => {
        return dataMunipulatorCallback(response)
      }).then(cleanedData => {
        return dailyCache.addToCache(key, cleanedData)
      }).then(() => {
        return dailyCache.getCachedData(key)
      }).then((val) => {
        res.status(200).send(val)
        return true
      }).catch(err => {
        console.error(err)
        res.status(401).send(err)
        return false
      })
    }
  })
}

app.use(cors({
  origin: [`${process.env.REACT_APP_WEB_URL}:${process.env.REACT_APP_WEB_PORT}`,
          `${process.env.REACT_APP_WEB_URL}:${process.env.REACT_APP_API_PORT}`,
          `${process.env.REACT_APP_WEB_URL}:${process.env.CACHE_DB_PORT}`]
}))

app.use(compression())
app.use(express.static(path.join(__dirname, '../build')))

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
  const pair = req.params.market
  const coinInfo = {}

  const baseApiEndpoint = 'https://api.cryptowat.ch/markets'
  const priceApiEndpoint = `${baseApiEndpoint}/${pair}/${asset}/price`
  const ohlcApiEndpoint = `${baseApiEndpoint}/${pair}/${asset}/ohlc`

  dailyCache.getCachedData(`info_${asset}_${pair}`).then(data => {
    if (data !== null) {
      return data
    } else {
      return axios.get(priceApiEndpoint).then(priceResponse => {
        // price
        if (priceResponse.data.result === undefined) {
          throw new Error(`Error getting price for ${asset} at ${pair}.`)
        }

        return priceResponse.data.result.price
      }).then(price => {
        coinInfo.price = price
        return axios.get(ohlcApiEndpoint)
      }).then(ohlcResponse => {
        // ohlc candlesticks
        if (ohlcResponse.data.result === undefined) {
          throw new Error(`Error getting OHLC for ${asset} at ${pair}.`)
        }

        return ohlcResponse.data.result
      }).then(ohlcData => {
        // cache and respond
        coinInfo.ohlc = ohlcData
        return dailyCache.addToCache(`info_${asset}_${pair}`, coinInfo)
      }).then(() => {
        return dailyCache.getCachedData(`info_${asset}_${pair}`)
      }).catch(err => {
        console.error(`Error in /api/info/asset: ${err}`)
        res.status(401).send(err)
      })
    }
  }).then(cachedData => {
    if (cachedData !== null) {
      res.status(200).send(cachedData)
    } else {
      res.status(400).send('Error getting API data')
    }
  })
})

// Port doesn't matter. Only the frontend will ever use this api. Mapped in docker-compose.
app.listen(3000, () => {
  console.log(`Server started on 3000`)
})
