"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XorView = exports.XorReduceView = exports.XorReduce = exports.Xor = exports.XnorView = exports.XnorReduceView = exports.XnorReduce = exports.Xnor = exports.RepeaterView = exports.Repeater = exports.OrView = exports.OrReduceView = exports.OrReduce = exports.Or = exports.NotView = exports.Not = exports.NorView = exports.NorReduceView = exports.NorReduce = exports.Nor = exports.NandView = exports.NandReduceView = exports.NandReduce = exports.Nand = exports.GateX1 = exports.GateSVG = exports.GateReduce = exports.Gate11 = exports.AndView = exports.AndReduceView = exports.AndReduce = exports.And = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _base = require("./base.js");
var help = _interopRequireWildcard(require("../help.js"));
var _vl = require("3vl");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const and_path = "M19 0v32h16c9 0 16-7 16-16S44 0 35 0H20z";
const or_path = "M14.3 0l1.6 2s4.5 5.6 4.5 14s-4.5 14-4.5 14l-1.6 2H28c3.8 0 16.6-.5 25-16h0A28 28 0 0028 0H16.8z";
const buf_path = "M18-2v36l2-1 32-17h0L20-1z";
const xor_arc_path = "M6.8-1.2 10 2.7S14.2 8 14.2 16S10 29.3 10 29.3l-3.2 3.9H10l1.7-2.4s4.8-6 4.8-14.8c0-8.9-4.8-14.8-4.8-14.8l-1.7-2.4z";
const xor_arc_path_markup = {
  tagName: 'path',
  selector: 'xor_arc',
  attributes: {
    'fill': "#000",
    'd': xor_arc_path
  }
};
const neg_markup = {
  tagName: 'circle',
  className: 'body',
  selector: 'neg_bubble',
  attributes: {
    'stroke': "#000",
    'stroke-width': '2px',
    'cx': 56,
    'cy': 16,
    'r': 4
  }
};
function gateMarkup(children = []) {
  return {
    tagName: 'g',
    selector: 'body',
    children: [{
      tagName: 'path',
      className: 'body gate',
      selector: 'gate'
    }].concat(children)
  };
}

// base class for gates
const GateSVG = exports.GateSVG = _base.Gate.define('GateSVG', {
  /* default properties */
  bits: 1,
  size: {
    width: 60,
    height: 32
  },
  ports: {
    groups: {
      'in': {
        position: {
          name: 'left',
          args: {
            dx: 30
          }
        },
        attrs: {
          wire: {
            x2: -50
          },
          port: {
            refX: -50
          }
        },
        z: -1
      },
      'out': {
        position: {
          name: 'right',
          args: {
            dx: -30
          }
        },
        attrs: {
          wire: {
            x2: 50
          },
          port: {
            refX: 50
          }
        },
        z: -1
      }
    }
  }
}, {
  markup: _base.Gate.prototype.markup.concat([gateMarkup()]),
  _gateParams: _base.Gate.prototype._gateParams.concat(['bits'])
});

// Single-input gate model
const Gate11 = exports.Gate11 = GateSVG.define('Gate11', {}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: bits
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits
    }];
    GateSVG.prototype.initialize.apply(this, arguments);
    this.on('change:bits', (_, bits) => {
      this._setPortsBits({
        in: bits,
        out: bits
      });
    });
  }
});

// Multi-input gate model
const GateX1 = exports.GateX1 = GateSVG.define('GateX1', {
  /* default properties */
  inputs: 2,
  attrs: {
    gate: {
      'vector-effect': 'non-scaling-stroke'
    },
    xor_arc: {
      'vector-effect': 'non-scaling-stroke'
    },
    neg_bubble: {
      'vector-effect': 'non-scaling-stroke'
    }
  }
}, {
  initialize() {
    const bits = this.get('bits');
    const inputs = this.get('inputs');
    const ports = [];
    for (let i = 1; i <= inputs; i++) ports.push({
      id: 'in' + i,
      group: 'in',
      dir: 'in',
      bits: bits
    });
    ports.push({
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits
    });
    this.get('ports').items = ports;
    const scaling = inputs / 2;
    this.set('size', {
      width: 60 * scaling,
      height: 32 * scaling
    });
    this.attr('body/transform', 'translate(-4, 0) scale(' + scaling + ')');
    this.prop('ports/groups/in/position/args/dx', 30 * scaling);
    this.prop('ports/groups/in/attrs/wire/x2', -30 * scaling - 20);
    this.prop('ports/groups/in/attrs/port/refX', -30 * scaling - 20);
    this.prop('ports/groups/out/position/args/dx', -30 * scaling);
    this.prop('ports/groups/out/attrs/wire/x2', 30 * scaling + 20);
    this.prop('ports/groups/out/attrs/port/refX', 30 * scaling + 20);
    GateSVG.prototype.initialize.apply(this, arguments);
    this.on('change:bits', (_, bits) => {
      const inputs = this.get('inputs');
      const param = {
        out: bits
      };
      for (let i = 1; i <= inputs; i++) param['in' + i] = bits;
      this._setPortsBits(param);
    });
  },
  operation(data) {
    let ret = data.in1;
    for (let i = 2; i <= this.get('inputs'); i++) ret = this.binoperation(ret, data['in' + i]);
    return {
      out: this.finoperation(ret)
    };
  },
  finoperation(val) {
    return val;
  },
  _gateParams: GateSVG.prototype._gateParams.concat(['inputs']),
  _unsupportedPropChanges: GateSVG.prototype._unsupportedPropChanges.concat(['inputs']),
  _operationHelpers: GateSVG.prototype._operationHelpers.concat(['binoperation', 'finoperation'])
});

