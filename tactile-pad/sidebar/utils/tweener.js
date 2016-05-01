"use strict";

// This is a helper function for managing tweening animations.
// Tween.js requires updating time in an animation frame. With multiple
// things animating, that can become difficult to manage.  This handles
// stopping the animation when multiple tweens are animating.

var TWEEN = require("tween.js");

let isAnimating = false;
let stopAnimationTimoutFunction = null;

function updateTween(time) {
  if (isAnimating) {
    requestAnimationFrame(updateTween);
    TWEEN.update(time);
  }
}

export default function tweener(initial, target, duration) {
  isAnimating = true;

  if (stopAnimationTimoutFunction !== null) {
    clearTimeout(stopAnimationTimoutFunction);
  }

  let _toggle = () => {
    isAnimating = false;
    stopAnimationTimoutFunction = null;
  }

  stopAnimationTimoutFunction = setTimeout(_toggle, duration + 50);

  requestAnimationFrame(updateTween);
  return new TWEEN.Tween(initial).to(target, duration);
}