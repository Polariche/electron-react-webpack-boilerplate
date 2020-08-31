//import '../assets/css/App.css'
import React, { Component } from 'react'
import { Sprite, Stage } from '@inlet/react-pixi'
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
    // let size = this.props.screenHeight * 0.1;
    let x = this.props.screenWidth ;
    let y = this.props.screenHeight * 0.5;
    console.log('Stage width * 10: '+ x);
    console.log('Stage height * 10: '+ y);
    return (
      <Stage width={this.props.screenWidth * 0.2} height={this.props.screenHeight * 0.2} options={{ transparent: true }}>
      {/* <Stage options={{ transparent: true }}> */}

      <Sprite {...this.props} 
              image={expression_sprite} 
              anchor={centerAnchor} 
              width = {this.props.screenWidth * 0.2}
              height = {this.props.screenWidth * 0.2}
              visible={this.state.visible} 
              />
      </Stage>
      )
  }

}

// export default App
export default Face