"use strict";

import React from "react";
import "./sidebar.css";
import { Drawer } from "./drawer.react";
import tweener from "../utils/tweener";
var TWEEN = require("tween.js");

import { Demo1 } from "./drawer-contents/demo1.react";
import { Demo2 } from "./drawer-contents/demo2.react";


export class SideBar extends React.Component {

  constructor() {
    super();

    this.state = {
      hover: false,
      translate: -200,
      active: 0,
    };

    this._animateSidebar = this._animateSidebar.bind(this);
    this._activate = this._activate.bind(this);
    this._hoverIn = this._hoverIn.bind(this);
    this._hoverOut = this._hoverOut.bind(this);
  }

  _animateSidebar(target) {
    let dimensions = { translate: this.state.translate };
    this.setState({ hover: !this.state.hover });

    let update = (t) => {
      this.setState({ translate: t });
    };

    const tween = tweener(dimensions, target, 500)
      .easing(TWEEN.Easing.Quartic.Out)
      .onUpdate(function() {
        update(this.translate);
      })
      .start();
  }

  _hoverIn() {
    this._animateSidebar({translate: 0});
  }

  _hoverOut() {
    this._animateSidebar({translate: -200});
  }

  _activate(i) {
    this.setState({active: i});
  }

  componentDidUpdate() {
    document.getElementById("slide-right").style.transform =
      "translate(" + this.state.translate + "px, 0px)";
  }

  render() {
    return (
      <div className="sidebar"
       id="slide-right"
       onMouseEnter={this._hoverIn}
       onMouseLeave={this._hoverOut}
      >
        <Drawer
         index={1}
         title="demo 1"
         onClick={this._activate}
         canOpen={this.state.active === 1}
        >
          <Demo1/>
        </Drawer>

        <Drawer
         index={2}
         title="demo 2"
         onClick={this._activate}
         canOpen={this.state.active === 2}
        >
          <Demo2/>
        </Drawer>

        <Drawer
         index={3}
         title="demo 3"
         onClick={this._activate}
         canOpen={this.state.active === 3}
        >
          <div className="drawer-row"> The third demo is currently </div>
          <div className="drawer-row"> under development. </div>
        </Drawer>

      </div>
    );
  }
}