"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DffView = exports.Dff = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _base = require("./base.js");
var help = _interopRequireWildcard(require("../help.js"));
var _vl = require("3vl");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// D flip-flops
const Dff = exports.Dff = _base.Box.define('Dff', {
  /* default properties */
  bits: 1,
  initial: 'x',
  size: {
    width: 80,
    height: undefined
  },
  ports: {
    groups: {
      'in': {
        position: _base.Box.prototype._getStackedPosition({
          side: 'left'
        })
      },
      'out': {
        position: _base.Box.prototype._getStackedPosition({
          side: 'right'
        })
      }
    }
  }
}, {
  initialize() {
    const bits = this.get('bits');
    const initial = this.get('initial');
    const polarity = this.get('polarity') || {};
    const ports = [];
    if (!this.get('no_data')) ports.push({
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: bits,
      portlabel: 'D',
      labelled: true
    });
    ports.push({
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits,
      portlabel: 'Q',
      labelled: true
    });
    if ('arst' in polarity && !this.get('arst_value')) this.set('arst_value', Array(bits).fill('0').join(''));
    if ('srst' in polarity && !this.get('srst_value')) this.set('srst_value', Array(bits).fill('0').join(''));
    let num = 1;
    if ('aload' in polarity) {
      num += 2;
      ports.push({
        id: 'ain',
        group: 'in',
        dir: 'in',
        bits: bits,
        portlabel: 'AD',
        labelled: true
      });
      ports.push({
        id: 'aload',
        group: 'in',
        dir: 'in',
        bits: 1,
        polarity: polarity.aload,
        labelled: true
      });
    }
    if ('clock' in polarity) {
      num++;
      ports.push({
        id: 'clk',
        group: 'in',
        dir: 'in',
        bits: 1,
        polarity: polarity.clock,
        decor: _base.Box.prototype.decorClock,
        labelled: true
      });
    }
    if ('set' in polarity) {
      num++;
      ports.push({
        id: 'set',
        group: 'in',
        dir: 'in',
        bits: bits,
        polarity: polarity.set,
        portlabel: 'S',
        labelled: true
      });
    }
    if ('clr' in polarity) {
      num++;
      ports.push({
        id: 'clr',
        group: 'in',
        dir: 'in',
        bits: bits,
        polarity: polarity.clr,
        portlabel: 'R',
        labelled: true
      });
    }
    if ('srst' in polarity) {
      num++;
      ports.push({
        id: 'srst',
        group: 'in',
        dir: 'in',
        bits: 1,
        polarity: polarity.srst,
        labelled: true
      });
    }
    if ('arst' in polarity) {
      num++;
      ports.push({
        id: 'arst',
        group: 'in',
        dir: 'in',
        bits: 1,
        polarity: polarity.arst,
        labelled: true
      });
    }
    if ('enable' in polarity) {
      num++;
      ports.push({
        id: 'en',
        group: 'in',
        dir: 'in',
        bits: 1,
        polarity: polarity.enable,
        labelled: true
      });
    }
    this.get('size').height = num * 16 + 8;
    this.get('ports').items = ports;
    this.last_clk = 0;
    _base.Box.prototype.initialize.apply(this, arguments);
  },
  _resetPortValue(port) {
    if (port.id == "out" && port.dir == "out") return _vl.Vector3vl.fromBin(this.get('initial'), port.bits);else return _base.Box.prototype._resetPortValue.call(this, port);
  },
  operation(data) {
    const polarity = this.get('polarity');
    const pol = what => polarity[what] ? 1 : -1;
    let last_clk, srbits, srbitmask;
    const apply_sr = v => ({
      out: srbits ? v.and(srbitmask).or(srbits) : v
    });
    if ('clock' in polarity) {
      last_clk = this.last_clk;
      this.last_clk = data.clk.get(0);
    }
    if ('arst' in polarity && data.arst.get(0) == pol('arst')) return {
      out: _vl.Vector3vl.fromBin(this.get('arst_value'), this.get('bits'))
    };
    if ('aload' in polarity && data.aload.get(0) == pol('aload')) return {
      out: data.ain
    };
    if ('set' in polarity) {
      srbits = polarity.set ? data.set : data.set.not();
      srbitmask = polarity.set ? data.set.not() : data.set;
    }
    if ('clr' in polarity) {
      srbits = srbits ? srbits : _vl.Vector3vl.zeros(this.get('bits'));
      const clrbitmask = polarity.clr ? data.clr.not() : data.clr;
      srbitmask = srbitmask ? clrbitmask.and(srbitmask) : clrbitmask;
    }
    if ('enable' in polarity && data.en.get(0) != pol('enable') && this.get('enable_srst')) return apply_sr(this.get('outputSignals').out);
    if (!('clock' in polarity) || data.clk.get(0) == pol('clock') && last_clk == -pol('clock')) {
      if ('srst' in polarity && data.srst.get(0) == pol('srst')) return apply_sr(_vl.Vector3vl.fromBin(this.get('srst_value'), this.get('bits')));
      if ('enable' in polarity && data.en.get(0) != pol('enable') && !this.get('enable_srst')) return apply_sr(this.get('outputSignals').out);
      if (this.get('no_data')) return apply_sr(this.get('outputSignals').out);
      return apply_sr(data.in);
    } else return apply_sr(this.get('outputSignals').out);
  },
  _gateParams: _base.Box.prototype._gateParams.concat(['polarity', 'bits', 'initial', 'arst_value', 'srst_value', 'enable_srst', 'no_data']),
  _unsupportedPropChanges: _base.Box.prototype._unsupportedPropChanges.concat(['polarity', 'bits', 'initial', 'arst_value', 'srst_value', 'enable_srst', 'no_data'])
});
const DffView = exports.DffView = _base.BoxView.extend({
  _autoResizeBox: true
});