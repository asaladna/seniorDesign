"use strict";

var ipc = require("ipc");
var exec = require("child_process").exec;

var state = new Array(4);
for (var i = 0; i < 4; i++) {
  state[i] = new Array(4).fill(0);
}

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

ipc.on("reset", function(event, arg) {
  for (var i = 0; i < 4; i++) {
    state[i] = new Array(4).fill(0);
  }
  touchState();
});

ipc.on("raise", function(event, arg) {
  for (var i = 0; i < 4; i++) {
    state[i] = new Array(4).fill(3);
  }
  touchState();
});

ipc.on("set", function(event, arg) {
  console.log(arg);
  state = arg;
  touchState();
})


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
