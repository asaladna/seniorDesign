/*
  Simple structure for holding grid coordinates and extra data about them.
  @author Corey Birnbaum https://github.com/vonWolfehaus/
*/
vg.Cell = function(x, y, q, r, s, h) {
  this.x = x || 0;
  this.y = y || 0;
  this.q = q || 0; // x grid coordinate (using different letters so that it won't be confused with pixel/world coordinates)
  this.r = r || 0; // y grid coordinate
  this.s = s || 0; // z grid coordinate
  this.h = h || 1; // 3D height of the cell, used by visual representation and pathfinder, cannot be less than 1
  this.tile = null; // optional link to the visual representation's class instance
  this.userData = {}; // populate with any extra data needed in your game
  this.walkable = true; // if true, pathfinder will use as a through node
  // rest of these are used by the pathfinder and overwritten at runtime, so don't touch
  this._calcCost = 0;
  this._priority = 0;
  this._visited = false;
  this._parent = null;
  this.uniqueID = Math.random().toString(36).slice(2) + Date.now();
};

vg.Cell.prototype = {
  set: function(q, r, s) {
    this.q = q;
    this.r = r;
    this.s = s;
    return this;
  },

  copy: function(cell) {
    this.q = cell.q;
    this.r = cell.r;
    this.s = cell.s;
    this.h = cell.h;
    this.tile = cell.tile || null;
    this.userData = cell.userData || {};
    this.walkable = cell.walkable;
    return this;
  },

  add: function(cell) {
    this.q += cell.q;
    this.r += cell.r;
    this.s += cell.s;
    return this;
  },

  equals: function(cell) {
    return this.q === cell.q && this.r === cell.r && this.s === cell.s;
  }
};

vg.Cell.prototype.constructor = vg.Cell;