import React from 'react';

class Controls extends React.Component {
  constructor() {
    super();
    var startTime = (new Date()).getTime();
    this.state = {
      yo: [[1, startTime]],
      noyo: [[1, startTime]]
    };
    this.DELAY = 2000;
  }

  componentWillMount() {
    var delay = this.DELAY;
    var dropNumber = 5000; // Maximum array size stored
    this.yoRef = this.props.firebase.database().ref('yo/');
    this.noYoRef = this.props.firebase.database().ref('noyo/');

    this.yoRef.on('value', (snapshot) => {
      var now = (new Date()).getTime();
      var keep = this.state.yo.length > dropNumber 
        ? this.state.yo.slice(0, 1 + this.state.yo.findIndex((e) => now - e[1] > delay))
        : this.state.yo;
      this.setState({yo: [[snapshot.val(), (new Date()).getTime()]].concat(keep)});
    });

    this.noYoRef.on('value', (snapshot) => {
      var now = (new Date()).getTime();
      var keep = this.state.noyo.length > dropNumber 
        ? this.state.noyo.slice(0, 1 + this.state.noyo.findIndex((e) => now - e[1] > delay))
        : this.state.noyo;
      this.setState({noyo: [[snapshot.val(), (new Date()).getTime()]].concat(keep)});
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.moreYo();
      } else if (e.key === "ArrowRight") {
        this.moreNoYo();
      }
    })
  }

  moreYo() {
    this.yoRef.transaction(function(currentYo) {
      return currentYo + 1;
    });
  }

  moreNoYo() {
    this.noYoRef.transaction(function(currentNoYo) {
      return currentNoYo + 1;
    });
  }

  render() {
    var now = (new Date()).getTime();
    var delayMs = this.DELAY;

    var yoIndex = this.state.yo.findIndex((e, i) => now - e[1] > delayMs);
    var noYoIndex = this.state.noyo.findIndex((e) => now - e[1] > delayMs);
    yoIndex = yoIndex > 0 ? yoIndex : 0;
    noYoIndex = noYoIndex > 0 ? noYoIndex : 0;

    var yo = this.state.yo[0][0] - this.state.yo[yoIndex][0] + 1;
    var noyo = this.state.noyo[0][0] - this.state.noyo[noYoIndex][0] + 1;
    var sum = yo + noyo;

    var maxHeight = this.props.height * .3;
    var yoHeight = Math.max(maxHeight / 5, yo * maxHeight / sum);
    var noYoHeight = Math.max(maxHeight / 5, noyo * maxHeight / sum);

    var yoStyle = {
      height: yoHeight,
      width: yoHeight
    };
    var noYoStyle = {
      height: noYoHeight,
      width: noYoHeight
    };
    
    return (
      <div id="controls">
        <img style={yoStyle}
          onClick={this.moreYo.bind(this)}
          draggable="false"
          src="yo.svg"
        />
        <img style={noYoStyle}
          onClick={this.moreNoYo.bind(this)}
          draggable="false"
          src="noyo.svg"
        />
        <div id="fullscreenClickjack" onClick={this.props.fullscreenHandler} />
      </div>
    );
  }
}
export default Controls;
