"use strict";

var demo1SceneController = {

  initialize: function(ipc, mousecaster) {
    this.ipc = ipc;
    this.mousecaster = mousecaster;
    this.direction = "up";
    this.bindClickHandlers();
    mousecaster.signal.add(this.handleMouseCaster, this);
  },

  handleMouseCaster: function(evt, tile) {
    if (evt === vg.MouseCaster.CLICK) {
      tile.toggle();
      this.ipc.send("click", {
        x: tile.cell.x,
        y: tile.cell.y,
        direction: this.direction
      });
    }
  },

  bindClickHandlers: function() {
    document.getElementById("demo-1-move-up").onclick = () => {
      this.direction = "up";
    }
    document.getElementById("demo-1-move-down").onclick = () => {
      this.direction = "down";
    }
    document.getElementById("demo-1-reset-pins").onclick = () => {
      this.ipc.send("reset");
    }
    document.getElementById("demo-1-raise-pins").onclick = () => {
      this.ipc.send("raise");
    }
  }
};