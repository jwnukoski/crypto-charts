/* eslint-disable no-tabs */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './css/listing.module.css'

function Listing (props) {
  const [niceName, setNiceName] = useState('')
  const [niceSymbol, setNiceSymbol] = useState('')

  function getPairNiceName () {
    axios.get(`/api/pairinfo/${props.pair}`).then(res => {
      setNiceName(res.data.val.name)
      setNiceSymbol(res.data.val.symbol)
    })
  }

  function getListingStyle () {
    if (props.selectedAsset === props.index) {
      return styles.listingWrapperActive
    }

    return styles.listingWrapperInactive
  }

  function handleClick () {
    props.getInfo(props.pair, props.market)
  }

  useEffect(() => {
    getPairNiceName()
  }, [props.pair, props.route])

  return (
		<div className={getListingStyle()} onClick={handleClick}>
      <div className={styles.listSymbol}>{niceSymbol}</div>
      <div className={styles.listName}>{niceName}</div>
      <div className={styles.pairName}>{props.pair}</div>
    </div>
  )
}

Listing.propTypes = {
  pair: PropTypes.string,
  route: PropTypes.string,
  selectedAsset: PropTypes.number,
  setAsset: PropTypes.func,
  getInfo: PropTypes.func,
  market: PropTypes.string,
  index: PropTypes.number
}

export default Listing
