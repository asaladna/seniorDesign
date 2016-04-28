"use strict";

var demo2SceneController = {

  initialize: function(ipc, mousecaster, scene) {
    this.ipc = ipc;
    this.mousecaster = mousecaster;
    this.scene = scene;
    this.sphere = null;
    this.animating = false;
    this.inversed = false;
    this.attachClickHandlers();
  },

  attachClickHandlers: function() {
    document.getElementById("demo-2-show-ball").onclick = () => {
      if (this.sphere === null) {
        this.drawSphere();
      }
      else {
        this.scene.remove(this.sphere);
        this.sphere = null;
      }
    };
    document.getElementById("demo-2-drop-ball").onclick = () => {
      this.dropSphere();
      setTimeout(()=> { this.liftPins(); }, 1150);
    };
    document.getElementById("demo-2-inverse-pins").onclick = () => {
      this.inversePins();
    };
    document.getElementById("demo-2-reset-ball").onclick = () => {
      this.sphere.position.set(50, 100, -60);
    };
  },

  drawSphere: function() {
    var geometry = new THREE.SphereGeometry(35, 55, 55, 0, Math.PI * 3, 0, Math.PI * 2);
    var material = new THREE.MeshNormalMaterial();
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.set(50, 100, -60);
    this.scene.add(this.sphere);
  },

  dropSphere: function() {
    var position = {
      x: this.sphere.position.x,
      y: this.sphere.position.y,
      z: this.sphere.position.z
    };

    var target = {
      x: this.sphere.position.x,
      y: 32,
      z: this.sphere.position.z,
    };

    var update = (x, y, z) => {
      this.sphere.position.x = x;
      this.sphere.position.y = y;
      this.sphere.position.z = z;
    };

    var animate = (time) => {
      if(this.animating !== false) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
    };

    this.animating = true;

    setTimeout(()=> {
      this.animating = false;
    }, 550);

    var tween = new TWEEN.Tween(position)
      .to(target, 700)
      .onUpdate(function() {
        update(this.x, this.y, this.z);
      })
      .easing(TWEEN.Easing.Bounce.Out)
      .start();

    requestAnimationFrame(animate);
  },

  liftPins: function() {
    let state = [
      [4, 4, 2.4, 4],
      [1.8, 0, 1.3, 4],
      [4, 1, 0, 1.5],
      [4, 1.2, 2, 4],
    ];
    this.ipc.send("set", state);
  },

  inversePins: function() {
    if (this.inversed === false) {
      let state = [
        [0, 0, 1.6, 0],
        [2.2, 4, 2.7, 0],
        [0, 3, 4, 2.5],
        [0, 2.8, 2, 0],
      ];
      this.ipc.send("set", state);
      this.inversed = true;
    }
    else {
      this.liftPins();
      this.inversed = false;
    }
  }
};