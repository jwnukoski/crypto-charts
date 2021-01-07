import React, { useState, useEffect } from 'react'
import styles from './css/app.module.css'
import Nav from './nav/nav.jsx'
import Assets from './assets/assets.jsx'
import Graph from './graph/graph.jsx'
const conn = require('./connection.js')
const axios = require('axios')

function App () {
  // coins states
  const [assets, setAssets] = useState(['BTC'])
  const [selectedAsset, setSelectedAsset] = useState(0)
  const [data, setData] = useState([])
  const [graphOptions, setGraphOptions] = useState({})
  const [period, setPeriod] = useState(259200)
  // 604800 1 week, 259200 3 days
  // https://docs.cryptowat.ch/rest-api/markets/ohlc

  function setAsset (index) {
    if (assets[index] !== undefined) {
      setSelectedAsset(index)
      getInfo(assets[index].symbol)
    }
  }

  function cleanGraphData (data) {
    // clean and prep for graphData
    const formattedDataPoints = []
    console.log(data)

    data[period].forEach(row => {
      const closeTime = row[0]
      const closePrice = row[4]
      formattedDataPoints.push({ x: closeTime, y: closePrice })
    })

    setGraphOptions({
      theme: 'light2',
      title: {
        text: `Stock Price of ${assets[selectedAsset].name}`
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

  function getAssets () {
    axios.get('/api/assets').then(response => {
      setAssets(response.data.val)
      return response.data.val
    })
  }

  function getInfo (asset) {
    axios.get(`/api/info/${asset}`).then(response => {
      setData(response.data.val)
      return response.data.val
    }).then(info => {
      // price = info.price
      cleanGraphData(info.ohlc)
    }).catch(err => {
      console.error(err)
    })
  }

  function getData (coin, time) {
    axios.get('/api/graph/btc/history/all').then(response => {
      setData(response.data)
      return response.data
    }).then((data) => {
      cleanGraphData(data)
    }).catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    getAssets()
    getData()
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
          <Assets assets={assets} selectedAsset={selectedAsset} setAsset={setAsset}/>
        </div>
        <div className="col-lg-10 col-md-12 col-sm-12 col-12">
          <Graph options={graphOptions}/>
        </div>
      </div>
    </div>
  )
}

export default App
