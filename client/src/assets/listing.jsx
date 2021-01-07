/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styles from './css/listing.module.css'

function Listing (props) {
  function getListingStyle () {
    if (props.selectedAsset === props.index) {
      return styles.listingWrapperActive
    }

    return styles.listingWrapperInactive
  }

  function handleClick () {
    props.setAsset(props.index)
  }

  return (
		<div className={getListingStyle()} onClick={handleClick}>
      <div className={styles.listSymbol}>{props.data.symbol}</div>
      <div className={styles.listName}>{props.data.name}</div>
    </div>
  )
}

Listing.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  selectedAsset: PropTypes.number,
  setAsset: PropTypes.func
}

export default Listing
