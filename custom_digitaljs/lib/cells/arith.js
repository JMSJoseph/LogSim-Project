"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnaryPlusView = exports.UnaryPlus = exports.SubtractionView = exports.SubtractionConstView = exports.SubtractionConst = exports.Subtraction = exports.ShiftRightView = exports.ShiftRightConstView = exports.ShiftRightConst = exports.ShiftRight = exports.ShiftLeftView = exports.ShiftLeftConstView = exports.ShiftLeftConst = exports.ShiftLeft = exports.ShiftConst = exports.Shift = exports.PowerView = exports.PowerConstView = exports.PowerConst = exports.Power = exports.OpConst = exports.NegationView = exports.Negation = exports.NeView = exports.NeConstView = exports.NeConst = exports.Ne = exports.MultiplicationView = exports.MultiplicationConstView = exports.MultiplicationConst = exports.Multiplication = exports.ModuloView = exports.ModuloConstView = exports.ModuloConst = exports.Modulo = exports.LtView = exports.LtConstView = exports.LtConst = exports.Lt = exports.LeView = exports.LeConstView = exports.LeConst = exports.Le = exports.GtView = exports.GtConstView = exports.GtConst = exports.Gt = exports.GeView = exports.GeConstView = exports.GeConst = exports.Ge = exports.EqView = exports.EqConstView = exports.EqConst = exports.EqCompareConst = exports.EqCompare = exports.Eq = exports.DivisionView = exports.DivisionConstView = exports.DivisionConst = exports.Division = exports.CompareConst = exports.Compare = exports.BaseCompareConst = exports.BaseCompare = exports.ArithConst = exports.Arith21 = exports.Arith11 = exports.Arith = exports.AdditionView = exports.AdditionConstView = exports.AdditionConst = exports.Addition = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _base = require("./base.js");
var help = _interopRequireWildcard(require("../help.js"));
var _vl = require("3vl");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function isSafeInteger(v) {
  return v <= Number.MAX_SAFE_INTEGER && v >= -Number.MAX_SAFE_INTEGER;
}

// base class for arithmetic operations displayed with a circle
const Arith = exports.Arith = _base.Gate.define('Arith', {
  size: {
    width: 40,
    height: 40
  },
  attrs: {
    body: {
      refR: 0.5,
      refCx: 0.5,
      refCy: 0.5
    },
    oper: {
      refX: .5,
      refY: .5,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      fontSize: '12pt'
    }
  },
  ports: {
    groups: {
      'in': {
        position: {
          name: 'left',
          args: {
            dx: 10
          }
        },
        attrs: {
          wire: {
            x2: -35
          },
          port: {
            refX: -35
          }
        },
        z: -1
      },
      'out': {
        position: {
          name: 'right',
          args: {
            dx: -10
          }
        },
        attrs: {
          wire: {
            x2: 35
          },
          port: {
            refX: 35
          }
        },
        z: -1
      }
    }
  }
}, {
  markup: _base.Gate.prototype.markup.concat([{
    tagName: 'circle',
    className: 'body',
    selector: 'body'
  }, {
    tagName: 'text',
    className: 'oper',
    selector: 'oper'
  }]),
  _gateParams: _base.Gate.prototype._gateParams.concat(['bits', 'signed']),
  _unsupportedPropChanges: _base.Gate.prototype._unsupportedPropChanges.concat(['signed'])
});

// Unary arithmetic operations
const Arith11 = exports.Arith11 = Arith.define('Arith11', {
  /* default properties */
  bits: {
    in: 1,
    out: 1
  },
  signed: false
}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: bits.in
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits.out
    }];
    Arith.prototype.initialize.apply(this, arguments);
    this.on('change:bits', (_, bits) => {
      this._setPortsBits(bits);
    });
  },
  operation(data) {
    const bits = this.get('bits');
    if (!data.in.isFullyDefined) return {
      out: _vl.Vector3vl.xes(bits.out)
    };
    return {
      out: _vl.Vector3vl.fromNumber(this.arithop(data.in.toBigInt(this.get('signed'))), bits.out)
    };
  },
  _operationHelpers: Arith.prototype._operationHelpers.concat(['arithop'])
});

