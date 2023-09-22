import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './css/listing.module.css'

type listingProps = {
  pair: string;
  route: string;
  index: number;
  market: string;
  getInfo: any;
  selectedAsset: number;
  setSelectedAsset: any;
}

/**
 * Represents a single asset list (ie bitcoin). client/src/assets/listing.jsx
 * @param {object} props - The react props.
 * @param {string} props.pair - See: https://docs.cryptowat.ch/rest-api/pairs
 * @param {string} props.route - See: https://docs.cryptowat.ch/rest-api/pairs
 * @param {number} props.selectedAsset - The user selected asset. This is an index relating to the available assets array.
 * @param {function} props.setAsset - Function to call when a user clicks on an asset.
 * @param {function} props.getInfo - Function which fetches the information for a given asset.
 * @param {string} props.market - The market name.
 * @param {number} props.index - The index of the asset listing in relation to the assets list.
 * @param {funciton} props.setSelectedAsset - Function to set the selected asset state.
 */
function Listing (props: listingProps) {
  const [niceName, setNiceName] = useState('')
  const [niceSymbol, setNiceSymbol] = useState('')

  function getPairNiceName () {
    axios.get(`${process.env.REACT_APP_WEB_URL}:${process.env.REACT_APP_API_PORT}/api/pairinfo/${props.pair}`).then(res => {
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
    props.setSelectedAsset(props.index)
    props.getInfo(props.pair, props.market, niceName)
  }

  useEffect(() => {
    getPairNiceName()
  }, [props.pair])

  return (
  <button className={getListingStyle()} onClick={handleClick}>
    <span className={styles.listSymbol}>{niceSymbol}</span>
    <span className={styles.listName}>{niceName}</span>
    <span className={styles.pairName}>{props.pair}</span>
  </button>
  )
}

export default Listing
