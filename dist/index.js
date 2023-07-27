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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nasync function init() {\r\n    await loadShopProducts();\r\n    setupAddToCartButtons();\r\n}\r\n\r\nasync function loadShopProducts() {\r\n    const productObjectsArray = (await getAllProductsJSON()).products;\r\n    const productsContainer = document.getElementById(\"products-list\");\r\n\r\n    for (const product of productObjectsArray) {\r\n        const productHTML = getProductHTML(product);\r\n        productsContainer.appendChild(productHTML);\r\n    }\r\n}\r\n\r\nfunction getProductHTML(productObject)\r\n{\r\n    const productId = productObject[\"id\"];\r\n    const productTitle = productObject[\"title\"];\r\n    const productThumbnail = productObject[\"thumbnail\"];\r\n    const productDescription = productObject[\"description\"];\r\n    const productRating = productObject[\"rating\"];\r\n    const productPrice = productObject[\"price\"];\r\n    const productDiscount = productObject[\"discountPercentage\"];\r\n    const productPriceWithDiscount = productPrice * (100 - productDiscount) / 100;\r\n\r\n    const productHTML = document.createElement('div');\r\n    productHTML.setAttribute('class', \"item-container\");\r\n    productHTML.setAttribute('data-id', productId);\r\n    productHTML.innerHTML = `\r\n        <img class=\"item-thumbnail\" src=\"${productThumbnail}\" alt=\"placeholder image thumbnail\"/>\r\n        <p class=\"item-title\">${productTitle}</p>\r\n        <p class=\"item-description\">${productDescription}</p>\r\n        <p class=\"item-rating\">Rating: <div class=\"star-rating\" style=\"--rating: ${productRating};\"></div> ${productRating}/5.00</p>\r\n        \r\n        <div class=\"item-purchase-details\">\r\n          <p class=\"item-price\">Price: <s>$${productPrice}</s>   <span style=\"color: red\">$${productPriceWithDiscount.toFixed(2)}</span></p>\r\n          <button class=\"add-to-cart-button\">Add To Cart</button>\r\n        </div>\r\n    `;\r\n\r\n    return productHTML;\r\n}\r\n\r\nfunction getAllProductsJSON() {\r\n    return fetch('https://dummyjson.com/products')\r\n        .then(res => {return res.json();});\r\n}\r\n\r\nfunction setupAddToCartButtons()\r\n{\r\n    const addToCartButtons = document.getElementsByClassName(\"add-to-cart-button\");\r\n\r\n    for(const button of addToCartButtons)\r\n    {\r\n        button.addEventListener('click', function (event){\r\n            button.textContent = \"Added to cart\";\r\n            button.style.setProperty(\"background-color\", \"var(--button-pressed)\");\r\n\r\n            const itemContainer = button.parentElement.parentElement;\r\n\r\n            const buttonID = itemContainer.getAttribute('data-id');\r\n            const buttonTitle = itemContainer.getElementsByTagName('p')[0].innerText;\r\n            const newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);\r\n            document.getElementById('app').appendChild(newPopup);\r\n\r\n            setTimeout(function (){\r\n                button.textContent = \"Add to cart\";\r\n                button.style.removeProperty(\"background-color\");\r\n                newPopup.remove();\r\n            }, 7000);\r\n        });\r\n    }\r\n}\r\n\r\nfunction createAddToCartPopup(text=\"The product has been added to your cart successfully!\"){\r\n    const newPopup = document.createElement('div');\r\n    const popupContent = document.createElement('div');\r\n    newPopup.appendChild(popupContent);\r\n    newPopup.setAttribute('class', 'add-to-cart-popup');\r\n    popupContent.innerText = text;\r\n\r\n    return newPopup;\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

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