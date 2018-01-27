// const express = require('express');

// const app = express();

// import config options
const config = require('./config.js');

// start app server
// const server = app.listen(config.app.port, () => {
//   console.log('Web server started on port', server.address().port);
// });

// init kinect server
if (config.kinectTransport.enabled) {
  const KTServer = require('./sockets/KinectTransport');
}

// init perception neuron server
if (config.perceptionNeuron.enabled) {
  const PNServer = require('./sockets/PerceptionNeuron');
  const pnServer = new PNServer();
}

// init gamepad server
if (config.gamepads.enabled) {
  const GPServer = require('./sockets/Gamepads');
  const gpServer = new GPServer();
}

// init midi controller server
if (config.midiController.enabled) {
  const MidiController = require('./sockets/MidiController');
  const midiController = new MidiController();
}
