import React, { Component, Fragment } from "react"
import * as PIXI from "pixi.js"
import Face from "./Face"

export default class Faces extends Component {

  constructor(props) {
    super(props)
    this.state={
      mouseX: 0,
      mouseY: 0,
      numberOfFaces: 0,
      faceRefs: {}
    }
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.numberOfFaces === 0) {
      return true
    } else {
      return false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset count when gulp animation ends
    if (prevState.count >= prevState.mouseY/100) {
      this.props.endBulge()
      this.resetCount()
      this.context.app.ticker.remove(this.startTimer)
    }
  }
  */

  addFace = (key) => {
    console.log("Add Face!")

    this.setState(state => {
      let faceRefs = Object.assign({}, state.faceRefs);
      faceRefs[key] = React.createRef();

      return {
        ...state,
        numberOfFaces: this.state.numberOfFaces + 1,
        faceRefs: faceRefs
      };
    })
    
  }

  removeFace = (key) => {
    console.log("Delete Face!");

    this.setState(state => {
      let faceRefs = Object.assign({}, state.faceRefs);
      delete faceRefs[key];

      return {
        ...state,
        numberOfFaces: this.state.numberOfFaces + 1,
        faceRefs: faceRefs
      };
    })

  }

  modifyFace = (key1, key2) => {
    console.log("Delete Face!");

    this.setState(state => {
      let faceRefs = Object.assign({}, state.faceRefs);
      faceRefs[key2] = React.createRef();
      delete faceRefs[key1];

      return {
        ...state,
        faceRefs: faceRefs
      };
    })

  }

  changeExpression = (key, expression) => {
    console.log(this.state.faceRefs)

    this.state.faceRefs[key].current.changeExpression(expression);
  }

  render() {

    const { screenWidth, screenHeight } = this.props
    const { numberOfFaces, faceRefs } = this.state


    return Object.entries(faceRefs).map((element, index) =>
      <Face
        x={Math.random() * Math.floor(screenWidth)}
        y={Math.random() * Math.floor(screenHeight)}
        key={element[0]}
        removeFace={this.removeFace} 
        ref={element[1]}/>
    )

  }
}
