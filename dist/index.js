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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nasync function init() {\r\n    const response = await fetch('https://dummyjson.com/products');\r\n    const products = await response.json();\r\n    const productsContainer = document.querySelector('.products');\r\n    console.log(products)\r\n    for (const product of products.products) {\r\n        const productContainer = document.createElement('div');\r\n        productContainer.classList.add('products-item');\r\n        // Creez item ul\r\n\r\n        const image = document.createElement('img'); // Prima imagine momentan\r\n        image.setAttribute('src', product.images[0]);\r\n        image.setAttribute('alt', product.brand + \"image\");\r\n        image.classList.add('product-image');\r\n\r\n        const title = document.createElement('h2');\r\n        title.innerText = product.title;\r\n        title.classList.add('product-title');\r\n\r\n        const brand = document.createElement('h3');\r\n        brand.innerText = product.brand;\r\n        brand.classList.add('product-brand');\r\n\r\n        const category = document.createElement('h5');\r\n        category.innerText = product.category;\r\n        category.classList.add('product-category');\r\n\r\n        const description = document.createElement('p');\r\n        description.innerText = product.description;\r\n        description.classList.add('product-description');\r\n\r\n        const discountPercentage = document.createElement('p');\r\n        discountPercentage.innerText = `SALE ${product.discountPercentage}%!!`;\r\n        discountPercentage.classList.add('product-discount-percentage');\r\n\r\n        productContainer.setAttribute('data-id', product.id);\r\n\r\n        const price = document.createElement('h3');\r\n        price.innerText = `$${product.price}`;\r\n        price.classList.add('product-price');\r\n\r\n\r\n        const rating = document.createElement('h3');\r\n        rating.innerText = `Rating: ${product.rating}`;\r\n        rating.classList.add('product-rating');\r\n\r\n        const stock = document.createElement('h3');\r\n        stock.innerText = `Available: ${product.stock}`;\r\n        stock.classList.add('product-stock');\r\n\r\n        const button = document.createElement('button');\r\n        button.classList.add('product-button');\r\n        button.innerText = 'Add to cart';\r\n\r\n        productContainer.appendChild(image);\r\n        productContainer.appendChild(title);\r\n        productContainer.appendChild(brand);\r\n        productContainer.appendChild(category);\r\n        productContainer.appendChild(discountPercentage);\r\n        productContainer.appendChild(price);\r\n        productContainer.appendChild(rating);\r\n        productContainer.appendChild(stock);\r\n        productContainer.appendChild(description);\r\n        productContainer.appendChild(button);\r\n        productsContainer.appendChild(productContainer);\r\n    }\r\n\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

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