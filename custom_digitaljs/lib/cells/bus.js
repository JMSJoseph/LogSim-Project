"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZeroExtendView = exports.ZeroExtend = exports.SignExtendView = exports.SignExtend = exports.BusUngroupView = exports.BusUngroup = exports.BusSliceView = exports.BusSlice = exports.BusRegroupView = exports.BusRegroup = exports.BusGroupView = exports.BusGroup = exports.BitExtendView = exports.BitExtend = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _base = require("./base.js");
var help = _interopRequireWildcard(require("../help.js"));
var _vl = require("3vl");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Bit extending
const BitExtend = exports.BitExtend = _base.Box.define('BitExtend', {
  /* default properties */
  extend: {
    input: 1,
    output: 1
  },
  propagation: 0,
  attrs: {
    value: {
      refX: .5,
      refY: .5,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle'
    }
  }
}, {
  initialize() {
    const extend = this.get('extend');
    console.assert(extend.input <= extend.output);
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: extend.input
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: extend.output
    }];
    _base.Box.prototype.initialize.apply(this, arguments);
    this.on('change:extend', (_, extend) => {
      this._setPortsBits({
        in: extend.input,
        out: extend.output
      });
    });
  },
  operation(data) {
    const ex = this.get('extend');
    return {
      out: data.in.concat(_vl.Vector3vl.make(ex.output - ex.input, this._extBit(data.in)))
    };
  },
  markup: _base.Box.prototype.markup.concat([{
    tagName: 'text',
    className: 'value',
    selector: 'value'
  }]),
  _gateParams: _base.Box.prototype._gateParams.concat(['extend']),
  _operationHelpers: _base.Box.prototype._operationHelpers.concat(['_extBit'])
});
const BitExtendView = exports.BitExtendView = _base.BoxView.extend({
  _autoResizeBox: true,
  _calculateBoxWidth() {
    const text = this.el.querySelector('text.value');
    return text.getBBox().width + 10;
  }
});
const ZeroExtend = exports.ZeroExtend = BitExtend.define('ZeroExtend', {
  attrs: {
    value: {
      text: 'zero-extend'
    }
  }
}, {
  _extBit(i) {
    return -1;
  }
});
const ZeroExtendView = exports.ZeroExtendView = BitExtendView;
const SignExtend = exports.SignExtend = BitExtend.define('SignExtend', {
  attrs: {
    value: {
      text: 'sign-extend'
    }
  }
}, {
  _extBit(i) {
    return i.get(i.bits - 1);
  }
});
const SignExtendView = exports.SignExtendView = BitExtendView;

// Bus slicing
const BusSlice = exports.BusSlice = _base.Box.define('BusSlice', {
  /* default properties */
  slice: {
    first: 0,
    count: 1,
    total: 2
  },
  propagation: 0,
  size: {
    width: 40,
    height: 24
  }
}, {
  initialize() {
    const slice = this.get('slice');
    const val = slice.count == 1 ? slice.first : slice.first + "-" + (slice.first + slice.count - 1);
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: slice.total
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: slice.count,
      portlabel: val,
      labelled: true
    }];
    _base.Box.prototype.initialize.apply(this, arguments);
    this.on('change:slice', (_, slice) => {
      this._setPortsBits({
        in: slice.total,
        out: slice.count
      });
    });
  },
  operation(data) {
    const s = this.get('slice');
    return {
      out: data.in.slice(s.first, s.first + s.count)
    };
  },
  _gateParams: _base.Box.prototype._gateParams.concat(['slice'])
});
const BusSliceView = exports.BusSliceView = _base.BoxView.extend({
  _autoResizeBox: true
});

// Bus grouping
const BusRegroup = exports.BusRegroup = _base.Box.define('BusRegroup', {
  /* default properties */
  groups: [1],
  propagation: 0,
  size: {
    width: 40,
    height: undefined
  }
}, {
  initialize() {
    var bits = 0;
    const ports = [];
    const groups = this.get('groups');
    this.get('size').height = groups.length * 16 + 8;
    for (const [num, gbits] of groups.entries()) {
      const lbl = bits + (gbits > 1 ? '-' + (bits + gbits - 1) : '');
      bits += gbits;
      ports.push({
        id: this.group_dir + num,
        group: this.group_dir,
        dir: this.group_dir,
        bits: gbits,
        portlabel: lbl,
        labelled: true
      });
    }
    this.set('bits', bits);
    const contra = this.group_dir == 'out' ? 'in' : 'out';
    ports.push({
      id: contra,
      group: contra,
      dir: contra,
      bits: bits
    });
    this.get('ports').items = ports;
    _base.Box.prototype.initialize.apply(this, arguments);
  },
  _gateParams: _base.Box.prototype._gateParams.concat(['groups']),
  _unsupportedPropChanges: _base.Box.prototype._unsupportedPropChanges.concat(['groups'])
});
const BusRegroupView = exports.BusRegroupView = _base.BoxView.extend({
  _autoResizeBox: true
});
const BusGroup = exports.BusGroup = BusRegroup.define('BusGroup', {}, {
  group_dir: 'in',
  operation(data) {
    const outdata = [];
    for (const num of this.get('groups').keys()) {
      outdata.push(data['in' + num]);
    }
    return {
      out: _vl.Vector3vl.concat(...outdata)
    };
  }
});
const BusGroupView = exports.BusGroupView = BusRegroupView;
const BusUngroup = exports.BusUngroup = BusRegroup.define('BusUngroup', {}, {
  group_dir: 'out',
  operation(data) {
    const outdata = {};
    let pos = 0;
    for (const [num, gbits] of this.get('groups').entries()) {
      outdata['out' + num] = data.in.slice(pos, pos + gbits);
      pos += gbits;
    }
    return outdata;
  }
});
const BusUngroupView = exports.BusUngroupView = BusRegroupView;