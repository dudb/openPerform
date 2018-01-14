// KinectTransport Source: https://github.com/stimulant/MS-Cube-SDK/tree/research/KinectTransport

import _ from 'lodash';

import config from './../../config';

class KinectTransport {
  constructor() {
    this.callbacks = {};
    this.events = [];
    this.labels = [];

    this.websocket = null;
    this.initializeWebSocket();
  }

  initializeWebSocket() {
    this.websocket = new WebSocket(`ws://localhost:${config.kinecttransport.ports.outgoing}`);
    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.oClose;
    this.websocket.onmessage = this.onMessage.bind(this);
    this.websocket.onerror = this.onError;
  }

  onOpen(evt) {
    console.log('KinectTransport connected:', evt);
  }

  onClose(evt) {
    console.log('KinectTransport disconnected:', evt);
  }

  onMessage(data) {
    const dataObj = JSON.parse(data.data);
    _.forEach(dataObj, (obj) => {
      if (typeof this.callbacks[obj.type] === 'function') {
        this.callbacks[obj.type](obj);
      }
    });
  }

  onError(evt) {
    console.log('KinectTransport error:', evt);
  }

  on(name, cb, event, label) {
    this.callbacks[name] = cb;
    this.events.push(event);
    this.labels.push(label);
    this.initCallbacks();
  }

  clearCallbacks() {
    this.callbacks = {};
    this.events = [];
    this.labels = [];
  }

  initCallbacks() {
    // _.forEach(this.callbacks, this.initCallback.bind(this));
  }
}

module.exports = KinectTransport;
