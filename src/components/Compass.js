import React from 'react';
import { ScatterplotChart } from 'react-easy-chart';

class Compass extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.returnOriginalState();
  }

  returnOriginalState() {
    return {
      xPosition: 0,
      yPosition: 0
    }
  }


  render() {
    const { economicsAverage, socialAverage } = this.props;
    const config = [
      {
        type: 'Two',
        color: 'rgba(0,0,0,0)',
        stroke: 'white'
      },
      {
        type: 'Three',
        color: 'rgba(0,0,0,0)',
        stroke: 'white'
      }
    ]
    const data = [
      {
        type: 'One',
        x: (economicsAverage * 2) * 10 || 0,
        y: (socialAverage * 2) * 10 || 0
      },
      {
        type: 'Two',
        x: 100,
        y: 100
      },
      {
        type: 'Three',
        x: 0,
        y: 0
      }
  ];
    return (
      <ScatterplotChart
        data={data}
        width={450}
        height={350}
        axes={true}
        dotRadius={12}
        grid={true}
        verticalGrid={true}
        margin={{top: 10, right: 10, bottom: 30, left: 100}}
        config={config}
      />
    );
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
