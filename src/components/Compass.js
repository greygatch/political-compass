import React from 'react';

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
    return (
      <div id="compass-container">
        Compass
      </div>
    );
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
