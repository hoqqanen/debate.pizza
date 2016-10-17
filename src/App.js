import React from 'react';
import Counter from './Counter';
import Fullscreen from './Fullscreen';
import Video from './Video';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 257,
    };
  }

  handleResize (e) {
    this.setState({width: window.innerWidth});
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
          <Counter />
        </div>
        <Fullscreen />
      </div>
    );
  }
}
export default App;
