/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styles from './css/markets.module.css'
import Listing from './listing.jsx'

function Markets (props) {
  return (
    <div className={styles.marketsWrapper}>
      <h2>Markets</h2>
      <div className={styles.marketsList}>
        {
          props.markets.map((row, index) => {
            console.log(row)
            return <Listing data={row} index={index} key={index} selectedMarket={props.selectedMarket} setMarket={props.setMarket}/>
          })
        }
      </div>
    </div>
  )
}

Markets.propTypes = {
  markets: PropTypes.array,
  selectedMarket: PropTypes.number,
  setMarket: PropTypes.func
}

export default Markets
