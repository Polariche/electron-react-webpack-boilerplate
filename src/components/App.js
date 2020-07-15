import '../assets/css/App.css'
import React, { Component } from 'react'




class App extends Component {
	constructor(props) {
    super(props);
    this.content = props.content;
  	}

  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>

        <p>The message is : {this.content}</p>
      </div>
    )
  }
}

export default App
