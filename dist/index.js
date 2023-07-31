/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://internship-2023/./node_modules/events/events.js?");

/***/ }),

/***/ "./src/sass/styles.scss":
/*!******************************!*\
  !*** ./src/sass/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://internship-2023/./src/sass/styles.scss?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart */ \"./src/js/cart.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cart__WEBPACK_IMPORTED_MODULE_1__]);\n_cart__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n// variable to keep track of the current number of products for pagination\r\nlet currentBatchOfProducts = 1\r\n\r\n// variable to keep track of filters\r\nlet checked = false\r\n\r\nasync function init() {\r\n\t// fetch products and generate cards\r\n\tawait generateCards(await fetchProducts())\r\n\r\n\t// add event listeners for every button\r\n\taddButtons()\r\n\r\n\t// add event listeners for every image\r\n\taddListenersForImg()\r\n\r\n\t// add event listeners for filters\r\n\tfilterButtons()\r\n\r\n\t// initialize cart functionality\r\n\tawait (0,_cart__WEBPACK_IMPORTED_MODULE_1__.initCart)()\r\n}\r\n\r\n// Generate pop up when clicking \"Add to cart button\"\r\nfunction popUp(event) {\r\n\tlet popUpElement = document.getElementById(\"popUp\")\r\n\r\n\t// set style for clicked button\r\n\tpopUpElement.classList.replace(\"popUpHidden\", \"popUpVisible\")\r\n\tlet btn = document.getElementById(`${event.target.id}`)\r\n\tbtn.classList.replace(\"buy-btn\", \"buy-btn-clicked\")\r\n\tbtn.innerText = \"Added to cart\"\r\n\r\n\t// wait and set it back to its initial state\r\n\tsetTimeout(() => {\r\n\t\tpopUpElement.classList.replace(\"popUpVisible\", \"popUpHidden\")\r\n\t\tbtn.classList.replace(\"buy-btn-clicked\", \"buy-btn\")\r\n\t\tbtn.innerText = \"Add to cart\"\r\n\t}, 5000)\r\n}\r\n\r\n// Add event listeners for buttons\r\nfunction addButtons() {\r\n\t// add to cart buttons\r\n\tfor (let btn of document.getElementsByClassName(\"buy-btn\"))\r\n\t\tbtn.addEventListener(\"click\", popUp)\r\n\r\n\t// show more button\r\n\tdocument.getElementById(\"btn-show-more\").addEventListener(\"click\", showMore)\r\n}\r\n\r\n// Add event listeners for filter\r\nfunction filterButtons() {\r\n\tfor (let checkBox of document.getElementsByClassName(\"filter-checkbox\")) {\r\n\t\t// add an event listener for each checkbox\r\n\t\tcheckBox.addEventListener(\"change\", checkBoxEvent)\r\n\t}\r\n}\r\n\r\nasync function checkBoxEvent() {\r\n\t// set the global variable \"checked\" accordingly\r\n\tlet currentChecked = false;\r\n\tfor (let checkBox of document.getElementsByClassName(\"filter-checkbox\")) {\r\n\t\tif (checkBox.checked) {\r\n\t\t\tcurrentChecked = true\r\n\t\t\tbreak\r\n\t\t}\r\n\t}\r\n\tchecked = currentChecked\r\n\r\n\t// restart from the first batch, but now with the correct filters\r\n\tcurrentBatchOfProducts = 1\r\n\tlet items = document.getElementById('items');\r\n\titems.innerHTML = \"\";\r\n\tawait generateCards(await fetchProducts())\r\n\taddListenersForImg()\r\n\taddButtons()\r\n\tawait (0,_cart__WEBPACK_IMPORTED_MODULE_1__.initCart)()\r\n}\r\n\r\nfunction filterProducts(products, filters) {\r\n\t// go through each filter and apply it\r\n\tlet resultProducts = new Set()\r\n\tfor (let filter of filters) {\r\n\t\tlet currentProducts = new Set(products.filter(product => product.category === filter))\r\n\t\tresultProducts = [...resultProducts, ...currentProducts]\r\n\t}\r\n\treturn Array.from(resultProducts)\r\n}\r\n\r\n// get all checked filters and return them in an array\r\nfunction getFilters() {\r\n\tlet filters = []\r\n\tfor (let checkBox of document.getElementsByClassName(\"filter-checkbox\")) {\r\n\t\tif (checkBox.checked)\r\n\t\t\tfilters.push(checkBox.id)\r\n\t}\r\n\treturn filters\r\n}\r\n\r\n// event for when a user presses show more button\r\nasync function showMore() {\r\n\t// increase batch of products variable and generate card for the next batch\r\n\tcurrentBatchOfProducts++\r\n\tawait generateCards(await fetchProducts())\r\n\t// reset listeners and reinitialize cart\r\n\taddListenersForImg()\r\n\taddButtons()\r\n\tawait (0,_cart__WEBPACK_IMPORTED_MODULE_1__.initCart)()\r\n}\r\n\r\n// Add event listeners for thumbnails\r\nfunction addListenersForImg() {\r\n\tfor (let img of document.getElementsByClassName(\"item-image\"))\r\n\t\timg.addEventListener(\"click\", () => {\r\n\t\t\tlocation.href = `product.html?id=${img.id}`\r\n\t\t})\r\n}\r\n\r\n// Generate and add cards to html\r\nasync function generateCards(products) {\r\n\tlet cards = []\r\n\r\n\t// when generating cards, we filter the products first if we have any filters selected\r\n\tlet filters = getFilters()\r\n\tlet filteredProducts = []\r\n\r\n\tif (filters.length > 0) {\r\n\t\t// search for products that belong to that filter\r\n\t\tfilteredProducts = filterProducts(products, filters)\r\n\r\n\t\t// go through batches of products until we find the first batch that belongs to requested category\r\n\t\twhile (filteredProducts.length === 0 && currentBatchOfProducts < 10) {\r\n\t\t\tfilteredProducts = filterProducts(products, filters)\r\n\t\t\tproducts = await fetchProducts()\r\n\t\t\tcurrentBatchOfProducts++\r\n\t\t}\r\n\t}\r\n\t// we don't have any filter\r\n\telse filteredProducts = products\r\n\r\n\t// go through all filtered products and generate cards\r\n\tfor (const product of filteredProducts) {\r\n\t\tlet price = `<h2 class=\"price\">$${product.price}</h2>`;\r\n\t\tif (product.discountPercentage > 0.0) {\r\n\t\t\tlet newPrice = Math.floor((100.0 - product.discountPercentage) * product.price / 100)\r\n\t\t\tprice = `<div class=\"price\"><del><span>$${product.price}</span></del><ins><span>${newPrice}</span></ins></div>`;\r\n\t\t}\r\n\r\n\t\tconst card =\r\n\t\t\t`<div class='item-card' id=\"card${product.id}\">` +\r\n\t\t\t`<img alt= \\\"\\\" id=\"${product.id}\" src=\\\"${product.thumbnail}\" class=\\\"item-image\\\">` +\r\n\t\t\t`<div class=\\\"item-information-wrapper\\\">` +\r\n\t\t\t`<div class=\"item-title-wrapper\">` +\r\n\t\t\t`<h2>${product.title}</h2>` +\r\n\t\t\t`<p><i class=\"fa fa-star\" aria-hidden=\"true\"></i><span> ${product.rating}</span></p>` +\r\n\t\t\t`</div>` +\r\n\t\t\t`<p class=\\\"item-description\\\">${product[\"description\"]}</p>` +\r\n\t\t\t`<div class=\"item-title-wrapper\">` +\r\n\t\t\tprice +\r\n\t\t\t`<button class=\"buy-btn\" id=\"btn-${product.id}\">Add to cart</button>` +\r\n\t\t\t`</div>` +\r\n\t\t\t`</div>` +\r\n\t\t\t`</div>`\r\n\r\n\t\tcards.push(card)\r\n\t}\r\n\r\n\t// add the cards in HTML\r\n\tlet items = document.getElementById('items');\r\n\titems.innerHTML += cards.join(\"\\n\");\r\n}\r\n\r\n// Fetch products from the API\r\nasync function fetchProducts() {\r\n\t// we first check if we already have stored the products in the local storage\r\n\tconst localProducts = localStorage.getItem(\"products\")\r\n\r\n\tif (localProducts !== null) {\r\n\t\t// products exist in the local storage, we need to check if the requested products exist\r\n\t\tlet products = JSON.parse(localProducts)\r\n\t\tif (products.length >= currentBatchOfProducts * 10) {\r\n\t\t\t// the requested products already exist\r\n\t\t\treturn products.slice(currentBatchOfProducts * 10 - 10, currentBatchOfProducts * 10)\r\n\t\t}\r\n\t\telse {\r\n\t\t\t// the requested products does not exist\r\n\t\t\tconst newProducts = await fetch(`https://dummyjson.com/products?limit=10&skip=${currentBatchOfProducts * 10}`)\r\n\t\t\t\t.then(res => {\r\n\t\t\t\t\treturn res.json()\r\n\t\t\t\t})\r\n\r\n\t\t\t// update local storage\r\n\t\t\tlocalStorage.setItem(\"products\", JSON.stringify([...products, ...newProducts.products]))\r\n\t\t\treturn newProducts.products\r\n\t\t}\r\n\t}\r\n\r\n\t// we do not have anything stored locally\r\n\tconst products = await fetch(`https://dummyjson.com/products?limit=10&skip=${currentBatchOfProducts*10}`)\r\n\t\t.then(res => {\r\n\t\t\treturn res.json()\r\n\t\t})\r\n\tlocalStorage.setItem(\"products\", JSON.stringify(products.products))\r\n\treturn products.products\r\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/cart.js":
