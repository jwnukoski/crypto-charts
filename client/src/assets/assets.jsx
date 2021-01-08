/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styles from './css/assets.module.css'
import Listing from './listing.jsx'

function Assets (props) {
  const [selectedAsset, setSelectedAsset] = useState(0)

  function getList () {
    const market = props.markets[props.selectedMarket]

    if (props.markets.length > 0) {
      return (
        <div>
          <h2>Assets for {market.exchange}</h2>
          <div className={styles.assetsList}>
            {
              market.pairs.map((row, index) => {
                return <Listing pair={row.pair} route={row.route} index={index} key={index} market={market.exchange} getInfo={props.getInfo} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset}/>
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
  selectedMarket: PropTypes.number,
  getInfo: PropTypes.func
}

export default Assets
