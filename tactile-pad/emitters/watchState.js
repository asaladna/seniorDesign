"use strict";

var chokidar = require('chokidar');
var Constants = require('./../constants');
var ipc = require('ipc');
var fs  = require('fs');

var gridSize = 4;

var window = module.parent.exports.window;

var grid = new Array(gridSize).fill(0);
grid.map(row => Array(gridSize).fill(0));

// Initialize file watcher on state directory.
var watchin = chokidar.watch('state', {
  ignored: /[\/\\]\./,
  persistent: true
});

// Set watcher to emit a state change event when a file is added.
watchin.on('add', path => {
    fs.readFile(path, 'utf8', (err, state) => {
      window.webContents.send(Constants.NEW_STATE_FILE, state);
    });
  });
