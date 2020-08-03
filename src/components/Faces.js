import React, { Component, Fragment } from "react"
import * as PIXI from "pixi.js"
import Face from "./Face"

export default class Faces extends Component {

  constructor(props) {
    super(props)
    this.state={
      mouseX: 0,
      mouseY: 0,
      numberOfFaces: 0
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

    this.setState(state => ({
      ...state,
      numberOfFaces: this.state.numberOfFaces + 1
    }))
    
  }

  removeFace = () => {

    this.setState(state => ({
      ...state,
      numberOfFaces: this.state.numberOfFaces - 1
    }))

  }

  render() {

    const { screenWidth, screenHeight } = this.props
    const { numberOfFaces } = this.state

    return Array(numberOfFaces).fill().map((element, index) =>
      <Face
        x={Math.random() * Math.floor(screenWidth)}
        y={Math.random() * Math.floor(screenHeight)}
        key={index}
        removeFace={this.removeFace} />
    )

  }
}
