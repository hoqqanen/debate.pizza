import React from 'react';

class Fullscreen extends React.Component {
  handleFullscreen() {
      var el = document.getElementById("container")
        , rfs = // for newer Webkit and Firefox
            el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen;
      rfs.call(el);
  }

  render() {
    return (
      <button id="fullscreen" 
        onClick={this.handleFullscreen}>
        Full Screen
      </button>
    );
  }
}
export default Fullscreen;
