import '../assets/css/App.css'
import React, { Component } from 'react'
import { ipcRenderer } from 'electron'

// https://www.electronjs.org/docs/api/ipc-main
let x 

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // "pong"이 출력됩니다.
})
ipcRenderer.send('asynchronous-message', 'ping')


ipcRenderer.on('ping', (event, arg) => {
  console.log(arg) // "pong"이 출력됩니다.
})


class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>

        <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
      </div>
    )
  }
}

export default App
