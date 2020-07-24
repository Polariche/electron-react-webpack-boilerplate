//import '../assets/css/App.css'
import React, { Component } from 'react'
import { Sprite } from '@inlet/react-pixi'


class Face extends React.Component {

  render() {
    switch(this.props.expression) {

      case "happy": 
        return (<Sprite image="./happy.png" rotation={this.props.expressio} />)

      case "neutral": 
        return (<Sprite image="./neutral.png" rotation={this.props.expressio} />)

      default: 
        return (<Sprite image="./neutral.png" rotation={this.props.expressio} />)
    }
    
  }

}

// export default App
export default Face