import { CanvasJSChart } from 'canvasjs-react-charts'
import React, { useEffect } from 'react'

type graphProps = {
  options: object;
}

/**
 * Represents the visual graph. Currently uses CanvasJS.
 * @param {object} props - The react props.
 * @param {object} props.options - The settings and data for the graph to display.
 */
function Graph (props: graphProps) {
  let chart: any
  chart = null

  useEffect(() => {
    if (chart !== null) {
      chart.render()
    }
  }, [props.options])

  return (
  <div className="graphWrapper">
    <CanvasJSChart options={props.options} onRef={ ref => { chart = ref } }/>
  </div>
  )
}

export default Graph
