/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _viewer = __webpack_require__(1);
	
	var _viewer2 = _interopRequireDefault(_viewer);
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _annotation = __webpack_require__(26);
	
	var _annotation2 = _interopRequireDefault(_annotation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * this is the main method of the viewer extension. It exposes a function ( render )
	 * that the application calls when there are blocks/sequence to display.
	 */
	var ViewerExtension = function ViewerExtension() {
	  var _this = this;
	
	  _classCallCheck(this, ViewerExtension);
	
	  this.render = function (container, options) {
	    // create viewer and parent to the given container. There is only once instance of
	    // the viewer extension, but the viewer can be opened and closed. When closed the viewer
	    // instance we contain is disposed.
	    (0, _invariant2.default)(!_this.viewer && !_this.unsubscribe, 'viewer/unsubscribe method should not exist when render is called');
	    _this.viewer = new _viewer2.default({
	      parent: container
	    });
	
	    // initialize with current state of app
	    _this.updateViewer(window.constructor.store.getState());
	
	    // update viewer on various event while saving the unsubscribe event
	    _this.unsubscribe = window.constructor.store.subscribe(function (state, lastAction) {
	      if (['FOCUS_BLOCKS', 'BLOCK_SET_COLOR', 'BLOCK_RENAME', 'FOCUS_BLOCK_OPTION', 'FOCUS_FORCE_BLOCKS', 'BLOCK_SET_SEQUENCE'].includes(lastAction.type)) {
	
	        _this.updateViewer(state);
	      }
	    });
	    // we return the method to call when the app wants to close the extension
	    return _this.dispose;
	  };
	
	  this.dispose = function () {
	    (0, _invariant2.default)(_this.unsubscribe && _this.viewer, 'dispose should be called only once, after render has been called');
	    // unsubscribe from the store
	    _this.unsubscribe();
	    // dispose the viewer
	    _this.viewer.dispose();
	    // remove references, these will be recreated next time they are needed ( when the app calls render )
	    _this.unsubscribe = _this.viewer = null;
	  };
	
	  this.updateViewer = function (state) {
	    var _getDisplayBlocksAndA = _this.getDisplayBlocksAndAnnotations();
	
	    var blocks = _getDisplayBlocksAndA.blocks;
	    var annotations = _getDisplayBlocksAndA.annotations;
	
	    _this.viewer.newDataSet(blocks, annotations, state);
	    _this.viewer.render();
	  };
	
	  this.getDisplayBlocksAndAnnotations = function () {
	
	    var blocks = [];
	    var annotations = [];
	    var topSelectedBlocks = window.constructor.api.focus.focusGetBlockRange();
	
	    if (topSelectedBlocks) {
	      topSelectedBlocks.forEach(function (block) {
	
	        // map the annotations to a little wrapper object
	        block.sequence.annotations.forEach(function (nativeAnnotation) {
	          annotations.push(new _annotation2.default(nativeAnnotation, block));
	        });
	
	        blocks.push.apply(blocks, _toConsumableArray(window.constructor.api.blocks.blockFlattenConstructAndLists(block.id)));
	      });
	    }
	    return { blocks: blocks, annotations: annotations };
	  };
	}
	
	/**
	 * the render method is called only once, when the extension is loaded.
	 * @param  {[type]} container [description]
	 * @param  {[type]} options   [description]
	 * @return {[type]}           [description]
	 */
	
	
	/**
	 * extension is being closed. Cleanup
	 */
	
	
	/**
	 * update with the latest blocks/annotations as defined in the state object
	 * @param  {[type]} state [description]
	 * @return {[type]}       [description]
	 */
	
	
	/**
	 * return all the blocks and annotations that we currently need to display
	 * @return {[type]} [description]
	 */
	;
	
	// bind this extension, by name, to its render function
	
	
	window.constructor.extensions.register('sequence-viewer', new ViewerExtension().render);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _elementcache = __webpack_require__(5);
	
	var _elementcache2 = _interopRequireDefault(_elementcache);
	
	var _charmeasure = __webpack_require__(6);
	
	var _userinterface = __webpack_require__(7);
	
	var _userinterface2 = _interopRequireDefault(_userinterface);
	
	var _vector2d = __webpack_require__(9);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _box2d = __webpack_require__(14);
	
	var _box2d2 = _interopRequireDefault(_box2d);
	
	var _sequenceRow = __webpack_require__(16);
	
	var _sequenceRow2 = _interopRequireDefault(_sequenceRow);
	
	var _separatorSequenceRow = __webpack_require__(17);
	
	var _separatorSequenceRow2 = _interopRequireDefault(_separatorSequenceRow);
	
	var _reverseSequenceRow = __webpack_require__(18);
	
	var _reverseSequenceRow2 = _interopRequireDefault(_reverseSequenceRow);
	
	var _blockSequenceRow = __webpack_require__(19);
	
	var _blockSequenceRow2 = _interopRequireDefault(_blockSequenceRow);
	
	var _rulerRow = __webpack_require__(20);
	
	var _rulerRow2 = _interopRequireDefault(_rulerRow);
	
	var _annotationRow = __webpack_require__(21);
	
	var _annotationRow2 = _interopRequireDefault(_annotationRow);
	
	__webpack_require__(22);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * used to track render cycles. It is incremented each time render is called. Rows which
	 * are not touched by the current render cycle are removed from the DOM
	 * @type {number}
	 */
	var renderCycle = 0;
	
	/**
	 * character map for generating the reverse strand
	 * @type {{a: string, t: string, g: string, c: string}}
	 */
	var reverseMap = {
	  'a': 't',
	  't': 'a',
	  'g': 'c',
	  'c': 'g',
	  'A': 'T',
	  'T': 'A',
	  'G': 'C',
	  'C': 'G'
	};
	
	/**
	 * sequence viewer
	 */
	
	var SequenceViewer = function () {
	
	  // constructor saves options and setups basic / empty container
	  function SequenceViewer(options) {
	    _classCallCheck(this, SequenceViewer);
	
	    // setup default option with overrides supplied by caller
	    this.options = Object.assign({
	      parent: null,
	      reverse: true
	    }, options);
	
	    // empty block contents and associated reverse strand
	    this.emptyBlockStr = ' empty block ';
	    this.emptyBlockReverseStr = '-'.repeat(this.emptyBlockStr.length);
	
	    // sequence cache, key = block.id
	    this.sequenceCache = {};
	
	    // set basic empty DOM structure
	    this.fabric();
	    // size to current window, relayout and render
	    this.resized();
	  }
	
	  /**
	   * we are being removed from the app
	   */
	
	
	  _createClass(SequenceViewer, [{
	    key: 'dispose',
	    value: function dispose() {
	      if (!this.disposed) {
	        this.userInterface.dispose();
	        this.userInterface = null;
	        this.disposed = true;
	      }
	    }
	
	    /**
	     * when asked to display new blocks/construct. This resets everything
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.newDataSet();
	      this.render();
	    }
	
	    /**
	     * reset the entire row cache
	     */
	
	  }, {
	    key: 'resetRowCache',
	    value: function resetRowCache() {
	      if (!this.rowCache) {
	        this.rowCache = new _elementcache2.default(10000);
	      } else {
	        this.rowCache.empty();
	      }
	    }
	
	    /**
	     * true if our client area is too small to be useful
	     */
	
	  }, {
	    key: 'tooSmall',
	    value: function tooSmall() {
	      return this.rowLength < 1 || this.rowsContainerBounds.width < 10 || this.rowsContainerBounds.height < 10;
	    }
	
	    /**
	     * call whenever or size is changed.
	     */
	
	  }, {
	    key: 'resized',
	    value: function resized() {
	      // resize events can be sent by the app before we have any data, so protect against that
	      if (!this.blockList) {
	        this.newDataSet();
	      }
	      // rows will all change on size change so reset with a new cache
	      this.resetRowCache();
	      // calculate row length / bounds based on current client size
	      this.calculateSizeMetrics();
	      if (!this.tooSmall()) {
	        // map blocks and annotations to row
	        this.mapDataSet();
	        // ensure firstRow is still valid
	        this.firstRow = Math.min(this.rowList.length - 1, this.firstRow);
	        this.userInterface.updateSelection();
	        // draw
	        this.render();
	      }
	    }
	
	    /**
	     * calculate bounds and row length based on current size
	     */
	
	  }, {
	    key: 'calculateSizeMetrics',
	    value: function calculateSizeMetrics() {
	      // calculate row length for the new window size
	      this.rowsContainerBounds = this.rowsContainer.el.getBoundingClientRect();
	      this.rowLength = Math.floor(this.rowsContainerBounds.width / this.getCharWidth());
	    }
	    /**
	     * number of complete or partial rows that are visible
	     */
	
	  }, {
	    key: 'rowsVisible',
	    value: function rowsVisible() {
	      // if data set is empty, then no rows
	      if (this.rowList.length === 0) {
	        return 0;
	      }
	      var index = this.firstRow;
	      var height = 0;
	      while (height < this.rowsContainerBounds.height && index < this.rowList.length) {
	        height += this.getRowHeight(index);
	        index += 1;
	      }
	      return index - this.firstRow;
	    }
	
	    /**
	     * get the bounds of row, or an empty box if the row is not currently visible
	     */
	
	  }, {
	    key: 'getRowBounds',
	    value: function getRowBounds(index) {
	      var box = new _box2d2.default();
	      var visible = this.rowsVisible();
	      var y = 0;
	      for (var i = this.firstRow; i < this.firstRow + visible; i += 1) {
	        var height = this.getRowHeight(i);
	        if (i === index) {
	          box.y = y;
	          box.width = this.getCharWidth() * this.rowLength;
	          box.height = height;
	          break;
	        }
	        y += height;
	      }
	      return box;
	    }
	
	    /**
	     * return the index of the row containing the given client y position (0 === top of client area )
	     * Returns -1 if y is not within a row
	     * @param y - pixel coordinate relative to window
	     */
	
	  }, {
	    key: 'getRowIndexFromY',
	    value: function getRowIndexFromY(y) {
	      if (y < 0) {
	        return -1;
	      }
	      var visible = this.rowsVisible();
	      var rowIndex = this.firstRow;
	      var currentY = 0;
	      for (var i = this.firstRow; i < this.firstRow + visible; i += 1) {
	        currentY += this.getRowHeight(rowIndex);
	        if (y < currentY) {
	          return rowIndex;
	        }
	        rowIndex += 1;
	      }
	      return -1;
	    }
	
	    /**
	     * return column clamped to length of given row
	     * @param x - pixel coordinate relative to client area
	     */
	
	  }, {
	    key: 'getColumnIndexFromX',
	    value: function getColumnIndexFromX(x, row) {
	      var column = Math.floor(x / this.getCharWidth());
	      var records = this.rowList[row].blockRecords;
	      var record = records[records.length - 1];
	      if (column < 0 || column >= record.startRowOffset + record.length) {
	        return -1;
	      }
	      return column;
	    }
	
	    /**
	     * width of fixed pitch font
	     * @returns {number}
	     */
	
	  }, {
	    key: 'getCharWidth',
	    value: function getCharWidth() {
	      return this.fontMetrics.w;
	    }
	
	    /**
	     * height of fixed pitch font
	     * @returns {number}
	     */
	
	  }, {
	    key: 'getCharHeight',
	    value: function getCharHeight() {
	      return this.fontMetrics.h * 1.3 >> 0;
	    }
	
	    /**
	     * height of a row, including the variable number of annotations
	     * @returns {number}
	     */
	
	  }, {
	    key: 'getRowHeight',
	    value: function getRowHeight(index) {
	      var annotations = this.rowList[index].annotationDepth;
	      return this.getCharHeight() * (annotations + (this.options.reverse ? 8 : 7));
	    }
	
	    /**
	     * show or hide the reverse strand ( argument is optional )
	     * Return the current state of the reverse strand
	     * @param show
	     */
	
	  }, {
	    key: 'showReverseStrand',
	    value: function showReverseStrand(show) {
	      if (arguments.length === 1) {
	        this.options.reverse = show;
	        // reset cache since all rows will change
	        this.resetRowCache();
	      }
	      return this.options.reverse;
	    }
	
	    /**
	     * render the entire view, using cached rows if possible
	     */
	
	  }, {
	    key: 'render',
	    value: function render() {
	      //console.time('Render');
	      (0, _invariant2.default)(this.fontMetrics && this.blockRowMap && this.rowList, 'cannot render until layout has been mapped');
	      // ignore if resized too small
	      if (this.tooSmall()) {
	        return;
	      }
	      // how many rowsContainer ( including partial rowsContainer ) will we accommodate )
	      var rowsFit = this.rowsVisible();
	      var limit = Math.min(this.rowList.length, this.firstRow + rowsFit);
	      // render all rowsContainer and records in each row
	      for (var rowIndex = this.firstRow; rowIndex < limit; rowIndex += 1) {
	        // see if we have this row in our cache otherwise we will have to create and render it
	        var rowEl = this.rowCache.getElement(rowIndex);
	        if (!rowEl) {
	          // row wasn't in the cache so create and render
	          rowEl = this.renderRow(rowIndex);
	          // add to cache
	          this.rowCache.addElement(rowIndex, rowEl);
	        }
	        // position row container
	        var rowBounds = this.getRowBounds(rowIndex);
	        rowEl.setStyles({
	          left: rowBounds.x + 'px',
	          top: rowBounds.y + 'px',
	          width: rowBounds.w + 'px',
	          height: rowBounds.h + 'px'
	        });
	        // add to the DOM if not currently parented
	        if (!rowEl.el.parentNode) {
	          this.rowsContainer.appendChild(rowEl);
	        }
	        // mark this row with the current render cycle
	        rowEl.el.setAttribute('render-cycle', renderCycle);
	      }
	      // remove any rows from the rowsContainer that were not updated during the current render cycle
	      this.rowsContainer.forEachChild(function (rowElement) {
	        if (parseFloat(rowElement.getAttribute('render-cycle')) !== renderCycle) {
	          rowElement.parentNode.removeChild(rowElement);
	        }
	      });
	      // user interface must be re-rendered as well
	      this.userInterface.render();
	      // bump to the next render cycle
	      renderCycle += 1;
	      //console.timeEnd('Render');
	    }
	
	    /**
	     * render a single row of the view
	     * @param rowIndex
	     */
	
	  }, {
	    key: 'renderRow',
	    value: function renderRow(rowIndex) {
	      var _this = this;
	
	      // get the current row
	      var row = this.rowList[rowIndex];
	      // create an element to contain the entire row
	      var rowEl = (0, _dom2.default)('<div class="row-element"></div>');
	      // render all the block records for this row
	      row.blockRecords.forEach(function (record) {
	        // the sequence strand itself
	        (0, _sequenceRow2.default)(_this, rowEl, record, 0);
	        // separator row
	        (0, _separatorSequenceRow2.default)(_this, rowEl, record, _this.getCharHeight());
	        // optional reverse strand
	        if (_this.options.reverse) {
	          (0, _reverseSequenceRow2.default)(_this, rowEl, record, _this.getCharHeight() * 2);
	        }
	        // render the block
	        (0, _blockSequenceRow2.default)(_this, rowEl, record, _this.getCharHeight() * (_this.options.reverse ? 3 : 2));
	      });
	      // render any annotations on this row
	      if (row.annotationRecords) {
	        row.annotationRecords.forEach(function (record) {
	          (0, _annotationRow2.default)(_this, rowEl, record, _this.getCharHeight() * (_this.options.reverse ? 4 : 3));
	        });
	      }
	      // render the sequence ruler with numbers ( 10's ) from start of row to end of row
	      // get the length of this row, which varies only for the last row of the data set
	      var rowChars = rowIndex === this.rowList.length - 1 ? this.lastRowChars() : this.rowLength;
	      var ry = this.getCharHeight() * (row.annotationDepth + (this.options.reverse ? 4 : 3)) + this.getCharHeight() * 0.5;
	      (0, _rulerRow2.default)(this, rowEl, ry, rowIndex * this.rowLength, rowChars);
	
	      // return the row container
	      return rowEl;
	    }
	
	    /**
	     * if the sequence is not available
	     * @param block
	     * @param offset
	     * @param length
	     * @param reverse [optional] returns the reverse strand
	     */
	
	  }, {
	    key: 'getSequence',
	    value: function getSequence(block, offset, length) {
	      var _this2 = this;
	
	      var reverse = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	      // if sequence is empty then return the empty block string
	      if (block.sequence.length === 0) {
	        return this.emptyBlockStr.substr(offset, length);
	      }
	      var cacheEntry = this.sequenceCache[block.id];
	      if (!cacheEntry) {
	        cacheEntry = this.sequenceCache[block.id] = {
	          loading: true,
	          sequence: null
	        };
	        block.getSequence().then(function (sequence) {
	          // ignore if we became disposed in the meantime
	          if (!_this2.disposed) {
	            cacheEntry.loading = false;
	            cacheEntry.sequence = sequence;
	            _this2.invalidateCacheForBlock(block);
	            _this2.render();
	          }
	        });
	      }
	      // return the sequence if we have it
	      if (cacheEntry.sequence) {
	        // return the reverse strand as requested
	        if (reverse) {
	          cacheEntry.reverseSequence = cacheEntry.reverseSequence || this.reverseStrand(cacheEntry.sequence);
	          return cacheEntry.reverseSequence.substr(offset, length);
	        }
	        // actual sequence
	        return cacheEntry.sequence.substr(offset, length);
	      }
	      // must be loading, so return '-'
	      return '-'.repeat(length);
	    }
	
	    /**
	     * return the given reverse strand for a given sequence
	     * @returns {*|string|string}
	     */
	
	  }, {
	    key: 'reverseStrand',
	    value: function reverseStrand(sequence) {
	      var reverse = '';
	      for (var i = 0; i < sequence.length; i += 1) {
	        var char = sequence[i];
	        reverse += reverseMap[char] || '?';
	      }
	      return reverse;
	    }
	  }, {
	    key: 'fabric',
	    value: function fabric() {
	      // we must be given a parent element
	      (0, _invariant2.default)(this.options.parent, 'viewer must be supplied with a parent element');
	
	      // create DOM
	
	      this.outer = (0, _dom2.default)('<div class="viewer"></div>');
	      this.options.parent.appendChild(this.outer.el);
	
	      this.rowsContainer = (0, _dom2.default)('<div class="rows"></div>');
	      this.outer.el.appendChild(this.rowsContainer.el);
	
	      this.userInterface = new _userinterface2.default({
	        viewer: this
	      });
	
	      // character metrics for string measurement
	      this.fontMetrics = (0, _charmeasure.charMeasure)();
	
	      // ensure we have current metrics
	      this.calculateSizeMetrics();
	
	      // setup initial empty data set
	      this.newDataSet();
	    }
	
	    /**
	     * reset or set the current blocks and annotations
	     * @param dataSet
	     */
	
	  }, {
	    key: 'newDataSet',
	    value: function newDataSet() {
	      var blocks = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	      var annotations = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var appState = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	      // rows will all change on size change so reset with a new cache
	      this.resetRowCache();
	      // state is all the application state data
	      this.appState = appState;
	      // create n fake blocks
	      this.blockList = blocks || [];
	
	      // FAKE blocks for testing
	      // let totalLength = 0;
	      // for (let i = 0; i < 500; i += 1) {
	      //   const b = new Block({
	      //     callback: this.blockLoaded.bind(this),
	      //   });
	      //   totalLength += this.blockDisplayLength(b);
	      //   this.blockList.push(b);
	      // }
	
	      // generate some fake annotations from 0..totalLength
	      this.annotationList = annotations || [];
	
	      // FAKE annotations for testing
	      // for (let j = 0; j < 500; j += 1) {
	      //   const start = Math.max(0, Math.floor(Math.random() * totalLength - 100));
	      //   const length = Math.max(4, Math.floor(Math.random() * 100));
	      //   const a = new Annotation(start, length);
	      //   this.annotationList.push(a);
	      // }
	
	      // map data to rows
	      this.mapDataSet();
	      // back to first row
	      this.firstRow = 0;
	      // clear selection
	      this.userInterface.setSelection();
	      // display total length of sequence
	      this.userInterface.statusBar.setBasePairs(this.totalSequenceLength);
	      // reset search term since blocks / annotations have changed
	      this.userInterface.statusBar.resetSearch();
	    }
	
	    /**
	     * scroll down
	     */
	
	  }, {
	    key: 'nextRow',
	    value: function nextRow() {
	      this.firstRow = Math.min(this.rowList.length - 1, this.firstRow + 1);
	    }
	
	    /**
	     * scroll up
	     */
	
	  }, {
	    key: 'previousRow',
	    value: function previousRow() {
	      this.firstRow = Math.max(0, this.firstRow - 1);
	    }
	
	    /**
	     * select a given block's range
	     */
	
	  }, {
	    key: 'selectBlock',
	    value: function selectBlock(blockId) {
	      (0, _invariant2.default)(blockId, 'block ID must be provided');
	      var block = this.blockRowMap[blockId].block;
	      (0, _invariant2.default)(block, 'block must be available ');
	      this.userInterface.setSelection({
	        block: block,
	        blockOffset: 0
	      }, {
	        block: block,
	        blockOffset: this.blockDisplayLength(block) - 1
	      });
	    }
	
	    /**
	     * select the given annotation's range
	     * @param annotationId
	     */
	
	  }, {
	    key: 'selectAnnotation',
	    value: function selectAnnotation(annotationId) {
	      (0, _invariant2.default)(annotationId, 'annotation id expected');
	      // get column / row information for the annotation
	      var info = this.annotationRowMap[annotationId];
	      // convert into block coordinates via user interface
	      var startInfo = this.userInterface.columnRowToBlockOffset(new _vector2d2.default(info.startColumn, info.startRow));
	      var endInfo = this.userInterface.columnRowToBlockOffset(new _vector2d2.default(info.endColumn, info.endRow));
	      // select the range
	      this.userInterface.setSelection(startInfo, endInfo);
	    }
	
	    /**
	     * make the first row containing row the top row
	     * @param block
	     */
	
	  }, {
	    key: 'showBlock',
	    value: function showBlock(blockId) {
	      (0, _invariant2.default)(blockId, 'block id must be supplied');
	      var info = this.blockRowMap[blockId];
	      (0, _invariant2.default)(info, 'expected a block info for the block');
	      this.firstRow = info.startRow;
	    }
	
	    /**
	     * bring the given annotation into the view
	     * @param annotationId
	     */
	
	  }, {
	    key: 'showAnnotation',
	    value: function showAnnotation(annotationId) {
	      (0, _invariant2.default)(annotationId, 'annotation id must be supplied');
	      var info = this.annotationRowMap[annotationId];
	      (0, _invariant2.default)(info, 'expected info for the annotation');
	      this.firstRow = info.startRow;
	    }
	
	    /**
	     * after a blocks full data is loaded
	     * @param block
	     */
	
	  }, {
	    key: 'blockLoaded',
	    value: function blockLoaded(block) {
	      // remove rows containing this block from the cache
	      this.invalidateCacheForBlock(block);
	      // block layout doesn't change only the content of a block, so a render is all that is required.
	      this.render();
	    }
	
	    /**
	     * update internal maps to reflect the current data set. Maps blocks to rows and columns
	     * and maps annotations to rows and columns.
	     * NOTE: mapAnnotations MUST be after mapBlocks since it requires block position information.
	     */
	
	  }, {
	    key: 'mapDataSet',
	    value: function mapDataSet() {
	      //console.time('Map Data Set');
	      this.mapBlocks();
	      this.mapAnnotations();
	      //console.timeEnd('Map Data Set');
	    }
	
	    /**
	     * invalidate the cached rows containing the given block
	     * @param block
	     */
	
	  }, {
	    key: 'invalidateCacheForBlock',
	    value: function invalidateCacheForBlock(block) {
	      if (this.blockRowMap && this.rowCache) {
	        var blockInfo = this.blockRowMap[block.id];
	        // need data set may have arrived in the mean time, so blockInfo may not be present
	        if (blockInfo) {
	          // invalid every row containing all or part of the block
	          for (var i = blockInfo.startRow; i <= blockInfo.endRow; i += 1) {
	            this.rowCache.removeElement(i);
	          }
	        }
	      }
	    }
	
	    /**
	     * return the display length for a block, which is either the length of its sequence
	     * or the length of the empty block string
	     * @param block
	     */
	
	  }, {
	    key: 'blockDisplayLength',
	    value: function blockDisplayLength(block) {
	      return block.sequence.length || this.emptyBlockStr.length;
	    }
	
	    /**
	     * map rowsContainer must be called when a block is changed. It constructs two important data structures:
	     * 1. blockRowMap A hash keyed my block.id which gives the starting row and char offset into the
	     *                the row for that block. Also, the ending row and char offset into the row for the block.
	     *                Thus for each block you get:
	     *                - block
	     *                - startRow
	     *                - startRowOffset,
	     *                - endRow,
	     *                - endRowOffset
	     *
	     * 2. rowList     For each row required, a list of record for that row. Each record gives:
	     *                -block,
	     *                -startRowOffset,
	     *                -startBlockOffset,
	     *                -length.
	     *                Each row required 1 or more record to define its content
	     */
	
	  }, {
	    key: 'mapBlocks',
	    value: function mapBlocks() {
	
	      //console.time('Map Blocks and Rows');
	      (0, _invariant2.default)(this.rowLength > 0, 'Rows must be at least one character wide');
	      // reset the two structures we are going to build
	      this.blockRowMap = {};
	      this.rowList = [];
	      // the current row we are on
	      var currentRow = 0;
	      // offset into the current row we are working on
	      var currentRowOffset = 0;
	      // index of current block we are placing
	      var currentBlockIndex = 0;
	      // current block we are placing
	      var block = void 0;
	      // offset into the current block we are placing
	      var currentBlockOffset = void 0;
	      // info structures for the current row and current block
	      var blockInfo = void 0;
	      var rowInfo = void 0;
	      // track the total length of sequences
	      this.totalSequenceLength = 0;
	      // determine how much of the current sequence we can fit into the current row
	      while (currentBlockIndex < this.blockList.length) {
	        // get the next block and setup a block info if we don't have one
	        if (!block) {
	          block = this.blockList[currentBlockIndex];
	          // track the total length of all sequences
	          this.totalSequenceLength += this.blockDisplayLength(block);
	          // create the block info that records the start/end position of this block
	          blockInfo = {
	            block: block,
	            startRow: currentRow,
	            startRowOffset: currentRowOffset,
	            endRow: -1,
	            endRowOffset: -1
	          };
	          this.blockRowMap[block.id] = blockInfo;
	          // reset offset into current block
	          currentBlockOffset = 0;
	        }
	        (0, _invariant2.default)(block && blockInfo, 'expected a block and blockInfo here');
	
	        // if we don't have information about the row then create it now
	        if (!rowInfo) {
	          rowInfo = {
	            // there must be at least one block on each row, so this isn't wasteful
	            blockRecords: [],
	            // depth of nesting of annotations, 0 means no annotations on this row.
	            annotationDepth: 0
	          };
	          this.rowList.push(rowInfo);
	        }
	
	        // length of sequence still remaining for current block
	        var blockRemaining = this.blockDisplayLength(block) - currentBlockOffset;
	        // space available in the current row
	        var rowRemaining = this.rowLength - currentRowOffset;
	        // max amount we can take from the current block
	        var fit = Math.min(blockRemaining, rowRemaining);
	        (0, _invariant2.default)(fit >= 0, 'expected to fit zero or more characters');
	
	        // if we can't fit anything then end the current row
	        if (fit === 0) {
	          currentRow += 1;
	          currentRowOffset = 0;
	          rowInfo = null;
	        } else {
	          // take fit characters from the current block and add a record to the current rowInfo
	          rowInfo.blockRecords.push({
	            block: block,
	            startRowOffset: currentRowOffset,
	            startBlockOffset: currentBlockOffset,
	            length: fit
	          });
	          // update offsets into row and block
	          currentRowOffset += fit;
	          currentBlockOffset += fit;
	          // if we have consumed the entire sequence from the current block then move to the next block
	          (0, _invariant2.default)(currentBlockOffset <= this.blockDisplayLength(block), 'currentBlockOffset should never exceed sequence in block');
	          // reach end of the current block?
	          if (currentBlockOffset === this.blockDisplayLength(block)) {
	            blockInfo.endRow = currentRow;
	            blockInfo.endRowOffset = currentRowOffset;
	            block = blockInfo = null;
	            currentBlockIndex += 1;
	            currentBlockOffset = 0;
	          }
	        }
	      }
	    }
	
	    /**
	     * map annotations to rows and columns. mapBlocks must be called first.
	     */
	
	  }, {
	    key: 'mapAnnotations',
	    value: function mapAnnotations() {
	      // maps annotation to their starting / ending column row, keyed by annotation id
	      this.annotationRowMap = {};
	      // intersect each annotation with this row
	      for (var a = 0; a < this.annotationList.length; a += 1) {
	        var annotation = this.annotationList[a];
	        // ensure we have the block, some annotations appears to not reference correctly?
	
	        // now that blocks are mapped we can correctly set the global start/end for the annotation
	        annotation.setStartEnd(this);
	        // get the first and last row this annotation spans
	        var firstRow = Math.floor(annotation.start / this.rowLength);
	        var lastRow = Math.floor(annotation.end / this.rowLength);
	
	        // record the starting / end row / column for each annotation in the a map
	        this.annotationRowMap[annotation.id] = {
	          startRow: firstRow,
	          endRow: lastRow,
	          startColumn: annotation.start % this.rowLength,
	          endColumn: annotation.end % this.rowLength
	        };
	
	        // determine the extent of the intersection with each row
	        for (var i = firstRow; i <= lastRow; i += 1) {
	          var startOfRow = i * this.rowLength;
	          // calculate the intersection with the current row
	          var rstart = Math.max(startOfRow, annotation.start);
	          var rend = Math.min(startOfRow + this.rowLength - 1, annotation.end);
	          // we expect some sort of intersection
	          (0, _invariant2.default)(rend - rstart >= 0, 'expected an intersection');
	
	          // create a record for the annotation intersection to be associated with the row
	          // ( annotations maybe outside the currently displayed rows )
	          if (i >= 0 && i < this.rowList.length) {
	            var rowInfo = this.rowList[i];
	            rowInfo.annotationRecords = rowInfo.annotationRecords || [];
	            // each record is the starting offset and ending offset into the row
	            // .depth is the depth of the annotation since several can overlap.
	            var record = {
	              annotation: annotation,
	              start: rstart - startOfRow,
	              end: rend - startOfRow,
	              depth: 0
	            };
	            while (true) {
	              // find the shallowest depth where this annotation will not intersect another annotation
	              var start = void 0,
	                  end = void 0,
	                  aRecord = void 0,
	                  intersected = false;
	              for (var k = 0; k < rowInfo.annotationRecords.length; k += 1) {
	                aRecord = rowInfo.annotationRecords[k];
	                // test for intersection if at the same depth
	                if (aRecord.depth == record.depth) {
	                  start = Math.max(aRecord.start, record.start);
	                  end = Math.min(aRecord.end, record.end);
	                  if (end - start >= 0) {
	                    // there was an intersection
	                    intersected = true;
	                    break;
	                  }
	                }
	              }
	              // if hit at this depth, try the next one
	              if (intersected) {
	                record.depth += 1;
	              } else {
	                break;
	              }
	            }
	            // update the annotation depth on the rowInfo
	            rowInfo.annotationDepth = Math.max(record.depth + 1, rowInfo.annotationDepth);
	
	            // add to the annotations records for this row
	            rowInfo.annotationRecords.push(record);
	          }
	        }
	      };
	    }
	
	    /**
	     * return the number of characters in the last row the data set. This is useful number for various
	     * UI tasks since the last row may be shorter than the other rows
	     */
	
	  }, {
	    key: 'lastRowChars',
	    value: function lastRowChars() {
	      var lastRow = this.rowList[this.rowList.length - 1];
	      var lastRecord = lastRow.blockRecords[lastRow.blockRecords.length - 1];
	      return lastRecord.startRowOffset + lastRecord.length;
	    }
	  }]);
	
	  return SequenceViewer;
	}();
	
	exports.default = SequenceViewer;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        return setTimeout(fun, 0);
	    } else {
	        return cachedSetTimeout.call(null, fun, 0);
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        clearTimeout(marker);
	    } else {
	        cachedClearTimeout.call(null, marker);
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function () {
	  return new (Function.prototype.bind.apply(ElementList, [null].concat(Array.prototype.slice.call(arguments))))();
	};
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _extendableBuiltin(cls) {
	  function ExtendableBuiltin() {
	    var instance = Reflect.construct(cls, Array.from(arguments));
	    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	    return instance;
	  }
	
	  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
	    constructor: {
	      value: cls,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	
	  if (Object.setPrototypeOf) {
	    Object.setPrototypeOf(ExtendableBuiltin, cls);
	  } else {
	    ExtendableBuiltin.__proto__ = cls;
	  }
	
	  return ExtendableBuiltin;
	}
	
	/**
	 * simplest regex for identifying a tag string versus a selector string
	 * @type {RegExp}
	 */
	var tagRegex = new RegExp('<.[^(><.)]+>');
	
	/**
	 * static WeakMap used to bind arbitrary data to DOM nodes.
	 * See methods setData, getData
	 */
	var nodeMap = new WeakMap();
	
	/**
	 * the actual elements class which inherits from native Array
	 */
	
	var ElementList = function (_extendableBuiltin2) {
	  _inherits(ElementList, _extendableBuiltin2);
	
	  function ElementList() {
	    _classCallCheck(this, ElementList);
	
	    // this will be the elements we wrap
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ElementList).call(this));
	
	    var elements = [];
	    // first option is first argument is a CSS selector string and second optional element is the root element to apply the selector to.
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if ((args.length === 1 || args.length == 2) && typeof args[0] === 'string' && !tagRegex.exec(args[0])) {
	      var root = args.length === 1 ? document : _this.getNode(args[1]);
	      // return a proxy using the results of the selector as the initial array
	      elements = Array.from(root.querySelectorAll(args[0]));
	    } else {
	      // second option is that args if just a string e.g. '<div class="xyz"><p>Title</p></div>'
	      if (args.length === 1 && typeof args[0] === 'string' && tagRegex.exec(args[0])) {
	        // use a temporary DIV and insertAdjacentHTML to construct the DOM
	        var d = document.createElement('DIV');
	        d.insertAdjacentHTML('afterbegin', args[0]);
	        // setup elements to wrap
	        elements = Array.from(d.childNodes);
	        // remove all the children of the temporary div, so that the newly created top level nodes will be unparented
	        while (d.childElementCount) {
	          d.removeChild(d.firstChild);
	        }
	      } else {
	        // only remaining option is that each argument is a DOM node or possible another elements list
	        args.forEach(function (arg) {
	          if (arg instanceof ElementList) {
	            elements = elements.concat(arg);
	          } else {
	            elements.push(arg);
	          }
	        });
	        elements = args;
	      }
	    }
	    elements.forEach(function (item) {
	      return _this.push(item);
	    });
	    return _this;
	  }
	  /**
	   * apply the key/value pairs in hash to all our elements
	   */
	
	
	  _createClass(ElementList, [{
	    key: 'setStyles',
	    value: function setStyles(hash) {
	      this.forEach(function (element) {
	        if (element.nodeType === Node.ELEMENT_NODE) {
	          Object.keys(hash).forEach(function (key) {
	            element.style[key] = hash[key];
	          });
	        }
	      });
	      return this;
	    }
	    /**
	     * if the obj is a ElementList then return the first member otherwise assume
	     * the object is a node and return it.
	     */
	
	  }, {
	    key: 'getNode',
	    value: function getNode(obj) {
	      if (obj instanceof ElementList) return obj[0];
	      return obj;
	    }
	    /**
	     * if the obj is a ElementList return it, otherwise wrap the node in a ElementList
	     */
	
	  }, {
	    key: 'getNodes',
	    value: function getNodes(obj) {
	      if (obj instanceof ElementList) return obj;
	      return new ElementList(obj);
	    }
	    /**
	     * return the native el of the first element in the list
	     */
	
	  }, {
	    key: 'empty',
	
	
	    /**
	     * remove all elements from the elements in ourlist
	     */
	    value: function empty() {
	      this.forEach(function (element) {
	        while (element.firstChild) {
	          element.removeChild(element.firstChild);
	        }
	      });
	      return this;
	    }
	
	    /**
	     * append our list to the given DOM element of first member of an ElementList
	     */
	
	  }, {
	    key: 'appendTo',
	    value: function appendTo(d) {
	      var _this2 = this;
	
	      this.forEach(function (element) {
	        _this2.getNode(d).appendChild(element);
	      });
	      return this;
	    }
	    /**
	     * append the given node ( or all the nodes if d is an ElementList object )
	     * to our first element.
	     */
	
	  }, {
	    key: 'appendChild',
	    value: function appendChild(d) {
	      var _this3 = this;
	
	      if (this.length) {
	        this.getNodes(d).forEach(function (node) {
	          _this3[0].appendChild(node);
	        });
	      }
	      return this;
	    }
	    /**
	     * remove all the nodes or node from the first node in our collection
	     */
	
	  }, {
	    key: 'removeChild',
	    value: function removeChild(d) {
	      var _this4 = this;
	
	      this.forEach(function (parent) {
	        _this4.getNodes(d).forEach(function (child) {
	          parent.removeChild(child);
	        });
	      });
	      return this;
	    }
	
	    /**
	     * remove all our nodes from their parents
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.forEach(function (node) {
	        if (node.parentNode) {
	          node.parentNode.removeChild(node);
	        }
	      });
	      return this;
	    }
	
	    /**
	     * iterate every node and all their children looking for data-ref="name" attributes.
	     * Assign targetObject[name] to the matching DOM element.
	     * Commonly you import some template or HTML fragment into a class so that the member of
	     * that class can simple ref to this.name.
	     */
	
	  }, {
	    key: 'importRefs',
	    value: function importRefs(targetObject) {
	      this.forEach(function (node) {
	        var stack = [node];
	        while (stack.length) {
	          var element = stack.pop();
	          var name = element.getAttribute('data-ref');
	          if (name) {
	            targetObject[name] = new ElementList(element);
	          }
	          for (var i = 0; i < element.children.length; i += 1) {
	            stack.push(element.children[i]);
	          }
	        }
	      });
	    }
	
	    /**
	     * invoke the callback for all immediate children of all nodes in the list
	     * @param callback
	     */
	
	  }, {
	    key: 'forEachChild',
	    value: function forEachChild(callback) {
	      var _this5 = this;
	
	      this.forEach(function (node) {
	        // convert ElementList to a simple array since the callback may modify the list during the callback
	        var children = Array.prototype.slice.call(node.childNodes);
	        for (var i = 0; i < children.length; i += 1) {
	          callback.call(_this5, children[i], i);
	        }
	      });
	    }
	
	    /**
	     * add white space separated classes to our elements classList
	     */
	
	  }, {
	    key: 'addClasses',
	    value: function addClasses(classes) {
	      var _this6 = this;
	
	      classes.split(' ').filter(function (className) {
	        return className.trim().length;
	      }).forEach(function (className) {
	        _this6.forEach(function (element) {
	          element.classList.add(className);
	        });
	      });
	      return this;
	    }
	
	    /**
	     * remove white space separated class names from the classList of each node
	     * @param classes
	     * @returns {ElementList}
	     */
	
	  }, {
	    key: 'removeClasses',
	    value: function removeClasses(classes) {
	      var _this7 = this;
	
	      classes.split(' ').filter(function (className) {
	        return className.trim().length;
	      }).forEach(function (className) {
	        _this7.forEach(function (element) {
	          element.classList.remove(className);
	        });
	      });
	      return this;
	    }
	
	    /**
	     * return a new ElementList contain a deep cloned copy
	     * each node
	     */
	
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new ElementList([].concat(_toConsumableArray(this.map(function (n) {
	        return n.cloneNode(true);
	      }))));
	    }
	
	    /**
	     * set the given attribute on all nodes
	     */
	
	  }, {
	    key: 'setAttr',
	    value: function setAttr(name, value) {
	      this.forEach(function (n) {
	        return n.setAttribute(name, value);
	      });
	      return this;
	    }
	
	    /**
	     * return the attribute value.
	     * @param name
	     */
	
	  }, {
	    key: 'getAttr',
	    value: function getAttr(name) {
	      return this.map(function (n) {
	        return n.getAttribute(name);
	      });
	    }
	
	    /**
	     * The class maintains a static WeakMap hash that can be used to associated
	     * random with a DOM element.
	     */
	
	  }, {
	    key: 'setData',
	    value: function setData(value) {
	      this.forEach(function (n) {
	        return nodeMap[n] = value;
	      });
	    }
	    /**
	     * Returns the data associated with our DOM nodes. Data is returned
	     * as an array where null is used for DOM nodes with no associated data.
	     */
	
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return this.map(function (n) {
	        return nodeMap[n];
	      });
	    }
	
	    /**
	     * called addEventListener for each element in the list,
	     * @param event
	     * @param handler
	     */
	
	  }, {
	    key: 'on',
	    value: function on(event, handler) {}
	
	    /**
	     * There are three ways to call off.
	     * 1. With a specific event and handler (identical to a previous call to .on)
	     * 2. With just an event name, all handlers for that event will be removeEventListener
	     * 3. With no parameters, all event handlers will be removed
	     * @param event
	     * @param handler
	     */
	
	  }, {
	    key: 'off',
	    value: function off(event, handler) {}
	  }, {
	    key: 'el',
	    get: function get() {
	      return this.length ? this[0] : null;
	    }
	  }]);
	
	  return ElementList;
	}(_extendableBuiltin(Array));
	
	;
	
	/**
	 * We export a factory function for ElementList so there is no need to the new operator
	 */
	;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * cache for elements based on user supplied keys. Cache can be configured with
	 * a time interval upon which to delete elements from the cache ( only if not present in the DOM ).
	 */
	var ElementCache = function () {
	
	  /**
	   * initialize with time to live. NOTE: An element must be expired AND not parented into the DOM
	   * to be purged from the cache.
	   * @param ttl
	   */
	  function ElementCache() {
	    var ttl = arguments.length <= 0 || arguments[0] === undefined ? 10000 : arguments[0];
	
	    _classCallCheck(this, ElementCache);
	
	    this.empty();
	    this.ttl = ttl;
	    setInterval(this.purge.bind(this), this.ttl);
	  }
	
	  /**
	   * purge elements that are not parented and have exceeded the ttl since they were last used
	   */
	
	
	  _createClass(ElementCache, [{
	    key: 'purge',
	    value: function purge() {
	      var _this = this;
	
	      var now = Date.now();
	      // find all the expired keys
	      Object.keys(this.cache).filter(function (key) {
	        var entry = _this.cache[key];
	        return !entry.element.el.parentNode && now - entry.lastReferenced >= _this.ttl;
	      }).forEach(function (key) {
	        delete _this.cache[key];
	      });
	    }
	
	    /**
	     * return the element using the given key or null if not present.
	     * If present the lastReferenced time of the resource is updated.
	     * @param key
	     */
	
	  }, {
	    key: 'getElement',
	    value: function getElement(key) {
	      var entry = this.cache[key];
	      if (entry) {
	        // update the lastReferenced time of the entry
	        entry.lastReferenced = Date.now();
	        return entry.element;
	      }
	      return null;
	    }
	
	    /**
	     * add an element to the cache and initialize its lastRefereced property to now.
	     * Overwrites any existing element with the same cache key
	     * @param key
	     */
	
	  }, {
	    key: 'addElement',
	    value: function addElement(key, element) {
	      this.cache[key] = new CacheEntry(key, element);
	    }
	
	    /**
	     * remove the given element from the cache
	     * @param key
	     */
	
	  }, {
	    key: 'removeElement',
	    value: function removeElement(key) {
	      delete this.cache[key];
	    }
	
	    /**
	     * empty the entire cache
	     */
	
	  }, {
	    key: 'empty',
	    value: function empty() {
	      this.cache = {};
	    }
	  }]);
	
	  return ElementCache;
	}();
	
	/**
	 * individual entry in the cache
	 */
	
	
	exports.default = ElementCache;
	
	var CacheEntry = function CacheEntry(key, element) {
	  _classCallCheck(this, CacheEntry);
	
	  this.key = key;
	  this.element = element;
	  this.lastReferenced = Date.now();
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * measure the width / height of characters using the exact font and styles that will be used to render
	 * the sequence. This should be called only once to obtain the size since it is costly.
	 * @returns {{w: number, h: number}}
	 */
	var charMeasure = exports.charMeasure = function charMeasure() {
	  // create a temporary div for measuring its contents
	  var textDIV = document.createElement('DIV');
	  textDIV.className = "roboto fixed font-size inline-block";
	  textDIV.style.visibility = 'hidden';
	  document.body.appendChild(textDIV);
	  // use a representative string hoping for the best average
	  var probe = 'abcdefghijklmnopqrstuvwxyz01234567890-:+';
	  textDIV.innerHTML = probe;
	  // measure the actual dimensions
	  var results = {
	    w: textDIV.clientWidth / probe.length,
	    h: textDIV.clientHeight
	  };
	  // dispose DIV once we have measured
	  document.body.removeChild(textDIV);
	  return results;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _mousetrap = __webpack_require__(8);
	
	var _mousetrap2 = _interopRequireDefault(_mousetrap);
	
	var _vector2d = __webpack_require__(9);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _box2d = __webpack_require__(14);
	
	var _box2d2 = _interopRequireDefault(_box2d);
	
	var _statusBar = __webpack_require__(15);
	
	var _statusBar2 = _interopRequireDefault(_statusBar);
	
	var _underscore = __webpack_require__(11);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Pixels from top or bottom of client where autoscrolling is triggered
	 * @type {number}
	 */
	var kAUTOSCROLL = 30;
	
	/**
	 * viewport resizes are throttled to this number of MS
	 * @type {number}
	 */
	var kRESIZE = 100;
	
	/**
	 * mouse wheel events are throttles to this interval
	 * @type {number}
	 */
	var kWHEEL = 75;
	
	var UserInterface = function () {
	  function UserInterface(options) {
	    _classCallCheck(this, UserInterface);
	
	    this.options = Object.assign({
	      viewer: null
	    }, options);
	    this.viewer = this.options.viewer;
	    (0, _invariant2.default)(this.viewer, 'viewer must be supplied to user interface');
	
	    this.layer = (0, _dom2.default)('<div class="userinterface"></div>');
	    this.viewer.outer.el.appendChild(this.layer.el);
	
	    this.statusBar = new _statusBar2.default(this.viewer);
	
	    // setup mouse interface
	    this.mouseTrap = new _mousetrap2.default({
	      element: this.layer.el,
	      mouseDown: this.mouseDown.bind(this),
	      mouseUp: this.mouseUp.bind(this),
	      mouseMove: this.mouseMove.bind(this),
	      mouseDrag: this.mouseDrag.bind(this),
	      mouseLeave: this.mouseLeave.bind(this),
	      mouseWheel: _underscore2.default.throttle(this.mouseWheel.bind(this), kWHEEL, { trailing: false }),
	      doubleClick: this.doubleClick.bind(this)
	    });
	
	    // resize requires an update
	    window.addEventListener('resize', this.resizeHandler = _underscore2.default.throttle(this.onResize.bind(this), kRESIZE));
	
	    // // toggle reverse strand
	    // document.getElementById('toggleReverseStrand').addEventListener('click', () => {
	    //   this.viewer.showReverseStrand(!this.viewer.showReverseStrand());
	    //   this.viewer.mapDataSet();
	    //   this.viewer.render();
	    // });
	    //
	    // document.getElementById('firstRow').addEventListener('click', () => {
	    //   this.viewer.firstRow = 0;
	    //   this.viewer.render();
	    // });
	    //
	    // document.getElementById('lastRow').addEventListener('click', () => {
	    //   this.viewer.firstRow = this.viewer.rowList.length - 1;
	    //   this.viewer.render();
	    // });
	  }
	
	  /**
	   * cleanup
	   */
	
	
	  _createClass(UserInterface, [{
	    key: 'dispose',
	    value: function dispose() {
	      (0, _invariant2.default)(!this.disposed, 'Already disposed');
	      this.disposed = true;
	      window.removeEventListener('resize', this.resizeHandler);
	      this.mouseTrap.dispose();
	    }
	    /**
	     * throttled window resize
	     */
	
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      (0, _invariant2.default)(!this.viewer.disposed, 'viewer has been disposed');
	      this.viewer.resized();
	    }
	
	    /**
	     * Select annotation if directly clicked or range of clicked annotation
	     * @param event
	     * @param localPosition
	     */
	
	  }, {
	    key: 'doubleClick',
	    value: function doubleClick(event, local) {
	
	      var info = this.localToRowDetails(local);
	      if (info) {
	        switch (info.location) {
	
	          case 'annotation':
	            this.viewer.selectAnnotation(info.annotation.id);
	            break;
	
	          case 'block':
	            this.viewer.selectBlock(info.blockInfo.block.id);
	            break;
	
	          default:
	            this.setSelection();
	        }
	      } else {
	        this.setSelection();
	      }
	      this.viewer.render();
	    }
	
	    /**
	     * mouse wheel handler
	     * @param event
	     */
	
	  }, {
	    key: 'mouseWheel',
	    value: function mouseWheel(event, localPosition, normalized) {
	      // ignore if no y component
	      if (normalized.spinY === 0) {
	        return;
	      }
	      // save current firstRow so we can determine if anything changed
	      var firstRow = this.viewer.firstRow;
	      // spinY is a float 0..n
	      for (var i = 0; i <= Math.abs(normalized.spinY); i += 1) {
	        if (normalized.spinY < 0) {
	          this.viewer.previousRow();
	        } else {
	          this.viewer.nextRow();
	        }
	      }
	      // if anything changed update
	      if (this.viewer.firstRow !== firstRow) {
	        // pass wheel event through to mouse move
	        this.mouseMove(event, localPosition);
	        // redraw
	        this.viewer.render();
	      }
	    }
	
	    /**
	     * cancel autoscroll if running
	     */
	
	  }, {
	    key: 'stopAutoScroll',
	    value: function stopAutoScroll() {
	      window.clearTimeout(this.autoScrollId);
	      this.autoScrollId = null;
	    }
	
	    /**
	     * mouse down handler from mouse trap.
	     * @param event
	     * @param local
	     */
	
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(event, local) {
	      this.cursor = null;
	      var bo = this.localToBlockOffset(local);
	      if (bo) {
	        this.anchor = bo;
	        this.localMousePreviousDrag = local;
	        this.setSelection(bo);
	        this.stopAutoScroll();
	      } else {
	        this.setSelection();
	      }
	      this.render();
	    }
	
	    /**
	     * cancal auto scroll when mouse released
	     * @param event
	     * @param local
	     */
	
	  }, {
	    key: 'mouseUp',
	    value: function mouseUp(event, local) {
	      this.stopAutoScroll();
	    }
	
	    /**
	     * autoscroll up or down according to location of mouse.
	     */
	
	  }, {
	    key: 'autoScroll',
	    value: function autoScroll() {
	      var b = this.layer.el.getBoundingClientRect();
	      if (this.localMousePreviousDrag.y < kAUTOSCROLL) {
	        this.viewer.previousRow();
	        this.mouseDrag(null, this.localMousePreviousDrag);
	      } else {
	        if (this.localMousePreviousDrag.y >= b.bottom - b.top - kAUTOSCROLL) {
	          this.viewer.nextRow();
	          this.mouseDrag(null, this.localMousePreviousDrag);
	        }
	      }
	    }
	
	    /**
	     * update selection as user drags
	     */
	
	  }, {
	    key: 'mouseDrag',
	    value: function mouseDrag(event, local) {
	      if (this.selection) {
	        this.localMousePreviousDrag = local;
	        var bo = this.localToBlockOffset(local);
	        if (bo) {
	          this.setSelection(this.anchor, bo);
	        }
	        // start auto scroll if not already
	        if (!this.autoScrollId) {
	          this.autoScrollId = window.setInterval(this.autoScroll.bind(this), 100);
	        }
	      }
	      this.viewer.render();
	    }
	
	    /**
	     * mouse move, which should only occur if not dragging ( selecting )
	     */
	
	  }, {
	    key: 'mouseMove',
	    value: function mouseMove(event, local) {
	      // the cursor is stored in client area column/row
	      var v = this.localToColumnRow(local);
	      if (!v) {
	        this.cursor = null;
	      } else {
	        this.cursor = v.sub(new _vector2d2.default(0, this.viewer.firstRow));
	      }
	      this.clampCursor();
	      this.renderCursor();
	    }
	
	    /**
	     * hide cursor on mouse leave
	     */
	
	  }, {
	    key: 'mouseLeave',
	    value: function mouseLeave() {
	      this.hideCursor();
	    }
	
	    /**
	     * hide the cursor
	     */
	
	  }, {
	    key: 'hideCursor',
	    value: function hideCursor() {
	      this.cursor = null;
	      this.renderCursor();
	    }
	
	    /**
	     * ensure the current cursor position is still within the data range
	     */
	
	  }, {
	    key: 'clampCursor',
	    value: function clampCursor() {
	      if (this.cursor) {
	        var clientTop = new _vector2d2.default(0, this.viewer.firstRow);
	        var blockOffset = this.columnRowToBlockOffset(this.cursor.add(clientTop));
	        if (!blockOffset) {
	          // clamp to last character of last block
	          var block = this.viewer.blockList[this.viewer.blockList.length - 1];
	          blockOffset = {
	            block: block,
	            blockOffset: this.viewer.blockDisplayLength(block) - 1
	          };
	          this.cursor = this.blockOffsetToColumnRow(blockOffset).sub(clientTop);
	        }
	      }
	    }
	
	    /**
	     * Takes a local coordinates and returns as a column/row vector
	     * @param vector
	     */
	
	  }, {
	    key: 'localToColumnRow',
	    value: function localToColumnRow(vector) {
	
	      // get and test row first
	      var row = this.viewer.getRowIndexFromY(vector.y);
	      if (row < 0) {
	        return null;
	      }
	      // get and test column
	      var column = this.viewer.getColumnIndexFromX(vector.x, row);
	      if (column < 0) {
	        return null;
	      }
	      // both are within the data set
	      return new _vector2d2.default(column, row);
	    }
	
	    /**
	     * get detailed information about the column / row clicked and what exactly is
	     * at the location. Used for operation like double click where we need to know
	     * if the user clicked an annotation or the block.
	     * Returns:
	     * If the point is within a column and row we return
	     * {
	     *  row: number,
	     *  column: number,
	     *  location: one of ['sequence', 'separator', 'reverse', 'block', 'annotation', 'ruler']
	     *  block: if location === 'block' this is the blockInfo
	     *  annotation: if location === 'annotation' this is the annotationInfo
	     * }
	     *
	     * @param vector
	     */
	
	  }, {
	    key: 'localToRowDetails',
	    value: function localToRowDetails(vector) {
	      var _this = this;
	
	      var columnRow = this.localToColumnRow(vector);
	      var info = null;
	      if (columnRow) {
	        (function () {
	          // initialize info with column and row
	          info = { column: columnRow.x, row: columnRow.y };
	          // location is valid, figure out where the user clicked.
	          var box = _this.viewer.getRowBounds(columnRow.y);
	          // click was within the sequence row?
	          if (vector.y < box.y + _this.viewer.getCharHeight()) {
	            info.location = 'sequence';
	          }
	          // click was within separator row?
	          if (!info.location && vector.y < box.y + _this.viewer.getCharHeight() * 2) {
	            info.location = 'separator';
	          }
	          // reverse strand if present
	          if (!info.location && _this.viewer.options.reverse && vector.y < box.y + _this.viewer.getCharHeight() * 3) {
	            info.location = 'reverse';
	          }
	          // block?
	          var yOffset = _this.viewer.options.reverse ? _this.viewer.getCharHeight() * 4 : _this.viewer.getCharHeight() * 3;
	          if (!info.location && vector.y < box.y + yOffset) {
	            info.location = 'block';
	            info.blockInfo = _this.columnRowToBlockOffset(columnRow);
	          }
	          // one of the annotations?
	          if (!info.location) {
	            (function () {
	              // get first row for annotations
	              var startRow = _this.viewer.options.reverse ? 4 : 3;
	              // search for an annotation containing the x/y position
	              var rowInfo = _this.viewer.rowList[columnRow.y];
	              if (rowInfo.annotationRecords) {
	                var aRecord = rowInfo.annotationRecords.find(function (aRecord) {
	                  var aBox = new _box2d2.default(aRecord.start * _this.viewer.getCharWidth(), (startRow + aRecord.depth) * _this.viewer.getCharHeight(), (aRecord.end - aRecord.start) * _this.viewer.getCharWidth(), _this.viewer.getCharHeight());
	                  return aBox.pointInBox(new _vector2d2.default(vector.x, vector.y - box.y));
	                });
	                // did we hit an annotation ?
	                if (aRecord) {
	                  info.location = 'annotation';
	                  info.annotation = aRecord.annotation;
	                }
	              }
	            })();
	          }
	          // test for ruler, which is below everything else
	          if (!info.location) {
	            // take into account depth of annotation nested an 1/2 char vertical padding before ruler
	            var aDepth = _this.viewer.rowList[columnRow.y].annotationDepth + 0.5;
	            var _yOffset = (aDepth + (_this.viewer.options.reverse ? 4 : 3)) * _this.viewer.getCharHeight();
	            if (!info.location && vector.y >= box.y + _yOffset) {
	              info.location = 'ruler';
	            }
	          }
	        })();
	      }
	      return info;
	    }
	
	    /**
	     * return the block and offset into the block denoted by the given
	     * column/row vector
	     * @param vector
	     */
	
	  }, {
	    key: 'columnRowToBlockOffset',
	    value: function columnRowToBlockOffset(vector) {
	      // get all the records for the row
	      var rowInfo = this.viewer.rowList[vector.y];
	      // out of bounds
	      if (!rowInfo) {
	        return null;
	      }
	      // iterate through row records to find the answer
	      var offset = 0;
	      for (var i = 0; i < rowInfo.blockRecords.length; i += 1) {
	        var info = rowInfo.blockRecords[i];
	        if (vector.x < offset + info.length) {
	          // falls within this block
	          return {
	            block: info.block,
	            blockOffset: vector.x - offset + info.startBlockOffset
	          };
	        } else {
	          offset += info.length;
	        }
	      }
	      // if here the user clicked beyond the end of the last block
	      return null;
	    }
	
	    /**
	     * convert a block and block offset into a column and row i.e. takes the output of columnToBlockOffset
	     * and converts it back to a column/row vector
	     * @param info
	     */
	
	  }, {
	    key: 'blockOffsetToColumnRow',
	    value: function blockOffsetToColumnRow(info) {
	      // get the starting / end row and column for the block
	      var blockInfo = this.viewer.blockRowMap[info.block.id];
	      var row = blockInfo.startRow + ((blockInfo.startRowOffset + info.blockOffset) / this.viewer.rowLength >> 0);
	      var col = (blockInfo.startRowOffset + info.blockOffset) % this.viewer.rowLength;
	      return new _vector2d2.default(col, row);
	    }
	
	    /**
	     * convert local mouse coordinates directly into block/blockOffset with clamping as requested by user
	     * @param local
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'localToBlockOffset',
	    value: function localToBlockOffset(local) {
	      var v = this.localToColumnRow(local);
	      return v ? this.columnRowToBlockOffset(v) : null;
	    }
	
	    /**
	     * render all user interface components
	     */
	
	  }, {
	    key: 'render',
	    value: function render() {
	      //console.time('Render UI');
	      this.renderCursor();
	      this.renderSelection();
	      //console.timeEnd('Render UI')
	    }
	
	    /**
	     * render the cursor
	     */
	
	  }, {
	    key: 'renderCursor',
	    value: function renderCursor() {
	      // cursor is defined by block and offset
	      if (this.cursor) {
	        // create DOM as necessary and update
	        if (!this.cursorEl) {
	          this.cursorEl = (0, _dom2.default)('<div class="cursor"></div>');
	          this.layer.appendChild(this.cursorEl);
	        }
	        var box = this.viewer.getRowBounds(this.cursor.y + this.viewer.firstRow);
	        this.cursorEl.setStyles({
	          left: this.viewer.getCharWidth() * this.cursor.x + 'px',
	          top: box.y + 'px',
	          width: this.viewer.getCharWidth() + 'px',
	          height: box.height - this.viewer.getCharHeight() * 3.5 + 'px'
	        });
	        this.statusBar.setPosition((this.cursor.y + this.viewer.firstRow) * this.viewer.rowLength + this.cursor.x);
	      } else {
	        // no cursor defined remove DOM if present
	        if (this.cursorEl) {
	          this.cursorEl.remove();
	          this.cursorEl = null;
	          this.statusBar.setPosition();
	        }
	      }
	    }
	
	    /**
	     * render the current selection into the viewers DOM
	     */
	
	  }, {
	    key: 'renderSelection',
	    value: function renderSelection() {
	      // remove existing selection elements
	      if (this.selectionElements) {
	        this.selectionElements.forEach(function (el) {
	          el.remove();
	        });
	        this.selectionElements = null;
	      }
	      if (this.selection) {
	        // only display selection body if there is a range
	        if (this.selection.columnRowEnd) {
	          // get the range of the selection and clamp to the current bounds of the client area
	          var viewerFirstRow = this.viewer.firstRow;
	          var viewerLastRow = this.viewer.firstRow + this.viewer.rowsVisible();
	          var start = Math.max(this.selection.columnRowStart.y, viewerFirstRow);
	          var end = Math.min(this.selection.columnRowEnd.y, viewerLastRow);
	          // if any of the range is visible then display it
	          for (var i = start; i <= end; i += 1) {
	            var el = (0, _dom2.default)('<div class="selection-box"></div>');
	            var box = this.viewer.getRowBounds(i);
	            // ignore if row not visible
	            if (!box.isEmpty()) {
	              // adjust box if this is the first row and add left border class
	              if (i === this.selection.columnRowStart.y) {
	                box.x = this.selection.columnRowStart.x * this.viewer.getCharWidth();
	                box.w = (this.viewer.rowLength - this.selection.columnRowStart.x) * this.viewer.getCharWidth();
	                el.addClasses('left-edge');
	              }
	              // adjust box again if this is the last row and add right edge css class
	              if (i === this.selection.columnRowEnd.y) {
	                box.w -= (this.viewer.rowLength - this.selection.columnRowEnd.x - 1) * this.viewer.getCharWidth();
	                el.addClasses('right-edge');
	              }
	              el.setStyles({
	                left: box.x + 'px',
	                top: box.y + 'px',
	                width: box.w + 'px',
	                height: box.h - this.viewer.getCharHeight() * 3.5 + 'px'
	              });
	              // add to list of selection elements and add to the DOM
	              this.selectionElements = this.selectionElements || [];
	              this.selectionElements.push(el);
	              this.layer.appendChild(el);
	            }
	          }
	        }
	      }
	    }
	
	    /**
	     * compare two block offset for equality
	     * @param bo1
	     * @param bo2
	     */
	
	  }, {
	    key: 'blockOffsetEqual',
	    value: function blockOffsetEqual(bo1, bo2) {
	      // both false, equal
	      if (!bo1 && !bo2) {
	        return true;
	      }
	      // one is false, other is true
	      if (!!bo1 !== !!bo2) {
	        return false;
	      }
	      return bo1.block.id === bo2.block.id && bo1.blockOffset === bo2.blockOffset;
	    }
	
	    /**
	     * set the range of the current selection. All parameters are optional.
	     * If no parameters are provided the selection is reset.
	     * If only the start is given the selection is just a location, if both are provided
	     * it defines a range.
	     * @param blockOffsetStart
	     * @param blockOffsetEnd
	     */
	
	  }, {
	    key: 'setSelection',
	    value: function setSelection(blockOffsetStart, blockOffsetEnd) {
	
	      // reset if no selection given
	      if (!blockOffsetStart && !blockOffsetEnd) {
	        this.selection = null;
	      } else {
	        (0, _invariant2.default)(blockOffsetStart, 'start must be defined unless resetting the selection');
	        // start to column/row
	        var columnRowStart = this.blockOffsetToColumnRow(blockOffsetStart);
	        // define start point if only start given
	        if (!blockOffsetEnd) {
	          this.selection = {
	            blockOffsetStart: blockOffsetStart,
	            columnRowStart: columnRowStart
	          };
	        } else {
	          // calculate the column/row vector for the selection and normalize to ensure start <= end
	          var columnRowEnd = this.blockOffsetToColumnRow(blockOffsetEnd);
	          if (columnRowStart.y < columnRowEnd.y || columnRowStart.y === columnRowEnd.y && columnRowStart.x <= columnRowEnd.x) {
	            // start is already <= end
	            this.selection = {
	              blockOffsetStart: blockOffsetStart,
	              blockOffsetEnd: blockOffsetEnd,
	              columnRowStart: columnRowStart,
	              columnRowEnd: columnRowEnd
	            };
	          } else {
	            // swap start and end
	            this.selection = {
	              blockOffsetStart: blockOffsetEnd,
	              blockOffsetEnd: blockOffsetStart,
	              columnRowStart: columnRowEnd,
	              columnRowEnd: columnRowStart
	            };
	          }
	        }
	      }
	      // update status bar with selection
	      if (this.selection && this.selection.columnRowStart) {
	        this.statusBar.setStart(this.selection.columnRowStart.y * this.viewer.rowLength + this.selection.columnRowStart.x);
	      } else {
	        this.statusBar.setStart();
	      }
	      if (this.selection && this.selection.columnRowEnd) {
	        this.statusBar.setEnd(this.selection.columnRowEnd.y * this.viewer.rowLength + this.selection.columnRowEnd.x);
	      } else {
	        this.statusBar.setEnd();
	      }
	    }
	
	    /**
	     * set selection from columnRow vectors versus blocks
	     */
	
	  }, {
	    key: 'setSelectionFromColumnRow',
	    value: function setSelectionFromColumnRow(start, end) {
	      this.setSelection(this.columnRowToBlockOffset(start), this.columnRowToBlockOffset(end));
	    }
	
	    /**
	     * called when the size is changed to reset our selection
	     */
	
	  }, {
	    key: 'updateSelection',
	    value: function updateSelection() {
	      this.setSelection(this.selection ? this.selection.blockOffsetStart : null, this.selection ? this.selection.blockOffsetEnd : null);
	    }
	  }]);
	
	  return UserInterface;
	}();
	
	exports.default = UserInterface;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vector2d = __webpack_require__(9);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * mouse wheel constants
	 */
	var PIXEL_STEP = 10;
	var LINE_HEIGHT = 40;
	var PAGE_HEIGHT = 800;
	
	/**
	 * MS and pixel thresholds to register a double click
	 */
	var doubleClickTimeThreshold = 500;
	var doubleClickSpatialThreshold = 4;
	/**
	 * handle mousedown,mousemove,mouseup events for the given element including
	 * converting to local coordinates and capturing the mouse on the document.body
	 * during a drag.
	 * Callbacks which should exist are:
	 * mouseTrapDown(client point, event)
	 * mouseTrapMove(client point, event)
	 * mouseTrapUp(client point, event)
	 * mouseTrapDrag(client point, event) - which is a mousemove with the button held down
	 *
	 * A drag can be cancelled at anytime by calling cancelDrag on this instance.
	 * Call dispose to end all mouse captures. Do not use the instance after this.
	 */
	
	var MouseTrap = function () {
	
	  /**
	   * owner is any object that will get the callbacks. Element is
	   * the target element you want the events on.
	   */
	  function MouseTrap(options) {
	    _classCallCheck(this, MouseTrap);
	
	    // save our options, which at the very least must contain the targeted element.
	    // Options are:
	    //
	    // element: HTMLElement - the element which we listen to
	    // mouseEnter: Function - callback for mouseenter event (event)
	    // mouseLeave: Function - callback for mouseleave event (event)
	    // mouseDown: Function - callback for mousedown event (point, event)
	    // mouseMove: Function - callback for mousemove event (point, event)
	    // mouseDrag: Function - callback for mousemove with button held down event (point, event)
	    // mouseUp: Function - callback for mouseup event (point, event) only when mousedown preceeded.
	    // mouseWheel: Function - callback for normalized mouse wheel events. (event, normalized data)
	    // doubleClick: Function - callback for double click with left button
	    this.options = Object.assign({}, options);
	    (0, _invariant2.default)(this.options.element, 'options must contain an element');
	    this.element = options.element;
	
	    // create bound versions of the listener which we can remove as well as add
	    this.mouseEnter = this.onMouseEnter.bind(this);
	    this.mouseLeave = this.onMouseLeave.bind(this);
	    this.mouseDown = this.onMouseDown.bind(this);
	    this.mouseMove = this.onMouseMove.bind(this);
	    this.mouseDrag = this.onMouseDrag.bind(this);
	    this.mouseUp = this.onMouseUp.bind(this);
	    this.mouseWheel = this.onMouseWheel.bind(this);
	
	    // mouse enter/leave are always running
	    this.element.addEventListener('mouseenter', this.mouseEnter);
	    this.element.addEventListener('mouseleave', this.mouseLeave);
	    // sink the mousedown, later dynamically add the move/up handlers
	    this.element.addEventListener('mousedown', this.mouseDown);
	    // for normal mouse move with no button we track via the target element itself
	    this.element.addEventListener('mousemove', this.mouseMove);
	    // mouse wheel events
	    this.element.addEventListener('wheel', this.mouseWheel);
	  }
	
	  /**
	   * mouse enter/leave handlers
	   */
	
	
	  _createClass(MouseTrap, [{
	    key: 'onMouseEnter',
	    value: function onMouseEnter(event) {
	      this.callback('mouseEnter', event);
	    }
	  }, {
	    key: 'onMouseLeave',
	    value: function onMouseLeave(event) {
	      this.callback('mouseLeave', event);
	    }
	
	    /**
	     * mouse down handler, invoked on our target element
	     */
	
	  }, {
	    key: 'onMouseDown',
	    value: function onMouseDown(event) {
	      // whenever our element gets a mouse down ( any button ) ensure any inputs are unfocused
	      if (document.activeElement && document.activeElement.tagName && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
	        document.activeElement.blur();
	      }
	
	      // left button only
	      if (event.which !== 1) {
	        return;
	      }
	      (0, _invariant2.default)(!this.dragging, 'mousetrap is already in drag mode');
	
	      // get local position and record the starting position and setup move/up handlers on the mouseLayer
	      var localPosition = this.eventToLocal(event);
	      var time = Date.now();
	
	      // check for a double click before starting a drag
	      if (this.lastLeftClick && this.lastLeftClick.sub(localPosition).len() <= doubleClickSpatialThreshold && time - this.lastLeftClickTime <= doubleClickTimeThreshold) {
	        this.lastLeftClick = null;
	        this.callback('doubleClick', event, localPosition);
	        return;
	      }
	      // remember this click, it may be the first click of a double click
	      this.lastLeftClick = localPosition;
	      this.lastLeftClickTime = time;
	
	      this.mouseLayer = (0, _dom2.default)('<div class="sv-mouseLayer"></div>');
	      this.mouseLayer.appendTo(document.body);
	
	      // start a drag
	      this.dragging = {
	        mouseLayer: this.mouseLayer.el,
	        startPosition: localPosition
	      };
	      this.mouseLayer.el.addEventListener('mousemove', this.mouseDrag);
	      this.mouseLayer.el.addEventListener('mouseup', this.mouseUp);
	
	      // invoke optional callback
	      this.callback('mouseDown', event, localPosition);
	    }
	
	    /**
	     * mousemove event
	     */
	
	  }, {
	    key: 'onMouseMove',
	    value: function onMouseMove(event) {
	      var localPosition = this.eventToLocal(event);
	      this.callback('mouseMove', event, localPosition);
	    }
	
	    /**
	     * mousemove event binding during a drag operation
	     */
	
	  }, {
	    key: 'onMouseDrag',
	    value: function onMouseDrag(event) {
	      if (event.target === this.mouseLayer.el) {
	        (0, _invariant2.default)(this.dragging, 'only expect mouse moves during a drag');
	        // send the mouse move, then check for the begin of a drag
	        var localPosition = this.eventToLocal(event);
	        var distance = localPosition.sub(this.dragging.startPosition).len();
	        // invoke optional callback
	        this.callback('mouseDrag', event, localPosition, this.dragging.startPosition, distance);
	      }
	    }
	
	    /**
	     * mouseup handler
	     */
	
	  }, {
	    key: 'onMouseUp',
	    value: function onMouseUp(event) {
	      // left drag only
	      if (event.which !== 1 || event.target !== this.mouseLayer.el) {
	        return;
	      }
	      (0, _invariant2.default)(this.dragging, 'only expect mouse up during a drag');
	      var localPosition = this.eventToLocal(event);
	      this.cancelDrag();
	      this.callback('mouseUp', event, localPosition);
	    }
	
	    /**
	     * cancel a drag track in progress
	     * @return {[type]} [description]
	     */
	
	  }, {
	    key: 'cancelDrag',
	    value: function cancelDrag() {
	      if (this.dragging) {
	        var e = this.mouseLayer.el;
	        e.removeEventListener('mousemove', this.mouseDrag);
	        e.removeEventListener('mouseup', this.mouseUp);
	        e.parentElement.removeChild(e);
	        this.mouseLayer = null;
	        this.dragging = null;
	      }
	    }
	
	    /**
	     * mouse wheel handler
	     * @param event
	     */
	
	  }, {
	    key: 'onMouseWheel',
	    value: function onMouseWheel(event) {
	      var localPosition = this.eventToLocal(event);
	      this.callback('mouseWheel', event, localPosition, this.normalizeWheel(event));
	    }
	
	    /**
	     * a nice try at normalizing wheel events. Provided by our friends at Facebook:
	     * https://github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
	     * @param event
	     * @returns {{spinX: number, spinY: number, pixelX: number, pixelY: number}}
	     */
	
	  }, {
	    key: 'normalizeWheel',
	    value: function normalizeWheel(event) {
	      var sX = 0,
	          sY = 0,
	          // spinX, spinY
	      pX = 0,
	          pY = 0; // pixelX, pixelY
	
	      // Legacy
	      if ('detail' in event) {
	        sY = event.detail;
	      }
	      if ('wheelDelta' in event) {
	        sY = -event.wheelDelta / 120;
	      }
	      if ('wheelDeltaY' in event) {
	        sY = -event.wheelDeltaY / 120;
	      }
	      if ('wheelDeltaX' in event) {
	        sX = -event.wheelDeltaX / 120;
	      }
	
	      // side scrolling on FF with DOMMouseScroll
	      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
	        sX = sY;
	        sY = 0;
	      }
	
	      pX = sX * PIXEL_STEP;
	      pY = sY * PIXEL_STEP;
	
	      if ('deltaY' in event) {
	        pY = event.deltaY;
	      }
	      if ('deltaX' in event) {
	        pX = event.deltaX;
	      }
	
	      if ((pX || pY) && event.deltaMode) {
	        if (event.deltaMode == 1) {
	          // delta in LINE units
	          pX *= LINE_HEIGHT;
	          pY *= LINE_HEIGHT;
	        } else {
	          // delta in PAGE units
	          pX *= PAGE_HEIGHT;
	          pY *= PAGE_HEIGHT;
	        }
	      }
	
	      // Fall-back if spin cannot be determined
	      if (pX && !sX) {
	        sX = pX < 1 ? -1 : 1;
	      }
	      if (pY && !sY) {
	        sY = pY < 1 ? -1 : 1;
	      }
	
	      return { spinX: sX,
	        spinY: sY,
	        pixelX: pX,
	        pixelY: pY };
	    }
	
	    /**
	     * if given, invoke one of the named optional callbacks with a clone of the local point
	     */
	
	  }, {
	    key: 'callback',
	    value: function callback(eventName, event) {
	      if (this.options[eventName]) {
	        // if the client wants a callback preventDefault
	        event.preventDefault();
	        // slice the event name off the arguments but forward everything else
	        var args = Array.prototype.slice.call(arguments, 1);
	        this.options[eventName].apply(this, args);
	      }
	    }
	
	    /**
	     * cleanup all event listeners. Instance cannot be used after this.
	     */
	
	  }, {
	    key: 'dispose',
	    value: function dispose() {
	      this.element.removeEventListener('mouseenter', this.mouseEnter);
	      this.element.removeEventListener('mouseleave', this.mouseLeave);
	      this.element.removeEventListener('mousedown', this.mouseDown);
	      this.element.removeEventListener('mousemove', this.mouseMove);
	      this.element.removeEventListener('wheel', this.mouseWheel);
	      this.cancelDrag();
	      this.dragging = this.element = this.owner = null;
	    }
	
	    /**
	     * the target of the event is expected to be our element or one of its children
	     * @param node
	     * @param point
	     */
	
	  }, {
	    key: 'eventToDocument',
	    value: function eventToDocument(event) {
	      // only workds on newer browsers with pageX/pageY
	      (0, _invariant2.default)(event.pageX !== undefined, 'event must support pageX/Y');
	      return new _vector2d2.default(event.pageX + this.element.scrollLeft - document.body.scrollLeft, event.pageY + this.element.scrollTop - document.body.scrollTop);
	    }
	
	    /**
	     * event relative to our element
	     * @param event
	     */
	
	  }, {
	    key: 'eventToLocal',
	    value: function eventToLocal(event) {
	      var b = this.element.getBoundingClientRect();
	      var p = this.eventToDocument(event);
	      return new _vector2d2.default(p.x - b.left, p.y - b.top);
	    }
	  }]);
	
	  return MouseTrap;
	}();
	
	exports.default = MouseTrap;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _utils = __webpack_require__(10);
	
	var _line2d = __webpack_require__(12);
	
	var _line2d2 = _interopRequireDefault(_line2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * a 2D Vector/Point
	 */
	var Vector2D = function () {
	  /**
	   * @constructor
	   * @param {Number} x
	   * @param {Number} y
	   */
	  function Vector2D() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	    _classCallCheck(this, Vector2D);
	
	    (0, _invariant2.default)((0, _utils.isRealNumber)(x) && (0, _utils.isRealNumber)(y), 'Bad parameters');
	    this._v = [x, y];
	  }
	
	  _createClass(Vector2D, [{
	    key: 'toObject',
	
	
	    /**
	     * comma separated string representation
	     * @returns {String}
	     */
	    value: function toObject() {
	      return this.x + ',' + this.y;
	    }
	
	    /**
	     * reverse of toObject, but a static member that constructs a new instance
	     */
	
	  }, {
	    key: 'toString',
	
	
	    /**
	     * string out
	     */
	    value: function toString() {
	      return 'v2d(' + this.x + ', ' + this.y + ')';
	    }
	
	    /**
	     * return a copy of ourselves
	     * @returns {Vector2D}
	     */
	
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Vector2D(this.x, this.y);
	    }
	
	    /**
	     * return a new vector rounded to the nearest k integer
	     * @param {Number} grid [description]
	     * @return {Vector2D}   [description]
	     */
	
	  }, {
	    key: 'snap',
	    value: function snap(grid) {
	      return new Vector2D(Math.floor(this.x / grid) * grid, Math.floor(this.y / grid) * grid);
	    }
	
	    /**
	     * Point on circumference of circle
	     * @param {Number} xc
	     * @param {Number} yc
	     * @param {Number} radius
	     * @param {Number} degrees
	     */
	
	  }, {
	    key: 'angleBetween',
	
	
	    /**
	     * angle in degrees between two vectors
	     * @param {Number} other
	     */
	    value: function angleBetween(other) {
	      var rads = Math.atan2(other.y - this.y, other.x - this.x);
	
	      // atan2 return negative PI radians for the 180-360 degrees ( 9 o'clock to 3 o'clock )
	      if (rads < 0) {
	        rads = 2 * Math.PI + rads;
	      }
	
	      return (0, _utils.rad2deg)(rads);
	    }
	
	    /**
	     * add another vector
	     * @param {Vector2D} vector
	     * @returns {Vector2D}
	     */
	
	  }, {
	    key: 'add',
	    value: function add(vector) {
	      return new Vector2D(this.x + vector.x, this.y + vector.y);
	    }
	
	    /**
	     * subtract another vector
	     * @param {Vector2D} vector
	     * @returns {Vector2D}
	     */
	
	  }, {
	    key: 'sub',
	    value: function sub(vector) {
	      return new Vector2D(this.x - vector.x, this.y - vector.y);
	    }
	
	    /**
	     * multiply vector by coeffecient or another vector
	     * @param {Number|Vector2D} multiplier
	     * @returns {Vector2D | Number}
	     */
	
	  }, {
	    key: 'multiply',
	    value: function multiply(multiplier) {
	      return (0, _utils.isRealNumber)(multiplier) ? new Vector2D(this.x * multiplier, this.y * multiplier) : new Vector2D(this.x * multiplier.x, this.y * multiplier.y);
	    }
	
	    /**
	     * scale is an alias for multiply
	     */
	
	  }, {
	    key: 'scale',
	    value: function scale(multiplier) {
	      return this.multiply(multiplier);
	    }
	
	    /**
	     * divide vector by a constant
	     * @param {Number} divisor
	     * @returns {Vector2D}
	     */
	
	  }, {
	    key: 'divide',
	    value: function divide(divisor) {
	      return new Vector2D(this.x / divisor, this.y / divisor);
	    }
	
	    /**
	     * length of vector
	     * @returns {number}
	     */
	
	  }, {
	    key: 'len',
	    value: function len() {
	      return Math.sqrt(this.x * this.x + this.y * this.y);
	    }
	
	    /**
	     * distance between two points
	     * @param {vector} other [description]
	     * @return {Number}       [description]
	     */
	
	  }, {
	    key: 'distance',
	    value: function distance(other) {
	      return new _line2d2.default(this, other).len();
	    }
	
	    /**
	     * dot product
	     * @param {vector} other
	     * @returns Vector2D
	     */
	
	  }, {
	    key: 'dot',
	    value: function dot(other) {
	      return this.x * other.x + this.y * other.y;
	    }
	
	    /**
	     * return if within a certain threshold of proximity
	     * @param {vector} other     [description]
	     * @param {Number} threshold [description]
	     * @return {boolean}           [description]
	     */
	
	  }, {
	    key: 'similar',
	    value: function similar(other) {
	      var threshold = arguments.length <= 1 || arguments[1] === undefined ? 1e-6 : arguments[1];
	
	      var dx = Math.abs(this.x - other.x);
	      var dy = Math.abs(this.y - other.y);
	      return dx < threshold && dy < threshold;
	    }
	
	    /**
	     * equality test
	     * @param other
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'equals',
	    value: function equals(other) {
	      return this.x === other.x && this.y === other.y;
	    }
	
	    /**
	     * Given a source width/height of a box, return the aspect ratio correct size of the box when scaled down ( or optionally
	     * up ) to fit within the given window
	     * @param {Number} sourceWidth
	     * @param {Number} sourceHeight
	     * @param {Number} maxWidth
	     * @param {Number} maxHeight
	     * @param {Number} upscale
	     * @returns {Vector2D}
	     */
	
	  }, {
	    key: 'x',
	    get: function get() {
	      return this._v[0];
	    },
	    set: function set(newValue) {
	      (0, _invariant2.default)((0, _utils.isRealNumber)(newValue), 'Bad parameter');
	      this._v[0] = newValue;
	    }
	  }, {
	    key: 'y',
	    get: function get() {
	      return this._v[1];
	    },
	    set: function set(newValue) {
	      (0, _invariant2.default)((0, _utils.isRealNumber)(newValue), 'Bad parameter');
	
	      this._v[1] = newValue;
	    }
	  }], [{
	    key: 'fromObject',
	    value: function fromObject(str) {
	      (0, _invariant2.default)(str, 'Bad parameter');
	      var ary = str.split(',');
	      (0, _invariant2.default)(ary.length === 2, 'Bad parameter');
	      var vector = new Vector2D();
	      vector.x = parseFloat(ary[0]);
	      vector.y = parseFloat(ary[1]);
	      (0, _invariant2.default)((0, _utils.isRealNumber)(vector.x), 'Bad parameter');
	      (0, _invariant2.default)((0, _utils.isRealNumber)(vector.y), 'Bad parameter');
	      return vector;
	    }
	  }, {
	    key: 'pointOnCircumference',
	    value: function pointOnCircumference(xc, yc, radius, degrees) {
	      return new Vector2D(xc + radius * Math.cos((0, _utils.deg2rad)(degrees)), yc + radius * Math.sin((0, _utils.deg2rad)(degrees)));
	    }
	  }, {
	    key: 'scaleToWindow',
	    value: function scaleToWindow(sourceWidth, sourceHeight, maxWidth, maxHeight, upscale) {
	      // will hold thumb size on exit from this section
	      var tx = void 0;
	      var ty = void 0;
	
	      // if image fits entirely in window then just go with image size unless upscaling required
	      if (sourceWidth <= maxWidth && sourceHeight <= maxHeight && !upscale) {
	        tx = sourceWidth;
	        ty = sourceHeight;
	      } else {
	        // 1. Figure out which dimension is the worst fit, this is the axis/side
	        //    that we have to accommodate.
	
	        if (maxWidth / sourceWidth < maxHeight / sourceHeight) {
	          // width is the worst fit
	          // make width == window width
	          tx = maxWidth;
	
	          // make height in correct ratio to original
	          ty = sourceHeight * (maxWidth / sourceWidth) >> 0;
	        } else {
	          // height is the worst fit
	          // make height == window height
	          ty = maxHeight;
	
	          // make height in correct ratio to original
	          tx = sourceWidth * (maxHeight / sourceHeight) >> 0;
	        }
	      }
	
	      return new Vector2D(tx, ty);
	    }
	  }]);
	
	  return Vector2D;
	}();
	
	exports.default = Vector2D;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.nearly = exports.isZero = exports.isOne = exports.isRealNumber = exports.rad2deg = exports.deg2rad = undefined;
	
	var _underscore = __webpack_require__(11);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var deg2rad = exports.deg2rad = function deg2rad(deg) {
	  return deg * (Math.PI / 180);
	};
	
	var rad2deg = exports.rad2deg = function rad2deg(rad) {
	  return rad * (180 / Math.PI);
	};
	
	/**
	 * true is a number (including NaN!)
	 */
	var isRealNumber = exports.isRealNumber = function isRealNumber(val) {
	  return _underscore2.default.isNumber(val);
	};
	
	/**
	 * true if ~1
	 * @param  {number} val
	 * @return {boolean}
	 */
	var isOne = exports.isOne = function isOne(val) {
	  return Math.abs(1 - val) <= 1e-6;
	};
	
	/**
	 * true if ~0
	 * @param  {number} val
	 * @return {boolean}
	 */
	var isZero = exports.isZero = function isZero(val) {
	  return Math.abs(val) <= 1e-6;
	};
	
	/**
	 * true if the number v is very close to K
	 * @param  {number} v1
	 * @param  {number} v2
	 * @return {boolean}
	 */
	var nearly = exports.nearly = function nearly(v1, v2) {
	  return Math.abs(v1 - v2) < 1e-6;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _vector2d = __webpack_require__(9);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _intersection2d = __webpack_require__(13);
	
	var _intersection2d2 = _interopRequireDefault(_intersection2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//shallow hasOwnProperty check
	var hasProp = function hasProp(obj, prop) {
	  return obj.hasOwnProperty(prop);
	};
	
	var Line2D = function () {
	
	  /**
	   * a line composed of a start and end point
	   * @constructor
	   * @param {Vector2D} start
	   * @param {Vector2D} end
	   */
	  function Line2D(start, end) {
	    _classCallCheck(this, Line2D);
	
	    switch (arguments.length) {
	      case 0:
	        this._start = new _vector2d2.default();
	        this._end = new _vector2d2.default();
	        break;
	
	      case 1:
	        (0, _invariant2.default)(hasProp(start, 'x1') && hasProp(start, 'y1') && hasProp(start, 'x2') && hasProp(start, 'y2'), 'Bad parameter');
	        this._start = new _vector2d2.default(start.x1, start.y1);
	        this._end = new _vector2d2.default(start.x2, start.y2);
	        break;
	
	      case 2:
	        this._start = start.clone();
	        this._end = end.clone();
	        break;
	
	      case 4:
	        this._start = new _vector2d2.default(arguments[0], arguments[1]);
	        this._end = new _vector2d2.default(arguments[2], arguments[3]);
	        break;
	
	      default:
	        throw new Error('Bad parameters');
	    }
	  }
	
	  /**
	   * getter for start of line
	   * @return {Vector2D} [description]
	   */
	
	
	  _createClass(Line2D, [{
	    key: 'clone',
	
	
	    /**
	     * clone the line
	     * @return {Line2D}
	     */
	    value: function clone() {
	      return new Line2D(this.start, this.end);
	    }
	
	    /**
	     * JSONable version of object
	     * @return object
	     */
	
	  }, {
	    key: 'toObject',
	    value: function toObject() {
	      return {
	        start: this.start.toObject(),
	        end: this.end.toObject()
	      };
	    }
	
	    /**
	     * static constructor, produces a Line from the product of toObject
	     * @param  {object} obj
	     * @return Line2D
	     */
	
	  }, {
	    key: 'len',
	
	
	    /**
	     * return length of line
	     * return number
	     */
	    value: function len() {
	      var xl = this.x2 - this.x1;
	      var yl = this.y2 - this.y1;
	      return Math.sqrt(xl * xl + yl * yl);
	    }
	
	    /**
	     * return the slope of the line. Returns infinity if the line is vertical
	     * @return {number} [description]
	     */
	
	  }, {
	    key: 'slope',
	    value: function slope() {
	      var xd = this.start.x - this.end.x;
	      if (xd === 0) {
	        return Infinity;
	      }
	      return (this.start.y - this.end.y) / xd;
	    }
	
	    /**
	     * distance of point to line segment formed by this.start, this.end squared.
	     * @param {Vector2D} point
	     * @return {number} [description]
	     */
	
	  }, {
	    key: 'distanceToSegment',
	    value: function distanceToSegment(point) {
	      return Math.sqrt(this.distanceToSegmentSquared(point));
	    }
	
	    /**
	     * return the squared distance of the point to this line
	     * @param  {Vector2D} point
	     * @return {number}
	     */
	
	  }, {
	    key: 'distanceToSegmentSquared',
	    value: function distanceToSegmentSquared(point) {
	      function sqr(xp) {
	        return xp * xp;
	      }
	
	      function dist2(p1, p2) {
	        return sqr(p1.x - p2.x) + sqr(p1.y - p2.y);
	      }
	
	      var startv = this.start;
	      var endv = this.end;
	      var l2 = dist2(startv, endv);
	      if (l2 === 0) {
	        return dist2(point, startv);
	      }
	      var dst = ((point.x - startv.x) * (endv.x - startv.x) + (point.y - startv.y) * (endv.y - startv.y)) / l2;
	      if (dst < 0) {
	        return dist2(point, startv);
	      }
	      if (dst > 1) {
	        return dist2(point, endv);
	      }
	      return dist2(point, {
	        x: startv.x + dst * (endv.x - startv.x),
	        y: startv.y + dst * (endv.y - startv.y)
	      });
	    }
	
	    /**
	     * parametric point on line
	     * @param {number} point
	     */
	
	  }, {
	    key: 'pointOnLine',
	    value: function pointOnLine(point) {
	      var x = this.x1 + (this.x2 - this.x1) * point;
	      var y = this.y1 + (this.y2 - this.y1) * point;
	      return new _vector2d2.default(x, y);
	    }
	
	    /**
	     * intersection of this line with another line. This is really line segment intersection since
	     * it considers the lines finite as defined by their end points
	      * @param {Line2D} other - other line segment to intersect with
	     * @returns {Intersection2D}
	     */
	
	  }, {
	    key: 'intersectWithLine',
	    value: function intersectWithLine(other) {
	      var result = void 0;
	      var uaT = (other.x2 - other.x1) * (this.y1 - other.y1) - (other.y2 - other.y1) * (this.x1 - other.x1);
	      var ubT = (this.x2 - this.x1) * (this.y1 - other.y1) - (this.y2 - this.y1) * (this.x1 - other.x1);
	      var uB = (other.y2 - other.y1) * (this.x2 - this.x1) - (other.x2 - other.x1) * (this.y2 - this.y1);
	
	      if (uB !== 0) {
	        var ua = uaT / uB;
	        var ub = ubT / uB;
	
	        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
	          result = new _intersection2d2.default(new _vector2d2.default(this.x1 + ua * (this.x2 - this.x1), this.y1 + ua * (this.y2 - this.y1)));
	
	          result.status = 'Intersection';
	        } else {
	          result = new _intersection2d2.default('No Intersection');
	        }
	      } else {
	        if (uaT === 0 || ubT === 0) {
	          result = new _intersection2d2.default('Coincident');
	        } else {
	          result = new _intersection2d2.default('Parallel');
	        }
	      }
	      return result;
	    }
	
	    /**
	     * multiple / scale the line by the given coeffecient
	     * @param (numner) v
	     */
	
	  }, {
	    key: 'multiply',
	    value: function multiply(multiplier) {
	      return new Line2D(this.start.multiply(multiplier), this.end.multiply(multiplier));
	    }
	
	    /**
	     * stringify the line
	     * @return {string}
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return 'line2d: ' + this.start.toString() + ' : ' + this.end.toString();
	    }
	  }, {
	    key: 'start',
	    get: function get() {
	      return this._start.clone();
	    }
	
	    /**
	     * setter for start
	     * @param  {Vector2D} vector
	     */
	    ,
	
	
	    /**
	     * setter for end
	     * @param  {Vector2D} vector
	     */
	    set: function set(vector) {
	      this._end = vector.clone();
	    }
	
	    /**
	     * getter for x start
	     * @return {number}
	     */
	
	  }, {
	    key: 'end',
	
	
	    /**
	     * getter for end of line
	     * @return {Vector2D} [description]
	     */
	    get: function get() {
	      return this._end.clone();
	    }
	  }, {
	    key: 'x1',
	    get: function get() {
	      return this.start.x;
	    }
	
	    /**
	     * getter for y start
	     * @return {number}
	     */
	
	  }, {
	    key: 'y1',
	    get: function get() {
	      return this.start.y;
	    }
	
	    /**
	     * getter for x end
	     * @return {number}
	     */
	
	  }, {
	    key: 'x2',
	    get: function get() {
	      return this.end.x;
	    }
	
	    /**
	     * getter for y end
	     * @return {number}
	     */
	
	  }, {
	    key: 'y2',
	    get: function get() {
	      return this.end.y;
	    }
	  }], [{
	    key: 'fromObject',
	    value: function fromObject(obj) {
	      (0, _invariant2.default)(obj && obj.start && obj.end, 'Bad parameter');
	      return new Line2D(_vector2d2.default.fromObject(obj.start), _vector2d2.default.fromObject(obj.end));
	    }
	  }]);
	
	  return Line2D;
	}();
	
	exports.default = Line2D;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Intersection2D = function () {
	  /**
	   * the generic results of various types of intersection test.
	   * For valid intersections the points property is an array of
	   * Vector2D objects. There is also a point property that returns
	   * the first point in the points array. The status property is a string that indicates why the intersection test
	   * failed if any
	   * @constructor
	   * @param {G.Vector2D|String|undefined} arg - can be a vector or a status string or nothing
	   */
	  function Intersection2D(arg) {
	    _classCallCheck(this, Intersection2D);
	
	    if (arg && arg.constructor.name === 'Vector2D') {
	      this.points = [arg];
	    } else {
	      if (typeof arg === 'string') {
	        this._status = arg;
	      }
	      this.points = [];
	    }
	  }
	
	  /**
	   * return the first point in our intersection set or null if there are no intersections
	   * @return {[type]} [description]
	   */
	
	
	  _createClass(Intersection2D, [{
	    key: 'add',
	
	
	    /**
	     * add a point to our intersection set
	     * @param {Vector2D} point
	     */
	    value: function add(point) {
	      this.points = this.points || [];
	      this.points.push(point);
	    }
	  }, {
	    key: 'point',
	    get: function get() {
	      if (this.points && this.points.length) {
	        return this.points[0];
	      }
	      return null;
	    }
	
	    /**
	     * return our status string
	     * @return String
	     */
	
	  }, {
	    key: 'status',
	    get: function get() {
	      return this._status;
	    }
	
	    /**
	     * setter for our status
	     * @param  {String} str
	     */
	    ,
	    set: function set(str) {
	      (0, _invariant2.default)(typeof str === 'string', 'expected a string');
	      this._status = str;
	    }
	  }]);
	
	  return Intersection2D;
	}();
	
	exports.default = Intersection2D;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _vector2d = __webpack_require__(9);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _line2d = __webpack_require__(12);
	
	var _line2d2 = _interopRequireDefault(_line2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Box2D = function () {
	  /**
	   * flexible axis aligned box class. Can be initialized with almost any
	   * reasonable values or object i.e. 4 numbers, an object with a combination
	   * or x,y,w,h,l,t,r,b,left,top,right,bottom,width,height
	   * @param [x]
	   * @param [y]
	   * @param [w]
	   * @param [h]
	   * @constructor
	   */
	  function Box2D(x, y, w, h) {
	    _classCallCheck(this, Box2D);
	
	    // parse arguments
	    if (arguments.length === 4) {
	      this.x = x;
	      this.y = y;
	      this.w = w;
	      this.h = h;
	    } else {
	      if (arguments.length === 1) {
	        // map the properties ( keys ), if present, to our
	        // named property ( the values )
	        this.extend(arguments[0], {
	          x: 'x',
	          left: 'x',
	          y: 'y',
	          top: 'y',
	          w: 'w',
	          h: 'h',
	          width: 'w',
	          height: 'h',
	          right: 'r',
	          bottom: 'b',
	          r: 'r',
	          b: 'b'
	        });
	      } else {
	        if (arguments.length === 0) {
	          this.x = this.y = this.w = this.h = 0;
	        } else {
	          throw new Error('Bad parameters');
	        }
	      }
	    }
	  }
	
	  /**
	   * extend ourselves with any of the property names in props,
	   * renaming them to the given target property name
	   * @param  {[type]} from  [description]
	   * @param  {[type]} props [description]
	   * @return {[type]}       [description]
	   */
	
	
	  _createClass(Box2D, [{
	    key: 'extend',
	    value: function extend(from, props) {
	      for (var key in props) {
	        if (from.hasOwnProperty(key)) {
	          this[props[key]] = from[key];
	        }
	      }
	    }
	
	    /**
	     * simple toString 4 CSV values
	     * @returns {*}
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this.x + ', ' + this.y + ', ' + this.w + ', ' + this.h;
	    }
	
	    /**
	     * construct a box from a string, opposite of toString
	     */
	
	  }, {
	    key: 'clone',
	
	
	    /**
	     * return a cloned copy of this
	     * @return Box2D
	     */
	    value: function clone() {
	      return new Box2D(this.x, this.y, this.w, this.h);
	    }
	
	    /**
	     * normalize by returning a new box with positive extents
	     */
	
	  }, {
	    key: 'normalize',
	    value: function normalize() {
	      return new Box2D(Math.min(this.x, this.right), Math.min(this.y, this.bottom), Math.abs(this.w), Math.abs(this.h));
	    }
	
	    /**
	     * return a new Box inflated by the given signed amount
	     * @param {number} inflateX
	     * @param {number} inflateY
	     */
	
	  }, {
	    key: 'inflate',
	    value: function inflate(inflateX, inflateY) {
	      var box = new Box2D(this.x, this.y, this.w + inflateX * 2, this.h + inflateY * 2);
	      box.cx = this.cx;
	      box.cy = this.cy;
	      return box;
	    }
	
	    /**
	     * scale width/height of box around center returning a new box
	     * @param x
	     * @param y
	     */
	
	  }, {
	    key: 'scale',
	    value: function scale(x, y) {
	      return new Box2D(this.cx - this.width * x / 2, this.cy - this.height * y / 2, this.width * x, this.height * y);
	    }
	
	    /**
	     * return a new box that is this box * e
	     * @param multiplier
	     */
	
	  }, {
	    key: 'multiply',
	    value: function multiply(multiplier) {
	      return new Box2D(this.x * multiplier, this.y * multiplier, this.width * multiplier, this.height * multiplier);
	    }
	
	    /**
	     * return a new box that is this box / e
	     * @param divisor
	     */
	
	  }, {
	    key: 'divide',
	    value: function divide(divisor) {
	      return new Box2D(this.x / divisor, this.y / divisor, this.width / divisor, this.height / divisor);
	    }
	
	    /**
	     * return true if this box is identical to another box
	     * @param other
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'equals',
	    value: function equals(other) {
	      return other.x === this.x && other.y === this.y && other.width === this.width && other.height === this.height;
	    }
	
	    /**
	     * return a new box that is the union of this box and some other box/rect like object
	     * @param box - anything with x,y,w,h properties
	     * @returns Box2D - the union of this and box
	     */
	
	  }, {
	    key: 'union',
	    value: function union(box) {
	      var uni = new Box2D(Math.min(this.x, box.x), Math.min(this.y, box.y), 0, 0);
	
	      uni.right = Math.max(this.right, box.x + box.w);
	      uni.bottom = Math.max(this.bottom, box.y + box.h);
	
	      return uni;
	    }
	
	    /**
	     * get the nth edge
	     * 0: top left -> top right
	     * 1: top right -> bottom right
	     * 2: bottom right -> bottom left
	     * 3: bottom left -> top left
	     * @param {Number} nth
	     */
	
	  }, {
	    key: 'getEdge',
	    value: function getEdge(nth) {
	      (0, _invariant2.default)(nth >= 0 && nth < 4, 'Bad parameter');
	      switch (nth) {
	        case 0:
	          return new _line2d2.default(new _vector2d2.default(this.x, this.y), new _vector2d2.default(this.right, this.y));
	        case 1:
	          return new _line2d2.default(new _vector2d2.default(this.right, this.y), new _vector2d2.default(this.right, this.bottom));
	        case 2:
	          return new _line2d2.default(new _vector2d2.default(this.right, this.bottom), new _vector2d2.default(this.x, this.bottom));
	        default:
	          return new _line2d2.default(new _vector2d2.default(this.x, this.bottom), new _vector2d2.default(this.x, this.y));
	      }
	    }
	
	    /**
	     * return the union of the given boxes or an empty box if the list is empty
	     * @static
	     */
	
	  }, {
	    key: 'intersectWithBox',
	
	
	    /**
	     * return the intersection of this box with the other box
	     * @param box
	     */
	    value: function intersectWithBox(box) {
	      // minimum of right edges
	      var minx = Math.min(this.right, box.right);
	      // maximum of left edges
	      var maxx = Math.max(this.x, box.x);
	      // minimum of bottom edges
	      var miny = Math.min(this.bottom, box.bottom);
	      // maximum of top edges
	      var maxy = Math.max(this.y, box.y);
	      // if area is greater than zero there is an intersection
	      if (maxx < minx && maxy < miny) {
	        var x = Math.min(minx, maxx);
	        var y = Math.min(miny, maxy);
	        var w = Math.max(minx, maxx) - x;
	        var h = Math.max(miny, maxy) - y;
	        return new Box2D(x, y, w, h);
	      }
	      return null;
	    }
	
	    /**
	     * return true if we are completely inside the other box
	     * @param other
	     */
	
	  }, {
	    key: 'isInside',
	    value: function isInside(other) {
	      return this.x >= other.x && this.y >= other.y && this.right <= other.right && this.bottom <= other.bottom;
	    }
	
	    /**
	     * return true if the given point ( anything with x/y properties ) is inside the box
	     * @param point
	     */
	
	  }, {
	    key: 'pointInBox',
	    value: function pointInBox(point) {
	      return point.x >= this.x && point.y >= this.y && point.x < this.right && point.y < this.bottom;
	    }
	
	    /**
	     * return true if the box have zero or negative extents in either axis
	     */
	
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.w <= 0 || this.h <= 0;
	    }
	  }, {
	    key: 'left',
	
	
	    /**
	     * accessors for all corners, edges of the box
	     */
	    get: function get() {
	      return this.x;
	    },
	    set: function set(_x) {
	      this.x = _x;
	    }
	  }, {
	    key: 'width',
	    get: function get() {
	      return this.w;
	    },
	    set: function set(_w) {
	      this.w = _w;
	    }
	  }, {
	    key: 'height',
	    get: function get() {
	      return this.h;
	    },
	    set: function set(_h) {
	      this.h = _h;
	    }
	  }, {
	    key: 'top',
	    get: function get() {
	      return this.y;
	    },
	    set: function set(_y) {
	      this.y = _y;
	    }
	  }, {
	    key: 'right',
	    get: function get() {
	      return this.x + this.w;
	    },
	    set: function set(_r) {
	      this.w = _r - this.x;
	    }
	  }, {
	    key: 'bottom',
	    get: function get() {
	      return this.y + this.h;
	    },
	    set: function set(_b) {
	      this.h = _b - this.y;
	    }
	  }, {
	    key: 'cx',
	    get: function get() {
	      return this.x + this.w / 2;
	    },
	    set: function set(_cx) {
	      this.x = _cx - this.w / 2;
	    }
	  }, {
	    key: 'cy',
	    get: function get() {
	      return this.y + this.h / 2;
	    },
	    set: function set(_cy) {
	      this.y = _cy - this.h / 2;
	    }
	  }, {
	    key: 'center',
	    get: function get() {
	      return new _vector2d2.default(this.cx, this.cy);
	    },
	    set: function set(vector) {
	      this.cx = vector.x;
	      this.cy = vector.y;
	    }
	  }, {
	    key: 'topLeft',
	    get: function get() {
	      return new _vector2d2.default(this.x, this.y);
	    },
	    set: function set(vector) {
	      this.x = vector.x;
	      this.y = vector.y;
	    }
	  }, {
	    key: 'topRight',
	    get: function get() {
	      return new _vector2d2.default(this.right, this.y);
	    },
	    set: function set(vector) {
	      this.right = vector.x;
	      this.y = vector.y;
	    }
	  }, {
	    key: 'bottomRight',
	    get: function get() {
	      return new _vector2d2.default(this.right, this.bottom);
	    },
	    set: function set(vector) {
	      this.right = vector.x;
	      this.bottom = vector.y;
	    }
	  }, {
	    key: 'bottomLeft',
	    get: function get() {
	      return new _vector2d2.default(this.x, this.bottom);
	    },
	    set: function set(vector) {
	      this.x = vector.x;
	      this.bottom = vector.y;
	    }
	  }], [{
	    key: 'fromString',
	    value: function fromString(str) {
	      (0, _invariant2.default)(str, 'Bad parameter');
	      var values = str.split(',');
	      (0, _invariant2.default)(values && values.length === 4, 'Unexpected format');
	      return new Box2D(parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]));
	    }
	
	    /**
	     * return an AABB defined by the limits of this point
	     * and another point
	     * @param  {[Vector2D} ary
	     * @return {Box2D}
	     */
	
	  }, {
	    key: 'boxFromPoints',
	    value: function boxFromPoints(ary) {
	      var xmin = Number.MAX_VALUE;
	      var ymin = Number.MAX_VALUE;
	      var xmax = -Number.MAX_VALUE;
	      var ymax = -Number.MAX_VALUE;
	
	      for (var i = 0; i < ary.length; i += 1) {
	        xmin = Math.min(xmin, ary[i].x);
	        ymin = Math.min(ymin, ary[i].y);
	        xmax = Math.max(xmax, ary[i].x);
	        ymax = Math.max(ymax, ary[i].y);
	      }
	
	      return new Box2D(xmin, ymin, xmax - xmin, ymax - ymin);
	    }
	  }, {
	    key: 'union',
	    value: function union(boxes) {
	      var uni = new Box2D(0, 0, 0, 0);
	
	      if (boxes && boxes.length) {
	        uni.x = Math.min.apply(null, boxes.map(function (box) {
	          return box.x;
	        }));
	        uni.y = Math.min.apply(null, boxes.map(function (box) {
	          return box.y;
	        }));
	        uni.r = Math.min.apply(null, boxes.map(function (box) {
	          return box.r;
	        }));
	        uni.b = Math.min.apply(null, boxes.map(function (box) {
	          return box.b;
	        }));
	      }
	      return uni;
	    }
	  }]);
	
	  return Box2D;
	}();
	
	exports.default = Box2D;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _vector2d = __webpack_require__(9);
	
	var _vector2d2 = _interopRequireDefault(_vector2d);
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ViewerStatusBar = function () {
	
	  /**
	   * constructor only needs the viewer
	   * @param viewer
	   */
	  function ViewerStatusBar(viewer) {
	    _classCallCheck(this, ViewerStatusBar);
	
	    this.viewer = viewer;
	    this.outer = (0, _dom2.default)('<div class="viewer-status-bar">\n        <span>Search</span><input maxlength="128" data-ref="searchBox"/>\n        <span>Start</span><input maxlength="20" data-ref="startBox"/>\n        <span>End</span><input maxlength="20" data-ref="endBox"/>\n        <span data-ref="lengthSpan">Length:</span>\n        <span data-ref="positionSpan"></span>\n      </div>');
	    this.viewer.options.parent.appendChild(this.outer.el);
	    this.outer.importRefs(this);
	
	    this.startBox.el.addEventListener('input', this.updateSelection.bind(this));
	    this.endBox.el.addEventListener('input', this.updateSelection.bind(this));
	    this.searchBox.el.addEventListener('input', this.onSearchTermChanged.bind(this));
	  }
	
	  /**
	   * set the start/end value
	   * @param index
	   */
	
	
	  _createClass(ViewerStatusBar, [{
	    key: 'setStart',
	    value: function setStart(index) {
	      this.startBox.el.value = arguments.length ? index : '';
	    }
	  }, {
	    key: 'setEnd',
	    value: function setEnd(index) {
	      this.endBox.el.value = arguments.length ? index : '';
	    }
	
	    /**
	     * set the base pairs information
	     * @param n
	     */
	
	  }, {
	    key: 'setBasePairs',
	    value: function setBasePairs(n) {
	      this.basePairs = n || 0;
	      this.lengthSpan.el.innerText = 'Length: ' + this.basePairs + ' BP';
	    }
	
	    /**
	     * display the position box or hide
	     * @param index
	     */
	
	  }, {
	    key: 'setPosition',
	    value: function setPosition(index) {
	      this.positionSpan.el.innerText = arguments.length ? 'Position: ' + index : '';
	    }
	
	    /**
	     * called to reset search term box
	     */
	
	  }, {
	    key: 'resetSearch',
	    value: function resetSearch() {
	      this.searchBox.el.value = '';
	    }
	
	    /**
	     * update selection from text in inputs
	     */
	
	  }, {
	    key: 'updateSelection',
	    value: function updateSelection() {
	      var limits = this.getStartEndFromInputs();
	      if (limits) {
	        this.viewer.userInterface.setSelectionFromColumnRow(limits.start, limits.end);
	        this.viewer.firstRow = limits.start.y;
	        this.viewer.render();
	      }
	    }
	    /**
	     * if both start and end are currently valid then return
	     * the start and end as Vector2D
	     */
	
	  }, {
	    key: 'getStartEndFromInputs',
	    value: function getStartEndFromInputs() {
	      var start = Number.parseFloat(this.startBox.el.value);
	      var end = Number.parseFloat(this.endBox.el.value);
	      if (Number.isNaN(start) || Number.isNaN(end)) {
	        return null;
	      }
	      // clamp to available number of base pair
	      start = Math.max(0, Math.min(start, this.basePairs - 1));
	      end = Math.max(0, Math.min(end, this.basePairs - 1));
	      // range must be right side up
	      if (end <= start) {
	        return null;
	      }
	      return {
	        start: new _vector2d2.default(start % this.viewer.rowLength, Math.floor(start / this.viewer.rowLength)),
	        end: new _vector2d2.default(end % this.viewer.rowLength, Math.floor(end / this.viewer.rowLength))
	      };
	    }
	
	    /**
	     * return a hash of the bigrams for a given string.
	     * Each hash entry is key:biggram, value: number of occurrences
	     * @param str
	     */
	
	  }, {
	    key: 'bigrams',
	    value: function bigrams(str) {
	      (0, _invariant2.default)(str && str.length >= 2, 'string must be 2 chars at least');
	      var hash = {};
	      for (var i = 0; i < str.length - 1; i += 1) {
	        var bigram = str.substr(i, 2);
	        var record = hash[bigram];
	        if (record) {
	          record.count += 1;
	        } else {
	          hash[bigram] = { count: 1 };
	        }
	      }
	      // add number of pairs to hash and return
	      return hash;
	    }
	    /**
	     * Match two string using the sorensen-dice algorithm
	     * http://www.algomation.com/algorithm/sorensen-dice-string-similarity
	     * @param pattern
	     * @param matter
	     */
	
	  }, {
	    key: 'sorensenDice',
	    value: function sorensenDice(_str1, _str2) {
	      (0, _invariant2.default)(_str1 && _str2, 'both must be strings with at least 1 char');
	      // always compare with case
	      var str1 = _str1.toUpperCase();
	      var str2 = _str2.toUpperCase();
	
	      // if the pattern string is 1 char then just return 1 / length
	      // of match string if the char occurs in the target
	      if (str1.length === 1) {
	        return str2.indexOf(str1) >= 0 ? 1 / str2.length : 0;
	      }
	      // likewise if the pattern is only 1 char
	      if (str2.length === 1) {
	        return str1.indexOf(str2) >= 0 ? 1 / str1.length : 0;
	      }
	      // both strings have one or more bigrams so we can use the algorithm
	      var b1 = this.bigrams(str1);
	      var b2 = this.bigrams(str2);
	      // count the occurrences of the b1 pairs in b2
	      var bigrams = Object.keys(b1);
	      var matches = 0;
	      for (var i = 0; i < bigrams.length; i += 1) {
	        var bigram = bigrams[i];
	        var match = b2[bigram];
	        if (match) {
	          match.count = Math.max(0, match.count - 1);
	          matches += 1;
	        }
	      }
	      // return a normalize ( 0..1 ) value by returning the number
	      // matches to the total number of pairs in str2
	      return matches / Object.keys(b2).length;
	    }
	
	    /**
	     * search term was changed, start a new search of the blocks and annotations for the closest name
	     * match.
	     */
	
	  }, {
	    key: 'onSearchTermChanged',
	    value: function onSearchTermChanged() {
	      var _this = this;
	
	      var term = this.searchBox.el.value.trim();
	      if (term) {
	        (function () {
	          // find the highest scoring block or annotation
	          var best = null;
	          var bestScore = -Infinity;
	          var blockOrAnnotation = null;
	
	          // score blocks
	          _this.viewer.blockList.forEach(function (block) {
	            var score = _this.sorensenDice(block.getName(), term);
	            if (score > bestScore) {
	              bestScore = score;
	              best = block;
	              blockOrAnnotation = 'block';
	            }
	          });
	
	          // score annotations
	          _this.viewer.annotationList.forEach(function (annotation) {
	            var score = _this.sorensenDice(annotation.name, term);
	            if (score > bestScore) {
	              bestScore = score;
	              best = annotation;
	              blockOrAnnotation = 'annotation';
	            }
	          });
	
	          // select and show the highest scoring item
	          if (best && blockOrAnnotation === 'block') {
	            _this.viewer.selectBlock(best.id);
	            _this.viewer.showBlock(best.id);
	          }
	          if (best && blockOrAnnotation === 'annotation') {
	            _this.viewer.selectAnnotation(best.id);
	            _this.viewer.showAnnotation(best.id);
	          }
	          if (best) {
	            _this.viewer.render();
	          }
	        })();
	      }
	    }
	  }]);
	
	  return ViewerStatusBar;
	}();
	
	exports.default = ViewerStatusBar;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderSequenceRow;
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * render a sequence of chars with appearance as for primary sequence
	 */
	function renderSequenceRow(viewer, rowEl, record, y) {
	  var e = (0, _dom2.default)('<div class="sequence-text roboto fixed font-size"></div>');
	  e.setStyles({
	    left: record.startRowOffset * viewer.getCharWidth() + 'px',
	    width: record.length * viewer.getCharWidth() + 'px',
	    top: y + 'px',
	    height: viewer.getCharHeight() + 'px',
	    lineHeight: viewer.getCharHeight() + 'px'
	  });
	  e.el.innerText = viewer.getSequence(record.block, record.blockOffset, record.length);
	  rowEl.appendChild(e);
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderSeparatorSequenceRow;
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * render the row of ++++ chars between the primary and reverse sequence
	 */
	function renderSeparatorSequenceRow(viewer, rowEl, record, y) {
	  var e = (0, _dom2.default)('<div class="sequence-text-marker roboto fixed font-size"></div>');
	  e.setStyles({
	    left: record.startRowOffset * viewer.getCharWidth() + 'px',
	    width: record.length * viewer.getCharWidth() + 'px',
	    top: y + 'px',
	    height: viewer.getCharHeight() + 'px',
	    lineHeight: viewer.getCharHeight() + 'px'
	  });
	  e.el.innerText = "+".repeat(record.length);
	  rowEl.appendChild(e);
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderReverseSequenceRow;
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * render a sequence of chars with appearance as for primary sequence
	 */
	function renderReverseSequenceRow(viewer, rowEl, record, y) {
	  var e = (0, _dom2.default)('<div class="sequence-text-reverse roboto fixed font-size"></div>');
	  e.setStyles({
	    left: record.startRowOffset * viewer.getCharWidth() + 'px',
	    width: record.length * viewer.getCharWidth() + 'px',
	    top: y + 'px',
	    height: viewer.getCharHeight() + 'px',
	    lineHeight: viewer.getCharHeight() + 'px'
	  });
	  e.el.innerText = viewer.getSequence(record.block, record.blockOffset, record.length, true);
	  rowEl.appendChild(e);
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderBlockSequenceRow;
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * render a sequence of chars with appearance as for primary sequence
	 */
	function renderBlockSequenceRow(viewer, rowEl, record, y) {
	  var e = (0, _dom2.default)('<div class="sequence-name roboto fixed font-size"></div>');
	  e.setStyles({
	    left: record.startRowOffset * viewer.getCharWidth() + 'px',
	    width: record.length * viewer.getCharWidth() + 'px',
	    top: y + 'px',
	    height: viewer.getCharHeight() + 'px',
	    lineHeight: viewer.getCharHeight() + 'px',
	    backgroundColor: record.block.metadata.color || 'lightgray'
	  });
	  e.el.innerText = '•' + record.block.getName() + '•';
	  rowEl.appendChild(e);
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderSequenceRuler;
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * render a sequence of chars with appearance as for primary sequence
	 */
	function renderSequenceRuler(viewer, rowEl, y, start, length) {
	  // render the ruler container which is tall enough for the markers.
	  // Its top border is set
	  var e = (0, _dom2.default)('<div class="sequence-ruler roboto fixed font-size"></div>');
	  var H = viewer.getCharHeight() * 1.5;
	  e.setStyles({
	    left: '0px',
	    width: length * viewer.getCharWidth() + 'px',
	    top: y + 'px',
	    height: H + 'px',
	    lineHeight: H + 'px'
	  });
	  // begin at start position rounded down to nearest 10
	  var initial = Math.floor(start / 10) * 10;
	
	  for (var i = 0; i <= length; i += 10) {
	    // xp is the location of the tick mark
	    var xp = (initial - start + i) * viewer.getCharWidth() + viewer.getCharWidth() / 2;
	    // text value of marker
	    var value = (initial + i).toString();
	    // width of element including text
	    var width = value.length * viewer.getCharWidth();
	    // the tick + number must be complete visible or we don't render
	    if (xp - width / 2 >= 0 && xp + width / 2 <= viewer.rowLength * viewer.getCharWidth()) {
	      // create tick mark
	      var tick = (0, _dom2.default)('<div class="tick"></div>');
	      tick.setStyles({
	        left: xp + 'px',
	        height: viewer.getCharHeight() / 2 + 'px'
	      });
	      e.appendChild(tick);
	      // add numeric value
	      var number = (0, _dom2.default)('<div class="number">' + value + '</div>');
	      number.setStyles({
	        left: xp - width / 2 + 'px',
	        top: viewer.getCharHeight() / 2 + 'px',
	        width: width + 'px',
	        height: viewer.getCharHeight() + 'px',
	        lineHeight: viewer.getCharHeight() + 'px'
	      });
	      e.appendChild(number);
	    }
	  }
	  // add the entire ruler to the viewer
	  rowEl.appendChild(e);
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderAnnotation;
	
	var _dom = __webpack_require__(4);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * render an annotation block
	 */
	function renderAnnotation(viewer, rowEl, record, y) {
	  var e = (0, _dom2.default)('<div class="annotation roboto fixed font-size"></div>');
	  e.setStyles({
	    left: record.start * viewer.getCharWidth() + 'px',
	    width: (record.end - record.start + 1) * viewer.getCharWidth() + 'px',
	    top: y + record.depth * viewer.getCharHeight() + 'px',
	    height: viewer.getCharHeight() + 'px',
	    lineHeight: viewer.getCharHeight() + 'px',
	    backgroundColor: record.annotation.color
	  });
	  e.el.innerText = record.annotation.name;
	  rowEl.appendChild(e);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./viewer.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./viewer.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports
	
	
	// module
	exports.push([module.id, ".roboto {\n  font-family: 'Roboto Mono', monospace; }\n\n.fixed {\n  padding: 0;\n  letter-spacing: 0;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n  white-space: nowrap; }\n\n.font-size {\n  font-size: 12px; }\n\n.inline-block {\n  display: inline-block; }\n\n.viewer {\n  position: relative;\n  box-sizing: content-box;\n  width: calc(100% - 2rem);\n  margin: 0 1rem;\n  height: calc(100% - 2rem);\n  overflow: hidden; }\n  .viewer .rows {\n    position: relative;\n    width: 100%;\n    height: 100%; }\n  .viewer .row-element {\n    position: absolute;\n    display: inline-block; }\n  .viewer .userinterface {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: transparent; }\n  .viewer .userinterface .selection-box {\n    position: absolute;\n    box-sizing: border-box;\n    background-color: rgba(51, 153, 255, 0.1);\n    pointer-events: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  .viewer .userinterface .left-edge {\n    border-left: 2px solid dodgerblue; }\n  .viewer .userinterface .right-edge {\n    border-right: 2px solid dodgerblue; }\n  .viewer .sequence-text {\n    position: absolute;\n    display: inline-block;\n    text-align: left;\n    color: black;\n    white-space: pre; }\n  .viewer .sequence-text-reverse {\n    position: absolute;\n    display: inline-block;\n    text-align: left;\n    color: lightgray;\n    white-space: pre; }\n  .viewer .sequence-text-marker {\n    position: absolute;\n    display: inline-block;\n    text-align: left;\n    color: lightgray; }\n  .viewer .sequence-name {\n    position: absolute;\n    display: inline-block;\n    text-align: center;\n    color: black;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    box-sizing: border-box;\n    border-left: 1px solid white; }\n  .viewer .sequence-ruler {\n    position: absolute;\n    display: inline-block;\n    box-sizing: border-box;\n    border-top: 1px solid lightgray; }\n  .viewer .sequence-ruler .tick {\n    position: absolute;\n    display: inline-block;\n    box-sizing: border-box;\n    top: 0;\n    width: 1px;\n    border-left: 1px solid lightgray; }\n  .viewer .sequence-ruler .number {\n    position: absolute;\n    display: inline-block;\n    color: lightgray;\n    text-align: center; }\n  .viewer .annotation {\n    position: absolute;\n    display: inline-block;\n    text-align: center;\n    color: dimgray;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    box-sizing: border-box;\n    border-top: 1px solid white;\n    border-left: 1px solid white; }\n  .viewer .cursor {\n    position: absolute;\n    display: inline-block;\n    background-color: transparent;\n    border: 1px solid orange;\n    box-sizing: border-box; }\n\n.viewer-status-bar {\n  position: relative;\n  box-sizing: content-box;\n  width: 100%;\n  height: 2rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  background-color: lightgray; }\n\n.viewer-status-bar span {\n  color: gray;\n  margin-left: 1rem;\n  overflow: hidden;\n  white-space: nowrap; }\n\n.viewer-status-bar input {\n  margin: 0;\n  padding: 0;\n  border: none;\n  margin-left: 1rem;\n  width: 6rem; }\n\n.sv-mouseLayer {\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: transparent;\n  cursor: pointer; }\n", ""]);
	
	// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(2);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _nodeUuid = __webpack_require__(27);
	
	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * internally the sequence viewer uses a wrapper class for annotations to overcome certain limitations e.g.
	 * they have no id, start/end are relative to the block etc. The viewer annotations are not constrained to blocks.
	 * Native object looks something like this:
	
	 {
	  "tags": {},
	  "name": "transposase",
	  "description": "",
	  "color": "#8EC78D",
	  "role": "cds",
	  "sequence": "",
	  "start": 0,
	  "end": 275,
	  "isForward": false,
	  "notes": {
	    "genbank": {
	      "locus_tag": "VT52_RS35370",
	      "inference": "EXISTENCE: similar to AA sequence:RefSeq:WP_019889618.1",
	      "old_locus_tag": "VT52_35365",
	      "codon_start": "1",
	      "pseudo": "",
	      "product": "transposase",
	      "transl_table": "11",
	      "note": "incomplete; too short partial abutting assembly gap; missing stop; Derived by automated computational analysis using gene prediction method: Protein Homology.",
	      "type": "CDS"
	    }
	  }
	}"
	
	 */
	var Annotation = function () {
	  function Annotation(annotation, block) {
	    _classCallCheck(this, Annotation);
	
	    this.id = _nodeUuid2.default.v4();
	    this.name = annotation.name;
	    this.color = annotation.color || 'lightgray';
	    // save reference to block from whence we came
	    this.block = block;
	    // save reference to our native annotation
	    this.nativeAnnotation = annotation;
	  }
	
	  /**
	   * our block start/end/length is only calculated once we are added to the viewer
	   * and the global position of our parent block is known ( since the native annotation
	   * start and end are relative to that block )
	   * @param viewer
	   */
	
	
	  _createClass(Annotation, [{
	    key: 'setStartEnd',
	    value: function setStartEnd(viewer) {
	      // we assume blocks have already been mapped to columns and rows and that the information
	      // is available on the viewer object
	      var blockInfo = viewer.blockRowMap[this.block.id];
	      // some annotations are applied to the construct. The construct block is not
	      // part of the list of blocks the viewer is displaying. For those we assume
	      // the start and end are relative to the entire sequence
	      var startIndex = 0;
	      if (blockInfo) {
	        startIndex = blockInfo.startRow * viewer.rowLength + blockInfo.startRowOffset;
	      } else {
	        (0, _invariant2.default)(viewer.appState.blocks[this.block.id], 'expected block to be the app state at least');
	      }
	      // now we set the global start / end of this annotation
	      this.start = this.nativeAnnotation.start + startIndex;
	      this.length = this.nativeAnnotation.end - this.nativeAnnotation.start;
	      this.end = this.start + this.length - 1;
	    }
	  }]);
	
	  return Annotation;
	}();
	
	exports.default = Annotation;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(Buffer) {//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php
	
	/*global window, require, define */
	(function(_window) {
	  'use strict';
	
	  // Unique ID creation requires a high quality random # generator.  We feature
	  // detect to determine the best RNG source, normalizing to a function that
	  // returns 128-bits of randomness, since that's what's usually required
	  var _rng, _mathRNG, _nodeRNG, _whatwgRNG, _previousRoot;
	
	  function setupBrowser() {
	    // Allow for MSIE11 msCrypto
	    var _crypto = _window.crypto || _window.msCrypto;
	
	    if (!_rng && _crypto && _crypto.getRandomValues) {
	      // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	      //
	      // Moderately fast, high quality
	      try {
	        var _rnds8 = new Uint8Array(16);
	        _whatwgRNG = _rng = function whatwgRNG() {
	          _crypto.getRandomValues(_rnds8);
	          return _rnds8;
	        };
	        _rng();
	      } catch(e) {}
	    }
	
	    if (!_rng) {
	      // Math.random()-based (RNG)
	      //
	      // If all else fails, use Math.random().  It's fast, but is of unspecified
	      // quality.
	      var  _rnds = new Array(16);
	      _mathRNG = _rng = function() {
	        for (var i = 0, r; i < 16; i++) {
	          if ((i & 0x03) === 0) { r = Math.random() * 0x100000000; }
	          _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	        }
	
	        return _rnds;
	      };
	      if ('undefined' !== typeof console && console.warn) {
	        console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
	      }
	    }
	  }
	
	  function setupNode() {
	    // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
	    //
	    // Moderately fast, high quality
	    if (true) {
	      try {
	        var _rb = __webpack_require__(32).randomBytes;
	        _nodeRNG = _rng = _rb && function() {return _rb(16);};
	        _rng();
	      } catch(e) {}
	    }
	  }
	
	  if (_window) {
	    setupBrowser();
	  } else {
	    setupNode();
	  }
	
	  // Buffer class to use
	  var BufferClass = ('function' === typeof Buffer) ? Buffer : Array;
	
	  // Maps for number <-> hex string conversion
	  var _byteToHex = [];
	  var _hexToByte = {};
	  for (var i = 0; i < 256; i++) {
	    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	    _hexToByte[_byteToHex[i]] = i;
	  }
	
	  // **`parse()` - Parse a UUID into it's component bytes**
	  function parse(s, buf, offset) {
	    var i = (buf && offset) || 0, ii = 0;
	
	    buf = buf || [];
	    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	      if (ii < 16) { // Don't overflow!
	        buf[i + ii++] = _hexToByte[oct];
	      }
	    });
	
	    // Zero out remaining bytes if string was short
	    while (ii < 16) {
	      buf[i + ii++] = 0;
	    }
	
	    return buf;
	  }
	
	  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	  function unparse(buf, offset) {
	    var i = offset || 0, bth = _byteToHex;
	    return  bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]];
	  }
	
	  // **`v1()` - Generate time-based UUID**
	  //
	  // Inspired by https://github.com/LiosK/UUID.js
	  // and http://docs.python.org/library/uuid.html
	
	  // random #'s we need to init node and clockseq
	  var _seedBytes = _rng();
	
	  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	  var _nodeId = [
	    _seedBytes[0] | 0x01,
	    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	  ];
	
	  // Per 4.2.2, randomize (14 bit) clockseq
	  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
	
	  // Previous uuid creation time
	  var _lastMSecs = 0, _lastNSecs = 0;
	
	  // See https://github.com/broofa/node-uuid for API details
	  function v1(options, buf, offset) {
	    var i = buf && offset || 0;
	    var b = buf || [];
	
	    options = options || {};
	
	    var clockseq = (options.clockseq != null) ? options.clockseq : _clockseq;
	
	    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	    var msecs = (options.msecs != null) ? options.msecs : new Date().getTime();
	
	    // Per 4.2.1.2, use count of uuid's generated during the current clock
	    // cycle to simulate higher resolution clock
	    var nsecs = (options.nsecs != null) ? options.nsecs : _lastNSecs + 1;
	
	    // Time since last uuid creation (in msecs)
	    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
	
	    // Per 4.2.1.2, Bump clockseq on clock regression
	    if (dt < 0 && options.clockseq == null) {
	      clockseq = clockseq + 1 & 0x3fff;
	    }
	
	    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	    // time interval
	    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
	      nsecs = 0;
	    }
	
	    // Per 4.2.1.2 Throw error if too many uuids are requested
	    if (nsecs >= 10000) {
	      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	    }
	
	    _lastMSecs = msecs;
	    _lastNSecs = nsecs;
	    _clockseq = clockseq;
	
	    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	    msecs += 12219292800000;
	
	    // `time_low`
	    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	    b[i++] = tl >>> 24 & 0xff;
	    b[i++] = tl >>> 16 & 0xff;
	    b[i++] = tl >>> 8 & 0xff;
	    b[i++] = tl & 0xff;
	
	    // `time_mid`
	    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	    b[i++] = tmh >>> 8 & 0xff;
	    b[i++] = tmh & 0xff;
	
	    // `time_high_and_version`
	    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	    b[i++] = tmh >>> 16 & 0xff;
	
	    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	    b[i++] = clockseq >>> 8 | 0x80;
	
	    // `clock_seq_low`
	    b[i++] = clockseq & 0xff;
	
	    // `node`
	    var node = options.node || _nodeId;
	    for (var n = 0; n < 6; n++) {
	      b[i + n] = node[n];
	    }
	
	    return buf ? buf : unparse(b);
	  }
	
	  // **`v4()` - Generate random UUID**
	
	  // See https://github.com/broofa/node-uuid for API details
	  function v4(options, buf, offset) {
	    // Deprecated - 'format' argument, as supported in v1.2
	    var i = buf && offset || 0;
	
	    if (typeof(options) === 'string') {
	      buf = (options === 'binary') ? new BufferClass(16) : null;
	      options = null;
	    }
	    options = options || {};
	
	    var rnds = options.random || (options.rng || _rng)();
	
	    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	    rnds[6] = (rnds[6] & 0x0f) | 0x40;
	    rnds[8] = (rnds[8] & 0x3f) | 0x80;
	
	    // Copy bytes to buffer, if provided
	    if (buf) {
	      for (var ii = 0; ii < 16; ii++) {
	        buf[i + ii] = rnds[ii];
	      }
	    }
	
	    return buf || unparse(rnds);
	  }
	
	  // Export public API
	  var uuid = v4;
	  uuid.v1 = v1;
	  uuid.v4 = v4;
	  uuid.parse = parse;
	  uuid.unparse = unparse;
	  uuid.BufferClass = BufferClass;
	  uuid._rng = _rng;
	  uuid._mathRNG = _mathRNG;
	  uuid._nodeRNG = _nodeRNG;
	  uuid._whatwgRNG = _whatwgRNG;
	
	  if (('undefined' !== typeof module) && module.exports) {
	    // Publish as node.js module
	    module.exports = uuid;
	  } else if (true) {
	    // Publish as AMD module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {return uuid;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	
	  } else {
	    // Publish as global (in browsers)
	    _previousRoot = _window.uuid;
	
	    // **`noConflict()` - (browser only) to reset global 'uuid' var**
	    uuid.noConflict = function() {
	      _window.uuid = _previousRoot;
	      return uuid;
	    };
	
	    _window.uuid = uuid;
	  }
	})('undefined' !== typeof window ? window : null);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(29)
	var ieee754 = __webpack_require__(30)
	var isArray = __webpack_require__(31)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 30 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(33)
	
	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}
	
	exports.createHash = __webpack_require__(35)
	
	exports.createHmac = __webpack_require__(47)
	
	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}
	
	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}
	
	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}
	
	var p = __webpack_require__(48)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync
	
	
	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createCipher'
	, 'createCipheriv'
	, 'createDecipher'
	, 'createDecipheriv'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(34)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(28).Buffer))

/***/ },
/* 34 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(36)
	
	var md5 = toConstructor(__webpack_require__(44))
	var rmd160 = toConstructor(__webpack_require__(46))
	
	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}
	
	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}
	
	var Buffer = __webpack_require__(28).Buffer
	var Hash   = __webpack_require__(37)(Buffer)
	
	exports.sha1 = __webpack_require__(38)(Buffer, Hash)
	exports.sha256 = __webpack_require__(42)(Buffer, Hash)
	exports.sha512 = __webpack_require__(43)(Buffer, Hash)


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {
	
	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }
	
	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }
	
	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }
	
	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block
	
	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)
	
	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }
	
	      s += ch
	      f += ch
	
	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s
	
	    return this
	  }
	
	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8
	
	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80
	
	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)
	
	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }
	
	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)
	
	    var hash = this._update(this._block) || this._hash()
	
	    return enc ? hash.toString(enc) : hash
	  }
	
	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }
	
	  return Hash
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */
	
	var inherits = __webpack_require__(39).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0
	
	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)
	
	  var POOL = []
	
	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()
	
	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)
	
	    this._h = null
	    this.init()
	  }
	
	  inherits(Sha1, Hash)
	
	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0
	
	    Hash.prototype.init.call(this)
	    return this
	  }
	
	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {
	
	    var a, b, c, d, e, _a, _b, _c, _d, _e
	
	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e
	
	    var w = this._w
	
	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)
	
	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )
	
	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }
	
	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }
	
	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }
	
	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }
	
	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }
	
	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }
	
	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }
	
	  return Sha1
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(40);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(41);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 41 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */
	
	var inherits = __webpack_require__(39).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]
	
	  var W = new Array(64)
	
	  function Sha256() {
	    this.init()
	
	    this._w = W //new Array(64)
	
	    Hash.call(this, 16*4, 14*4)
	  }
	
	  inherits(Sha256, Hash)
	
	  Sha256.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }
	
	  function R (X, n) {
	    return (X >>> n);
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }
	
	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }
	
	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }
	
	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }
	
	  Sha256.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]
	
	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w
	
	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }
	
	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0
	
	  };
	
	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)
	
	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)
	
	    return H
	  }
	
	  return Sha256
	
	}


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(39).inherits
	
	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]
	
	  var W = new Array(160)
	
	  function Sha512() {
	    this.init()
	    this._w = W
	
	    Hash.call(this, 128, 112)
	  }
	
	  inherits(Sha512, Hash)
	
	  Sha512.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  Sha512.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0
	
	    for (var i = 0; i < 80; i++) {
	      var j = i * 2
	
	      var Wi, Wil
	
	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)
	
	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)
	
	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)
	
	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]
	
	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]
	
	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)
	
	        W[j] = Wi
	        W[j + 1] = Wil
	      }
	
	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)
	
	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)
	
	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]
	
	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)
	
	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)
	
	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)
	
	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }
	
	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0
	
	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }
	
	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)
	
	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }
	
	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)
	
	    return H
	  }
	
	  return Sha512
	
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */
	
	var helpers = __webpack_require__(45);
	
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;
	
	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;
	
	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;
	
	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
	
	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
	
	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
	
	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
	
	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	
	}
	
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}
	
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}
	
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}
	
	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;
	
	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }
	
	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}
	
	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}
	
	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}
	
	module.exports = { hash: hash };
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160
	
	
	
	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];
	
	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];
	
	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};
	
	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};
	
	var processBlock = function (H, M, offset) {
	
	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];
	
	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }
	
	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;
	
	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;
	
	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};
	
	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}
	
	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}
	
	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}
	
	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}
	
	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}
	
	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}
	
	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
	
	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');
	
	  var m = bytesToWords(message);
	
	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;
	
	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );
	
	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }
	
	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];
	
	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }
	
	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(35)
	
	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)
	
	module.exports = Hmac
	
	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg
	
	  var blocksize = (alg === 'sha512') ? 128 : 64
	
	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key
	
	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }
	
	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)
	
	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }
	
	  this._hash = createHash(alg).update(ipad)
	}
	
	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}
	
	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(49)
	
	module.exports = function (crypto, exports) {
	  exports = exports || {}
	
	  var exported = pbkdf2Export(crypto)
	
	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync
	
	  return exports
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }
	
	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')
	
	    setTimeout(function() {
	      var result
	
	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }
	
	      callback(undefined, result)
	    })
	  }
	
	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')
	
	    if (iterations < 0)
	      throw new TypeError('Bad iterations')
	
	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')
	
	    if (keylen < 0)
	      throw new TypeError('Bad key length')
	
	    digest = digest || 'sha1'
	
	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)
	
	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)
	
	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)
	
	      var U = crypto.createHmac(digest, password).update(block1).digest()
	
	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen
	
	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }
	
	      U.copy(T, 0, 0, hLen)
	
	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()
	
	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }
	
	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }
	
	    return DK
	  }
	
	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28).Buffer))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzdlM2YyNzg5YWVlODE1Y2RkNzciLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvdmlld2VyLmpzIiwid2VicGFjazovLy8uL34vaW52YXJpYW50L2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvZG9tL2VsZW1lbnRjYWNoZS5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvY2hhcm1lYXN1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvdmlld2VyL3VzZXJpbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvaW5wdXQvbW91c2V0cmFwLmpzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL2dlb21ldHJ5L3ZlY3RvcjJkLmpzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL2dlb21ldHJ5L3V0aWxzLmpzIiwid2VicGFjazovLy8uL34vdW5kZXJzY29yZS91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHRzL2dlb21ldHJ5L2xpbmUyZC5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9nZW9tZXRyeS9pbnRlcnNlY3Rpb24yZC5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy9nZW9tZXRyeS9ib3gyZC5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvc3RhdHVzLWJhci5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvcm93LXR5cGVzL3NlcXVlbmNlLXJvdy5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvcm93LXR5cGVzL3NlcGFyYXRvci1zZXF1ZW5jZS1yb3cuanMiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdHMvdmlld2VyL3Jvdy10eXBlcy9yZXZlcnNlLXNlcXVlbmNlLXJvdy5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvcm93LXR5cGVzL2Jsb2NrLXNlcXVlbmNlLXJvdy5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvcm93LXR5cGVzL3J1bGVyLXJvdy5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvcm93LXR5cGVzL2Fubm90YXRpb24tcm93LmpzIiwid2VicGFjazovLy8uL3N0eWxlcy92aWV3ZXIuc2Nzcz82NWM0Iiwid2VicGFjazovLy8uL3N0eWxlcy92aWV3ZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0cy92aWV3ZXIvYW5ub3RhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L25vZGUtdXVpZC91dWlkLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9idWZmZXIvfi9iYXNlNjQtanMvbGliL2I2NC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9idWZmZXIvfi9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2J1ZmZlci9+L2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L2NyZWF0ZS1oYXNoLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L34vc2hhLmpzL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L34vc2hhLmpzL2hhc2guanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvfi9zaGEuanMvc2hhMS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi91dGlsL34vaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9+L3NoYS5qcy9zaGEyNTYuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvfi9zaGEuanMvc2hhNTEyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L21kNS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L34vcmlwZW1kMTYwL2xpYi9yaXBlbWQxNjAuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvY3JlYXRlLWhtYWMuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvcGJrZGYyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L34vcGJrZGYyLWNvbXBhdC9wYmtkZjIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7OztLQUlNLGU7Ozs7O1FBUUosTSxHQUFTLFVBQUMsU0FBRCxFQUFZLE9BQVosRUFBd0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsOEJBQVUsQ0FBQyxNQUFLLE1BQU4sSUFBZ0IsQ0FBQyxNQUFLLFdBQWhDLEVBQTZDLGtFQUE3QztBQUNBLFdBQUssTUFBTCxHQUFjLHFCQUFtQjtBQUMvQixlQUFRO0FBRHVCLE1BQW5CLENBQWQ7O0FBSUE7QUFDQSxXQUFLLFlBQUwsQ0FBa0IsT0FBTyxXQUFQLENBQW1CLEtBQW5CLENBQXlCLFFBQXpCLEVBQWxCOztBQUVBO0FBQ0EsV0FBSyxXQUFMLEdBQW1CLE9BQU8sV0FBUCxDQUFtQixLQUFuQixDQUF5QixT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QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsZ0JBQWdCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGdCQUFnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsWUFBWTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsWUFBWTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsZ0JBQWdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscURBQW9EO0FBQ3BELElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDO0FBQzFDLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZEQUE0RCxZQUFZO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUE4QyxZQUFZO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBOEMsWUFBWTtBQUMxRDtBQUNBO0FBQ0Esc0JBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBdUIsZ0JBQWdCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsWUFBWTtBQUN6RDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSw4QkFBOEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQywwQkFBMEI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0JBQXFCLGNBQWM7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU8sZUFBZTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQSwwQkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLFlBQVk7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLFlBQVk7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLDZDQUE0QyxtQkFBbUI7QUFDL0Q7QUFDQTtBQUNBLDBDQUF5QyxZQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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Ozs7QUFHcEMsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7QUMvUUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFnQixvQ0FBb0M7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW1CLDZCQUE2QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLG9CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsZ0JBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLG9CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx3Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWlCLFlBQVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM2dEQTs7QUFFQSxFQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFpRCxZQUFZO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDLDZCQUFxRDs7Ozs7OztBQzNIdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsU0FBUSxVQUFVOztBQUVsQjtBQUNBOzs7Ozs7O0FDbkZBLGtCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUssY0FBYztBQUNuQixJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7QUNwREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQztBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7QUN6QkQsZ0I7Ozs7OztBQ0FBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUIsUUFBUTtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFrQixRQUFRO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILHdCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0Esb0NBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLDBEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsU0FBUztBQUNwQjtBQUNBLFlBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDemtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLFFBQVE7QUFDM0I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsYUFBWSxPQUFPLE9BQU8sWUFBWSxPQUFPLE9BQU8sT0FBTztBQUMzRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7O0FDbEpBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLFFBQVE7QUFDM0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7OztBQ25QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWdCLGNBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxSkE7QUFDQSxzQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQWtCOzs7Ozs7Ozs7QUNoQ2xCOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGtkQUFpZCwrQkFBK0I7QUFDaGY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUssT0FBTztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUssT0FBTztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBZ0IsWUFBWTtBQUM1QjtBQUNBOztBQUVBO0FBQ0Esa0JBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMxTUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBZ0IsZUFBZTtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDekNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLFFBQVE7QUFDM0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsc0JBQXFCLGdCQUFnQjtBQUNyQzs7QUFFQSx3QkFBdUIsVUFBVTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4uL2dlbm9tZS1kZXNpZ25lci9leHRlbnNpb25zL3NlcXVlbmNlLXZpZXdlci9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzdlM2YyNzg5YWVlODE1Y2RkNzdcbiAqKi8iLCJpbXBvcnQgU2VxdWVuY2VWaWV3ZXIgZnJvbSAnLi92aWV3ZXIvdmlld2VyJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBBbm5vdGF0aW9uIGZyb20gJy4vdmlld2VyL2Fubm90YXRpb24nO1xuXG4vKipcbiAqIHRoaXMgaXMgdGhlIG1haW4gbWV0aG9kIG9mIHRoZSB2aWV3ZXIgZXh0ZW5zaW9uLiBJdCBleHBvc2VzIGEgZnVuY3Rpb24gKCByZW5kZXIgKVxuICogdGhhdCB0aGUgYXBwbGljYXRpb24gY2FsbHMgd2hlbiB0aGVyZSBhcmUgYmxvY2tzL3NlcXVlbmNlIHRvIGRpc3BsYXkuXG4gKi9cbmNsYXNzIFZpZXdlckV4dGVuc2lvbiB7XG5cbiAgLyoqXG4gICAqIHRoZSByZW5kZXIgbWV0aG9kIGlzIGNhbGxlZCBvbmx5IG9uY2UsIHdoZW4gdGhlIGV4dGVuc2lvbiBpcyBsb2FkZWQuXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gY29udGFpbmVyIFtkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSBvcHRpb25zICAgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICByZW5kZXIgPSAoY29udGFpbmVyLCBvcHRpb25zKSA9PiB7XG4gICAgLy8gY3JlYXRlIHZpZXdlciBhbmQgcGFyZW50IHRvIHRoZSBnaXZlbiBjb250YWluZXIuIFRoZXJlIGlzIG9ubHkgb25jZSBpbnN0YW5jZSBvZlxuICAgIC8vIHRoZSB2aWV3ZXIgZXh0ZW5zaW9uLCBidXQgdGhlIHZpZXdlciBjYW4gYmUgb3BlbmVkIGFuZCBjbG9zZWQuIFdoZW4gY2xvc2VkIHRoZSB2aWV3ZXJcbiAgICAvLyBpbnN0YW5jZSB3ZSBjb250YWluIGlzIGRpc3Bvc2VkLlxuICAgIGludmFyaWFudCghdGhpcy52aWV3ZXIgJiYgIXRoaXMudW5zdWJzY3JpYmUsICd2aWV3ZXIvdW5zdWJzY3JpYmUgbWV0aG9kIHNob3VsZCBub3QgZXhpc3Qgd2hlbiByZW5kZXIgaXMgY2FsbGVkJyk7XG4gICAgdGhpcy52aWV3ZXIgPSBuZXcgU2VxdWVuY2VWaWV3ZXIoe1xuICAgICAgcGFyZW50OiBjb250YWluZXIsXG4gICAgfSk7XG5cbiAgICAvLyBpbml0aWFsaXplIHdpdGggY3VycmVudCBzdGF0ZSBvZiBhcHBcbiAgICB0aGlzLnVwZGF0ZVZpZXdlcih3aW5kb3cuY29uc3RydWN0b3Iuc3RvcmUuZ2V0U3RhdGUoKSk7XG5cbiAgICAvLyB1cGRhdGUgdmlld2VyIG9uIHZhcmlvdXMgZXZlbnQgd2hpbGUgc2F2aW5nIHRoZSB1bnN1YnNjcmliZSBldmVudFxuICAgIHRoaXMudW5zdWJzY3JpYmUgPSB3aW5kb3cuY29uc3RydWN0b3Iuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgbGFzdEFjdGlvbikgPT4ge1xuICAgICAgaWYgKFtcbiAgICAgICAgICAnRk9DVVNfQkxPQ0tTJyxcbiAgICAgICAgICAnQkxPQ0tfU0VUX0NPTE9SJyxcbiAgICAgICAgICAnQkxPQ0tfUkVOQU1FJyxcbiAgICAgICAgICAnRk9DVVNfQkxPQ0tfT1BUSU9OJyxcbiAgICAgICAgICAnRk9DVVNfRk9SQ0VfQkxPQ0tTJyxcbiAgICAgICAgICAnQkxPQ0tfU0VUX1NFUVVFTkNFJ10uaW5jbHVkZXMobGFzdEFjdGlvbi50eXBlKSkge1xuXG4gICAgICAgIHRoaXMudXBkYXRlVmlld2VyKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyB3ZSByZXR1cm4gdGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gdGhlIGFwcCB3YW50cyB0byBjbG9zZSB0aGUgZXh0ZW5zaW9uXG4gICAgcmV0dXJuIHRoaXMuZGlzcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBleHRlbnNpb24gaXMgYmVpbmcgY2xvc2VkLiBDbGVhbnVwXG4gICAqL1xuICBkaXNwb3NlID0gKCkgPT4ge1xuICAgIGludmFyaWFudCh0aGlzLnVuc3Vic2NyaWJlICYmIHRoaXMudmlld2VyLCAnZGlzcG9zZSBzaG91bGQgYmUgY2FsbGVkIG9ubHkgb25jZSwgYWZ0ZXIgcmVuZGVyIGhhcyBiZWVuIGNhbGxlZCcpO1xuICAgIC8vIHVuc3Vic2NyaWJlIGZyb20gdGhlIHN0b3JlXG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIC8vIGRpc3Bvc2UgdGhlIHZpZXdlclxuICAgIHRoaXMudmlld2VyLmRpc3Bvc2UoKTtcbiAgICAvLyByZW1vdmUgcmVmZXJlbmNlcywgdGhlc2Ugd2lsbCBiZSByZWNyZWF0ZWQgbmV4dCB0aW1lIHRoZXkgYXJlIG5lZWRlZCAoIHdoZW4gdGhlIGFwcCBjYWxscyByZW5kZXIgKVxuICAgIHRoaXMudW5zdWJzY3JpYmUgPSB0aGlzLnZpZXdlciA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHdpdGggdGhlIGxhdGVzdCBibG9ja3MvYW5ub3RhdGlvbnMgYXMgZGVmaW5lZCBpbiB0aGUgc3RhdGUgb2JqZWN0XG4gICAqIEBwYXJhbSAge1t0eXBlXX0gc3RhdGUgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHVwZGF0ZVZpZXdlciA9IChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHtibG9ja3MsIGFubm90YXRpb25zfSA9IHRoaXMuZ2V0RGlzcGxheUJsb2Nrc0FuZEFubm90YXRpb25zKCk7XG4gICAgdGhpcy52aWV3ZXIubmV3RGF0YVNldChibG9ja3MsIGFubm90YXRpb25zLCBzdGF0ZSk7XG4gICAgdGhpcy52aWV3ZXIucmVuZGVyKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIHJldHVybiBhbGwgdGhlIGJsb2NrcyBhbmQgYW5ub3RhdGlvbnMgdGhhdCB3ZSBjdXJyZW50bHkgbmVlZCB0byBkaXNwbGF5XG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgZ2V0RGlzcGxheUJsb2Nrc0FuZEFubm90YXRpb25zID0gKCkgPT4ge1xuXG4gICAgbGV0IGJsb2NrcyA9IFtdO1xuICAgIGxldCBhbm5vdGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IHRvcFNlbGVjdGVkQmxvY2tzID0gd2luZG93LmNvbnN0cnVjdG9yLmFwaS5mb2N1cy5mb2N1c0dldEJsb2NrUmFuZ2UoKTtcblxuICAgIGlmICh0b3BTZWxlY3RlZEJsb2Nrcykge1xuICAgICAgdG9wU2VsZWN0ZWRCbG9ja3MuZm9yRWFjaChibG9jayA9PiB7XG5cbiAgICAgICAgLy8gbWFwIHRoZSBhbm5vdGF0aW9ucyB0byBhIGxpdHRsZSB3cmFwcGVyIG9iamVjdFxuICAgICAgICBibG9jay5zZXF1ZW5jZS5hbm5vdGF0aW9ucy5mb3JFYWNoKG5hdGl2ZUFubm90YXRpb24gPT4ge1xuICAgICAgICAgIGFubm90YXRpb25zLnB1c2gobmV3IEFubm90YXRpb24obmF0aXZlQW5ub3RhdGlvbiwgYmxvY2spKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmxvY2tzLnB1c2goLi4ud2luZG93LmNvbnN0cnVjdG9yLmFwaS5ibG9ja3MuYmxvY2tGbGF0dGVuQ29uc3RydWN0QW5kTGlzdHMoYmxvY2suaWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge2Jsb2NrcywgYW5ub3RhdGlvbnN9O1xuICB9XG59XG5cbi8vIGJpbmQgdGhpcyBleHRlbnNpb24sIGJ5IG5hbWUsIHRvIGl0cyByZW5kZXIgZnVuY3Rpb25cbndpbmRvdy5jb25zdHJ1Y3Rvci5leHRlbnNpb25zLnJlZ2lzdGVyKCdzZXF1ZW5jZS12aWV3ZXInLCBuZXcgVmlld2VyRXh0ZW5zaW9uKCkucmVuZGVyKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvbWFpbi5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBEIGZyb20gJy4uL2RvbS9kb20nO1xuaW1wb3J0IEVsZW1lbnRDYWNoZSBmcm9tICcuLi9kb20vZWxlbWVudGNhY2hlJztcbmltcG9ydCB7Y2hhck1lYXN1cmV9IGZyb20gJy4vY2hhcm1lYXN1cmUnO1xuaW1wb3J0IFVzZXJJbnRlcmZhY2UgZnJvbSAnLi91c2VyaW50ZXJmYWNlJztcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuLi9nZW9tZXRyeS92ZWN0b3IyZCc7XG5pbXBvcnQgQm94MkQgZnJvbSAnLi4vZ2VvbWV0cnkvYm94MmQnO1xuaW1wb3J0IHJlbmRlclNlcXVlbmNlUm93IGZyb20gJy4vcm93LXR5cGVzL3NlcXVlbmNlLXJvdyc7XG5pbXBvcnQgcmVuZGVyU2VwYXJhdG9yU2VxdWVuY2VSb3cgZnJvbSAnLi9yb3ctdHlwZXMvc2VwYXJhdG9yLXNlcXVlbmNlLXJvdyc7XG5pbXBvcnQgcmVuZGVyUmV2ZXJzZVNlcXVlbmNlUm93IGZyb20gJy4vcm93LXR5cGVzL3JldmVyc2Utc2VxdWVuY2Utcm93JztcbmltcG9ydCByZW5kZXJCbG9ja1NlcXVlbmNlUm93IGZyb20gJy4vcm93LXR5cGVzL2Jsb2NrLXNlcXVlbmNlLXJvdyc7XG5pbXBvcnQgcmVuZGVyU2VxdWVuY2VSdWxlciBmcm9tICcuL3Jvdy10eXBlcy9ydWxlci1yb3cnO1xuaW1wb3J0IHJlbmRlckFubm90YXRpb24gZnJvbSAnLi9yb3ctdHlwZXMvYW5ub3RhdGlvbi1yb3cnO1xuXG5pbXBvcnQgJy4uLy4uL3N0eWxlcy92aWV3ZXIuc2Nzcyc7XG5cbi8qKlxuICogdXNlZCB0byB0cmFjayByZW5kZXIgY3ljbGVzLiBJdCBpcyBpbmNyZW1lbnRlZCBlYWNoIHRpbWUgcmVuZGVyIGlzIGNhbGxlZC4gUm93cyB3aGljaFxuICogYXJlIG5vdCB0b3VjaGVkIGJ5IHRoZSBjdXJyZW50IHJlbmRlciBjeWNsZSBhcmUgcmVtb3ZlZCBmcm9tIHRoZSBET01cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmxldCByZW5kZXJDeWNsZSA9IDA7XG5cbi8qKlxuICogY2hhcmFjdGVyIG1hcCBmb3IgZ2VuZXJhdGluZyB0aGUgcmV2ZXJzZSBzdHJhbmRcbiAqIEB0eXBlIHt7YTogc3RyaW5nLCB0OiBzdHJpbmcsIGc6IHN0cmluZywgYzogc3RyaW5nfX1cbiAqL1xuY29uc3QgcmV2ZXJzZU1hcCA9IHtcbiAgJ2EnOiAndCcsXG4gICd0JzogJ2EnLFxuICAnZyc6ICdjJyxcbiAgJ2MnOiAnZycsXG4gICdBJzogJ1QnLFxuICAnVCc6ICdBJyxcbiAgJ0cnOiAnQycsXG4gICdDJzogJ0cnLFxufTtcblxuLyoqXG4gKiBzZXF1ZW5jZSB2aWV3ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VxdWVuY2VWaWV3ZXIge1xuXG4gIC8vIGNvbnN0cnVjdG9yIHNhdmVzIG9wdGlvbnMgYW5kIHNldHVwcyBiYXNpYyAvIGVtcHR5IGNvbnRhaW5lclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cbiAgICAvLyBzZXR1cCBkZWZhdWx0IG9wdGlvbiB3aXRoIG92ZXJyaWRlcyBzdXBwbGllZCBieSBjYWxsZXJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHBhcmVudCA6IG51bGwsXG4gICAgICByZXZlcnNlOiB0cnVlLFxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgLy8gZW1wdHkgYmxvY2sgY29udGVudHMgYW5kIGFzc29jaWF0ZWQgcmV2ZXJzZSBzdHJhbmRcbiAgICB0aGlzLmVtcHR5QmxvY2tTdHIgPSAnIGVtcHR5IGJsb2NrICc7XG4gICAgdGhpcy5lbXB0eUJsb2NrUmV2ZXJzZVN0ciA9ICctJy5yZXBlYXQodGhpcy5lbXB0eUJsb2NrU3RyLmxlbmd0aCk7XG5cbiAgICAvLyBzZXF1ZW5jZSBjYWNoZSwga2V5ID0gYmxvY2suaWRcbiAgICB0aGlzLnNlcXVlbmNlQ2FjaGUgPSB7fTtcblxuICAgIC8vIHNldCBiYXNpYyBlbXB0eSBET00gc3RydWN0dXJlXG4gICAgdGhpcy5mYWJyaWMoKTtcbiAgICAvLyBzaXplIHRvIGN1cnJlbnQgd2luZG93LCByZWxheW91dCBhbmQgcmVuZGVyXG4gICAgdGhpcy5yZXNpemVkKCk7XG4gIH1cblxuICAvKipcbiAgICogd2UgYXJlIGJlaW5nIHJlbW92ZWQgZnJvbSB0aGUgYXBwXG4gICAqL1xuICBkaXNwb3NlKCkge1xuICAgIGlmICghdGhpcy5kaXNwb3NlZCkge1xuICAgICAgdGhpcy51c2VySW50ZXJmYWNlLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMudXNlckludGVyZmFjZSA9IG51bGw7XG4gICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogd2hlbiBhc2tlZCB0byBkaXNwbGF5IG5ldyBibG9ja3MvY29uc3RydWN0LiBUaGlzIHJlc2V0cyBldmVyeXRoaW5nXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLm5ld0RhdGFTZXQoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0IHRoZSBlbnRpcmUgcm93IGNhY2hlXG4gICAqL1xuICByZXNldFJvd0NhY2hlKCkge1xuICAgIGlmICghdGhpcy5yb3dDYWNoZSkge1xuICAgICAgdGhpcy5yb3dDYWNoZSA9IG5ldyBFbGVtZW50Q2FjaGUoMTAwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvd0NhY2hlLmVtcHR5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRydWUgaWYgb3VyIGNsaWVudCBhcmVhIGlzIHRvbyBzbWFsbCB0byBiZSB1c2VmdWxcbiAgICovXG4gIHRvb1NtYWxsKCkge1xuICAgIHJldHVybiB0aGlzLnJvd0xlbmd0aCA8IDEgfHwgdGhpcy5yb3dzQ29udGFpbmVyQm91bmRzLndpZHRoIDwgMTAgfHwgdGhpcy5yb3dzQ29udGFpbmVyQm91bmRzLmhlaWdodCA8IDEwO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgd2hlbmV2ZXIgb3Igc2l6ZSBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgcmVzaXplZCgpIHtcbiAgICAvLyByZXNpemUgZXZlbnRzIGNhbiBiZSBzZW50IGJ5IHRoZSBhcHAgYmVmb3JlIHdlIGhhdmUgYW55IGRhdGEsIHNvIHByb3RlY3QgYWdhaW5zdCB0aGF0XG4gICAgaWYgKCF0aGlzLmJsb2NrTGlzdCkge1xuICAgICAgdGhpcy5uZXdEYXRhU2V0KCk7XG4gICAgfVxuICAgIC8vIHJvd3Mgd2lsbCBhbGwgY2hhbmdlIG9uIHNpemUgY2hhbmdlIHNvIHJlc2V0IHdpdGggYSBuZXcgY2FjaGVcbiAgICB0aGlzLnJlc2V0Um93Q2FjaGUoKTtcbiAgICAvLyBjYWxjdWxhdGUgcm93IGxlbmd0aCAvIGJvdW5kcyBiYXNlZCBvbiBjdXJyZW50IGNsaWVudCBzaXplXG4gICAgdGhpcy5jYWxjdWxhdGVTaXplTWV0cmljcygpO1xuICAgIGlmICghdGhpcy50b29TbWFsbCgpKSB7XG4gICAgICAvLyBtYXAgYmxvY2tzIGFuZCBhbm5vdGF0aW9ucyB0byByb3dcbiAgICAgIHRoaXMubWFwRGF0YVNldCgpO1xuICAgICAgLy8gZW5zdXJlIGZpcnN0Um93IGlzIHN0aWxsIHZhbGlkXG4gICAgICB0aGlzLmZpcnN0Um93ID0gTWF0aC5taW4odGhpcy5yb3dMaXN0Lmxlbmd0aCAtIDEsIHRoaXMuZmlyc3RSb3cpO1xuICAgICAgdGhpcy51c2VySW50ZXJmYWNlLnVwZGF0ZVNlbGVjdGlvbigpO1xuICAgICAgLy8gZHJhd1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsY3VsYXRlIGJvdW5kcyBhbmQgcm93IGxlbmd0aCBiYXNlZCBvbiBjdXJyZW50IHNpemVcbiAgICovXG4gIGNhbGN1bGF0ZVNpemVNZXRyaWNzKCkge1xuICAgIC8vIGNhbGN1bGF0ZSByb3cgbGVuZ3RoIGZvciB0aGUgbmV3IHdpbmRvdyBzaXplXG4gICAgICB0aGlzLnJvd3NDb250YWluZXJCb3VuZHMgPSB0aGlzLnJvd3NDb250YWluZXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLnJvd0xlbmd0aCA9IE1hdGguZmxvb3IodGhpcy5yb3dzQ29udGFpbmVyQm91bmRzLndpZHRoIC8gdGhpcy5nZXRDaGFyV2lkdGgoKSk7XG4gIH1cbiAgLyoqXG4gICAqIG51bWJlciBvZiBjb21wbGV0ZSBvciBwYXJ0aWFsIHJvd3MgdGhhdCBhcmUgdmlzaWJsZVxuICAgKi9cbiAgcm93c1Zpc2libGUoKSB7XG4gICAgLy8gaWYgZGF0YSBzZXQgaXMgZW1wdHksIHRoZW4gbm8gcm93c1xuICAgIGlmICh0aGlzLnJvd0xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgbGV0IGluZGV4ID0gdGhpcy5maXJzdFJvdztcbiAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICB3aGlsZSAoaGVpZ2h0IDwgKHRoaXMucm93c0NvbnRhaW5lckJvdW5kcy5oZWlnaHQpICYmIGluZGV4IDwgdGhpcy5yb3dMaXN0Lmxlbmd0aCkge1xuICAgICAgaGVpZ2h0ICs9IHRoaXMuZ2V0Um93SGVpZ2h0KGluZGV4KTtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBpbmRleCAtIHRoaXMuZmlyc3RSb3c7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBib3VuZHMgb2Ygcm93LCBvciBhbiBlbXB0eSBib3ggaWYgdGhlIHJvdyBpcyBub3QgY3VycmVudGx5IHZpc2libGVcbiAgICovXG4gIGdldFJvd0JvdW5kcyhpbmRleCkge1xuICAgIGxldCBib3ggPSBuZXcgQm94MkQoKTtcbiAgICBsZXQgdmlzaWJsZSA9IHRoaXMucm93c1Zpc2libGUoKTtcbiAgICBsZXQgeSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuZmlyc3RSb3c7IGkgPCB0aGlzLmZpcnN0Um93ICsgdmlzaWJsZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmdldFJvd0hlaWdodChpKTtcbiAgICAgIGlmIChpID09PSBpbmRleCkge1xuICAgICAgICBib3gueSA9IHk7XG4gICAgICAgIGJveC53aWR0aCA9IHRoaXMuZ2V0Q2hhcldpZHRoKCkgKiB0aGlzLnJvd0xlbmd0aDtcbiAgICAgICAgYm94LmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB5ICs9IGhlaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIGJveDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gdGhlIGluZGV4IG9mIHRoZSByb3cgY29udGFpbmluZyB0aGUgZ2l2ZW4gY2xpZW50IHkgcG9zaXRpb24gKDAgPT09IHRvcCBvZiBjbGllbnQgYXJlYSApXG4gICAqIFJldHVybnMgLTEgaWYgeSBpcyBub3Qgd2l0aGluIGEgcm93XG4gICAqIEBwYXJhbSB5IC0gcGl4ZWwgY29vcmRpbmF0ZSByZWxhdGl2ZSB0byB3aW5kb3dcbiAgICovXG4gIGdldFJvd0luZGV4RnJvbVkoeSkge1xuICAgIGlmICh5IDwgMCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBsZXQgdmlzaWJsZSA9IHRoaXMucm93c1Zpc2libGUoKTtcbiAgICBsZXQgcm93SW5kZXggPSB0aGlzLmZpcnN0Um93O1xuICAgIGxldCBjdXJyZW50WSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuZmlyc3RSb3c7IGkgPCB0aGlzLmZpcnN0Um93ICsgdmlzaWJsZTsgaSArPSAxKSB7XG4gICAgICBjdXJyZW50WSArPSB0aGlzLmdldFJvd0hlaWdodChyb3dJbmRleCk7XG4gICAgICBpZiAoeSA8IGN1cnJlbnRZKSB7XG4gICAgICAgIHJldHVybiByb3dJbmRleDtcbiAgICAgIH1cbiAgICAgIHJvd0luZGV4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gY29sdW1uIGNsYW1wZWQgdG8gbGVuZ3RoIG9mIGdpdmVuIHJvd1xuICAgKiBAcGFyYW0geCAtIHBpeGVsIGNvb3JkaW5hdGUgcmVsYXRpdmUgdG8gY2xpZW50IGFyZWFcbiAgICovXG4gIGdldENvbHVtbkluZGV4RnJvbVgoeCwgcm93KSB7XG4gICAgbGV0IGNvbHVtbiA9IE1hdGguZmxvb3IoeCAvIHRoaXMuZ2V0Q2hhcldpZHRoKCkpO1xuICAgIGNvbnN0IHJlY29yZHMgPSB0aGlzLnJvd0xpc3Rbcm93XS5ibG9ja1JlY29yZHM7XG4gICAgY29uc3QgcmVjb3JkID0gcmVjb3Jkc1tyZWNvcmRzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChjb2x1bW4gPCAwIHx8IGNvbHVtbiA+PSByZWNvcmQuc3RhcnRSb3dPZmZzZXQgKyByZWNvcmQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH1cblxuICAvKipcbiAgICogd2lkdGggb2YgZml4ZWQgcGl0Y2ggZm9udFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0Q2hhcldpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmZvbnRNZXRyaWNzLnc7XG4gIH1cblxuICAvKipcbiAgICogaGVpZ2h0IG9mIGZpeGVkIHBpdGNoIGZvbnRcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldENoYXJIZWlnaHQoKSB7XG4gICAgcmV0dXJuICh0aGlzLmZvbnRNZXRyaWNzLmggKiAxLjMpID4+IDA7XG4gIH1cblxuICAvKipcbiAgICogaGVpZ2h0IG9mIGEgcm93LCBpbmNsdWRpbmcgdGhlIHZhcmlhYmxlIG51bWJlciBvZiBhbm5vdGF0aW9uc1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0Um93SGVpZ2h0KGluZGV4KSB7XG4gICAgY29uc3QgYW5ub3RhdGlvbnMgPSB0aGlzLnJvd0xpc3RbaW5kZXhdLmFubm90YXRpb25EZXB0aDtcbiAgICByZXR1cm4gdGhpcy5nZXRDaGFySGVpZ2h0KCkgKiAoYW5ub3RhdGlvbnMgKyAodGhpcy5vcHRpb25zLnJldmVyc2UgPyA4IDogNykpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNob3cgb3IgaGlkZSB0aGUgcmV2ZXJzZSBzdHJhbmQgKCBhcmd1bWVudCBpcyBvcHRpb25hbCApXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcmV2ZXJzZSBzdHJhbmRcbiAgICogQHBhcmFtIHNob3dcbiAgICovXG4gIHNob3dSZXZlcnNlU3RyYW5kKHNob3cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5vcHRpb25zLnJldmVyc2UgPSBzaG93O1xuICAgICAgLy8gcmVzZXQgY2FjaGUgc2luY2UgYWxsIHJvd3Mgd2lsbCBjaGFuZ2VcbiAgICAgIHRoaXMucmVzZXRSb3dDYWNoZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJldmVyc2U7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHRoZSBlbnRpcmUgdmlldywgdXNpbmcgY2FjaGVkIHJvd3MgaWYgcG9zc2libGVcbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICAvL2NvbnNvbGUudGltZSgnUmVuZGVyJyk7XG4gICAgaW52YXJpYW50KHRoaXMuZm9udE1ldHJpY3MgJiYgdGhpcy5ibG9ja1Jvd01hcCAmJiB0aGlzLnJvd0xpc3QsICdjYW5ub3QgcmVuZGVyIHVudGlsIGxheW91dCBoYXMgYmVlbiBtYXBwZWQnKTtcbiAgICAvLyBpZ25vcmUgaWYgcmVzaXplZCB0b28gc21hbGxcbiAgICBpZiAodGhpcy50b29TbWFsbCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGhvdyBtYW55IHJvd3NDb250YWluZXIgKCBpbmNsdWRpbmcgcGFydGlhbCByb3dzQ29udGFpbmVyICkgd2lsbCB3ZSBhY2NvbW1vZGF0ZSApXG4gICAgY29uc3Qgcm93c0ZpdCA9IHRoaXMucm93c1Zpc2libGUoKTtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgubWluKHRoaXMucm93TGlzdC5sZW5ndGgsIHRoaXMuZmlyc3RSb3cgKyByb3dzRml0KTtcbiAgICAvLyByZW5kZXIgYWxsIHJvd3NDb250YWluZXIgYW5kIHJlY29yZHMgaW4gZWFjaCByb3dcbiAgICBmb3IgKGxldCByb3dJbmRleCA9IHRoaXMuZmlyc3RSb3c7IHJvd0luZGV4IDwgbGltaXQ7IHJvd0luZGV4ICs9IDEpIHtcbiAgICAgIC8vIHNlZSBpZiB3ZSBoYXZlIHRoaXMgcm93IGluIG91ciBjYWNoZSBvdGhlcndpc2Ugd2Ugd2lsbCBoYXZlIHRvIGNyZWF0ZSBhbmQgcmVuZGVyIGl0XG4gICAgICBsZXQgcm93RWwgPSB0aGlzLnJvd0NhY2hlLmdldEVsZW1lbnQocm93SW5kZXgpO1xuICAgICAgaWYgKCFyb3dFbCkge1xuICAgICAgICAvLyByb3cgd2Fzbid0IGluIHRoZSBjYWNoZSBzbyBjcmVhdGUgYW5kIHJlbmRlclxuICAgICAgICByb3dFbCA9IHRoaXMucmVuZGVyUm93KHJvd0luZGV4KTtcbiAgICAgICAgLy8gYWRkIHRvIGNhY2hlXG4gICAgICAgIHRoaXMucm93Q2FjaGUuYWRkRWxlbWVudChyb3dJbmRleCwgcm93RWwpO1xuICAgICAgfVxuICAgICAgLy8gcG9zaXRpb24gcm93IGNvbnRhaW5lclxuICAgICAgY29uc3Qgcm93Qm91bmRzID0gdGhpcy5nZXRSb3dCb3VuZHMocm93SW5kZXgpO1xuICAgICAgcm93RWwuc2V0U3R5bGVzKHtcbiAgICAgICAgbGVmdCAgOiByb3dCb3VuZHMueCArICdweCcsXG4gICAgICAgIHRvcCAgIDogcm93Qm91bmRzLnkgKyAncHgnLFxuICAgICAgICB3aWR0aCA6IHJvd0JvdW5kcy53ICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiByb3dCb3VuZHMuaCArICdweCcsXG4gICAgICB9KTtcbiAgICAgIC8vIGFkZCB0byB0aGUgRE9NIGlmIG5vdCBjdXJyZW50bHkgcGFyZW50ZWRcbiAgICAgIGlmICghcm93RWwuZWwucGFyZW50Tm9kZSkge1xuICAgICAgICB0aGlzLnJvd3NDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RWwpO1xuICAgICAgfVxuICAgICAgLy8gbWFyayB0aGlzIHJvdyB3aXRoIHRoZSBjdXJyZW50IHJlbmRlciBjeWNsZVxuICAgICAgcm93RWwuZWwuc2V0QXR0cmlidXRlKCdyZW5kZXItY3ljbGUnLCByZW5kZXJDeWNsZSk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSBhbnkgcm93cyBmcm9tIHRoZSByb3dzQ29udGFpbmVyIHRoYXQgd2VyZSBub3QgdXBkYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgcmVuZGVyIGN5Y2xlXG4gICAgdGhpcy5yb3dzQ29udGFpbmVyLmZvckVhY2hDaGlsZChyb3dFbGVtZW50ID0+IHtcbiAgICAgIGlmIChwYXJzZUZsb2F0KHJvd0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZW5kZXItY3ljbGUnKSkgIT09IHJlbmRlckN5Y2xlKSB7XG4gICAgICAgIHJvd0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyb3dFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyB1c2VyIGludGVyZmFjZSBtdXN0IGJlIHJlLXJlbmRlcmVkIGFzIHdlbGxcbiAgICB0aGlzLnVzZXJJbnRlcmZhY2UucmVuZGVyKCk7XG4gICAgLy8gYnVtcCB0byB0aGUgbmV4dCByZW5kZXIgY3ljbGVcbiAgICByZW5kZXJDeWNsZSArPSAxO1xuICAgIC8vY29uc29sZS50aW1lRW5kKCdSZW5kZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgYSBzaW5nbGUgcm93IG9mIHRoZSB2aWV3XG4gICAqIEBwYXJhbSByb3dJbmRleFxuICAgKi9cbiAgcmVuZGVyUm93KHJvd0luZGV4KSB7XG4gICAgLy8gZ2V0IHRoZSBjdXJyZW50IHJvd1xuICAgIGNvbnN0IHJvdyA9IHRoaXMucm93TGlzdFtyb3dJbmRleF07XG4gICAgLy8gY3JlYXRlIGFuIGVsZW1lbnQgdG8gY29udGFpbiB0aGUgZW50aXJlIHJvd1xuICAgIGNvbnN0IHJvd0VsID0gRCgnPGRpdiBjbGFzcz1cInJvdy1lbGVtZW50XCI+PC9kaXY+Jyk7XG4gICAgLy8gcmVuZGVyIGFsbCB0aGUgYmxvY2sgcmVjb3JkcyBmb3IgdGhpcyByb3dcbiAgICByb3cuYmxvY2tSZWNvcmRzLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICAgIC8vIHRoZSBzZXF1ZW5jZSBzdHJhbmQgaXRzZWxmXG4gICAgICByZW5kZXJTZXF1ZW5jZVJvdyh0aGlzLCByb3dFbCwgcmVjb3JkLCAwKTtcbiAgICAgIC8vIHNlcGFyYXRvciByb3dcbiAgICAgIHJlbmRlclNlcGFyYXRvclNlcXVlbmNlUm93KHRoaXMsIHJvd0VsLCByZWNvcmQsIHRoaXMuZ2V0Q2hhckhlaWdodCgpKTtcbiAgICAgIC8vIG9wdGlvbmFsIHJldmVyc2Ugc3RyYW5kXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgcmVuZGVyUmV2ZXJzZVNlcXVlbmNlUm93KHRoaXMsIHJvd0VsLCByZWNvcmQsIHRoaXMuZ2V0Q2hhckhlaWdodCgpICogMik7XG4gICAgICB9XG4gICAgICAvLyByZW5kZXIgdGhlIGJsb2NrXG4gICAgICByZW5kZXJCbG9ja1NlcXVlbmNlUm93KHRoaXMsIHJvd0VsLCByZWNvcmQsIHRoaXMuZ2V0Q2hhckhlaWdodCgpICogKHRoaXMub3B0aW9ucy5yZXZlcnNlID8gMyA6IDIpKTtcbiAgICB9KTtcbiAgICAvLyByZW5kZXIgYW55IGFubm90YXRpb25zIG9uIHRoaXMgcm93XG4gICAgaWYgKHJvdy5hbm5vdGF0aW9uUmVjb3Jkcykge1xuICAgICAgcm93LmFubm90YXRpb25SZWNvcmRzLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICAgICAgcmVuZGVyQW5ub3RhdGlvbih0aGlzLCByb3dFbCwgcmVjb3JkLCB0aGlzLmdldENoYXJIZWlnaHQoKSAqICh0aGlzLm9wdGlvbnMucmV2ZXJzZSA/IDQgOiAzKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gcmVuZGVyIHRoZSBzZXF1ZW5jZSBydWxlciB3aXRoIG51bWJlcnMgKCAxMCdzICkgZnJvbSBzdGFydCBvZiByb3cgdG8gZW5kIG9mIHJvd1xuICAgIC8vIGdldCB0aGUgbGVuZ3RoIG9mIHRoaXMgcm93LCB3aGljaCB2YXJpZXMgb25seSBmb3IgdGhlIGxhc3Qgcm93IG9mIHRoZSBkYXRhIHNldFxuICAgIGNvbnN0IHJvd0NoYXJzID0gcm93SW5kZXggPT09IHRoaXMucm93TGlzdC5sZW5ndGggLSAxID8gdGhpcy5sYXN0Um93Q2hhcnMoKSA6IHRoaXMucm93TGVuZ3RoO1xuICAgIGNvbnN0IHJ5ID0gdGhpcy5nZXRDaGFySGVpZ2h0KCkgKiAocm93LmFubm90YXRpb25EZXB0aCArICh0aGlzLm9wdGlvbnMucmV2ZXJzZSA/IDQgOiAzKSkgKyB0aGlzLmdldENoYXJIZWlnaHQoKSAqIDAuNTtcbiAgICByZW5kZXJTZXF1ZW5jZVJ1bGVyKHRoaXMsIHJvd0VsLCByeSwgcm93SW5kZXggKiB0aGlzLnJvd0xlbmd0aCwgcm93Q2hhcnMpO1xuXG4gICAgLy8gcmV0dXJuIHRoZSByb3cgY29udGFpbmVyXG4gICAgcmV0dXJuIHJvd0VsO1xuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBzZXF1ZW5jZSBpcyBub3QgYXZhaWxhYmxlXG4gICAqIEBwYXJhbSBibG9ja1xuICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAqIEBwYXJhbSBsZW5ndGhcbiAgICogQHBhcmFtIHJldmVyc2UgW29wdGlvbmFsXSByZXR1cm5zIHRoZSByZXZlcnNlIHN0cmFuZFxuICAgKi9cbiAgZ2V0U2VxdWVuY2UoYmxvY2ssIG9mZnNldCwgbGVuZ3RoLCByZXZlcnNlID0gZmFsc2UpIHtcbiAgICAvLyBpZiBzZXF1ZW5jZSBpcyBlbXB0eSB0aGVuIHJldHVybiB0aGUgZW1wdHkgYmxvY2sgc3RyaW5nXG4gICAgaWYgKGJsb2NrLnNlcXVlbmNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW1wdHlCbG9ja1N0ci5zdWJzdHIob2Zmc2V0LCBsZW5ndGgpO1xuICAgIH1cbiAgICBsZXQgY2FjaGVFbnRyeSA9IHRoaXMuc2VxdWVuY2VDYWNoZVtibG9jay5pZF07XG4gICAgaWYgKCFjYWNoZUVudHJ5KSB7XG4gICAgICBjYWNoZUVudHJ5ID0gdGhpcy5zZXF1ZW5jZUNhY2hlW2Jsb2NrLmlkXSA9IHtcbiAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgc2VxdWVuY2U6IG51bGwsXG4gICAgICB9O1xuICAgICAgYmxvY2suZ2V0U2VxdWVuY2UoKVxuICAgICAgICAudGhlbihzZXF1ZW5jZSA9PiB7XG4gICAgICAgICAgLy8gaWdub3JlIGlmIHdlIGJlY2FtZSBkaXNwb3NlZCBpbiB0aGUgbWVhbnRpbWVcbiAgICAgICAgICBpZiAoIXRoaXMuZGlzcG9zZWQpIHtcbiAgICAgICAgICAgIGNhY2hlRW50cnkubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgY2FjaGVFbnRyeS5zZXF1ZW5jZSA9IHNlcXVlbmNlO1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlQ2FjaGVGb3JCbG9jayhibG9jayk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIHJldHVybiB0aGUgc2VxdWVuY2UgaWYgd2UgaGF2ZSBpdFxuICAgIGlmIChjYWNoZUVudHJ5LnNlcXVlbmNlKSB7XG4gICAgICAvLyByZXR1cm4gdGhlIHJldmVyc2Ugc3RyYW5kIGFzIHJlcXVlc3RlZFxuICAgICAgaWYgKHJldmVyc2UpIHtcbiAgICAgICAgY2FjaGVFbnRyeS5yZXZlcnNlU2VxdWVuY2UgPSBjYWNoZUVudHJ5LnJldmVyc2VTZXF1ZW5jZSB8fCB0aGlzLnJldmVyc2VTdHJhbmQoY2FjaGVFbnRyeS5zZXF1ZW5jZSk7XG4gICAgICAgIHJldHVybiBjYWNoZUVudHJ5LnJldmVyc2VTZXF1ZW5jZS5zdWJzdHIob2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgfVxuICAgICAgLy8gYWN0dWFsIHNlcXVlbmNlXG4gICAgICByZXR1cm4gY2FjaGVFbnRyeS5zZXF1ZW5jZS5zdWJzdHIob2Zmc2V0LCBsZW5ndGgpO1xuICAgIH1cbiAgICAvLyBtdXN0IGJlIGxvYWRpbmcsIHNvIHJldHVybiAnLSdcbiAgICByZXR1cm4gJy0nLnJlcGVhdChsZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0aGUgZ2l2ZW4gcmV2ZXJzZSBzdHJhbmQgZm9yIGEgZ2l2ZW4gc2VxdWVuY2VcbiAgICogQHJldHVybnMgeyp8c3RyaW5nfHN0cmluZ31cbiAgICovXG4gIHJldmVyc2VTdHJhbmQoc2VxdWVuY2UpIHtcbiAgICBsZXQgcmV2ZXJzZSA9ICcnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZXF1ZW5jZS5sZW5ndGg7IGkgKz0xKSB7XG4gICAgICBjb25zdCBjaGFyID0gc2VxdWVuY2VbaV07XG4gICAgICByZXZlcnNlICs9IHJldmVyc2VNYXBbY2hhcl0gfHwgJz8nO1xuICAgIH1cbiAgICByZXR1cm4gcmV2ZXJzZTtcbiAgfVxuXG4gIGZhYnJpYygpIHtcbiAgICAvLyB3ZSBtdXN0IGJlIGdpdmVuIGEgcGFyZW50IGVsZW1lbnRcbiAgICBpbnZhcmlhbnQodGhpcy5vcHRpb25zLnBhcmVudCwgJ3ZpZXdlciBtdXN0IGJlIHN1cHBsaWVkIHdpdGggYSBwYXJlbnQgZWxlbWVudCcpO1xuXG4gICAgLy8gY3JlYXRlIERPTVxuXG4gICAgdGhpcy5vdXRlciA9IEQoJzxkaXYgY2xhc3M9XCJ2aWV3ZXJcIj48L2Rpdj4nKTtcbiAgICB0aGlzLm9wdGlvbnMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMub3V0ZXIuZWwpO1xuXG4gICAgdGhpcy5yb3dzQ29udGFpbmVyID0gRCgnPGRpdiBjbGFzcz1cInJvd3NcIj48L2Rpdj4nKTtcbiAgICB0aGlzLm91dGVyLmVsLmFwcGVuZENoaWxkKHRoaXMucm93c0NvbnRhaW5lci5lbCk7XG5cbiAgICB0aGlzLnVzZXJJbnRlcmZhY2UgPSBuZXcgVXNlckludGVyZmFjZSh7XG4gICAgICB2aWV3ZXI6IHRoaXMsXG4gICAgfSk7XG5cbiAgICAvLyBjaGFyYWN0ZXIgbWV0cmljcyBmb3Igc3RyaW5nIG1lYXN1cmVtZW50XG4gICAgdGhpcy5mb250TWV0cmljcyA9IGNoYXJNZWFzdXJlKCk7XG5cbiAgICAvLyBlbnN1cmUgd2UgaGF2ZSBjdXJyZW50IG1ldHJpY3NcbiAgICB0aGlzLmNhbGN1bGF0ZVNpemVNZXRyaWNzKCk7XG5cbiAgICAvLyBzZXR1cCBpbml0aWFsIGVtcHR5IGRhdGEgc2V0XG4gICAgdGhpcy5uZXdEYXRhU2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogcmVzZXQgb3Igc2V0IHRoZSBjdXJyZW50IGJsb2NrcyBhbmQgYW5ub3RhdGlvbnNcbiAgICogQHBhcmFtIGRhdGFTZXRcbiAgICovXG4gIG5ld0RhdGFTZXQoYmxvY2tzID0gbnVsbCwgYW5ub3RhdGlvbnMgPSBudWxsLCBhcHBTdGF0ZSA9IG51bGwpIHtcbiAgICAvLyByb3dzIHdpbGwgYWxsIGNoYW5nZSBvbiBzaXplIGNoYW5nZSBzbyByZXNldCB3aXRoIGEgbmV3IGNhY2hlXG4gICAgdGhpcy5yZXNldFJvd0NhY2hlKCk7XG4gICAgLy8gc3RhdGUgaXMgYWxsIHRoZSBhcHBsaWNhdGlvbiBzdGF0ZSBkYXRhXG4gICAgdGhpcy5hcHBTdGF0ZSA9IGFwcFN0YXRlO1xuICAgIC8vIGNyZWF0ZSBuIGZha2UgYmxvY2tzXG4gICAgdGhpcy5ibG9ja0xpc3QgPSBibG9ja3MgfHwgW107XG5cbiAgICAvLyBGQUtFIGJsb2NrcyBmb3IgdGVzdGluZ1xuICAgIC8vIGxldCB0b3RhbExlbmd0aCA9IDA7XG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCA1MDA7IGkgKz0gMSkge1xuICAgIC8vICAgY29uc3QgYiA9IG5ldyBCbG9jayh7XG4gICAgLy8gICAgIGNhbGxiYWNrOiB0aGlzLmJsb2NrTG9hZGVkLmJpbmQodGhpcyksXG4gICAgLy8gICB9KTtcbiAgICAvLyAgIHRvdGFsTGVuZ3RoICs9IHRoaXMuYmxvY2tEaXNwbGF5TGVuZ3RoKGIpO1xuICAgIC8vICAgdGhpcy5ibG9ja0xpc3QucHVzaChiKTtcbiAgICAvLyB9XG5cbiAgICAvLyBnZW5lcmF0ZSBzb21lIGZha2UgYW5ub3RhdGlvbnMgZnJvbSAwLi50b3RhbExlbmd0aFxuICAgIHRoaXMuYW5ub3RhdGlvbkxpc3QgPSBhbm5vdGF0aW9ucyB8fCBbXTtcblxuICAgIC8vIEZBS0UgYW5ub3RhdGlvbnMgZm9yIHRlc3RpbmdcbiAgICAvLyBmb3IgKGxldCBqID0gMDsgaiA8IDUwMDsgaiArPSAxKSB7XG4gICAgLy8gICBjb25zdCBzdGFydCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRvdGFsTGVuZ3RoIC0gMTAwKSk7XG4gICAgLy8gICBjb25zdCBsZW5ndGggPSBNYXRoLm1heCg0LCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApKTtcbiAgICAvLyAgIGNvbnN0IGEgPSBuZXcgQW5ub3RhdGlvbihzdGFydCwgbGVuZ3RoKTtcbiAgICAvLyAgIHRoaXMuYW5ub3RhdGlvbkxpc3QucHVzaChhKTtcbiAgICAvLyB9XG5cbiAgICAvLyBtYXAgZGF0YSB0byByb3dzXG4gICAgdGhpcy5tYXBEYXRhU2V0KCk7XG4gICAgLy8gYmFjayB0byBmaXJzdCByb3dcbiAgICB0aGlzLmZpcnN0Um93ID0gMDtcbiAgICAvLyBjbGVhciBzZWxlY3Rpb25cbiAgICB0aGlzLnVzZXJJbnRlcmZhY2Uuc2V0U2VsZWN0aW9uKCk7XG4gICAgLy8gZGlzcGxheSB0b3RhbCBsZW5ndGggb2Ygc2VxdWVuY2VcbiAgICB0aGlzLnVzZXJJbnRlcmZhY2Uuc3RhdHVzQmFyLnNldEJhc2VQYWlycyh0aGlzLnRvdGFsU2VxdWVuY2VMZW5ndGgpO1xuICAgIC8vIHJlc2V0IHNlYXJjaCB0ZXJtIHNpbmNlIGJsb2NrcyAvIGFubm90YXRpb25zIGhhdmUgY2hhbmdlZFxuICAgIHRoaXMudXNlckludGVyZmFjZS5zdGF0dXNCYXIucmVzZXRTZWFyY2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzY3JvbGwgZG93blxuICAgKi9cbiAgbmV4dFJvdygpIHtcbiAgICB0aGlzLmZpcnN0Um93ID0gTWF0aC5taW4odGhpcy5yb3dMaXN0Lmxlbmd0aCAtIDEsIHRoaXMuZmlyc3RSb3cgKyAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzY3JvbGwgdXBcbiAgICovXG4gIHByZXZpb3VzUm93KCkge1xuICAgIHRoaXMuZmlyc3RSb3cgPSBNYXRoLm1heCgwLCB0aGlzLmZpcnN0Um93IC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogc2VsZWN0IGEgZ2l2ZW4gYmxvY2sncyByYW5nZVxuICAgKi9cbiAgc2VsZWN0QmxvY2soYmxvY2tJZCkge1xuICAgIGludmFyaWFudChibG9ja0lkLCAnYmxvY2sgSUQgbXVzdCBiZSBwcm92aWRlZCcpO1xuICAgIGNvbnN0IGJsb2NrID0gdGhpcy5ibG9ja1Jvd01hcFtibG9ja0lkXS5ibG9jaztcbiAgICBpbnZhcmlhbnQoYmxvY2ssICdibG9jayBtdXN0IGJlIGF2YWlsYWJsZSAnKTtcbiAgICB0aGlzLnVzZXJJbnRlcmZhY2Uuc2V0U2VsZWN0aW9uKHtcbiAgICAgIGJsb2NrLFxuICAgICAgYmxvY2tPZmZzZXQ6IDAsXG4gICAgfSwge1xuICAgICAgYmxvY2ssXG4gICAgICBibG9ja09mZnNldDogdGhpcy5ibG9ja0Rpc3BsYXlMZW5ndGgoYmxvY2spIC0gMSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZWxlY3QgdGhlIGdpdmVuIGFubm90YXRpb24ncyByYW5nZVxuICAgKiBAcGFyYW0gYW5ub3RhdGlvbklkXG4gICAqL1xuICBzZWxlY3RBbm5vdGF0aW9uKGFubm90YXRpb25JZCkge1xuICAgIGludmFyaWFudChhbm5vdGF0aW9uSWQsICdhbm5vdGF0aW9uIGlkIGV4cGVjdGVkJyk7XG4gICAgLy8gZ2V0IGNvbHVtbiAvIHJvdyBpbmZvcm1hdGlvbiBmb3IgdGhlIGFubm90YXRpb25cbiAgICBjb25zdCBpbmZvID0gdGhpcy5hbm5vdGF0aW9uUm93TWFwW2Fubm90YXRpb25JZF07XG4gICAgLy8gY29udmVydCBpbnRvIGJsb2NrIGNvb3JkaW5hdGVzIHZpYSB1c2VyIGludGVyZmFjZVxuICAgIGNvbnN0IHN0YXJ0SW5mbyA9IHRoaXMudXNlckludGVyZmFjZS5jb2x1bW5Sb3dUb0Jsb2NrT2Zmc2V0KG5ldyBWZWN0b3IyRChpbmZvLnN0YXJ0Q29sdW1uLCBpbmZvLnN0YXJ0Um93KSk7XG4gICAgY29uc3QgZW5kSW5mbyA9IHRoaXMudXNlckludGVyZmFjZS5jb2x1bW5Sb3dUb0Jsb2NrT2Zmc2V0KG5ldyBWZWN0b3IyRChpbmZvLmVuZENvbHVtbiwgaW5mby5lbmRSb3cpKTtcbiAgICAvLyBzZWxlY3QgdGhlIHJhbmdlXG4gICAgdGhpcy51c2VySW50ZXJmYWNlLnNldFNlbGVjdGlvbihzdGFydEluZm8sIGVuZEluZm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ha2UgdGhlIGZpcnN0IHJvdyBjb250YWluaW5nIHJvdyB0aGUgdG9wIHJvd1xuICAgKiBAcGFyYW0gYmxvY2tcbiAgICovXG4gIHNob3dCbG9jayhibG9ja0lkKSB7XG4gICAgaW52YXJpYW50KGJsb2NrSWQsICdibG9jayBpZCBtdXN0IGJlIHN1cHBsaWVkJyk7XG4gICAgY29uc3QgaW5mbyA9IHRoaXMuYmxvY2tSb3dNYXBbYmxvY2tJZF07XG4gICAgaW52YXJpYW50KGluZm8sICdleHBlY3RlZCBhIGJsb2NrIGluZm8gZm9yIHRoZSBibG9jaycpO1xuICAgIHRoaXMuZmlyc3RSb3cgPSBpbmZvLnN0YXJ0Um93O1xuICB9XG5cbiAgLyoqXG4gICAqIGJyaW5nIHRoZSBnaXZlbiBhbm5vdGF0aW9uIGludG8gdGhlIHZpZXdcbiAgICogQHBhcmFtIGFubm90YXRpb25JZFxuICAgKi9cbiAgc2hvd0Fubm90YXRpb24oYW5ub3RhdGlvbklkKSB7XG4gICAgaW52YXJpYW50KGFubm90YXRpb25JZCwgJ2Fubm90YXRpb24gaWQgbXVzdCBiZSBzdXBwbGllZCcpO1xuICAgIGNvbnN0IGluZm8gPSB0aGlzLmFubm90YXRpb25Sb3dNYXBbYW5ub3RhdGlvbklkXTtcbiAgICBpbnZhcmlhbnQoaW5mbywgJ2V4cGVjdGVkIGluZm8gZm9yIHRoZSBhbm5vdGF0aW9uJyk7XG4gICAgdGhpcy5maXJzdFJvdyA9IGluZm8uc3RhcnRSb3c7XG4gIH1cblxuICAvKipcbiAgICogYWZ0ZXIgYSBibG9ja3MgZnVsbCBkYXRhIGlzIGxvYWRlZFxuICAgKiBAcGFyYW0gYmxvY2tcbiAgICovXG4gIGJsb2NrTG9hZGVkKGJsb2NrKSB7XG4gICAgLy8gcmVtb3ZlIHJvd3MgY29udGFpbmluZyB0aGlzIGJsb2NrIGZyb20gdGhlIGNhY2hlXG4gICAgdGhpcy5pbnZhbGlkYXRlQ2FjaGVGb3JCbG9jayhibG9jayk7XG4gICAgLy8gYmxvY2sgbGF5b3V0IGRvZXNuJ3QgY2hhbmdlIG9ubHkgdGhlIGNvbnRlbnQgb2YgYSBibG9jaywgc28gYSByZW5kZXIgaXMgYWxsIHRoYXQgaXMgcmVxdWlyZWQuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgaW50ZXJuYWwgbWFwcyB0byByZWZsZWN0IHRoZSBjdXJyZW50IGRhdGEgc2V0LiBNYXBzIGJsb2NrcyB0byByb3dzIGFuZCBjb2x1bW5zXG4gICAqIGFuZCBtYXBzIGFubm90YXRpb25zIHRvIHJvd3MgYW5kIGNvbHVtbnMuXG4gICAqIE5PVEU6IG1hcEFubm90YXRpb25zIE1VU1QgYmUgYWZ0ZXIgbWFwQmxvY2tzIHNpbmNlIGl0IHJlcXVpcmVzIGJsb2NrIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgbWFwRGF0YVNldCgpIHtcbiAgICAvL2NvbnNvbGUudGltZSgnTWFwIERhdGEgU2V0Jyk7XG4gICAgdGhpcy5tYXBCbG9ja3MoKTtcbiAgICB0aGlzLm1hcEFubm90YXRpb25zKCk7XG4gICAgLy9jb25zb2xlLnRpbWVFbmQoJ01hcCBEYXRhIFNldCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGludmFsaWRhdGUgdGhlIGNhY2hlZCByb3dzIGNvbnRhaW5pbmcgdGhlIGdpdmVuIGJsb2NrXG4gICAqIEBwYXJhbSBibG9ja1xuICAgKi9cbiAgaW52YWxpZGF0ZUNhY2hlRm9yQmxvY2soYmxvY2spIHtcbiAgICBpZiAodGhpcy5ibG9ja1Jvd01hcCAmJiB0aGlzLnJvd0NhY2hlKSB7XG4gICAgICBjb25zdCBibG9ja0luZm8gPSB0aGlzLmJsb2NrUm93TWFwW2Jsb2NrLmlkXTtcbiAgICAgIC8vIG5lZWQgZGF0YSBzZXQgbWF5IGhhdmUgYXJyaXZlZCBpbiB0aGUgbWVhbiB0aW1lLCBzbyBibG9ja0luZm8gbWF5IG5vdCBiZSBwcmVzZW50XG4gICAgICBpZiAoYmxvY2tJbmZvKSB7XG4gICAgICAgIC8vIGludmFsaWQgZXZlcnkgcm93IGNvbnRhaW5pbmcgYWxsIG9yIHBhcnQgb2YgdGhlIGJsb2NrXG4gICAgICAgIGZvciAobGV0IGkgPSBibG9ja0luZm8uc3RhcnRSb3c7IGkgPD0gYmxvY2tJbmZvLmVuZFJvdzsgaSArPSAxKSB7XG4gICAgICAgICAgdGhpcy5yb3dDYWNoZS5yZW1vdmVFbGVtZW50KGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0aGUgZGlzcGxheSBsZW5ndGggZm9yIGEgYmxvY2ssIHdoaWNoIGlzIGVpdGhlciB0aGUgbGVuZ3RoIG9mIGl0cyBzZXF1ZW5jZVxuICAgKiBvciB0aGUgbGVuZ3RoIG9mIHRoZSBlbXB0eSBibG9jayBzdHJpbmdcbiAgICogQHBhcmFtIGJsb2NrXG4gICAqL1xuICBibG9ja0Rpc3BsYXlMZW5ndGgoYmxvY2spIHtcbiAgICByZXR1cm4gYmxvY2suc2VxdWVuY2UubGVuZ3RoIHx8IHRoaXMuZW1wdHlCbG9ja1N0ci5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogbWFwIHJvd3NDb250YWluZXIgbXVzdCBiZSBjYWxsZWQgd2hlbiBhIGJsb2NrIGlzIGNoYW5nZWQuIEl0IGNvbnN0cnVjdHMgdHdvIGltcG9ydGFudCBkYXRhIHN0cnVjdHVyZXM6XG4gICAqIDEuIGJsb2NrUm93TWFwIEEgaGFzaCBrZXllZCBteSBibG9jay5pZCB3aGljaCBnaXZlcyB0aGUgc3RhcnRpbmcgcm93IGFuZCBjaGFyIG9mZnNldCBpbnRvIHRoZVxuICAgKiAgICAgICAgICAgICAgICB0aGUgcm93IGZvciB0aGF0IGJsb2NrLiBBbHNvLCB0aGUgZW5kaW5nIHJvdyBhbmQgY2hhciBvZmZzZXQgaW50byB0aGUgcm93IGZvciB0aGUgYmxvY2suXG4gICAqICAgICAgICAgICAgICAgIFRodXMgZm9yIGVhY2ggYmxvY2sgeW91IGdldDpcbiAgICogICAgICAgICAgICAgICAgLSBibG9ja1xuICAgKiAgICAgICAgICAgICAgICAtIHN0YXJ0Um93XG4gICAqICAgICAgICAgICAgICAgIC0gc3RhcnRSb3dPZmZzZXQsXG4gICAqICAgICAgICAgICAgICAgIC0gZW5kUm93LFxuICAgKiAgICAgICAgICAgICAgICAtIGVuZFJvd09mZnNldFxuICAgKlxuICAgKiAyLiByb3dMaXN0ICAgICBGb3IgZWFjaCByb3cgcmVxdWlyZWQsIGEgbGlzdCBvZiByZWNvcmQgZm9yIHRoYXQgcm93LiBFYWNoIHJlY29yZCBnaXZlczpcbiAgICogICAgICAgICAgICAgICAgLWJsb2NrLFxuICAgKiAgICAgICAgICAgICAgICAtc3RhcnRSb3dPZmZzZXQsXG4gICAqICAgICAgICAgICAgICAgIC1zdGFydEJsb2NrT2Zmc2V0LFxuICAgKiAgICAgICAgICAgICAgICAtbGVuZ3RoLlxuICAgKiAgICAgICAgICAgICAgICBFYWNoIHJvdyByZXF1aXJlZCAxIG9yIG1vcmUgcmVjb3JkIHRvIGRlZmluZSBpdHMgY29udGVudFxuICAgKi9cbiAgbWFwQmxvY2tzKCkge1xuXG4gICAgLy9jb25zb2xlLnRpbWUoJ01hcCBCbG9ja3MgYW5kIFJvd3MnKTtcbiAgICBpbnZhcmlhbnQodGhpcy5yb3dMZW5ndGggPiAwLCAnUm93cyBtdXN0IGJlIGF0IGxlYXN0IG9uZSBjaGFyYWN0ZXIgd2lkZScpO1xuICAgIC8vIHJlc2V0IHRoZSB0d28gc3RydWN0dXJlcyB3ZSBhcmUgZ29pbmcgdG8gYnVpbGRcbiAgICB0aGlzLmJsb2NrUm93TWFwID0ge307XG4gICAgdGhpcy5yb3dMaXN0ID0gW107XG4gICAgLy8gdGhlIGN1cnJlbnQgcm93IHdlIGFyZSBvblxuICAgIGxldCBjdXJyZW50Um93ID0gMDtcbiAgICAvLyBvZmZzZXQgaW50byB0aGUgY3VycmVudCByb3cgd2UgYXJlIHdvcmtpbmcgb25cbiAgICBsZXQgY3VycmVudFJvd09mZnNldCA9IDA7XG4gICAgLy8gaW5kZXggb2YgY3VycmVudCBibG9jayB3ZSBhcmUgcGxhY2luZ1xuICAgIGxldCBjdXJyZW50QmxvY2tJbmRleCA9IDA7XG4gICAgLy8gY3VycmVudCBibG9jayB3ZSBhcmUgcGxhY2luZ1xuICAgIGxldCBibG9jaztcbiAgICAvLyBvZmZzZXQgaW50byB0aGUgY3VycmVudCBibG9jayB3ZSBhcmUgcGxhY2luZ1xuICAgIGxldCBjdXJyZW50QmxvY2tPZmZzZXQ7XG4gICAgLy8gaW5mbyBzdHJ1Y3R1cmVzIGZvciB0aGUgY3VycmVudCByb3cgYW5kIGN1cnJlbnQgYmxvY2tcbiAgICBsZXQgYmxvY2tJbmZvO1xuICAgIGxldCByb3dJbmZvO1xuICAgIC8vIHRyYWNrIHRoZSB0b3RhbCBsZW5ndGggb2Ygc2VxdWVuY2VzXG4gICAgdGhpcy50b3RhbFNlcXVlbmNlTGVuZ3RoID0gMDtcbiAgICAvLyBkZXRlcm1pbmUgaG93IG11Y2ggb2YgdGhlIGN1cnJlbnQgc2VxdWVuY2Ugd2UgY2FuIGZpdCBpbnRvIHRoZSBjdXJyZW50IHJvd1xuICAgIHdoaWxlIChjdXJyZW50QmxvY2tJbmRleCA8IHRoaXMuYmxvY2tMaXN0Lmxlbmd0aCkge1xuICAgICAgLy8gZ2V0IHRoZSBuZXh0IGJsb2NrIGFuZCBzZXR1cCBhIGJsb2NrIGluZm8gaWYgd2UgZG9uJ3QgaGF2ZSBvbmVcbiAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgYmxvY2sgPSB0aGlzLmJsb2NrTGlzdFtjdXJyZW50QmxvY2tJbmRleF07XG4gICAgICAgIC8vIHRyYWNrIHRoZSB0b3RhbCBsZW5ndGggb2YgYWxsIHNlcXVlbmNlc1xuICAgICAgICB0aGlzLnRvdGFsU2VxdWVuY2VMZW5ndGggKz0gdGhpcy5ibG9ja0Rpc3BsYXlMZW5ndGgoYmxvY2spO1xuICAgICAgICAvLyBjcmVhdGUgdGhlIGJsb2NrIGluZm8gdGhhdCByZWNvcmRzIHRoZSBzdGFydC9lbmQgcG9zaXRpb24gb2YgdGhpcyBibG9ja1xuICAgICAgICBibG9ja0luZm8gPSB7XG4gICAgICAgICAgYmxvY2ssXG4gICAgICAgICAgc3RhcnRSb3cgICAgICA6IGN1cnJlbnRSb3csXG4gICAgICAgICAgc3RhcnRSb3dPZmZzZXQ6IGN1cnJlbnRSb3dPZmZzZXQsXG4gICAgICAgICAgZW5kUm93ICAgICAgICA6IC0xLFxuICAgICAgICAgIGVuZFJvd09mZnNldCAgOiAtMSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ibG9ja1Jvd01hcFtibG9jay5pZF0gPSBibG9ja0luZm87XG4gICAgICAgIC8vIHJlc2V0IG9mZnNldCBpbnRvIGN1cnJlbnQgYmxvY2tcbiAgICAgICAgY3VycmVudEJsb2NrT2Zmc2V0ID0gMDtcbiAgICAgIH1cbiAgICAgIGludmFyaWFudChibG9jayAmJiBibG9ja0luZm8sICdleHBlY3RlZCBhIGJsb2NrIGFuZCBibG9ja0luZm8gaGVyZScpO1xuXG4gICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGluZm9ybWF0aW9uIGFib3V0IHRoZSByb3cgdGhlbiBjcmVhdGUgaXQgbm93XG4gICAgICBpZiAoIXJvd0luZm8pIHtcbiAgICAgICAgcm93SW5mbyA9IHtcbiAgICAgICAgICAvLyB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IG9uZSBibG9jayBvbiBlYWNoIHJvdywgc28gdGhpcyBpc24ndCB3YXN0ZWZ1bFxuICAgICAgICAgIGJsb2NrUmVjb3JkcyAgIDogW10sXG4gICAgICAgICAgLy8gZGVwdGggb2YgbmVzdGluZyBvZiBhbm5vdGF0aW9ucywgMCBtZWFucyBubyBhbm5vdGF0aW9ucyBvbiB0aGlzIHJvdy5cbiAgICAgICAgICBhbm5vdGF0aW9uRGVwdGg6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucm93TGlzdC5wdXNoKHJvd0luZm8pO1xuICAgICAgfVxuXG4gICAgICAvLyBsZW5ndGggb2Ygc2VxdWVuY2Ugc3RpbGwgcmVtYWluaW5nIGZvciBjdXJyZW50IGJsb2NrXG4gICAgICBsZXQgYmxvY2tSZW1haW5pbmcgPSB0aGlzLmJsb2NrRGlzcGxheUxlbmd0aChibG9jaykgLSBjdXJyZW50QmxvY2tPZmZzZXQ7XG4gICAgICAvLyBzcGFjZSBhdmFpbGFibGUgaW4gdGhlIGN1cnJlbnQgcm93XG4gICAgICBsZXQgcm93UmVtYWluaW5nID0gdGhpcy5yb3dMZW5ndGggLSBjdXJyZW50Um93T2Zmc2V0O1xuICAgICAgLy8gbWF4IGFtb3VudCB3ZSBjYW4gdGFrZSBmcm9tIHRoZSBjdXJyZW50IGJsb2NrXG4gICAgICBsZXQgZml0ID0gTWF0aC5taW4oYmxvY2tSZW1haW5pbmcsIHJvd1JlbWFpbmluZyk7XG4gICAgICBpbnZhcmlhbnQoZml0ID49IDAsICdleHBlY3RlZCB0byBmaXQgemVybyBvciBtb3JlIGNoYXJhY3RlcnMnKTtcblxuICAgICAgLy8gaWYgd2UgY2FuJ3QgZml0IGFueXRoaW5nIHRoZW4gZW5kIHRoZSBjdXJyZW50IHJvd1xuICAgICAgaWYgKGZpdCA9PT0gMCkge1xuICAgICAgICBjdXJyZW50Um93ICs9IDE7XG4gICAgICAgIGN1cnJlbnRSb3dPZmZzZXQgPSAwO1xuICAgICAgICByb3dJbmZvID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRha2UgZml0IGNoYXJhY3RlcnMgZnJvbSB0aGUgY3VycmVudCBibG9jayBhbmQgYWRkIGEgcmVjb3JkIHRvIHRoZSBjdXJyZW50IHJvd0luZm9cbiAgICAgICAgcm93SW5mby5ibG9ja1JlY29yZHMucHVzaCh7XG4gICAgICAgICAgYmxvY2sgICAgICAgICAgIDogYmxvY2ssXG4gICAgICAgICAgc3RhcnRSb3dPZmZzZXQgIDogY3VycmVudFJvd09mZnNldCxcbiAgICAgICAgICBzdGFydEJsb2NrT2Zmc2V0OiBjdXJyZW50QmxvY2tPZmZzZXQsXG4gICAgICAgICAgbGVuZ3RoICAgICAgICAgIDogZml0LFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdXBkYXRlIG9mZnNldHMgaW50byByb3cgYW5kIGJsb2NrXG4gICAgICAgIGN1cnJlbnRSb3dPZmZzZXQgKz0gZml0O1xuICAgICAgICBjdXJyZW50QmxvY2tPZmZzZXQgKz0gZml0O1xuICAgICAgICAvLyBpZiB3ZSBoYXZlIGNvbnN1bWVkIHRoZSBlbnRpcmUgc2VxdWVuY2UgZnJvbSB0aGUgY3VycmVudCBibG9jayB0aGVuIG1vdmUgdG8gdGhlIG5leHQgYmxvY2tcbiAgICAgICAgaW52YXJpYW50KGN1cnJlbnRCbG9ja09mZnNldCA8PSB0aGlzLmJsb2NrRGlzcGxheUxlbmd0aChibG9jayksICdjdXJyZW50QmxvY2tPZmZzZXQgc2hvdWxkIG5ldmVyIGV4Y2VlZCBzZXF1ZW5jZSBpbiBibG9jaycpO1xuICAgICAgICAvLyByZWFjaCBlbmQgb2YgdGhlIGN1cnJlbnQgYmxvY2s/XG4gICAgICAgIGlmIChjdXJyZW50QmxvY2tPZmZzZXQgPT09IHRoaXMuYmxvY2tEaXNwbGF5TGVuZ3RoKGJsb2NrKSkge1xuICAgICAgICAgIGJsb2NrSW5mby5lbmRSb3cgPSBjdXJyZW50Um93O1xuICAgICAgICAgIGJsb2NrSW5mby5lbmRSb3dPZmZzZXQgPSBjdXJyZW50Um93T2Zmc2V0O1xuICAgICAgICAgIGJsb2NrID0gYmxvY2tJbmZvID0gbnVsbDtcbiAgICAgICAgICBjdXJyZW50QmxvY2tJbmRleCArPSAxO1xuICAgICAgICAgIGN1cnJlbnRCbG9ja09mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWFwIGFubm90YXRpb25zIHRvIHJvd3MgYW5kIGNvbHVtbnMuIG1hcEJsb2NrcyBtdXN0IGJlIGNhbGxlZCBmaXJzdC5cbiAgICovXG4gIG1hcEFubm90YXRpb25zKCkge1xuICAgIC8vIG1hcHMgYW5ub3RhdGlvbiB0byB0aGVpciBzdGFydGluZyAvIGVuZGluZyBjb2x1bW4gcm93LCBrZXllZCBieSBhbm5vdGF0aW9uIGlkXG4gICAgdGhpcy5hbm5vdGF0aW9uUm93TWFwID0ge307XG4gICAgLy8gaW50ZXJzZWN0IGVhY2ggYW5ub3RhdGlvbiB3aXRoIHRoaXMgcm93XG4gICAgZm9yKGxldCBhID0gMDsgYSA8IHRoaXMuYW5ub3RhdGlvbkxpc3QubGVuZ3RoOyBhICs9IDEpIHtcbiAgICAgIGNvbnN0IGFubm90YXRpb24gPSB0aGlzLmFubm90YXRpb25MaXN0W2FdO1xuICAgICAgLy8gZW5zdXJlIHdlIGhhdmUgdGhlIGJsb2NrLCBzb21lIGFubm90YXRpb25zIGFwcGVhcnMgdG8gbm90IHJlZmVyZW5jZSBjb3JyZWN0bHk/XG5cbiAgICAgIC8vIG5vdyB0aGF0IGJsb2NrcyBhcmUgbWFwcGVkIHdlIGNhbiBjb3JyZWN0bHkgc2V0IHRoZSBnbG9iYWwgc3RhcnQvZW5kIGZvciB0aGUgYW5ub3RhdGlvblxuICAgICAgYW5ub3RhdGlvbi5zZXRTdGFydEVuZCh0aGlzKTtcbiAgICAgIC8vIGdldCB0aGUgZmlyc3QgYW5kIGxhc3Qgcm93IHRoaXMgYW5ub3RhdGlvbiBzcGFuc1xuICAgICAgY29uc3QgZmlyc3RSb3cgPSBNYXRoLmZsb29yKGFubm90YXRpb24uc3RhcnQgLyB0aGlzLnJvd0xlbmd0aCk7XG4gICAgICBjb25zdCBsYXN0Um93ID0gTWF0aC5mbG9vcihhbm5vdGF0aW9uLmVuZCAvIHRoaXMucm93TGVuZ3RoKTtcblxuICAgICAgLy8gcmVjb3JkIHRoZSBzdGFydGluZyAvIGVuZCByb3cgLyBjb2x1bW4gZm9yIGVhY2ggYW5ub3RhdGlvbiBpbiB0aGUgYSBtYXBcbiAgICAgIHRoaXMuYW5ub3RhdGlvblJvd01hcFthbm5vdGF0aW9uLmlkXSA9IHtcbiAgICAgICAgc3RhcnRSb3cgICA6IGZpcnN0Um93LFxuICAgICAgICBlbmRSb3cgICAgIDogbGFzdFJvdyxcbiAgICAgICAgc3RhcnRDb2x1bW46IGFubm90YXRpb24uc3RhcnQgJSB0aGlzLnJvd0xlbmd0aCxcbiAgICAgICAgZW5kQ29sdW1uICA6IGFubm90YXRpb24uZW5kICUgdGhpcy5yb3dMZW5ndGgsXG4gICAgICB9O1xuXG4gICAgICAvLyBkZXRlcm1pbmUgdGhlIGV4dGVudCBvZiB0aGUgaW50ZXJzZWN0aW9uIHdpdGggZWFjaCByb3dcbiAgICAgIGZvciAobGV0IGkgPSBmaXJzdFJvdzsgaSA8PSBsYXN0Um93OyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRPZlJvdyA9IGkgKiB0aGlzLnJvd0xlbmd0aDtcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBpbnRlcnNlY3Rpb24gd2l0aCB0aGUgY3VycmVudCByb3dcbiAgICAgICAgY29uc3QgcnN0YXJ0ID0gTWF0aC5tYXgoc3RhcnRPZlJvdywgYW5ub3RhdGlvbi5zdGFydCk7XG4gICAgICAgIGNvbnN0IHJlbmQgPSBNYXRoLm1pbihzdGFydE9mUm93ICsgdGhpcy5yb3dMZW5ndGggLSAxLCBhbm5vdGF0aW9uLmVuZCk7XG4gICAgICAgIC8vIHdlIGV4cGVjdCBzb21lIHNvcnQgb2YgaW50ZXJzZWN0aW9uXG4gICAgICAgIGludmFyaWFudChyZW5kIC0gcnN0YXJ0ID49IDAsICdleHBlY3RlZCBhbiBpbnRlcnNlY3Rpb24nKTtcblxuICAgICAgICAvLyBjcmVhdGUgYSByZWNvcmQgZm9yIHRoZSBhbm5vdGF0aW9uIGludGVyc2VjdGlvbiB0byBiZSBhc3NvY2lhdGVkIHdpdGggdGhlIHJvd1xuICAgICAgICAvLyAoIGFubm90YXRpb25zIG1heWJlIG91dHNpZGUgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgcm93cyApXG4gICAgICAgIGlmIChpID49IDAgJiYgaSA8IHRoaXMucm93TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCByb3dJbmZvID0gdGhpcy5yb3dMaXN0W2ldO1xuICAgICAgICAgIHJvd0luZm8uYW5ub3RhdGlvblJlY29yZHMgPSByb3dJbmZvLmFubm90YXRpb25SZWNvcmRzIHx8IFtdO1xuICAgICAgICAgIC8vIGVhY2ggcmVjb3JkIGlzIHRoZSBzdGFydGluZyBvZmZzZXQgYW5kIGVuZGluZyBvZmZzZXQgaW50byB0aGUgcm93XG4gICAgICAgICAgLy8gLmRlcHRoIGlzIHRoZSBkZXB0aCBvZiB0aGUgYW5ub3RhdGlvbiBzaW5jZSBzZXZlcmFsIGNhbiBvdmVybGFwLlxuICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHtcbiAgICAgICAgICAgIGFubm90YXRpb24sXG4gICAgICAgICAgICBzdGFydDogcnN0YXJ0IC0gc3RhcnRPZlJvdyxcbiAgICAgICAgICAgIGVuZCAgOiByZW5kIC0gc3RhcnRPZlJvdyxcbiAgICAgICAgICAgIGRlcHRoOiAwLFxuICAgICAgICAgIH07XG4gICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHNoYWxsb3dlc3QgZGVwdGggd2hlcmUgdGhpcyBhbm5vdGF0aW9uIHdpbGwgbm90IGludGVyc2VjdCBhbm90aGVyIGFubm90YXRpb25cbiAgICAgICAgICAgIGxldCBzdGFydCwgZW5kLCBhUmVjb3JkLCBpbnRlcnNlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByb3dJbmZvLmFubm90YXRpb25SZWNvcmRzLmxlbmd0aDsgayArPSAxKSB7XG4gICAgICAgICAgICAgIGFSZWNvcmQgPSByb3dJbmZvLmFubm90YXRpb25SZWNvcmRzW2tdO1xuICAgICAgICAgICAgICAvLyB0ZXN0IGZvciBpbnRlcnNlY3Rpb24gaWYgYXQgdGhlIHNhbWUgZGVwdGhcbiAgICAgICAgICAgICAgaWYgKGFSZWNvcmQuZGVwdGggPT0gcmVjb3JkLmRlcHRoKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBNYXRoLm1heChhUmVjb3JkLnN0YXJ0LCByZWNvcmQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGVuZCA9IE1hdGgubWluKGFSZWNvcmQuZW5kLCByZWNvcmQuZW5kKTtcbiAgICAgICAgICAgICAgICBpZiAoZW5kIC0gc3RhcnQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhlcmUgd2FzIGFuIGludGVyc2VjdGlvblxuICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBoaXQgYXQgdGhpcyBkZXB0aCwgdHJ5IHRoZSBuZXh0IG9uZVxuICAgICAgICAgICAgaWYgKGludGVyc2VjdGVkKSB7XG4gICAgICAgICAgICAgIHJlY29yZC5kZXB0aCArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgYW5ub3RhdGlvbiBkZXB0aCBvbiB0aGUgcm93SW5mb1xuICAgICAgICAgIHJvd0luZm8uYW5ub3RhdGlvbkRlcHRoID0gTWF0aC5tYXgocmVjb3JkLmRlcHRoICsgMSwgcm93SW5mby5hbm5vdGF0aW9uRGVwdGgpO1xuXG4gICAgICAgICAgLy8gYWRkIHRvIHRoZSBhbm5vdGF0aW9ucyByZWNvcmRzIGZvciB0aGlzIHJvd1xuICAgICAgICAgIHJvd0luZm8uYW5ub3RhdGlvblJlY29yZHMucHVzaChyZWNvcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJldHVybiB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gdGhlIGxhc3Qgcm93IHRoZSBkYXRhIHNldC4gVGhpcyBpcyB1c2VmdWwgbnVtYmVyIGZvciB2YXJpb3VzXG4gICAqIFVJIHRhc2tzIHNpbmNlIHRoZSBsYXN0IHJvdyBtYXkgYmUgc2hvcnRlciB0aGFuIHRoZSBvdGhlciByb3dzXG4gICAqL1xuICBsYXN0Um93Q2hhcnMoKSB7XG4gICAgY29uc3QgbGFzdFJvdyA9IHRoaXMucm93TGlzdFt0aGlzLnJvd0xpc3QubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbGFzdFJlY29yZCA9IGxhc3RSb3cuYmxvY2tSZWNvcmRzW2xhc3RSb3cuYmxvY2tSZWNvcmRzLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBsYXN0UmVjb3JkLnN0YXJ0Um93T2Zmc2V0ICsgbGFzdFJlY29yZC5sZW5ndGg7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvdmlld2VyL3ZpZXdlci5qc1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pbnZhcmlhbnQvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICB9XG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgfVxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbi8qKlxuICogc2ltcGxlc3QgcmVnZXggZm9yIGlkZW50aWZ5aW5nIGEgdGFnIHN0cmluZyB2ZXJzdXMgYSBzZWxlY3RvciBzdHJpbmdcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbmNvbnN0IHRhZ1JlZ2V4ID0gbmV3IFJlZ0V4cCgnPC5bXig+PC4pXSs+Jyk7XG5cbi8qKlxuICogc3RhdGljIFdlYWtNYXAgdXNlZCB0byBiaW5kIGFyYml0cmFyeSBkYXRhIHRvIERPTSBub2Rlcy5cbiAqIFNlZSBtZXRob2RzIHNldERhdGEsIGdldERhdGFcbiAqL1xuY29uc3Qgbm9kZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogdGhlIGFjdHVhbCBlbGVtZW50cyBjbGFzcyB3aGljaCBpbmhlcml0cyBmcm9tIG5hdGl2ZSBBcnJheVxuICovXG5jbGFzcyBFbGVtZW50TGlzdCBleHRlbmRzIEFycmF5IHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gdGhpcyB3aWxsIGJlIHRoZSBlbGVtZW50cyB3ZSB3cmFwXG4gICAgbGV0IGVsZW1lbnRzID0gW107XG4gICAgLy8gZmlyc3Qgb3B0aW9uIGlzIGZpcnN0IGFyZ3VtZW50IGlzIGEgQ1NTIHNlbGVjdG9yIHN0cmluZyBhbmQgc2Vjb25kIG9wdGlvbmFsIGVsZW1lbnQgaXMgdGhlIHJvb3QgZWxlbWVudCB0byBhcHBseSB0aGUgc2VsZWN0b3IgdG8uXG4gICAgaWYgKChhcmdzLmxlbmd0aCA9PT0gMSB8fCBhcmdzLmxlbmd0aCA9PSAyKSAmJiAodHlwZW9mKGFyZ3NbMF0pID09PSAnc3RyaW5nJyAmJiAhdGFnUmVnZXguZXhlYyhhcmdzWzBdKSkpIHtcbiAgICAgIGNvbnN0IHJvb3QgPSBhcmdzLmxlbmd0aCA9PT0gMSA/IGRvY3VtZW50IDogdGhpcy5nZXROb2RlKGFyZ3NbMV0pO1xuICAgICAgLy8gcmV0dXJuIGEgcHJveHkgdXNpbmcgdGhlIHJlc3VsdHMgb2YgdGhlIHNlbGVjdG9yIGFzIHRoZSBpbml0aWFsIGFycmF5XG4gICAgICBlbGVtZW50cyA9IEFycmF5LmZyb20ocm9vdC5xdWVyeVNlbGVjdG9yQWxsKGFyZ3NbMF0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2Vjb25kIG9wdGlvbiBpcyB0aGF0IGFyZ3MgaWYganVzdCBhIHN0cmluZyBlLmcuICc8ZGl2IGNsYXNzPVwieHl6XCI+PHA+VGl0bGU8L3A+PC9kaXY+J1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIHR5cGVvZihhcmdzWzBdKSA9PT0gJ3N0cmluZycgJiYgdGFnUmVnZXguZXhlYyhhcmdzWzBdKSkge1xuICAgICAgICAvLyB1c2UgYSB0ZW1wb3JhcnkgRElWIGFuZCBpbnNlcnRBZGphY2VudEhUTUwgdG8gY29uc3RydWN0IHRoZSBET01cbiAgICAgICAgY29uc3QgZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICBkLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGFyZ3NbMF0pO1xuICAgICAgICAvLyBzZXR1cCBlbGVtZW50cyB0byB3cmFwXG4gICAgICAgIGVsZW1lbnRzID0gQXJyYXkuZnJvbShkLmNoaWxkTm9kZXMpO1xuICAgICAgICAvLyByZW1vdmUgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgdGVtcG9yYXJ5IGRpdiwgc28gdGhhdCB0aGUgbmV3bHkgY3JlYXRlZCB0b3AgbGV2ZWwgbm9kZXMgd2lsbCBiZSB1bnBhcmVudGVkXG4gICAgICAgIHdoaWxlIChkLmNoaWxkRWxlbWVudENvdW50KSBkLnJlbW92ZUNoaWxkKGQuZmlyc3RDaGlsZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBvbmx5IHJlbWFpbmluZyBvcHRpb24gaXMgdGhhdCBlYWNoIGFyZ3VtZW50IGlzIGEgRE9NIG5vZGUgb3IgcG9zc2libGUgYW5vdGhlciBlbGVtZW50cyBsaXN0XG4gICAgICAgIGFyZ3MuZm9yRWFjaChhcmcgPT4ge1xuICAgICAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBFbGVtZW50TGlzdCkge1xuICAgICAgICAgICAgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoYXJnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudHMucHVzaChhcmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnRzID0gYXJncztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHRoaXMucHVzaChpdGVtKSk7XG4gIH1cbiAgLyoqXG4gICAqIGFwcGx5IHRoZSBrZXkvdmFsdWUgcGFpcnMgaW4gaGFzaCB0byBhbGwgb3VyIGVsZW1lbnRzXG4gICAqL1xuICBzZXRTdHlsZXMoaGFzaCkge1xuICAgIHRoaXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICBPYmplY3Qua2V5cyhoYXNoKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gaGFzaFtrZXldO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogaWYgdGhlIG9iaiBpcyBhIEVsZW1lbnRMaXN0IHRoZW4gcmV0dXJuIHRoZSBmaXJzdCBtZW1iZXIgb3RoZXJ3aXNlIGFzc3VtZVxuICAgKiB0aGUgb2JqZWN0IGlzIGEgbm9kZSBhbmQgcmV0dXJuIGl0LlxuICAgKi9cbiAgZ2V0Tm9kZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgRWxlbWVudExpc3QpIHJldHVybiBvYmpbMF07XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICAvKipcbiAgICogaWYgdGhlIG9iaiBpcyBhIEVsZW1lbnRMaXN0IHJldHVybiBpdCwgb3RoZXJ3aXNlIHdyYXAgdGhlIG5vZGUgaW4gYSBFbGVtZW50TGlzdFxuICAgKi9cbiAgZ2V0Tm9kZXMob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEVsZW1lbnRMaXN0KSByZXR1cm4gb2JqO1xuICAgIHJldHVybiBuZXcgRWxlbWVudExpc3Qob2JqKTtcbiAgfVxuICAvKipcbiAgICogcmV0dXJuIHRoZSBuYXRpdmUgZWwgb2YgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGxpc3RcbiAgICovXG4gIGdldCBlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggPyB0aGlzWzBdIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIGVsZW1lbnRzIGZyb20gdGhlIGVsZW1lbnRzIGluIG91cmxpc3RcbiAgICovXG4gIGVtcHR5KCkge1xuICAgIHRoaXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGVuZCBvdXIgbGlzdCB0byB0aGUgZ2l2ZW4gRE9NIGVsZW1lbnQgb2YgZmlyc3QgbWVtYmVyIG9mIGFuIEVsZW1lbnRMaXN0XG4gICAqL1xuICBhcHBlbmRUbyhkKSB7XG4gICAgdGhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgdGhpcy5nZXROb2RlKGQpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBhcHBlbmQgdGhlIGdpdmVuIG5vZGUgKCBvciBhbGwgdGhlIG5vZGVzIGlmIGQgaXMgYW4gRWxlbWVudExpc3Qgb2JqZWN0IClcbiAgICogdG8gb3VyIGZpcnN0IGVsZW1lbnQuXG4gICAqL1xuICBhcHBlbmRDaGlsZChkKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdldE5vZGVzKGQpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXNbMF0uYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgdGhlIG5vZGVzIG9yIG5vZGUgZnJvbSB0aGUgZmlyc3Qgbm9kZSBpbiBvdXIgY29sbGVjdGlvblxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQoZCkge1xuICAgIHRoaXMuZm9yRWFjaChwYXJlbnQgPT4ge1xuICAgICAgdGhpcy5nZXROb2RlcyhkKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhbGwgb3VyIG5vZGVzIGZyb20gdGhlaXIgcGFyZW50c1xuICAgKi9cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIGl0ZXJhdGUgZXZlcnkgbm9kZSBhbmQgYWxsIHRoZWlyIGNoaWxkcmVuIGxvb2tpbmcgZm9yIGRhdGEtcmVmPVwibmFtZVwiIGF0dHJpYnV0ZXMuXG4gICAqIEFzc2lnbiB0YXJnZXRPYmplY3RbbmFtZV0gdG8gdGhlIG1hdGNoaW5nIERPTSBlbGVtZW50LlxuICAgKiBDb21tb25seSB5b3UgaW1wb3J0IHNvbWUgdGVtcGxhdGUgb3IgSFRNTCBmcmFnbWVudCBpbnRvIGEgY2xhc3Mgc28gdGhhdCB0aGUgbWVtYmVyIG9mXG4gICAqIHRoYXQgY2xhc3MgY2FuIHNpbXBsZSByZWYgdG8gdGhpcy5uYW1lLlxuICAgKi9cbiAgaW1wb3J0UmVmcyh0YXJnZXRPYmplY3QpIHtcbiAgICB0aGlzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBjb25zdCBzdGFjayA9IFtub2RlXTtcbiAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICBjb25zdCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVmJyk7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgdGFyZ2V0T2JqZWN0W25hbWVdID0gbmV3IEVsZW1lbnRMaXN0KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbGVtZW50LmNoaWxkcmVuLmxlbmd0aDsgaSs9MSkge1xuICAgICAgICAgIHN0YWNrLnB1c2goZWxlbWVudC5jaGlsZHJlbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciBhbGwgaW1tZWRpYXRlIGNoaWxkcmVuIG9mIGFsbCBub2RlcyBpbiB0aGUgbGlzdFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIGZvckVhY2hDaGlsZChjYWxsYmFjaykge1xuICAgIHRoaXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIC8vIGNvbnZlcnQgRWxlbWVudExpc3QgdG8gYSBzaW1wbGUgYXJyYXkgc2luY2UgdGhlIGNhbGxiYWNrIG1heSBtb2RpZnkgdGhlIGxpc3QgZHVyaW5nIHRoZSBjYWxsYmFja1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlLmNoaWxkTm9kZXMpO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgY2hpbGRyZW5baV0sIGkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB3aGl0ZSBzcGFjZSBzZXBhcmF0ZWQgY2xhc3NlcyB0byBvdXIgZWxlbWVudHMgY2xhc3NMaXN0XG4gICAqL1xuICBhZGRDbGFzc2VzKGNsYXNzZXMpIHtcbiAgICBjbGFzc2VzLnNwbGl0KCcgJylcbiAgICAuZmlsdGVyKGNsYXNzTmFtZSA9PiBjbGFzc05hbWUudHJpbSgpLmxlbmd0aClcbiAgICAuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgdGhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB3aGl0ZSBzcGFjZSBzZXBhcmF0ZWQgY2xhc3MgbmFtZXMgZnJvbSB0aGUgY2xhc3NMaXN0IG9mIGVhY2ggbm9kZVxuICAgKiBAcGFyYW0gY2xhc3Nlc1xuICAgKiBAcmV0dXJucyB7RWxlbWVudExpc3R9XG4gICAqL1xuICByZW1vdmVDbGFzc2VzKGNsYXNzZXMpIHtcbiAgICBjbGFzc2VzLnNwbGl0KCcgJylcbiAgICAuZmlsdGVyKGNsYXNzTmFtZSA9PiBjbGFzc05hbWUudHJpbSgpLmxlbmd0aClcbiAgICAuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgdGhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBhIG5ldyBFbGVtZW50TGlzdCBjb250YWluIGEgZGVlcCBjbG9uZWQgY29weVxuICAgKiBlYWNoIG5vZGVcbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgRWxlbWVudExpc3QoWy4uLnRoaXMubWFwKG4gPT4gbi5jbG9uZU5vZGUodHJ1ZSkpXSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSBnaXZlbiBhdHRyaWJ1dGUgb24gYWxsIG5vZGVzXG4gICAqL1xuICBzZXRBdHRyKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5mb3JFYWNoKG4gPT4gbi5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gdGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICogQHBhcmFtIG5hbWVcbiAgICovXG4gIGdldEF0dHIobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcChuID0+IG4uZ2V0QXR0cmlidXRlKG5hbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY2xhc3MgbWFpbnRhaW5zIGEgc3RhdGljIFdlYWtNYXAgaGFzaCB0aGF0IGNhbiBiZSB1c2VkIHRvIGFzc29jaWF0ZWRcbiAgICogcmFuZG9tIHdpdGggYSBET00gZWxlbWVudC5cbiAgICovXG4gIHNldERhdGEodmFsdWUpIHtcbiAgICB0aGlzLmZvckVhY2gobiA9PiBub2RlTWFwW25dID0gdmFsdWUpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCBvdXIgRE9NIG5vZGVzLiBEYXRhIGlzIHJldHVybmVkXG4gICAqIGFzIGFuIGFycmF5IHdoZXJlIG51bGwgaXMgdXNlZCBmb3IgRE9NIG5vZGVzIHdpdGggbm8gYXNzb2NpYXRlZCBkYXRhLlxuICAgKi9cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAobiA9PiBub2RlTWFwW25dKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsZWQgYWRkRXZlbnRMaXN0ZW5lciBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBsaXN0LFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHBhcmFtIGhhbmRsZXJcbiAgICovXG4gIG9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gIH1cblxuICAvKipcbiAgICogVGhlcmUgYXJlIHRocmVlIHdheXMgdG8gY2FsbCBvZmYuXG4gICAqIDEuIFdpdGggYSBzcGVjaWZpYyBldmVudCBhbmQgaGFuZGxlciAoaWRlbnRpY2FsIHRvIGEgcHJldmlvdXMgY2FsbCB0byAub24pXG4gICAqIDIuIFdpdGgganVzdCBhbiBldmVudCBuYW1lLCBhbGwgaGFuZGxlcnMgZm9yIHRoYXQgZXZlbnQgd2lsbCBiZSByZW1vdmVFdmVudExpc3RlbmVyXG4gICAqIDMuIFdpdGggbm8gcGFyYW1ldGVycywgYWxsIGV2ZW50IGhhbmRsZXJzIHdpbGwgYmUgcmVtb3ZlZFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHBhcmFtIGhhbmRsZXJcbiAgICovXG4gIG9mZihldmVudCwgaGFuZGxlcikge1xuICB9XG59O1xuXG4vKipcbiAqIFdlIGV4cG9ydCBhIGZhY3RvcnkgZnVuY3Rpb24gZm9yIEVsZW1lbnRMaXN0IHNvIHRoZXJlIGlzIG5vIG5lZWQgdG8gdGhlIG5ldyBvcGVyYXRvclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBFbGVtZW50TGlzdCguLi5hcmd1bWVudHMpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvZG9tL2RvbS5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcblxuLyoqXG4gKiBjYWNoZSBmb3IgZWxlbWVudHMgYmFzZWQgb24gdXNlciBzdXBwbGllZCBrZXlzLiBDYWNoZSBjYW4gYmUgY29uZmlndXJlZCB3aXRoXG4gKiBhIHRpbWUgaW50ZXJ2YWwgdXBvbiB3aGljaCB0byBkZWxldGUgZWxlbWVudHMgZnJvbSB0aGUgY2FjaGUgKCBvbmx5IGlmIG5vdCBwcmVzZW50IGluIHRoZSBET00gKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudENhY2hlIHtcblxuICAvKipcbiAgICogaW5pdGlhbGl6ZSB3aXRoIHRpbWUgdG8gbGl2ZS4gTk9URTogQW4gZWxlbWVudCBtdXN0IGJlIGV4cGlyZWQgQU5EIG5vdCBwYXJlbnRlZCBpbnRvIHRoZSBET01cbiAgICogdG8gYmUgcHVyZ2VkIGZyb20gdGhlIGNhY2hlLlxuICAgKiBAcGFyYW0gdHRsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0dGwgPSAxMDAwMCkge1xuICAgIHRoaXMuZW1wdHkoKTtcbiAgICB0aGlzLnR0bCA9IHR0bDtcbiAgICBzZXRJbnRlcnZhbCh0aGlzLnB1cmdlLmJpbmQodGhpcyksIHRoaXMudHRsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwdXJnZSBlbGVtZW50cyB0aGF0IGFyZSBub3QgcGFyZW50ZWQgYW5kIGhhdmUgZXhjZWVkZWQgdGhlIHR0bCBzaW5jZSB0aGV5IHdlcmUgbGFzdCB1c2VkXG4gICAqL1xuICBwdXJnZSgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIC8vIGZpbmQgYWxsIHRoZSBleHBpcmVkIGtleXNcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNhY2hlKS5maWx0ZXIoa2V5ID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5jYWNoZVtrZXldO1xuICAgICAgcmV0dXJuICFlbnRyeS5lbGVtZW50LmVsLnBhcmVudE5vZGUgJiYgKG5vdyAtIGVudHJ5Lmxhc3RSZWZlcmVuY2VkID49IHRoaXMudHRsKTtcbiAgICB9KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBkZWxldGUgdGhpcy5jYWNoZVtrZXldO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0aGUgZWxlbWVudCB1c2luZyB0aGUgZ2l2ZW4ga2V5IG9yIG51bGwgaWYgbm90IHByZXNlbnQuXG4gICAqIElmIHByZXNlbnQgdGhlIGxhc3RSZWZlcmVuY2VkIHRpbWUgb2YgdGhlIHJlc291cmNlIGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSBrZXlcbiAgICovXG4gIGdldEVsZW1lbnQoa2V5KSB7XG4gICAgY29uc3QgZW50cnkgPSAgdGhpcy5jYWNoZVtrZXldO1xuICAgIGlmIChlbnRyeSkge1xuICAgICAgLy8gdXBkYXRlIHRoZSBsYXN0UmVmZXJlbmNlZCB0aW1lIG9mIHRoZSBlbnRyeVxuICAgICAgZW50cnkubGFzdFJlZmVyZW5jZWQgPSBEYXRlLm5vdygpO1xuICAgICAgcmV0dXJuIGVudHJ5LmVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhbiBlbGVtZW50IHRvIHRoZSBjYWNoZSBhbmQgaW5pdGlhbGl6ZSBpdHMgbGFzdFJlZmVyZWNlZCBwcm9wZXJ0eSB0byBub3cuXG4gICAqIE92ZXJ3cml0ZXMgYW55IGV4aXN0aW5nIGVsZW1lbnQgd2l0aCB0aGUgc2FtZSBjYWNoZSBrZXlcbiAgICogQHBhcmFtIGtleVxuICAgKi9cbiAgYWRkRWxlbWVudChrZXksIGVsZW1lbnQpIHtcbiAgICB0aGlzLmNhY2hlW2tleV0gPSBuZXcgQ2FjaGVFbnRyeShrZXksIGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgZ2l2ZW4gZWxlbWVudCBmcm9tIHRoZSBjYWNoZVxuICAgKiBAcGFyYW0ga2V5XG4gICAqL1xuICByZW1vdmVFbGVtZW50KGtleSkge1xuICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XG4gIH1cblxuICAvKipcbiAgICogZW1wdHkgdGhlIGVudGlyZSBjYWNoZVxuICAgKi9cbiAgZW1wdHkoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG59XG5cbi8qKlxuICogaW5kaXZpZHVhbCBlbnRyeSBpbiB0aGUgY2FjaGVcbiAqL1xuY2xhc3MgQ2FjaGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKGtleSwgZWxlbWVudCkge1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5sYXN0UmVmZXJlbmNlZCA9IERhdGUubm93KCk7XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2phdmFzY3JpcHRzL2RvbS9lbGVtZW50Y2FjaGUuanNcbiAqKi8iLCIvKipcbiAqIG1lYXN1cmUgdGhlIHdpZHRoIC8gaGVpZ2h0IG9mIGNoYXJhY3RlcnMgdXNpbmcgdGhlIGV4YWN0IGZvbnQgYW5kIHN0eWxlcyB0aGF0IHdpbGwgYmUgdXNlZCB0byByZW5kZXJcbiAqIHRoZSBzZXF1ZW5jZS4gVGhpcyBzaG91bGQgYmUgY2FsbGVkIG9ubHkgb25jZSB0byBvYnRhaW4gdGhlIHNpemUgc2luY2UgaXQgaXMgY29zdGx5LlxuICogQHJldHVybnMge3t3OiBudW1iZXIsIGg6IG51bWJlcn19XG4gKi9cbmV4cG9ydCBjb25zdCBjaGFyTWVhc3VyZSA9ICgpID0+IHtcbiAgLy8gY3JlYXRlIGEgdGVtcG9yYXJ5IGRpdiBmb3IgbWVhc3VyaW5nIGl0cyBjb250ZW50c1xuICBjb25zdCB0ZXh0RElWID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gIHRleHRESVYuY2xhc3NOYW1lID0gXCJyb2JvdG8gZml4ZWQgZm9udC1zaXplIGlubGluZS1ibG9ja1wiO1xuICB0ZXh0RElWLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0RElWKTtcbiAgLy8gdXNlIGEgcmVwcmVzZW50YXRpdmUgc3RyaW5nIGhvcGluZyBmb3IgdGhlIGJlc3QgYXZlcmFnZVxuICBjb25zdCBwcm9iZSA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkwLTorJztcbiAgdGV4dERJVi5pbm5lckhUTUwgPSBwcm9iZTtcbiAgLy8gbWVhc3VyZSB0aGUgYWN0dWFsIGRpbWVuc2lvbnNcbiAgY29uc3QgcmVzdWx0cyA9IHtcbiAgICB3OnRleHRESVYuY2xpZW50V2lkdGggLyBwcm9iZS5sZW5ndGgsXG4gICAgaDp0ZXh0RElWLmNsaWVudEhlaWdodCxcbiAgfTtcbiAgLy8gZGlzcG9zZSBESVYgb25jZSB3ZSBoYXZlIG1lYXN1cmVkXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dERJVik7XG4gIHJldHVybiByZXN1bHRzO1xufTtcbiAgXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qYXZhc2NyaXB0cy92aWV3ZXIvY2hhcm1lYXN1cmUuanNcbiAqKi8iLCJpbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgRCBmcm9tICcuLi9kb20vZG9tJztcbmltcG9ydCBNb3VzZVRyYXAgZnJvbSAnLi4vaW5wdXQvbW91c2V0cmFwJztcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuLi9nZW9tZXRyeS92ZWN0b3IyZCc7XG5pbXBvcnQgQm94MkQgZnJvbSAnLi4vZ2VvbWV0cnkvYm94MmQnO1xuaW1wb3J0IFN0YXR1c0JhciBmcm9tICcuL3N0YXR1cy1iYXInO1xuXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuLyoqXG4gKiBQaXhlbHMgZnJvbSB0b3Agb3IgYm90dG9tIG9mIGNsaWVudCB3aGVyZSBhdXRvc2Nyb2xsaW5nIGlzIHRyaWdnZXJlZFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuY29uc3Qga0FVVE9TQ1JPTEwgPSAzMDtcblxuLyoqXG4gKiB2aWV3cG9ydCByZXNpemVzIGFyZSB0aHJvdHRsZWQgdG8gdGhpcyBudW1iZXIgb2YgTVNcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmNvbnN0IGtSRVNJWkUgPSAxMDA7XG5cbi8qKlxuICogbW91c2Ugd2hlZWwgZXZlbnRzIGFyZSB0aHJvdHRsZXMgdG8gdGhpcyBpbnRlcnZhbFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuY29uc3Qga1dIRUVMID0gNzU7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgdmlld2VyOiBudWxsLFxuICAgIH0sIG9wdGlvbnMpO1xuICAgIHRoaXMudmlld2VyID0gdGhpcy5vcHRpb25zLnZpZXdlcjtcbiAgICBpbnZhcmlhbnQodGhpcy52aWV3ZXIsICd2aWV3ZXIgbXVzdCBiZSBzdXBwbGllZCB0byB1c2VyIGludGVyZmFjZScpO1xuXG4gICAgdGhpcy5sYXllciA9IEQoJzxkaXYgY2xhc3M9XCJ1c2VyaW50ZXJmYWNlXCI+PC9kaXY+Jyk7XG4gICAgdGhpcy52aWV3ZXIub3V0ZXIuZWwuYXBwZW5kQ2hpbGQodGhpcy5sYXllci5lbCk7XG5cbiAgICB0aGlzLnN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXIodGhpcy52aWV3ZXIpO1xuXG4gICAgLy8gc2V0dXAgbW91c2UgaW50ZXJmYWNlXG4gICAgdGhpcy5tb3VzZVRyYXAgPSBuZXcgTW91c2VUcmFwKHtcbiAgICAgIGVsZW1lbnQgICAgOiB0aGlzLmxheWVyLmVsLFxuICAgICAgbW91c2VEb3duICA6IHRoaXMubW91c2VEb3duLmJpbmQodGhpcyksXG4gICAgICBtb3VzZVVwICAgIDogdGhpcy5tb3VzZVVwLmJpbmQodGhpcyksXG4gICAgICBtb3VzZU1vdmUgIDogdGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKSxcbiAgICAgIG1vdXNlRHJhZyAgOiB0aGlzLm1vdXNlRHJhZy5iaW5kKHRoaXMpLFxuICAgICAgbW91c2VMZWF2ZSA6IHRoaXMubW91c2VMZWF2ZS5iaW5kKHRoaXMpLFxuICAgICAgbW91c2VXaGVlbCA6IF8udGhyb3R0bGUodGhpcy5tb3VzZVdoZWVsLmJpbmQodGhpcyksIGtXSEVFTCwge3RyYWlsaW5nOiBmYWxzZX0pLFxuICAgICAgZG91YmxlQ2xpY2s6IHRoaXMuZG91YmxlQ2xpY2suYmluZCh0aGlzKSxcbiAgICB9KTtcblxuICAgIC8vIHJlc2l6ZSByZXF1aXJlcyBhbiB1cGRhdGVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyID0gXy50aHJvdHRsZSh0aGlzLm9uUmVzaXplLmJpbmQodGhpcyksIGtSRVNJWkUpKTtcblxuICAgIC8vIC8vIHRvZ2dsZSByZXZlcnNlIHN0cmFuZFxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGVSZXZlcnNlU3RyYW5kJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy8gICB0aGlzLnZpZXdlci5zaG93UmV2ZXJzZVN0cmFuZCghdGhpcy52aWV3ZXIuc2hvd1JldmVyc2VTdHJhbmQoKSk7XG4gICAgLy8gICB0aGlzLnZpZXdlci5tYXBEYXRhU2V0KCk7XG4gICAgLy8gICB0aGlzLnZpZXdlci5yZW5kZXIoKTtcbiAgICAvLyB9KTtcbiAgICAvL1xuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdFJvdycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIC8vICAgdGhpcy52aWV3ZXIuZmlyc3RSb3cgPSAwO1xuICAgIC8vICAgdGhpcy52aWV3ZXIucmVuZGVyKCk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGFzdFJvdycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIC8vICAgdGhpcy52aWV3ZXIuZmlyc3RSb3cgPSB0aGlzLnZpZXdlci5yb3dMaXN0Lmxlbmd0aCAtIDE7XG4gICAgLy8gICB0aGlzLnZpZXdlci5yZW5kZXIoKTtcbiAgICAvLyB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFudXBcbiAgICovXG4gIGRpc3Bvc2UoKSB7XG4gICAgaW52YXJpYW50KCF0aGlzLmRpc3Bvc2VkLCAnQWxyZWFkeSBkaXNwb3NlZCcpO1xuICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICAgIHRoaXMubW91c2VUcmFwLmRpc3Bvc2UoKTtcbiAgfVxuICAvKipcbiAgICogdGhyb3R0bGVkIHdpbmRvdyByZXNpemVcbiAgICovXG4gIG9uUmVzaXplKCkge1xuICAgIGludmFyaWFudCghdGhpcy52aWV3ZXIuZGlzcG9zZWQsICd2aWV3ZXIgaGFzIGJlZW4gZGlzcG9zZWQnKTtcbiAgICB0aGlzLnZpZXdlci5yZXNpemVkKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFubm90YXRpb24gaWYgZGlyZWN0bHkgY2xpY2tlZCBvciByYW5nZSBvZiBjbGlja2VkIGFubm90YXRpb25cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBsb2NhbFBvc2l0aW9uXG4gICAqL1xuICBkb3VibGVDbGljayhldmVudCwgbG9jYWwpIHtcblxuICAgIGNvbnN0IGluZm8gPSB0aGlzLmxvY2FsVG9Sb3dEZXRhaWxzKGxvY2FsKTtcbiAgICBpZiAoaW5mbykge1xuICAgICAgc3dpdGNoIChpbmZvLmxvY2F0aW9uKSB7XG5cbiAgICAgIGNhc2UgJ2Fubm90YXRpb24nOlxuICAgICAgICB0aGlzLnZpZXdlci5zZWxlY3RBbm5vdGF0aW9uKGluZm8uYW5ub3RhdGlvbi5pZCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdibG9jayc6XG4gICAgICAgIHRoaXMudmlld2VyLnNlbGVjdEJsb2NrKGluZm8uYmxvY2tJbmZvLmJsb2NrLmlkKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKCk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgdGhpcy52aWV3ZXIucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogbW91c2Ugd2hlZWwgaGFuZGxlclxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG1vdXNlV2hlZWwoZXZlbnQsIGxvY2FsUG9zaXRpb24sIG5vcm1hbGl6ZWQpIHtcbiAgICAvLyBpZ25vcmUgaWYgbm8geSBjb21wb25lbnRcbiAgICBpZiAobm9ybWFsaXplZC5zcGluWSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzYXZlIGN1cnJlbnQgZmlyc3RSb3cgc28gd2UgY2FuIGRldGVybWluZSBpZiBhbnl0aGluZyBjaGFuZ2VkXG4gICAgY29uc3QgZmlyc3RSb3cgPSB0aGlzLnZpZXdlci5maXJzdFJvdztcbiAgICAvLyBzcGluWSBpcyBhIGZsb2F0IDAuLm5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBNYXRoLmFicyhub3JtYWxpemVkLnNwaW5ZKTsgaSArPSAxKSB7XG4gICAgICBpZiAobm9ybWFsaXplZC5zcGluWSA8IDApIHtcbiAgICAgICAgdGhpcy52aWV3ZXIucHJldmlvdXNSb3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld2VyLm5leHRSb3coKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgYW55dGhpbmcgY2hhbmdlZCB1cGRhdGVcbiAgICBpZiAodGhpcy52aWV3ZXIuZmlyc3RSb3cgIT09IGZpcnN0Um93KSB7XG4gICAgICAvLyBwYXNzIHdoZWVsIGV2ZW50IHRocm91Z2ggdG8gbW91c2UgbW92ZVxuICAgICAgdGhpcy5tb3VzZU1vdmUoZXZlbnQsIGxvY2FsUG9zaXRpb24pO1xuICAgICAgLy8gcmVkcmF3XG4gICAgICB0aGlzLnZpZXdlci5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FuY2VsIGF1dG9zY3JvbGwgaWYgcnVubmluZ1xuICAgKi9cbiAgc3RvcEF1dG9TY3JvbGwoKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmF1dG9TY3JvbGxJZCk7XG4gICAgdGhpcy5hdXRvU2Nyb2xsSWQgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIG1vdXNlIGRvd24gaGFuZGxlciBmcm9tIG1vdXNlIHRyYXAuXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gbG9jYWxcbiAgICovXG4gIG1vdXNlRG93bihldmVudCwgbG9jYWwpIHtcbiAgICB0aGlzLmN1cnNvciA9IG51bGw7XG4gICAgY29uc3QgYm8gPSB0aGlzLmxvY2FsVG9CbG9ja09mZnNldChsb2NhbCk7XG4gICAgaWYgKGJvKSB7XG4gICAgICB0aGlzLmFuY2hvciA9IGJvO1xuICAgICAgdGhpcy5sb2NhbE1vdXNlUHJldmlvdXNEcmFnID0gbG9jYWw7XG4gICAgICB0aGlzLnNldFNlbGVjdGlvbihibyk7XG4gICAgICB0aGlzLnN0b3BBdXRvU2Nyb2xsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKCk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogY2FuY2FsIGF1dG8gc2Nyb2xsIHdoZW4gbW91c2UgcmVsZWFzZWRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBsb2NhbFxuICAgKi9cbiAgbW91c2VVcChldmVudCwgbG9jYWwpIHtcbiAgICB0aGlzLnN0b3BBdXRvU2Nyb2xsKCk7XG4gIH1cblxuICAvKipcbiAgICogYXV0b3Njcm9sbCB1cCBvciBkb3duIGFjY29yZGluZyB0byBsb2NhdGlvbiBvZiBtb3VzZS5cbiAgICovXG4gIGF1dG9TY3JvbGwoKSB7XG4gICAgY29uc3QgYiA9IHRoaXMubGF5ZXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKHRoaXMubG9jYWxNb3VzZVByZXZpb3VzRHJhZy55IDwga0FVVE9TQ1JPTEwpIHtcbiAgICAgIHRoaXMudmlld2VyLnByZXZpb3VzUm93KCk7XG4gICAgICB0aGlzLm1vdXNlRHJhZyhudWxsLCB0aGlzLmxvY2FsTW91c2VQcmV2aW91c0RyYWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5sb2NhbE1vdXNlUHJldmlvdXNEcmFnLnkgPj0gKGIuYm90dG9tIC0gYi50b3ApIC0ga0FVVE9TQ1JPTEwpIHtcbiAgICAgICAgdGhpcy52aWV3ZXIubmV4dFJvdygpO1xuICAgICAgICB0aGlzLm1vdXNlRHJhZyhudWxsLCB0aGlzLmxvY2FsTW91c2VQcmV2aW91c0RyYWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgc2VsZWN0aW9uIGFzIHVzZXIgZHJhZ3NcbiAgICovXG4gIG1vdXNlRHJhZyhldmVudCwgbG9jYWwpIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMubG9jYWxNb3VzZVByZXZpb3VzRHJhZyA9IGxvY2FsO1xuICAgICAgY29uc3QgYm8gPSB0aGlzLmxvY2FsVG9CbG9ja09mZnNldChsb2NhbCk7XG4gICAgICBpZiAoYm8pIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24odGhpcy5hbmNob3IsIGJvKTtcbiAgICAgIH1cbiAgICAgIC8vIHN0YXJ0IGF1dG8gc2Nyb2xsIGlmIG5vdCBhbHJlYWR5XG4gICAgICBpZiAoIXRoaXMuYXV0b1Njcm9sbElkKSB7XG4gICAgICAgIHRoaXMuYXV0b1Njcm9sbElkID0gd2luZG93LnNldEludGVydmFsKHRoaXMuYXV0b1Njcm9sbC5iaW5kKHRoaXMpLCAxMDApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnZpZXdlci5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtb3VzZSBtb3ZlLCB3aGljaCBzaG91bGQgb25seSBvY2N1ciBpZiBub3QgZHJhZ2dpbmcgKCBzZWxlY3RpbmcgKVxuICAgKi9cbiAgbW91c2VNb3ZlKGV2ZW50LCBsb2NhbCkge1xuICAgIC8vIHRoZSBjdXJzb3IgaXMgc3RvcmVkIGluIGNsaWVudCBhcmVhIGNvbHVtbi9yb3dcbiAgICBsZXQgdiA9IHRoaXMubG9jYWxUb0NvbHVtblJvdyhsb2NhbCk7XG4gICAgaWYgKCF2KSB7XG4gICAgICB0aGlzLmN1cnNvciA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3Vyc29yID0gdi5zdWIobmV3IFZlY3RvcjJEKDAsIHRoaXMudmlld2VyLmZpcnN0Um93KSk7XG4gICAgfVxuICAgIHRoaXMuY2xhbXBDdXJzb3IoKTtcbiAgICB0aGlzLnJlbmRlckN1cnNvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhpZGUgY3Vyc29yIG9uIG1vdXNlIGxlYXZlXG4gICAqL1xuICBtb3VzZUxlYXZlKCkge1xuICAgIHRoaXMuaGlkZUN1cnNvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhpZGUgdGhlIGN1cnNvclxuICAgKi9cbiAgaGlkZUN1cnNvcigpIHtcbiAgICB0aGlzLmN1cnNvciA9IG51bGw7XG4gICAgdGhpcy5yZW5kZXJDdXJzb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBlbnN1cmUgdGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGlzIHN0aWxsIHdpdGhpbiB0aGUgZGF0YSByYW5nZVxuICAgKi9cbiAgY2xhbXBDdXJzb3IoKSB7XG4gICAgaWYgKHRoaXMuY3Vyc29yKSB7XG4gICAgICBjb25zdCBjbGllbnRUb3AgPSBuZXcgVmVjdG9yMkQoMCwgdGhpcy52aWV3ZXIuZmlyc3RSb3cpO1xuICAgICAgbGV0IGJsb2NrT2Zmc2V0ID0gdGhpcy5jb2x1bW5Sb3dUb0Jsb2NrT2Zmc2V0KHRoaXMuY3Vyc29yLmFkZChjbGllbnRUb3ApKTtcbiAgICAgIGlmICghYmxvY2tPZmZzZXQpIHtcbiAgICAgICAgLy8gY2xhbXAgdG8gbGFzdCBjaGFyYWN0ZXIgb2YgbGFzdCBibG9ja1xuICAgICAgICBjb25zdCBibG9jayA9IHRoaXMudmlld2VyLmJsb2NrTGlzdFt0aGlzLnZpZXdlci5ibG9ja0xpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgIGJsb2NrT2Zmc2V0ID0ge1xuICAgICAgICAgIGJsb2NrLFxuICAgICAgICAgIGJsb2NrT2Zmc2V0OiB0aGlzLnZpZXdlci5ibG9ja0Rpc3BsYXlMZW5ndGgoYmxvY2spIC0gMSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jdXJzb3IgPSB0aGlzLmJsb2NrT2Zmc2V0VG9Db2x1bW5Sb3coYmxvY2tPZmZzZXQpLnN1YihjbGllbnRUb3ApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIGxvY2FsIGNvb3JkaW5hdGVzIGFuZCByZXR1cm5zIGFzIGEgY29sdW1uL3JvdyB2ZWN0b3JcbiAgICogQHBhcmFtIHZlY3RvclxuICAgKi9cbiAgbG9jYWxUb0NvbHVtblJvdyh2ZWN0b3IpIHtcblxuICAgIC8vIGdldCBhbmQgdGVzdCByb3cgZmlyc3RcbiAgICBjb25zdCByb3cgPSB0aGlzLnZpZXdlci5nZXRSb3dJbmRleEZyb21ZKHZlY3Rvci55KTtcbiAgICBpZiAocm93IDwgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIGdldCBhbmQgdGVzdCBjb2x1bW5cbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLnZpZXdlci5nZXRDb2x1bW5JbmRleEZyb21YKHZlY3Rvci54LCByb3cpO1xuICAgIGlmIChjb2x1bW4gPCAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gYm90aCBhcmUgd2l0aGluIHRoZSBkYXRhIHNldFxuICAgIHJldHVybiBuZXcgVmVjdG9yMkQoY29sdW1uLCByb3cpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBkZXRhaWxlZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY29sdW1uIC8gcm93IGNsaWNrZWQgYW5kIHdoYXQgZXhhY3RseSBpc1xuICAgKiBhdCB0aGUgbG9jYXRpb24uIFVzZWQgZm9yIG9wZXJhdGlvbiBsaWtlIGRvdWJsZSBjbGljayB3aGVyZSB3ZSBuZWVkIHRvIGtub3dcbiAgICogaWYgdGhlIHVzZXIgY2xpY2tlZCBhbiBhbm5vdGF0aW9uIG9yIHRoZSBibG9jay5cbiAgICogUmV0dXJuczpcbiAgICogSWYgdGhlIHBvaW50IGlzIHdpdGhpbiBhIGNvbHVtbiBhbmQgcm93IHdlIHJldHVyblxuICAgKiB7XG4gICAqICByb3c6IG51bWJlcixcbiAgICogIGNvbHVtbjogbnVtYmVyLFxuICAgKiAgbG9jYXRpb246IG9uZSBvZiBbJ3NlcXVlbmNlJywgJ3NlcGFyYXRvcicsICdyZXZlcnNlJywgJ2Jsb2NrJywgJ2Fubm90YXRpb24nLCAncnVsZXInXVxuICAgKiAgYmxvY2s6IGlmIGxvY2F0aW9uID09PSAnYmxvY2snIHRoaXMgaXMgdGhlIGJsb2NrSW5mb1xuICAgKiAgYW5ub3RhdGlvbjogaWYgbG9jYXRpb24gPT09ICdhbm5vdGF0aW9uJyB0aGlzIGlzIHRoZSBhbm5vdGF0aW9uSW5mb1xuICAgKiB9XG4gICAqXG4gICAqIEBwYXJhbSB2ZWN0b3JcbiAgICovXG4gIGxvY2FsVG9Sb3dEZXRhaWxzKHZlY3Rvcikge1xuICAgIGNvbnN0IGNvbHVtblJvdyA9IHRoaXMubG9jYWxUb0NvbHVtblJvdyh2ZWN0b3IpO1xuICAgIGxldCBpbmZvID0gbnVsbDtcbiAgICBpZiAoY29sdW1uUm93KSB7XG4gICAgICAvLyBpbml0aWFsaXplIGluZm8gd2l0aCBjb2x1bW4gYW5kIHJvd1xuICAgICAgaW5mbyA9IHtjb2x1bW46IGNvbHVtblJvdy54LCByb3c6IGNvbHVtblJvdy55fTtcbiAgICAgIC8vIGxvY2F0aW9uIGlzIHZhbGlkLCBmaWd1cmUgb3V0IHdoZXJlIHRoZSB1c2VyIGNsaWNrZWQuXG4gICAgICBjb25zdCBib3ggPSB0aGlzLnZpZXdlci5nZXRSb3dCb3VuZHMoY29sdW1uUm93LnkpO1xuICAgICAgLy8gY2xpY2sgd2FzIHdpdGhpbiB0aGUgc2VxdWVuY2Ugcm93P1xuICAgICAgaWYgKHZlY3Rvci55IDwgYm94LnkgKyB0aGlzLnZpZXdlci5nZXRDaGFySGVpZ2h0KCkpIHtcbiAgICAgICAgaW5mby5sb2NhdGlvbiA9ICdzZXF1ZW5jZSc7XG4gICAgICB9XG4gICAgICAvLyBjbGljayB3YXMgd2l0aGluIHNlcGFyYXRvciByb3c/XG4gICAgICBpZiAoIWluZm8ubG9jYXRpb24gJiYgdmVjdG9yLnkgPCBib3gueSArIHRoaXMudmlld2VyLmdldENoYXJIZWlnaHQoKSAqIDIpIHtcbiAgICAgICAgaW5mby5sb2NhdGlvbiA9ICdzZXBhcmF0b3InO1xuICAgICAgfVxuICAgICAgLy8gcmV2ZXJzZSBzdHJhbmQgaWYgcHJlc2VudFxuICAgICAgaWYgKCFpbmZvLmxvY2F0aW9uICYmIHRoaXMudmlld2VyLm9wdGlvbnMucmV2ZXJzZSAmJiB2ZWN0b3IueSA8IGJveC55ICsgdGhpcy52aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICogMykge1xuICAgICAgICBpbmZvLmxvY2F0aW9uID0gJ3JldmVyc2UnO1xuICAgICAgfVxuICAgICAgLy8gYmxvY2s/XG4gICAgICBsZXQgeU9mZnNldCA9IHRoaXMudmlld2VyLm9wdGlvbnMucmV2ZXJzZSA/IHRoaXMudmlld2VyLmdldENoYXJIZWlnaHQoKSAqIDQgOiB0aGlzLnZpZXdlci5nZXRDaGFySGVpZ2h0KCkgKiAzO1xuICAgICAgaWYgKCFpbmZvLmxvY2F0aW9uICYmIHZlY3Rvci55IDwgYm94LnkgKyB5T2Zmc2V0KSB7XG4gICAgICAgIGluZm8ubG9jYXRpb24gPSAnYmxvY2snO1xuICAgICAgICBpbmZvLmJsb2NrSW5mbyA9IHRoaXMuY29sdW1uUm93VG9CbG9ja09mZnNldChjb2x1bW5Sb3cpO1xuICAgICAgfVxuICAgICAgLy8gb25lIG9mIHRoZSBhbm5vdGF0aW9ucz9cbiAgICAgIGlmICghaW5mby5sb2NhdGlvbikge1xuICAgICAgICAvLyBnZXQgZmlyc3Qgcm93IGZvciBhbm5vdGF0aW9uc1xuICAgICAgICBjb25zdCBzdGFydFJvdyA9IHRoaXMudmlld2VyLm9wdGlvbnMucmV2ZXJzZSA/IDQgOiAzO1xuICAgICAgICAvLyBzZWFyY2ggZm9yIGFuIGFubm90YXRpb24gY29udGFpbmluZyB0aGUgeC95IHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IHJvd0luZm8gPSB0aGlzLnZpZXdlci5yb3dMaXN0W2NvbHVtblJvdy55XTtcbiAgICAgICAgaWYgKHJvd0luZm8uYW5ub3RhdGlvblJlY29yZHMpIHtcbiAgICAgICAgICBjb25zdCBhUmVjb3JkID0gcm93SW5mby5hbm5vdGF0aW9uUmVjb3Jkcy5maW5kKGFSZWNvcmQgPT4ge1xuICAgICAgICAgICAgY29uc3QgYUJveCA9IG5ldyBCb3gyRChcbiAgICAgICAgICAgICAgYVJlY29yZC5zdGFydCAqIHRoaXMudmlld2VyLmdldENoYXJXaWR0aCgpLFxuICAgICAgICAgICAgICAoc3RhcnRSb3cgKyBhUmVjb3JkLmRlcHRoKSAqIHRoaXMudmlld2VyLmdldENoYXJIZWlnaHQoKSxcbiAgICAgICAgICAgICAgKGFSZWNvcmQuZW5kIC0gYVJlY29yZC5zdGFydCkgKiB0aGlzLnZpZXdlci5nZXRDaGFyV2lkdGgoKSxcbiAgICAgICAgICAgICAgdGhpcy52aWV3ZXIuZ2V0Q2hhckhlaWdodCgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGFCb3gucG9pbnRJbkJveChuZXcgVmVjdG9yMkQodmVjdG9yLngsIHZlY3Rvci55IC0gYm94LnkpKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGRpZCB3ZSBoaXQgYW4gYW5ub3RhdGlvbiA/XG4gICAgICAgICAgaWYgKGFSZWNvcmQpIHtcbiAgICAgICAgICAgIGluZm8ubG9jYXRpb24gPSAnYW5ub3RhdGlvbic7XG4gICAgICAgICAgICBpbmZvLmFubm90YXRpb24gPSBhUmVjb3JkLmFubm90YXRpb247XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB0ZXN0IGZvciBydWxlciwgd2hpY2ggaXMgYmVsb3cgZXZlcnl0aGluZyBlbHNlXG4gICAgICBpZiAoIWluZm8ubG9jYXRpb24pIHtcbiAgICAgICAgLy8gdGFrZSBpbnRvIGFjY291bnQgZGVwdGggb2YgYW5ub3RhdGlvbiBuZXN0ZWQgYW4gMS8yIGNoYXIgdmVydGljYWwgcGFkZGluZyBiZWZvcmUgcnVsZXJcbiAgICAgICAgY29uc3QgYURlcHRoID0gdGhpcy52aWV3ZXIucm93TGlzdFtjb2x1bW5Sb3cueV0uYW5ub3RhdGlvbkRlcHRoICsgMC41O1xuICAgICAgICBsZXQgeU9mZnNldCA9IChhRGVwdGggKyAodGhpcy52aWV3ZXIub3B0aW9ucy5yZXZlcnNlID8gNCA6IDMpKSAqIHRoaXMudmlld2VyLmdldENoYXJIZWlnaHQoKTtcbiAgICAgICAgaWYgKCFpbmZvLmxvY2F0aW9uICYmIHZlY3Rvci55ID49IGJveC55ICsgeU9mZnNldCkge1xuICAgICAgICAgIGluZm8ubG9jYXRpb24gPSAncnVsZXInO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0aGUgYmxvY2sgYW5kIG9mZnNldCBpbnRvIHRoZSBibG9jayBkZW5vdGVkIGJ5IHRoZSBnaXZlblxuICAgKiBjb2x1bW4vcm93IHZlY3RvclxuICAgKiBAcGFyYW0gdmVjdG9yXG4gICAqL1xuICBjb2x1bW5Sb3dUb0Jsb2NrT2Zmc2V0KHZlY3Rvcikge1xuICAgIC8vIGdldCBhbGwgdGhlIHJlY29yZHMgZm9yIHRoZSByb3dcbiAgICBjb25zdCByb3dJbmZvID0gdGhpcy52aWV3ZXIucm93TGlzdFt2ZWN0b3IueV07XG4gICAgLy8gb3V0IG9mIGJvdW5kc1xuICAgIGlmICghcm93SW5mbykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCByb3cgcmVjb3JkcyB0byBmaW5kIHRoZSBhbnN3ZXJcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd0luZm8uYmxvY2tSZWNvcmRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpbmZvID0gcm93SW5mby5ibG9ja1JlY29yZHNbaV07XG4gICAgICBpZiAodmVjdG9yLnggPCBvZmZzZXQgKyBpbmZvLmxlbmd0aCkge1xuICAgICAgICAvLyBmYWxscyB3aXRoaW4gdGhpcyBibG9ja1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGJsb2NrICAgICAgOiBpbmZvLmJsb2NrLFxuICAgICAgICAgIGJsb2NrT2Zmc2V0OiB2ZWN0b3IueCAtIG9mZnNldCArIGluZm8uc3RhcnRCbG9ja09mZnNldCxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZnNldCArPSBpbmZvLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgaGVyZSB0aGUgdXNlciBjbGlja2VkIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsYXN0IGJsb2NrXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydCBhIGJsb2NrIGFuZCBibG9jayBvZmZzZXQgaW50byBhIGNvbHVtbiBhbmQgcm93IGkuZS4gdGFrZXMgdGhlIG91dHB1dCBvZiBjb2x1bW5Ub0Jsb2NrT2Zmc2V0XG4gICAqIGFuZCBjb252ZXJ0cyBpdCBiYWNrIHRvIGEgY29sdW1uL3JvdyB2ZWN0b3JcbiAgICogQHBhcmFtIGluZm9cbiAgICovXG4gIGJsb2NrT2Zmc2V0VG9Db2x1bW5Sb3coaW5mbykge1xuICAgIC8vIGdldCB0aGUgc3RhcnRpbmcgLyBlbmQgcm93IGFuZCBjb2x1bW4gZm9yIHRoZSBibG9ja1xuICAgIGNvbnN0IGJsb2NrSW5mbyA9IHRoaXMudmlld2VyLmJsb2NrUm93TWFwW2luZm8uYmxvY2suaWRdO1xuICAgIGNvbnN0IHJvdyA9IGJsb2NrSW5mby5zdGFydFJvdyArICgoYmxvY2tJbmZvLnN0YXJ0Um93T2Zmc2V0ICsgaW5mby5ibG9ja09mZnNldCkgLyB0aGlzLnZpZXdlci5yb3dMZW5ndGggPj4gMCk7XG4gICAgY29uc3QgY29sID0gKGJsb2NrSW5mby5zdGFydFJvd09mZnNldCArIGluZm8uYmxvY2tPZmZzZXQpICUgdGhpcy52aWV3ZXIucm93TGVuZ3RoO1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQoY29sLCByb3cpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnQgbG9jYWwgbW91c2UgY29vcmRpbmF0ZXMgZGlyZWN0bHkgaW50byBibG9jay9ibG9ja09mZnNldCB3aXRoIGNsYW1waW5nIGFzIHJlcXVlc3RlZCBieSB1c2VyXG4gICAqIEBwYXJhbSBsb2NhbFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGxvY2FsVG9CbG9ja09mZnNldChsb2NhbCkge1xuICAgIGNvbnN0IHYgPSB0aGlzLmxvY2FsVG9Db2x1bW5Sb3cobG9jYWwpO1xuICAgIHJldHVybiB2ID8gdGhpcy5jb2x1bW5Sb3dUb0Jsb2NrT2Zmc2V0KHYpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgYWxsIHVzZXIgaW50ZXJmYWNlIGNvbXBvbmVudHNcbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICAvL2NvbnNvbGUudGltZSgnUmVuZGVyIFVJJyk7XG4gICAgdGhpcy5yZW5kZXJDdXJzb3IoKTtcbiAgICB0aGlzLnJlbmRlclNlbGVjdGlvbigpO1xuICAgIC8vY29uc29sZS50aW1lRW5kKCdSZW5kZXIgVUknKVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbmRlciB0aGUgY3Vyc29yXG4gICAqL1xuICByZW5kZXJDdXJzb3IoKSB7XG4gICAgLy8gY3Vyc29yIGlzIGRlZmluZWQgYnkgYmxvY2sgYW5kIG9mZnNldFxuICAgIGlmICh0aGlzLmN1cnNvcikge1xuICAgICAgLy8gY3JlYXRlIERPTSBhcyBuZWNlc3NhcnkgYW5kIHVwZGF0ZVxuICAgICAgaWYgKCF0aGlzLmN1cnNvckVsKSB7XG4gICAgICAgIHRoaXMuY3Vyc29yRWwgPSBEKCc8ZGl2IGNsYXNzPVwiY3Vyc29yXCI+PC9kaXY+Jyk7XG4gICAgICAgIHRoaXMubGF5ZXIuYXBwZW5kQ2hpbGQodGhpcy5jdXJzb3JFbCk7XG4gICAgICB9XG4gICAgICBjb25zdCBib3ggPSB0aGlzLnZpZXdlci5nZXRSb3dCb3VuZHModGhpcy5jdXJzb3IueSArIHRoaXMudmlld2VyLmZpcnN0Um93KTtcbiAgICAgIHRoaXMuY3Vyc29yRWwuc2V0U3R5bGVzKHtcbiAgICAgICAgbGVmdCAgOiB0aGlzLnZpZXdlci5nZXRDaGFyV2lkdGgoKSAqIHRoaXMuY3Vyc29yLnggKyAncHgnLFxuICAgICAgICB0b3AgICA6IGJveC55ICsgJ3B4JyxcbiAgICAgICAgd2lkdGggOiB0aGlzLnZpZXdlci5nZXRDaGFyV2lkdGgoKSArICdweCcsXG4gICAgICAgIGhlaWdodDogYm94LmhlaWdodCAtIHRoaXMudmlld2VyLmdldENoYXJIZWlnaHQoKSAqIDMuNSArICdweCcsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldFBvc2l0aW9uKCh0aGlzLmN1cnNvci55ICsgdGhpcy52aWV3ZXIuZmlyc3RSb3cpICogdGhpcy52aWV3ZXIucm93TGVuZ3RoICsgdGhpcy5jdXJzb3IueCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIGN1cnNvciBkZWZpbmVkIHJlbW92ZSBET00gaWYgcHJlc2VudFxuICAgICAgaWYgKHRoaXMuY3Vyc29yRWwpIHtcbiAgICAgICAgdGhpcy5jdXJzb3JFbC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jdXJzb3JFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdHVzQmFyLnNldFBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbmRlciB0aGUgY3VycmVudCBzZWxlY3Rpb24gaW50byB0aGUgdmlld2VycyBET01cbiAgICovXG4gIHJlbmRlclNlbGVjdGlvbigpIHtcbiAgICAvLyByZW1vdmUgZXhpc3Rpbmcgc2VsZWN0aW9uIGVsZW1lbnRzXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uRWxlbWVudHMpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbGVjdGlvbkVsZW1lbnRzID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAvLyBvbmx5IGRpc3BsYXkgc2VsZWN0aW9uIGJvZHkgaWYgdGhlcmUgaXMgYSByYW5nZVxuICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmNvbHVtblJvd0VuZCkge1xuICAgICAgICAvLyBnZXQgdGhlIHJhbmdlIG9mIHRoZSBzZWxlY3Rpb24gYW5kIGNsYW1wIHRvIHRoZSBjdXJyZW50IGJvdW5kcyBvZiB0aGUgY2xpZW50IGFyZWFcbiAgICAgICAgY29uc3Qgdmlld2VyRmlyc3RSb3cgPSB0aGlzLnZpZXdlci5maXJzdFJvdztcbiAgICAgICAgY29uc3Qgdmlld2VyTGFzdFJvdyA9IHRoaXMudmlld2VyLmZpcnN0Um93ICsgdGhpcy52aWV3ZXIucm93c1Zpc2libGUoKTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBNYXRoLm1heCh0aGlzLnNlbGVjdGlvbi5jb2x1bW5Sb3dTdGFydC55LCB2aWV3ZXJGaXJzdFJvdyk7XG4gICAgICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHRoaXMuc2VsZWN0aW9uLmNvbHVtblJvd0VuZC55LCB2aWV3ZXJMYXN0Um93KTtcbiAgICAgICAgLy8gaWYgYW55IG9mIHRoZSByYW5nZSBpcyB2aXNpYmxlIHRoZW4gZGlzcGxheSBpdFxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IEQoJzxkaXYgY2xhc3M9XCJzZWxlY3Rpb24tYm94XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgY29uc3QgYm94ID0gdGhpcy52aWV3ZXIuZ2V0Um93Qm91bmRzKGkpO1xuICAgICAgICAgIC8vIGlnbm9yZSBpZiByb3cgbm90IHZpc2libGVcbiAgICAgICAgICBpZiAoIWJveC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIC8vIGFkanVzdCBib3ggaWYgdGhpcyBpcyB0aGUgZmlyc3Qgcm93IGFuZCBhZGQgbGVmdCBib3JkZXIgY2xhc3NcbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnNlbGVjdGlvbi5jb2x1bW5Sb3dTdGFydC55KSB7XG4gICAgICAgICAgICAgIGJveC54ID0gdGhpcy5zZWxlY3Rpb24uY29sdW1uUm93U3RhcnQueCAqIHRoaXMudmlld2VyLmdldENoYXJXaWR0aCgpO1xuICAgICAgICAgICAgICBib3gudyA9ICh0aGlzLnZpZXdlci5yb3dMZW5ndGggLSB0aGlzLnNlbGVjdGlvbi5jb2x1bW5Sb3dTdGFydC54KSAqIHRoaXMudmlld2VyLmdldENoYXJXaWR0aCgpO1xuICAgICAgICAgICAgICBlbC5hZGRDbGFzc2VzKCdsZWZ0LWVkZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkanVzdCBib3ggYWdhaW4gaWYgdGhpcyBpcyB0aGUgbGFzdCByb3cgYW5kIGFkZCByaWdodCBlZGdlIGNzcyBjbGFzc1xuICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMuc2VsZWN0aW9uLmNvbHVtblJvd0VuZC55KSB7XG4gICAgICAgICAgICAgIGJveC53IC09ICh0aGlzLnZpZXdlci5yb3dMZW5ndGggLSB0aGlzLnNlbGVjdGlvbi5jb2x1bW5Sb3dFbmQueCAtIDEpICogdGhpcy52aWV3ZXIuZ2V0Q2hhcldpZHRoKCk7XG4gICAgICAgICAgICAgIGVsLmFkZENsYXNzZXMoJ3JpZ2h0LWVkZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsLnNldFN0eWxlcyh7XG4gICAgICAgICAgICAgIGxlZnQgIDogYm94LnggKyAncHgnLFxuICAgICAgICAgICAgICB0b3AgICA6IGJveC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgd2lkdGggOiBib3gudyArICdweCcsXG4gICAgICAgICAgICAgIGhlaWdodDogYm94LmggLSB0aGlzLnZpZXdlci5nZXRDaGFySGVpZ2h0KCkgKiAzLjUgKyAncHgnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBhZGQgdG8gbGlzdCBvZiBzZWxlY3Rpb24gZWxlbWVudHMgYW5kIGFkZCB0byB0aGUgRE9NXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVsZW1lbnRzID0gdGhpcy5zZWxlY3Rpb25FbGVtZW50cyB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRWxlbWVudHMucHVzaChlbCk7XG4gICAgICAgICAgICB0aGlzLmxheWVyLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY29tcGFyZSB0d28gYmxvY2sgb2Zmc2V0IGZvciBlcXVhbGl0eVxuICAgKiBAcGFyYW0gYm8xXG4gICAqIEBwYXJhbSBibzJcbiAgICovXG4gIGJsb2NrT2Zmc2V0RXF1YWwoYm8xLCBibzIpIHtcbiAgICAvLyBib3RoIGZhbHNlLCBlcXVhbFxuICAgIGlmICghYm8xICYmICFibzIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBvbmUgaXMgZmFsc2UsIG90aGVyIGlzIHRydWVcbiAgICBpZiAoISFibzEgIT09ICEhYm8yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBibzEuYmxvY2suaWQgPT09IGJvMi5ibG9jay5pZCAmJiBibzEuYmxvY2tPZmZzZXQgPT09IGJvMi5ibG9ja09mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHJhbmdlIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gQWxsIHBhcmFtZXRlcnMgYXJlIG9wdGlvbmFsLlxuICAgKiBJZiBubyBwYXJhbWV0ZXJzIGFyZSBwcm92aWRlZCB0aGUgc2VsZWN0aW9uIGlzIHJlc2V0LlxuICAgKiBJZiBvbmx5IHRoZSBzdGFydCBpcyBnaXZlbiB0aGUgc2VsZWN0aW9uIGlzIGp1c3QgYSBsb2NhdGlvbiwgaWYgYm90aCBhcmUgcHJvdmlkZWRcbiAgICogaXQgZGVmaW5lcyBhIHJhbmdlLlxuICAgKiBAcGFyYW0gYmxvY2tPZmZzZXRTdGFydFxuICAgKiBAcGFyYW0gYmxvY2tPZmZzZXRFbmRcbiAgICovXG4gIHNldFNlbGVjdGlvbihibG9ja09mZnNldFN0YXJ0LCBibG9ja09mZnNldEVuZCkge1xuXG4gICAgLy8gcmVzZXQgaWYgbm8gc2VsZWN0aW9uIGdpdmVuXG4gICAgaWYgKCFibG9ja09mZnNldFN0YXJ0ICYmICFibG9ja09mZnNldEVuZCkge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnZhcmlhbnQoYmxvY2tPZmZzZXRTdGFydCwgJ3N0YXJ0IG11c3QgYmUgZGVmaW5lZCB1bmxlc3MgcmVzZXR0aW5nIHRoZSBzZWxlY3Rpb24nKTtcbiAgICAgIC8vIHN0YXJ0IHRvIGNvbHVtbi9yb3dcbiAgICAgIGxldCBjb2x1bW5Sb3dTdGFydCA9IHRoaXMuYmxvY2tPZmZzZXRUb0NvbHVtblJvdyhibG9ja09mZnNldFN0YXJ0KTtcbiAgICAgIC8vIGRlZmluZSBzdGFydCBwb2ludCBpZiBvbmx5IHN0YXJ0IGdpdmVuXG4gICAgICBpZiAoIWJsb2NrT2Zmc2V0RW5kKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0ge1xuICAgICAgICAgIGJsb2NrT2Zmc2V0U3RhcnQsXG4gICAgICAgICAgY29sdW1uUm93U3RhcnQsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGNvbHVtbi9yb3cgdmVjdG9yIGZvciB0aGUgc2VsZWN0aW9uIGFuZCBub3JtYWxpemUgdG8gZW5zdXJlIHN0YXJ0IDw9IGVuZFxuICAgICAgICBsZXQgY29sdW1uUm93RW5kID0gdGhpcy5ibG9ja09mZnNldFRvQ29sdW1uUm93KGJsb2NrT2Zmc2V0RW5kKTtcbiAgICAgICAgaWYgKGNvbHVtblJvd1N0YXJ0LnkgPCBjb2x1bW5Sb3dFbmQueSB8fCAoY29sdW1uUm93U3RhcnQueSA9PT0gY29sdW1uUm93RW5kLnkgJiYgY29sdW1uUm93U3RhcnQueCA8PSBjb2x1bW5Sb3dFbmQueCkpIHtcbiAgICAgICAgICAvLyBzdGFydCBpcyBhbHJlYWR5IDw9IGVuZFxuICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgYmxvY2tPZmZzZXRTdGFydCxcbiAgICAgICAgICAgIGJsb2NrT2Zmc2V0RW5kLFxuICAgICAgICAgICAgY29sdW1uUm93U3RhcnQsXG4gICAgICAgICAgICBjb2x1bW5Sb3dFbmQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBzd2FwIHN0YXJ0IGFuZCBlbmRcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgIGJsb2NrT2Zmc2V0U3RhcnQ6IGJsb2NrT2Zmc2V0RW5kLFxuICAgICAgICAgICAgYmxvY2tPZmZzZXRFbmQgIDogYmxvY2tPZmZzZXRTdGFydCxcbiAgICAgICAgICAgIGNvbHVtblJvd1N0YXJ0ICA6IGNvbHVtblJvd0VuZCxcbiAgICAgICAgICAgIGNvbHVtblJvd0VuZCAgICA6IGNvbHVtblJvd1N0YXJ0LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIHN0YXR1cyBiYXIgd2l0aCBzZWxlY3Rpb25cbiAgICBpZiAodGhpcy5zZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3Rpb24uY29sdW1uUm93U3RhcnQpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldFN0YXJ0KHRoaXMuc2VsZWN0aW9uLmNvbHVtblJvd1N0YXJ0LnkgKiB0aGlzLnZpZXdlci5yb3dMZW5ndGggKyB0aGlzLnNlbGVjdGlvbi5jb2x1bW5Sb3dTdGFydC54KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0dXNCYXIuc2V0U3RhcnQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uICYmIHRoaXMuc2VsZWN0aW9uLmNvbHVtblJvd0VuZCkge1xuICAgICAgdGhpcy5zdGF0dXNCYXIuc2V0RW5kKHRoaXMuc2VsZWN0aW9uLmNvbHVtblJvd0VuZC55ICogdGhpcy52aWV3ZXIucm93TGVuZ3RoICsgdGhpcy5zZWxlY3Rpb24uY29sdW1uUm93RW5kLngpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRFbmQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2V0IHNlbGVjdGlvbiBmcm9tIGNvbHVtblJvdyB2ZWN0b3JzIHZlcnN1cyBibG9ja3NcbiAgICovXG4gIHNldFNlbGVjdGlvbkZyb21Db2x1bW5Sb3coc3RhcnQsIGVuZCkge1xuICAgIHRoaXMuc2V0U2VsZWN0aW9uKHRoaXMuY29sdW1uUm93VG9CbG9ja09mZnNldChzdGFydCksIHRoaXMuY29sdW1uUm93VG9CbG9ja09mZnNldChlbmQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsZWQgd2hlbiB0aGUgc2l6ZSBpcyBjaGFuZ2VkIHRvIHJlc2V0IG91ciBzZWxlY3Rpb25cbiAgICovXG4gIHVwZGF0ZVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLnNldFNlbGVjdGlvbih0aGlzLnNlbGVjdGlvbiA/IHRoaXMuc2VsZWN0aW9uLmJsb2NrT2Zmc2V0U3RhcnQgOiBudWxsLCB0aGlzLnNlbGVjdGlvbiA/IHRoaXMuc2VsZWN0aW9uLmJsb2NrT2Zmc2V0RW5kIDogbnVsbCk7XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2phdmFzY3JpcHRzL3ZpZXdlci91c2VyaW50ZXJmYWNlLmpzXG4gKiovIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4uL2dlb21ldHJ5L3ZlY3RvcjJkJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBEIGZyb20gJy4uL2RvbS9kb20nO1xuXG4vKipcbiAqIG1vdXNlIHdoZWVsIGNvbnN0YW50c1xuICovXG5jb25zdCBQSVhFTF9TVEVQICA9IDEwO1xuY29uc3QgTElORV9IRUlHSFQgPSA0MDtcbmNvbnN0IFBBR0VfSEVJR0hUID0gODAwO1xuXG4vKipcbiAqIE1TIGFuZCBwaXhlbCB0aHJlc2hvbGRzIHRvIHJlZ2lzdGVyIGEgZG91YmxlIGNsaWNrXG4gKi9cbmNvbnN0IGRvdWJsZUNsaWNrVGltZVRocmVzaG9sZCA9IDUwMDtcbmNvbnN0IGRvdWJsZUNsaWNrU3BhdGlhbFRocmVzaG9sZCA9IDQ7XG4vKipcbiAqIGhhbmRsZSBtb3VzZWRvd24sbW91c2Vtb3ZlLG1vdXNldXAgZXZlbnRzIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBpbmNsdWRpbmdcbiAqIGNvbnZlcnRpbmcgdG8gbG9jYWwgY29vcmRpbmF0ZXMgYW5kIGNhcHR1cmluZyB0aGUgbW91c2Ugb24gdGhlIGRvY3VtZW50LmJvZHlcbiAqIGR1cmluZyBhIGRyYWcuXG4gKiBDYWxsYmFja3Mgd2hpY2ggc2hvdWxkIGV4aXN0IGFyZTpcbiAqIG1vdXNlVHJhcERvd24oY2xpZW50IHBvaW50LCBldmVudClcbiAqIG1vdXNlVHJhcE1vdmUoY2xpZW50IHBvaW50LCBldmVudClcbiAqIG1vdXNlVHJhcFVwKGNsaWVudCBwb2ludCwgZXZlbnQpXG4gKiBtb3VzZVRyYXBEcmFnKGNsaWVudCBwb2ludCwgZXZlbnQpIC0gd2hpY2ggaXMgYSBtb3VzZW1vdmUgd2l0aCB0aGUgYnV0dG9uIGhlbGQgZG93blxuICpcbiAqIEEgZHJhZyBjYW4gYmUgY2FuY2VsbGVkIGF0IGFueXRpbWUgYnkgY2FsbGluZyBjYW5jZWxEcmFnIG9uIHRoaXMgaW5zdGFuY2UuXG4gKiBDYWxsIGRpc3Bvc2UgdG8gZW5kIGFsbCBtb3VzZSBjYXB0dXJlcy4gRG8gbm90IHVzZSB0aGUgaW5zdGFuY2UgYWZ0ZXIgdGhpcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW91c2VUcmFwIHtcblxuICAvKipcbiAgICogb3duZXIgaXMgYW55IG9iamVjdCB0aGF0IHdpbGwgZ2V0IHRoZSBjYWxsYmFja3MuIEVsZW1lbnQgaXNcbiAgICogdGhlIHRhcmdldCBlbGVtZW50IHlvdSB3YW50IHRoZSBldmVudHMgb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgLy8gc2F2ZSBvdXIgb3B0aW9ucywgd2hpY2ggYXQgdGhlIHZlcnkgbGVhc3QgbXVzdCBjb250YWluIHRoZSB0YXJnZXRlZCBlbGVtZW50LlxuICAgIC8vIE9wdGlvbnMgYXJlOlxuICAgIC8vXG4gICAgLy8gZWxlbWVudDogSFRNTEVsZW1lbnQgLSB0aGUgZWxlbWVudCB3aGljaCB3ZSBsaXN0ZW4gdG9cbiAgICAvLyBtb3VzZUVudGVyOiBGdW5jdGlvbiAtIGNhbGxiYWNrIGZvciBtb3VzZWVudGVyIGV2ZW50IChldmVudClcbiAgICAvLyBtb3VzZUxlYXZlOiBGdW5jdGlvbiAtIGNhbGxiYWNrIGZvciBtb3VzZWxlYXZlIGV2ZW50IChldmVudClcbiAgICAvLyBtb3VzZURvd246IEZ1bmN0aW9uIC0gY2FsbGJhY2sgZm9yIG1vdXNlZG93biBldmVudCAocG9pbnQsIGV2ZW50KVxuICAgIC8vIG1vdXNlTW92ZTogRnVuY3Rpb24gLSBjYWxsYmFjayBmb3IgbW91c2Vtb3ZlIGV2ZW50IChwb2ludCwgZXZlbnQpXG4gICAgLy8gbW91c2VEcmFnOiBGdW5jdGlvbiAtIGNhbGxiYWNrIGZvciBtb3VzZW1vdmUgd2l0aCBidXR0b24gaGVsZCBkb3duIGV2ZW50IChwb2ludCwgZXZlbnQpXG4gICAgLy8gbW91c2VVcDogRnVuY3Rpb24gLSBjYWxsYmFjayBmb3IgbW91c2V1cCBldmVudCAocG9pbnQsIGV2ZW50KSBvbmx5IHdoZW4gbW91c2Vkb3duIHByZWNlZWRlZC5cbiAgICAvLyBtb3VzZVdoZWVsOiBGdW5jdGlvbiAtIGNhbGxiYWNrIGZvciBub3JtYWxpemVkIG1vdXNlIHdoZWVsIGV2ZW50cy4gKGV2ZW50LCBub3JtYWxpemVkIGRhdGEpXG4gICAgLy8gZG91YmxlQ2xpY2s6IEZ1bmN0aW9uIC0gY2FsbGJhY2sgZm9yIGRvdWJsZSBjbGljayB3aXRoIGxlZnQgYnV0dG9uXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgaW52YXJpYW50KHRoaXMub3B0aW9ucy5lbGVtZW50LCAnb3B0aW9ucyBtdXN0IGNvbnRhaW4gYW4gZWxlbWVudCcpO1xuICAgIHRoaXMuZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcblxuICAgIC8vIGNyZWF0ZSBib3VuZCB2ZXJzaW9ucyBvZiB0aGUgbGlzdGVuZXIgd2hpY2ggd2UgY2FuIHJlbW92ZSBhcyB3ZWxsIGFzIGFkZFxuICAgIHRoaXMubW91c2VFbnRlciA9IHRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZUxlYXZlID0gdGhpcy5vbk1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlRHJhZyA9IHRoaXMub25Nb3VzZURyYWcuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlVXAgPSB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW91c2VXaGVlbCA9IHRoaXMub25Nb3VzZVdoZWVsLmJpbmQodGhpcyk7XG5cbiAgICAvLyBtb3VzZSBlbnRlci9sZWF2ZSBhcmUgYWx3YXlzIHJ1bm5pbmdcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW91c2VFbnRlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm1vdXNlTGVhdmUpO1xuICAgIC8vIHNpbmsgdGhlIG1vdXNlZG93biwgbGF0ZXIgZHluYW1pY2FsbHkgYWRkIHRoZSBtb3ZlL3VwIGhhbmRsZXJzXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICAvLyBmb3Igbm9ybWFsIG1vdXNlIG1vdmUgd2l0aCBubyBidXR0b24gd2UgdHJhY2sgdmlhIHRoZSB0YXJnZXQgZWxlbWVudCBpdHNlbGZcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xuICAgIC8vIG1vdXNlIHdoZWVsIGV2ZW50c1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMubW91c2VXaGVlbCk7XG4gIH1cblxuICAvKipcbiAgICogbW91c2UgZW50ZXIvbGVhdmUgaGFuZGxlcnNcbiAgICovXG4gIG9uTW91c2VFbnRlcihldmVudCkge1xuICAgIHRoaXMuY2FsbGJhY2soJ21vdXNlRW50ZXInLCBldmVudCk7XG4gIH1cblxuICBvbk1vdXNlTGVhdmUoZXZlbnQpIHtcbiAgICB0aGlzLmNhbGxiYWNrKCdtb3VzZUxlYXZlJywgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1vdXNlIGRvd24gaGFuZGxlciwgaW52b2tlZCBvbiBvdXIgdGFyZ2V0IGVsZW1lbnRcbiAgICovXG4gIG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgLy8gd2hlbmV2ZXIgb3VyIGVsZW1lbnQgZ2V0cyBhIG1vdXNlIGRvd24gKCBhbnkgYnV0dG9uICkgZW5zdXJlIGFueSBpbnB1dHMgYXJlIHVuZm9jdXNlZFxuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWVcbiAgICAgICYmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lID09PSAnVEVYVEFSRUEnICkpIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIH1cblxuICAgICAgLy8gbGVmdCBidXR0b24gb25seVxuICAgIGlmIChldmVudC53aGljaCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnZhcmlhbnQoIXRoaXMuZHJhZ2dpbmcsICdtb3VzZXRyYXAgaXMgYWxyZWFkeSBpbiBkcmFnIG1vZGUnKTtcblxuICAgIC8vIGdldCBsb2NhbCBwb3NpdGlvbiBhbmQgcmVjb3JkIHRoZSBzdGFydGluZyBwb3NpdGlvbiBhbmQgc2V0dXAgbW92ZS91cCBoYW5kbGVycyBvbiB0aGUgbW91c2VMYXllclxuICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSB0aGlzLmV2ZW50VG9Mb2NhbChldmVudCk7XG4gICAgY29uc3QgdGltZSA9IERhdGUubm93KCk7XG5cbiAgICAvLyBjaGVjayBmb3IgYSBkb3VibGUgY2xpY2sgYmVmb3JlIHN0YXJ0aW5nIGEgZHJhZ1xuICAgIGlmICh0aGlzLmxhc3RMZWZ0Q2xpY2sgJiYgdGhpcy5sYXN0TGVmdENsaWNrLnN1Yihsb2NhbFBvc2l0aW9uKS5sZW4oKSA8PSBkb3VibGVDbGlja1NwYXRpYWxUaHJlc2hvbGRcbiAgICAgICYmIHRpbWUgLSB0aGlzLmxhc3RMZWZ0Q2xpY2tUaW1lIDw9IGRvdWJsZUNsaWNrVGltZVRocmVzaG9sZCkge1xuICAgICAgdGhpcy5sYXN0TGVmdENsaWNrID0gbnVsbDtcbiAgICAgIHRoaXMuY2FsbGJhY2soJ2RvdWJsZUNsaWNrJywgZXZlbnQsIGxvY2FsUG9zaXRpb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyByZW1lbWJlciB0aGlzIGNsaWNrLCBpdCBtYXkgYmUgdGhlIGZpcnN0IGNsaWNrIG9mIGEgZG91YmxlIGNsaWNrXG4gICAgdGhpcy5sYXN0TGVmdENsaWNrID0gbG9jYWxQb3NpdGlvbjtcbiAgICB0aGlzLmxhc3RMZWZ0Q2xpY2tUaW1lID0gdGltZTtcblxuICAgIHRoaXMubW91c2VMYXllciA9IEQoJzxkaXYgY2xhc3M9XCJzdi1tb3VzZUxheWVyXCI+PC9kaXY+Jyk7XG4gICAgdGhpcy5tb3VzZUxheWVyLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuXG4gICAgLy8gc3RhcnQgYSBkcmFnXG4gICAgdGhpcy5kcmFnZ2luZyA9IHtcbiAgICAgIG1vdXNlTGF5ZXI6IHRoaXMubW91c2VMYXllci5lbCxcbiAgICAgIHN0YXJ0UG9zaXRpb246IGxvY2FsUG9zaXRpb24sXG4gICAgfTtcbiAgICB0aGlzLm1vdXNlTGF5ZXIuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZURyYWcpO1xuICAgIHRoaXMubW91c2VMYXllci5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcblxuICAgIC8vIGludm9rZSBvcHRpb25hbCBjYWxsYmFja1xuICAgIHRoaXMuY2FsbGJhY2soJ21vdXNlRG93bicsIGV2ZW50LCBsb2NhbFBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtb3VzZW1vdmUgZXZlbnRcbiAgICovXG4gIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgY29uc3QgbG9jYWxQb3NpdGlvbiA9IHRoaXMuZXZlbnRUb0xvY2FsKGV2ZW50KTtcbiAgICB0aGlzLmNhbGxiYWNrKCdtb3VzZU1vdmUnLCBldmVudCwgbG9jYWxQb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogbW91c2Vtb3ZlIGV2ZW50IGJpbmRpbmcgZHVyaW5nIGEgZHJhZyBvcGVyYXRpb25cbiAgICovXG4gIG9uTW91c2VEcmFnKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5tb3VzZUxheWVyLmVsKSB7XG4gICAgICBpbnZhcmlhbnQodGhpcy5kcmFnZ2luZywgJ29ubHkgZXhwZWN0IG1vdXNlIG1vdmVzIGR1cmluZyBhIGRyYWcnKTtcbiAgICAgIC8vIHNlbmQgdGhlIG1vdXNlIG1vdmUsIHRoZW4gY2hlY2sgZm9yIHRoZSBiZWdpbiBvZiBhIGRyYWdcbiAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSB0aGlzLmV2ZW50VG9Mb2NhbChldmVudCk7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IGxvY2FsUG9zaXRpb24uc3ViKHRoaXMuZHJhZ2dpbmcuc3RhcnRQb3NpdGlvbikubGVuKCk7XG4gICAgICAvLyBpbnZva2Ugb3B0aW9uYWwgY2FsbGJhY2tcbiAgICAgIHRoaXMuY2FsbGJhY2soJ21vdXNlRHJhZycsIGV2ZW50LCBsb2NhbFBvc2l0aW9uLCB0aGlzLmRyYWdnaW5nLnN0YXJ0UG9zaXRpb24sIGRpc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbW91c2V1cCBoYW5kbGVyXG4gICAqL1xuICBvbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAvLyBsZWZ0IGRyYWcgb25seVxuICAgIGlmIChldmVudC53aGljaCAhPT0gMSB8fCBldmVudC50YXJnZXQgIT09IHRoaXMubW91c2VMYXllci5lbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnZhcmlhbnQodGhpcy5kcmFnZ2luZywgJ29ubHkgZXhwZWN0IG1vdXNlIHVwIGR1cmluZyBhIGRyYWcnKTtcbiAgICBjb25zdCBsb2NhbFBvc2l0aW9uID0gdGhpcy5ldmVudFRvTG9jYWwoZXZlbnQpO1xuICAgIHRoaXMuY2FuY2VsRHJhZygpO1xuICAgIHRoaXMuY2FsbGJhY2soJ21vdXNlVXAnLCBldmVudCwgbG9jYWxQb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogY2FuY2VsIGEgZHJhZyB0cmFjayBpbiBwcm9ncmVzc1xuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGNhbmNlbERyYWcoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGUgPSB0aGlzLm1vdXNlTGF5ZXIuZWw7XG4gICAgICBlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VEcmFnKTtcbiAgICAgIGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgICBlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZSk7XG4gICAgICB0aGlzLm1vdXNlTGF5ZXIgPSBudWxsO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1vdXNlIHdoZWVsIGhhbmRsZXJcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbk1vdXNlV2hlZWwoZXZlbnQpIHtcbiAgICBjb25zdCBsb2NhbFBvc2l0aW9uID0gdGhpcy5ldmVudFRvTG9jYWwoZXZlbnQpO1xuICAgIHRoaXMuY2FsbGJhY2soJ21vdXNlV2hlZWwnLCBldmVudCwgbG9jYWxQb3NpdGlvbiwgdGhpcy5ub3JtYWxpemVXaGVlbChldmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGEgbmljZSB0cnkgYXQgbm9ybWFsaXppbmcgd2hlZWwgZXZlbnRzLiBQcm92aWRlZCBieSBvdXIgZnJpZW5kcyBhdCBGYWNlYm9vazpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZpeGVkLWRhdGEtdGFibGUvYmxvYi9tYXN0ZXIvc3JjL3ZlbmRvcl91cHN0cmVhbS9kb20vbm9ybWFsaXplV2hlZWwuanNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEByZXR1cm5zIHt7c3Bpblg6IG51bWJlciwgc3Bpblk6IG51bWJlciwgcGl4ZWxYOiBudW1iZXIsIHBpeGVsWTogbnVtYmVyfX1cbiAgICovXG4gIG5vcm1hbGl6ZVdoZWVsKGV2ZW50KSB7XG4gICAgdmFyIHNYID0gMCwgc1kgPSAwLCAgICAgICAvLyBzcGluWCwgc3BpbllcbiAgICAgIHBYID0gMCwgcFkgPSAwOyAgICAgICAvLyBwaXhlbFgsIHBpeGVsWVxuXG4gICAgLy8gTGVnYWN5XG4gICAgaWYgKCdkZXRhaWwnICAgICAgaW4gZXZlbnQpIHsgc1kgPSBldmVudC5kZXRhaWw7IH1cbiAgICBpZiAoJ3doZWVsRGVsdGEnICBpbiBldmVudCkgeyBzWSA9IC1ldmVudC53aGVlbERlbHRhIC8gMTIwOyB9XG4gICAgaWYgKCd3aGVlbERlbHRhWScgaW4gZXZlbnQpIHsgc1kgPSAtZXZlbnQud2hlZWxEZWx0YVkgLyAxMjA7IH1cbiAgICBpZiAoJ3doZWVsRGVsdGFYJyBpbiBldmVudCkgeyBzWCA9IC1ldmVudC53aGVlbERlbHRhWCAvIDEyMDsgfVxuXG4gICAgLy8gc2lkZSBzY3JvbGxpbmcgb24gRkYgd2l0aCBET01Nb3VzZVNjcm9sbFxuICAgIGlmICggJ2F4aXMnIGluIGV2ZW50ICYmIGV2ZW50LmF4aXMgPT09IGV2ZW50LkhPUklaT05UQUxfQVhJUyApIHtcbiAgICAgIHNYID0gc1k7XG4gICAgICBzWSA9IDA7XG4gICAgfVxuXG4gICAgcFggPSBzWCAqIFBJWEVMX1NURVA7XG4gICAgcFkgPSBzWSAqIFBJWEVMX1NURVA7XG5cbiAgICBpZiAoJ2RlbHRhWScgaW4gZXZlbnQpIHsgcFkgPSBldmVudC5kZWx0YVk7IH1cbiAgICBpZiAoJ2RlbHRhWCcgaW4gZXZlbnQpIHsgcFggPSBldmVudC5kZWx0YVg7IH1cblxuICAgIGlmICgocFggfHwgcFkpICYmIGV2ZW50LmRlbHRhTW9kZSkge1xuICAgICAgaWYgKGV2ZW50LmRlbHRhTW9kZSA9PSAxKSB7ICAgICAgICAgIC8vIGRlbHRhIGluIExJTkUgdW5pdHNcbiAgICAgICAgcFggKj0gTElORV9IRUlHSFQ7XG4gICAgICAgIHBZICo9IExJTkVfSEVJR0hUO1xuICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlbHRhIGluIFBBR0UgdW5pdHNcbiAgICAgICAgcFggKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgIHBZICo9IFBBR0VfSEVJR0hUO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZhbGwtYmFjayBpZiBzcGluIGNhbm5vdCBiZSBkZXRlcm1pbmVkXG4gICAgaWYgKHBYICYmICFzWCkgeyBzWCA9IChwWCA8IDEpID8gLTEgOiAxOyB9XG4gICAgaWYgKHBZICYmICFzWSkgeyBzWSA9IChwWSA8IDEpID8gLTEgOiAxOyB9XG5cbiAgICByZXR1cm4geyBzcGluWCAgOiBzWCxcbiAgICAgIHNwaW5ZICA6IHNZLFxuICAgICAgcGl4ZWxYIDogcFgsXG4gICAgICBwaXhlbFkgOiBwWSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGlmIGdpdmVuLCBpbnZva2Ugb25lIG9mIHRoZSBuYW1lZCBvcHRpb25hbCBjYWxsYmFja3Mgd2l0aCBhIGNsb25lIG9mIHRoZSBsb2NhbCBwb2ludFxuICAgKi9cbiAgY2FsbGJhY2soZXZlbnROYW1lLCBldmVudCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnNbZXZlbnROYW1lXSkge1xuICAgICAgLy8gaWYgdGhlIGNsaWVudCB3YW50cyBhIGNhbGxiYWNrIHByZXZlbnREZWZhdWx0XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gc2xpY2UgdGhlIGV2ZW50IG5hbWUgb2ZmIHRoZSBhcmd1bWVudHMgYnV0IGZvcndhcmQgZXZlcnl0aGluZyBlbHNlXG4gICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIHRoaXMub3B0aW9uc1tldmVudE5hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjbGVhbnVwIGFsbCBldmVudCBsaXN0ZW5lcnMuIEluc3RhbmNlIGNhbm5vdCBiZSB1c2VkIGFmdGVyIHRoaXMuXG4gICAqL1xuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3VzZUVudGVyKTtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMubW91c2VMZWF2ZSk7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMubW91c2VXaGVlbCk7XG4gICAgdGhpcy5jYW5jZWxEcmFnKCk7XG4gICAgdGhpcy5kcmFnZ2luZyA9IHRoaXMuZWxlbWVudCA9IHRoaXMub3duZXIgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoZSB0YXJnZXQgb2YgdGhlIGV2ZW50IGlzIGV4cGVjdGVkIHRvIGJlIG91ciBlbGVtZW50IG9yIG9uZSBvZiBpdHMgY2hpbGRyZW5cbiAgICogQHBhcmFtIG5vZGVcbiAgICogQHBhcmFtIHBvaW50XG4gICAqL1xuICBldmVudFRvRG9jdW1lbnQoZXZlbnQpIHtcbiAgICAvLyBvbmx5IHdvcmtkcyBvbiBuZXdlciBicm93c2VycyB3aXRoIHBhZ2VYL3BhZ2VZXG4gICAgaW52YXJpYW50KGV2ZW50LnBhZ2VYICE9PSB1bmRlZmluZWQsICdldmVudCBtdXN0IHN1cHBvcnQgcGFnZVgvWScpO1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQoXG4gICAgICBldmVudC5wYWdlWCArIHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0IC0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LFxuICAgICAgZXZlbnQucGFnZVkrIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgLSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgcmVsYXRpdmUgdG8gb3VyIGVsZW1lbnRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBldmVudFRvTG9jYWwoZXZlbnQpIHtcbiAgICBjb25zdCBiID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHAgPSB0aGlzLmV2ZW50VG9Eb2N1bWVudChldmVudCk7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRChwLnggLSBiLmxlZnQsIHAueSAtIGIudG9wKTtcbiAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2phdmFzY3JpcHRzL2lucHV0L21vdXNldHJhcC5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCB7IGlzUmVhbE51bWJlciwgZGVnMnJhZCwgcmFkMmRlZyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IExpbmUyRCBmcm9tICcuL2xpbmUyZCc7XG4vKipcbiAqIGEgMkQgVmVjdG9yL1BvaW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjJEIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgKi9cbiAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgaW52YXJpYW50KGlzUmVhbE51bWJlcih4KSAmJiBpc1JlYWxOdW1iZXIoeSksICdCYWQgcGFyYW1ldGVycycpO1xuICAgIHRoaXMuX3YgPSBbeCwgeV07XG4gIH1cblxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdlswXTtcbiAgfVxuXG4gIHNldCB4KG5ld1ZhbHVlKSB7XG4gICAgaW52YXJpYW50KGlzUmVhbE51bWJlcihuZXdWYWx1ZSksICdCYWQgcGFyYW1ldGVyJyk7XG4gICAgdGhpcy5fdlswXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZbMV07XG4gIH1cblxuICBzZXQgeShuZXdWYWx1ZSkge1xuICAgIGludmFyaWFudChpc1JlYWxOdW1iZXIobmV3VmFsdWUpLCAnQmFkIHBhcmFtZXRlcicpO1xuXG4gICAgdGhpcy5fdlsxXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbW1hIHNlcGFyYXRlZCBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIHRvT2JqZWN0KCkge1xuICAgIHJldHVybiBgJHt0aGlzLnh9LCR7dGhpcy55fWA7XG4gIH1cblxuICAvKipcbiAgICogcmV2ZXJzZSBvZiB0b09iamVjdCwgYnV0IGEgc3RhdGljIG1lbWJlciB0aGF0IGNvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2VcbiAgICovXG4gIHN0YXRpYyBmcm9tT2JqZWN0KHN0cikge1xuICAgIGludmFyaWFudChzdHIsICdCYWQgcGFyYW1ldGVyJyk7XG4gICAgY29uc3QgYXJ5ID0gc3RyLnNwbGl0KCcsJyk7XG4gICAgaW52YXJpYW50KGFyeS5sZW5ndGggPT09IDIsICdCYWQgcGFyYW1ldGVyJyk7XG4gICAgY29uc3QgdmVjdG9yID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdmVjdG9yLnggPSBwYXJzZUZsb2F0KGFyeVswXSk7XG4gICAgdmVjdG9yLnkgPSBwYXJzZUZsb2F0KGFyeVsxXSk7XG4gICAgaW52YXJpYW50KGlzUmVhbE51bWJlcih2ZWN0b3IueCksICdCYWQgcGFyYW1ldGVyJyk7XG4gICAgaW52YXJpYW50KGlzUmVhbE51bWJlcih2ZWN0b3IueSksICdCYWQgcGFyYW1ldGVyJyk7XG4gICAgcmV0dXJuIHZlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdHJpbmcgb3V0XG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYHYyZCgke3RoaXMueH0sICR7dGhpcy55fSlgO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBhIGNvcHkgb2Ygb3Vyc2VsdmVzXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH1cbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBhIG5ldyB2ZWN0b3Igcm91bmRlZCB0byB0aGUgbmVhcmVzdCBrIGludGVnZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGdyaWQgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtWZWN0b3IyRH0gICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBzbmFwKGdyaWQpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKE1hdGguZmxvb3IodGhpcy54IC8gZ3JpZCkgKiBncmlkLCBNYXRoLmZsb29yKHRoaXMueSAvIGdyaWQpICogZ3JpZCk7XG4gIH1cblxuICAvKipcbiAgICogUG9pbnQgb24gY2lyY3VtZmVyZW5jZSBvZiBjaXJjbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHhjXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5Y1xuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWdyZWVzXG4gICAqL1xuICBzdGF0aWMgcG9pbnRPbkNpcmN1bWZlcmVuY2UoeGMsIHljLCByYWRpdXMsIGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKFxuICAgICAgeGMgKyByYWRpdXMgKiBNYXRoLmNvcyhkZWcycmFkKGRlZ3JlZXMpKSxcbiAgICAgIHljICsgcmFkaXVzICogTWF0aC5zaW4oZGVnMnJhZChkZWdyZWVzKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGFuZ2xlIGluIGRlZ3JlZXMgYmV0d2VlbiB0d28gdmVjdG9yc1xuICAgKiBAcGFyYW0ge051bWJlcn0gb3RoZXJcbiAgICovXG4gIGFuZ2xlQmV0d2VlbihvdGhlcikge1xuICAgIGxldCByYWRzID0gTWF0aC5hdGFuMihvdGhlci55IC0gdGhpcy55LCBvdGhlci54IC0gdGhpcy54KTtcblxuICAgIC8vIGF0YW4yIHJldHVybiBuZWdhdGl2ZSBQSSByYWRpYW5zIGZvciB0aGUgMTgwLTM2MCBkZWdyZWVzICggOSBvJ2Nsb2NrIHRvIDMgbydjbG9jayApXG4gICAgaWYgKHJhZHMgPCAwKSB7XG4gICAgICByYWRzID0gMiAqIE1hdGguUEkgKyByYWRzO1xuICAgIH1cblxuICAgIHJldHVybiByYWQyZGVnKHJhZHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2ZWN0b3JcbiAgICogQHJldHVybnMge1ZlY3RvcjJEfVxuICAgKi9cbiAgYWRkKHZlY3Rvcikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54ICsgdmVjdG9yLngsIHRoaXMueSArIHZlY3Rvci55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdWJ0cmFjdCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2ZWN0b3JcbiAgICogQHJldHVybnMge1ZlY3RvcjJEfVxuICAgKi9cbiAgc3ViKHZlY3Rvcikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54IC0gdmVjdG9yLngsIHRoaXMueSAtIHZlY3Rvci55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtdWx0aXBseSB2ZWN0b3IgYnkgY29lZmZlY2llbnQgb3IgYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHtOdW1iZXJ8VmVjdG9yMkR9IG11bHRpcGxpZXJcbiAgICogQHJldHVybnMge1ZlY3RvcjJEIHwgTnVtYmVyfVxuICAgKi9cbiAgbXVsdGlwbHkobXVsdGlwbGllcikge1xuICAgIHJldHVybiBpc1JlYWxOdW1iZXIobXVsdGlwbGllcikgP1xuICAgICAgbmV3IFZlY3RvcjJEKHRoaXMueCAqIG11bHRpcGxpZXIsIHRoaXMueSAqIG11bHRpcGxpZXIpIDpcbiAgICAgIG5ldyBWZWN0b3IyRCh0aGlzLnggKiBtdWx0aXBsaWVyLngsIHRoaXMueSAqIG11bHRpcGxpZXIueSk7XG4gIH1cblxuICAvKipcbiAgICogc2NhbGUgaXMgYW4gYWxpYXMgZm9yIG11bHRpcGx5XG4gICAqL1xuICBzY2FsZShtdWx0aXBsaWVyKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobXVsdGlwbGllcik7XG4gIH1cblxuICAvKipcbiAgICogZGl2aWRlIHZlY3RvciBieSBhIGNvbnN0YW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkaXZpc29yXG4gICAqIEByZXR1cm5zIHtWZWN0b3IyRH1cbiAgICovXG4gIGRpdmlkZShkaXZpc29yKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLnggLyBkaXZpc29yLCB0aGlzLnkgLyBkaXZpc29yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBsZW5ndGggb2YgdmVjdG9yXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBsZW4oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICAgKiBAcGFyYW0ge3ZlY3Rvcn0gb3RoZXIgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGRpc3RhbmNlKG90aGVyKSB7XG4gICAgcmV0dXJuIG5ldyBMaW5lMkQodGhpcywgb3RoZXIpLmxlbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRvdCBwcm9kdWN0XG4gICAqIEBwYXJhbSB7dmVjdG9yfSBvdGhlclxuICAgKiBAcmV0dXJucyBWZWN0b3IyRFxuICAgKi9cbiAgZG90KG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBpZiB3aXRoaW4gYSBjZXJ0YWluIHRocmVzaG9sZCBvZiBwcm94aW1pdHlcbiAgICogQHBhcmFtIHt2ZWN0b3J9IG90aGVyICAgICBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aHJlc2hvbGQgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgc2ltaWxhcihvdGhlciwgdGhyZXNob2xkID0gMWUtNikge1xuICAgIGNvbnN0IGR4ID0gTWF0aC5hYnModGhpcy54IC0gb3RoZXIueCk7XG4gICAgY29uc3QgZHkgPSBNYXRoLmFicyh0aGlzLnkgLSBvdGhlci55KTtcbiAgICByZXR1cm4gKGR4IDwgdGhyZXNob2xkKSAmJiAoZHkgPCB0aHJlc2hvbGQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGVxdWFsaXR5IHRlc3RcbiAgICogQHBhcmFtIG90aGVyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMueCA9PT0gb3RoZXIueCAmJiB0aGlzLnkgPT09IG90aGVyLnk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBzb3VyY2Ugd2lkdGgvaGVpZ2h0IG9mIGEgYm94LCByZXR1cm4gdGhlIGFzcGVjdCByYXRpbyBjb3JyZWN0IHNpemUgb2YgdGhlIGJveCB3aGVuIHNjYWxlZCBkb3duICggb3Igb3B0aW9uYWxseVxuICAgKiB1cCApIHRvIGZpdCB3aXRoaW4gdGhlIGdpdmVuIHdpbmRvd1xuICAgKiBAcGFyYW0ge051bWJlcn0gc291cmNlV2lkdGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNvdXJjZUhlaWdodFxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4V2lkdGhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heEhlaWdodFxuICAgKiBAcGFyYW0ge051bWJlcn0gdXBzY2FsZVxuICAgKiBAcmV0dXJucyB7VmVjdG9yMkR9XG4gICAqL1xuICBzdGF0aWMgc2NhbGVUb1dpbmRvdyhzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0LCB1cHNjYWxlKSB7XG4gICAgLy8gd2lsbCBob2xkIHRodW1iIHNpemUgb24gZXhpdCBmcm9tIHRoaXMgc2VjdGlvblxuICAgIGxldCB0eDtcbiAgICBsZXQgdHk7XG5cbiAgICAvLyBpZiBpbWFnZSBmaXRzIGVudGlyZWx5IGluIHdpbmRvdyB0aGVuIGp1c3QgZ28gd2l0aCBpbWFnZSBzaXplIHVubGVzcyB1cHNjYWxpbmcgcmVxdWlyZWRcbiAgICBpZiAoc291cmNlV2lkdGggPD0gbWF4V2lkdGggJiYgc291cmNlSGVpZ2h0IDw9IG1heEhlaWdodCAmJiAhdXBzY2FsZSkge1xuICAgICAgdHggPSBzb3VyY2VXaWR0aDtcbiAgICAgIHR5ID0gc291cmNlSGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyAxLiBGaWd1cmUgb3V0IHdoaWNoIGRpbWVuc2lvbiBpcyB0aGUgd29yc3QgZml0LCB0aGlzIGlzIHRoZSBheGlzL3NpZGVcbiAgICAgIC8vICAgIHRoYXQgd2UgaGF2ZSB0byBhY2NvbW1vZGF0ZS5cblxuICAgICAgaWYgKChtYXhXaWR0aCAvIHNvdXJjZVdpZHRoKSA8IChtYXhIZWlnaHQgLyBzb3VyY2VIZWlnaHQpKSB7XG4gICAgICAgIC8vIHdpZHRoIGlzIHRoZSB3b3JzdCBmaXRcbiAgICAgICAgLy8gbWFrZSB3aWR0aCA9PSB3aW5kb3cgd2lkdGhcbiAgICAgICAgdHggPSBtYXhXaWR0aDtcblxuICAgICAgICAvLyBtYWtlIGhlaWdodCBpbiBjb3JyZWN0IHJhdGlvIHRvIG9yaWdpbmFsXG4gICAgICAgIHR5ID0gKHNvdXJjZUhlaWdodCAqIChtYXhXaWR0aCAvIHNvdXJjZVdpZHRoKSkgPj4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGhlaWdodCBpcyB0aGUgd29yc3QgZml0XG4gICAgICAgIC8vIG1ha2UgaGVpZ2h0ID09IHdpbmRvdyBoZWlnaHRcbiAgICAgICAgdHkgPSBtYXhIZWlnaHQ7XG5cbiAgICAgICAgLy8gbWFrZSBoZWlnaHQgaW4gY29ycmVjdCByYXRpbyB0byBvcmlnaW5hbFxuICAgICAgICB0eCA9IChzb3VyY2VXaWR0aCAqIChtYXhIZWlnaHQgLyBzb3VyY2VIZWlnaHQpKSA+PiAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodHgsIHR5KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qYXZhc2NyaXB0cy9nZW9tZXRyeS92ZWN0b3IyZC5qc1xuICoqLyIsImltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgY29uc3QgZGVnMnJhZCA9IChkZWcpID0+IHtcbiAgcmV0dXJuIGRlZyAqIChNYXRoLlBJIC8gMTgwKTtcbn07XG5cbmV4cG9ydCBjb25zdCByYWQyZGVnID0gKHJhZCkgPT4ge1xuICByZXR1cm4gcmFkICogKDE4MCAvIE1hdGguUEkpO1xufTtcblxuLyoqXG4gKiB0cnVlIGlzIGEgbnVtYmVyIChpbmNsdWRpbmcgTmFOISlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzUmVhbE51bWJlciA9ICh2YWwpID0+IHtcbiAgcmV0dXJuIF8uaXNOdW1iZXIodmFsKTtcbn07XG5cbi8qKlxuICogdHJ1ZSBpZiB+MVxuICogQHBhcmFtICB7bnVtYmVyfSB2YWxcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBpc09uZSA9ICh2YWwpID0+IHtcbiAgcmV0dXJuIE1hdGguYWJzKDEgLSB2YWwpIDw9IDFlLTY7XG59O1xuXG4vKipcbiAqIHRydWUgaWYgfjBcbiAqIEBwYXJhbSAge251bWJlcn0gdmFsXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNaZXJvID0gKHZhbCkgPT4ge1xuICByZXR1cm4gTWF0aC5hYnModmFsKSA8PSAxZS02O1xufTtcblxuLyoqXG4gKiB0cnVlIGlmIHRoZSBudW1iZXIgdiBpcyB2ZXJ5IGNsb3NlIHRvIEtcbiAqIEBwYXJhbSAge251bWJlcn0gdjFcbiAqIEBwYXJhbSAge251bWJlcn0gdjJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBuZWFybHkgPSAodjEsIHYyKSA9PiB7XG4gIHJldHVybiBNYXRoLmFicyh2MSAtIHYyKSA8IDFlLTY7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvZ2VvbWV0cnkvdXRpbHMuanNcbiAqKi8iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjguM1xuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXJcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxuICAgIG5hdGl2ZUtleXMgICAgICAgICA9IE9iamVjdC5rZXlzLFxuICAgIG5hdGl2ZUJpbmQgICAgICAgICA9IEZ1bmNQcm90by5iaW5kLFxuICAgIG5hdGl2ZUNyZWF0ZSAgICAgICA9IE9iamVjdC5jcmVhdGU7XG5cbiAgLy8gTmFrZWQgZnVuY3Rpb24gcmVmZXJlbmNlIGZvciBzdXJyb2dhdGUtcHJvdG90eXBlLXN3YXBwaW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuOC4zJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXJcbiAgLy8gaWRlbnRpdHksIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgY29udGV4dCwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVBc3NpZ25lciA9IGZ1bmN0aW9uKGtleXNGdW5jLCB1bmRlZmluZWRPbmx5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF0sXG4gICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoIXVuZGVmaW5lZE9ubHkgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXG4gIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcbiAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xuICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBwcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gSGVscGVyIGZvciBjb2xsZWN0aW9uIG1ldGhvZHMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2xsZWN0aW9uXG4gIC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3RcbiAgLy8gUmVsYXRlZDogaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGhcbiAgLy8gQXZvaWRzIGEgdmVyeSBuYXN0eSBpT1MgOCBKSVQgYnVnIG9uIEFSTS02NC4gIzIwOTRcbiAgdmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBnZXRMZW5ndGggPSBwcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gIHZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiB0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8PSBNQVhfQVJSQVlfSU5ERVg7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIHJlZHVjaW5nIGZ1bmN0aW9uIGl0ZXJhdGluZyBsZWZ0IG9yIHJpZ2h0LlxuICBmdW5jdGlvbiBjcmVhdGVSZWR1Y2UoZGlyKSB7XG4gICAgLy8gT3B0aW1pemVkIGl0ZXJhdG9yIGZ1bmN0aW9uIGFzIHVzaW5nIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAvLyBpbiB0aGUgbWFpbiBmdW5jdGlvbiB3aWxsIGRlb3B0aW1pemUgdGhlLCBzZWUgIzE5OTEuXG4gICAgZnVuY3Rpb24gaXRlcmF0b3Iob2JqLCBpdGVyYXRlZSwgbWVtbywga2V5cywgaW5kZXgsIGxlbmd0aCkge1xuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xuICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICAgIGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xuICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBpbml0aWFsIHZhbHVlIGlmIG5vbmUgaXMgcHJvdmlkZWQuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGRpcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBjcmVhdGVSZWR1Y2UoLTEpO1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBrZXk7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcbiAgICAgIGtleSA9IF8uZmluZEluZGV4KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gXy5maW5kS2V5KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKGNiKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAoIXByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFueWAuXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIGl0ZW0gKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCBpdGVtLCBmcm9tSW5kZXgsIGd1YXJkKSB7XG4gICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xuICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCBpdGVtLCBmcm9tSW5kZXgpID49IDA7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgaXNGdW5jID0gXy5pc0Z1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXTtcbiAgICAgIHJldHVybiBmdW5jID09IG51bGwgPyBmdW5jIDogZnVuYy5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHNldCA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xuICAgIHZhciBzaHVmZmxlZCA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKDAsIGluZGV4KTtcbiAgICAgIGlmIChyYW5kICE9PSBpbmRleCkgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbi5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICByZXR1cm4gXy5zaHVmZmxlKG9iaikuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbikpO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBfLnZhbHVlcyhvYmopO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cbiAgXy5zaXplID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gaXNBcnJheUxpa2Uob2JqKSA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcbiAgICAgIChwcmVkaWNhdGUodmFsdWUsIGtleSwgb2JqKSA/IHBhc3MgOiBmYWlsKS5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xuICB9O1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgcmV0dXJuIF8uaW5pdGlhbChhcnJheSwgYXJyYXkubGVuZ3RoIC0gbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBzdGFydEluZGV4KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdLCBpZHggPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4IHx8IDAsIGxlbmd0aCA9IGdldExlbmd0aChpbnB1dCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgICAvL2ZsYXR0ZW4gY3VycmVudCBsZXZlbCBvZiBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0XG4gICAgICAgIGlmICghc2hhbGxvdykgdmFsdWUgPSBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QpO1xuICAgICAgICB2YXIgaiA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgb3V0cHV0Lmxlbmd0aCArPSBsZW47XG4gICAgICAgIHdoaWxlIChqIDwgbGVuKSB7XG4gICAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlW2orK107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCkge1xuICAgICAgICBvdXRwdXRbaWR4KytdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBkb2VzIG5vdCBjb250YWluIHRoZSBzcGVjaWZpZWQgdmFsdWUocykuXG4gIF8ud2l0aG91dCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldLFxuICAgICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpIDogdmFsdWU7XG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IGNvbXB1dGVkKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKHNlZW4sIGNvbXB1dGVkKSkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFfLmNvbnRhaW5zKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUsIDEpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuemlwKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQ29tcGxlbWVudCBvZiBfLnppcC4gVW56aXAgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGdyb3Vwc1xuICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXNcbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCBnZXRMZW5ndGgpLmxlbmd0aCB8fCAwO1xuICAgIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IF8ucGx1Y2soYXJyYXksIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGZpbmRJbmRleCBhbmQgZmluZExhc3RJbmRleCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoZGlyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XG4gIF8uZmluZEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoMSk7XG4gIF8uZmluZExhc3RJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKC0xKTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfTtcblxuICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBpbmRleE9mIGFuZCBsYXN0SW5kZXhPZiBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlSW5kZXhGaW5kZXIoZGlyLCBwcmVkaWNhdGVGaW5kLCBzb3J0ZWRJbmRleCkge1xuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgaXRlbSwgaWR4KSB7XG4gICAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgICBpZiAodHlwZW9mIGlkeCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoZGlyID4gMCkge1xuICAgICAgICAgICAgaSA9IGlkeCA+PSAwID8gaWR4IDogTWF0aC5tYXgoaWR4ICsgbGVuZ3RoLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IGlkeCA+PSAwID8gTWF0aC5taW4oaWR4ICsgMSwgbGVuZ3RoKSA6IGlkeCArIGxlbmd0aCArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc29ydGVkSW5kZXggJiYgaWR4ICYmIGxlbmd0aCkge1xuICAgICAgICBpZHggPSBzb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpZHhdID09PSBpdGVtID8gaWR4IDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICBpZHggPSBwcmVkaWNhdGVGaW5kKHNsaWNlLmNhbGwoYXJyYXksIGksIGxlbmd0aCksIF8uaXNOYU4pO1xuICAgICAgICByZXR1cm4gaWR4ID49IDAgPyBpZHggKyBpIDogLTE7XG4gICAgICB9XG4gICAgICBmb3IgKGlkeCA9IGRpciA+IDAgPyBpIDogbGVuZ3RoIC0gMTsgaWR4ID49IDAgJiYgaWR4IDwgbGVuZ3RoOyBpZHggKz0gZGlyKSB7XG4gICAgICAgIGlmIChhcnJheVtpZHhdID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigxLCBfLmZpbmRJbmRleCwgXy5zb3J0ZWRJbmRleCk7XG4gIF8ubGFzdEluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigtMSwgXy5maW5kTGFzdEluZGV4KTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKywgc3RhcnQgKz0gc3RlcCkge1xuICAgICAgcmFuZ2VbaWR4XSA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIERldGVybWluZXMgd2hldGhlciB0byBleGVjdXRlIGEgZnVuY3Rpb24gYXMgYSBjb25zdHJ1Y3RvclxuICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcbiAgdmFyIGV4ZWN1dGVCb3VuZCA9IGZ1bmN0aW9uKHNvdXJjZUZ1bmMsIGJvdW5kRnVuYywgY29udGV4dCwgY2FsbGluZ0NvbnRleHQsIGFyZ3MpIHtcbiAgICBpZiAoIShjYWxsaW5nQ29udGV4dCBpbnN0YW5jZW9mIGJvdW5kRnVuYykpIHJldHVybiBzb3VyY2VGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIHZhciBzZWxmID0gYmFzZUNyZWF0ZShzb3VyY2VGdW5jLnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IHNvdXJjZUZ1bmMuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgaWYgKF8uaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICBpZiAobmF0aXZlQmluZCAmJiBmdW5jLmJpbmQgPT09IG5hdGl2ZUJpbmQpIHJldHVybiBuYXRpdmVCaW5kLmFwcGx5KGZ1bmMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgY29udGV4dCwgdGhpcywgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwLCBsZW5ndGggPSBib3VuZEFyZ3MubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcmdzW2ldID0gYm91bmRBcmdzW2ldID09PSBfID8gYXJndW1lbnRzW3Bvc2l0aW9uKytdIDogYm91bmRBcmdzW2ldO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZXhlY3V0ZUJvdW5kKGZ1bmMsIGJvdW5kLCB0aGlzLCB0aGlzLCBhcmdzKTtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGksIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGtleTtcbiAgICBpZiAobGVuZ3RoIDw9IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gYXJndW1lbnRzW2ldO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjYWNoZVthZGRyZXNzXTtcbiAgICB9O1xuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gbWVtb2l6ZTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBfLnBhcnRpYWwoXy5kZWxheSwgXywgMSk7XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb24gYW5kIGFmdGVyIHRoZSBOdGggY2FsbC5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXG4gIF8uYmVmb3JlID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICB2YXIgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA+IDApIHtcbiAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lcyA8PSAxKSBmdW5jID0gbnVsbDtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gS2V5cyBpbiBJRSA8IDkgdGhhdCB3b24ndCBiZSBpdGVyYXRlZCBieSBgZm9yIGtleSBpbiAuLi5gIGFuZCB0aHVzIG1pc3NlZC5cbiAgdmFyIGhhc0VudW1CdWcgPSAhe3RvU3RyaW5nOiBudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcblxuICBmdW5jdGlvbiBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cykge1xuICAgIHZhciBub25FbnVtSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgdmFyIHByb3RvID0gKF8uaXNGdW5jdGlvbihjb25zdHJ1Y3RvcikgJiYgY29uc3RydWN0b3IucHJvdG90eXBlKSB8fCBPYmpQcm90bztcblxuICAgIC8vIENvbnN0cnVjdG9yIGlzIGEgc3BlY2lhbCBjYXNlLlxuICAgIHZhciBwcm9wID0gJ2NvbnN0cnVjdG9yJztcbiAgICBpZiAoXy5oYXMob2JqLCBwcm9wKSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkga2V5cy5wdXNoKHByb3ApO1xuXG4gICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tub25FbnVtSWR4XTtcbiAgICAgIGlmIChwcm9wIGluIG9iaiAmJiBvYmpbcHJvcF0gIT09IHByb3RvW3Byb3BdICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSB7XG4gICAgICAgIGtleXMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgbmFtZXMgb2YgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxuICBfLmFsbEtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gICAgLy8gQWhlbSwgSUUgPCA5LlxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQgb2YgdGhlIG9iamVjdFxuICAvLyBJbiBjb250cmFzdCB0byBfLm1hcCBpdCByZXR1cm5zIGFuIG9iamVjdFxuICBfLm1hcE9iamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICBfLmtleXMob2JqKSxcbiAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgICByZXN1bHRzID0ge30sXG4gICAgICAgICAgY3VycmVudEtleTtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY3VycmVudEtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgICByZXN1bHRzW2N1cnJlbnRLZXldID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMpO1xuXG4gIC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpXG4gIC8vIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduKVxuICBfLmV4dGVuZE93biA9IF8uYXNzaWduID0gY3JlYXRlQXNzaWduZXIoXy5rZXlzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBrZXkgb24gYW4gb2JqZWN0IHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3RcbiAgXy5maW5kS2V5ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksIGtleTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2tleV0sIGtleSwgb2JqKSkgcmV0dXJuIGtleTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqZWN0LCBvaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIG9iaiA9IG9iamVjdCwgaXRlcmF0ZWUsIGtleXM7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24ob2l0ZXJhdGVlKSkge1xuICAgICAga2V5cyA9IF8uYWxsS2V5cyhvYmopO1xuICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKG9pdGVyYXRlZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXMgPSBmbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7IHJldHVybiBrZXkgaW4gb2JqOyB9O1xuICAgICAgb2JqID0gT2JqZWN0KG9iaik7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iaikpIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLm9taXQgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5uZWdhdGUoaXRlcmF0ZWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ubWFwKGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzLCB0cnVlKTtcblxuICAvLyBDcmVhdGVzIGFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSBvYmplY3QuXG4gIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4gIC8vIGNyZWF0ZWQgb2JqZWN0LlxuICBfLmNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSwgcHJvcHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUNyZWF0ZShwcm90b3R5cGUpO1xuICAgIGlmIChwcm9wcykgXy5leHRlbmRPd24ocmVzdWx0LCBwcm9wcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gXy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IF8uZXh0ZW5kKHt9LCBvYmopO1xuICB9O1xuXG4gIC8vIEludm9rZXMgaW50ZXJjZXB0b3Igd2l0aCB0aGUgb2JqLCBhbmQgdGhlbiByZXR1cm5zIG9iai5cbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXG4gIC8vIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICBfLnRhcCA9IGZ1bmN0aW9uKG9iaiwgaW50ZXJjZXB0b3IpIHtcbiAgICBpbnRlcmNlcHRvcihvYmopO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uaXNNYXRjaCA9IGZ1bmN0aW9uKG9iamVjdCwgYXR0cnMpIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhhdHRycyksIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuICFsZW5ndGg7XG4gICAgdmFyIG9iaiA9IE9iamVjdChvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICB9XG5cbiAgICB2YXIgYXJlQXJyYXlzID0gY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIGlmICghYXJlQXJyYXlzKSB7XG4gICAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzIG9yIGBBcnJheWBzXG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcbiAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgaWYgKF8ua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICBrZXkgPSBrZXlzW2xlbmd0aF07XG4gICAgICAgIGlmICghKF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSAmJiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAsIGlzRXJyb3IuXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRGVmaW5lIGEgZmFsbGJhY2sgdmVyc2lvbiBvZiB0aGUgbWV0aG9kIGluIGJyb3dzZXJzIChhaGVtLCBJRSA8IDkpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmhhcyhvYmosICdjYWxsZWUnKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBzb21lIHR5cGVvZiBidWdzIGluIG9sZCB2OCxcbiAgLy8gSUUgMTEgKCMxNjIxKSwgYW5kIGluIFNhZmFyaSA4ICgjMTkyOSkuXG4gIGlmICh0eXBlb2YgLy4vICE9ICdmdW5jdGlvbicgJiYgdHlwZW9mIEludDhBcnJheSAhPSAnb2JqZWN0Jykge1xuICAgIF8uaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT09ICtvYmo7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8vIFByZWRpY2F0ZS1nZW5lcmF0aW5nIGZ1bmN0aW9ucy4gT2Z0ZW4gdXNlZnVsIG91dHNpZGUgb2YgVW5kZXJzY29yZS5cbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG4gIF8ucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAvLyBHZW5lcmF0ZXMgYSBmdW5jdGlvbiBmb3IgYSBnaXZlbiBvYmplY3QgdGhhdCByZXR1cm5zIGEgZ2l2ZW4gcHJvcGVydHkuXG4gIF8ucHJvcGVydHlPZiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IGZ1bmN0aW9uKCl7fSA6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mXG4gIC8vIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXIgPSBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIGF0dHJzID0gXy5leHRlbmRPd24oe30sIGF0dHJzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5pc01hdGNoKG9iaiwgYXR0cnMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBhY2N1bSA9IEFycmF5KE1hdGgubWF4KDAsIG4pKTtcbiAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xuICAgIHJldHVybiBhY2N1bTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IChpbmNsdXNpdmUpLlxuICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgfTtcblxuICAvLyBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xuXG4gICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgZXNjYXBlTWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OycsXG4gICAgJ2AnOiAnJiN4NjA7J1xuICB9O1xuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZXNjYXBlciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWFwW21hdGNoXTtcbiAgICB9O1xuICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZFxuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xuICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XG4gICAgICByZXR1cm4gdGVzdFJlZ2V4cC50ZXN0KHN0cmluZykgPyBzdHJpbmcucmVwbGFjZShyZXBsYWNlUmVnZXhwLCBlc2NhcGVyKSA6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcbiAgXy51bmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIodW5lc2NhcGVNYXApO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIGZhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB2b2lkIDAgOiBvYmplY3RbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICB2YWx1ZSA9IGZhbGxiYWNrO1xuICAgIH1cbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGUgICAgOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlIDogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiAgICAgIFwiJ1wiLFxuICAgICdcXFxcJzogICAgICdcXFxcJyxcbiAgICAnXFxyJzogICAgICdyJyxcbiAgICAnXFxuJzogICAgICduJyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcbiAgfTtcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAvLyBOQjogYG9sZFNldHRpbmdzYCBvbmx5IGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncywgb2xkU2V0dGluZ3MpIHtcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShlc2NhcGVyLCBlc2NhcGVDaGFyKTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuXG4gICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyAncmV0dXJuIF9fcDtcXG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XG4gICAgaW5zdGFuY2UuX2NoYWluID0gdHJ1ZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKGluc3RhbmNlLCBvYmopIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuX2NoYWluID8gXyhvYmopLmNoYWluKCkgOiBvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gX1tuYW1lXSA9IG9ialtuYW1lXTtcbiAgICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX3dyYXBwZWRdO1xuICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcy5fd3JhcHBlZDtcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIG9iaik7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBtZXRob2QuYXBwbHkodGhpcy5fd3JhcHBlZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRXh0cmFjdHMgdGhlIHJlc3VsdCBmcm9tIGEgd3JhcHBlZCBhbmQgY2hhaW5lZCBvYmplY3QuXG4gIF8ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZWQ7XG4gIH07XG5cbiAgLy8gUHJvdmlkZSB1bndyYXBwaW5nIHByb3h5IGZvciBzb21lIG1ldGhvZHMgdXNlZCBpbiBlbmdpbmUgb3BlcmF0aW9uc1xuICAvLyBzdWNoIGFzIGFyaXRobWV0aWMgYW5kIEpTT04gc3RyaW5naWZpY2F0aW9uLlxuICBfLnByb3RvdHlwZS52YWx1ZU9mID0gXy5wcm90b3R5cGUudG9KU09OID0gXy5wcm90b3R5cGUudmFsdWU7XG5cbiAgXy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJycgKyB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcbiAgLy8gdGhhdCBtYXkgbm90IGVuZm9yY2UgbmV4dC10dXJuIHNlbWFudGljcyBvbiBtb2R1bGVzLiBFdmVuIHRob3VnaCBnZW5lcmFsXG4gIC8vIHByYWN0aWNlIGZvciBBTUQgcmVnaXN0cmF0aW9uIGlzIHRvIGJlIGFub255bW91cywgdW5kZXJzY29yZSByZWdpc3RlcnNcbiAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcbiAgLy8gcG9wdWxhciBlbm91Z2ggdG8gYmUgYnVuZGxlZCBpbiBhIHRoaXJkIHBhcnR5IGxpYiwgYnV0IG5vdCBiZSBwYXJ0IG9mXG4gIC8vIGFuIEFNRCBsb2FkIHJlcXVlc3QuIFRob3NlIGNhc2VzIGNvdWxkIGdlbmVyYXRlIGFuIGVycm9yIHdoZW4gYW5cbiAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ3VuZGVyc2NvcmUnLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXztcbiAgICB9KTtcbiAgfVxufS5jYWxsKHRoaXMpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3VuZGVyc2NvcmUvdW5kZXJzY29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSAnLi92ZWN0b3IyZCc7XG5pbXBvcnQgSW50ZXJzZWN0aW9uMkQgZnJvbSAnLi9pbnRlcnNlY3Rpb24yZCc7XG5cbi8vc2hhbGxvdyBoYXNPd25Qcm9wZXJ0eSBjaGVja1xuY29uc3QgaGFzUHJvcCA9IChvYmosIHByb3ApID0+IHtcbiAgcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmUyRCB7XG5cbiAgLyoqXG4gICAqIGEgbGluZSBjb21wb3NlZCBvZiBhIHN0YXJ0IGFuZCBlbmQgcG9pbnRcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHN0YXJ0XG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IGVuZFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhcnQsIGVuZCkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHRoaXMuX3N0YXJ0ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgICB0aGlzLl9lbmQgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAxOlxuICAgICAgaW52YXJpYW50KGhhc1Byb3Aoc3RhcnQsICd4MScpICYmIGhhc1Byb3Aoc3RhcnQsICd5MScpICYmIGhhc1Byb3Aoc3RhcnQsICd4MicpICYmIGhhc1Byb3Aoc3RhcnQsICd5MicpLCAnQmFkIHBhcmFtZXRlcicpO1xuICAgICAgdGhpcy5fc3RhcnQgPSBuZXcgVmVjdG9yMkQoc3RhcnQueDEsIHN0YXJ0LnkxKTtcbiAgICAgIHRoaXMuX2VuZCA9IG5ldyBWZWN0b3IyRChzdGFydC54Miwgc3RhcnQueTIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6XG4gICAgICB0aGlzLl9zdGFydCA9IHN0YXJ0LmNsb25lKCk7XG4gICAgICB0aGlzLl9lbmQgPSBlbmQuY2xvbmUoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSA0OlxuICAgICAgdGhpcy5fc3RhcnQgPSBuZXcgVmVjdG9yMkQoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuICAgICAgdGhpcy5fZW5kID0gbmV3IFZlY3RvcjJEKGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIHBhcmFtZXRlcnMnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZ2V0dGVyIGZvciBzdGFydCBvZiBsaW5lXG4gICAqIEByZXR1cm4ge1ZlY3RvcjJEfSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBnZXQgc3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0LmNsb25lKCk7XG4gIH1cblxuICAvKipcbiAgICogc2V0dGVyIGZvciBzdGFydFxuICAgKiBAcGFyYW0gIHtWZWN0b3IyRH0gdmVjdG9yXG4gICAqL1xuICBzZXQgc3RhcnQodmVjdG9yKSB7XG4gICAgdGhpcy5fc3RhcnQgPSB2ZWN0b3IuY2xvbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXR0ZXIgZm9yIGVuZCBvZiBsaW5lXG4gICAqIEByZXR1cm4ge1ZlY3RvcjJEfSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBnZXQgZW5kKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmQuY2xvbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXR0ZXIgZm9yIGVuZFxuICAgKiBAcGFyYW0gIHtWZWN0b3IyRH0gdmVjdG9yXG4gICAqL1xuICBzZXQgc3RhcnQodmVjdG9yKSB7XG4gICAgdGhpcy5fZW5kID0gdmVjdG9yLmNsb25lKCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0dGVyIGZvciB4IHN0YXJ0XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldCB4MSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydC54O1xuICB9XG5cbiAgLyoqXG4gICAqIGdldHRlciBmb3IgeSBzdGFydFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgeTEoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnQueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXR0ZXIgZm9yIHggZW5kXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldCB4MigpIHtcbiAgICByZXR1cm4gdGhpcy5lbmQueDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXR0ZXIgZm9yIHkgZW5kXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldCB5MigpIHtcbiAgICByZXR1cm4gdGhpcy5lbmQueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjbG9uZSB0aGUgbGluZVxuICAgKiBAcmV0dXJuIHtMaW5lMkR9XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IExpbmUyRCh0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gIH1cblxuICAvKipcbiAgICogSlNPTmFibGUgdmVyc2lvbiBvZiBvYmplY3RcbiAgICogQHJldHVybiBvYmplY3RcbiAgICovXG4gIHRvT2JqZWN0KCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogdGhpcy5zdGFydC50b09iamVjdCgpLFxuICAgICAgZW5kICA6IHRoaXMuZW5kLnRvT2JqZWN0KCksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGF0aWMgY29uc3RydWN0b3IsIHByb2R1Y2VzIGEgTGluZSBmcm9tIHRoZSBwcm9kdWN0IG9mIHRvT2JqZWN0XG4gICAqIEBwYXJhbSAge29iamVjdH0gb2JqXG4gICAqIEByZXR1cm4gTGluZTJEXG4gICAqL1xuICBzdGF0aWMgZnJvbU9iamVjdChvYmopIHtcbiAgICBpbnZhcmlhbnQob2JqICYmIG9iai5zdGFydCAmJiBvYmouZW5kLCAnQmFkIHBhcmFtZXRlcicpO1xuICAgIHJldHVybiBuZXcgTGluZTJEKFZlY3RvcjJELmZyb21PYmplY3Qob2JqLnN0YXJ0KSwgVmVjdG9yMkQuZnJvbU9iamVjdChvYmouZW5kKSk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIGxlbmd0aCBvZiBsaW5lXG4gICAqIHJldHVybiBudW1iZXJcbiAgICovXG4gIGxlbigpIHtcbiAgICBjb25zdCB4bCA9IHRoaXMueDIgLSB0aGlzLngxO1xuICAgIGNvbnN0IHlsID0gdGhpcy55MiAtIHRoaXMueTE7XG4gICAgcmV0dXJuIE1hdGguc3FydCh4bCAqIHhsICsgeWwgKiB5bCk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRoZSBzbG9wZSBvZiB0aGUgbGluZS4gUmV0dXJucyBpbmZpbml0eSBpZiB0aGUgbGluZSBpcyB2ZXJ0aWNhbFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHNsb3BlKCkge1xuICAgIGNvbnN0IHhkID0gKHRoaXMuc3RhcnQueCAtIHRoaXMuZW5kLngpO1xuICAgIGlmICh4ZCA9PT0gMCkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuc3RhcnQueSAtIHRoaXMuZW5kLnkpIC8geGQ7XG4gIH1cblxuICAvKipcbiAgICogZGlzdGFuY2Ugb2YgcG9pbnQgdG8gbGluZSBzZWdtZW50IGZvcm1lZCBieSB0aGlzLnN0YXJ0LCB0aGlzLmVuZCBzcXVhcmVkLlxuICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSBwb2ludFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGRpc3RhbmNlVG9TZWdtZW50KHBvaW50KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlVG9TZWdtZW50U3F1YXJlZChwb2ludCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0aGUgc3F1YXJlZCBkaXN0YW5jZSBvZiB0aGUgcG9pbnQgdG8gdGhpcyBsaW5lXG4gICAqIEBwYXJhbSAge1ZlY3RvcjJEfSBwb2ludFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBkaXN0YW5jZVRvU2VnbWVudFNxdWFyZWQocG9pbnQpIHtcbiAgICBmdW5jdGlvbiBzcXIoeHApIHtcbiAgICAgIHJldHVybiB4cCAqIHhwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3QyKHAxLCBwMikge1xuICAgICAgcmV0dXJuIHNxcihwMS54IC0gcDIueCkgKyBzcXIocDEueSAtIHAyLnkpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0diA9IHRoaXMuc3RhcnQ7XG4gICAgY29uc3QgZW5kdiA9IHRoaXMuZW5kO1xuICAgIGNvbnN0IGwyID0gZGlzdDIoc3RhcnR2LCBlbmR2KTtcbiAgICBpZiAobDIgPT09IDApIHtcbiAgICAgIHJldHVybiBkaXN0Mihwb2ludCwgc3RhcnR2KTtcbiAgICB9XG4gICAgY29uc3QgZHN0ID0gKChwb2ludC54IC0gc3RhcnR2LngpICogKGVuZHYueCAtIHN0YXJ0di54KSArIChwb2ludC55IC0gc3RhcnR2LnkpICogKGVuZHYueSAtIHN0YXJ0di55KSkgLyBsMjtcbiAgICBpZiAoZHN0IDwgMCkge1xuICAgICAgcmV0dXJuIGRpc3QyKHBvaW50LCBzdGFydHYpO1xuICAgIH1cbiAgICBpZiAoZHN0ID4gMSkge1xuICAgICAgcmV0dXJuIGRpc3QyKHBvaW50LCBlbmR2KTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3QyKHBvaW50LCB7XG4gICAgICB4OiBzdGFydHYueCArIGRzdCAqIChlbmR2LnggLSBzdGFydHYueCksXG4gICAgICB5OiBzdGFydHYueSArIGRzdCAqIChlbmR2LnkgLSBzdGFydHYueSksXG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBwYXJhbWV0cmljIHBvaW50IG9uIGxpbmVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBvaW50XG4gICAqL1xuICBwb2ludE9uTGluZShwb2ludCkge1xuICAgIGNvbnN0IHggPSB0aGlzLngxICsgKHRoaXMueDIgLSB0aGlzLngxKSAqIHBvaW50O1xuICAgIGNvbnN0IHkgPSB0aGlzLnkxICsgKHRoaXMueTIgLSB0aGlzLnkxKSAqIHBvaW50O1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQoeCwgeSk7XG4gIH1cblxuICAvKipcbiAgICogaW50ZXJzZWN0aW9uIG9mIHRoaXMgbGluZSB3aXRoIGFub3RoZXIgbGluZS4gVGhpcyBpcyByZWFsbHkgbGluZSBzZWdtZW50IGludGVyc2VjdGlvbiBzaW5jZVxuICAgKiBpdCBjb25zaWRlcnMgdGhlIGxpbmVzIGZpbml0ZSBhcyBkZWZpbmVkIGJ5IHRoZWlyIGVuZCBwb2ludHNcblxuICAgKiBAcGFyYW0ge0xpbmUyRH0gb3RoZXIgLSBvdGhlciBsaW5lIHNlZ21lbnQgdG8gaW50ZXJzZWN0IHdpdGhcbiAgICogQHJldHVybnMge0ludGVyc2VjdGlvbjJEfVxuICAgKi9cbiAgaW50ZXJzZWN0V2l0aExpbmUob3RoZXIpIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGNvbnN0IHVhVCA9IChvdGhlci54MiAtIG90aGVyLngxKSAqICh0aGlzLnkxIC0gb3RoZXIueTEpIC0gKG90aGVyLnkyIC0gb3RoZXIueTEpICogKHRoaXMueDEgLSBvdGhlci54MSk7XG4gICAgY29uc3QgdWJUID0gKHRoaXMueDIgLSB0aGlzLngxKSAqICh0aGlzLnkxIC0gb3RoZXIueTEpIC0gKHRoaXMueTIgLSB0aGlzLnkxKSAqICh0aGlzLngxIC0gb3RoZXIueDEpO1xuICAgIGNvbnN0IHVCID0gKG90aGVyLnkyIC0gb3RoZXIueTEpICogKHRoaXMueDIgLSB0aGlzLngxKSAtIChvdGhlci54MiAtIG90aGVyLngxKSAqICh0aGlzLnkyIC0gdGhpcy55MSk7XG5cbiAgICBpZiAodUIgIT09IDApIHtcbiAgICAgIGNvbnN0IHVhID0gdWFUIC8gdUI7XG4gICAgICBjb25zdCB1YiA9IHViVCAvIHVCO1xuXG4gICAgICBpZiAodWEgPj0gMCAmJiB1YSA8PSAxICYmIHViID49IDAgJiYgdWIgPD0gMSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW50ZXJzZWN0aW9uMkQobmV3IFZlY3RvcjJEKFxuICAgICAgICAgIHRoaXMueDEgKyB1YSAqICh0aGlzLngyIC0gdGhpcy54MSksXG4gICAgICAgICAgdGhpcy55MSArIHVhICogKHRoaXMueTIgLSB0aGlzLnkxKVxuICAgICAgICApKTtcblxuICAgICAgICByZXN1bHQuc3RhdHVzID0gJ0ludGVyc2VjdGlvbic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW50ZXJzZWN0aW9uMkQoJ05vIEludGVyc2VjdGlvbicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodWFUID09PSAwIHx8IHViVCA9PT0gMCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW50ZXJzZWN0aW9uMkQoJ0NvaW5jaWRlbnQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBJbnRlcnNlY3Rpb24yRCgnUGFyYWxsZWwnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBtdWx0aXBsZSAvIHNjYWxlIHRoZSBsaW5lIGJ5IHRoZSBnaXZlbiBjb2VmZmVjaWVudFxuICAgKiBAcGFyYW0gKG51bW5lcikgdlxuICAgKi9cbiAgbXVsdGlwbHkobXVsdGlwbGllcikge1xuICAgIHJldHVybiBuZXcgTGluZTJEKHRoaXMuc3RhcnQubXVsdGlwbHkobXVsdGlwbGllciksIHRoaXMuZW5kLm11bHRpcGx5KG11bHRpcGxpZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdHJpbmdpZnkgdGhlIGxpbmVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBsaW5lMmQ6ICR7dGhpcy5zdGFydC50b1N0cmluZygpfSA6ICR7dGhpcy5lbmQudG9TdHJpbmcoKX1gO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2phdmFzY3JpcHRzL2dlb21ldHJ5L2xpbmUyZC5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJzZWN0aW9uMkQge1xuICAvKipcbiAgICogdGhlIGdlbmVyaWMgcmVzdWx0cyBvZiB2YXJpb3VzIHR5cGVzIG9mIGludGVyc2VjdGlvbiB0ZXN0LlxuICAgKiBGb3IgdmFsaWQgaW50ZXJzZWN0aW9ucyB0aGUgcG9pbnRzIHByb3BlcnR5IGlzIGFuIGFycmF5IG9mXG4gICAqIFZlY3RvcjJEIG9iamVjdHMuIFRoZXJlIGlzIGFsc28gYSBwb2ludCBwcm9wZXJ0eSB0aGF0IHJldHVybnNcbiAgICogdGhlIGZpcnN0IHBvaW50IGluIHRoZSBwb2ludHMgYXJyYXkuIFRoZSBzdGF0dXMgcHJvcGVydHkgaXMgYSBzdHJpbmcgdGhhdCBpbmRpY2F0ZXMgd2h5IHRoZSBpbnRlcnNlY3Rpb24gdGVzdFxuICAgKiBmYWlsZWQgaWYgYW55XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0cuVmVjdG9yMkR8U3RyaW5nfHVuZGVmaW5lZH0gYXJnIC0gY2FuIGJlIGEgdmVjdG9yIG9yIGEgc3RhdHVzIHN0cmluZyBvciBub3RoaW5nXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhcmcpIHtcbiAgICBpZiAoYXJnICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVmVjdG9yMkQnKSB7XG4gICAgICB0aGlzLnBvaW50cyA9IFthcmddO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gYXJnO1xuICAgICAgfVxuICAgICAgdGhpcy5wb2ludHMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRoZSBmaXJzdCBwb2ludCBpbiBvdXIgaW50ZXJzZWN0aW9uIHNldCBvciBudWxsIGlmIHRoZXJlIGFyZSBubyBpbnRlcnNlY3Rpb25zXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgZ2V0IHBvaW50KCkge1xuICAgIGlmICh0aGlzLnBvaW50cyAmJiB0aGlzLnBvaW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvaW50c1swXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIG91ciBzdGF0dXMgc3RyaW5nXG4gICAqIEByZXR1cm4gU3RyaW5nXG4gICAqL1xuICBnZXQgc3RhdHVzKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XG4gIH1cblxuICAvKipcbiAgICogc2V0dGVyIGZvciBvdXIgc3RhdHVzXG4gICAqIEBwYXJhbSAge1N0cmluZ30gc3RyXG4gICAqL1xuICBzZXQgc3RhdHVzKHN0cikge1xuICAgIGludmFyaWFudCh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJywgJ2V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gICAgdGhpcy5fc3RhdHVzID0gc3RyO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhIHBvaW50IHRvIG91ciBpbnRlcnNlY3Rpb24gc2V0XG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IHBvaW50XG4gICAqL1xuICBhZGQocG9pbnQpIHtcbiAgICB0aGlzLnBvaW50cyA9IHRoaXMucG9pbnRzIHx8IFtdO1xuICAgIHRoaXMucG9pbnRzLnB1c2gocG9pbnQpO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2phdmFzY3JpcHRzL2dlb21ldHJ5L2ludGVyc2VjdGlvbjJkLmpzXG4gKiovIiwiaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4vdmVjdG9yMmQnO1xuaW1wb3J0IExpbmUyRCBmcm9tICcuL2xpbmUyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveDJEIHtcbiAgLyoqXG4gICAqIGZsZXhpYmxlIGF4aXMgYWxpZ25lZCBib3ggY2xhc3MuIENhbiBiZSBpbml0aWFsaXplZCB3aXRoIGFsbW9zdCBhbnlcbiAgICogcmVhc29uYWJsZSB2YWx1ZXMgb3Igb2JqZWN0IGkuZS4gNCBudW1iZXJzLCBhbiBvYmplY3Qgd2l0aCBhIGNvbWJpbmF0aW9uXG4gICAqIG9yIHgseSx3LGgsbCx0LHIsYixsZWZ0LHRvcCxyaWdodCxib3R0b20sd2lkdGgsaGVpZ2h0XG4gICAqIEBwYXJhbSBbeF1cbiAgICogQHBhcmFtIFt5XVxuICAgKiBAcGFyYW0gW3ddXG4gICAqIEBwYXJhbSBbaF1cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XG4gICAgLy8gcGFyc2UgYXJndW1lbnRzXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy53ID0gdztcbiAgICAgIHRoaXMuaCA9IGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIC8vIG1hcCB0aGUgcHJvcGVydGllcyAoIGtleXMgKSwgaWYgcHJlc2VudCwgdG8gb3VyXG4gICAgICAgIC8vIG5hbWVkIHByb3BlcnR5ICggdGhlIHZhbHVlcyApXG4gICAgICAgIHRoaXMuZXh0ZW5kKGFyZ3VtZW50c1swXSwge1xuICAgICAgICAgIHggICAgIDogJ3gnLFxuICAgICAgICAgIGxlZnQgIDogJ3gnLFxuICAgICAgICAgIHkgICAgIDogJ3knLFxuICAgICAgICAgIHRvcCAgIDogJ3knLFxuICAgICAgICAgIHcgICAgIDogJ3cnLFxuICAgICAgICAgIGggICAgIDogJ2gnLFxuICAgICAgICAgIHdpZHRoIDogJ3cnLFxuICAgICAgICAgIGhlaWdodDogJ2gnLFxuICAgICAgICAgIHJpZ2h0IDogJ3InLFxuICAgICAgICAgIGJvdHRvbTogJ2InLFxuICAgICAgICAgIHIgICAgIDogJ3InLFxuICAgICAgICAgIGIgICAgIDogJ2InLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy54ID0gdGhpcy55ID0gdGhpcy53ID0gdGhpcy5oID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBwYXJhbWV0ZXJzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZXh0ZW5kIG91cnNlbHZlcyB3aXRoIGFueSBvZiB0aGUgcHJvcGVydHkgbmFtZXMgaW4gcHJvcHMsXG4gICAqIHJlbmFtaW5nIHRoZW0gdG8gdGhlIGdpdmVuIHRhcmdldCBwcm9wZXJ0eSBuYW1lXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gZnJvbSAgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtbdHlwZV19IHByb3BzIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBleHRlbmQoZnJvbSwgcHJvcHMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgaWYgKGZyb20uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzW3Byb3BzW2tleV1dID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBzaW1wbGUgdG9TdHJpbmcgNCBDU1YgdmFsdWVzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMueH0sICR7dGhpcy55fSwgJHt0aGlzLnd9LCAke3RoaXMuaH1gO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdCBhIGJveCBmcm9tIGEgc3RyaW5nLCBvcHBvc2l0ZSBvZiB0b1N0cmluZ1xuICAgKi9cbiAgc3RhdGljIGZyb21TdHJpbmcoc3RyKSB7XG4gICAgaW52YXJpYW50KHN0ciwgJ0JhZCBwYXJhbWV0ZXInKTtcbiAgICBjb25zdCB2YWx1ZXMgPSBzdHIuc3BsaXQoJywnKTtcbiAgICBpbnZhcmlhbnQodmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPT09IDQsICdVbmV4cGVjdGVkIGZvcm1hdCcpO1xuICAgIHJldHVybiBuZXcgQm94MkQocGFyc2VGbG9hdCh2YWx1ZXNbMF0pLCBwYXJzZUZsb2F0KHZhbHVlc1sxXSksIHBhcnNlRmxvYXQodmFsdWVzWzJdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbM10pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gYW4gQUFCQiBkZWZpbmVkIGJ5IHRoZSBsaW1pdHMgb2YgdGhpcyBwb2ludFxuICAgKiBhbmQgYW5vdGhlciBwb2ludFxuICAgKiBAcGFyYW0gIHtbVmVjdG9yMkR9IGFyeVxuICAgKiBAcmV0dXJuIHtCb3gyRH1cbiAgICovXG4gIHN0YXRpYyBib3hGcm9tUG9pbnRzKGFyeSkge1xuICAgIGxldCB4bWluID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICBsZXQgeW1pbiA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgbGV0IHhtYXggPSAtTnVtYmVyLk1BWF9WQUxVRTtcbiAgICBsZXQgeW1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHhtaW4gPSBNYXRoLm1pbih4bWluLCBhcnlbaV0ueCk7XG4gICAgICB5bWluID0gTWF0aC5taW4oeW1pbiwgYXJ5W2ldLnkpO1xuICAgICAgeG1heCA9IE1hdGgubWF4KHhtYXgsIGFyeVtpXS54KTtcbiAgICAgIHltYXggPSBNYXRoLm1heCh5bWF4LCBhcnlbaV0ueSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCb3gyRCh4bWluLCB5bWluLCB4bWF4IC0geG1pbiwgeW1heCAtIHltaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIGFjY2Vzc29ycyBmb3IgYWxsIGNvcm5lcnMsIGVkZ2VzIG9mIHRoZSBib3hcbiAgICovXG4gIGdldCBsZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLng7XG4gIH1cblxuICBzZXQgbGVmdChfeCkge1xuICAgIHRoaXMueCA9IF94O1xuICB9XG5cbiAgZ2V0IHdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLnc7XG4gIH1cblxuICBzZXQgd2lkdGgoX3cpIHtcbiAgICB0aGlzLncgPSBfdztcbiAgfVxuXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaDtcbiAgfVxuXG4gIHNldCBoZWlnaHQoX2gpIHtcbiAgICB0aGlzLmggPSBfaDtcbiAgfVxuXG4gIGdldCB0b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMueTtcbiAgfVxuXG4gIHNldCB0b3AoX3kpIHtcbiAgICB0aGlzLnkgPSBfeTtcbiAgfVxuXG4gIGdldCByaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53O1xuICB9XG5cbiAgc2V0IHJpZ2h0KF9yKSB7XG4gICAgdGhpcy53ID0gX3IgLSB0aGlzLng7XG4gIH1cblxuICBnZXQgYm90dG9tKCkge1xuICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmg7XG4gIH1cblxuICBzZXQgYm90dG9tKF9iKSB7XG4gICAgdGhpcy5oID0gX2IgLSB0aGlzLnk7XG4gIH1cblxuICBnZXQgY3goKSB7XG4gICAgcmV0dXJuIHRoaXMueCArIHRoaXMudyAvIDI7XG4gIH1cblxuICBzZXQgY3goX2N4KSB7XG4gICAgdGhpcy54ID0gX2N4IC0gdGhpcy53IC8gMjtcbiAgfVxuXG4gIGdldCBjeSgpIHtcbiAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oIC8gMjtcbiAgfVxuXG4gIHNldCBjeShfY3kpIHtcbiAgICB0aGlzLnkgPSBfY3kgLSB0aGlzLmggLyAyO1xuICB9XG5cbiAgZ2V0IGNlbnRlcigpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMuY3gsIHRoaXMuY3kpO1xuICB9XG5cbiAgc2V0IGNlbnRlcih2ZWN0b3IpIHtcbiAgICB0aGlzLmN4ID0gdmVjdG9yLng7XG4gICAgdGhpcy5jeSA9IHZlY3Rvci55O1xuICB9XG5cbiAgZ2V0IHRvcExlZnQoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSk7XG4gIH1cblxuICBzZXQgdG9wTGVmdCh2ZWN0b3IpIHtcbiAgICB0aGlzLnggPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgPSB2ZWN0b3IueTtcbiAgfVxuXG4gIGdldCB0b3BSaWdodCgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMucmlnaHQsIHRoaXMueSk7XG4gIH1cblxuICBzZXQgdG9wUmlnaHQodmVjdG9yKSB7XG4gICAgdGhpcy5yaWdodCA9IHZlY3Rvci54O1xuICAgIHRoaXMueSA9IHZlY3Rvci55O1xuICB9XG5cbiAgZ2V0IGJvdHRvbVJpZ2h0KCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy5yaWdodCwgdGhpcy5ib3R0b20pO1xuICB9XG5cbiAgc2V0IGJvdHRvbVJpZ2h0KHZlY3Rvcikge1xuICAgIHRoaXMucmlnaHQgPSB2ZWN0b3IueDtcbiAgICB0aGlzLmJvdHRvbSA9IHZlY3Rvci55O1xuICB9XG5cbiAgZ2V0IGJvdHRvbUxlZnQoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMuYm90dG9tKTtcbiAgfVxuXG4gIHNldCBib3R0b21MZWZ0KHZlY3Rvcikge1xuICAgIHRoaXMueCA9IHZlY3Rvci54O1xuICAgIHRoaXMuYm90dG9tID0gdmVjdG9yLnk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIGEgY2xvbmVkIGNvcHkgb2YgdGhpc1xuICAgKiBAcmV0dXJuIEJveDJEXG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IEJveDJEKHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XG4gIH1cblxuICAvKipcbiAgICogbm9ybWFsaXplIGJ5IHJldHVybmluZyBhIG5ldyBib3ggd2l0aCBwb3NpdGl2ZSBleHRlbnRzXG4gICAqL1xuICBub3JtYWxpemUoKSB7XG4gICAgcmV0dXJuIG5ldyBCb3gyRChcbiAgICAgIE1hdGgubWluKHRoaXMueCwgdGhpcy5yaWdodCksXG4gICAgICBNYXRoLm1pbih0aGlzLnksIHRoaXMuYm90dG9tKSxcbiAgICAgIE1hdGguYWJzKHRoaXMudyksXG4gICAgICBNYXRoLmFicyh0aGlzLmgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gYSBuZXcgQm94IGluZmxhdGVkIGJ5IHRoZSBnaXZlbiBzaWduZWQgYW1vdW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmZsYXRlWFxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5mbGF0ZVlcbiAgICovXG4gIGluZmxhdGUoaW5mbGF0ZVgsIGluZmxhdGVZKSB7XG4gICAgY29uc3QgYm94ID0gbmV3IEJveDJEKHRoaXMueCwgdGhpcy55LCB0aGlzLncgKyBpbmZsYXRlWCAqIDIsIHRoaXMuaCArIGluZmxhdGVZICogMik7XG4gICAgYm94LmN4ID0gdGhpcy5jeDtcbiAgICBib3guY3kgPSB0aGlzLmN5O1xuICAgIHJldHVybiBib3g7XG4gIH1cblxuICAvKipcbiAgICogc2NhbGUgd2lkdGgvaGVpZ2h0IG9mIGJveCBhcm91bmQgY2VudGVyIHJldHVybmluZyBhIG5ldyBib3hcbiAgICogQHBhcmFtIHhcbiAgICogQHBhcmFtIHlcbiAgICovXG4gIHNjYWxlKHgsIHkpIHtcbiAgICByZXR1cm4gbmV3IEJveDJEKFxuICAgICAgdGhpcy5jeCAtICh0aGlzLndpZHRoICogeCkgLyAyLFxuICAgICAgdGhpcy5jeSAtICh0aGlzLmhlaWdodCAqIHkpIC8gMixcbiAgICAgIHRoaXMud2lkdGggKiB4LFxuICAgICAgdGhpcy5oZWlnaHQgKiB5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gYSBuZXcgYm94IHRoYXQgaXMgdGhpcyBib3ggKiBlXG4gICAqIEBwYXJhbSBtdWx0aXBsaWVyXG4gICAqL1xuICBtdWx0aXBseShtdWx0aXBsaWVyKSB7XG4gICAgcmV0dXJuIG5ldyBCb3gyRCh0aGlzLnggKiBtdWx0aXBsaWVyLCB0aGlzLnkgKiBtdWx0aXBsaWVyLCB0aGlzLndpZHRoICogbXVsdGlwbGllciwgdGhpcy5oZWlnaHQgKiBtdWx0aXBsaWVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gYSBuZXcgYm94IHRoYXQgaXMgdGhpcyBib3ggLyBlXG4gICAqIEBwYXJhbSBkaXZpc29yXG4gICAqL1xuICBkaXZpZGUoZGl2aXNvcikge1xuICAgIHJldHVybiBuZXcgQm94MkQodGhpcy54IC8gZGl2aXNvciwgdGhpcy55IC8gZGl2aXNvciwgdGhpcy53aWR0aCAvIGRpdmlzb3IsIHRoaXMuaGVpZ2h0IC8gZGl2aXNvcik7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRydWUgaWYgdGhpcyBib3ggaXMgaWRlbnRpY2FsIHRvIGFub3RoZXIgYm94XG4gICAqIEBwYXJhbSBvdGhlclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGVxdWFscyhvdGhlcikge1xuICAgIHJldHVybiBvdGhlci54ID09PSB0aGlzLnggJiZcbiAgICAgIG90aGVyLnkgPT09IHRoaXMueSAmJlxuICAgICAgb3RoZXIud2lkdGggPT09IHRoaXMud2lkdGggJiZcbiAgICAgIG90aGVyLmhlaWdodCA9PT0gdGhpcy5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIGEgbmV3IGJveCB0aGF0IGlzIHRoZSB1bmlvbiBvZiB0aGlzIGJveCBhbmQgc29tZSBvdGhlciBib3gvcmVjdCBsaWtlIG9iamVjdFxuICAgKiBAcGFyYW0gYm94IC0gYW55dGhpbmcgd2l0aCB4LHksdyxoIHByb3BlcnRpZXNcbiAgICogQHJldHVybnMgQm94MkQgLSB0aGUgdW5pb24gb2YgdGhpcyBhbmQgYm94XG4gICAqL1xuICB1bmlvbihib3gpIHtcbiAgICBjb25zdCB1bmkgPSBuZXcgQm94MkQoXG4gICAgICBNYXRoLm1pbih0aGlzLngsIGJveC54KSxcbiAgICAgIE1hdGgubWluKHRoaXMueSwgYm94LnkpLFxuICAgICAgMCwgMFxuICAgICk7XG5cbiAgICB1bmkucmlnaHQgPSBNYXRoLm1heCh0aGlzLnJpZ2h0LCBib3gueCArIGJveC53KTtcbiAgICB1bmkuYm90dG9tID0gTWF0aC5tYXgodGhpcy5ib3R0b20sIGJveC55ICsgYm94LmgpO1xuXG4gICAgcmV0dXJuIHVuaTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIG50aCBlZGdlXG4gICAqIDA6IHRvcCBsZWZ0IC0+IHRvcCByaWdodFxuICAgKiAxOiB0b3AgcmlnaHQgLT4gYm90dG9tIHJpZ2h0XG4gICAqIDI6IGJvdHRvbSByaWdodCAtPiBib3R0b20gbGVmdFxuICAgKiAzOiBib3R0b20gbGVmdCAtPiB0b3AgbGVmdFxuICAgKiBAcGFyYW0ge051bWJlcn0gbnRoXG4gICAqL1xuICBnZXRFZGdlKG50aCkge1xuICAgIGludmFyaWFudChudGggPj0gMCAmJiBudGggPCA0LCAnQmFkIHBhcmFtZXRlcicpO1xuICAgIHN3aXRjaCAobnRoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIG5ldyBMaW5lMkQobmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55KSwgbmV3IFZlY3RvcjJEKHRoaXMucmlnaHQsIHRoaXMueSkpO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBuZXcgTGluZTJEKG5ldyBWZWN0b3IyRCh0aGlzLnJpZ2h0LCB0aGlzLnkpLCBuZXcgVmVjdG9yMkQodGhpcy5yaWdodCwgdGhpcy5ib3R0b20pKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gbmV3IExpbmUyRChuZXcgVmVjdG9yMkQodGhpcy5yaWdodCwgdGhpcy5ib3R0b20pLCBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLmJvdHRvbSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbmV3IExpbmUyRChuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLmJvdHRvbSksIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gdGhlIHVuaW9uIG9mIHRoZSBnaXZlbiBib3hlcyBvciBhbiBlbXB0eSBib3ggaWYgdGhlIGxpc3QgaXMgZW1wdHlcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHVuaW9uKGJveGVzKSB7XG4gICAgY29uc3QgdW5pID0gbmV3IEJveDJEKDAsIDAsIDAsIDApO1xuXG4gICAgaWYgKGJveGVzICYmIGJveGVzLmxlbmd0aCkge1xuICAgICAgdW5pLnggPSBNYXRoLm1pbi5hcHBseShudWxsLCBib3hlcy5tYXAoYm94ID0+IGJveC54KSk7XG4gICAgICB1bmkueSA9IE1hdGgubWluLmFwcGx5KG51bGwsIGJveGVzLm1hcChib3ggPT4gYm94LnkpKTtcbiAgICAgIHVuaS5yID0gTWF0aC5taW4uYXBwbHkobnVsbCwgYm94ZXMubWFwKGJveCA9PiBib3gucikpO1xuICAgICAgdW5pLmIgPSBNYXRoLm1pbi5hcHBseShudWxsLCBib3hlcy5tYXAoYm94ID0+IGJveC5iKSk7XG4gICAgfVxuICAgIHJldHVybiB1bmk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhpcyBib3ggd2l0aCB0aGUgb3RoZXIgYm94XG4gICAqIEBwYXJhbSBib3hcbiAgICovXG4gIGludGVyc2VjdFdpdGhCb3goYm94KSB7XG4gICAgLy8gbWluaW11bSBvZiByaWdodCBlZGdlc1xuICAgIGNvbnN0IG1pbnggPSBNYXRoLm1pbih0aGlzLnJpZ2h0LCBib3gucmlnaHQpO1xuICAgIC8vIG1heGltdW0gb2YgbGVmdCBlZGdlc1xuICAgIGNvbnN0IG1heHggPSBNYXRoLm1heCh0aGlzLngsIGJveC54KTtcbiAgICAvLyBtaW5pbXVtIG9mIGJvdHRvbSBlZGdlc1xuICAgIGNvbnN0IG1pbnkgPSBNYXRoLm1pbih0aGlzLmJvdHRvbSwgYm94LmJvdHRvbSk7XG4gICAgLy8gbWF4aW11bSBvZiB0b3AgZWRnZXNcbiAgICBjb25zdCBtYXh5ID0gTWF0aC5tYXgodGhpcy55LCBib3gueSk7XG4gICAgLy8gaWYgYXJlYSBpcyBncmVhdGVyIHRoYW4gemVybyB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cbiAgICBpZiAobWF4eCA8IG1pbnggJiYgbWF4eSA8IG1pbnkpIHtcbiAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihtaW54LCBtYXh4KTtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLm1pbihtaW55LCBtYXh5KTtcbiAgICAgIGNvbnN0IHcgPSBNYXRoLm1heChtaW54LCBtYXh4KSAtIHg7XG4gICAgICBjb25zdCBoID0gTWF0aC5tYXgobWlueSwgbWF4eSkgLSB5O1xuICAgICAgcmV0dXJuIG5ldyBCb3gyRCh4LCB5LCB3LCBoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRydWUgaWYgd2UgYXJlIGNvbXBsZXRlbHkgaW5zaWRlIHRoZSBvdGhlciBib3hcbiAgICogQHBhcmFtIG90aGVyXG4gICAqL1xuICBpc0luc2lkZShvdGhlcikge1xuICAgIHJldHVybiB0aGlzLnggPj0gb3RoZXIueCAmJlxuICAgICAgdGhpcy55ID49IG90aGVyLnkgJiZcbiAgICAgIHRoaXMucmlnaHQgPD0gb3RoZXIucmlnaHQgJiZcbiAgICAgIHRoaXMuYm90dG9tIDw9IG90aGVyLmJvdHRvbTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGUgZ2l2ZW4gcG9pbnQgKCBhbnl0aGluZyB3aXRoIHgveSBwcm9wZXJ0aWVzICkgaXMgaW5zaWRlIHRoZSBib3hcbiAgICogQHBhcmFtIHBvaW50XG4gICAqL1xuICBwb2ludEluQm94KHBvaW50KSB7XG4gICAgcmV0dXJuIHBvaW50LnggPj0gdGhpcy54ICYmIHBvaW50LnkgPj0gdGhpcy55ICYmIHBvaW50LnggPCB0aGlzLnJpZ2h0ICYmIHBvaW50LnkgPCB0aGlzLmJvdHRvbTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGUgYm94IGhhdmUgemVybyBvciBuZWdhdGl2ZSBleHRlbnRzIGluIGVpdGhlciBheGlzXG4gICAqL1xuICBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLncgPD0gMCB8fCB0aGlzLmggPD0gMDtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qYXZhc2NyaXB0cy9nZW9tZXRyeS9ib3gyZC5qc1xuICoqLyIsImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuLi9nZW9tZXRyeS92ZWN0b3IyZCc7XG5pbXBvcnQgRCBmcm9tICcuLi9kb20vZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld2VyU3RhdHVzQmFyIHtcblxuICAvKipcbiAgICogY29uc3RydWN0b3Igb25seSBuZWVkcyB0aGUgdmlld2VyXG4gICAqIEBwYXJhbSB2aWV3ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHZpZXdlcikge1xuICAgIHRoaXMudmlld2VyID0gdmlld2VyO1xuICAgIHRoaXMub3V0ZXIgPSBEKFxuICAgICAgYDxkaXYgY2xhc3M9XCJ2aWV3ZXItc3RhdHVzLWJhclwiPlxuICAgICAgICA8c3Bhbj5TZWFyY2g8L3NwYW4+PGlucHV0IG1heGxlbmd0aD1cIjEyOFwiIGRhdGEtcmVmPVwic2VhcmNoQm94XCIvPlxuICAgICAgICA8c3Bhbj5TdGFydDwvc3Bhbj48aW5wdXQgbWF4bGVuZ3RoPVwiMjBcIiBkYXRhLXJlZj1cInN0YXJ0Qm94XCIvPlxuICAgICAgICA8c3Bhbj5FbmQ8L3NwYW4+PGlucHV0IG1heGxlbmd0aD1cIjIwXCIgZGF0YS1yZWY9XCJlbmRCb3hcIi8+XG4gICAgICAgIDxzcGFuIGRhdGEtcmVmPVwibGVuZ3RoU3BhblwiPkxlbmd0aDo8L3NwYW4+XG4gICAgICAgIDxzcGFuIGRhdGEtcmVmPVwicG9zaXRpb25TcGFuXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+YFxuICAgICk7XG4gICAgdGhpcy52aWV3ZXIub3B0aW9ucy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5vdXRlci5lbCk7XG4gICAgdGhpcy5vdXRlci5pbXBvcnRSZWZzKHRoaXMpO1xuXG4gICAgdGhpcy5zdGFydEJveC5lbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMudXBkYXRlU2VsZWN0aW9uLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZW5kQm94LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy51cGRhdGVTZWxlY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zZWFyY2hCb3guZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLm9uU2VhcmNoVGVybUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSBzdGFydC9lbmQgdmFsdWVcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBzZXRTdGFydChpbmRleCkge1xuICAgIHRoaXMuc3RhcnRCb3guZWwudmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID8gaW5kZXggOiAnJztcbiAgfVxuICBzZXRFbmQoaW5kZXgpIHtcbiAgICB0aGlzLmVuZEJveC5lbC52YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPyBpbmRleCA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCB0aGUgYmFzZSBwYWlycyBpbmZvcm1hdGlvblxuICAgKiBAcGFyYW0gblxuICAgKi9cbiAgc2V0QmFzZVBhaXJzKG4pIHtcbiAgICB0aGlzLmJhc2VQYWlycyA9IG4gfHwgMDtcbiAgICB0aGlzLmxlbmd0aFNwYW4uZWwuaW5uZXJUZXh0ID0gYExlbmd0aDogJHt0aGlzLmJhc2VQYWlyc30gQlBgO1xuICB9XG5cbiAgLyoqXG4gICAqIGRpc3BsYXkgdGhlIHBvc2l0aW9uIGJveCBvciBoaWRlXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgc2V0UG9zaXRpb24oaW5kZXgpIHtcbiAgICB0aGlzLnBvc2l0aW9uU3Bhbi5lbC5pbm5lclRleHQgPSBhcmd1bWVudHMubGVuZ3RoID8gYFBvc2l0aW9uOiAke2luZGV4fWAgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsZWQgdG8gcmVzZXQgc2VhcmNoIHRlcm0gYm94XG4gICAqL1xuICByZXNldFNlYXJjaCgpIHtcbiAgICB0aGlzLnNlYXJjaEJveC5lbC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBzZWxlY3Rpb24gZnJvbSB0ZXh0IGluIGlucHV0c1xuICAgKi9cbiAgdXBkYXRlU2VsZWN0aW9uKCkge1xuICAgIGNvbnN0IGxpbWl0cyA9IHRoaXMuZ2V0U3RhcnRFbmRGcm9tSW5wdXRzKCk7XG4gICAgaWYgKGxpbWl0cykge1xuICAgICAgdGhpcy52aWV3ZXIudXNlckludGVyZmFjZS5zZXRTZWxlY3Rpb25Gcm9tQ29sdW1uUm93KGxpbWl0cy5zdGFydCwgbGltaXRzLmVuZCk7XG4gICAgICB0aGlzLnZpZXdlci5maXJzdFJvdyA9IGxpbWl0cy5zdGFydC55O1xuICAgICAgdGhpcy52aWV3ZXIucmVuZGVyKCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBpZiBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGN1cnJlbnRseSB2YWxpZCB0aGVuIHJldHVyblxuICAgKiB0aGUgc3RhcnQgYW5kIGVuZCBhcyBWZWN0b3IyRFxuICAgKi9cbiAgZ2V0U3RhcnRFbmRGcm9tSW5wdXRzKCkge1xuICAgIGxldCBzdGFydCA9IE51bWJlci5wYXJzZUZsb2F0KHRoaXMuc3RhcnRCb3guZWwudmFsdWUpO1xuICAgIGxldCBlbmQgPSBOdW1iZXIucGFyc2VGbG9hdCh0aGlzLmVuZEJveC5lbC52YWx1ZSk7XG4gICAgaWYgKE51bWJlci5pc05hTihzdGFydCkgfHwgTnVtYmVyLmlzTmFOKGVuZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBjbGFtcCB0byBhdmFpbGFibGUgbnVtYmVyIG9mIGJhc2UgcGFpclxuICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc3RhcnQsIHRoaXMuYmFzZVBhaXJzIC0gMSkpO1xuICAgIGVuZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGVuZCwgdGhpcy5iYXNlUGFpcnMgLSAxKSk7XG4gICAgLy8gcmFuZ2UgbXVzdCBiZSByaWdodCBzaWRlIHVwXG4gICAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogbmV3IFZlY3RvcjJEKHN0YXJ0ICUgdGhpcy52aWV3ZXIucm93TGVuZ3RoLCBNYXRoLmZsb29yKHN0YXJ0IC8gdGhpcy52aWV3ZXIucm93TGVuZ3RoKSksXG4gICAgICBlbmQ6IG5ldyBWZWN0b3IyRChlbmQgJSB0aGlzLnZpZXdlci5yb3dMZW5ndGgsIE1hdGguZmxvb3IoZW5kIC8gdGhpcy52aWV3ZXIucm93TGVuZ3RoKSksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gYSBoYXNoIG9mIHRoZSBiaWdyYW1zIGZvciBhIGdpdmVuIHN0cmluZy5cbiAgICogRWFjaCBoYXNoIGVudHJ5IGlzIGtleTpiaWdncmFtLCB2YWx1ZTogbnVtYmVyIG9mIG9jY3VycmVuY2VzXG4gICAqIEBwYXJhbSBzdHJcbiAgICovXG4gIGJpZ3JhbXMoc3RyKSB7XG4gICAgaW52YXJpYW50KHN0ciAmJiBzdHIubGVuZ3RoID49IDIsICdzdHJpbmcgbXVzdCBiZSAyIGNoYXJzIGF0IGxlYXN0Jyk7XG4gICAgY29uc3QgaGFzaCA9IHt9O1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBiaWdyYW0gPSBzdHIuc3Vic3RyKGksIDIpO1xuICAgICAgbGV0IHJlY29yZCA9IGhhc2hbYmlncmFtXTtcbiAgICAgIGlmIChyZWNvcmQpIHtcbiAgICAgICAgcmVjb3JkLmNvdW50ICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYXNoW2JpZ3JhbV0gPSB7Y291bnQ6IDF9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgbnVtYmVyIG9mIHBhaXJzIHRvIGhhc2ggYW5kIHJldHVyblxuICAgIHJldHVybiBoYXNoO1xuICB9XG4gIC8qKlxuICAgKiBNYXRjaCB0d28gc3RyaW5nIHVzaW5nIHRoZSBzb3JlbnNlbi1kaWNlIGFsZ29yaXRobVxuICAgKiBodHRwOi8vd3d3LmFsZ29tYXRpb24uY29tL2FsZ29yaXRobS9zb3JlbnNlbi1kaWNlLXN0cmluZy1zaW1pbGFyaXR5XG4gICAqIEBwYXJhbSBwYXR0ZXJuXG4gICAqIEBwYXJhbSBtYXR0ZXJcbiAgICovXG4gIHNvcmVuc2VuRGljZShfc3RyMSwgX3N0cjIpIHtcbiAgICBpbnZhcmlhbnQoX3N0cjEgJiYgX3N0cjIsICdib3RoIG11c3QgYmUgc3RyaW5ncyB3aXRoIGF0IGxlYXN0IDEgY2hhcicpO1xuICAgIC8vIGFsd2F5cyBjb21wYXJlIHdpdGggY2FzZVxuICAgIGNvbnN0IHN0cjEgPSBfc3RyMS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHN0cjIgPSBfc3RyMi50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gaWYgdGhlIHBhdHRlcm4gc3RyaW5nIGlzIDEgY2hhciB0aGVuIGp1c3QgcmV0dXJuIDEgLyBsZW5ndGhcbiAgICAvLyBvZiBtYXRjaCBzdHJpbmcgaWYgdGhlIGNoYXIgb2NjdXJzIGluIHRoZSB0YXJnZXRcbiAgICBpZiAoc3RyMS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBzdHIyLmluZGV4T2Yoc3RyMSkgPj0gMCA/IDEgLyBzdHIyLmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIC8vIGxpa2V3aXNlIGlmIHRoZSBwYXR0ZXJuIGlzIG9ubHkgMSBjaGFyXG4gICAgaWYgKHN0cjIubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc3RyMS5pbmRleE9mKHN0cjIpID49IDAgPyAxIC8gc3RyMS5sZW5ndGggOiAwO1xuICAgIH1cbiAgICAvLyBib3RoIHN0cmluZ3MgaGF2ZSBvbmUgb3IgbW9yZSBiaWdyYW1zIHNvIHdlIGNhbiB1c2UgdGhlIGFsZ29yaXRobVxuICAgIGNvbnN0IGIxID0gdGhpcy5iaWdyYW1zKHN0cjEpO1xuICAgIGNvbnN0IGIyID0gdGhpcy5iaWdyYW1zKHN0cjIpO1xuICAgIC8vIGNvdW50IHRoZSBvY2N1cnJlbmNlcyBvZiB0aGUgYjEgcGFpcnMgaW4gYjJcbiAgICBjb25zdCBiaWdyYW1zID0gT2JqZWN0LmtleXMoYjEpO1xuICAgIGxldCBtYXRjaGVzID0gMDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYmlncmFtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgYmlncmFtID0gYmlncmFtc1tpXTtcbiAgICAgIGNvbnN0IG1hdGNoID0gYjJbYmlncmFtXTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtYXRjaC5jb3VudCA9IE1hdGgubWF4KDAsIG1hdGNoLmNvdW50IC0gMSk7XG4gICAgICAgIG1hdGNoZXMgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIGEgbm9ybWFsaXplICggMC4uMSApIHZhbHVlIGJ5IHJldHVybmluZyB0aGUgbnVtYmVyXG4gICAgLy8gbWF0Y2hlcyB0byB0aGUgdG90YWwgbnVtYmVyIG9mIHBhaXJzIGluIHN0cjJcbiAgICByZXR1cm4gbWF0Y2hlcyAvIE9iamVjdC5rZXlzKGIyKS5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogc2VhcmNoIHRlcm0gd2FzIGNoYW5nZWQsIHN0YXJ0IGEgbmV3IHNlYXJjaCBvZiB0aGUgYmxvY2tzIGFuZCBhbm5vdGF0aW9ucyBmb3IgdGhlIGNsb3Nlc3QgbmFtZVxuICAgKiBtYXRjaC5cbiAgICovXG4gIG9uU2VhcmNoVGVybUNoYW5nZWQoKSB7XG4gICAgY29uc3QgdGVybSA9IHRoaXMuc2VhcmNoQm94LmVsLnZhbHVlLnRyaW0oKTtcbiAgICBpZiAodGVybSkge1xuICAgICAgLy8gZmluZCB0aGUgaGlnaGVzdCBzY29yaW5nIGJsb2NrIG9yIGFubm90YXRpb25cbiAgICAgIGxldCBiZXN0ID0gbnVsbDtcbiAgICAgIGxldCBiZXN0U2NvcmUgPSAtSW5maW5pdHk7XG4gICAgICBsZXQgYmxvY2tPckFubm90YXRpb24gPSBudWxsO1xuXG4gICAgICAvLyBzY29yZSBibG9ja3NcbiAgICAgIHRoaXMudmlld2VyLmJsb2NrTGlzdC5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSB0aGlzLnNvcmVuc2VuRGljZShibG9jay5nZXROYW1lKCksIHRlcm0pO1xuICAgICAgICBpZiAoc2NvcmUgPiBiZXN0U2NvcmUpIHtcbiAgICAgICAgICBiZXN0U2NvcmUgPSBzY29yZTtcbiAgICAgICAgICBiZXN0ID0gYmxvY2s7XG4gICAgICAgICAgYmxvY2tPckFubm90YXRpb24gPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gc2NvcmUgYW5ub3RhdGlvbnNcbiAgICAgIHRoaXMudmlld2VyLmFubm90YXRpb25MaXN0LmZvckVhY2goYW5ub3RhdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gdGhpcy5zb3JlbnNlbkRpY2UoYW5ub3RhdGlvbi5uYW1lLCB0ZXJtKTtcbiAgICAgICAgaWYgKHNjb3JlID4gYmVzdFNjb3JlKSB7XG4gICAgICAgICAgYmVzdFNjb3JlID0gc2NvcmU7XG4gICAgICAgICAgYmVzdCA9IGFubm90YXRpb247XG4gICAgICAgICAgYmxvY2tPckFubm90YXRpb24gPSAnYW5ub3RhdGlvbic7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZWxlY3QgYW5kIHNob3cgdGhlIGhpZ2hlc3Qgc2NvcmluZyBpdGVtXG4gICAgICBpZiAoYmVzdCAmJiBibG9ja09yQW5ub3RhdGlvbiA9PT0gJ2Jsb2NrJykge1xuICAgICAgICB0aGlzLnZpZXdlci5zZWxlY3RCbG9jayhiZXN0LmlkKTtcbiAgICAgICAgdGhpcy52aWV3ZXIuc2hvd0Jsb2NrKGJlc3QuaWQpO1xuICAgICAgfVxuICAgICAgaWYgKGJlc3QgJiYgYmxvY2tPckFubm90YXRpb24gPT09ICdhbm5vdGF0aW9uJykge1xuICAgICAgICB0aGlzLnZpZXdlci5zZWxlY3RBbm5vdGF0aW9uKGJlc3QuaWQpO1xuICAgICAgICB0aGlzLnZpZXdlci5zaG93QW5ub3RhdGlvbihiZXN0LmlkKTtcbiAgICAgIH1cbiAgICAgIGlmIChiZXN0KSB7XG4gICAgICAgIHRoaXMudmlld2VyLnJlbmRlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvdmlld2VyL3N0YXR1cy1iYXIuanNcbiAqKi8iLCJpbXBvcnQgRCBmcm9tICcuLi8uLi9kb20vZG9tJztcblxuLyoqXG4gKiByZW5kZXIgYSBzZXF1ZW5jZSBvZiBjaGFycyB3aXRoIGFwcGVhcmFuY2UgYXMgZm9yIHByaW1hcnkgc2VxdWVuY2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyU2VxdWVuY2VSb3codmlld2VyLCByb3dFbCwgcmVjb3JkLCB5KSB7XG4gIGxldCBlID0gRCgnPGRpdiBjbGFzcz1cInNlcXVlbmNlLXRleHQgcm9ib3RvIGZpeGVkIGZvbnQtc2l6ZVwiPjwvZGl2PicpO1xuICBlLnNldFN0eWxlcyh7XG4gICAgbGVmdCAgICAgIDogcmVjb3JkLnN0YXJ0Um93T2Zmc2V0ICogdmlld2VyLmdldENoYXJXaWR0aCgpICsgJ3B4JyxcbiAgICB3aWR0aCAgICAgOiByZWNvcmQubGVuZ3RoICogdmlld2VyLmdldENoYXJXaWR0aCgpICsgJ3B4JyxcbiAgICB0b3AgICAgICAgOiB5ICsgJ3B4JyxcbiAgICBoZWlnaHQgICAgOiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICsgJ3B4JyxcbiAgICBsaW5lSGVpZ2h0OiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICsgJ3B4JyxcbiAgfSk7XG4gIGUuZWwuaW5uZXJUZXh0ID0gdmlld2VyLmdldFNlcXVlbmNlKHJlY29yZC5ibG9jaywgcmVjb3JkLmJsb2NrT2Zmc2V0LCByZWNvcmQubGVuZ3RoKTtcbiAgcm93RWwuYXBwZW5kQ2hpbGQoZSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qYXZhc2NyaXB0cy92aWV3ZXIvcm93LXR5cGVzL3NlcXVlbmNlLXJvdy5qc1xuICoqLyIsImltcG9ydCBEIGZyb20gJy4uLy4uL2RvbS9kb20nO1xuXG4vKipcbiAqIHJlbmRlciB0aGUgcm93IG9mICsrKysgY2hhcnMgYmV0d2VlbiB0aGUgcHJpbWFyeSBhbmQgcmV2ZXJzZSBzZXF1ZW5jZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJTZXBhcmF0b3JTZXF1ZW5jZVJvdyh2aWV3ZXIsIHJvd0VsLCByZWNvcmQsIHkpIHtcbiAgbGV0IGUgPSBEKCc8ZGl2IGNsYXNzPVwic2VxdWVuY2UtdGV4dC1tYXJrZXIgcm9ib3RvIGZpeGVkIGZvbnQtc2l6ZVwiPjwvZGl2PicpO1xuICBlLnNldFN0eWxlcyh7XG4gICAgbGVmdCAgICAgIDogcmVjb3JkLnN0YXJ0Um93T2Zmc2V0ICogdmlld2VyLmdldENoYXJXaWR0aCgpICsgJ3B4JyxcbiAgICB3aWR0aCAgICAgOiByZWNvcmQubGVuZ3RoICogdmlld2VyLmdldENoYXJXaWR0aCgpICsgJ3B4JyxcbiAgICB0b3AgICAgICAgOiB5ICsgJ3B4JyxcbiAgICBoZWlnaHQgICAgOiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICsgJ3B4JyxcbiAgICBsaW5lSGVpZ2h0OiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICsgJ3B4JyxcbiAgfSk7XG4gIGUuZWwuaW5uZXJUZXh0ID0gXCIrXCIucmVwZWF0KHJlY29yZC5sZW5ndGgpO1xuICByb3dFbC5hcHBlbmRDaGlsZChlKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2phdmFzY3JpcHRzL3ZpZXdlci9yb3ctdHlwZXMvc2VwYXJhdG9yLXNlcXVlbmNlLXJvdy5qc1xuICoqLyIsImltcG9ydCBEIGZyb20gJy4uLy4uL2RvbS9kb20nO1xuXG4vKipcbiAqIHJlbmRlciBhIHNlcXVlbmNlIG9mIGNoYXJzIHdpdGggYXBwZWFyYW5jZSBhcyBmb3IgcHJpbWFyeSBzZXF1ZW5jZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJSZXZlcnNlU2VxdWVuY2VSb3codmlld2VyLCByb3dFbCwgcmVjb3JkLCB5KSB7XG4gIGxldCBlID0gRCgnPGRpdiBjbGFzcz1cInNlcXVlbmNlLXRleHQtcmV2ZXJzZSByb2JvdG8gZml4ZWQgZm9udC1zaXplXCI+PC9kaXY+Jyk7XG4gIGUuc2V0U3R5bGVzKHtcbiAgICBsZWZ0ICAgICAgOiByZWNvcmQuc3RhcnRSb3dPZmZzZXQgKiB2aWV3ZXIuZ2V0Q2hhcldpZHRoKCkgKyAncHgnLFxuICAgIHdpZHRoICAgICA6IHJlY29yZC5sZW5ndGggKiB2aWV3ZXIuZ2V0Q2hhcldpZHRoKCkgKyAncHgnLFxuICAgIHRvcCAgICAgICA6IHkgKyAncHgnLFxuICAgIGhlaWdodCAgICA6IHZpZXdlci5nZXRDaGFySGVpZ2h0KCkgKyAncHgnLFxuICAgIGxpbmVIZWlnaHQ6IHZpZXdlci5nZXRDaGFySGVpZ2h0KCkgKyAncHgnLFxuICB9KTtcbiAgZS5lbC5pbm5lclRleHQgPSB2aWV3ZXIuZ2V0U2VxdWVuY2UocmVjb3JkLmJsb2NrLCByZWNvcmQuYmxvY2tPZmZzZXQsIHJlY29yZC5sZW5ndGgsIHRydWUpO1xuICByb3dFbC5hcHBlbmRDaGlsZChlKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2phdmFzY3JpcHRzL3ZpZXdlci9yb3ctdHlwZXMvcmV2ZXJzZS1zZXF1ZW5jZS1yb3cuanNcbiAqKi8iLCJpbXBvcnQgRCBmcm9tICcuLi8uLi9kb20vZG9tJztcblxuLyoqXG4gKiByZW5kZXIgYSBzZXF1ZW5jZSBvZiBjaGFycyB3aXRoIGFwcGVhcmFuY2UgYXMgZm9yIHByaW1hcnkgc2VxdWVuY2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyQmxvY2tTZXF1ZW5jZVJvdyh2aWV3ZXIsIHJvd0VsLCByZWNvcmQsIHkpIHtcbiAgbGV0IGUgPSBEKCc8ZGl2IGNsYXNzPVwic2VxdWVuY2UtbmFtZSByb2JvdG8gZml4ZWQgZm9udC1zaXplXCI+PC9kaXY+Jyk7XG4gIGUuc2V0U3R5bGVzKHtcbiAgICBsZWZ0ICAgICAgICAgICA6IHJlY29yZC5zdGFydFJvd09mZnNldCAqIHZpZXdlci5nZXRDaGFyV2lkdGgoKSArICdweCcsXG4gICAgd2lkdGggICAgICAgICAgOiByZWNvcmQubGVuZ3RoICogdmlld2VyLmdldENoYXJXaWR0aCgpICsgJ3B4JyxcbiAgICB0b3AgICAgICAgICAgICA6IHkgKyAncHgnLFxuICAgIGhlaWdodCAgICAgICAgIDogdmlld2VyLmdldENoYXJIZWlnaHQoKSArICdweCcsXG4gICAgbGluZUhlaWdodCAgICAgOiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICsgJ3B4JyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHJlY29yZC5ibG9jay5tZXRhZGF0YS5jb2xvciB8fCAnbGlnaHRncmF5JyxcbiAgfSk7XG4gIGUuZWwuaW5uZXJUZXh0ID0gJ+KAoicgKyByZWNvcmQuYmxvY2suZ2V0TmFtZSgpICsgJ+KAoic7XG4gIHJvd0VsLmFwcGVuZENoaWxkKGUpO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvdmlld2VyL3Jvdy10eXBlcy9ibG9jay1zZXF1ZW5jZS1yb3cuanNcbiAqKi8iLCJpbXBvcnQgRCBmcm9tICcuLi8uLi9kb20vZG9tJztcblxuLyoqXG4gKiByZW5kZXIgYSBzZXF1ZW5jZSBvZiBjaGFycyB3aXRoIGFwcGVhcmFuY2UgYXMgZm9yIHByaW1hcnkgc2VxdWVuY2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyU2VxdWVuY2VSdWxlcih2aWV3ZXIsIHJvd0VsLCB5LCBzdGFydCwgbGVuZ3RoKSB7XG4gIC8vIHJlbmRlciB0aGUgcnVsZXIgY29udGFpbmVyIHdoaWNoIGlzIHRhbGwgZW5vdWdoIGZvciB0aGUgbWFya2Vycy5cbiAgLy8gSXRzIHRvcCBib3JkZXIgaXMgc2V0XG4gIGxldCBlID0gRCgnPGRpdiBjbGFzcz1cInNlcXVlbmNlLXJ1bGVyIHJvYm90byBmaXhlZCBmb250LXNpemVcIj48L2Rpdj4nKTtcbiAgY29uc3QgSCA9IHZpZXdlci5nZXRDaGFySGVpZ2h0KCkgKiAxLjU7XG4gIGUuc2V0U3R5bGVzKHtcbiAgICBsZWZ0ICAgICAgOiAnMHB4JyxcbiAgICB3aWR0aCAgICAgOiBsZW5ndGggKiB2aWV3ZXIuZ2V0Q2hhcldpZHRoKCkgKyAncHgnLFxuICAgIHRvcCAgICAgICA6IHkgKyAncHgnLFxuICAgIGhlaWdodCAgICA6IEggKyAncHgnLFxuICAgIGxpbmVIZWlnaHQ6IEggKyAncHgnLFxuICB9KTtcbiAgLy8gYmVnaW4gYXQgc3RhcnQgcG9zaXRpb24gcm91bmRlZCBkb3duIHRvIG5lYXJlc3QgMTBcbiAgY29uc3QgaW5pdGlhbCA9IE1hdGguZmxvb3Ioc3RhcnQgLyAxMCkgKiAxMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZW5ndGg7IGkgKz0gMTApIHtcbiAgICAvLyB4cCBpcyB0aGUgbG9jYXRpb24gb2YgdGhlIHRpY2sgbWFya1xuICAgIGNvbnN0IHhwID0gKChpbml0aWFsIC0gc3RhcnQpICsgaSkgKiB2aWV3ZXIuZ2V0Q2hhcldpZHRoKCkgKyB2aWV3ZXIuZ2V0Q2hhcldpZHRoKCkgLyAyO1xuICAgIC8vIHRleHQgdmFsdWUgb2YgbWFya2VyXG4gICAgY29uc3QgdmFsdWUgPSAoaW5pdGlhbCArIGkpLnRvU3RyaW5nKCk7XG4gICAgLy8gd2lkdGggb2YgZWxlbWVudCBpbmNsdWRpbmcgdGV4dFxuICAgIGNvbnN0IHdpZHRoID0gdmFsdWUubGVuZ3RoICogdmlld2VyLmdldENoYXJXaWR0aCgpO1xuICAgIC8vIHRoZSB0aWNrICsgbnVtYmVyIG11c3QgYmUgY29tcGxldGUgdmlzaWJsZSBvciB3ZSBkb24ndCByZW5kZXJcbiAgICBpZiAoeHAgLSB3aWR0aCAvIDIgPj0gMCAmJiB4cCArIHdpZHRoIC8gMiA8PSB2aWV3ZXIucm93TGVuZ3RoICogdmlld2VyLmdldENoYXJXaWR0aCgpKSB7XG4gICAgICAvLyBjcmVhdGUgdGljayBtYXJrXG4gICAgICBjb25zdCB0aWNrID0gRCgnPGRpdiBjbGFzcz1cInRpY2tcIj48L2Rpdj4nKTtcbiAgICAgIHRpY2suc2V0U3R5bGVzKHtcbiAgICAgICAgbGVmdCAgOiB4cCArICdweCcsXG4gICAgICAgIGhlaWdodDogdmlld2VyLmdldENoYXJIZWlnaHQoKSAvIDIgKyAncHgnLFxuICAgICAgfSk7XG4gICAgICBlLmFwcGVuZENoaWxkKHRpY2spO1xuICAgICAgLy8gYWRkIG51bWVyaWMgdmFsdWVcbiAgICAgIGNvbnN0IG51bWJlciA9IEQoYDxkaXYgY2xhc3M9XCJudW1iZXJcIj4ke3ZhbHVlfTwvZGl2PmApO1xuICAgICAgbnVtYmVyLnNldFN0eWxlcyh7XG4gICAgICAgIGxlZnQgICAgICA6IHhwIC0gd2lkdGggLyAyICsgJ3B4JyxcbiAgICAgICAgdG9wICAgICAgIDogdmlld2VyLmdldENoYXJIZWlnaHQoKSAvIDIgKyAncHgnLFxuICAgICAgICB3aWR0aCAgICAgOiB3aWR0aCArICdweCcsXG4gICAgICAgIGhlaWdodCAgICA6IHZpZXdlci5nZXRDaGFySGVpZ2h0KCkgKyAncHgnLFxuICAgICAgICBsaW5lSGVpZ2h0OiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICsgJ3B4JyxcbiAgICAgIH0pO1xuICAgICAgZS5hcHBlbmRDaGlsZChudW1iZXIpO1xuICAgIH1cbiAgfVxuICAvLyBhZGQgdGhlIGVudGlyZSBydWxlciB0byB0aGUgdmlld2VyXG4gIHJvd0VsLmFwcGVuZENoaWxkKGUpO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvdmlld2VyL3Jvdy10eXBlcy9ydWxlci1yb3cuanNcbiAqKi8iLCJpbXBvcnQgRCBmcm9tICcuLi8uLi9kb20vZG9tJztcblxuLyoqXG4gKiByZW5kZXIgYW4gYW5ub3RhdGlvbiBibG9ja1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJBbm5vdGF0aW9uKHZpZXdlciwgcm93RWwsIHJlY29yZCwgeSkge1xuICBsZXQgZSA9IEQoJzxkaXYgY2xhc3M9XCJhbm5vdGF0aW9uIHJvYm90byBmaXhlZCBmb250LXNpemVcIj48L2Rpdj4nKTtcbiAgZS5zZXRTdHlsZXMoe1xuICAgIGxlZnQgICAgICAgICAgIDogcmVjb3JkLnN0YXJ0ICogdmlld2VyLmdldENoYXJXaWR0aCgpICsgJ3B4JyxcbiAgICB3aWR0aCAgICAgICAgICA6IChyZWNvcmQuZW5kIC0gcmVjb3JkLnN0YXJ0ICsgMSkgKiB2aWV3ZXIuZ2V0Q2hhcldpZHRoKCkgKyAncHgnLFxuICAgIHRvcCAgICAgICAgICAgIDogeSArIChyZWNvcmQuZGVwdGggKiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpKSArICdweCcsXG4gICAgaGVpZ2h0ICAgICAgICAgOiB2aWV3ZXIuZ2V0Q2hhckhlaWdodCgpICsgJ3B4JyxcbiAgICBsaW5lSGVpZ2h0ICAgICA6IHZpZXdlci5nZXRDaGFySGVpZ2h0KCkgKyAncHgnLFxuICAgIGJhY2tncm91bmRDb2xvcjogcmVjb3JkLmFubm90YXRpb24uY29sb3IsXG4gIH0pO1xuICBlLmVsLmlubmVyVGV4dCA9IHJlY29yZC5hbm5vdGF0aW9uLm5hbWU7XG4gIHJvd0VsLmFwcGVuZENoaWxkKGUpO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vamF2YXNjcmlwdHMvdmlld2VyL3Jvdy10eXBlcy9hbm5vdGF0aW9uLXJvdy5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhLi92aWV3ZXIuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEuL3ZpZXdlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhLi92aWV3ZXIuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3N0eWxlcy92aWV3ZXIuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5yb2JvdG8ge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gTW9ubycsIG1vbm9zcGFjZTsgfVxcblxcbi5maXhlZCB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XFxuICAtd2Via2l0LWZvbnQta2VybmluZzogbm9uZTtcXG4gIGZvbnQta2VybmluZzogbm9uZTtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG5cXG4uZm9udC1zaXplIHtcXG4gIGZvbnQtc2l6ZTogMTJweDsgfVxcblxcbi5pbmxpbmUtYmxvY2sge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuXFxuLnZpZXdlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAycmVtKTtcXG4gIG1hcmdpbjogMCAxcmVtO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAycmVtKTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC52aWV3ZXIgLnJvd3Mge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7IH1cXG4gIC52aWV3ZXIgLnJvdy1lbGVtZW50IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIC52aWV3ZXIgLnVzZXJpbnRlcmZhY2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG4gIC52aWV3ZXIgLnVzZXJpbnRlcmZhY2UgLnNlbGVjdGlvbi1ib3gge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTEsIDE1MywgMjU1LCAwLjEpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcbiAgLnZpZXdlciAudXNlcmludGVyZmFjZSAubGVmdC1lZGdlIHtcXG4gICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCBkb2RnZXJibHVlOyB9XFxuICAudmlld2VyIC51c2VyaW50ZXJmYWNlIC5yaWdodC1lZGdlIHtcXG4gICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgZG9kZ2VyYmx1ZTsgfVxcbiAgLnZpZXdlciAuc2VxdWVuY2UtdGV4dCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIHdoaXRlLXNwYWNlOiBwcmU7IH1cXG4gIC52aWV3ZXIgLnNlcXVlbmNlLXRleHQtcmV2ZXJzZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBjb2xvcjogbGlnaHRncmF5O1xcbiAgICB3aGl0ZS1zcGFjZTogcHJlOyB9XFxuICAudmlld2VyIC5zZXF1ZW5jZS10ZXh0LW1hcmtlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBjb2xvcjogbGlnaHRncmF5OyB9XFxuICAudmlld2VyIC5zZXF1ZW5jZS1uYW1lIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB3aGl0ZTsgfVxcbiAgLnZpZXdlciAuc2VxdWVuY2UtcnVsZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGxpZ2h0Z3JheTsgfVxcbiAgLnZpZXdlciAuc2VxdWVuY2UtcnVsZXIgLnRpY2sge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGxpZ2h0Z3JheTsgfVxcbiAgLnZpZXdlciAuc2VxdWVuY2UtcnVsZXIgLm51bWJlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjb2xvcjogbGlnaHRncmF5O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIC52aWV3ZXIgLmFubm90YXRpb24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogZGltZ3JheTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB3aGl0ZTtcXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB3aGl0ZTsgfVxcbiAgLnZpZXdlciAuY3Vyc29yIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4udmlld2VyLXN0YXR1cy1iYXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMnJlbTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5OyB9XFxuXFxuLnZpZXdlci1zdGF0dXMtYmFyIHNwYW4ge1xcbiAgY29sb3I6IGdyYXk7XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuXFxuLnZpZXdlci1zdGF0dXMtYmFyIGlucHV0IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IG5vbmU7XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG4gIHdpZHRoOiA2cmVtOyB9XFxuXFxuLnN2LW1vdXNlTGF5ZXIge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vc3R5bGVzL3ZpZXdlci5zY3NzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IHV1aWQgZnJvbSAnbm9kZS11dWlkJztcblxuXG4vKipcbiAqIGludGVybmFsbHkgdGhlIHNlcXVlbmNlIHZpZXdlciB1c2VzIGEgd3JhcHBlciBjbGFzcyBmb3IgYW5ub3RhdGlvbnMgdG8gb3ZlcmNvbWUgY2VydGFpbiBsaW1pdGF0aW9ucyBlLmcuXG4gKiB0aGV5IGhhdmUgbm8gaWQsIHN0YXJ0L2VuZCBhcmUgcmVsYXRpdmUgdG8gdGhlIGJsb2NrIGV0Yy4gVGhlIHZpZXdlciBhbm5vdGF0aW9ucyBhcmUgbm90IGNvbnN0cmFpbmVkIHRvIGJsb2Nrcy5cbiAqIE5hdGl2ZSBvYmplY3QgbG9va3Mgc29tZXRoaW5nIGxpa2UgdGhpczpcblxuIHtcbiAgXCJ0YWdzXCI6IHt9LFxuICBcIm5hbWVcIjogXCJ0cmFuc3Bvc2FzZVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiXCIsXG4gIFwiY29sb3JcIjogXCIjOEVDNzhEXCIsXG4gIFwicm9sZVwiOiBcImNkc1wiLFxuICBcInNlcXVlbmNlXCI6IFwiXCIsXG4gIFwic3RhcnRcIjogMCxcbiAgXCJlbmRcIjogMjc1LFxuICBcImlzRm9yd2FyZFwiOiBmYWxzZSxcbiAgXCJub3Rlc1wiOiB7XG4gICAgXCJnZW5iYW5rXCI6IHtcbiAgICAgIFwibG9jdXNfdGFnXCI6IFwiVlQ1Ml9SUzM1MzcwXCIsXG4gICAgICBcImluZmVyZW5jZVwiOiBcIkVYSVNURU5DRTogc2ltaWxhciB0byBBQSBzZXF1ZW5jZTpSZWZTZXE6V1BfMDE5ODg5NjE4LjFcIixcbiAgICAgIFwib2xkX2xvY3VzX3RhZ1wiOiBcIlZUNTJfMzUzNjVcIixcbiAgICAgIFwiY29kb25fc3RhcnRcIjogXCIxXCIsXG4gICAgICBcInBzZXVkb1wiOiBcIlwiLFxuICAgICAgXCJwcm9kdWN0XCI6IFwidHJhbnNwb3Nhc2VcIixcbiAgICAgIFwidHJhbnNsX3RhYmxlXCI6IFwiMTFcIixcbiAgICAgIFwibm90ZVwiOiBcImluY29tcGxldGU7IHRvbyBzaG9ydCBwYXJ0aWFsIGFidXR0aW5nIGFzc2VtYmx5IGdhcDsgbWlzc2luZyBzdG9wOyBEZXJpdmVkIGJ5IGF1dG9tYXRlZCBjb21wdXRhdGlvbmFsIGFuYWx5c2lzIHVzaW5nIGdlbmUgcHJlZGljdGlvbiBtZXRob2Q6IFByb3RlaW4gSG9tb2xvZ3kuXCIsXG4gICAgICBcInR5cGVcIjogXCJDRFNcIlxuICAgIH1cbiAgfVxufVwiXG5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5ub3RhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoYW5ub3RhdGlvbiwgYmxvY2spIHtcbiAgICB0aGlzLmlkID0gdXVpZC52NCgpO1xuICAgIHRoaXMubmFtZSA9IGFubm90YXRpb24ubmFtZTtcbiAgICB0aGlzLmNvbG9yID0gYW5ub3RhdGlvbi5jb2xvciB8fCAnbGlnaHRncmF5JztcbiAgICAvLyBzYXZlIHJlZmVyZW5jZSB0byBibG9jayBmcm9tIHdoZW5jZSB3ZSBjYW1lXG4gICAgdGhpcy5ibG9jayA9IGJsb2NrO1xuICAgIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG91ciBuYXRpdmUgYW5ub3RhdGlvblxuICAgIHRoaXMubmF0aXZlQW5ub3RhdGlvbiA9IGFubm90YXRpb247XG4gIH1cblxuICAvKipcbiAgICogb3VyIGJsb2NrIHN0YXJ0L2VuZC9sZW5ndGggaXMgb25seSBjYWxjdWxhdGVkIG9uY2Ugd2UgYXJlIGFkZGVkIHRvIHRoZSB2aWV3ZXJcbiAgICogYW5kIHRoZSBnbG9iYWwgcG9zaXRpb24gb2Ygb3VyIHBhcmVudCBibG9jayBpcyBrbm93biAoIHNpbmNlIHRoZSBuYXRpdmUgYW5ub3RhdGlvblxuICAgKiBzdGFydCBhbmQgZW5kIGFyZSByZWxhdGl2ZSB0byB0aGF0IGJsb2NrIClcbiAgICogQHBhcmFtIHZpZXdlclxuICAgKi9cbiAgc2V0U3RhcnRFbmQodmlld2VyKSB7XG4gICAgLy8gd2UgYXNzdW1lIGJsb2NrcyBoYXZlIGFscmVhZHkgYmVlbiBtYXBwZWQgdG8gY29sdW1ucyBhbmQgcm93cyBhbmQgdGhhdCB0aGUgaW5mb3JtYXRpb25cbiAgICAvLyBpcyBhdmFpbGFibGUgb24gdGhlIHZpZXdlciBvYmplY3RcbiAgICBjb25zdCBibG9ja0luZm8gPSB2aWV3ZXIuYmxvY2tSb3dNYXBbdGhpcy5ibG9jay5pZF07XG4gICAgLy8gc29tZSBhbm5vdGF0aW9ucyBhcmUgYXBwbGllZCB0byB0aGUgY29uc3RydWN0LiBUaGUgY29uc3RydWN0IGJsb2NrIGlzIG5vdFxuICAgIC8vIHBhcnQgb2YgdGhlIGxpc3Qgb2YgYmxvY2tzIHRoZSB2aWV3ZXIgaXMgZGlzcGxheWluZy4gRm9yIHRob3NlIHdlIGFzc3VtZVxuICAgIC8vIHRoZSBzdGFydCBhbmQgZW5kIGFyZSByZWxhdGl2ZSB0byB0aGUgZW50aXJlIHNlcXVlbmNlXG4gICAgbGV0IHN0YXJ0SW5kZXggPSAwO1xuICAgIGlmIChibG9ja0luZm8pIHtcbiAgICAgIHN0YXJ0SW5kZXggPSBibG9ja0luZm8uc3RhcnRSb3cgKiB2aWV3ZXIucm93TGVuZ3RoICsgYmxvY2tJbmZvLnN0YXJ0Um93T2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnZhcmlhbnQodmlld2VyLmFwcFN0YXRlLmJsb2Nrc1t0aGlzLmJsb2NrLmlkXSwnZXhwZWN0ZWQgYmxvY2sgdG8gYmUgdGhlIGFwcCBzdGF0ZSBhdCBsZWFzdCcpO1xuICAgIH1cbiAgICAvLyBub3cgd2Ugc2V0IHRoZSBnbG9iYWwgc3RhcnQgLyBlbmQgb2YgdGhpcyBhbm5vdGF0aW9uXG4gICAgdGhpcy5zdGFydCA9IHRoaXMubmF0aXZlQW5ub3RhdGlvbi5zdGFydCArIHN0YXJ0SW5kZXg7XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLm5hdGl2ZUFubm90YXRpb24uZW5kIC0gdGhpcy5uYXRpdmVBbm5vdGF0aW9uLnN0YXJ0O1xuICAgIHRoaXMuZW5kID0gdGhpcy5zdGFydCArIHRoaXMubGVuZ3RoIC0gMTtcbiAgfVxuXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qYXZhc2NyaXB0cy92aWV3ZXIvYW5ub3RhdGlvbi5qc1xuICoqLyIsIi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbi8qZ2xvYmFsIHdpbmRvdywgcmVxdWlyZSwgZGVmaW5lICovXG4oZnVuY3Rpb24oX3dpbmRvdykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbiAgLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbiAgLy8gcmV0dXJucyAxMjgtYml0cyBvZiByYW5kb21uZXNzLCBzaW5jZSB0aGF0J3Mgd2hhdCdzIHVzdWFsbHkgcmVxdWlyZWRcbiAgdmFyIF9ybmcsIF9tYXRoUk5HLCBfbm9kZVJORywgX3doYXR3Z1JORywgX3ByZXZpb3VzUm9vdDtcblxuICBmdW5jdGlvbiBzZXR1cEJyb3dzZXIoKSB7XG4gICAgLy8gQWxsb3cgZm9yIE1TSUUxMSBtc0NyeXB0b1xuICAgIHZhciBfY3J5cHRvID0gX3dpbmRvdy5jcnlwdG8gfHwgX3dpbmRvdy5tc0NyeXB0bztcblxuICAgIGlmICghX3JuZyAmJiBfY3J5cHRvICYmIF9jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgICAgIC8vXG4gICAgICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICAgICAgX3doYXR3Z1JORyA9IF9ybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgICAgICAgX2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICAgICAgICByZXR1cm4gX3JuZHM4O1xuICAgICAgICB9O1xuICAgICAgICBfcm5nKCk7XG4gICAgICB9IGNhdGNoKGUpIHt9XG4gICAgfVxuXG4gICAgaWYgKCFfcm5nKSB7XG4gICAgICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gICAgICAvL1xuICAgICAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgICAgIC8vIHF1YWxpdHkuXG4gICAgICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgICAgIF9tYXRoUk5HID0gX3JuZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgeyByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwOyB9XG4gICAgICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX3JuZHM7XG4gICAgICB9O1xuICAgICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW1NFQ1VSSVRZXSBub2RlLXV1aWQ6IGNyeXB0byBub3QgdXNhYmxlLCBmYWxsaW5nIGJhY2sgdG8gaW5zZWN1cmUgTWF0aC5yYW5kb20oKVwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXR1cE5vZGUoKSB7XG4gICAgLy8gTm9kZS5qcyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL25vZGVqcy5vcmcvZG9jcy92MC42LjIvYXBpL2NyeXB0by5odG1sXG4gICAgLy9cbiAgICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgcmVxdWlyZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIF9yYiA9IHJlcXVpcmUoJ2NyeXB0bycpLnJhbmRvbUJ5dGVzO1xuICAgICAgICBfbm9kZVJORyA9IF9ybmcgPSBfcmIgJiYgZnVuY3Rpb24oKSB7cmV0dXJuIF9yYigxNik7fTtcbiAgICAgICAgX3JuZygpO1xuICAgICAgfSBjYXRjaChlKSB7fVxuICAgIH1cbiAgfVxuXG4gIGlmIChfd2luZG93KSB7XG4gICAgc2V0dXBCcm93c2VyKCk7XG4gIH0gZWxzZSB7XG4gICAgc2V0dXBOb2RlKCk7XG4gIH1cblxuICAvLyBCdWZmZXIgY2xhc3MgdG8gdXNlXG4gIHZhciBCdWZmZXJDbGFzcyA9ICgnZnVuY3Rpb24nID09PSB0eXBlb2YgQnVmZmVyKSA/IEJ1ZmZlciA6IEFycmF5O1xuXG4gIC8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG4gIHZhciBfYnl0ZVRvSGV4ID0gW107XG4gIHZhciBfaGV4VG9CeXRlID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbiAgfVxuXG4gIC8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuICBmdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICAgIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gICAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICAvLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbiAgZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gICAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbiAgfVxuXG4gIC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbiAgLy9cbiAgLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbiAgLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuICAvLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxuICB2YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgdmFyIF9ub2RlSWQgPSBbXG4gICAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuICBdO1xuXG4gIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gIHZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbiAgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG4gIHZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICAgIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgY2xvY2tzZXEgPSAob3B0aW9ucy5jbG9ja3NlcSAhPSBudWxsKSA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAgIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gICAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gICAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgICB2YXIgbXNlY3MgPSAob3B0aW9ucy5tc2VjcyAhPSBudWxsKSA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICAgIHZhciBuc2VjcyA9IChvcHRpb25zLm5zZWNzICE9IG51bGwpID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gICAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICAgIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gICAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gICAgLy8gdGltZSBpbnRlcnZhbFxuICAgIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PSBudWxsKSB7XG4gICAgICBuc2VjcyA9IDA7XG4gICAgfVxuXG4gICAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICAgIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gICAgfVxuXG4gICAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICAgIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAgIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICAgIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gICAgLy8gYHRpbWVfbG93YFxuICAgIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX21pZGBcbiAgICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gICAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gICAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgICAvLyBgbm9kZWBcbiAgICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG4gIH1cblxuICAvLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gICAgaWYgKHR5cGVvZihvcHRpb25zKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1ZiA9IChvcHRpb25zID09PSAnYmluYXJ5JykgPyBuZXcgQnVmZmVyQ2xhc3MoMTYpIDogbnVsbDtcbiAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAgIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICAgIGlmIChidWYpIHtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBwdWJsaWMgQVBJXG4gIHZhciB1dWlkID0gdjQ7XG4gIHV1aWQudjEgPSB2MTtcbiAgdXVpZC52NCA9IHY0O1xuICB1dWlkLnBhcnNlID0gcGFyc2U7XG4gIHV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG4gIHV1aWQuQnVmZmVyQ2xhc3MgPSBCdWZmZXJDbGFzcztcbiAgdXVpZC5fcm5nID0gX3JuZztcbiAgdXVpZC5fbWF0aFJORyA9IF9tYXRoUk5HO1xuICB1dWlkLl9ub2RlUk5HID0gX25vZGVSTkc7XG4gIHV1aWQuX3doYXR3Z1JORyA9IF93aGF0d2dSTkc7XG5cbiAgaWYgKCgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSkgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAvLyBQdWJsaXNoIGFzIG5vZGUuanMgbW9kdWxlXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIFB1Ymxpc2ggYXMgQU1EIG1vZHVsZVxuICAgIGRlZmluZShmdW5jdGlvbigpIHtyZXR1cm4gdXVpZDt9KTtcblxuXG4gIH0gZWxzZSB7XG4gICAgLy8gUHVibGlzaCBhcyBnbG9iYWwgKGluIGJyb3dzZXJzKVxuICAgIF9wcmV2aW91c1Jvb3QgPSBfd2luZG93LnV1aWQ7XG5cbiAgICAvLyAqKmBub0NvbmZsaWN0KClgIC0gKGJyb3dzZXIgb25seSkgdG8gcmVzZXQgZ2xvYmFsICd1dWlkJyB2YXIqKlxuICAgIHV1aWQubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgX3dpbmRvdy51dWlkID0gX3ByZXZpb3VzUm9vdDtcbiAgICAgIHJldHVybiB1dWlkO1xuICAgIH07XG5cbiAgICBfd2luZG93LnV1aWQgPSB1dWlkO1xuICB9XG59KSgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IG51bGwpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbm9kZS11dWlkL3V1aWQuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG52YXIgcm9vdFBhcmVudCA9IHt9XG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gU2FmYXJpIDUtNyBsYWNrcyBzdXBwb3J0IGZvciBjaGFuZ2luZyB0aGUgYE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3JgIHByb3BlcnR5XG4gKiAgICAgb24gb2JqZWN0cy5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIGZ1bmN0aW9uIEJhciAoKSB7fVxuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9XG4gICAgYXJyLmNvbnN0cnVjdG9yID0gQmFyXG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgYXJyLmNvbnN0cnVjdG9yID09PSBCYXIgJiYgLy8gY29uc3RydWN0b3IgY2FuIGJlIHNldFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChhcmcpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICAvLyBBdm9pZCBnb2luZyB0aHJvdWdoIGFuIEFyZ3VtZW50c0FkYXB0b3JUcmFtcG9saW5lIGluIHRoZSBjb21tb24gY2FzZS5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHJldHVybiBuZXcgQnVmZmVyKGFyZywgYXJndW1lbnRzWzFdKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZylcbiAgfVxuXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZFxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmcm9tTnVtYmVyKHRoaXMsIGFyZylcbiAgfVxuXG4gIC8vIFNsaWdodGx5IGxlc3MgY29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoaXMsIGFyZywgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiAndXRmOCcpXG4gIH1cblxuICAvLyBVbnVzdWFsLlxuICByZXR1cm4gZnJvbU9iamVjdCh0aGlzLCBhcmcpXG59XG5cbmZ1bmN0aW9uIGZyb21OdW1iZXIgKHRoYXQsIGxlbmd0aCkge1xuICB0aGF0ID0gYWxsb2NhdGUodGhhdCwgbGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGxlbmd0aCkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgLy8gQXNzdW1wdGlvbjogYnl0ZUxlbmd0aCgpIHJldHVybiB2YWx1ZSBpcyBhbHdheXMgPCBrTWF4TGVuZ3RoLlxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGFsbG9jYXRlKHRoYXQsIGxlbmd0aClcblxuICB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iamVjdCkge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iamVjdCkpIHJldHVybiBmcm9tQnVmZmVyKHRoYXQsIG9iamVjdClcblxuICBpZiAoaXNBcnJheShvYmplY3QpKSByZXR1cm4gZnJvbUFycmF5KHRoYXQsIG9iamVjdClcblxuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtdXN0IHN0YXJ0IHdpdGggbnVtYmVyLCBidWZmZXIsIGFycmF5IG9yIHN0cmluZycpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChvYmplY3QuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIHJldHVybiBmcm9tVHlwZWRBcnJheSh0aGF0LCBvYmplY3QpXG4gICAgfVxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCBvYmplY3QpXG4gICAgfVxuICB9XG5cbiAgaWYgKG9iamVjdC5sZW5ndGgpIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iamVjdClcblxuICByZXR1cm4gZnJvbUpzb25PYmplY3QodGhhdCwgb2JqZWN0KVxufVxuXG5mdW5jdGlvbiBmcm9tQnVmZmVyICh0aGF0LCBidWZmZXIpIHtcbiAgdmFyIGxlbmd0aCA9IGNoZWNrZWQoYnVmZmVyLmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBhbGxvY2F0ZSh0aGF0LCBsZW5ndGgpXG4gIGJ1ZmZlci5jb3B5KHRoYXQsIDAsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5ICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gYWxsb2NhdGUodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLy8gRHVwbGljYXRlIG9mIGZyb21BcnJheSgpIHRvIGtlZXAgZnJvbUFycmF5KCkgbW9ub21vcnBoaWMuXG5mdW5jdGlvbiBmcm9tVHlwZWRBcnJheSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGFsbG9jYXRlKHRoYXQsIGxlbmd0aClcbiAgLy8gVHJ1bmNhdGluZyB0aGUgZWxlbWVudHMgaXMgcHJvYmFibHkgbm90IHdoYXQgcGVvcGxlIGV4cGVjdCBmcm9tIHR5cGVkXG4gIC8vIGFycmF5cyB3aXRoIEJZVEVTX1BFUl9FTEVNRU5UID4gMSBidXQgaXQncyBjb21wYXRpYmxlIHdpdGggdGhlIGJlaGF2aW9yXG4gIC8vIG9mIHRoZSBvbGQgQnVmZmVyIGNvbnN0cnVjdG9yLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSkge1xuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBhcnJheS5ieXRlTGVuZ3RoXG4gICAgdGhhdCA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShhcnJheSkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tVHlwZWRBcnJheSh0aGF0LCBuZXcgVWludDhBcnJheShhcnJheSkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGFsbG9jYXRlKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8vIERlc2VyaWFsaXplIHsgdHlwZTogJ0J1ZmZlcicsIGRhdGE6IFsxLDIsMywuLi5dIH0gaW50byBhIEJ1ZmZlciBvYmplY3QuXG4vLyBSZXR1cm5zIGEgemVyby1sZW5ndGggYnVmZmVyIGZvciBpbnB1dHMgdGhhdCBkb24ndCBjb25mb3JtIHRvIHRoZSBzcGVjLlxuZnVuY3Rpb24gZnJvbUpzb25PYmplY3QgKHRoYXQsIG9iamVjdCkge1xuICB2YXIgYXJyYXlcbiAgdmFyIGxlbmd0aCA9IDBcblxuICBpZiAob2JqZWN0LnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqZWN0LmRhdGEpKSB7XG4gICAgYXJyYXkgPSBvYmplY3QuZGF0YVxuICAgIGxlbmd0aCA9IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgfVxuICB0aGF0ID0gYWxsb2NhdGUodGhhdCwgbGVuZ3RoKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxufSBlbHNlIHtcbiAgLy8gcHJlLXNldCBmb3IgdmFsdWVzIHRoYXQgbWF5IGV4aXN0IGluIHRoZSBmdXR1cmVcbiAgQnVmZmVyLnByb3RvdHlwZS5sZW5ndGggPSB1bmRlZmluZWRcbiAgQnVmZmVyLnByb3RvdHlwZS5wYXJlbnQgPSB1bmRlZmluZWRcbn1cblxuZnVuY3Rpb24gYWxsb2NhdGUgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhhdC5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgZnJvbVBvb2wgPSBsZW5ndGggIT09IDAgJiYgbGVuZ3RoIDw9IEJ1ZmZlci5wb29sU2l6ZSA+Pj4gMVxuICBpZiAoZnJvbVBvb2wpIHRoYXQucGFyZW50ID0gcm9vdFBhcmVudFxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAoc3ViamVjdCwgZW5jb2RpbmcpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNsb3dCdWZmZXIpKSByZXR1cm4gbmV3IFNsb3dCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcpXG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcpXG4gIGRlbGV0ZSBidWYucGFyZW50XG4gIHJldHVybiBidWZcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIHZhciBpID0gMFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkgYnJlYWtcblxuICAgICsraVxuICB9XG5cbiAgaWYgKGkgIT09IGxlbikge1xuICAgIHggPSBhW2ldXG4gICAgeSA9IGJbaV1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbGlzdCBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMuJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHN0cmluZyA9ICcnICsgc3RyaW5nXG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAvLyBEZXByZWNhdGVkXG4gICAgICBjYXNlICdyYXcnOlxuICAgICAgY2FzZSAncmF3cyc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgc3RhcnQgPSBzdGFydCB8IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID09PSBJbmZpbml0eSA/IHRoaXMubGVuZ3RoIDogZW5kIHwgMFxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG4gIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmIChlbmQgPD0gc3RhcnQpIHJldHVybiAnJ1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGJpbmFyeVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gMFxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYilcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0KSB7XG4gIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgYnl0ZU9mZnNldCA+Pj0gMFxuXG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG4gIGlmIChieXRlT2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm4gLTFcblxuICAvLyBOZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IE1hdGgubWF4KHRoaXMubGVuZ3RoICsgYnl0ZU9mZnNldCwgMClcblxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xIC8vIHNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nIGFsd2F5cyBmYWlsc1xuICAgIHJldHVybiBTdHJpbmcucHJvdG90eXBlLmluZGV4T2YuY2FsbCh0aGlzLCB2YWwsIGJ5dGVPZmZzZXQpXG4gIH1cbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQpXG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGhpcywgdmFsLCBieXRlT2Zmc2V0KVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKHRoaXMsIFsgdmFsIF0sIGJ5dGVPZmZzZXQpXG4gIH1cblxuICBmdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0KSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAodmFyIGkgPSAwOyBieXRlT2Zmc2V0ICsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltieXRlT2Zmc2V0ICsgaV0gPT09IHZhbFtmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleF0pIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWwubGVuZ3RoKSByZXR1cm4gYnl0ZU9mZnNldCArIGZvdW5kSW5kZXhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbi8vIGBnZXRgIGlzIGRlcHJlY2F0ZWRcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIGlzIGRlcHJlY2F0ZWRcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0ICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJpbmFyeVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBvZmZzZXQgPSBsZW5ndGggfCAwXG4gICAgbGVuZ3RoID0gc3dhcFxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBiaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGJpbmFyeVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIGlmIChuZXdCdWYubGVuZ3RoKSBuZXdCdWYucGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpc1xuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignYnVmZmVyIG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCd2YWx1ZSBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdpbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSwgMClcblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSwgMClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IHZhbHVlIDwgMCA/IDEgOiAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gdmFsdWUgPCAwID8gMSA6IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndmFsdWUgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignaW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdpbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0U3RhcnQpXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAoZW5kIDwgc3RhcnQpIHRocm93IG5ldyBSYW5nZUVycm9yKCdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignZW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgdGhpc1tpXSA9IHZhbHVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IHV0ZjhUb0J5dGVzKHZhbHVlLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIHRoaXNbaV0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIHRvQXJyYXlCdWZmZXIgKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBidWYuYnVmZmVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIF9hdWdtZW50IChhcnIpIHtcbiAgYXJyLmNvbnN0cnVjdG9yID0gQnVmZmVyXG4gIGFyci5faXNCdWZmZXIgPSB0cnVlXG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBzZXQgbWV0aG9kIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX3NldCA9IGFyci5zZXRcblxuICAvLyBkZXByZWNhdGVkXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmVxdWFscyA9IEJQLmVxdWFsc1xuICBhcnIuY29tcGFyZSA9IEJQLmNvbXBhcmVcbiAgYXJyLmluZGV4T2YgPSBCUC5pbmRleE9mXG4gIGFyci5jb3B5ID0gQlAuY29weVxuICBhcnIuc2xpY2UgPSBCUC5zbGljZVxuICBhcnIucmVhZFVJbnRMRSA9IEJQLnJlYWRVSW50TEVcbiAgYXJyLnJlYWRVSW50QkUgPSBCUC5yZWFkVUludEJFXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludExFID0gQlAucmVhZEludExFXG4gIGFyci5yZWFkSW50QkUgPSBCUC5yZWFkSW50QkVcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDhcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEVcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkVcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEVcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkVcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEVcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkVcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRVxuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFXG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50OFxuICBhcnIud3JpdGVVSW50TEUgPSBCUC53cml0ZVVJbnRMRVxuICBhcnIud3JpdGVVSW50QkUgPSBCUC53cml0ZVVJbnRCRVxuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEVcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFXG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRVxuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkVcbiAgYXJyLndyaXRlSW50TEUgPSBCUC53cml0ZUludExFXG4gIGFyci53cml0ZUludEJFID0gQlAud3JpdGVJbnRCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2J1ZmZlci9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuICB2YXIgQXJyID0gKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJylcbiAgICA/IFVpbnQ4QXJyYXlcbiAgICA6IEFycmF5XG5cblx0dmFyIFBMVVMgICA9ICcrJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSCAgPSAnLycuY2hhckNvZGVBdCgwKVxuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIExPV0VSICA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdHZhciBVUFBFUiAgPSAnQScuY2hhckNvZGVBdCgwKVxuXHR2YXIgUExVU19VUkxfU0FGRSA9ICctJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSF9VUkxfU0FGRSA9ICdfJy5jaGFyQ29kZUF0KDApXG5cblx0ZnVuY3Rpb24gZGVjb2RlIChlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApXG5cdFx0aWYgKGNvZGUgPT09IFBMVVMgfHxcblx0XHQgICAgY29kZSA9PT0gUExVU19VUkxfU0FGRSlcblx0XHRcdHJldHVybiA2MiAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0ggfHxcblx0XHQgICAgY29kZSA9PT0gU0xBU0hfVVJMX1NBRkUpXG5cdFx0XHRyZXR1cm4gNjMgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpXG5cdFx0XHRyZXR1cm4gLTEgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApXG5cdFx0XHRyZXR1cm4gY29kZSAtIE5VTUJFUiArIDI2ICsgMjZcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIFVQUEVSXG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheSAoYjY0KSB7XG5cdFx0dmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cdFx0cGxhY2VIb2xkZXJzID0gJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDIpID8gMiA6ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAxKSA/IDEgOiAwXG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycylcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aFxuXG5cdFx0dmFyIEwgPSAwXG5cblx0XHRmdW5jdGlvbiBwdXNoICh2KSB7XG5cdFx0XHRhcnJbTCsrXSA9IHZcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDE4KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYpIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwKSA+PiA4KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDQpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMilcblx0XHRcdHB1c2goKHRtcCA+PiA4KSAmIDB4RkYpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFyclxuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCAodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHRcdGV4dHJhQnl0ZXMgPSB1aW50OC5sZW5ndGggJSAzLCAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuXHRcdFx0b3V0cHV0ID0gXCJcIixcblx0XHRcdHRlbXAsIGxlbmd0aFxuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlIChudW0pIHtcblx0XHRcdHJldHVybiBsb29rdXAuY2hhckF0KG51bSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShudW0gPj4gMTggJiAweDNGKSArIGVuY29kZShudW0gPj4gMTIgJiAweDNGKSArIGVuY29kZShudW0gPj4gNiAmIDB4M0YpICsgZW5jb2RlKG51bSAmIDB4M0YpXG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcblx0XHRcdG91dHB1dCArPSB0cmlwbGV0VG9CYXNlNjQodGVtcClcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPT0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyAodWludDhbdWludDgubGVuZ3RoIC0gMV0pXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAxMClcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA+PiA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgMikgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dFxuXHR9XG5cblx0ZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5XG5cdGV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjRcbn0odHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gKHRoaXMuYmFzZTY0anMgPSB7fSkgOiBleHBvcnRzKSlcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9idWZmZXIvfi9iYXNlNjQtanMvbGliL2I2NC5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9idWZmZXIvfi9pZWVlNzU0L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2J1ZmZlci9+L2lzYXJyYXkvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vcm5nJylcblxuZnVuY3Rpb24gZXJyb3IgKCkge1xuICB2YXIgbSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcgJylcbiAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICBtLFxuICAgICd3ZSBhY2NlcHQgcHVsbCByZXF1ZXN0cycsXG4gICAgJ2h0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5J1xuICAgIF0uam9pbignXFxuJykpXG59XG5cbmV4cG9ydHMuY3JlYXRlSGFzaCA9IHJlcXVpcmUoJy4vY3JlYXRlLWhhc2gnKVxuXG5leHBvcnRzLmNyZWF0ZUhtYWMgPSByZXF1aXJlKCcuL2NyZWF0ZS1obWFjJylcblxuZXhwb3J0cy5yYW5kb21CeXRlcyA9IGZ1bmN0aW9uKHNpemUsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkLCBuZXcgQnVmZmVyKHJuZyhzaXplKSkpXG4gICAgfSBjYXRjaCAoZXJyKSB7IGNhbGxiYWNrKGVycikgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKHJuZyhzaXplKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoKGEsIGYpIHtcbiAgZm9yKHZhciBpIGluIGEpXG4gICAgZihhW2ldLCBpKVxufVxuXG5leHBvcnRzLmdldEhhc2hlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFsnc2hhMScsICdzaGEyNTYnLCAnc2hhNTEyJywgJ21kNScsICdybWQxNjAnXVxufVxuXG52YXIgcCA9IHJlcXVpcmUoJy4vcGJrZGYyJykoZXhwb3J0cylcbmV4cG9ydHMucGJrZGYyID0gcC5wYmtkZjJcbmV4cG9ydHMucGJrZGYyU3luYyA9IHAucGJrZGYyU3luY1xuXG5cbi8vIHRoZSBsZWFzdCBJIGNhbiBkbyBpcyBtYWtlIGVycm9yIG1lc3NhZ2VzIGZvciB0aGUgcmVzdCBvZiB0aGUgbm9kZS5qcy9jcnlwdG8gYXBpLlxuZWFjaChbJ2NyZWF0ZUNyZWRlbnRpYWxzJ1xuLCAnY3JlYXRlQ2lwaGVyJ1xuLCAnY3JlYXRlQ2lwaGVyaXYnXG4sICdjcmVhdGVEZWNpcGhlcidcbiwgJ2NyZWF0ZURlY2lwaGVyaXYnXG4sICdjcmVhdGVTaWduJ1xuLCAnY3JlYXRlVmVyaWZ5J1xuLCAnY3JlYXRlRGlmZmllSGVsbG1hbidcbl0sIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGV4cG9ydHNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgZXJyb3IoJ3NvcnJ5LCcsIG5hbWUsICdpcyBub3QgaW1wbGVtZW50ZWQgeWV0JylcbiAgfVxufSlcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBnID0gKCd1bmRlZmluZWQnID09PSB0eXBlb2Ygd2luZG93ID8gZ2xvYmFsIDogd2luZG93KSB8fCB7fVxuICBfY3J5cHRvID0gKFxuICAgIGcuY3J5cHRvIHx8IGcubXNDcnlwdG8gfHwgcmVxdWlyZSgnY3J5cHRvJylcbiAgKVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAvLyBNb2Rlcm4gQnJvd3NlcnNcbiAgICBpZihfY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdmFyIGJ5dGVzID0gbmV3IEJ1ZmZlcihzaXplKTsgLy9pbiBicm93c2VyaWZ5LCB0aGlzIGlzIGFuIGV4dGVuZGVkIFVpbnQ4QXJyYXlcbiAgICAgIC8qIFRoaXMgd2lsbCBub3Qgd29yayBpbiBvbGRlciBicm93c2Vycy5cbiAgICAgICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXNcbiAgICAgICAqL1xuICAgIFxuICAgICAgX2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cbiAgICBlbHNlIGlmIChfY3J5cHRvLnJhbmRvbUJ5dGVzKSB7XG4gICAgICByZXR1cm4gX2NyeXB0by5yYW5kb21CeXRlcyhzaXplKVxuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdzZWN1cmUgcmFuZG9tIG51bWJlciBnZW5lcmF0aW9uIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyXFxuJytcbiAgICAgICAgJ3VzZSBjaHJvbWUsIEZpcmVGb3ggb3IgSW50ZXJuZXQgRXhwbG9yZXIgMTEnXG4gICAgICApXG4gIH1cbn0oKSlcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogKGlnbm9yZWQpICovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBjcnlwdG8gKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjcmVhdGVIYXNoID0gcmVxdWlyZSgnc2hhLmpzJylcblxudmFyIG1kNSA9IHRvQ29uc3RydWN0b3IocmVxdWlyZSgnLi9tZDUnKSlcbnZhciBybWQxNjAgPSB0b0NvbnN0cnVjdG9yKHJlcXVpcmUoJ3JpcGVtZDE2MCcpKVxuXG5mdW5jdGlvbiB0b0NvbnN0cnVjdG9yIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBidWZmZXJzID0gW11cbiAgICB2YXIgbT0ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZGF0YSwgZW5jKSB7XG4gICAgICAgIGlmKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEsIGVuYylcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9LFxuICAgICAgZGlnZXN0OiBmdW5jdGlvbiAoZW5jKSB7XG4gICAgICAgIHZhciBidWYgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpXG4gICAgICAgIHZhciByID0gZm4oYnVmKVxuICAgICAgICBidWZmZXJzID0gbnVsbFxuICAgICAgICByZXR1cm4gZW5jID8gci50b1N0cmluZyhlbmMpIDogclxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFsZykge1xuICBpZignbWQ1JyA9PT0gYWxnKSByZXR1cm4gbmV3IG1kNSgpXG4gIGlmKCdybWQxNjAnID09PSBhbGcpIHJldHVybiBuZXcgcm1kMTYwKClcbiAgcmV0dXJuIGNyZWF0ZUhhc2goYWxnKVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L2NyZWF0ZS1oYXNoLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWxnKSB7XG4gIHZhciBBbGcgPSBleHBvcnRzW2FsZ11cbiAgaWYoIUFsZykgdGhyb3cgbmV3IEVycm9yKGFsZyArICcgaXMgbm90IHN1cHBvcnRlZCAod2UgYWNjZXB0IHB1bGwgcmVxdWVzdHMpJylcbiAgcmV0dXJuIG5ldyBBbGcoKVxufVxuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyXG52YXIgSGFzaCAgID0gcmVxdWlyZSgnLi9oYXNoJykoQnVmZmVyKVxuXG5leHBvcnRzLnNoYTEgPSByZXF1aXJlKCcuL3NoYTEnKShCdWZmZXIsIEhhc2gpXG5leHBvcnRzLnNoYTI1NiA9IHJlcXVpcmUoJy4vc2hhMjU2JykoQnVmZmVyLCBIYXNoKVxuZXhwb3J0cy5zaGE1MTIgPSByZXF1aXJlKCcuL3NoYTUxMicpKEJ1ZmZlciwgSGFzaClcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9+L3NoYS5qcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCdWZmZXIpIHtcblxuICAvL3Byb3RvdHlwZSBjbGFzcyBmb3IgaGFzaCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gSGFzaCAoYmxvY2tTaXplLCBmaW5hbFNpemUpIHtcbiAgICB0aGlzLl9ibG9jayA9IG5ldyBCdWZmZXIoYmxvY2tTaXplKSAvL25ldyBVaW50MzJBcnJheShibG9ja1NpemUvNClcbiAgICB0aGlzLl9maW5hbFNpemUgPSBmaW5hbFNpemVcbiAgICB0aGlzLl9ibG9ja1NpemUgPSBibG9ja1NpemVcbiAgICB0aGlzLl9sZW4gPSAwXG4gICAgdGhpcy5fcyA9IDBcbiAgfVxuXG4gIEhhc2gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcyA9IDBcbiAgICB0aGlzLl9sZW4gPSAwXG4gIH1cblxuICBIYXNoLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSwgZW5jKSB7XG4gICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBkYXRhKSB7XG4gICAgICBlbmMgPSBlbmMgfHwgXCJ1dGY4XCJcbiAgICAgIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEsIGVuYylcbiAgICB9XG5cbiAgICB2YXIgbCA9IHRoaXMuX2xlbiArPSBkYXRhLmxlbmd0aFxuICAgIHZhciBzID0gdGhpcy5fcyA9ICh0aGlzLl9zIHx8IDApXG4gICAgdmFyIGYgPSAwXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuX2Jsb2NrXG5cbiAgICB3aGlsZSAocyA8IGwpIHtcbiAgICAgIHZhciB0ID0gTWF0aC5taW4oZGF0YS5sZW5ndGgsIGYgKyB0aGlzLl9ibG9ja1NpemUgLSAocyAlIHRoaXMuX2Jsb2NrU2l6ZSkpXG4gICAgICB2YXIgY2ggPSAodCAtIGYpXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2g7IGkrKykge1xuICAgICAgICBidWZmZXJbKHMgJSB0aGlzLl9ibG9ja1NpemUpICsgaV0gPSBkYXRhW2kgKyBmXVxuICAgICAgfVxuXG4gICAgICBzICs9IGNoXG4gICAgICBmICs9IGNoXG5cbiAgICAgIGlmICgocyAlIHRoaXMuX2Jsb2NrU2l6ZSkgPT09IDApIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlKGJ1ZmZlcilcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcyA9IHNcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBIYXNoLnByb3RvdHlwZS5kaWdlc3QgPSBmdW5jdGlvbiAoZW5jKSB7XG4gICAgLy8gU3VwcG9zZSB0aGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlIE0sIGluIGJpdHMsIGlzIGxcbiAgICB2YXIgbCA9IHRoaXMuX2xlbiAqIDhcblxuICAgIC8vIEFwcGVuZCB0aGUgYml0IDEgdG8gdGhlIGVuZCBvZiB0aGUgbWVzc2FnZVxuICAgIHRoaXMuX2Jsb2NrW3RoaXMuX2xlbiAlIHRoaXMuX2Jsb2NrU2l6ZV0gPSAweDgwXG5cbiAgICAvLyBhbmQgdGhlbiBrIHplcm8gYml0cywgd2hlcmUgayBpcyB0aGUgc21hbGxlc3Qgbm9uLW5lZ2F0aXZlIHNvbHV0aW9uIHRvIHRoZSBlcXVhdGlvbiAobCArIDEgKyBrKSA9PT0gZmluYWxTaXplIG1vZCBibG9ja1NpemVcbiAgICB0aGlzLl9ibG9jay5maWxsKDAsIHRoaXMuX2xlbiAlIHRoaXMuX2Jsb2NrU2l6ZSArIDEpXG5cbiAgICBpZiAobCAlICh0aGlzLl9ibG9ja1NpemUgKiA4KSA+PSB0aGlzLl9maW5hbFNpemUgKiA4KSB7XG4gICAgICB0aGlzLl91cGRhdGUodGhpcy5fYmxvY2spXG4gICAgICB0aGlzLl9ibG9jay5maWxsKDApXG4gICAgfVxuXG4gICAgLy8gdG8gdGhpcyBhcHBlbmQgdGhlIGJsb2NrIHdoaWNoIGlzIGVxdWFsIHRvIHRoZSBudW1iZXIgbCB3cml0dGVuIGluIGJpbmFyeVxuICAgIC8vIFRPRE86IGhhbmRsZSBjYXNlIHdoZXJlIGwgaXMgPiBNYXRoLnBvdygyLCAyOSlcbiAgICB0aGlzLl9ibG9jay53cml0ZUludDMyQkUobCwgdGhpcy5fYmxvY2tTaXplIC0gNClcblxuICAgIHZhciBoYXNoID0gdGhpcy5fdXBkYXRlKHRoaXMuX2Jsb2NrKSB8fCB0aGlzLl9oYXNoKClcblxuICAgIHJldHVybiBlbmMgPyBoYXNoLnRvU3RyaW5nKGVuYykgOiBoYXNoXG4gIH1cblxuICBIYXNoLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignX3VwZGF0ZSBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzJylcbiAgfVxuXG4gIHJldHVybiBIYXNoXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvfi9zaGEuanMvaGFzaC5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0xLCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIFBVQiAxODAtMVxuICogVmVyc2lvbiAyLjFhIENvcHlyaWdodCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDAyLlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAqL1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCd1dGlsJykuaW5oZXJpdHNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQnVmZmVyLCBIYXNoKSB7XG5cbiAgdmFyIEEgPSAwfDBcbiAgdmFyIEIgPSA0fDBcbiAgdmFyIEMgPSA4fDBcbiAgdmFyIEQgPSAxMnwwXG4gIHZhciBFID0gMTZ8MFxuXG4gIHZhciBXID0gbmV3ICh0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyBBcnJheSA6IEludDMyQXJyYXkpKDgwKVxuXG4gIHZhciBQT09MID0gW11cblxuICBmdW5jdGlvbiBTaGExICgpIHtcbiAgICBpZihQT09MLmxlbmd0aClcbiAgICAgIHJldHVybiBQT09MLnBvcCgpLmluaXQoKVxuXG4gICAgaWYoISh0aGlzIGluc3RhbmNlb2YgU2hhMSkpIHJldHVybiBuZXcgU2hhMSgpXG4gICAgdGhpcy5fdyA9IFdcbiAgICBIYXNoLmNhbGwodGhpcywgMTYqNCwgMTQqNClcblxuICAgIHRoaXMuX2ggPSBudWxsXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaGVyaXRzKFNoYTEsIEhhc2gpXG5cbiAgU2hhMS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9hID0gMHg2NzQ1MjMwMVxuICAgIHRoaXMuX2IgPSAweGVmY2RhYjg5XG4gICAgdGhpcy5fYyA9IDB4OThiYWRjZmVcbiAgICB0aGlzLl9kID0gMHgxMDMyNTQ3NlxuICAgIHRoaXMuX2UgPSAweGMzZDJlMWYwXG5cbiAgICBIYXNoLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgU2hhMS5wcm90b3R5cGUuX1BPT0wgPSBQT09MXG4gIFNoYTEucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAoWCkge1xuXG4gICAgdmFyIGEsIGIsIGMsIGQsIGUsIF9hLCBfYiwgX2MsIF9kLCBfZVxuXG4gICAgYSA9IF9hID0gdGhpcy5fYVxuICAgIGIgPSBfYiA9IHRoaXMuX2JcbiAgICBjID0gX2MgPSB0aGlzLl9jXG4gICAgZCA9IF9kID0gdGhpcy5fZFxuICAgIGUgPSBfZSA9IHRoaXMuX2VcblxuICAgIHZhciB3ID0gdGhpcy5fd1xuXG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDgwOyBqKyspIHtcbiAgICAgIHZhciBXID0gd1tqXSA9IGogPCAxNiA/IFgucmVhZEludDMyQkUoaio0KVxuICAgICAgICA6IHJvbCh3W2ogLSAzXSBeIHdbaiAtICA4XSBeIHdbaiAtIDE0XSBeIHdbaiAtIDE2XSwgMSlcblxuICAgICAgdmFyIHQgPSBhZGQoXG4gICAgICAgIGFkZChyb2woYSwgNSksIHNoYTFfZnQoaiwgYiwgYywgZCkpLFxuICAgICAgICBhZGQoYWRkKGUsIFcpLCBzaGExX2t0KGopKVxuICAgICAgKVxuXG4gICAgICBlID0gZFxuICAgICAgZCA9IGNcbiAgICAgIGMgPSByb2woYiwgMzApXG4gICAgICBiID0gYVxuICAgICAgYSA9IHRcbiAgICB9XG5cbiAgICB0aGlzLl9hID0gYWRkKGEsIF9hKVxuICAgIHRoaXMuX2IgPSBhZGQoYiwgX2IpXG4gICAgdGhpcy5fYyA9IGFkZChjLCBfYylcbiAgICB0aGlzLl9kID0gYWRkKGQsIF9kKVxuICAgIHRoaXMuX2UgPSBhZGQoZSwgX2UpXG4gIH1cblxuICBTaGExLnByb3RvdHlwZS5faGFzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZihQT09MLmxlbmd0aCA8IDEwMCkgUE9PTC5wdXNoKHRoaXMpXG4gICAgdmFyIEggPSBuZXcgQnVmZmVyKDIwKVxuICAgIC8vY29uc29sZS5sb2codGhpcy5fYXwwLCB0aGlzLl9ifDAsIHRoaXMuX2N8MCwgdGhpcy5fZHwwLCB0aGlzLl9lfDApXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fYXwwLCBBKVxuICAgIEgud3JpdGVJbnQzMkJFKHRoaXMuX2J8MCwgQilcbiAgICBILndyaXRlSW50MzJCRSh0aGlzLl9jfDAsIEMpXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fZHwwLCBEKVxuICAgIEgud3JpdGVJbnQzMkJFKHRoaXMuX2V8MCwgRSlcbiAgICByZXR1cm4gSFxuICB9XG5cbiAgLypcbiAgICogUGVyZm9ybSB0aGUgYXBwcm9wcmlhdGUgdHJpcGxldCBjb21iaW5hdGlvbiBmdW5jdGlvbiBmb3IgdGhlIGN1cnJlbnRcbiAgICogaXRlcmF0aW9uXG4gICAqL1xuICBmdW5jdGlvbiBzaGExX2Z0KHQsIGIsIGMsIGQpIHtcbiAgICBpZih0IDwgMjApIHJldHVybiAoYiAmIGMpIHwgKCh+YikgJiBkKTtcbiAgICBpZih0IDwgNDApIHJldHVybiBiIF4gYyBeIGQ7XG4gICAgaWYodCA8IDYwKSByZXR1cm4gKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpO1xuICAgIHJldHVybiBiIF4gYyBeIGQ7XG4gIH1cblxuICAvKlxuICAgKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGFkZGl0aXZlIGNvbnN0YW50IGZvciB0aGUgY3VycmVudCBpdGVyYXRpb25cbiAgICovXG4gIGZ1bmN0aW9uIHNoYTFfa3QodCkge1xuICAgIHJldHVybiAodCA8IDIwKSA/ICAxNTE4NTAwMjQ5IDogKHQgPCA0MCkgPyAgMTg1OTc3NTM5MyA6XG4gICAgICAgICAgICh0IDwgNjApID8gLTE4OTQwMDc1ODggOiAtODk5NDk3NTE0O1xuICB9XG5cbiAgLypcbiAgICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAgKiAvL2RvbWluaWN0YXJyOiB0aGlzIGlzIDEwIHllYXJzIG9sZCwgc28gbWF5YmUgdGhpcyBjYW4gYmUgZHJvcHBlZD8pXG4gICAqXG4gICAqL1xuICBmdW5jdGlvbiBhZGQoeCwgeSkge1xuICAgIHJldHVybiAoeCArIHkgKSB8IDBcbiAgLy9sZXRzIHNlZSBob3cgdGhpcyBnb2VzIG9uIHRlc3RsaW5nLlxuICAvLyAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgLy8gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgLy8gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICB9XG5cbiAgLypcbiAgICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICAgKi9cbiAgZnVuY3Rpb24gcm9sKG51bSwgY250KSB7XG4gICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xuICB9XG5cbiAgcmV0dXJuIFNoYTFcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9+L3NoYS5qcy9zaGExLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKGlzVW5kZWZpbmVkKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52aXJvbjtcbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGRlYnVnRW52aXJvbikpXG4gICAgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi91dGlsL3V0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3V0aWwvfi9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuLyoqXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTI1NiwgYXMgZGVmaW5lZFxuICogaW4gRklQUyAxODAtMlxuICogVmVyc2lvbiAyLjItYmV0YSBDb3B5cmlnaHQgQW5nZWwgTWFyaW4sIFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDkuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKlxuICovXG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ3V0aWwnKS5pbmhlcml0c1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCdWZmZXIsIEhhc2gpIHtcblxuICB2YXIgSyA9IFtcbiAgICAgIDB4NDI4QTJGOTgsIDB4NzEzNzQ0OTEsIDB4QjVDMEZCQ0YsIDB4RTlCNURCQTUsXG4gICAgICAweDM5NTZDMjVCLCAweDU5RjExMUYxLCAweDkyM0Y4MkE0LCAweEFCMUM1RUQ1LFxuICAgICAgMHhEODA3QUE5OCwgMHgxMjgzNUIwMSwgMHgyNDMxODVCRSwgMHg1NTBDN0RDMyxcbiAgICAgIDB4NzJCRTVENzQsIDB4ODBERUIxRkUsIDB4OUJEQzA2QTcsIDB4QzE5QkYxNzQsXG4gICAgICAweEU0OUI2OUMxLCAweEVGQkU0Nzg2LCAweDBGQzE5REM2LCAweDI0MENBMUNDLFxuICAgICAgMHgyREU5MkM2RiwgMHg0QTc0ODRBQSwgMHg1Q0IwQTlEQywgMHg3NkY5ODhEQSxcbiAgICAgIDB4OTgzRTUxNTIsIDB4QTgzMUM2NkQsIDB4QjAwMzI3QzgsIDB4QkY1OTdGQzcsXG4gICAgICAweEM2RTAwQkYzLCAweEQ1QTc5MTQ3LCAweDA2Q0E2MzUxLCAweDE0MjkyOTY3LFxuICAgICAgMHgyN0I3MEE4NSwgMHgyRTFCMjEzOCwgMHg0RDJDNkRGQywgMHg1MzM4MEQxMyxcbiAgICAgIDB4NjUwQTczNTQsIDB4NzY2QTBBQkIsIDB4ODFDMkM5MkUsIDB4OTI3MjJDODUsXG4gICAgICAweEEyQkZFOEExLCAweEE4MUE2NjRCLCAweEMyNEI4QjcwLCAweEM3NkM1MUEzLFxuICAgICAgMHhEMTkyRTgxOSwgMHhENjk5MDYyNCwgMHhGNDBFMzU4NSwgMHgxMDZBQTA3MCxcbiAgICAgIDB4MTlBNEMxMTYsIDB4MUUzNzZDMDgsIDB4Mjc0ODc3NEMsIDB4MzRCMEJDQjUsXG4gICAgICAweDM5MUMwQ0IzLCAweDRFRDhBQTRBLCAweDVCOUNDQTRGLCAweDY4MkU2RkYzLFxuICAgICAgMHg3NDhGODJFRSwgMHg3OEE1NjM2RiwgMHg4NEM4NzgxNCwgMHg4Q0M3MDIwOCxcbiAgICAgIDB4OTBCRUZGRkEsIDB4QTQ1MDZDRUIsIDB4QkVGOUEzRjcsIDB4QzY3MTc4RjJcbiAgICBdXG5cbiAgdmFyIFcgPSBuZXcgQXJyYXkoNjQpXG5cbiAgZnVuY3Rpb24gU2hhMjU2KCkge1xuICAgIHRoaXMuaW5pdCgpXG5cbiAgICB0aGlzLl93ID0gVyAvL25ldyBBcnJheSg2NClcblxuICAgIEhhc2guY2FsbCh0aGlzLCAxNio0LCAxNCo0KVxuICB9XG5cbiAgaW5oZXJpdHMoU2hhMjU2LCBIYXNoKVxuXG4gIFNoYTI1Ni5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuX2EgPSAweDZhMDllNjY3fDBcbiAgICB0aGlzLl9iID0gMHhiYjY3YWU4NXwwXG4gICAgdGhpcy5fYyA9IDB4M2M2ZWYzNzJ8MFxuICAgIHRoaXMuX2QgPSAweGE1NGZmNTNhfDBcbiAgICB0aGlzLl9lID0gMHg1MTBlNTI3ZnwwXG4gICAgdGhpcy5fZiA9IDB4OWIwNTY4OGN8MFxuICAgIHRoaXMuX2cgPSAweDFmODNkOWFifDBcbiAgICB0aGlzLl9oID0gMHg1YmUwY2QxOXwwXG5cbiAgICB0aGlzLl9sZW4gPSB0aGlzLl9zID0gMFxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZ1bmN0aW9uIFMgKFgsIG4pIHtcbiAgICByZXR1cm4gKFggPj4+IG4pIHwgKFggPDwgKDMyIC0gbikpO1xuICB9XG5cbiAgZnVuY3Rpb24gUiAoWCwgbikge1xuICAgIHJldHVybiAoWCA+Pj4gbik7XG4gIH1cblxuICBmdW5jdGlvbiBDaCAoeCwgeSwgeikge1xuICAgIHJldHVybiAoKHggJiB5KSBeICgofngpICYgeikpO1xuICB9XG5cbiAgZnVuY3Rpb24gTWFqICh4LCB5LCB6KSB7XG4gICAgcmV0dXJuICgoeCAmIHkpIF4gKHggJiB6KSBeICh5ICYgeikpO1xuICB9XG5cbiAgZnVuY3Rpb24gU2lnbWEwMjU2ICh4KSB7XG4gICAgcmV0dXJuIChTKHgsIDIpIF4gUyh4LCAxMykgXiBTKHgsIDIyKSk7XG4gIH1cblxuICBmdW5jdGlvbiBTaWdtYTEyNTYgKHgpIHtcbiAgICByZXR1cm4gKFMoeCwgNikgXiBTKHgsIDExKSBeIFMoeCwgMjUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEdhbW1hMDI1NiAoeCkge1xuICAgIHJldHVybiAoUyh4LCA3KSBeIFMoeCwgMTgpIF4gUih4LCAzKSk7XG4gIH1cblxuICBmdW5jdGlvbiBHYW1tYTEyNTYgKHgpIHtcbiAgICByZXR1cm4gKFMoeCwgMTcpIF4gUyh4LCAxOSkgXiBSKHgsIDEwKSk7XG4gIH1cblxuICBTaGEyNTYucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbihNKSB7XG5cbiAgICB2YXIgVyA9IHRoaXMuX3dcbiAgICB2YXIgYSwgYiwgYywgZCwgZSwgZiwgZywgaFxuICAgIHZhciBUMSwgVDJcblxuICAgIGEgPSB0aGlzLl9hIHwgMFxuICAgIGIgPSB0aGlzLl9iIHwgMFxuICAgIGMgPSB0aGlzLl9jIHwgMFxuICAgIGQgPSB0aGlzLl9kIHwgMFxuICAgIGUgPSB0aGlzLl9lIHwgMFxuICAgIGYgPSB0aGlzLl9mIHwgMFxuICAgIGcgPSB0aGlzLl9nIHwgMFxuICAgIGggPSB0aGlzLl9oIHwgMFxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCA2NDsgaisrKSB7XG4gICAgICB2YXIgdyA9IFdbal0gPSBqIDwgMTZcbiAgICAgICAgPyBNLnJlYWRJbnQzMkJFKGogKiA0KVxuICAgICAgICA6IEdhbW1hMTI1NihXW2ogLSAyXSkgKyBXW2ogLSA3XSArIEdhbW1hMDI1NihXW2ogLSAxNV0pICsgV1tqIC0gMTZdXG5cbiAgICAgIFQxID0gaCArIFNpZ21hMTI1NihlKSArIENoKGUsIGYsIGcpICsgS1tqXSArIHdcblxuICAgICAgVDIgPSBTaWdtYTAyNTYoYSkgKyBNYWooYSwgYiwgYyk7XG4gICAgICBoID0gZzsgZyA9IGY7IGYgPSBlOyBlID0gZCArIFQxOyBkID0gYzsgYyA9IGI7IGIgPSBhOyBhID0gVDEgKyBUMjtcbiAgICB9XG5cbiAgICB0aGlzLl9hID0gKGEgKyB0aGlzLl9hKSB8IDBcbiAgICB0aGlzLl9iID0gKGIgKyB0aGlzLl9iKSB8IDBcbiAgICB0aGlzLl9jID0gKGMgKyB0aGlzLl9jKSB8IDBcbiAgICB0aGlzLl9kID0gKGQgKyB0aGlzLl9kKSB8IDBcbiAgICB0aGlzLl9lID0gKGUgKyB0aGlzLl9lKSB8IDBcbiAgICB0aGlzLl9mID0gKGYgKyB0aGlzLl9mKSB8IDBcbiAgICB0aGlzLl9nID0gKGcgKyB0aGlzLl9nKSB8IDBcbiAgICB0aGlzLl9oID0gKGggKyB0aGlzLl9oKSB8IDBcblxuICB9O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUuX2hhc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIEggPSBuZXcgQnVmZmVyKDMyKVxuXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fYSwgIDApXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fYiwgIDQpXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fYywgIDgpXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fZCwgMTIpXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fZSwgMTYpXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fZiwgMjApXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5fZywgMjQpXG4gICAgSC53cml0ZUludDMyQkUodGhpcy5faCwgMjgpXG5cbiAgICByZXR1cm4gSFxuICB9XG5cbiAgcmV0dXJuIFNoYTI1NlxuXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvfi9zaGEuanMvc2hhMjU2LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ3V0aWwnKS5pbmhlcml0c1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCdWZmZXIsIEhhc2gpIHtcbiAgdmFyIEsgPSBbXG4gICAgMHg0MjhhMmY5OCwgMHhkNzI4YWUyMiwgMHg3MTM3NDQ5MSwgMHgyM2VmNjVjZCxcbiAgICAweGI1YzBmYmNmLCAweGVjNGQzYjJmLCAweGU5YjVkYmE1LCAweDgxODlkYmJjLFxuICAgIDB4Mzk1NmMyNWIsIDB4ZjM0OGI1MzgsIDB4NTlmMTExZjEsIDB4YjYwNWQwMTksXG4gICAgMHg5MjNmODJhNCwgMHhhZjE5NGY5YiwgMHhhYjFjNWVkNSwgMHhkYTZkODExOCxcbiAgICAweGQ4MDdhYTk4LCAweGEzMDMwMjQyLCAweDEyODM1YjAxLCAweDQ1NzA2ZmJlLFxuICAgIDB4MjQzMTg1YmUsIDB4NGVlNGIyOGMsIDB4NTUwYzdkYzMsIDB4ZDVmZmI0ZTIsXG4gICAgMHg3MmJlNWQ3NCwgMHhmMjdiODk2ZiwgMHg4MGRlYjFmZSwgMHgzYjE2OTZiMSxcbiAgICAweDliZGMwNmE3LCAweDI1YzcxMjM1LCAweGMxOWJmMTc0LCAweGNmNjkyNjk0LFxuICAgIDB4ZTQ5YjY5YzEsIDB4OWVmMTRhZDIsIDB4ZWZiZTQ3ODYsIDB4Mzg0ZjI1ZTMsXG4gICAgMHgwZmMxOWRjNiwgMHg4YjhjZDViNSwgMHgyNDBjYTFjYywgMHg3N2FjOWM2NSxcbiAgICAweDJkZTkyYzZmLCAweDU5MmIwMjc1LCAweDRhNzQ4NGFhLCAweDZlYTZlNDgzLFxuICAgIDB4NWNiMGE5ZGMsIDB4YmQ0MWZiZDQsIDB4NzZmOTg4ZGEsIDB4ODMxMTUzYjUsXG4gICAgMHg5ODNlNTE1MiwgMHhlZTY2ZGZhYiwgMHhhODMxYzY2ZCwgMHgyZGI0MzIxMCxcbiAgICAweGIwMDMyN2M4LCAweDk4ZmIyMTNmLCAweGJmNTk3ZmM3LCAweGJlZWYwZWU0LFxuICAgIDB4YzZlMDBiZjMsIDB4M2RhODhmYzIsIDB4ZDVhNzkxNDcsIDB4OTMwYWE3MjUsXG4gICAgMHgwNmNhNjM1MSwgMHhlMDAzODI2ZiwgMHgxNDI5Mjk2NywgMHgwYTBlNmU3MCxcbiAgICAweDI3YjcwYTg1LCAweDQ2ZDIyZmZjLCAweDJlMWIyMTM4LCAweDVjMjZjOTI2LFxuICAgIDB4NGQyYzZkZmMsIDB4NWFjNDJhZWQsIDB4NTMzODBkMTMsIDB4OWQ5NWIzZGYsXG4gICAgMHg2NTBhNzM1NCwgMHg4YmFmNjNkZSwgMHg3NjZhMGFiYiwgMHgzYzc3YjJhOCxcbiAgICAweDgxYzJjOTJlLCAweDQ3ZWRhZWU2LCAweDkyNzIyYzg1LCAweDE0ODIzNTNiLFxuICAgIDB4YTJiZmU4YTEsIDB4NGNmMTAzNjQsIDB4YTgxYTY2NGIsIDB4YmM0MjMwMDEsXG4gICAgMHhjMjRiOGI3MCwgMHhkMGY4OTc5MSwgMHhjNzZjNTFhMywgMHgwNjU0YmUzMCxcbiAgICAweGQxOTJlODE5LCAweGQ2ZWY1MjE4LCAweGQ2OTkwNjI0LCAweDU1NjVhOTEwLFxuICAgIDB4ZjQwZTM1ODUsIDB4NTc3MTIwMmEsIDB4MTA2YWEwNzAsIDB4MzJiYmQxYjgsXG4gICAgMHgxOWE0YzExNiwgMHhiOGQyZDBjOCwgMHgxZTM3NmMwOCwgMHg1MTQxYWI1MyxcbiAgICAweDI3NDg3NzRjLCAweGRmOGVlYjk5LCAweDM0YjBiY2I1LCAweGUxOWI0OGE4LFxuICAgIDB4MzkxYzBjYjMsIDB4YzVjOTVhNjMsIDB4NGVkOGFhNGEsIDB4ZTM0MThhY2IsXG4gICAgMHg1YjljY2E0ZiwgMHg3NzYzZTM3MywgMHg2ODJlNmZmMywgMHhkNmIyYjhhMyxcbiAgICAweDc0OGY4MmVlLCAweDVkZWZiMmZjLCAweDc4YTU2MzZmLCAweDQzMTcyZjYwLFxuICAgIDB4ODRjODc4MTQsIDB4YTFmMGFiNzIsIDB4OGNjNzAyMDgsIDB4MWE2NDM5ZWMsXG4gICAgMHg5MGJlZmZmYSwgMHgyMzYzMWUyOCwgMHhhNDUwNmNlYiwgMHhkZTgyYmRlOSxcbiAgICAweGJlZjlhM2Y3LCAweGIyYzY3OTE1LCAweGM2NzE3OGYyLCAweGUzNzI1MzJiLFxuICAgIDB4Y2EyNzNlY2UsIDB4ZWEyNjYxOWMsIDB4ZDE4NmI4YzcsIDB4MjFjMGMyMDcsXG4gICAgMHhlYWRhN2RkNiwgMHhjZGUwZWIxZSwgMHhmNTdkNGY3ZiwgMHhlZTZlZDE3OCxcbiAgICAweDA2ZjA2N2FhLCAweDcyMTc2ZmJhLCAweDBhNjM3ZGM1LCAweGEyYzg5OGE2LFxuICAgIDB4MTEzZjk4MDQsIDB4YmVmOTBkYWUsIDB4MWI3MTBiMzUsIDB4MTMxYzQ3MWIsXG4gICAgMHgyOGRiNzdmNSwgMHgyMzA0N2Q4NCwgMHgzMmNhYWI3YiwgMHg0MGM3MjQ5MyxcbiAgICAweDNjOWViZTBhLCAweDE1YzliZWJjLCAweDQzMWQ2N2M0LCAweDljMTAwZDRjLFxuICAgIDB4NGNjNWQ0YmUsIDB4Y2IzZTQyYjYsIDB4NTk3ZjI5OWMsIDB4ZmM2NTdlMmEsXG4gICAgMHg1ZmNiNmZhYiwgMHgzYWQ2ZmFlYywgMHg2YzQ0MTk4YywgMHg0YTQ3NTgxN1xuICBdXG5cbiAgdmFyIFcgPSBuZXcgQXJyYXkoMTYwKVxuXG4gIGZ1bmN0aW9uIFNoYTUxMigpIHtcbiAgICB0aGlzLmluaXQoKVxuICAgIHRoaXMuX3cgPSBXXG5cbiAgICBIYXNoLmNhbGwodGhpcywgMTI4LCAxMTIpXG4gIH1cblxuICBpbmhlcml0cyhTaGE1MTIsIEhhc2gpXG5cbiAgU2hhNTEyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5fYSA9IDB4NmEwOWU2Njd8MFxuICAgIHRoaXMuX2IgPSAweGJiNjdhZTg1fDBcbiAgICB0aGlzLl9jID0gMHgzYzZlZjM3MnwwXG4gICAgdGhpcy5fZCA9IDB4YTU0ZmY1M2F8MFxuICAgIHRoaXMuX2UgPSAweDUxMGU1MjdmfDBcbiAgICB0aGlzLl9mID0gMHg5YjA1Njg4Y3wwXG4gICAgdGhpcy5fZyA9IDB4MWY4M2Q5YWJ8MFxuICAgIHRoaXMuX2ggPSAweDViZTBjZDE5fDBcblxuICAgIHRoaXMuX2FsID0gMHhmM2JjYzkwOHwwXG4gICAgdGhpcy5fYmwgPSAweDg0Y2FhNzNifDBcbiAgICB0aGlzLl9jbCA9IDB4ZmU5NGY4MmJ8MFxuICAgIHRoaXMuX2RsID0gMHg1ZjFkMzZmMXwwXG4gICAgdGhpcy5fZWwgPSAweGFkZTY4MmQxfDBcbiAgICB0aGlzLl9mbCA9IDB4MmIzZTZjMWZ8MFxuICAgIHRoaXMuX2dsID0gMHhmYjQxYmQ2YnwwXG4gICAgdGhpcy5faGwgPSAweDEzN2UyMTc5fDBcblxuICAgIHRoaXMuX2xlbiA9IHRoaXMuX3MgPSAwXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZnVuY3Rpb24gUyAoWCwgWGwsIG4pIHtcbiAgICByZXR1cm4gKFggPj4+IG4pIHwgKFhsIDw8ICgzMiAtIG4pKVxuICB9XG5cbiAgZnVuY3Rpb24gQ2ggKHgsIHksIHopIHtcbiAgICByZXR1cm4gKCh4ICYgeSkgXiAoKH54KSAmIHopKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIE1haiAoeCwgeSwgeikge1xuICAgIHJldHVybiAoKHggJiB5KSBeICh4ICYgeikgXiAoeSAmIHopKTtcbiAgfVxuXG4gIFNoYTUxMi5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uKE0pIHtcblxuICAgIHZhciBXID0gdGhpcy5fd1xuICAgIHZhciBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoXG4gICAgdmFyIGFsLCBibCwgY2wsIGRsLCBlbCwgZmwsIGdsLCBobFxuXG4gICAgYSA9IHRoaXMuX2EgfCAwXG4gICAgYiA9IHRoaXMuX2IgfCAwXG4gICAgYyA9IHRoaXMuX2MgfCAwXG4gICAgZCA9IHRoaXMuX2QgfCAwXG4gICAgZSA9IHRoaXMuX2UgfCAwXG4gICAgZiA9IHRoaXMuX2YgfCAwXG4gICAgZyA9IHRoaXMuX2cgfCAwXG4gICAgaCA9IHRoaXMuX2ggfCAwXG5cbiAgICBhbCA9IHRoaXMuX2FsIHwgMFxuICAgIGJsID0gdGhpcy5fYmwgfCAwXG4gICAgY2wgPSB0aGlzLl9jbCB8IDBcbiAgICBkbCA9IHRoaXMuX2RsIHwgMFxuICAgIGVsID0gdGhpcy5fZWwgfCAwXG4gICAgZmwgPSB0aGlzLl9mbCB8IDBcbiAgICBnbCA9IHRoaXMuX2dsIHwgMFxuICAgIGhsID0gdGhpcy5faGwgfCAwXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDgwOyBpKyspIHtcbiAgICAgIHZhciBqID0gaSAqIDJcblxuICAgICAgdmFyIFdpLCBXaWxcblxuICAgICAgaWYgKGkgPCAxNikge1xuICAgICAgICBXaSA9IFdbal0gPSBNLnJlYWRJbnQzMkJFKGogKiA0KVxuICAgICAgICBXaWwgPSBXW2ogKyAxXSA9IE0ucmVhZEludDMyQkUoaiAqIDQgKyA0KVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgeCAgPSBXW2ogLSAxNSoyXVxuICAgICAgICB2YXIgeGwgPSBXW2ogLSAxNSoyICsgMV1cbiAgICAgICAgdmFyIGdhbW1hMCAgPSBTKHgsIHhsLCAxKSBeIFMoeCwgeGwsIDgpIF4gKHggPj4+IDcpXG4gICAgICAgIHZhciBnYW1tYTBsID0gUyh4bCwgeCwgMSkgXiBTKHhsLCB4LCA4KSBeIFMoeGwsIHgsIDcpXG5cbiAgICAgICAgeCAgPSBXW2ogLSAyKjJdXG4gICAgICAgIHhsID0gV1tqIC0gMioyICsgMV1cbiAgICAgICAgdmFyIGdhbW1hMSAgPSBTKHgsIHhsLCAxOSkgXiBTKHhsLCB4LCAyOSkgXiAoeCA+Pj4gNilcbiAgICAgICAgdmFyIGdhbW1hMWwgPSBTKHhsLCB4LCAxOSkgXiBTKHgsIHhsLCAyOSkgXiBTKHhsLCB4LCA2KVxuXG4gICAgICAgIC8vIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XVxuICAgICAgICB2YXIgV2k3ICA9IFdbaiAtIDcqMl1cbiAgICAgICAgdmFyIFdpN2wgPSBXW2ogLSA3KjIgKyAxXVxuXG4gICAgICAgIHZhciBXaTE2ICA9IFdbaiAtIDE2KjJdXG4gICAgICAgIHZhciBXaTE2bCA9IFdbaiAtIDE2KjIgKyAxXVxuXG4gICAgICAgIFdpbCA9IGdhbW1hMGwgKyBXaTdsXG4gICAgICAgIFdpICA9IGdhbW1hMCAgKyBXaTcgKyAoKFdpbCA+Pj4gMCkgPCAoZ2FtbWEwbCA+Pj4gMCkgPyAxIDogMClcbiAgICAgICAgV2lsID0gV2lsICsgZ2FtbWExbFxuICAgICAgICBXaSAgPSBXaSAgKyBnYW1tYTEgICsgKChXaWwgPj4+IDApIDwgKGdhbW1hMWwgPj4+IDApID8gMSA6IDApXG4gICAgICAgIFdpbCA9IFdpbCArIFdpMTZsXG4gICAgICAgIFdpICA9IFdpICArIFdpMTYgKyAoKFdpbCA+Pj4gMCkgPCAoV2kxNmwgPj4+IDApID8gMSA6IDApXG5cbiAgICAgICAgV1tqXSA9IFdpXG4gICAgICAgIFdbaiArIDFdID0gV2lsXG4gICAgICB9XG5cbiAgICAgIHZhciBtYWogPSBNYWooYSwgYiwgYylcbiAgICAgIHZhciBtYWpsID0gTWFqKGFsLCBibCwgY2wpXG5cbiAgICAgIHZhciBzaWdtYTBoID0gUyhhLCBhbCwgMjgpIF4gUyhhbCwgYSwgMikgXiBTKGFsLCBhLCA3KVxuICAgICAgdmFyIHNpZ21hMGwgPSBTKGFsLCBhLCAyOCkgXiBTKGEsIGFsLCAyKSBeIFMoYSwgYWwsIDcpXG4gICAgICB2YXIgc2lnbWExaCA9IFMoZSwgZWwsIDE0KSBeIFMoZSwgZWwsIDE4KSBeIFMoZWwsIGUsIDkpXG4gICAgICB2YXIgc2lnbWExbCA9IFMoZWwsIGUsIDE0KSBeIFMoZWwsIGUsIDE4KSBeIFMoZSwgZWwsIDkpXG5cbiAgICAgIC8vIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV1cbiAgICAgIHZhciBLaSA9IEtbal1cbiAgICAgIHZhciBLaWwgPSBLW2ogKyAxXVxuXG4gICAgICB2YXIgY2ggPSBDaChlLCBmLCBnKVxuICAgICAgdmFyIGNobCA9IENoKGVsLCBmbCwgZ2wpXG5cbiAgICAgIHZhciB0MWwgPSBobCArIHNpZ21hMWxcbiAgICAgIHZhciB0MSA9IGggKyBzaWdtYTFoICsgKCh0MWwgPj4+IDApIDwgKGhsID4+PiAwKSA/IDEgOiAwKVxuICAgICAgdDFsID0gdDFsICsgY2hsXG4gICAgICB0MSA9IHQxICsgY2ggKyAoKHQxbCA+Pj4gMCkgPCAoY2hsID4+PiAwKSA/IDEgOiAwKVxuICAgICAgdDFsID0gdDFsICsgS2lsXG4gICAgICB0MSA9IHQxICsgS2kgKyAoKHQxbCA+Pj4gMCkgPCAoS2lsID4+PiAwKSA/IDEgOiAwKVxuICAgICAgdDFsID0gdDFsICsgV2lsXG4gICAgICB0MSA9IHQxICsgV2kgKyAoKHQxbCA+Pj4gMCkgPCAoV2lsID4+PiAwKSA/IDEgOiAwKVxuXG4gICAgICAvLyB0MiA9IHNpZ21hMCArIG1halxuICAgICAgdmFyIHQybCA9IHNpZ21hMGwgKyBtYWpsXG4gICAgICB2YXIgdDIgPSBzaWdtYTBoICsgbWFqICsgKCh0MmwgPj4+IDApIDwgKHNpZ21hMGwgPj4+IDApID8gMSA6IDApXG5cbiAgICAgIGggID0gZ1xuICAgICAgaGwgPSBnbFxuICAgICAgZyAgPSBmXG4gICAgICBnbCA9IGZsXG4gICAgICBmICA9IGVcbiAgICAgIGZsID0gZWxcbiAgICAgIGVsID0gKGRsICsgdDFsKSB8IDBcbiAgICAgIGUgID0gKGQgKyB0MSArICgoZWwgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgICBkICA9IGNcbiAgICAgIGRsID0gY2xcbiAgICAgIGMgID0gYlxuICAgICAgY2wgPSBibFxuICAgICAgYiAgPSBhXG4gICAgICBibCA9IGFsXG4gICAgICBhbCA9ICh0MWwgKyB0MmwpIHwgMFxuICAgICAgYSAgPSAodDEgKyB0MiArICgoYWwgPj4+IDApIDwgKHQxbCA+Pj4gMCkgPyAxIDogMCkpIHwgMFxuICAgIH1cblxuICAgIHRoaXMuX2FsID0gKHRoaXMuX2FsICsgYWwpIHwgMFxuICAgIHRoaXMuX2JsID0gKHRoaXMuX2JsICsgYmwpIHwgMFxuICAgIHRoaXMuX2NsID0gKHRoaXMuX2NsICsgY2wpIHwgMFxuICAgIHRoaXMuX2RsID0gKHRoaXMuX2RsICsgZGwpIHwgMFxuICAgIHRoaXMuX2VsID0gKHRoaXMuX2VsICsgZWwpIHwgMFxuICAgIHRoaXMuX2ZsID0gKHRoaXMuX2ZsICsgZmwpIHwgMFxuICAgIHRoaXMuX2dsID0gKHRoaXMuX2dsICsgZ2wpIHwgMFxuICAgIHRoaXMuX2hsID0gKHRoaXMuX2hsICsgaGwpIHwgMFxuXG4gICAgdGhpcy5fYSA9ICh0aGlzLl9hICsgYSArICgodGhpcy5fYWwgPj4+IDApIDwgKGFsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgdGhpcy5fYiA9ICh0aGlzLl9iICsgYiArICgodGhpcy5fYmwgPj4+IDApIDwgKGJsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgdGhpcy5fYyA9ICh0aGlzLl9jICsgYyArICgodGhpcy5fY2wgPj4+IDApIDwgKGNsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgdGhpcy5fZCA9ICh0aGlzLl9kICsgZCArICgodGhpcy5fZGwgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgdGhpcy5fZSA9ICh0aGlzLl9lICsgZSArICgodGhpcy5fZWwgPj4+IDApIDwgKGVsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgdGhpcy5fZiA9ICh0aGlzLl9mICsgZiArICgodGhpcy5fZmwgPj4+IDApIDwgKGZsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgdGhpcy5fZyA9ICh0aGlzLl9nICsgZyArICgodGhpcy5fZ2wgPj4+IDApIDwgKGdsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gICAgdGhpcy5faCA9ICh0aGlzLl9oICsgaCArICgodGhpcy5faGwgPj4+IDApIDwgKGhsID4+PiAwKSA/IDEgOiAwKSkgfCAwXG4gIH1cblxuICBTaGE1MTIucHJvdG90eXBlLl9oYXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBIID0gbmV3IEJ1ZmZlcig2NClcblxuICAgIGZ1bmN0aW9uIHdyaXRlSW50NjRCRShoLCBsLCBvZmZzZXQpIHtcbiAgICAgIEgud3JpdGVJbnQzMkJFKGgsIG9mZnNldClcbiAgICAgIEgud3JpdGVJbnQzMkJFKGwsIG9mZnNldCArIDQpXG4gICAgfVxuXG4gICAgd3JpdGVJbnQ2NEJFKHRoaXMuX2EsIHRoaXMuX2FsLCAwKVxuICAgIHdyaXRlSW50NjRCRSh0aGlzLl9iLCB0aGlzLl9ibCwgOClcbiAgICB3cml0ZUludDY0QkUodGhpcy5fYywgdGhpcy5fY2wsIDE2KVxuICAgIHdyaXRlSW50NjRCRSh0aGlzLl9kLCB0aGlzLl9kbCwgMjQpXG4gICAgd3JpdGVJbnQ2NEJFKHRoaXMuX2UsIHRoaXMuX2VsLCAzMilcbiAgICB3cml0ZUludDY0QkUodGhpcy5fZiwgdGhpcy5fZmwsIDQwKVxuICAgIHdyaXRlSW50NjRCRSh0aGlzLl9nLCB0aGlzLl9nbCwgNDgpXG4gICAgd3JpdGVJbnQ2NEJFKHRoaXMuX2gsIHRoaXMuX2hsLCA1NilcblxuICAgIHJldHVybiBIXG4gIH1cblxuICByZXR1cm4gU2hhNTEyXG5cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9+L3NoYS5qcy9zaGE1MTIuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMSBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDIuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuLypcbiAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29yZV9tZDUoeCwgbGVuKVxue1xuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8ICgobGVuKSAlIDMyKTtcbiAgeFsoKChsZW4gKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbGVuO1xuXG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xuXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcbiAge1xuICAgIHZhciBvbGRhID0gYTtcbiAgICB2YXIgb2xkYiA9IGI7XG4gICAgdmFyIG9sZGMgPSBjO1xuICAgIHZhciBvbGRkID0gZDtcblxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyAwXSwgNyAsIC02ODA4NzY5MzYpO1xuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsgNF0sIDcgLCAtMTc2NDE4ODk3KTtcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDhdLCA3ICwgIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsxMF0sIDE3LCAtNDIwNjMpO1xuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDcgLCAgMTgwNDYwMzY4Mik7XG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xuXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDFdLCA1ICwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDZdLCA5ICwgLTEwNjk1MDE2MzIpO1xuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKzExXSwgMTQsICA2NDM3MTc3MTMpO1xuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyAwXSwgMjAsIC0zNzM4OTczMDIpO1xuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA1XSwgNSAsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpKzEwXSwgOSAsICAzODAxNjA4Myk7XG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDldLCA1ICwgIDU2ODQ0NjQzOCk7XG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTRdLCA5ICwgLTEwMTk4MDM2OTApO1xuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyA4XSwgMjAsICAxMTYzNTMxNTAxKTtcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsxM10sIDUgLCAtMTQ0NDY4MTQ2Nyk7XG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDJdLCA5ICwgLTUxNDAzNzg0KTtcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsgN10sIDE0LCAgMTczNTMyODQ3Myk7XG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krIDVdLCA0ICwgLTM3ODU1OCk7XG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcbiAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSsxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyAxXSwgNCAsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKzEzXSwgNCAsICA2ODEyNzkxNzQpO1xuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krIDldLCA0ICwgLTY0MDM2NDQ4Nyk7XG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krIDJdLCAyMywgLTk5NTMzODY1MSk7XG5cbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgMF0sIDYgLCAtMTk4NjMwODQ0KTtcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsgN10sIDEwLCAgMTEyNjg5MTQxNSk7XG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krMTJdLCA2ICwgIDE3MDA0ODU1NzEpO1xuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyA4XSwgNiAsICAxODczMzEzMzU5KTtcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krIDRdLCA2ICwgLTE0NTUyMzA3MCk7XG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICB9XG4gIHJldHVybiBBcnJheShhLCBiLCBjLCBkKTtcblxufVxuXG4vKlxuICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAqL1xuZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KVxue1xuICByZXR1cm4gc2FmZV9hZGQoYml0X3JvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSxiKTtcbn1cbmZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KVxue1xuICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XG59XG5mdW5jdGlvbiBtZDVfZ2coYSwgYiwgYywgZCwgeCwgcywgdClcbntcbiAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xufVxuZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpXG57XG4gIHJldHVybiBtZDVfY21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5mdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdClcbntcbiAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xufVxuXG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcbntcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn1cblxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuZnVuY3Rpb24gYml0X3JvbChudW0sIGNudClcbntcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1kNShidWYpIHtcbiAgcmV0dXJuIGhlbHBlcnMuaGFzaChidWYsIGNvcmVfbWQ1LCAxNik7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L21kNS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaW50U2l6ZSA9IDQ7XG52YXIgemVyb0J1ZmZlciA9IG5ldyBCdWZmZXIoaW50U2l6ZSk7IHplcm9CdWZmZXIuZmlsbCgwKTtcbnZhciBjaHJzeiA9IDg7XG5cbmZ1bmN0aW9uIHRvQXJyYXkoYnVmLCBiaWdFbmRpYW4pIHtcbiAgaWYgKChidWYubGVuZ3RoICUgaW50U2l6ZSkgIT09IDApIHtcbiAgICB2YXIgbGVuID0gYnVmLmxlbmd0aCArIChpbnRTaXplIC0gKGJ1Zi5sZW5ndGggJSBpbnRTaXplKSk7XG4gICAgYnVmID0gQnVmZmVyLmNvbmNhdChbYnVmLCB6ZXJvQnVmZmVyXSwgbGVuKTtcbiAgfVxuXG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGZuID0gYmlnRW5kaWFuID8gYnVmLnJlYWRJbnQzMkJFIDogYnVmLnJlYWRJbnQzMkxFO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkgKz0gaW50U2l6ZSkge1xuICAgIGFyci5wdXNoKGZuLmNhbGwoYnVmLCBpKSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gdG9CdWZmZXIoYXJyLCBzaXplLCBiaWdFbmRpYW4pIHtcbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIoc2l6ZSk7XG4gIHZhciBmbiA9IGJpZ0VuZGlhbiA/IGJ1Zi53cml0ZUludDMyQkUgOiBidWYud3JpdGVJbnQzMkxFO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGZuLmNhbGwoYnVmLCBhcnJbaV0sIGkgKiA0LCB0cnVlKTtcbiAgfVxuICByZXR1cm4gYnVmO1xufVxuXG5mdW5jdGlvbiBoYXNoKGJ1ZiwgZm4sIGhhc2hTaXplLCBiaWdFbmRpYW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgYnVmID0gbmV3IEJ1ZmZlcihidWYpO1xuICB2YXIgYXJyID0gZm4odG9BcnJheShidWYsIGJpZ0VuZGlhbiksIGJ1Zi5sZW5ndGggKiBjaHJzeik7XG4gIHJldHVybiB0b0J1ZmZlcihhcnIsIGhhc2hTaXplLCBiaWdFbmRpYW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaGFzaDogaGFzaCB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L2NyeXB0by1icm93c2VyaWZ5L2hlbHBlcnMuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJpcGVtZDE2MFxuXG5cblxuLypcbkNyeXB0b0pTIHYzLjEuMlxuY29kZS5nb29nbGUuY29tL3AvY3J5cHRvLWpzXG4oYykgMjAwOS0yMDEzIGJ5IEplZmYgTW90dC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbmNvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qcy93aWtpL0xpY2Vuc2VcbiovXG4vKiogQHByZXNlcnZlXG4oYykgMjAxMiBieSBDw6lkcmljIE1lc25pbC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICAgLSBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICAgLSBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiovXG5cbi8vIENvbnN0YW50cyB0YWJsZVxudmFyIHpsID0gW1xuICAgIDAsICAxLCAgMiwgIDMsICA0LCAgNSwgIDYsICA3LCAgOCwgIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXG4gICAgNywgIDQsIDEzLCAgMSwgMTAsICA2LCAxNSwgIDMsIDEyLCAgMCwgIDksICA1LCAgMiwgMTQsIDExLCAgOCxcbiAgICAzLCAxMCwgMTQsICA0LCAgOSwgMTUsICA4LCAgMSwgIDIsICA3LCAgMCwgIDYsIDEzLCAxMSwgIDUsIDEyLFxuICAgIDEsICA5LCAxMSwgMTAsICAwLCAgOCwgMTIsICA0LCAxMywgIDMsICA3LCAxNSwgMTQsICA1LCAgNiwgIDIsXG4gICAgNCwgIDAsICA1LCAgOSwgIDcsIDEyLCAgMiwgMTAsIDE0LCAgMSwgIDMsICA4LCAxMSwgIDYsIDE1LCAxM107XG52YXIgenIgPSBbXG4gICAgNSwgMTQsICA3LCAgMCwgIDksICAyLCAxMSwgIDQsIDEzLCAgNiwgMTUsICA4LCAgMSwgMTAsICAzLCAxMixcbiAgICA2LCAxMSwgIDMsICA3LCAgMCwgMTMsICA1LCAxMCwgMTQsIDE1LCAgOCwgMTIsICA0LCAgOSwgIDEsICAyLFxuICAgIDE1LCAgNSwgIDEsICAzLCAgNywgMTQsICA2LCAgOSwgMTEsICA4LCAxMiwgIDIsIDEwLCAgMCwgIDQsIDEzLFxuICAgIDgsICA2LCAgNCwgIDEsICAzLCAxMSwgMTUsICAwLCAgNSwgMTIsICAyLCAxMywgIDksICA3LCAxMCwgMTQsXG4gICAgMTIsIDE1LCAxMCwgIDQsICAxLCAgNSwgIDgsICA3LCAgNiwgIDIsIDEzLCAxNCwgIDAsICAzLCAgOSwgMTFdO1xudmFyIHNsID0gW1xuICAgICAxMSwgMTQsIDE1LCAxMiwgIDUsICA4LCAgNywgIDksIDExLCAxMywgMTQsIDE1LCAgNiwgIDcsICA5LCAgOCxcbiAgICA3LCA2LCAgIDgsIDEzLCAxMSwgIDksICA3LCAxNSwgIDcsIDEyLCAxNSwgIDksIDExLCAgNywgMTMsIDEyLFxuICAgIDExLCAxMywgIDYsICA3LCAxNCwgIDksIDEzLCAxNSwgMTQsICA4LCAxMywgIDYsICA1LCAxMiwgIDcsICA1LFxuICAgICAgMTEsIDEyLCAxNCwgMTUsIDE0LCAxNSwgIDksICA4LCAgOSwgMTQsICA1LCAgNiwgIDgsICA2LCAgNSwgMTIsXG4gICAgOSwgMTUsICA1LCAxMSwgIDYsICA4LCAxMywgMTIsICA1LCAxMiwgMTMsIDE0LCAxMSwgIDgsICA1LCAgNiBdO1xudmFyIHNyID0gW1xuICAgIDgsICA5LCAgOSwgMTEsIDEzLCAxNSwgMTUsICA1LCAgNywgIDcsICA4LCAxMSwgMTQsIDE0LCAxMiwgIDYsXG4gICAgOSwgMTMsIDE1LCAgNywgMTIsICA4LCAgOSwgMTEsICA3LCAgNywgMTIsICA3LCAgNiwgMTUsIDEzLCAxMSxcbiAgICA5LCAgNywgMTUsIDExLCAgOCwgIDYsICA2LCAxNCwgMTIsIDEzLCAgNSwgMTQsIDEzLCAxMywgIDcsICA1LFxuICAgIDE1LCAgNSwgIDgsIDExLCAxNCwgMTQsICA2LCAxNCwgIDYsICA5LCAxMiwgIDksIDEyLCAgNSwgMTUsICA4LFxuICAgIDgsICA1LCAxMiwgIDksIDEyLCAgNSwgMTQsICA2LCAgOCwgMTMsICA2LCAgNSwgMTUsIDEzLCAxMSwgMTEgXTtcblxudmFyIGhsID0gIFsgMHgwMDAwMDAwMCwgMHg1QTgyNzk5OSwgMHg2RUQ5RUJBMSwgMHg4RjFCQkNEQywgMHhBOTUzRkQ0RV07XG52YXIgaHIgPSAgWyAweDUwQTI4QkU2LCAweDVDNEREMTI0LCAweDZENzAzRUYzLCAweDdBNkQ3NkU5LCAweDAwMDAwMDAwXTtcblxudmFyIGJ5dGVzVG9Xb3JkcyA9IGZ1bmN0aW9uIChieXRlcykge1xuICB2YXIgd29yZHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGIgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyssIGIgKz0gOCkge1xuICAgIHdvcmRzW2IgPj4+IDVdIHw9IGJ5dGVzW2ldIDw8ICgyNCAtIGIgJSAzMik7XG4gIH1cbiAgcmV0dXJuIHdvcmRzO1xufTtcblxudmFyIHdvcmRzVG9CeXRlcyA9IGZ1bmN0aW9uICh3b3Jkcykge1xuICB2YXIgYnl0ZXMgPSBbXTtcbiAgZm9yICh2YXIgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KSB7XG4gICAgYnl0ZXMucHVzaCgod29yZHNbYiA+Pj4gNV0gPj4+ICgyNCAtIGIgJSAzMikpICYgMHhGRik7XG4gIH1cbiAgcmV0dXJuIGJ5dGVzO1xufTtcblxudmFyIHByb2Nlc3NCbG9jayA9IGZ1bmN0aW9uIChILCBNLCBvZmZzZXQpIHtcblxuICAvLyBTd2FwIGVuZGlhblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICB2YXIgb2Zmc2V0X2kgPSBvZmZzZXQgKyBpO1xuICAgIHZhciBNX29mZnNldF9pID0gTVtvZmZzZXRfaV07XG5cbiAgICAvLyBTd2FwXG4gICAgTVtvZmZzZXRfaV0gPSAoXG4gICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgOCkgIHwgKE1fb2Zmc2V0X2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG4gICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgMjQpIHwgKE1fb2Zmc2V0X2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuICAgICk7XG4gIH1cblxuICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuICB2YXIgYWwsIGJsLCBjbCwgZGwsIGVsO1xuICB2YXIgYXIsIGJyLCBjciwgZHIsIGVyO1xuXG4gIGFyID0gYWwgPSBIWzBdO1xuICBiciA9IGJsID0gSFsxXTtcbiAgY3IgPSBjbCA9IEhbMl07XG4gIGRyID0gZGwgPSBIWzNdO1xuICBlciA9IGVsID0gSFs0XTtcbiAgLy8gQ29tcHV0YXRpb25cbiAgdmFyIHQ7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkgKz0gMSkge1xuICAgIHQgPSAoYWwgKyAgTVtvZmZzZXQremxbaV1dKXwwO1xuICAgIGlmIChpPDE2KXtcbiAgICAgICAgdCArPSAgZjEoYmwsY2wsZGwpICsgaGxbMF07XG4gICAgfSBlbHNlIGlmIChpPDMyKSB7XG4gICAgICAgIHQgKz0gIGYyKGJsLGNsLGRsKSArIGhsWzFdO1xuICAgIH0gZWxzZSBpZiAoaTw0OCkge1xuICAgICAgICB0ICs9ICBmMyhibCxjbCxkbCkgKyBobFsyXTtcbiAgICB9IGVsc2UgaWYgKGk8NjQpIHtcbiAgICAgICAgdCArPSAgZjQoYmwsY2wsZGwpICsgaGxbM107XG4gICAgfSBlbHNlIHsvLyBpZiAoaTw4MCkge1xuICAgICAgICB0ICs9ICBmNShibCxjbCxkbCkgKyBobFs0XTtcbiAgICB9XG4gICAgdCA9IHR8MDtcbiAgICB0ID0gIHJvdGwodCxzbFtpXSk7XG4gICAgdCA9ICh0K2VsKXwwO1xuICAgIGFsID0gZWw7XG4gICAgZWwgPSBkbDtcbiAgICBkbCA9IHJvdGwoY2wsIDEwKTtcbiAgICBjbCA9IGJsO1xuICAgIGJsID0gdDtcblxuICAgIHQgPSAoYXIgKyBNW29mZnNldCt6cltpXV0pfDA7XG4gICAgaWYgKGk8MTYpe1xuICAgICAgICB0ICs9ICBmNShicixjcixkcikgKyBoclswXTtcbiAgICB9IGVsc2UgaWYgKGk8MzIpIHtcbiAgICAgICAgdCArPSAgZjQoYnIsY3IsZHIpICsgaHJbMV07XG4gICAgfSBlbHNlIGlmIChpPDQ4KSB7XG4gICAgICAgIHQgKz0gIGYzKGJyLGNyLGRyKSArIGhyWzJdO1xuICAgIH0gZWxzZSBpZiAoaTw2NCkge1xuICAgICAgICB0ICs9ICBmMihicixjcixkcikgKyBoclszXTtcbiAgICB9IGVsc2Ugey8vIGlmIChpPDgwKSB7XG4gICAgICAgIHQgKz0gIGYxKGJyLGNyLGRyKSArIGhyWzRdO1xuICAgIH1cbiAgICB0ID0gdHwwO1xuICAgIHQgPSAgcm90bCh0LHNyW2ldKSA7XG4gICAgdCA9ICh0K2VyKXwwO1xuICAgIGFyID0gZXI7XG4gICAgZXIgPSBkcjtcbiAgICBkciA9IHJvdGwoY3IsIDEwKTtcbiAgICBjciA9IGJyO1xuICAgIGJyID0gdDtcbiAgfVxuICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuICB0ICAgID0gKEhbMV0gKyBjbCArIGRyKXwwO1xuICBIWzFdID0gKEhbMl0gKyBkbCArIGVyKXwwO1xuICBIWzJdID0gKEhbM10gKyBlbCArIGFyKXwwO1xuICBIWzNdID0gKEhbNF0gKyBhbCArIGJyKXwwO1xuICBIWzRdID0gKEhbMF0gKyBibCArIGNyKXwwO1xuICBIWzBdID0gIHQ7XG59O1xuXG5mdW5jdGlvbiBmMSh4LCB5LCB6KSB7XG4gIHJldHVybiAoKHgpIF4gKHkpIF4gKHopKTtcbn1cblxuZnVuY3Rpb24gZjIoeCwgeSwgeikge1xuICByZXR1cm4gKCgoeCkmKHkpKSB8ICgofngpJih6KSkpO1xufVxuXG5mdW5jdGlvbiBmMyh4LCB5LCB6KSB7XG4gIHJldHVybiAoKCh4KSB8ICh+KHkpKSkgXiAoeikpO1xufVxuXG5mdW5jdGlvbiBmNCh4LCB5LCB6KSB7XG4gIHJldHVybiAoKCh4KSAmICh6KSkgfCAoKHkpJih+KHopKSkpO1xufVxuXG5mdW5jdGlvbiBmNSh4LCB5LCB6KSB7XG4gIHJldHVybiAoKHgpIF4gKCh5KSB8KH4oeikpKSk7XG59XG5cbmZ1bmN0aW9uIHJvdGwoeCxuKSB7XG4gIHJldHVybiAoeDw8bikgfCAoeD4+PigzMi1uKSk7XG59XG5cbmZ1bmN0aW9uIHJpcGVtZDE2MChtZXNzYWdlKSB7XG4gIHZhciBIID0gWzB4Njc0NTIzMDEsIDB4RUZDREFCODksIDB4OThCQURDRkUsIDB4MTAzMjU0NzYsIDB4QzNEMkUxRjBdO1xuXG4gIGlmICh0eXBlb2YgbWVzc2FnZSA9PSAnc3RyaW5nJylcbiAgICBtZXNzYWdlID0gbmV3IEJ1ZmZlcihtZXNzYWdlLCAndXRmOCcpO1xuXG4gIHZhciBtID0gYnl0ZXNUb1dvcmRzKG1lc3NhZ2UpO1xuXG4gIHZhciBuQml0c0xlZnQgPSBtZXNzYWdlLmxlbmd0aCAqIDg7XG4gIHZhciBuQml0c1RvdGFsID0gbWVzc2FnZS5sZW5ndGggKiA4O1xuXG4gIC8vIEFkZCBwYWRkaW5nXG4gIG1bbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcbiAgbVsoKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gKFxuICAgICAgKCgobkJpdHNUb3RhbCA8PCA4KSAgfCAobkJpdHNUb3RhbCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcbiAgICAgICgoKG5CaXRzVG90YWwgPDwgMjQpIHwgKG5CaXRzVG90YWwgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuICApO1xuXG4gIGZvciAodmFyIGk9MCA7IGk8bS5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBwcm9jZXNzQmxvY2soSCwgbSwgaSk7XG4gIH1cblxuICAvLyBTd2FwIGVuZGlhblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgLy8gU2hvcnRjdXRcbiAgICB2YXIgSF9pID0gSFtpXTtcblxuICAgIC8vIFN3YXBcbiAgICBIW2ldID0gKCgoSF9pIDw8IDgpICB8IChIX2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG4gICAgICAgICAgKCgoSF9pIDw8IDI0KSB8IChIX2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcbiAgfVxuXG4gIHZhciBkaWdlc3RieXRlcyA9IHdvcmRzVG9CeXRlcyhIKTtcbiAgcmV0dXJuIG5ldyBCdWZmZXIoZGlnZXN0Ynl0ZXMpO1xufVxuXG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9+L3JpcGVtZDE2MC9saWIvcmlwZW1kMTYwLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjcmVhdGVIYXNoID0gcmVxdWlyZSgnLi9jcmVhdGUtaGFzaCcpXG5cbnZhciB6ZXJvQnVmZmVyID0gbmV3IEJ1ZmZlcigxMjgpXG56ZXJvQnVmZmVyLmZpbGwoMClcblxubW9kdWxlLmV4cG9ydHMgPSBIbWFjXG5cbmZ1bmN0aW9uIEhtYWMgKGFsZywga2V5KSB7XG4gIGlmKCEodGhpcyBpbnN0YW5jZW9mIEhtYWMpKSByZXR1cm4gbmV3IEhtYWMoYWxnLCBrZXkpXG4gIHRoaXMuX29wYWQgPSBvcGFkXG4gIHRoaXMuX2FsZyA9IGFsZ1xuXG4gIHZhciBibG9ja3NpemUgPSAoYWxnID09PSAnc2hhNTEyJykgPyAxMjggOiA2NFxuXG4gIGtleSA9IHRoaXMuX2tleSA9ICFCdWZmZXIuaXNCdWZmZXIoa2V5KSA/IG5ldyBCdWZmZXIoa2V5KSA6IGtleVxuXG4gIGlmKGtleS5sZW5ndGggPiBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBjcmVhdGVIYXNoKGFsZykudXBkYXRlKGtleSkuZGlnZXN0KClcbiAgfSBlbHNlIGlmKGtleS5sZW5ndGggPCBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBCdWZmZXIuY29uY2F0KFtrZXksIHplcm9CdWZmZXJdLCBibG9ja3NpemUpXG4gIH1cblxuICB2YXIgaXBhZCA9IHRoaXMuX2lwYWQgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSlcbiAgdmFyIG9wYWQgPSB0aGlzLl9vcGFkID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpXG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IGJsb2Nrc2l6ZTsgaSsrKSB7XG4gICAgaXBhZFtpXSA9IGtleVtpXSBeIDB4MzZcbiAgICBvcGFkW2ldID0ga2V5W2ldIF4gMHg1Q1xuICB9XG5cbiAgdGhpcy5faGFzaCA9IGNyZWF0ZUhhc2goYWxnKS51cGRhdGUoaXBhZClcbn1cblxuSG1hYy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEsIGVuYykge1xuICB0aGlzLl9oYXNoLnVwZGF0ZShkYXRhLCBlbmMpXG4gIHJldHVybiB0aGlzXG59XG5cbkhtYWMucHJvdG90eXBlLmRpZ2VzdCA9IGZ1bmN0aW9uIChlbmMpIHtcbiAgdmFyIGggPSB0aGlzLl9oYXNoLmRpZ2VzdCgpXG4gIHJldHVybiBjcmVhdGVIYXNoKHRoaXMuX2FsZykudXBkYXRlKHRoaXMuX29wYWQpLnVwZGF0ZShoKS5kaWdlc3QoZW5jKVxufVxuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vY3J5cHRvLWJyb3dzZXJpZnkvY3JlYXRlLWhtYWMuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHBia2RmMkV4cG9ydCA9IHJlcXVpcmUoJ3Bia2RmMi1jb21wYXQvcGJrZGYyJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3J5cHRvLCBleHBvcnRzKSB7XG4gIGV4cG9ydHMgPSBleHBvcnRzIHx8IHt9XG5cbiAgdmFyIGV4cG9ydGVkID0gcGJrZGYyRXhwb3J0KGNyeXB0bylcblxuICBleHBvcnRzLnBia2RmMiA9IGV4cG9ydGVkLnBia2RmMlxuICBleHBvcnRzLnBia2RmMlN5bmMgPSBleHBvcnRlZC5wYmtkZjJTeW5jXG5cbiAgcmV0dXJuIGV4cG9ydHNcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9wYmtkZjIuanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjcnlwdG8pIHtcbiAgZnVuY3Rpb24gcGJrZGYyKHBhc3N3b3JkLCBzYWx0LCBpdGVyYXRpb25zLCBrZXlsZW4sIGRpZ2VzdCwgY2FsbGJhY2spIHtcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRpZ2VzdCkge1xuICAgICAgY2FsbGJhY2sgPSBkaWdlc3RcbiAgICAgIGRpZ2VzdCA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2FsbGJhY2spXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNhbGxiYWNrIHByb3ZpZGVkIHRvIHBia2RmMicpXG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlc3VsdFxuXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBwYmtkZjJTeW5jKHBhc3N3b3JkLCBzYWx0LCBpdGVyYXRpb25zLCBrZXlsZW4sIGRpZ2VzdClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpXG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgcmVzdWx0KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBwYmtkZjJTeW5jKHBhc3N3b3JkLCBzYWx0LCBpdGVyYXRpb25zLCBrZXlsZW4sIGRpZ2VzdCkge1xuICAgIGlmICgnbnVtYmVyJyAhPT0gdHlwZW9mIGl0ZXJhdGlvbnMpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJdGVyYXRpb25zIG5vdCBhIG51bWJlcicpXG5cbiAgICBpZiAoaXRlcmF0aW9ucyA8IDApXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCYWQgaXRlcmF0aW9ucycpXG5cbiAgICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiBrZXlsZW4pXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdLZXkgbGVuZ3RoIG5vdCBhIG51bWJlcicpXG5cbiAgICBpZiAoa2V5bGVuIDwgMClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JhZCBrZXkgbGVuZ3RoJylcblxuICAgIGRpZ2VzdCA9IGRpZ2VzdCB8fCAnc2hhMSdcblxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHBhc3N3b3JkKSkgcGFzc3dvcmQgPSBuZXcgQnVmZmVyKHBhc3N3b3JkKVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHNhbHQpKSBzYWx0ID0gbmV3IEJ1ZmZlcihzYWx0KVxuXG4gICAgdmFyIGhMZW4sIGwgPSAxLCByLCBUXG4gICAgdmFyIERLID0gbmV3IEJ1ZmZlcihrZXlsZW4pXG4gICAgdmFyIGJsb2NrMSA9IG5ldyBCdWZmZXIoc2FsdC5sZW5ndGggKyA0KVxuICAgIHNhbHQuY29weShibG9jazEsIDAsIDAsIHNhbHQubGVuZ3RoKVxuXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbDsgaSsrKSB7XG4gICAgICBibG9jazEud3JpdGVVSW50MzJCRShpLCBzYWx0Lmxlbmd0aClcblxuICAgICAgdmFyIFUgPSBjcnlwdG8uY3JlYXRlSG1hYyhkaWdlc3QsIHBhc3N3b3JkKS51cGRhdGUoYmxvY2sxKS5kaWdlc3QoKVxuXG4gICAgICBpZiAoIWhMZW4pIHtcbiAgICAgICAgaExlbiA9IFUubGVuZ3RoXG4gICAgICAgIFQgPSBuZXcgQnVmZmVyKGhMZW4pXG4gICAgICAgIGwgPSBNYXRoLmNlaWwoa2V5bGVuIC8gaExlbilcbiAgICAgICAgciA9IGtleWxlbiAtIChsIC0gMSkgKiBoTGVuXG5cbiAgICAgICAgaWYgKGtleWxlbiA+IChNYXRoLnBvdygyLCAzMikgLSAxKSAqIGhMZW4pXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigna2V5bGVuIGV4Y2VlZHMgbWF4aW11bSBsZW5ndGgnKVxuICAgICAgfVxuXG4gICAgICBVLmNvcHkoVCwgMCwgMCwgaExlbilcblxuICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBpdGVyYXRpb25zOyBqKyspIHtcbiAgICAgICAgVSA9IGNyeXB0by5jcmVhdGVIbWFjKGRpZ2VzdCwgcGFzc3dvcmQpLnVwZGF0ZShVKS5kaWdlc3QoKVxuXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgaExlbjsgaysrKSB7XG4gICAgICAgICAgVFtrXSBePSBVW2tdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGRlc3RQb3MgPSAoaSAtIDEpICogaExlblxuICAgICAgdmFyIGxlbiA9IChpID09IGwgPyByIDogaExlbilcbiAgICAgIFQuY29weShESywgZGVzdFBvcywgMCwgbGVuKVxuICAgIH1cblxuICAgIHJldHVybiBES1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYmtkZjI6IHBia2RmMixcbiAgICBwYmtkZjJTeW5jOiBwYmtkZjJTeW5jXG4gIH1cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9jcnlwdG8tYnJvd3NlcmlmeS9+L3Bia2RmMi1jb21wYXQvcGJrZGYyLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=