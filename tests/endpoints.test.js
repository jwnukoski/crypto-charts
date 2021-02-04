/* eslint-disable no-undef */
const request = require('supertest')('http://localhost:3000')

describe('/api/pairinfo/:pair', () => {
  it('Should fetch name and symbol from Binance for Bitcoin when given the pair btcusdt', (done) => {
    request.get('/api/pairinfo/btcusdt').expect(200).expect((res) => {
      expect(res.body.val.name).toEqual('Bitcoin')
      expect(res.body.val.symbol).toEqual('btc')
    }).end(done)
  })
})

describe('/api/markets/:currency', () => {
  it('Should contain multiple exchanges for btc', (done) => {
    request.get('/api/markets/btc').expect(200).expect((res) => {
      expect(res.body.val.length).toBeGreaterThan(0)
    }).end(done)
  })

  it('Should return binance as an exchange for for btc', (done) => {
    request.get('/api/markets/btc').expect(200).expect((res) => {
      let found = false

      for (let i = 0; i < res.body.val.length; i++) {
        if (res.body.val[i].exchange === 'binance') {
          found = true
          break
        }
      }

      expect(found).toBeTruthy()
    }).end(done)
  })
})

describe('/api/info/:market/:asset/:currency', () => {
  it('Should contain 1 data set for: /api/info/binance/btcusdt/usd', (done) => {
    request.get('/api/info/binance/btcusdt/usd').expect(200).expect((res) => {
      expect(!Array.isArray(res.body.val) || res.body.val.length === 1).toBeTruthy()
    }).end(done)
  })

  it('Should contain price and ohlc for /api/info/binance/btcusdt/usd', (done) => {
    request.get('/api/info/binance/btcusdt/usd').expect(200).expect((res) => {
      let found = false

      if (res.body.val.price && res.body.val.ohlc) {
        found = true
      }

      expect(found).toBeTruthy()
    }).end(done)
  })
})