// Binary arithmetic operations
const Arith21 = exports.Arith21 = Arith.define('Arith21', {
  /* default properties */
  bits: {
    in1: 1,
    in2: 1,
    out: 1
  },
  signed: {
    in1: false,
    in2: false
  }
}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in1',
      group: 'in',
      dir: 'in',
      bits: bits.in1
    }, {
      id: 'in2',
      group: 'in',
      dir: 'in',
      bits: bits.in2
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits.out
    }];
    Arith.prototype.initialize.apply(this, arguments);
    this.on('change:bits', (_, bits) => {
      this._setPortsBits(bits);
    });
  },
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    if (!data.in1.isFullyDefined || !data.in2.isFullyDefined) return {
      out: _vl.Vector3vl.xes(bits.out)
    };
    return {
      out: _vl.Vector3vl.fromNumber(this.arithop(data.in1.toBigInt(sgn.in1 && sgn.in2), data.in2.toBigInt(sgn.in1 && sgn.in2)), bits.out)
    };
  },
  _operationHelpers: Arith.prototype._operationHelpers.concat(['arithop'])
});
function shiftHelp(in1, am, bits_in, bits_out, sgn_in, sgn_out, fillx) {
  const signbit = in1.get(in1.bits - 1);
  const ext = _vl.Vector3vl.make(Math.max(0, bits_out - bits_in), fillx ? 0 : sgn_in ? signbit : -1);
  const my_in = in1.concat(ext);
  const out = am < 0 ? _vl.Vector3vl.make(-am, fillx ? 0 : -1).concat(my_in) : my_in.slice(am).concat(_vl.Vector3vl.make(am, fillx ? 0 : sgn_out ? my_in.get(my_in.bits - 1) : -1));
  return out.slice(0, bits_out);
}

// Bit shift operations
const Shift = exports.Shift = Arith.define('Shift', {
  /* default properties */
  bits: {
    in1: 1,
    in2: 1,
    out: 1
  },
  signed: {
    in1: false,
    in2: false,
    out: false
  },
  fillx: false
}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in1',
      group: 'in',
      dir: 'in',
      bits: bits.in1
    }, {
      id: 'in2',
      group: 'in',
      dir: 'in',
      bits: bits.in2
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits.out
    }];
    Arith.prototype.initialize.apply(this, arguments);
    this.on('change:bits', (_, bits) => {
      this._setPortsBits(bits);
    });
  },
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    const fillx = this.get('fillx');
    if (!data.in2.isFullyDefined) return {
      out: _vl.Vector3vl.xes(bits.out)
    };
    const am = data.in2.toNumber(sgn.in2) * this.shiftdir;
    return {
      out: shiftHelp(data.in1, am, bits.in1, bits.out, sgn.in1, sgn.out, fillx)
    };
  },
  _gateParams: Arith.prototype._gateParams.concat(['fillx']),
  _unsupportedPropChanges: Arith.prototype._unsupportedPropChanges.concat(['fillx']),
  _operationHelpers: Arith.prototype._operationHelpers.concat(['shiftdir'])
});

// Comparison operations
const BaseCompare = exports.BaseCompare = Arith.define('BaseCompare', {
  /* default properties */
  bits: {
    in1: 1,
    in2: 1
  },
  signed: {
    in1: false,
    in2: false
  }
}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in1',
      group: 'in',
      dir: 'in',
      bits: bits.in1
    }, {
      id: 'in2',
      group: 'in',
      dir: 'in',
      bits: bits.in2
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: 1
    }];
    Arith.prototype.initialize.apply(this, arguments);
    this.on('change:bits', (_, bits) => {
      this._setPortsBits(bits);
    });
  }
});

// Arithmetic comparison operations
const Compare = exports.Compare = BaseCompare.define('Compare', {}, {
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    if (!data.in1.isFullyDefined || !data.in2.isFullyDefined) return {
      out: _vl.Vector3vl.xes(1)
    };
    return {
      out: _vl.Vector3vl.fromBool(this.arithcomp(data.in1.toBigInt(sgn.in1 && sgn.in2), data.in2.toBigInt(sgn.in1 && sgn.in2)))
    };
  },
  _operationHelpers: BaseCompare.prototype._operationHelpers.concat(['arithcomp'])
});

// Equality operations
const EqCompare = exports.EqCompare = BaseCompare.define('EqCompare', {}, {
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    const in1 = bits.in1 >= bits.in2 ? data.in1 : data.in1.concat(_vl.Vector3vl.make(bits.in2 - bits.in1, sgn.in1 && sgn.in2 ? data.in1.msb : -1));
    const in2 = bits.in2 >= bits.in1 ? data.in2 : data.in2.concat(_vl.Vector3vl.make(bits.in1 - bits.in2, sgn.in1 && sgn.in2 ? data.in2.msb : -1));
    return {
      out: this.bincomp(in1, in2)
    };
  },
  _operationHelpers: BaseCompare.prototype._operationHelpers.concat(['bincomp'])
});

