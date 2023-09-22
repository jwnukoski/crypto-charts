import React from 'react'
import styles from './css/nav.module.css'

/**
 * Represents the header. Additional navigation to pages should go here.
 * @constructor
 */
function Nav () {
  return (
  <div className={styles.navWrapper}>
    <span className={styles.branding}>Crypto-Charts</span>
  </div>
  )
}

export default Nav
