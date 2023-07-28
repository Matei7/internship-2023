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

/***/ "./src/sass/nav.scss":
/*!***************************!*\
  !*** ./src/sass/nav.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://internship-2023/./src/sass/nav.scss?");

/***/ }),

/***/ "./src/sass/product-page.scss":
/*!************************************!*\
  !*** ./src/sass/product-page.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://internship-2023/./src/sass/product-page.scss?");

/***/ }),

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProductToCartAPI: () => (/* binding */ addProductToCartAPI),\n/* harmony export */   fetchProducts: () => (/* binding */ fetchProducts),\n/* harmony export */   getCartAPI: () => (/* binding */ getCartAPI),\n/* harmony export */   getProductAfterId: () => (/* binding */ getProductAfterId),\n/* harmony export */   removeProductFromCartAPI: () => (/* binding */ removeProductFromCartAPI),\n/* harmony export */   updateProductQuantityAPI: () => (/* binding */ updateProductQuantityAPI)\n/* harmony export */ });\nasync function fetchProducts(limitNumber = 12, skipNumber = 0) {\r\n    console.log(limitNumber, skipNumber);\r\n    let jsonProducts = await fetch(`https://dummyjson.com/products?limit=${limitNumber}&skip=${skipNumber}`)\r\n        .then(res => res.json());\r\n    return jsonProducts['products'];\r\n}\r\n\r\nasync function getProductAfterId(id) {\r\n    return await fetch('https://dummyjson.com/products/' + id)\r\n        .then(res => res.json());\r\n}\r\n\r\nasync function getCartAPI(cartId = '64c3a47146628') {\r\n    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {method: 'GET'})\r\n        .then(res => res.json());\r\n}\r\n\r\nasync function addProductToCartAPI(product, cartId = '64c3a47146628') {\r\n    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\r\n            products: [product]\r\n        })\r\n    }).then(res => res.json())\r\n}\r\n\r\nasync function removeProductFromCartAPI(productId, cartId = '64c3a47146628') {\r\n    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}?products[]=${productId}`, {\r\n        method: 'DELETE',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }).then(res => res.json())\r\n}\r\n\r\nasync function updateProductQuantityAPI(productId, quantity, cartId = '64c3a47146628') {\r\n    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {\r\n        method: 'PUT',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\r\n            products: [{\r\n                id: productId,\r\n                quantity: quantity\r\n            }]\r\n        })\r\n    }).then(res => res.json())\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/api.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nfunction init() {\r\n    document.addEventListener(\"DOMContentLoaded\", function () {\r\n        fetch(\"nav.html\")\r\n            .then(function (response) {\r\n                return response.text();\r\n            })\r\n            .then(function (navContent) {\r\n                // Insert the fetched content into the navPlaceholder element\r\n                document.getElementById(\"nav-placeholder\").outerHTML = navContent;\r\n            })\r\n            .catch(function (error) {\r\n                console.log(\"Error loading navigation: \", error);\r\n            });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/product-info.js":
/*!********************************!*\
  !*** ./src/js/product-info.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadProductPage: () => (/* binding */ loadProductPage)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/js/api.js\");\n\r\n\r\nasync function loadProductPage() {\r\n    let productId = Number(new URLSearchParams(window.location.search).get(\"id\"));\r\n    let product = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getProductAfterId)(productId);\r\n    let innerHtml  = `\r\n        <div class=\"product-image\">`;\r\n    product.images.forEach(image => {\r\n        innerHtml += `<img class=\"slide\" src=\"${image}\" alt=\"product-image\">`\r\n    });\r\n    if(product.images.length > 1) {\r\n        innerHtml += `<a href=\"#\" class=\"prev\"><</a>\r\n            <a href=\"#\" class=\"next\">></a>\r\n        \r\n            <div class=\"slideshow-dots\">`;\r\n        for (let i = 0; i < product.images.length; i++) {\r\n            innerHtml += `<span class=\"dot\"></span>`;\r\n        }\r\n    }\r\n    innerHtml += `</div>\r\n        </div>\r\n        <div class=\"product-details\">\r\n            <div class=\"product-name\" onclick=\"\">${product.title}</div>\r\n            <div class=\"product-price\">$ ${product.price}</div>\r\n            <div class=\"product-description\">${product.description}</div>\r\n            <div class=\"product-quantity\">\r\n                <label for=\"quantity\">Quantity</label>\r\n                <input type=\"number\" id=\"quantity\" name=\"quantity\" min=\"1\" max=\"5\" value=\"1\">\r\n            </div>\r\n            <div class=\"\">\r\n                <button class=\"button product-add-to-cart\">Add to cart</button>\r\n                <button><span class=\"button material-symbols-outlined\">favorite</span></button>\r\n            </div>\r\n        </div>`;\r\n    document.querySelector('.product-info').innerHTML = innerHtml;\r\n    return product.images.length;\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/product-info.js?");

