import React, { useState, useEffect } from 'react'
import styles from './css/app.module.css'
import Nav from './nav/nav.jsx'
import Coins from './coins/coins.jsx'
import Graph from './graph/graph.jsx'

const conn = require('./connection.js')
const axios = require('axios')

function App () {
  // coins states
  const [coins, setCoins] = useState(['BTC'])
  const [selectedCoin, setSelectedCoin] = useState([0])

  // graph states
  const [data, setData] = useState([]) // raw return from server
  const [graphOptions, setGraphOptions] = useState({})

  function cleanGraphData (data) {
    // clean and prep for graphData
    const formattedDataPoints = []

    data.val.forEach(val => {
      const splitDate = val.x.split('-')
      formattedDataPoints.push({ y: val.y, x: new Date(splitDate[0], splitDate[1], splitDate[2]) })
    })

    setGraphOptions({
      theme: 'light2',
      title: {
        text: `Stock Price of ${coins[selectedCoin]}`
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
          <Coins coins={coins} setSelectedCoin={setSelectedCoin}/>
        </div>
        <div className="col-lg-10 col-md-12 col-sm-12 col-12">
          <Graph options={graphOptions}/>
        </div>
      </div>
    </div>
  )
}

export default App
