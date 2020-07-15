import '../assets/css/App.css'
import React, { Component } from 'react'
import { Sprite } from '@inlet/react-pixi'



// class App extends Component {
// 	constructor(props) {
//     super(props);
//     this.content = props.content;
//   	}

//   render() {
//     return (
//       <div>
//         <h1>Hello, Electron!</h1>

//         <p>The message is : {this.content}</p>
//       </div>
//     )s
//   }
// }

class RotatingBunny extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { rotation: 0 }
  // }
  state = { rotation:0 }
  componentDidMount() {
    this.props.app.ticker.add(this.tick)
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.tick)
  }

  tick = delta => {
    this.setState(({ rotation }) => ({
     rotation: rotation + 0.05 * delta,
    }))
  };

  render() {
    return <Sprite image="./bunny.jpg" rotation={this.state.rotation} />
  }
}

// export default App
export default RotatingBunny