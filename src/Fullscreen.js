import React from 'react';

class Fullscreen extends React.Component {
  

  render() {
    return (
      <button id="fullscreen" 
        onClick={this.props.handler}>
        Full Screen
      </button>
    );
  }
}
export default Fullscreen;
