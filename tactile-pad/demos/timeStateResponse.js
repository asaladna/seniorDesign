"use strict"
var exec = require('child_process').exec;

var count = 0;
var gridSize = 4;
var timeout = 300;

// Generate a row of random pin states.
function genRowState() {
  let row = new Array(gridSize).fill(0);
  return row.map(val => randMaxMagnitudeOfOne());
}

// Generate a grid of random pin states.
function genGridState(callback) {
  let state = new Array(gridSize).fill(0);
  let randomState = state.map(row => row = genRowState());
  callback(randomState);
}

// Generate a 1, -1, or 0
function randMaxMagnitudeOfOne() {
  let rand = Math.floor(Math.random() * 2);
  let isNeg = Math.floor(Math.random() * 2);
  return (isNeg > 0) ? -1*rand : rand;
}

// Write a randomized state file to the /state directory.
function touchState() {
  count += 1;
  let fileName = 'state/in/state' + count + '.json';
  exec('touch ' + fileName);

  genGridState(state => {
    exec('echo ' + JSON.stringify(state) + ' > ' + fileName);
  });
}

// Clears all state files in state directory.
function cleanup() {
  exec('rm -rf state/in/*.json', () => process.exit());
}

// This is called in the main.js file to start the file generation.
exports.run = function() {
  // Run our tests for 20 seconds
  let touchStateInterval = setInterval(touchState, timeout);

  setTimeout(()=> {
    clearInterval(touchStateInterval);
  }, 200 * 1000);

  // Cleanup. stdin.resume to hold from closing instantly,
  // then catch ctrl+c event and clear files
  process.stdin.resume();
  process.on('SIGINT', cleanup);
}