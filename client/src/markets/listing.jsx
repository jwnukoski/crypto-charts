/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styles from './css/listing.module.css'

function Listing (props) {
  function getListingStyle () {
    if (props.selectedMarket === props.index) {
      return styles.listingWrapperActive
    }

    return styles.listingWrapperInactive
  }

  function handleClick () {
    props.setMarket(props.index)
  }

  return (
		<div className={getListingStyle()} onClick={handleClick}>
      <div className={styles.listExchange}>{props.data.exchange}</div>
    </div>
  )
}

Listing.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  selectedMarket: PropTypes.number,
  setMarket: PropTypes.func
}

export default Listing
