import '../assets/css/App.css'
import React, { Component, Fragment  } from 'react'
import * as PIXI from "pixi.js"
import { Stage, Text } from '@inlet/react-pixi'
import Faces from "./Faces"

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

	render() {

    	return (
	      	<Fragment>
	        	<Stage
	        	width={this.props.width}
	        	height={this.props.height}>
	          		<Faces
	          		screenWidth={this.props.width}
	          		screenHeight={this.props.height}
	          		ref={this.faces}/>
	          
	        	</Stage>
	      	</Fragment>
    	)
 	}

}

export default App
