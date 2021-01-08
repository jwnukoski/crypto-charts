/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styles from './css/assets.module.css'
import Listing from './listing.jsx'

function Assets (props) {
  function getList () {
    if (props.markets.length > 0) {
      return (
        <div>
          <h2>Assets for {props.markets[props.selectedMarket].exchange}</h2>
          <div className={styles.assetsList}>
            {
              props.markets[props.selectedMarket].pairs.map((row, index) => {
                return <Listing pair={row.pair} route={row.route} key={index}/>
              })
            }
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  return (
		<div className={styles.assetsWrapper}>
      {getList()}
    </div>
  )
}

Assets.propTypes = {
  markets: PropTypes.array,
  selectedMarket: PropTypes.number
}

export default Assets
