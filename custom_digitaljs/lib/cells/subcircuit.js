"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubcircuitView = exports.Subcircuit = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _lodash = _interopRequireDefault(require("lodash"));
var _base = require("./base.js");
var _io = require("./io.js");
var help = _interopRequireWildcard(require("../help.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// add offset of 10pt to account for the top label at layout time
const subcircuit_pos_offset = 10;
const subcircuit_size_offset = 10;

// Subcircuit model -- embeds a circuit graph in an element
const Subcircuit = exports.Subcircuit = _base.Box.define('Subcircuit', {
  /* default properties */
  propagation: 0,
  warning: false,
  attrs: {
    wrapper: {
      refWidth: 1,
      refHeight: 1,
      stroke: 'red',
      strokeWidth: 10
    },
    type: {
      refX: .5,
      refY: -10,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle'
    }
  }
}, {
  initialize() {
    this.bindAttrToProp('text.type/text', 'celltype');
    const graph = this.get('graph');
    console.assert(graph instanceof joint.dia.Graph);
    graph.set('subcircuit', this);
    const IOs = graph.getCells().filter(cell => cell instanceof _io.IO);
    const inputs = IOs.filter(cell => cell instanceof _io.Input);
    const outputs = IOs.filter(cell => cell instanceof _io.Output);
    function sortfun(x, y) {
      if (x.has('order') || y.has('order')) return x.get('order') - y.get('order');
      return x.get('net').localeCompare(y.get('net'));
    }
    inputs.sort(sortfun);
    outputs.sort(sortfun);
    const vcount = Math.max(inputs.length, outputs.length);
    const size = {
      width: 80,
      height: vcount * 16 + 8
    };
    const ports = [],
      iomap = {};
    for (const [num, io] of inputs.entries()) {
      ports.push({
        id: io.get('net'),
        group: 'in',
        dir: 'in',
        bits: io.get('bits'),
        labelled: true
      });
    }
    for (const [num, io] of outputs.entries()) {
      ports.push({
        id: io.get('net'),
        group: 'out',
        dir: 'out',
        bits: io.get('bits'),
        labelled: true
      });
    }
    for (const io of IOs) {
      iomap[io.get('net')] = io.get('id');
    }
    this.set('size', size);
    this.set('circuitIOmap', iomap);
    this.get('ports').items = ports;
    this.set('warning', graph._warnings > 0);
    _base.Box.prototype.initialize.apply(this, arguments);
  },
  _resetPortValue(port) {
    const iomap = this.get('circuitIOmap');
    const graph = this.get('graph');
    if (port.dir == 'in') return graph.getCell(iomap[port.id]).get('outputSignals').out;
    if (port.dir == 'out') return graph.getCell(iomap[port.id]).get('inputSignals').in;
    return _base.Box.prototype._resetPortValue.call(this, port);
  },
  getLayoutSize() {
    const size = this.size();
    size.height += subcircuit_size_offset;
    return size;
  },
  setLayoutPosition(position) {
    this.set('position', {
      x: position.x,
      y: position.y + subcircuit_pos_offset
    });
  },
  getPortsPositions() {
    const positions = _base.Box.prototype.getPortsPositions.apply(this, arguments);
    const res = {};
    for (const id in positions) {
      res[id] = {
        ...positions[id]
      };
      res[id].y = res[id].y + subcircuit_pos_offset;
    }
    return res;
  },
  markup: [{
    tagName: 'rect',
    selector: 'wrapper'
  }].concat(_base.Box.prototype.markup, [{
    tagName: 'text',
    className: 'type',
    selector: 'type'
  }], _base.Box.prototype.markupZoom),
  _gateParams: _base.Box.prototype._gateParams.concat(['celltype']),
  _unsupportedPropChanges: _base.Box.prototype._unsupportedPropChanges.concat(['celltype'])
});
const SubcircuitView = exports.SubcircuitView = _base.BoxView.extend({
  attrs: _lodash.default.merge({}, _base.BoxView.prototype.attrs, {
    warning: {
      warn: {
        wrapper: {
          'stroke-opacity': '0.5'
        }
      },
      none: {
        wrapper: {
          'stroke-opacity': '0'
        }
      }
    }
  }),
  _autoResizeBox: true,
  presentationAttributes: _base.BoxView.addPresentationAttributes({
    warning: 'WARNING'
  }),
  confirmUpdate(flags) {
    _base.BoxView.prototype.confirmUpdate.apply(this, arguments);
    if (this.hasFlag(flags, 'WARNING')) {
      this._updateWarning();
    }
  },
  _updateWarning() {
    const warning = this.model.get('warning');
    const attrs = this.attrs.warning[warning ? 'warn' : 'none'];
    this._applyAttrs(attrs);
  },
  update() {
    _base.BoxView.prototype.update.apply(this, arguments);
    this._updateWarning();
  },
  events: {
    "click foreignObject.tooltip": "stopprop",
    "mousedown foreignObject.tooltip": "stopprop",
    "touchstart foreignObject.tooltip": "stopprop",
    // make sure the input receives focus
    "click a.zoom": "zoomInCircuit"
  },
  zoomInCircuit(evt) {
    evt.stopPropagation();
    this.paper.trigger('open:subcircuit', this.model);
    return false;
  }
});