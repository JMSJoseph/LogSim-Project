"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuxView = exports.MuxSparseView = exports.MuxSparse = exports.Mux1HotView = exports.Mux1Hot = exports.Mux = exports.GenMuxView = exports.GenMux = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _lodash = _interopRequireDefault(require("lodash"));
var _base = require("./base.js");
var help = _interopRequireWildcard(require("../help.js"));
var _vl = require("3vl");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// add offset of 30pt to account for the top selection port and oversized box at layout time
const mux_pos_offset = 20;
const mux_size_offset = 30;

// Multiplexers
const GenMux = exports.GenMux = _base.Gate.define('GenMux', {
  /* default properties */
  bits: {
    in: 1,
    sel: 1
  },
  size: {
    width: 40,
    height: undefined
  },
  ports: {
    groups: {
      'in2': {
        position: {
          name: 'top',
          args: {
            y: 5
          }
        },
        attrs: _lodash.default.merge({}, _base.portGroupAttrs, {
          wire: {
            x2: 0,
            y2: -25
          },
          port: {
            magnet: 'passive',
            refY: -25
          },
          bits: {
            refDx: -5,
            refDy: 2,
            textAnchor: 'start'
          }
        }),
        z: -1
      }
    }
  },
  attrs: {
    label: {
      refDy: 8
    }
  }
}, {
  initialize() {
    const bits = this.get('bits');
    const ports = [{
      id: 'sel',
      group: 'in2',
      dir: 'in',
      bits: bits.sel
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits.in
    }];
    const ins = this.muxInputs(bits.sel);
    this.get('size').height = ins.length * 16 + 8;
    const vpath = [[2, 0], [5, 5], [10, -5]];
    const path = 'M' + vpath.map(l => l.join(' ')).join(' L');
    for (const [num, label] of ins.entries()) {
      const port = {
        id: 'in' + num,
        group: 'in',
        dir: 'in',
        bits: bits.in,
        decor: path
      };
      if (label) {
        port.portlabel = String(label);
        port.labelled = true;
      }
      ports.push(port);
    }
    this.get('ports').items = ports;
    _base.Gate.prototype.initialize.apply(this, arguments);
    const drawBorder = size => this.attr(['body', 'points'], [[0, -5], [size.width, 5], [size.width, size.height - 5], [0, size.height + 5]].map(x => x.join(',')).join(' '));
    drawBorder(this.get('size'));
    this.on('change:size', (_, size) => drawBorder(size));
  },
  operation(data) {
    const i = this.muxInput(data.sel);
    if (i === undefined) return {
      out: _vl.Vector3vl.xes(this.get('bits').in)
    };
    return {
      out: data['in' + i]
    };
  },
  getLayoutSize() {
    const size = this.size();
    size.height += mux_size_offset;
    return size;
  },
  setLayoutPosition(position) {
    this.set('position', {
      x: position.x,
      y: position.y + mux_pos_offset
    });
  },
  getPortsPositions() {
    const positions = _base.Gate.prototype.getPortsPositions.apply(this, arguments);
    const res = {};
    for (const id in positions) {
      res[id] = {
        ...positions[id]
      };
      res[id].y = res[id].y + mux_pos_offset;
    }
    return res;
  },
  markup: _base.Gate.prototype.markup.concat([{
    tagName: 'polygon',
    className: 'body',
    selector: 'body'
  }]),
  _gateParams: _base.Gate.prototype._gateParams.concat(['bits']),
  _unsupportedPropChanges: _base.Gate.prototype._unsupportedPropChanges.concat(['bits']),
  _operationHelpers: _base.Gate.prototype._operationHelpers.concat(['muxInput'])
});
const GenMuxView = exports.GenMuxView = _base.GateView.extend({
  initialize() {
    this.ins = this.model.muxInputs(this.model.get('bits').sel);
    _base.GateView.prototype.initialize.apply(this, arguments);
  },
  confirmUpdate(flags) {
    _base.GateView.prototype.confirmUpdate.apply(this, arguments);
    if (this.hasFlag(flags, 'SIGNAL')) {
      this._updateMux(this.model.get('inputSignals'));
    }
  },
  render() {
    _base.GateView.prototype.render.apply(this, arguments);
    this._updateMux(this.model.get('inputSignals'));
  },
  _updateMux(data) {
    const i = this.model.muxInput(data.sel);
    for (const num of this.ins.keys()) {
      this.$('[port=in' + num + '] path.decor').css('visibility', i == num ? 'visible' : 'hidden');
    }
  }
});

// Multiplexer with binary selection
const Mux = exports.Mux = GenMux.define('Mux', {}, {
  muxInputs: n => Array(1 << n),
  muxInput: i => i.isFullyDefined ? i.toBigInt().toString() : undefined
});
const MuxView = exports.MuxView = GenMuxView;

// Multiplexer with one-hot selection
const Mux1Hot = exports.Mux1Hot = GenMux.define('Mux1Hot', {
  attrs: {
    info: {
      refX: .5,
      refY: .5,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      text: '1Hot',
      transform: 'rotate(90)'
    }
  }
}, {
  markup: GenMux.prototype.markup.concat([{
    tagName: 'text',
    className: 'info',
    selector: 'info'
  }]),
  muxInputs: n => Array(n + 1),
  muxInput: s => {
    const i = s.toArray();
    return s.isFullyDefined && i.filter(x => x == 1).length <= 1 ? String(i.indexOf(1) + 1) : undefined;
  }
});
const Mux1HotView = exports.Mux1HotView = GenMuxView;
const MuxSparse = exports.MuxSparse = GenMux.define('MuxSparse', {
  /* default properties */
  inputs: undefined,
  default_input: false
}, {
  initialize() {
    const inputs = this.get('inputs');
    for (let i = 0; i < inputs.length; i++) if (typeof inputs[i] != 'bigint') inputs[i] = BigInt(inputs[i]);
    GenMux.prototype.initialize.apply(this, arguments);
  },
  muxInputs(n) {
    if (this.get('default_input')) return ['*'].concat(this.get('inputs'));else return this.get('inputs');
  },
  muxInput(i) {
    const deflt = this.get('default_input');
    if (!i.isFullyDefined) return undefined;
    const idx = this.get('inputs').indexOf(i.toBigInt());
    return idx < 0 ? deflt ? 0 : undefined : deflt ? idx + 1 : idx;
  },
  _gateParams: GenMux.prototype._gateParams.concat(['inputs', 'default_input']),
  _unsupportedPropChanges: GenMux.prototype._unsupportedPropChanges.concat(['inputs', 'default_input'])
});
const MuxSparseView = exports.MuxSparseView = GenMuxView;