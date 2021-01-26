/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styles from './css/listing.module.css'

/**
 * Represents a single market listing. client/src/markets/listing.jsx
 * @param {object} props - The react props.
 * @param {number} props.index - The index of this listing in regards to the markets list.
 * @param {object} props.data - The data of the market, which contains the exchange name.
 * @param {number} props.selectedMarket - The current selected market. Used to highlight this listing if it matches the props.index.
 * @param {function} props.setMarket - The function to call upon a user click, which sets the market.
 */
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
