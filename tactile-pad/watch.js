"use strict";

// Watch handles sending files to the app that is being rendered in the
// Chromium window.  You have to use the BrowserWindow object instantiated
// in the main.js file, therefore we export it and access it with
// "module.parent.exports".

var chokidar = require("chokidar");
var Constants = require("./constants");
var ipc = require("ipc");
var fs = require("fs");

var window = module.parent.exports.window;

// Initialize file watcher on state directory.
var watchin = chokidar.watch("state", {
  ignored: /[\/\\]\./,
  persistent: true
});

// Set watcher to emit a state change event when a file is added.
watchin.on("add", path => {
    fs.readFile(path, "utf8", (err, state) => {
      window.webContents.send(Constants.NEW_STATE_FILE, state);
    });
  });
