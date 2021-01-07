import React, { useState, useEffect } from 'react'
import styles from './css/app.module.css'
import Nav from './nav/nav.jsx'
import Coins from './coins/coins.jsx'
import Graph from './graph/graph.jsx'

const conn = require('./connection.js')
const axios = require('axios')

function App () {
  const [coins, setCoins] = useState(['BTC'])
  const [selectedCoin, setSelectedCoin] = useState([0])
  const [graphData, setGraphData] = useState([])

  function getGraphElement() {
    if (graphData.length !== 0) {
      return <Graph graphData={graphData}/>
    } else {
      return <div></div>
    }
  }

  useEffect(() => {
    axios.get('/api/graph/btc/history/all').then(response => {
      setGraphData(response.data)
    }).catch(err => {
      console.error(err)
    })
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
          {getGraphElement()}
        </div>
      </div>
    </div>
  )
}

export default App
