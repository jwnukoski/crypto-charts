/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styles from './css/assets.module.css'
import Listing from './listing.jsx'

function Assets (props) {
  return (
		<div className={styles.assetsWrapper}>
      <h2>Assets</h2>
      <div className={styles.assetsList}>
        {
          props.assets.map((row, index) => {
            return <Listing data={row} index={index} key={index} selectedAsset={props.selectedAsset} setAsset={props.setAsset}/>
          })
        }
      </div>
    </div>
  )
}

Assets.propTypes = {
  assets: PropTypes.array,
  selectedAsset: PropTypes.number,
  setAsset: PropTypes.func
}

export default Assets
