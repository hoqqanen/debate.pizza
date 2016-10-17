import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      yo: 0,
      noyo: 0
    };
    this.yoRef = firebase.database().ref('yo/');
    this.noYoRef = firebase.database().ref('noyo/');
  }

  handleResize (e) {
    // this.setState({count: window.innerWidth});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillMount() {
    this.yoRef.on('value', (snapshot) => {
      this.setState({yo: snapshot.val()});
    });
    this.noYoRef.on('value', (snapshot) => {
      this.setState({noyo: snapshot.val()});
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
    var sum = this.state.yo + this.state.noyo;
    var maxHeight = 300;
    return (
      <div id="controls">
        <img height={this.state.yo * maxHeight / sum}
          width={this.state.yo * maxHeight / sum}
          onClick={this.moreYo.bind(this)}
          draggable="false"
          src="yo.svg"
        />
        <img height={this.state.noyo * maxHeight / sum}
          width={this.state.noyo * maxHeight / sum}
          onClick={this.moreNoYo.bind(this)}
          draggable="false"
          src="noyo.svg"
        />
      </div>
    );
  }
}
export default Counter;
