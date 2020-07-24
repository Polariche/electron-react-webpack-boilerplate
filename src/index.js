import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import Face from './components/Face'
import { ipcRenderer } from 'electron'
import { Stage, Container, AppConsumer } from '@inlet/react-pixi'

ipcRenderer.on('index_init', (event, arg) => {
    // Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
    let root = document.createElement('div')

    root.id = 'root'
    document.body.appendChild(root)


    // https://www.electronjs.org/docs/api/ipc-main
    ipcRenderer.on('ping', (event, arg) => {
      console.log(arg) // "pong"이 출력됩니다.
      // Now we can render our application into it
      render(<App content={arg} />, document.getElementById('root'))
    })

    ipcRenderer.on('from-worker', (event, arg) => {

      if (arg.command == "expression") {
        render(<Stage>
                  <Container>
                    <AppConsumer>{app => <Face expression={arg.payload.type} />}</AppConsumer>
                  </Container>
                </Stage>, document.getElementById('root'))
      }
      
    })

})