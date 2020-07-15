
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { ipcRenderer } from 'electron'
import RotatingBunny from './components/App'
import { Stage, Container, AppConsumer } from '@inlet/react-pixi'


// https://www.electronjs.org/docs/api/ipc-main





// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

render(<Stage>
  <Container>
    <AppConsumer>{app => <RotatingBunny app={app} />}</AppConsumer>
  </Container>
</Stage>, document.getElementById('root'))