// Negation
const Negation = exports.Negation = Arith11.define('Negation', {
  attrs: {
    oper: {
      text: '-'
    }
  }
}, {
  arithop: i => -i
});
const NegationView = exports.NegationView = _base.GateView;

// Unary plus
const UnaryPlus = exports.UnaryPlus = Arith11.define('UnaryPlus', {
  attrs: {
    oper: {
      text: '+'
    }
  }
}, {
  arithop: i => i
});
const UnaryPlusView = exports.UnaryPlusView = _base.GateView;

// Addition
const Addition = exports.Addition = Arith21.define('Addition', {
  attrs: {
    oper: {
      text: '+'
    }
  }
}, {
  arithop: (i, j) => i + j
});
const AdditionView = exports.AdditionView = _base.GateView;

// Subtraction
const Subtraction = exports.Subtraction = Arith21.define('Subtraction', {
  attrs: {
    oper: {
      text: '-'
    }
  }
}, {
  arithop: (i, j) => i - j
});
const SubtractionView = exports.SubtractionView = _base.GateView;

// Multiplication
const Multiplication = exports.Multiplication = Arith21.define('Multiplication', {
  attrs: {
    oper: {
      text: '×'
    }
  }
}, {
  arithop: (i, j) => i * j
});
const MultiplicationView = exports.MultiplicationView = _base.GateView;

// Division
const Division = exports.Division = Arith21.define('Division', {
  attrs: {
    oper: {
      text: '÷'
    }
  }
}, {
  arithop: (i, j) => j == 0n ? i : i / j // as in IEEE Verilog
});
const DivisionView = exports.DivisionView = _base.GateView;

// Modulo
const Modulo = exports.Modulo = Arith21.define('Modulo', {
  attrs: {
    oper: {
      text: '%'
    }
  }
}, {
  arithop: (i, j) => j == 0n ? i : i % j // as in IEEE Verilog
});
const ModuloView = exports.ModuloView = _base.GateView;

// Power
const Power = exports.Power = Arith21.define('Power', {
  attrs: {
    oper: {
      text: '^'
    }
  }
}, {
  arithop: (i, j) => j >= 0n ? i ** j : i == 1n ? 1n : i == -1n ? j % 2n ? -1n : 1n : 0n
});
const PowerView = exports.PowerView = _base.GateView;

// Shift left operator
const ShiftLeft = exports.ShiftLeft = Shift.define('ShiftLeft', {
  attrs: {
    oper: {
      text: '≪'
    }
  }
}, {
  shiftdir: -1
});
const ShiftLeftView = exports.ShiftLeftView = _base.GateView;

// Shift right operator
const ShiftRight = exports.ShiftRight = Shift.define('ShiftRight', {
  attrs: {
    oper: {
      text: '≫'
    }
  }
}, {
  shiftdir: 1
});
const ShiftRightView = exports.ShiftRightView = _base.GateView;

// Less than operator
const Lt = exports.Lt = Compare.define('Lt', {
  attrs: {
    oper: {
      text: '<'
    }
  }
}, {
  arithcomp: (i, j) => i < j
});
const LtView = exports.LtView = _base.GateView;

// Less or equal operator
const Le = exports.Le = Compare.define('Le', {
  attrs: {
    oper: {
      text: '≤'
    }
  }
}, {
  arithcomp: (i, j) => i <= j
});
const LeView = exports.LeView = _base.GateView;

// Greater than operator
const Gt = exports.Gt = Compare.define('Gt', {
  attrs: {
    oper: {
      text: '>'
    }
  }
}, {
  arithcomp: (i, j) => i > j
});
const GtView = exports.GtView = _base.GateView;

// Less than operator
const Ge = exports.Ge = Compare.define('Ge', {
  attrs: {
    oper: {
      text: '≥'
    }
  }
}, {
  arithcomp: (i, j) => i >= j
});
const GeView = exports.GeView = _base.GateView;

// Equality operator
const Eq = exports.Eq = EqCompare.define('Eq', {
  attrs: {
    oper: {
      text: '='
    }
  }
}, {
  bincomp: (i, j) => i.xnor(j).reduceAnd()
});
const EqView = exports.EqView = _base.GateView;

