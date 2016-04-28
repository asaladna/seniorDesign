"use strict";

var infoTextController = {

  initialize: function() {
    this.bindClickHandlers();
    this.text = document.getElementById("info-text");
  },

  bindClickHandlers: function() {
    document.getElementById("drawer-row-1").onclick = () => {
      this.renderText("The tactile pad prototype can lift and lower individual pins through this computer interface.  In a production pad, the same interaction could be possible with two physical pads through the internet or a personal area network. This could be useful for remotely interacting with objects, or providing an interface through which to move scenery (e.g. tactilely manipulating a putting green).");
    };
    document.getElementById("drawer-row-2").onclick = () => {
      this.renderText("A production tactile pad will be able to sense objects and key depressions.  While the bump sensing is not fully functional on our prototype, this demonstration shows how the pad could be used to generate 3d shapes for objects that it comes in contact with.  These shapes can be mirrored or inverted by a remote pad.");
    };
    document.getElementById("drawer-row-3").onclick = () => {
      this.renderText("");
    };
  },

  renderText: function(text) {
    this.text.innerHTML = text;
    setTimeout(()=> {
      this.text.innerHTML = "";
    }, 15 * 1000);
  }
};