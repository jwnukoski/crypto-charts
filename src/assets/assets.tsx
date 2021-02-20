import React, { useState } from 'react'
import styles from './css/assets.module.css'
import Listing from './listing'

type pair = {
  pair: string;
  route: string;
}

interface market {
  exchange: string;
  pairs: pair[];
}

type assetsProps = {
  markets: market[];
  selectedMarket: number;
  getInfo: any;
}

/**
 * Represents all the available assets ('ie coins') for the selected market.
 * @param {object} props - The react props.
 * @param {array} - The available markets.
 * @param {number} - The user selected index relating to props.markets.
 * @param {function} props.getInfo - The function that is called after selecting an asset, which gets the asset info. Passed down to the asset calling upon clicking.
 */
function Assets (props: assetsProps) {
  const [selectedAsset, setSelectedAsset] = useState(0)

  function getList () {
    const market = props.markets[props.selectedMarket]

    if (props.markets.length > 0) {
      return (
        <div>
          <h2>Assets for {market.exchange}</h2>
          <div className={styles.assetsList}>
            {
              market.pairs.map((row: any, index: any) => {
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

export default Assets
