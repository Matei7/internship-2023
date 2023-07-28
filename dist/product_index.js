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

/***/ "./src/js/product/product_index.js":
/*!*****************************************!*\
  !*** ./src/js/product/product_index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _product_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../product_api */ \"./src/js/product_api.js\");\n\r\n\r\nconst sampleItem =\r\n    {\r\n        \"id\": 1,\r\n        \"title\": \"iPhone 9\",\r\n        \"description\": \"An apple mobile which is nothing like apple\",\r\n        \"price\": 549,\r\n        \"discountPercentage\": 12.96,\r\n        \"rating\": 4.69,\r\n        \"stock\": 94,\r\n        \"brand\": \"Apple\",\r\n        \"category\": \"smartphones\",\r\n        \"thumbnail\": \"https://i.dummyjson.com/data/products/1/thumbnail.jpg\",\r\n        \"images\": [\r\n            \"https://i.dummyjson.com/data/products/1/1.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/2.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/3.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/4.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/thumbnail.jpg\"\r\n        ]\r\n    }\r\nlet currentImageIndex = 0;\r\n\r\nfunction showCurrentImage(index){\r\n    const imagesContainer=document.querySelector(\".images\");\r\n    const images=imagesContainer.querySelectorAll(\"img\");\r\n\r\n    for (let i=0; i<images.length; i++){\r\n        if (i===index)\r\n            images[i].classList.remove(\"hidden\");\r\n        else\r\n            images[i].classList.add(\"hidden\");\r\n    }\r\n}\r\nfunction nextImage() {\r\n\r\n    currentImageIndex++;\r\n    const imagesContainer = document.querySelector(\".images\");\r\n    const width = imagesContainer.clientWidth;\r\n    const translateX = currentImageIndex * width;\r\n\r\n    if (currentImageIndex >= sampleItem.images.length) {\r\n        currentImageIndex = -1;\r\n        imagesContainer.style.transform = `translateX(0)`;\r\n        showCurrentImage(currentImageIndex+1);\r\n    } else{\r\n        imagesContainer.style.transform = `translateX(-${translateX}px)`;\r\n        showCurrentImage(currentImageIndex);\r\n    }\r\n\r\n}\r\n\r\nfunction prevImage() {\r\n\r\n    const imagesContainer = document.querySelector(\".images\");\r\n    const width = imagesContainer.clientWidth;\r\n    currentImageIndex--;\r\n\r\n    if (currentImageIndex < 0) {\r\n        currentImageIndex = sampleItem.images.length - 1;\r\n        imagesContainer.style.transform = `translateX(-${currentImageIndex * width}px)`;\r\n        showCurrentImage(currentImageIndex);\r\n    } else {\r\n        const translateX = currentImageIndex * width;\r\n        imagesContainer.style.transform = `translateX(-${translateX}px)`;\r\n        showCurrentImage(currentImageIndex);\r\n    }\r\n\r\n\r\n}\r\n\r\nfunction loadProduct(jsonItem) {\r\n    const imagesContainer = document.querySelector(\".images\");\r\n    imagesContainer.innerHTML = \"\";\r\n\r\n    for (const url of jsonItem.images) {\r\n        const img = document.createElement(\"img\");\r\n        img.src = url;\r\n        img.alt = jsonItem.title;\r\n        img.loading = \"lazy\";\r\n        document.querySelector(\".images\").append(img);\r\n        img.classList.add(\"hidden\");\r\n    }\r\n    document.querySelector(\".info\").innerHTML = `\r\n    <div class=\"main-info\">\r\n        <h1>${jsonItem.title}</h1>\r\n        <p>Price: $${jsonItem.price}</p>\r\n    </div>\r\n    <div class=\"item-section-2\">\r\n        <p>Rating: ${jsonItem.rating}</p>\r\n        <p>Stock: ${jsonItem.stock}</p>\r\n    </div>\r\n    \r\n    <p>${jsonItem.description}</p>\r\n    \r\n    <div class=\"item-section-1\">\r\n        <p>Category: ${jsonItem.category}</p>\r\n        <p>Brand: ${jsonItem.brand}</p>\r\n    </div>\r\n\r\n    `;\r\n}\r\nasync function getJsonProduct(){\r\n    const itemId = Number(new URLSearchParams(window.location.search).get(\"id\"));\r\n    const jsonItem = await (0,_product_api__WEBPACK_IMPORTED_MODULE_0__.getItemById)(itemId);\r\n    return jsonItem;\r\n}\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n\r\n    setTimeout(() => {\r\n        const jsonItem = getJsonProduct();\r\n        getJsonProduct().then((jsonItem) => {\r\n            loadProduct(jsonItem);\r\n            showCurrentImage(currentImageIndex);\r\n        });\r\n\r\n        //loadProduct(jsonItem);\r\n\r\n    }, 1000);\r\n\r\n\r\n    const leftArrow = document.querySelector(\".left-arrow\");\r\n    const rightArrow = document.querySelector(\".right-arrow\");\r\n    rightArrow.addEventListener(\"click\", nextImage);\r\n    leftArrow.addEventListener(\"click\", prevImage);\r\n\r\n\r\n    document.addEventListener(\"keydown\", (event) => {\r\n        if (event.key === \"ArrowRight\")\r\n            nextImage();\r\n        else if (event.key === \"ArrowLeft\")\r\n            prevImage();\r\n    });\r\n\r\n\r\n});\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/product/product_index.js?");

/***/ }),

/***/ "./src/js/product_api.js":
/*!*******************************!*\
  !*** ./src/js/product_api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getItemById: () => (/* binding */ getItemById),\n/* harmony export */   getItems: () => (/* binding */ getItems)\n/* harmony export */ });\nasync function getItems(api='https://dummyjson.com/products?limit=10&skip=10'){\r\n    const response=await fetch(api);\r\n    const items=await response.json();\r\n    return items.products;\r\n}\r\nasync function getItemById(id,api='https://dummyjson.com/products'){\r\n    const response=await fetch(`${api}/${id}`);\r\n    const item=await response.json();\r\n    return item;\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/product_api.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/product/product_index.js");
/******/ 	
/******/ })()
;