/*!************************!*\
  !*** ./src/js/cart.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   getCart: () => (/* binding */ getCart),\n/* harmony export */   initCart: () => (/* binding */ initCart),\n/* harmony export */   removeFromCart: () => (/* binding */ removeFromCart)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst cartID = \"64c3b92532684\"\r\nlet modified = false;\r\nlet cart = await getCart();\r\n\r\n// returns a template for a newly added product\r\nfunction productTemplate(product) {\r\n    return {\r\n        userId: 1,\r\n        products: [\r\n            {\r\n                id: product.id,\r\n                quantity: 0\r\n            }]\r\n    }\r\n}\r\n\r\n// initializes the cart\r\nasync function initCart() {\r\n    displayProducts()\r\n    generateCartListener()\r\n    generateAddToCartListener()\r\n}\r\n\r\n// display cart container when clicking cart button\r\nfunction generateCartListener() {\r\n    // event listener for when the user holds the mouse on the cart icon\r\n    document.getElementById(\"cart-btn\").addEventListener(\"mouseover\", () => {\r\n        let cartHTML = document.getElementById(\"cart\")\r\n            cartHTML.classList.replace(\"cartHidden\", \"cartVisible\")\r\n    })\r\n\r\n    // event listener for when the user moves the mouse from the cart icon\r\n    document.getElementById(\"cart-btn\").addEventListener(\"mouseleave\", () => {\r\n        let cartHTML = document.getElementById(\"cart\")\r\n        cartHTML.classList.replace(\"cartVisible\", \"cartHidden\")\r\n    })\r\n\r\n    // event listener for when a user presses the image of a product\r\n    document.getElementById(\"cart-btn\").addEventListener(\"click\", () => {\r\n        location.href = `cart.html?id=\"\"`\r\n    })\r\n}\r\n\r\n// add another listener for each add to cart button to push products in an array\r\nfunction generateAddToCartListener() {\r\n    // go through each button and add listeners\r\n    for (let btn of document.getElementsByClassName(\"buy-btn\"))\r\n        btn.addEventListener(\"click\", async () => {\r\n            // fetch the wanted product and push it in the cart\r\n            let product = await fetchProduct(btn.id.split(\"-\")[1])\r\n            // add product to cart hashmap\r\n            if (cart[\"products\"][product.id] !== undefined) {\r\n                cart[\"products\"][product.id].quantity++\r\n            }\r\n            else cart[product.id] = productTemplate(product)\r\n\r\n            await addToCart(product.id)\r\n\r\n            cart = await getCart(true)\r\n            displayProducts()\r\n        })\r\n}\r\n\r\n// generate html code for current products in cart and display them\r\nfunction displayProducts() {\r\n    // set the correct number of products\r\n    document.getElementById(\"cart-nr\").innerText = String(cart.totalProducts)\r\n\r\n    // set the correct products and calculate total price\r\n    let totalPrice = cart.total\r\n    let newCartHtml = ``;\r\n    for (let id in cart[\"products\"]) {\r\n        newCartHtml += `\r\n            <div class=\"cart-product\">\r\n                <div class=\"cart-product-info\">\r\n                    <img src=\"${cart[\"products\"][id].thumbnail}\" class=\"cart-product-img\">\r\n                    &nbsp<p>${cart[\"products\"][id].title}</p>\r\n                </div>\r\n                <p>x${cart[\"products\"][id].quantity}<br><small>$${cart[\"products\"][id].price}</small></p>\r\n            </div>`\r\n        totalPrice = cart.total\r\n    }\r\n    document.getElementById(\"cart\").innerHTML = newCartHtml\r\n    document.getElementById(\"cart\").innerHTML +=\r\n        `<p>Total Price: $${totalPrice}</p>`\r\n}\r\n\r\n// fetch certain product to place in cart\r\nasync function fetchProduct(id) {\r\n    return fetch(`https://dummyjson.com/products/${id}`)\r\n        .then(res => res.json())\r\n}\r\n\r\n// GETTERS/SETTER FOR CART\r\n\r\nasync function addToCart(productID, quantity= 1) {\r\n    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`, {\r\n        method: 'POST',\r\n        headers: { 'Content-Type': 'application/json' },\r\n        body: JSON.stringify({\r\n            userId: 1,\r\n            products: [\r\n                {\r\n                    id: productID,\r\n                    quantity\r\n                }]\r\n        })\r\n    }).then(res => res.json())\r\n    modified = true\r\n}\r\n\r\nasync function removeFromCart(productID, totalQuantity, quantity = 1) {\r\n    if (totalQuantity - quantity > 0)\r\n        await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`, {\r\n            method: 'POST',\r\n            headers: { 'Content-Type': 'application/json' },\r\n            body: JSON.stringify({\r\n                userId: 1,\r\n                products: [\r\n                    {\r\n                        id: productID,\r\n                        quantity: quantity * (-1)\r\n                    }]\r\n            })\r\n        }).then(res => res.json())\r\n    else await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}?products[]=${productID}`, {\r\n        method: 'DELETE'\r\n        }).then(res => res.json())\r\n    modified = true\r\n}\r\n\r\n// function for getting user's cart\r\nasync function getCart(modified = false) {\r\n    // we first check if we have the cart in local storage\r\n    const localCart = localStorage.getItem(\"cart\")\r\n    if (localCart !== null && !modified) {\r\n        return JSON.parse(localCart)\r\n    }\r\n\r\n    // otherwise, we fetch the cart and add it to the local storage\r\n    const newCart = await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`)\r\n        .then((res) => res.json())\r\n    localStorage.setItem(\"cart\", JSON.stringify(newCart))\r\n    return newCart\r\n}\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/cart.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_app__WEBPACK_IMPORTED_MODULE_1__]);\n_app__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.init)();\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;