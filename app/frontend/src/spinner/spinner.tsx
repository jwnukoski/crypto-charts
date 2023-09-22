import React from 'react'
import styles from './css/spinner.module.css'

type spinnerProps = {
  displayLoadingSpinner: boolean;
}
/**
 * Represents the loading spinner
 * @constructor
 */
function Spinner (props: spinnerProps) {
  return (
    <div className={styles.spinnerOverlay}>
        <img src="spinner.gif" alt="loading spinner" className={styles.spinner}></img>
        <span className={styles.loadingTxt}>Loading...</span>
    </div>
  )
}

export default Spinner
