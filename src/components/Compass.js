import React from 'react';
import { JXGBoard } from 'jsxgraph-react';

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
    console.log('!!!!!!', JXGBoard);
    return (
      <JXGBoard id="compass-container" style={{backgroundColor: 'pink'}}/>
    );
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
