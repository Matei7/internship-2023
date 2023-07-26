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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nasync function init() {\r\n\tconst appElement = document.querySelector( '#app' );\r\n\t//appElement.classList.add( 'with-bg' );\r\n}\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/cart_script.js":
/*!*******************************!*\
  !*** ./src/js/cart_script.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart)\n/* harmony export */ });\n// TODO: Add to cart logic\r\nfunction updateCartCount(){\r\n    const cartCount=document.getElementById('cart-count');\r\n    const count=parseInt(cartCount.innerText);\r\n    cartCount.innerText=String(count+1);\r\n}\r\nfunction addToCart(productId){\r\n    updateCartCount();\r\n\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/cart_script.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _load_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./load_script */ \"./src/js/load_script.js\");\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.init)();\r\n(0,_load_script__WEBPACK_IMPORTED_MODULE_2__.loadItems)();\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

/***/ }),

/***/ "./src/js/load_script.js":
/*!*******************************!*\
  !*** ./src/js/load_script.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadItems: () => (/* binding */ loadItems)\n/* harmony export */ });\n/* harmony import */ var _cart_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart_script.js */ \"./src/js/cart_script.js\");\n/* harmony import */ var _product_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product_api.js */ \"./src/js/product_api.js\");\n\r\n\r\n\r\nfunction getHtmlNodeItem(jsonItem){\r\n\r\n    if (jsonItem.currentImageIndex===undefined)\r\n        jsonItem['currentImageIndex']=0;\r\n\r\n    const itemNode=document.createElement('div');\r\n    itemNode.classList.add('item');\r\n    const discountPrice=jsonItem.price-jsonItem.price*(jsonItem.discountPercentage/100);\r\n    itemNode.innerHTML=`\r\n\r\n        \r\n       <div class=\"item_thumbnail_container\">\r\n          \r\n           <img class=\"item_thumbnail\" src=\"${jsonItem.thumbnail}\" alt=\"${jsonItem.title}\">\r\n       </div>\r\n\r\n    \r\n    <div class=\"item_info_container\">\r\n        <div class=\"item_main_info\">\r\n            <p class=\"item_title\">${jsonItem.title}</p>\r\n            <p class=\"item_price\"><s>$${jsonItem.price}</s> $${discountPrice.toFixed(2)}</p>\r\n        </div>\r\n     <div class=\"item_secondary_info\">\r\n        <p class=\"item_rating\">Rating: ${jsonItem.rating}/5</p>\r\n<!--        <button class=\"add_to_cart_btn\" onclick=\"addToCart(${jsonItem.id})\">Add to cart</button>-->\r\n        <button class=\"add_to_cart_btn\" \"product-id\"=\"${jsonItem.id}\">Add to cart</button> <!--\"product id\" may be without quotes-->\r\n    </div>\r\n    \r\n    </div>\r\n    `;\r\n\r\n    return itemNode;\r\n}\r\nfunction showNotification(message){\r\n    const notification=document.getElementById('notification');\r\n    const notificationParent=document.getElementsByClassName('notification-container')[0];\r\n    notificationParent.style.visibility='visible';\r\n    notification.innerHTML=message;\r\n    setTimeout(()=>{\r\n        notificationParent.style.visibility='hidden';\r\n    },5000);\r\n}\r\nfunction handleButtonEvents(){\r\n    const buttons=document.getElementsByClassName('add_to_cart_btn');\r\n    for (const btn of buttons){\r\n        const productId=btn.getAttribute(\"product-id\");\r\n        btn.addEventListener('click',()=>{\r\n            (0,_cart_script_js__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId);\r\n            showNotification(\"Added to cart\");\r\n            btn.innerHTML='Added to cart';\r\n            btn.style.backgroundColor='#d0ffd3';\r\n            btn.setAttribute('disabled','true');\r\n            setTimeout(() => {\r\n                btn.innerHTML = 'Add to cart';\r\n                btn.style.backgroundColor = '#f5f5f5';\r\n                btn.removeAttribute('disabled');\r\n            }, 5000);\r\n        });\r\n\r\n    }\r\n}\r\nasync function loadItems(){\r\n\r\n    const shopContainer=document.getElementsByClassName('shop-items')[0];\r\n    const items=await (0,_product_api_js__WEBPACK_IMPORTED_MODULE_1__.getItems)();\r\n    for (const item of items){\r\n        shopContainer.appendChild(getHtmlNodeItem(item));\r\n    }\r\n    handleButtonEvents();\r\n\r\n\r\n\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/load_script.js?");

/***/ }),

/***/ "./src/js/product_api.js":
/*!*******************************!*\
  !*** ./src/js/product_api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getItems: () => (/* binding */ getItems)\n/* harmony export */ });\nasync function getItems(api='https://dummyjson.com/products'){\r\n    const response=await fetch(api);\r\n    const items=await response.json();\r\n    return items.products;\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/product_api.js?");

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