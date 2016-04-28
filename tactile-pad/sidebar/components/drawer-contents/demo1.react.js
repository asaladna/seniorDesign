"use strict";

import React from "react";
import "./demo.css";

export const Demo1 = (props) => {
  return (
    <div id="demo-controls">
      <div className="demo-row">
        <button id="demo-1-move-up">Click pin up</button>
        <button id="demo-1-move-down">Click pin down</button>
      </div>

      <div className="demo-row">
        <button id="demo-1-reset-pins">Reset all Pins</button>
        <button id="demo-1-raise-pins">Raise all Pins</button>
      </div>
    </div>
  );
};