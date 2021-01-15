import React, { useState, useEffect } from 'react'
import styles from './css/app.module.css'
import Nav from './nav/nav.jsx'
import Assets from './assets/assets.jsx'
import Graph from './graph/graph.jsx'
import Markets from './markets/markets.jsx'
const conn = require('./connection.js')
const axios = require('axios')

function App () {
  // coins states
  const [graphOptions, setGraphOptions] = useState({})
  const [markets, setMarkets] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [currency, setCurrency] = useState('usd')
  const [assetPrice, setAssetPrice] = useState(0)

  // TODO:
  const [period, setPeriod] = useState(604800)
  // 604800 1 week, 259200 3 days
  // https://docs.cryptowat.ch/rest-api/markets/ohlc

  function setMarket (index) {
    if (markets[index] !== undefined) {
      setSelectedMarket(index)
    }
  }

  function cleanGraphData (data, niceName = '') {
    const formattedDataPoints = []

    data[period].forEach(row => {
      // close time is in unix time
      const closeTime = new Date(row[0] * 1000)
      const closePrice = row[4]
      formattedDataPoints.push({ x: closeTime, y: closePrice })
    })

    setGraphOptions({
      theme: 'light2',
      title: {
        text: `${markets[selectedMarket].exchange}: ${niceName}`
      },
      axisX: {
        text: 'timeline',
        gridThickness: 2
      },
      axisY: {
        title: 'Price in USD',
        prefix: '$'
      },
      data: [{
        type: 'line',
        xValueType: 'dateTime',
        yValueFormatString: '$#,##0.00',
        dataPoints: formattedDataPoints
      }]
    })
  }

  function getInfo (pair, market, niceName = '') {
    axios.get(`/api/info/${market}/${pair}/${currency}`).then(response => {
      return response.data
    }).then(info => {
      setAssetPrice(info.val.price)
      cleanGraphData(info.val.ohlc, niceName)
    }).catch(err => {
      console.error(err)
    })
  }

  function getMarkets () {
    axios.get(`/api/markets/${currency}`).then(response => {
      setMarkets(response.data.val)
      return response.data
    }).then(() => {

    }).catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    getMarkets()
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Nav/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-12 col-sm-12 col-12">
          <Markets markets={markets} selectedMarket={selectedMarket} setMarket={setMarket}/>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12 col-12">
          <Graph options={graphOptions}/>
          <div className={styles.price}>{currency}: {assetPrice}</div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 col-12">
          <Assets markets={markets} selectedMarket={selectedMarket} getInfo={getInfo}/>
        </div>
      </div>
    </div>
  )
}

export default App
