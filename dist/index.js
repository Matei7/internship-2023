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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nasync function init() {\r\n    await loadShopProducts();\r\n    setupAddToCartButtons();\r\n}\r\n\r\nasync function loadShopProducts() {\r\n    let productObjectsArray = (await getAllProductsJSON()).products;\r\n\r\n    let productsContainer = document.getElementById(\"products-list\");\r\n\r\n\r\n\r\n    for (const product of productObjectsArray) {\r\n        let productHTML = getProductHTML(product);\r\n        productsContainer.appendChild(productHTML);\r\n    }\r\n}\r\n\r\nfunction getProductHTML(productObject)\r\n{\r\n    console.log(productObject);\r\n    let productId = productObject[\"id\"];\r\n    let productTitle = productObject[\"title\"];\r\n    let productThumbnail = productObject[\"thumbnail\"];\r\n    let productDescription = productObject[\"description\"];\r\n    let productRating = productObject[\"rating\"];\r\n    let productPrice = productObject[\"price\"];\r\n    let productDiscount = productObject[\"discountPercentage\"];\r\n    let productPriceWithDiscount = productPrice * (100 - productDiscount) / 100;\r\n\r\n    let productHTML = document.createElement('div');\r\n    productHTML.setAttribute('class', \"item-container\");\r\n    productHTML.setAttribute('data-id', productId);\r\n    productHTML.innerHTML = `\r\n\\t\\t\\t\\t<img class=\"item-thumbnail\" src=\"${productThumbnail}\" alt=\"placeholder image thumbnail\"/>\r\n\\t\\t\\t\\t<p class=\"item-title\">${productTitle}</p>\r\n\\t\\t\\t\\t<p class=\"item-description\">${productDescription}</p>\r\n\\t\\t\\t\\t<p class=\"item-rating\">Rating: ${productRating}/5.00</p>\r\n\\t\\t\\t\\t<div class=\"item-purchase-details\">\r\n\\t\\t\\t\\t\\t<p class=\"item-price\">Price: <s>$${productPrice}</s>   <span style=\"color: red\">$${productPriceWithDiscount.toFixed(2)}</span></p>\r\n\\t\\t\\t\\t\\t<button class=\"add-to-cart-button\">Add To Cart</button>\r\n\\t\\t\\t\\t</div>\r\n    `;\r\n\r\n    return productHTML;\r\n}\r\n\r\nfunction getAllProductsJSON() {\r\n    return fetch('https://dummyjson.com/products')\r\n        .then(res => {return res.json();});\r\n}\r\n\r\nfunction setupAddToCartButtons()\r\n{\r\n    let addToCartButtons = document.getElementsByClassName(\"add-to-cart-button\");\r\n\r\n\r\n    for(const button of addToCartButtons)\r\n    {\r\n        button.addEventListener('click', function (event){\r\n            button.textContent = \"Added to cart\";\r\n            button.style.setProperty(\"background-color\", \"var(--button-pressed)\");\r\n\r\n            let buttonID = button.parentElement.parentElement.getAttribute('data-id');\r\n            let buttonTitle = button.parentElement.parentElement.firstElementChild.nextElementSibling.innerText;\r\n            let newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);\r\n            document.getElementById('app').appendChild(newPopup);\r\n\r\n            setTimeout(function (){\r\n                button.textContent = \"Add to cart\";\r\n                button.style.removeProperty(\"background-color\");\r\n                newPopup.remove();\r\n            }, 7000);\r\n        });\r\n    }\r\n}\r\n\r\nfunction createAddToCartPopup(text=\"The product has been added to your cart successfully!\"){\r\n    let newPopup = document.createElement('div');\r\n    let popupContent = document.createElement('div');\r\n    newPopup.appendChild(popupContent);\r\n    newPopup.setAttribute('class', 'add-to-cart-popup');\r\n    popupContent.innerText = text;\r\n\r\n    return newPopup;\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

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