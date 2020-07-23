import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { ipcRenderer } from 'electron'



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