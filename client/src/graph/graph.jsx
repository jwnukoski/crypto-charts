/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* App.js */
import PropTypes from 'prop-types'
import { CanvasJSChart } from 'canvasjs-react-charts'
import React, { useEffect } from 'react'

function Graph (props) {
  let chart = null

  useEffect(() => {
    if (chart !== null) {
      chart.render()
    }
  }, [props.options])

  return (
		<div className="graphWrapper">
			<CanvasJSChart options={props.options} onRef={ref => { chart = ref } }/>
		</div>
  )
}

Graph.propTypes = {
  options: PropTypes.object
}

export default Graph
