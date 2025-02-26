"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _synch = require("./engines/synch.js");
Object.keys(_synch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _synch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _synch[key];
    }
  });
});
var _browsersynch = require("./engines/browsersynch.js");
Object.keys(_browsersynch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _browsersynch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _browsersynch[key];
    }
  });
});
var _worker = require("./engines/worker.js");
Object.keys(_worker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _worker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _worker[key];
    }
  });
});