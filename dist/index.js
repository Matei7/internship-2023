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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nfunction init() {\r\n\tconst jsonCard = {\r\n\t\t\"id\": 1,\r\n\t\t\"title\": \"iPhone 9\",\r\n\t\t\"description\": \"An apple mobile which is nothing like apple\",\r\n\t\t\"price\": 549,\r\n\t\t\"discountPercentage\": 12.96,\r\n\t\t\"rating\": 4.69,\r\n\t\t\"stock\": 94,\r\n\t\t\"brand\": \"Apple\",\r\n\t\t\"category\": \"smartphones\",\r\n\t\t\"thumbnail\": \"https://i.dummyjson.com/data/products/1/thumbnail.jpg\",\r\n\t\t\"images\": [\r\n\t\t\t\"https://i.dummyjson.com/data/products/1/1.jpg\",\r\n\t\t\t\"https://i.dummyjson.com/data/products/1/2.jpg\",\r\n\t\t\t\"https://i.dummyjson.com/data/products/1/3.jpg\",\r\n\t\t\t\"https://i.dummyjson.com/data/products/1/4.jpg\",\r\n\t\t\t\"https://i.dummyjson.com/data/products/1/thumbnail.jpg\"\r\n\t\t]\r\n\t}\r\n\r\n\tconst card = `<div class='item-card'>` +\r\n\t\t`<img alt= \\\"\\\" src=\\\"${jsonCard[\"images\"][0]}\" class=\\\"item-image\\\">` +\r\n\t\t`<div class=\\\"item-information-wrapper\\\">` +\r\n\t\t`<div class=\"item-title-button-wrapper\">` +\r\n\t\t`<h2 class=\"price\">$${jsonCard[\"price\"]}</h2>` +\r\n\t\t`<button class=\"buy-btn\">Add to cart</button>` +\r\n\t\t`</div>` +\r\n\t\t`<p class=\\\"item-description\\\">${jsonCard[\"description\"]}</p>` +\r\n\t\t`</div>` +\r\n\t\t`</div>`\r\n\r\n\tlet cards = []\r\n\tfor (let i = 0; i < 4; i++)\r\n\t\tcards.push(card)\r\n\r\n\tlet items = document.getElementById('items');\r\n\tlet cardsGroup = cards.join(\"\\n\");\r\n\titems.innerHTML = cardsGroup;\r\n\r\n}\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.init)();\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

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