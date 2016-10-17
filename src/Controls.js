import React from 'react';

class Controls extends React.Component {
  constructor() {
    super();
    this.state = {
      yo: 0,
      noyo: 0
    };
  }

  componentWillMount() {
    this.yoRef = this.props.firebase.database().ref('yo/');
    this.noYoRef = this.props.firebase.database().ref('noyo/');

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
    var maxHeight = this.props.height * .3;
    var yoHeight = Math.max(maxHeight / 5, this.state.yo * maxHeight / sum);
    var noYoHeight = Math.max(maxHeight / 5, this.state.noyo * maxHeight / sum);
    return (
      <div id="controls">
        <img height={yoHeight}
          width={yoHeight}
          onClick={this.moreYo.bind(this)}
          draggable="false"
          src="yo.svg"
        />
        <img height={noYoHeight}
          width={noYoHeight}
          onClick={this.moreNoYo.bind(this)}
          draggable="false"
          src="noyo.svg"
        />
      </div>
    );
  }
}
export default Controls;
