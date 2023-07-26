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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nfunction init() {\r\n\tconst appElement = document.querySelector( '#app' );\r\n\t//appElement.classList.add( 'with-bg' );\r\n}\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _shopitems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shopitems */ \"./src/js/shopitems.js\");\n\r\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.init)();\r\n(0,_shopitems__WEBPACK_IMPORTED_MODULE_2__.loadItems)();\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

/***/ }),

/***/ "./src/js/shopitems.js":
/*!*****************************!*\
  !*** ./src/js/shopitems.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadItems: () => (/* binding */ loadItems)\n/* harmony export */ });\nconst sampleItem={\r\n    \"id\": 1,\r\n    \"title\": \"iPhone 9\",\r\n    \"description\": \"An apple mobile which is nothing like apple\",\r\n    \"price\": 549,\r\n    \"discountPercentage\": 12.96,\r\n    \"rating\": 4.69,\r\n    \"stock\": 94,\r\n    \"brand\": \"Apple\",\r\n    \"category\": \"smartphones\",\r\n    \"thumbnail\": \"https://i.dummyjson.com/data/products/1/thumbnail.jpg\",\r\n    \"images\": [\r\n        \"https://i.dummyjson.com/data/products/1/1.jpg\",\r\n        \"https://i.dummyjson.com/data/products/1/2.jpg\",\r\n        \"https://i.dummyjson.com/data/products/1/3.jpg\",\r\n        \"https://i.dummyjson.com/data/products/1/4.jpg\",\r\n        \"https://i.dummyjson.com/data/products/1/thumbnail.jpg\"\r\n    ]\r\n};\r\n\r\nfunction getHtmlNodeItem(jsonItem){\r\n    const itemNode=document.createElement('div');\r\n    itemNode.classList.add('item');\r\n    itemNode.innerHTML=`\r\n    <div class=\"item_thumbnail\">\r\n        <img src=\"${jsonItem.thumbnail}\" alt=\"${jsonItem.title}\">\r\n    </div>\r\n    <div class=\"item_title\">${jsonItem.title}</div>\r\n    <div class=\"item_price\">\r\n        <p class=\"item_price_original\">$${jsonItem.price}</p>\r\n    </div>\r\n    <p class=\"item_discount\">${jsonItem.discountPercentage}% off</p>\r\n    <p class=\"item_rating\">Rating: ${jsonItem.rating}</p>\r\n    `;\r\n    return itemNode;\r\n}\r\nfunction loadItems(){\r\n    const shopContainer=document.getElementsByClassName('shop-items')[0];\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n    shopContainer.appendChild(getHtmlNodeItem(sampleItem));\r\n}\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/shopitems.js?");

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