/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import styles from './css/nav.module.css'

function Nav () {
  return (
    <div className={styles.navWrapper}>
      <span className={styles.branding}>Crypto-Charts</span>
    </div>
  )
}

export default Nav
