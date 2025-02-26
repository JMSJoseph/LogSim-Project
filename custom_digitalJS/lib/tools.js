"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveButton = exports.MonitorButton = exports.DoublyButton = exports.CircleTargetArrowhead = exports.CircleSourceArrowhead = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const circleArrowhead = {
  tagName: 'circle',
  attributes: {
    'r': 7,
    'fill': 'black',
    'fill-opacity': 0.3,
    'stroke': 'black',
    'stroke-width': 2,
    'cursor': 'move'
  }
};
const CircleSourceArrowhead = exports.CircleSourceArrowhead = joint.linkTools.SourceArrowhead.extend(_lodash.default.merge({}, circleArrowhead));
const CircleTargetArrowhead = exports.CircleTargetArrowhead = joint.linkTools.TargetArrowhead.extend(_lodash.default.merge({}, circleArrowhead));
const DoublyButton = exports.DoublyButton = joint.linkTools.Button.extend({
  update() {
    if (this.relatedView.isShortWire()) {
      this.options.distance = this.options.distanceShort || this.options.distance;
      if (this.options.secondary) this.hide();
    } else {
      this.options.distance = this.options.distanceLong || this.options.distance;
    }
    return joint.linkTools.Button.prototype.update.apply(this, arguments);
  }
});
const RemoveButton = exports.RemoveButton = DoublyButton.extend({
  name: 'remove',
  children: joint.linkTools.Remove.prototype.children,
  options: joint.linkTools.Remove.prototype.options
});
const MonitorButton = exports.MonitorButton = DoublyButton.extend({
  name: 'monitor',
  children: [{
    tagName: 'circle',
    selector: 'button',
    attributes: {
      'r': 7,
      'fill': '#001DFF',
      'cursor': 'pointer'
    }
  }, {
    tagName: 'path',
    selector: 'icon',
    attributes: {
      'd': 'm -2.5,-0.5 a 2,2 0 1 0 4,0 2,2 0 1 0 -4,0 M 1,1 3,3',
      'fill': 'none',
      'stroke': '#FFFFFF',
      'stroke-width': 2,
      'pointer-events': 'none'
    }
  }],
  options: {
    action(evt) {
      this.notify('link:monitor');
    }
  }
});