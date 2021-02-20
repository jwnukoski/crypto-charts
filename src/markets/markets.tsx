import React from 'react'
import styles from './css/markets.module.css'
import Listing from './listing'

type marketsProps = {
  markets: any[];
  selectedMarket: number;
  setMarket: any;
}
/**
 *
 * @param {object} props - The react props.
 * @param {array} props.markets - The markets array to propigate the list with.
 * @param {number} props.selectedMarket - The user selected market. This is the index in regards to props.markets. Passed down to the individual listing for highlighting.
 * @param {function} props.setMarket - The function to update the user selected market with. This is passed down to the individual market listing, so it can be called upon click.
 */
function Markets (props: marketsProps) {
  return (
    <div className={styles.marketsWrapper}>
      <h2>Markets</h2>
      <div className={styles.marketsList}>
        {
          props.markets.map((row: any, index: any) => {
            return <Listing data={row} index={index} key={index} selectedMarket={props.selectedMarket} setMarket={props.setMarket}/>
          })
        }
      </div>
    </div>
  )
}

export default Markets