// Reducing gate model
const GateReduce = exports.GateReduce = GateSVG.define('GateReduce', {}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: bits
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: 1
    }];
    GateSVG.prototype.initialize.apply(this, arguments);
    this.on('change:bits', (_, bits) => {
      this._setPortsBits({
        in: bits
      });
    });
  }
});

// Repeater (buffer) gate model
const Repeater = exports.Repeater = Gate11.define('Repeater', {
  attrs: {
    gate: {
      d: buf_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in
    };
  }
});
const RepeaterView = exports.RepeaterView = _base.GateView;

// Not gate model
const Not = exports.Not = Gate11.define('Not', {
  attrs: {
    gate: {
      d: buf_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in.not()
    };
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([neg_markup])])
});
const NotView = exports.NotView = _base.GateView;

// Or gate model
const Or = exports.Or = GateX1.define('Or', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  binoperation(in1, in2) {
    return in1.or(in2);
  }
});
const OrView = exports.OrView = _base.GateView;

// And gate model
const And = exports.And = GateX1.define('And', {
  attrs: {
    gate: {
      d: and_path
    }
  }
}, {
  binoperation(in1, in2) {
    return in1.and(in2);
  }
});
const AndView = exports.AndView = _base.GateView;

// Nor gate model
const Nor = exports.Nor = GateX1.define('Nor', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  binoperation(in1, in2) {
    return in1.or(in2);
  },
  finoperation(val) {
    return val.not();
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([neg_markup])])
});
const NorView = exports.NorView = _base.GateView;

// Nand gate model
const Nand = exports.Nand = GateX1.define('Nand', {
  attrs: {
    gate: {
      d: and_path
    }
  }
}, {
  binoperation(in1, in2) {
    return in1.and(in2);
  },
  finoperation(val) {
    return val.not();
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([neg_markup])])
});
const NandView = exports.NandView = _base.GateView;

// Xor gate model
const Xor = exports.Xor = GateX1.define('Xor', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  binoperation(in1, in2) {
    return in1.xor(in2);
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([xor_arc_path_markup])])
});
const XorView = exports.XorView = _base.GateView;

// Xnor gate model
const Xnor = exports.Xnor = GateX1.define('Xnor', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  binoperation(in1, in2) {
    return in1.xor(in2);
  },
  finoperation(val) {
    return val.not();
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([xor_arc_path_markup, neg_markup])])
});
const XnorView = exports.XnorView = _base.GateView;

// Reducing Or gate model
const OrReduce = exports.OrReduce = GateReduce.define('OrReduce', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in.reduceOr()
    };
  }
});
const OrReduceView = exports.OrReduceView = _base.GateView;

// Reducing Nor gate model
const NorReduce = exports.NorReduce = GateReduce.define('NorReduce', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in.reduceNor()
    };
  },
  markup: GateReduce.prototype.markup.concat([neg_markup])
});
const NorReduceView = exports.NorReduceView = _base.GateView;

// Reducing And gate model
const AndReduce = exports.AndReduce = GateReduce.define('AndReduce', {
  attrs: {
    gate: {
      d: and_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in.reduceAnd()
    };
  }
});
const AndReduceView = exports.AndReduceView = _base.GateView;

// Reducing Nand gate model
const NandReduce = exports.NandReduce = GateReduce.define('NandReduce', {
  attrs: {
    gate: {
      d: and_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in.reduceNand()
    };
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([neg_markup])])
});
const NandReduceView = exports.NandReduceView = _base.GateView;

// Reducing Xor gate model
const XorReduce = exports.XorReduce = GateReduce.define('XorReduce', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in.reduceXor()
    };
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([xor_arc_path_markup])])
});
const XorReduceView = exports.XorReduceView = _base.GateView;

// Reducing Xnor gate model
const XnorReduce = exports.XnorReduce = GateReduce.define('XnorReduce', {
  attrs: {
    gate: {
      d: or_path
    }
  }
}, {
  operation(data) {
    return {
      out: data.in.reduceXnor()
    };
  },
  markup: _base.Gate.prototype.markup.concat([gateMarkup([xor_arc_path_markup, neg_markup])])
});
const XnorReduceView = exports.XnorReduceView = _base.GateView;