/***/ }),

/***/ "./src/js/product-page.js":
/*!********************************!*\
  !*** ./src/js/product-page.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_product_page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/product-page.scss */ \"./src/sass/product-page.scss\");\n/* harmony import */ var _sass_nav_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sass/nav.scss */ \"./src/sass/nav.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _product_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-info */ \"./src/js/product-info.js\");\n\r\n\r\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_2__.init)();\r\nif (await (0,_product_info__WEBPACK_IMPORTED_MODULE_3__.loadProductPage)() > 1) {\r\n    document.querySelector('.prev').addEventListener('click', goToPrevSlide);\r\n    document.querySelector('.next').addEventListener('click', goToNextSlide);\r\n    document.querySelectorAll('.dot').forEach((dot, index) => {\r\n        dot.addEventListener('click', () => {\r\n            currentSlide(index + 1);\r\n        });\r\n    });\r\n}\r\n\r\nlet slideIndex = 0;\r\nlet prevIndex = 0;\r\ninitSlides();\r\n\r\nfunction goToPrevSlide() {\r\n    plusSlides(-1);\r\n}\r\n\r\nfunction goToNextSlide() {\r\n    plusSlides(1);\r\n}\r\n\r\nfunction initSlides() {\r\n    document.getElementsByClassName(\"slide\")[0].className += \" slide-active\";\r\n    document.getElementsByClassName(\"dot\")[0].className += \" dot-active\";\r\n}\r\n\r\nfunction plusSlides(n) {\r\n    prevIndex = slideIndex;\r\n    showSlides(slideIndex += n);\r\n}\r\n\r\nfunction currentSlide(n) {\r\n    prevIndex = slideIndex;\r\n    showSlides(slideIndex = n);\r\n}\r\n\r\nfunction showSlides(n) {\r\n    let slides = document.getElementsByClassName(\"slide\");\r\n    let dots = document.getElementsByClassName(\"dot\");\r\n    if (n > slides.length - 1) {\r\n        slideIndex = 0;\r\n        prevIndex = slides.length - 1;\r\n    }\r\n    if (n < 0) {\r\n        slideIndex = slides.length - 1;\r\n        prevIndex = 0;\r\n    }\r\n\r\n    console.log(prevIndex, slideIndex, slides.length - 1);\r\n\r\n    if (prevIndex === 0 && slideIndex === slides.length - 1) {\r\n        slides[slideIndex].className += \" slide-in-right slide-active in\";\r\n        slides[prevIndex].className += \" slide-out-right out\";\r\n    }\r\n    else if (slideIndex === 0 && prevIndex === slides.length - 1) {\r\n        slides[slideIndex].className += \" slide-in-left slide-active out\";\r\n        slides[prevIndex].className += \" slide-out-left in\";\r\n    }\r\n    else if (prevIndex < slideIndex) {\r\n        slides[slideIndex].className += \" slide-in-left slide-active\";\r\n        slides[prevIndex].className += \" slide-out-left\";\r\n    } else {\r\n        slides[slideIndex].className += \" slide-in-right slide-active\";\r\n        slides[prevIndex].className += \" slide-out-right\";\r\n    }\r\n\r\n    document.querySelector('.prev').removeEventListener('click', goToPrevSlide);\r\n    document.querySelector('.next').removeEventListener('click', goToNextSlide);\r\n\r\n    setTimeout(() => {\r\n        slides[slideIndex].className = \"slide slide-active\";\r\n        slides[prevIndex].className = \"slide\";\r\n        document.querySelector('.prev').addEventListener('click', goToPrevSlide);\r\n        document.querySelector('.next').addEventListener('click', goToNextSlide);\r\n    }, 1000);\r\n    dots[slideIndex].className += \" dot-active\";\r\n    dots[prevIndex].className = dots[prevIndex].className.replace(\" dot-active\", \"\");\r\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/product-page.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/product-page.js");
/******/ 	
/******/ })()
;