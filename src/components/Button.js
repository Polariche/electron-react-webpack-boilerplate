import '../assets/css/App.css'
import React, { Component, Fragment  } from 'react'
import * as PIXI from "pixi.js"
import { Stage, Text } from '@inlet/react-pixi'
import { render } from 'react-dom';

class Button extends Component{
      render() {
    	return (
	      	<button id="login" className="login">
                  Login
              </button>
    	)
 	}

}
export default Button;