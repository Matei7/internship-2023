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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addItemToCard: () => (/* binding */ addItemToCard),\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nconst products=[\r\n\t{\"id\":1,\"title\":\"iPhone 9\",\"description\":\"An apple mobile which is nothing like apple\",\"price\":549,\"discountPercentage\":12.96,\"rating\":4.69,\"stock\":94,\"brand\":\"Apple\",\"category\":\"smartphones\",\"thumbnail\":\"https://i.dummyjson.com/data/products/1/thumbnail.jpg\",\"images\":[\"https://i.dummyjson.com/data/products/1/1.jpg\",\"https://i.dummyjson.com/data/products/1/2.jpg\",\"https://i.dummyjson.com/data/products/1/3.jpg\",\"https://i.dummyjson.com/data/products/1/4.jpg\",\"https://i.dummyjson.com/data/products/1/thumbnail.jpg\"]},{\"id\":2,\"title\":\"iPhone X\",\"description\":\"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...\",\"price\":899,\"discountPercentage\":17.94,\"rating\":4.44,\"stock\":34,\"brand\":\"Apple\",\"category\":\"smartphones\",\"thumbnail\":\"https://i.dummyjson.com/data/products/2/thumbnail.jpg\",\"images\":[\"https://i.dummyjson.com/data/products/2/1.jpg\",\"https://i.dummyjson.com/data/products/2/2.jpg\",\"https://i.dummyjson.com/data/products/2/3.jpg\",\"https://i.dummyjson.com/data/products/2/thumbnail.jpg\"]},{\"id\":3,\"title\":\"Samsung Universe 9\",\"description\":\"Samsung's new variant which goes beyond Galaxy to the Universe\",\"price\":1249,\"discountPercentage\":15.46,\"rating\":4.09,\"stock\":36,\"brand\":\"Samsung\",\"category\":\"smartphones\",\"thumbnail\":\"https://i.dummyjson.com/data/products/3/thumbnail.jpg\",\"images\":[\"https://i.dummyjson.com/data/products/3/1.jpg\"]},\r\n\t{\"id\":4,\"title\":\"OPPOF19\",\"description\":\"OPPO F19 is officially announced on April 2021.\",\"price\":280,\"discountPercentage\":17.91,\"rating\":4.3,\"stock\":123,\"brand\":\"OPPO\",\"category\":\"smartphones\",\"thumbnail\":\"https://i.dummyjson.com/data/products/4/thumbnail.jpg\",\"images\":[\"https://i.dummyjson.com/data/products/4/1.jpg\",\"https://i.dummyjson.com/data/products/4/2.jpg\",\"https://i.dummyjson.com/data/products/4/3.jpg\",\"https://i.dummyjson.com/data/products/4/4.jpg\",\"https://i.dummyjson.com/data/products/4/thumbnail.jpg\"]}\r\n\t,{\"id\":14,\"title\":\"Non-Alcoholic Concentrated Perfume Oil\",\"description\":\"Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil\",\"price\":120,\"discountPercentage\":15.6,\"rating\":4.21,\"stock\":114,\"brand\":\"Al Munakh\",\"category\":\"fragrances\",\"thumbnail\":\"https://i.dummyjson.com/data/products/14/thumbnail.jpg\",\"images\":[\"https://i.dummyjson.com/data/products/14/1.jpg\",\"https://i.dummyjson.com/data/products/14/2.jpg\",\"https://i.dummyjson.com/data/products/14/3.jpg\",\"https://i.dummyjson.com/data/products/14/thumbnail.jpg\"]},{\"id\":15,\"title\":\"Eau De Perfume Spray\",\"description\":\"Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality\",\"price\":30,\"discountPercentage\":10.99,\"rating\":4.7,\"stock\":105,\"brand\":\"Lord - Al-Rehab\",\"category\":\"fragrances\",\"thumbnail\":\"https://i.dummyjson.com/data/products/15/thumbnail.jpg\",\"images\":[\"https://i.dummyjson.com/data/products/15/1.jpg\",\"https://i.dummyjson.com/data/products/15/2.jpg\",\"https://i.dummyjson.com/data/products/15/3.jpg\",\"https://i.dummyjson.com/data/products/15/4.jpg\",\"https://i.dummyjson.com/data/products/15/thumbnail.jpg\"]},{\"id\":16,\"title\":\"Hyaluronic Acid Serum\",\"description\":\"L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid\",\"price\":19,\"discountPercentage\":13.31,\"rating\":4.83,\"stock\":110,\"brand\":\"L'Oreal Paris\",\"category\":\"skincare\",\"thumbnail\":\"https://i.dummyjson.com/data/products/16/thumbnail.jpg\",\"images\":[\"https://i.dummyjson.com/data/products/16/1.png\",\"https://i.dummyjson.com/data/products/16/2.webp\",\"https://i.dummyjson.com/data/products/16/3.jpg\",\"https://i.dummyjson.com/data/products/16/4.jpg\",\"https://i.dummyjson.com/data/products/16/thumbnail.jpg\"]}\r\n]\r\n\r\nfunction createCard(product) {\r\n\tconst card = document.createElement(\"div\");\r\n\tcard.setAttribute(\"data-id\", product.id);\r\n\tcard.classList.add(\"product-grid__product-card\");\r\n\r\n\tconst imageWrapper = document.createElement(\"div\");\r\n\timageWrapper.classList.add(\"product-grid__product-card__image-wrapper\");\r\n\tconst productImage = document.createElement(\"img\");\r\n\tproductImage.classList.add(\"product-grid__product-card__image-wrapper__image\");\r\n\tconst productDiscount = document.createElement(\"div\");\r\n\tproductDiscount.classList.add(\"product-grid__product-card__image-wrapper__discount\");\r\n\tproductDiscount.textContent = `-${product.discountPercentage}%`;\r\n\tproductImage.src = product.thumbnail;\r\n\tproductImage.alt = product.title;\r\n\timageWrapper.appendChild(productImage);\r\n\timageWrapper.appendChild(productDiscount);\r\n\r\n\tconst productTitle = document.createElement(\"h2\");\r\n\tproductTitle.classList.add(\"product-grid__product-card__title\");\r\n\tproductTitle.textContent = product.title;\r\n\r\n\tconst priceWrapper = document.createElement(\"div\");\r\n\tpriceWrapper.classList.add(\"product-grid__product-card__prices\");\r\n\tconst oldPrice = document.createElement(\"p\");\r\n\toldPrice.classList.add(\"product-grid__product-card__price__initial\");\r\n\toldPrice.textContent = `$${product.price}`;\r\n\tconst newPrice = document.createElement(\"p\");\r\n\tnewPrice.classList.add(\"product-grid__product-card__price__final\");\r\n\tnewPrice.textContent = `$${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}`;\r\n\tpriceWrapper.appendChild(oldPrice);\r\n\tpriceWrapper.appendChild(newPrice);\r\n\r\n\tconst productDescription = document.createElement(\"p\");\r\n\tproductDescription.classList.add(\"product-grid__product-card__description\");\r\n\tproductDescription.textContent = product.description;\r\n\r\n\tconst productDetails = document.createElement(\"div\");\r\n\tproductDetails.classList.add(\"product-grid__product-card__product-details\");\r\n\r\n\tconst brand = document.createElement(\"div\");\r\n\tbrand.classList.add(\"brand\");\r\n\tbrand.textContent = `Brand: ${product.brand}`;\r\n\tconst category = document.createElement(\"div\");\r\n\tbrand.classList.add(\"category\");\r\n\tcategory.textContent = `Category: ${product.category}`;\r\n\tconst stock = document.createElement(\"div\");\r\n\tbrand.classList.add(\"stock\");\r\n\tstock.textContent = `Stock: ${product.stock}`;\r\n\tconst rating= document.createElement(\"div\");\r\n\tbrand.classList.add(\"rating\");\r\n\trating.textContent = `Rating: ${product.rating}`;\r\n\r\n\tproductDetails.appendChild(brand);\r\n\tproductDetails.appendChild(category);\r\n\tproductDetails.appendChild(stock);\r\n\tproductDetails.appendChild(rating);\r\n\r\n\tconst addToCartButton = document.createElement(\"button\");\r\n\taddToCartButton.classList.add(\"product-grid__product-card__add-to-cart-button\");\r\n\taddToCartButton.textContent = \"Add to Cart\";\r\n\r\n\tcard.appendChild(imageWrapper);\r\n\r\n\tcard.appendChild(productTitle);\r\n\tcard.appendChild(priceWrapper);\r\n\tcard.appendChild(productDescription);\r\n\tcard.appendChild(productDetails);\r\n\tcard.appendChild(addToCartButton);\r\n\r\n\treturn card;\r\n}\r\nfunction showPopUp(){\r\n\tconst popUp=document.createElement(\"div\");\r\n\tpopUp.classList.add(\"pop-up\");\r\n\tpopUp.textContent=\"Product added successfully\";\r\n\tconst bodyElem=document.querySelector(\"body\");\r\n\tbodyElem.appendChild(popUp);\r\n}\r\n\r\nfunction addItemToCard(product) {\r\n\tlet btnAddToCart= product.querySelector(\".product-grid__product-card__add-to-cart-button\");\r\n\tbtnAddToCart.addEventListener(\"click\", function () {\r\n\t\tconsole.log(\"Adding item to cart\" );\r\n\t\tconsole.log(product.dataset.id);\r\n\t\tconst initialColor = btnAddToCart.style.backgroundColor;\r\n\t\tconst initialText = btnAddToCart.textContent;\r\n\t\tbtnAddToCart.style.backgroundColor = \"#023020\";\r\n\t\tbtnAddToCart.textContent = \"Added to cart\";\r\n\t\tbtnAddToCart.style.scale = \"1.3\";\r\n\t\tshowPopUp();\r\n\t\tsetTimeout(function () {\r\n\t\t\tbtnAddToCart.style.backgroundColor = initialColor;\r\n\t\t\tbtnAddToCart.textContent = initialText;\r\n\t\t\tbtnAddToCart.style.scale = \"1\";\r\n\t\t\tconst bodyElement= document.querySelector(\"body\");\r\n\t\t\tbodyElement.removeChild(bodyElement.lastChild);\r\n\t\t}, 3000);\r\n\t});\r\n}\r\n\r\nfunction init(){\r\n\tconst mainContainer = document.querySelector(\".product-grid\");\r\n\tproducts.forEach(product => {\r\n\t\tconst cardElement = createCard(product);\r\n\t\tmainContainer.appendChild(cardElement);\r\n\t});\r\n\tconst cardElements = document.querySelectorAll(\".product-grid__product-card\");\r\n\tcardElements.forEach(card => {\r\n\t\taddItemToCard(card);\r\n\t});\r\n}\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

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