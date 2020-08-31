import '../assets/css/App.css'
import React, { Component, Fragment  } from 'react'
import * as PIXI from "pixi.js"
import { Stage, Text } from '@inlet/react-pixi'
import Faces from "./Faces"
import Button from './Button'

class App extends Component {

	constructor(props) {
    	super(props)
      	this.state={
        	mouseX: 0,
        	mouseY: 0
    	}
    	this.faces = React.createRef();
  	}


  	addFace = (key) => {
  		this.faces.current.addFace(key);
  	}

  	removeFace = (key) => {
  		this.faces.current.removeFace(key);
  	}

  	modifyFace = (key1, key2) => {
  		this.faces.current.modifyFace(key1, key2);
  	}

  	changeExpression = (key, expression) => {
	    this.faces.current.changeExpression(key, expression);
	}

	render() {
    	return (
				<div id="classroom">
					<div id="classMaterial">
					</div>
					<div id="teacherVideo">
					</div>
					<div id="faces">
	          			<Faces
	          			screenWidth={this.props.width}
	          			screenHeight={this.props.height}
	          			ref={this.faces}/>
					</div>
					<div id="desk">
					</div>
				</div>

    	)
 	}

}

export default App
