"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circuit = void 0;
Object.defineProperty(exports, "HeadlessCircuit", {
  enumerable: true,
  get: function () {
    return _circuit.HeadlessCircuit;
  }
});
Object.defineProperty(exports, "IOPanelView", {
  enumerable: true,
  get: function () {
    return _iopanel.IOPanelView;
  }
});
Object.defineProperty(exports, "Monitor", {
  enumerable: true,
  get: function () {
    return _monitor.Monitor;
  }
});
Object.defineProperty(exports, "MonitorView", {
  enumerable: true,
  get: function () {
    return _monitor.MonitorView;
  }
});
exports.engines = exports.cells = void 0;
Object.defineProperty(exports, "getCellType", {
  enumerable: true,
  get: function () {
    return _circuit.getCellType;
  }
});
exports.transform = exports.tools = exports.paperOptions = void 0;
require("babel-polyfill");
var _dagre = _interopRequireDefault(require("dagre"));
var _graphlib = _interopRequireDefault(require("graphlib"));
var joint = _interopRequireWildcard(require("jointjs"));
var _lodash = _interopRequireDefault(require("lodash"));
var _jquery = _interopRequireDefault(require("jquery"));
var _backbone = _interopRequireDefault(require("backbone"));
var _vl = require("3vl");
var cells = _interopRequireWildcard(require("./cells.js"));
exports.cells = cells;
var engines = _interopRequireWildcard(require("./engines.js"));
exports.engines = engines;
var tools = _interopRequireWildcard(require("./tools.js"));
exports.tools = tools;
var transform = _interopRequireWildcard(require("./transform.js"));
exports.transform = transform;
var _circuit = require("./circuit.js");
var _browsersynch = require("./engines/browsersynch.js");
var _monitor = require("./monitor.js");
var _iopanel = require("./iopanel.js");
require("./style.css.js");
var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import 'jquery-ui/ui/widgets/dialog.js';
// import 'jquery-ui/themes/base/all.css';

// polyfill ResizeObserver for e.g. Firefox ESR 68.8
// this line and the node-module might be removed as soon as ResizeObserver is widely supported
// see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver#Browser_compatibility

