/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import styles from './css/nav.module.css'

function Nav () {
  return (
		<div className="container-fluid">
      <div className="row">
        <div className="col-lg-11 col-md-10 col-sm-12 col-12">
          <span className={styles.branding}>Crypto-Charts</span>
        </div>
        <div className="col-lg-1 col-md-2 col-sm-12 col-12">

        </div>
      </div>
    </div>
  )
}

export default Nav