// Nonequality operator
const Ne = exports.Ne = EqCompare.define('Ne', {
  attrs: {
    oper: {
      text: '≠'
    }
  }
}, {
  bincomp: (i, j) => i.xor(j).reduceOr()
});
const NeView = exports.NeView = _base.GateView;
const OpConst = exports.OpConst = Arith.define('OpConst', {
  leftOp: false,
  constant: 0
}, {
  initialize() {
    Arith.prototype.initialize.apply(this, arguments);
    let constant = this.get('constant');
    if (typeof constant === 'string' || constant instanceof String) {
      constant = BigInt(constant);
      if (isSafeInteger(constant)) constant = Number(constant);
      this.set('constant', constant);
    }
    const genLabel = () => {
      const constantSize = String(this.get('constant')).length;
      const diameter = 30 + constantSize * 10;
      this.prop("size", {
        width: diameter,
        height: diameter
      });
      this.attr("oper/text", this.get('leftOp') ? this.get('constant') + this.operSymbol : this.operSymbol + this.get('constant'));
    };
    genLabel();
    this.on('change:bits', (_, bits) => {
      this._setPortsBits(bits);
    });
    this.on('change:constant', () => genLabel());
    this.on('change:leftOp', () => genLabel());
  },
  getGateParams() {
    const params = Arith.prototype.getGateParams.apply(this, arguments);
    // `constant` may be a bigint and we need to encode it manually
    if (typeof params.constant === 'bigint') {
      if (isSafeInteger(params.constant)) {
        params.constant = Number(params.constant);
      } else {
        params.constant = String(params.constant);
      }
    }
    return params;
  },
  _gateParams: Arith.prototype._gateParams.concat(['leftOp', 'constant'])
});

// Arithmetic operations fused with constants
const ArithConst = exports.ArithConst = OpConst.define('ArithConst', {
  /* default properties */
  bits: {
    in: 1,
    out: 1
  },
  signed: false
}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: bits.in
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits.out
    }];
    OpConst.prototype.initialize.apply(this, arguments);
  },
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    const constant = this.get('constant');
    if (!data.in.isFullyDefined) return {
      out: _vl.Vector3vl.xes(bits.out)
    };
    if (this.get('leftOp')) return {
      out: _vl.Vector3vl.fromNumber(this.arithop(BigInt(constant), data.in.toBigInt(sgn.in)), bits.out)
    };else return {
      out: _vl.Vector3vl.fromNumber(this.arithop(data.in.toBigInt(sgn.in), BigInt(constant)), bits.out)
    };
  },
  _operationHelpers: OpConst.prototype._operationHelpers.concat(['arithop'])
});

// Bit shift operations fused with constants
const ShiftConst = exports.ShiftConst = OpConst.define('ShiftConst', {
  /* default properties */
  bits: {
    in: 1,
    out: 1
  },
  signed: {
    in: false,
    out: false
  },
  fillx: false
}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: bits.in
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: bits.out
    }];
    OpConst.prototype.initialize.apply(this, arguments);
  },
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    const fillx = this.get('fillx');
    const constant = this.get('constant');
    if (this.get('leftOp')) {
      if (!data.in.isFullyDefined) return {
        out: _vl.Vector3vl.xes(bits.out)
      };
      const am = data.in.toNumber(sgn.in);
      const sig = _vl.Vector3vl.fromNumber(constant);
      return {
        out: shiftHelp(sig, am * this.shiftdir, sig.bits, bits.out, constant < 0, sgn.out, fillx)
      };
    } else {
      console.assert(isSafeInteger(constant));
      return {
        out: shiftHelp(data.in, Number(constant) * this.shiftdir, bits.in, bits.out, sgn.in, sgn.out, fillx)
      };
    }
  },
  _gateParams: OpConst.prototype._gateParams.concat(['fillx']),
  _operationHelpers: OpConst.prototype._operationHelpers.concat(['shiftdir'])
});

// Comparison operations fused with constants
const BaseCompareConst = exports.BaseCompareConst = OpConst.define('BaseCompareConst', {
  /* default properties */
  bits: {
    in: 1
  },
  signed: false
}, {
  initialize() {
    const bits = this.get('bits');
    this.get('ports').items = [{
      id: 'in',
      group: 'in',
      dir: 'in',
      bits: bits.in
    }, {
      id: 'out',
      group: 'out',
      dir: 'out',
      bits: 1
    }];
    OpConst.prototype.initialize.apply(this, arguments);
  }
});

// Arithmetic comparisons fused with constants
const CompareConst = exports.CompareConst = BaseCompareConst.define('CompareConst', {}, {
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    const constant = this.get('constant');
    if (!data.in.isFullyDefined) return {
      out: _vl.Vector3vl.x
    };
    if (this.get('leftOp')) return {
      out: _vl.Vector3vl.fromBool(this.arithcomp(BigInt(constant), data.in.toBigInt(sgn.in)))
    };else return {
      out: _vl.Vector3vl.fromBool(this.arithcomp(data.in.toBigInt(sgn.in), BigInt(constant)))
    };
  },
  _operationHelpers: BaseCompareConst.prototype._operationHelpers.concat(['arithcomp'])
});

