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
    let key = '';


    root.id = 'root'
    document.body.appendChild(root)


    // https://www.electronjs.org/docs/api/ipc-main
    //ipcRenderer.on('ping', (event, arg) => {
      //console.log(arg)
    render(<App width={width} height={height} ref={app_ref}/>, document.getElementById('root'))

    console.log(app_ref);

    ipcRenderer.send('app-ready');
    
    ipcRenderer.on('app-update', (event, arg) => {
      const { type, data } = arg

      switch(type) {
        case "welcome": 
          // set my key
          key = data.key;
          ipcRenderer.send('set-key', key); 
          app_ref.current.addFace(key);

          // other users' keys
          data.keys.forEach((value, index, array) => {app_ref.current.addFace(value);});
          break;
        case "enter": 
          app_ref.current.addFace(data); 
          break;
        case "exit": 
          app_ref.current.removeFace(data); 
          break;
        case "exp": 
          app_ref.current.changeExpression(data.key, data.expression); 
          break;
      }
      
    })

    ipcRenderer.on('from-worker', (event, arg) => {
      const { type, data } = arg

      if (type == "exp") {
        app_ref.current.changeExpression(key, data.expression);
      }
      
    })

    //})

    /*
    ipcRenderer.on('from-worker', (event, arg) => {

      if (arg.command == "expression") {
        render(<Stage>
                  <Container>
                    <AppConsumer>{app => <Face expression={arg.data.data} app={app}/>}</AppConsumer>
                  </Container>
                </Stage>, document.getElementById('root'))
      }
      
    })
    */

})