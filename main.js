'use strict'

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let win2

// Keep a reference for dev mode
let dev = false

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  let indexPath

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  win.loadURL(indexPath)

  // Don't show until we are ready and loaded
  win.once('ready-to-show', () => {
    win.show()

    // Open the DevTools automatically if developing
    if (dev) {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

      installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log('Error loading React DevTools: ', err))
      win.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  win.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createWorker() {
  // Create the browser window.
  win2 = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  let indexPath

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'worker.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'worker.html'),
      slashes: true
    })
  }

  win2.loadURL(indexPath)

  // Don't show until we are ready and loaded
  win2.once('ready-to-show', () => {
    win2.show()

    // Open the DevTools automatically if developing
    if (dev) {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

      installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log('Error loading React DevTools: ', err))
      win2.webContents.openDevTools()
    }
  })

  // Emitted when the win2dow is closed.
  win2.on('closed', function() {
    // Dereference the win2dow object, usually you would store win2dows
    // in an array if your app supports multi win2dows, this is the time
    // when you should delete the corresponding element.
    win2 = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('ready', createWorker)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})



app.on('ready', () => {

  ipcMain.on('appReady', (event, arg) => {

    win.webContents.send('addFace', 1234);
    win.webContents.send('addFace', 1234);
    win.webContents.send('addFace', 1234);
    win.webContents.send('addFace', 1234);

    const WebSocket = require('ws');
    const ws = new WebSocket('ws://203.237.53.84:8080/echo')

    ws.on('open', () => {
      const message = {'type': 'open', 'payload': 'hello'};
      ws.send(JSON.stringify(message));

    })

    ws.on('message', (message) => {
    console.log(message);
    
      switch(message.type) {
        case 'welcome': break;
        case 'enter': break;
        case 'exit': break;
        case 'expression': break;
      }
      win.webContents.send('ping', `${message}`)

    })

  });
  
});


app.on('ready', () => {
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('index_init')
  })

  win2.webContents.on('did-finish-load', () => {
    win2.webContents.send('worker_init')
  })
})


ipcMain.on('worker-to-index', (event, arg) => {
    win.webContents.send('from-worker', arg);
});


