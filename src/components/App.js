import '../assets/css/App.css'
import React, { Component } from 'react'




class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>

        <p>The message is : {this.props.content}</p>
      </div>
    )
  }
}

export default App
