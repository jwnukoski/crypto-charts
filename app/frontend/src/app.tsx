import React, { useState, useEffect } from 'react'
import styles from './css/app.module.css'
import Nav from './nav/nav'
import Assets from './assets/assets'
import Graph from './graph/graph'
import Markets from './markets/markets'
import Spinner from './spinner/spinner'
const axios = require('axios')

/**
 * Represents the main entry point for the client application.
 * @constructor
 */
function App () {
  type pair = {
    pair: string;
    route: string;
  }

  interface market {
    exchange: string;
    pairs: pair[];
  }

  const [graphOptions, setGraphOptions] = useState({})
  const [markets, setMarkets] = useState<market[]>([])
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [currency] = useState('usd')
  const [assetPrice, setAssetPrice] = useState(0)
  const [displayLoadingSpinner, setDisplayLoadingSpinner] = useState(false)
  const [period] = useState(604800)

  /**
   * Set the market for the user. This should also updates the currencies available to the user.
   * @param {number} index - The index of the market on https://docs.cryptowat.ch/rest-api/markets
   */
  function setMarket (index: number) {
    if (markets[index] !== undefined) {
      setSelectedMarket(index)
    }
  }

  type datePoint = {
    x: Date;
    y: Date;
  }

  /**
   * Prepares and sets the graph data.
   * @param {array} data - This should be the OHLC candlestick data.
   * @param {string} niceName - Title for the graph.
   */
  function cleanGraphData (data: Array<ohlc>, niceName = '') {
    const formattedDataPoints: Array<datePoint> = []

    data[period].forEach((row: any) => {
      // Unix time
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

  type ohlc = [number, number, number, number, number]

  interface marketResponseData {
    val: {
      price: number,
      ohlc: Array<ohlc>
    }
  }

  interface makertResponse {
    data: marketResponseData
  }

  /**
   * Request all relevant asset data from the ExpressJS server, then call cleanGraphData to display it on the graph.
   * @param {string} pair - See: https://docs.cryptowat.ch/rest-api/pairs
   * @param {string} market - See: https://docs.cryptowat.ch/rest-api/markets
   * @param {string} niceName - Passed to cleanGraphData for the Graph title.
   */
  function getInfo (pair: string, market: string, niceName = '') {
    setDisplayLoadingSpinner(true)

    axios.get(`${process.env.REACT_APP_WEB_URL}:${process.env.REACT_APP_API_PORT}/api/info/${market}/${pair}/${currency}`).then((response: makertResponse) => {
      return response.data
    }).then((info: marketResponseData) => {
      setAssetPrice(info.val.price)
      cleanGraphData(info.val.ohlc, niceName)
      setDisplayLoadingSpinner(false)
    }).catch((err: string) => {
      console.error(err)
      setDisplayLoadingSpinner(false)
    })
  }

  /**
   * Fetches all available markets for the 'currency' state.
   */
  function getMarkets () {
    setDisplayLoadingSpinner(true)

    axios.get(`${process.env.REACT_APP_WEB_URL}:${process.env.REACT_APP_API_PORT}/api/markets/${currency}`).then((response: any) => {
      setMarkets(response.data.val)
      setDisplayLoadingSpinner(false)
      return response.data
    }).catch((err: string) => {
      setDisplayLoadingSpinner(false)
      console.error(err)
    })
  }

  /**
   * Calls getMarkets() at initial load.
   */
  useEffect(() => {
    getMarkets()
  }, [])

  return (
    <div className="container-fluid">
      { displayLoadingSpinner
        ? <Spinner displayLoadingSpinner={displayLoadingSpinner}/>
        : null }
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
          { assetPrice
            ? <div className={styles.price}>{currency}: {assetPrice}</div>
            : null}
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 col-12">
          <Assets markets={markets} selectedMarket={selectedMarket} getInfo={getInfo}/>
        </div>
      </div>
    </div>
  )
}

export default App
