import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import Face from './components/Face'
import { ipcRenderer } from 'electron'
import { Stage, Container, AppConsumer } from '@inlet/react-pixi'

ipcRenderer.on('index_init', (event, arg) => {
    // Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
    let root = document.createElement('div')

    const height = window.innerHeight
    const width = window.innerWidth

    let app_ref = React.createRef();


    root.id = 'root'
    document.body.appendChild(root)


    // https://www.electronjs.org/docs/api/ipc-main
    //ipcRenderer.on('ping', (event, arg) => {
      //console.log(arg)
    render(<App width={width} height={height} ref={app_ref}/>, document.getElementById('root'))

    console.log(app_ref);

    ipcRenderer.send('appReady');
    
    ipcRenderer.on('addFace', (event, arg) => {
      app_ref.current.addFace(arg);
    })
    ipcRenderer.on('removeFace', (event, arg) => {
      app_ref.current.removeFace(arg);
    })

    ipcRenderer.on('from-worker', (event, arg) => {

      if (arg.type == "expression") {
        app_ref.current.changeExpression(1234, arg.payload.data);
      }
      
    })

    //})

    /*
    ipcRenderer.on('from-worker', (event, arg) => {

      if (arg.command == "expression") {
        render(<Stage>
                  <Container>
                    <AppConsumer>{app => <Face expression={arg.payload.data} app={app}/>}</AppConsumer>
                  </Container>
                </Stage>, document.getElementById('root'))
      }
      
    })
    */

})