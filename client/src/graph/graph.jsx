/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* App.js */
import { CanvasJSChart } from 'canvasjs-react-charts'
const React = require('react')
const Component = React.Component

class Graph extends Component {
  render () {
    const dataPoints = []
    this.props.graphData.forEach(val => {
      const splitDate = val.x.split('-')
      dataPoints.push({ y: val.y, x: new Date(splitDate[0], splitDate[1], splitDate[2]) })
    })

    const options = {
      theme: 'light2',
      title: {
        text: 'Stock Price of NIFTY 50'
      },
      axisX: {
        text: 'timeline',
        gridThickness: 2
      },
      axisY: {
        title: 'Price in USD',
        prefix: '$'
      },
      data: [{
        type: 'line',
        xValueType: 'dateTime',
        yValueFormatString: '$#,##0.00',
        dataPoints: dataPoints
      }]
    }
    console.log(options)
    return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => { this.chart = ref } }
			/>
			{/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
		</div>
    )
  }

  componentDidMount () {
    const chart = this.chart
    chart.render()
  }
}

export default Graph
