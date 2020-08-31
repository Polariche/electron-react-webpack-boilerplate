import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import Face from './components/Face'
import { ipcRenderer } from 'electron'
import { Stage, Container, AppConsumer } from '@inlet/react-pixi'
import Button from './components/Button'

ipcRenderer.on('login_init', (event, arg) => {
    // Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
    let root = document.createElement('div')

    const height = window.innerHeight
    const width = window.innerWidth

    root.id = 'root'
    document.body.appendChild(root)

    render(<Button width={width} height={height}/>, document.getElementById('root'))

    // render(<App width={width} height={height} ref={app_ref}/>, document.getElementById('root'))
})