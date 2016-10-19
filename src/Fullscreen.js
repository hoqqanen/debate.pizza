import React from 'react';

class Fullscreen extends React.Component {
  

  render() {
    return (
      <div id="fullscreenContainer">
        <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdebate.pizza&layout=button_count&size=large&mobile_iframe=true&appId=649813648397588&width=84&height=28" width="84" height="28" style={{border:"none", overflow:"hidden"}} scrolling="no" frameborder="0" allowTransparency="true"></iframe>
        <button id="fullscreen" 
          onClick={this.props.handler}>
          Full Screen
        </button>
        <a className="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=I'm%20experiencing%20the%20debate%20on%20"
          data-size="large">
        Tweet</a>
      </div>
    );
  }
}
export default Fullscreen;
