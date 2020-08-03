//import '../assets/css/App.css'
import React, { Component } from 'react'
import { Sprite } from '@inlet/react-pixi'
import * as PIXI from "pixi.js";

const centerAnchor = new PIXI.Point(0.5, 0.5);

class Face extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      mouseX: 0,
      mouseY: 0,
      expression: 'neutral',
      visible: true
    }

    console.log(props)
  }

  changeExpression = (expression) => {
    this.setState(state => ({
      ...state,
      expression: expression
    }))
  }

  /*
  removeFace = () => {
    this.props.removeFace()
    this.setState({
      visible: false
    })
  }
  */

  

  render() {
    const expression_sprite = "./"+this.state.expression+".png"
    return (<Sprite {...this.props} 
              image={expression_sprite} 
              anchor={centerAnchor} 
              visible={this.state.visible} />)
  }

}

// export default App
export default Face