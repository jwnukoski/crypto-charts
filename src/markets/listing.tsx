import React from 'react'
import styles from './css/listing.module.css'

type listingProps = {
  index: number;
  data: any;
  selectedMarket: number;
  setMarket: any;
}
/**
 * Represents a single market listing. client/src/markets/listing.jsx
 * @param {object} props - The react props.
 * @param {number} props.index - The index of this listing in regards to the markets list.
 * @param {object} props.data - The data of the market, which contains the exchange name.
 * @param {number} props.selectedMarket - The current selected market. Used to highlight this listing if it matches the props.index.
 * @param {function} props.setMarket - The function to call upon a user click, which sets the market.
 */
function Listing (props: listingProps) {
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

export default Listing
