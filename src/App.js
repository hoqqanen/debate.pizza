import React from 'react';
import Controls from './Controls';
import Fullscreen from './Fullscreen';
import Video from './Video';

class App extends React.Component {
  constructor() {
    super();
     var config = {
      apiKey: "AIzaSyCMuVAEkpBKQJmu14V8wupV-7DDBs0-2lQ",
      authDomain: "chatty-aa427.firebaseapp.com",
      databaseURL: "https://chatty-aa427.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "1045283540357"
    };
    firebase.initializeApp(config);

    this.state = {
      firebase: firebase,
      height: 0,
    };
  }

  handleResize (e) {
    this.setState({height: document.getElementById("video").getBoundingClientRect().height});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  render() {
    return (
      <div>
        <div id="container">
          <Video />
          <Controls  firebase={this.state.firebase} height={this.state.height} />
        </div>
        <Fullscreen />
      </div>
    );
  }
}
export default App;
