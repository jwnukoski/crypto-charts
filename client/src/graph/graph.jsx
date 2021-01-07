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
  })

  return (
		<div>
			<CanvasJSChart options={props.options} onRef={ref => { chart = ref } }/>
			{/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
		</div>
  )
}

Graph.propTypes = {
  options: PropTypes.object
}

export default Graph
