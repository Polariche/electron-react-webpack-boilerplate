// credit to https://github.com/andypotato/do-not-laugh/blob/master/src/worker.js

const electron = require('electron');

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { ipcRenderer } from 'electron'



import * as faceapi from 'face-api.js';


ipcRenderer.on('worker_init', (event, arg) => {
  
  // init detection options
  const minConfidenceFace = 0.5;
  const faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidenceFace });

  // cam reference
  let cam;

  let isRunning = true;
  let isReady = false;

  let neutral_timer = 0;

  // configure face API
  faceapi.env.monkeyPatch({
    Canvas: HTMLCanvasElement,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement('canvas'),
    createImageElement: () => document.createElement('img')
  });

  const loadNet = async () => {

    const detectionNet = faceapi.nets.ssdMobilenetv1;
    await detectionNet.load('/data/weights');
    await faceapi.loadFaceExpressionModel('/data/weights');
  };

  const initCamera = async (width, height) => {

    const video = document.getElementById('cam');
    video.width = width;
    video.height = height;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: width,
        height: height
      }
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  };

  const detectExpressions = async () => {

    // detect expression
    let result = await faceapi.detectSingleFace(cam, faceapiOptions)
      .withFaceExpressions();

    if(!isReady) {
      isReady = true;
      onReady();
    }


    if(typeof result !== 'undefined') {

      let happiness = 0, anger = 0;

      if(result.expressions.hasOwnProperty('happy')) {
        happiness = result.expressions.happy;
      }
      if(result.expressions.hasOwnProperty('angry')) {
        anger = result.expressions.angry;
      }

      if(happiness > 0.7) {
        neutral_timer = 0;
        onExpression('happy');
      } else if(anger > 0.7) {
        neutral_timer = 0;
        onExpression('angry');
      } else {
        if (neutral_timer > 2) {
          onExpression('neutral');
        }
        neutral_timer += 1;
      }

    }

    if(isRunning) {
      setTimeout( () => {detectExpressions();}, 100);
    }

  };

  let onReady = () => {
    notifyRenderer('ready', {});
  };

  let onExpression = (expression) => {
    console.log(expression);
    notifyRenderer('exp', {
      data: {
        expression: expression
      }
    });

  };

  let notifyRenderer = (type, data) => {
    // notify renderer
    ipcRenderer.send('worker-to-index', {
      type: type, data: data
    });

    ipcRenderer.send('to-ws', {
      type: type, data: data
    });

  }


  let root = document.createElement('div')
  let vid = document.createElement('video')

  root.id = 'root'
  vid.id = 'cam'
  vid.autoplay = true
  vid.muted = true
  vid.playsinline = true

  document.body.appendChild(root)
  root.appendChild(vid)

  loadNet()
  .then(_ => {
    console.log('Network has loaded');
    return initCamera(640, 480);
  })
  .then(video => {
    console.log('Camera was initialized');
    cam = video;
    
    //onExpression('neutral');
    detectExpressions();
  });



})
