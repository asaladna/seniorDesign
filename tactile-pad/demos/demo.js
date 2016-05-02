"use strict";

// This is the demo that we ran at the demo at the Senior Design fair.  It
// manages the state of the pad, and writes out new state files when events
// state mutations happen.

var ipc = require("ipc");
var exec = require("child_process").exec;

// Initialize 2d array for state.
var state = new Array(4);
for (var i = 0; i < 4; i++) {
  state[i] = new Array(4).fill(0);
}

// Click handler.  It moves the pin that is specified by the x y coordinates.
ipc.on("click", function(event, arg) {
  console.log(arg);
  if (arg.direction === "down") {
    if ( state[arg.x][arg.y] - 1 >= 0)
      state[arg.x][arg.y] -= 1;
  }
  else if (arg.direction === "up") {
    if ( state[arg.x][arg.y] < 8)
      state[arg.x][arg.y] += 1;
  }
  touchState();
});

// Resets all the pins.
ipc.on("reset", function(event, arg) {
  for (var i = 0; i < 4; i++) {
    state[i] = new Array(4).fill(0);
  }
  touchState();
});

// Raises all the pins.
ipc.on("raise", function(event, arg) {
  for (var i = 0; i < 4; i++) {
    state[i] = new Array(4).fill(2);
  }
  touchState();
});

// Sets the entire state to whatever is past in.
ipc.on("set", function(event, arg) {
  console.log(arg);
  state = arg;
  touchState();
});

var count = 0;

// Write state to file in the /state directory.
function touchState() {
  count += 1;
  let fileName = "state/state" + count + ".json";
  exec("touch " + fileName);
  exec("echo " + JSON.stringify(state) + " > " + fileName);
}

// Clears all state files in state directory.
function cleanup() {
  exec("rm -rf state/*.json", () => process.exit());
}

process.stdin.resume();
process.on('SIGINT', cleanup);