const paperOptions = exports.paperOptions = {
  async: true,
  sorting: joint.dia.Paper.sorting.APPROX,
  //needed for async paper, see https://github.com/clientIO/joint/issues/1320
  width: 100,
  height: 100,
  gridSize: 5,
  magnetThreshold: 'onleave',
  snapLinks: true,
  linkPinning: false,
  markAvailable: true,
  defaultLink: new cells.Wire(),
  defaultConnectionPoint: {
    name: 'anchor'
  },
  defaultRouter: {
    name: 'metro',
    args: {
      startDirections: ['right'],
      endDirections: ['left'],
      maximumLoops: 200,
      step: 2.5
    }
  },
  defaultConnector: {
    name: 'rounded',
    args: {
      radius: 10
    }
  },
  cellViewNamespace: cells,
  validateConnection(vs, ms, vt, mt, e, vl) {
    if (e === 'target') {
      if (!mt) return false;
      const pt = vt.model.getPort(vt.findAttribute('port', mt));
      if (typeof pt !== 'object' || pt.dir !== 'in' || pt.bits !== vl.model.get('bits')) return false;
      const link = this.model.getConnectedLinks(vt.model).find(l => l.id !== vl.model.id && l.get('target').id === vt.model.id && l.get('target').port === vt.findAttribute('port', mt));
      return !link;
    } else if (e === 'source') {
      if (!ms) return false;
      const ps = vs.model.getPort(vs.findAttribute('port', ms));
      if (typeof ps !== 'object' || ps.dir !== 'out' || ps.bits !== vl.model.get('bits')) return false;
      return true;
    }
  }
};
const defaultSubcircuitButtons = [{
  id: "zoomOut",
  hidden: false,
  buttonText: "–",
  callback: ({
    circuit,
    model,
    paper
  }) => {
    const newZoom = model.get('zoomLevel') - 1;
    circuit.scaleAndRefreshPaper(paper, newZoom);
    model.set("zoomLevel", newZoom);
  }
}, {
  id: "zoomIn",
  hidden: false,
  buttonText: "+",
  callback: ({
    circuit,
    model,
    paper
  }) => {
    const newZoom = model.get('zoomLevel') + 1;
    circuit.scaleAndRefreshPaper(paper, newZoom);
    model.set("zoomLevel", newZoom);
  }
}];
class Circuit extends _circuit.HeadlessCircuit {
  constructor(data, {
    windowCallback = Circuit.prototype._defaultWindowCallback,
    layoutEngine = "dagre",
    subcircuitButtons = [],
    ...options
  } = {}) {
    if (!options.engine) options.engine = _browsersynch.BrowserSynchEngine;
    super(data, options);
    this._layoutEngine = layoutEngine;
    this._windowCallback = windowCallback;
    this._subcircuitButtons = this._mergeSubcircuitButtons(subcircuitButtons);
    this.listenTo(this._engine, 'changeRunning', () => {
      this.trigger('changeRunning');
    });
  }
  _mergeSubcircuitButtons(buttons = []) {
    const res = new Map();
    for (const button of defaultSubcircuitButtons.concat(buttons)) {
      if (button?.hidden) {
        res.delete(button.id);
      } else {
        res.set(button.id, button);
      }
    }
    return Array.from(res.values());
  }
  _defaultWindowCallback(type, div, closingCallback) {
    const maxWidth = () => (0, _jquery.default)(window).width() * 0.9;
    const maxHeight = () => (0, _jquery.default)(window).height() * 0.9;
    function fixSize() {
      if (div.width() > maxWidth()) div.dialog("option", "width", maxWidth());
      if (div.height() > maxHeight()) div.dialog("option", "height", maxHeight());
    }
    const observer = new _resizeObserverPolyfill.default(fixSize);
    observer.observe(div.get(0));
    const shutdownCallback = () => {
      div.dialog('close');
    };
    this.listenToOnce(this, 'shutdown', shutdownCallback);
    const dialog = div.dialog({
      width: 'auto',
      height: 'auto',
      maxWidth: (0, _jquery.default)(window).width() * 0.9,
      maxHeight: (0, _jquery.default)(window).height() * 0.9,
      resizable: type !== "Memory",
      close: () => {
        this.stopListening(this, 'shutdown', shutdownCallback);
        closingCallback();
        observer.disconnect();
      }
    });
  }
  displayOn(elem) {
    return this._makePaper(elem, this._graph);
  }
  scaleAndRefreshPaper(paper, scale) {
    paper.scale(Math.pow(1.1, scale));
    const graph = paper.model;
    paper.freeze();
    graph.resetCells(graph.getCells());
    paper.unfreeze();
  }
  _makePaper(elem, graph) {
    this._engine.observeGraph(graph);
    const opts = _lodash.default.merge({
      el: elem,
      model: graph
    }, paperOptions);
    const paper = new joint.dia.Paper(opts);
    paper.$el.addClass('djs');
    paper.freeze();
    // required for the paper to visualize the graph (jointjs bug?)
    graph.resetCells(graph.getCells());
    // lazy graph layout
    if (!graph.get('laid_out')) {
      if (this._layoutEngine == "dagre") {
        joint.layout.DirectedGraph.layout(graph, {
          nodeSep: 20,
          edgeSep: 0,
          rankSep: 110,
          rankDir: "LR",
          setPosition: (element, position) => {
            element.setLayoutPosition({
              x: position.x - position.width / 2,
              y: position.y - position.height / 2,
              width: position.width,
              height: position.height
            });
          },
          exportElement: element => {
            return element.getLayoutSize();
          },
          dagre: _dagre.default,
          graphlib: _graphlib.default
        });
      }
      graph.set('laid_out', true);
    }
    paper.listenTo(this, 'display:add', () => {
      // a very inefficient way to refresh numbase dropdowns
      // TODO: a better method
      paper.freeze();
      graph.resetCells(graph.getCells());
      paper.unfreeze();
    });
    this.listenTo(paper, 'render:done', () => {
      paper.fitToContent({
        padding: 30,
        allowNewOrigin: 'any'
      });
    });
    paper.unfreeze();
    // subcircuit display
    const circuit = this;
    this.listenTo(paper, 'open:subcircuit', model => {
      const subcircuitModal = (0, _jquery.default)('<div>', {
        title: model.get('celltype') + ' ' + model.get('label')
      }).appendTo('html > body');

      // Create and set up paper
      const pdiv = (0, _jquery.default)('<div>').appendTo(subcircuitModal);
      const graph = model.get('graph');
      const paper = this._makePaper(pdiv, graph);
      paper.once('render:done', () => {
        this._windowCallback('Subcircuit', subcircuitModal, () => {
          this._engine.unobserveGraph(graph);
          paper.remove();
          subcircuitModal.remove();
        });
      });

      // Create buttons
      model.set("zoomLevel", 0);
      const buttonGroup = (0, _jquery.default)('<div class="btn-group"></div>');
      for (const button of this._subcircuitButtons) {
        (0, _jquery.default)('<button class="btn btn-secondary"></button>').append((0, _jquery.default)('<strong></strong>').text(button.buttonText)).on('click', {
          circuit,
          model,
          paper
        }, event => button.callback(event.data)).appendTo(buttonGroup);
      }
      buttonGroup.prependTo(subcircuitModal);
    });
    this.listenTo(paper, 'open:memorycontent', (subcircuitModal, closeCallback) => {
      this._windowCallback('Memory', subcircuitModal, closeCallback);
    });
    this.listenTo(paper, 'open:fsm', (subcircuitModal, closeCallback) => {
      this._windowCallback('FSM', subcircuitModal, closeCallback);
    });
    paper.fixed = function (fixed) {
      this.setInteractivity(!fixed);
      this.$el.toggleClass('fixed', fixed);
    };
    this.trigger('new:paper', paper);
    return paper;
  }
}
exports.Circuit = Circuit;
;