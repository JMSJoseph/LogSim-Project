"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Display3vlASCII = void 0;
exports.baseSelectMarkupHTML = baseSelectMarkupHTML;
exports.eqSigs = eqSigs;
var _vl = require("3vl");
const controlCodes20 = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'HT', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US', 'SP', 'DEL'];
class Display3vlASCII extends _vl.Display3vlWithRegex {
  constructor() {
    super('[\x20-\x7e\xa0-\xff\ufffd\u2400-\u2421]|' + controlCodes20.join('|'));
  }
  get name() {
    return "ascii";
  }
  get sort() {
    return 1;
  }
  can(kind, bits) {
    return bits == 7 || bits == 8;
  }
  read(data, bits) {
    if (data.length == 1) {
      const code = data.charCodeAt(0);
      if (code == 0xfffd) return _vl.Vector3vl.xes(bits);
      if (code == 0x2421) return _vl.Vector3vl.fromHex("7f", bits);
      if (code >= 0x2400 && code <= 0x2420) return _vl.Vector3vl.fromHex((code - 0x2400).toString(16), bits);
      return _vl.Vector3vl.fromHex(code.toString(16), bits);
    } else {
      const code = controlCodes20.indexOf(data);
      if (code < 0) return _vl.Vector3vl.xes(bits);
      if (code == 0x21) return _vl.Vector3vl.fromHex("7f", bits);
      return _vl.Vector3vl.fromHex(code.toString(16), bits);
    }
  }
  show(data) {
    if (!data.isFullyDefined) return "\ufffd";
    const code = parseInt(data.toHex(), 16);
    if (code <= 0x20) {
      return String.fromCharCode(0x2400 + code);
    }
    if (code == 0x7f) return "\u2421";
    if (code > 0x7f && code < 0xa0) {
      return "\ufffd";
    }
    return String.fromCharCode(code);
  }
  size(bits) {
    return 1;
  }
}
exports.Display3vlASCII = Display3vlASCII;
function baseSelectMarkupHTML(display3vl, bits, base) {
  const markup = display3vl.usableDisplays('read', bits).map(n => '<option value="' + n + '"' + (n == base ? ' selected="selected"' : '') + '>' + n + '</option>');
  return '<select name="base">' + markup.join("") + '</select>';
}
;
function eqSigs(sigs1, sigs2) {
  for (const k in sigs2) {
    if (!sigs1[k].eq(sigs2[k])) return false;
  }
  return true;
}
;