// Equality operations fused with constants
const EqCompareConst = exports.EqCompareConst = BaseCompareConst.define('EqCompareConst', {}, {
  operation(data) {
    const bits = this.get('bits');
    const sgn = this.get('signed');
    const constant = this.get('constant');
    if (this.get('leftOp')) return {
      out: this.bincomp(_vl.Vector3vl.fromNumber(constant, bits.in), data.in)
    };else return {
      out: this.bincomp(data.in, _vl.Vector3vl.fromNumber(constant, bits.in))
    };
  },
  _operationHelpers: BaseCompareConst.prototype._operationHelpers.concat(['bincomp'])
});

// Addition with constant
const AdditionConst = exports.AdditionConst = ArithConst.define('AdditionConst', {}, {
  operSymbol: '+',
  arithop: (i, j) => i + j
});
const AdditionConstView = exports.AdditionConstView = _base.GateView;

// Subtraction with constant
const SubtractionConst = exports.SubtractionConst = ArithConst.define('SubtractionConst', {}, {
  operSymbol: '-',
  arithop: (i, j) => i - j
});
const SubtractionConstView = exports.SubtractionConstView = _base.GateView;

// Multiplication with constant
const MultiplicationConst = exports.MultiplicationConst = ArithConst.define('MultiplicationConst', {}, {
  operSymbol: '×',
  arithop: (i, j) => i * j
});
const MultiplicationConstView = exports.MultiplicationConstView = _base.GateView;

// Division with constant
const DivisionConst = exports.DivisionConst = ArithConst.define('DivisionConst', {}, {
  operSymbol: '÷',
  arithop: (i, j) => j == 0n ? i : i / j // as in IEEE Verilog
});
const DivisionConstView = exports.DivisionConstView = _base.GateView;

// Modulo with constant
const ModuloConst = exports.ModuloConst = ArithConst.define('ModuloConst', {}, {
  operSymbol: '%',
  arithop: (i, j) => j == 0n ? i : i % j // as in IEEE Verilog
});
const ModuloConstView = exports.ModuloConstView = _base.GateView;

// Power with constant
const PowerConst = exports.PowerConst = ArithConst.define('PowerConst', {}, {
  operSymbol: '^',
  arithop: (i, j) => j >= 0n ? i ** j : i == 1n ? 1n : i == -1n ? j % 2n ? -1n : 1n : 0n
});
const PowerConstView = exports.PowerConstView = _base.GateView;

// Shift left operator
const ShiftLeftConst = exports.ShiftLeftConst = ShiftConst.define('ShiftLeftConst', {}, {
  operSymbol: '≪',
  shiftdir: -1
});
const ShiftLeftConstView = exports.ShiftLeftConstView = _base.GateView;

// Shift right operator
const ShiftRightConst = exports.ShiftRightConst = ShiftConst.define('ShiftRightConst', {}, {
  operSymbol: '≫',
  shiftdir: 1
});
const ShiftRightConstView = exports.ShiftRightConstView = _base.GateView;

// Less than operator
const LtConst = exports.LtConst = CompareConst.define('LtConst', {}, {
  operSymbol: '<',
  arithcomp: (i, j) => i < j
});
const LtConstView = exports.LtConstView = _base.GateView;

// Less than operator
const LeConst = exports.LeConst = CompareConst.define('LeConst', {}, {
  operSymbol: '≤',
  arithcomp: (i, j) => i <= j
});
const LeConstView = exports.LeConstView = _base.GateView;

// Less than operator
const GtConst = exports.GtConst = CompareConst.define('GtConst', {}, {
  operSymbol: '>',
  arithcomp: (i, j) => i > j
});
const GtConstView = exports.GtConstView = _base.GateView;

// Less than operator
const GeConst = exports.GeConst = CompareConst.define('GeConst', {}, {
  operSymbol: '≥',
  arithcomp: (i, j) => i >= j
});
const GeConstView = exports.GeConstView = _base.GateView;

// Equality operator
const EqConst = exports.EqConst = EqCompareConst.define('EqConst', {}, {
  operSymbol: '=',
  bincomp: (i, j) => i.xnor(j).reduceAnd()
});
const EqConstView = exports.EqConstView = _base.GateView;

// Nonequality operator
const NeConst = exports.NeConst = EqCompareConst.define('NeConst', {}, {
  operSymbol: '≠',
  bincomp: (i, j) => i.xor(j).reduceOr()
});
const NeConstView = exports.NeConstView = _base.GateView;