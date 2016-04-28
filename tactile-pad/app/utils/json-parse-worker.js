"use strict";

onmessage = (e) => {
  postMessage(JSON.parse(e.data));
}