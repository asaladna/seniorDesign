"use strict";

import React from "react";
import "./demo.css";

export const Demo2 = (props) => {
  return (
    <div id="demo-controls">
      <div className="demo-row">
        <button id="demo-2-show-ball">Show Ball</button>
        <button id="demo-2-drop-ball">Drop Ball</button>
      </div>

      <div className="demo-row">
        <button id="demo-2-inverse-pins">Inverse Pins</button>
        <button id="demo-2-reset-ball">Reset Ball</button>
      </div>
    </div>
  );
};