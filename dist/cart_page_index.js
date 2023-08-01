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

/***/ "./src/js/cart/cart_api.js":
/*!*********************************!*\
  !*** ./src/js/cart/cart_api.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCartAPI: () => (/* binding */ addToCartAPI),\n/* harmony export */   getCart: () => (/* binding */ getCart),\n/* harmony export */   getCartProductForId: () => (/* binding */ getCartProductForId),\n/* harmony export */   getNewCart: () => (/* binding */ getNewCart),\n/* harmony export */   removeFromCartAPI: () => (/* binding */ removeFromCartAPI),\n/* harmony export */   updateProductAPI: () => (/* binding */ updateProductAPI)\n/* harmony export */ });\n// const cartObject = {\r\n//     \"success\": true,\r\n//     \"data\": {\r\n//         \"id\": \"64c38597d8f95\",\r\n//         \"total\": 0,\r\n//         \"discountTotal\": 0,\r\n//         \"totalProducts\": 0,\r\n//         \"totalQuantity\": 0,\r\n//         \"products\": []\r\n//     }\r\n// };\r\nconst cartId='64c38597d8f95';\r\nasync function getCart() {\r\n    const response = await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {\r\n        method: 'GET'\r\n    });\r\n    const json = await response.json();\r\n    return json;\r\n}\r\n\r\nasync function addToCartAPI(productId, quantity) {\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\"products\": [{\"id\": productId, \"quantity\": quantity}]}),\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n\r\n}\r\nasync function getCartProductForId(productId) {\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {\r\n        method: 'GET',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }).then(response => response.json()).then((res) => {\r\n        return res.products.find((product) => product.id === productId);\r\n    });\r\n\r\n}\r\nasync function removeFromCartAPI(productId) {\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}?products[]=${productId}`, {\r\n        method: 'DELETE',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n}\r\n\r\nasync function updateProductAPI(productId, value) {\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {\r\n        method: 'PUT',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\"products\": [{\"id\": productId, \"quantity\": value}]}),\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n}\r\nasync function getNewCart(){\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart`, {\r\n       method:'POST',\r\n         headers: {'Content-Type': 'application/json'},\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/cart/cart_api.js?");

/***/ }),

/***/ "./src/js/cart/cart_page_script.js":
/*!*****************************************!*\
  !*** ./src/js/cart/cart_page_script.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart_api */ \"./src/js/cart/cart_api.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\n\r\n\r\n\r\nlet cart=null;\r\n\r\nlet value = 0;\r\nlet isPressedOnce = false;\r\n\r\n\r\nasync function saveCartToLocalStorage(){\r\n    localStorage.setItem('cart',JSON.stringify(cart));\r\n    await getCartFromLocalStorage();\r\n}\r\nasync function getCartFromLocalStorage(){\r\n    if (localStorage.getItem('cart') === null){\r\n        cart=await (0,_cart_api__WEBPACK_IMPORTED_MODULE_0__.getCart)();\r\n        localStorage.setItem('cart',JSON.stringify(cart));\r\n    }\r\n    else{\r\n        cart=JSON.parse(localStorage.getItem('cart'));\r\n    }\r\n}\r\n\r\n/**\r\n * Loads the cart page\r\n */\r\nfunction loadCartPage() {\r\n    const cartProductsContainer = document.querySelector(\".cartpage-products\");\r\n    for (const cartProduct of cart.products) {\r\n        let cartProductItem = document.createElement(\"div\");\r\n        cartProductItem.classList.add(\"cartpage-product\");\r\n        cartProductItem.setAttribute(\"product-id\", cartProduct.id);\r\n        cartProductItem.innerHTML = `\r\n            <div class=\"cartpage-product-image\">\r\n            <img src=\"${cartProduct.thumbnail}\" alt=\"${cartProduct.title}\">\r\n            </div>\r\n            <div class=\"cartpage-product-info\">\r\n                <div class=\"cartpage-product-name\">${cartProduct.title}</div>\r\n                <div class=\"cartpage-product-price\" product-id=\"${cartProduct.id}\">$${cartProduct.discountedPrice.toFixed(2)}</div>\r\n                <div class=\"cartpage-product-controls\">\r\n                    <div class=\"lower-btn\" product-id=\"${cartProduct.id}\" unselectable=\"on\">&lt;</div>\r\n                    <div class=\"quantity\" product-id=\"${cartProduct.id}\">${cartProduct.quantity}</div>\r\n                    <div class=\"higher-btn\" product-id=\"${cartProduct.id}\" unselectable=\"on\">&gt;</div>\r\n                </div>\r\n            </div>`;\r\n        const lowerButtonForCurrentProduct = cartProductItem.querySelector(\".lower-btn\");\r\n        const higherButtonForCurrentProduct = cartProductItem.querySelector(\".higher-btn\");\r\n\r\n        //Add the click event listeners for the buttons that change the quantity of the product\r\n        //Update the cart on the fronted aswell as on the backend\r\n        lowerButtonForCurrentProduct.addEventListener(\"click\", async (event) => {\r\n            value -= 1;\r\n            debounceUpdateProduct(cartProduct.id);\r\n\r\n        });\r\n        higherButtonForCurrentProduct.addEventListener(\"click\", async (event) => {\r\n            value += 1;\r\n            debounceUpdateProduct(cartProduct.id);\r\n\r\n        });\r\n        cartProductsContainer.appendChild(cartProductItem);\r\n    }\r\n    //Update the total price of the cart\r\n    const total = document.createElement(\"div\");\r\n    total.classList.add(\"cartpage-total\");\r\n    total.innerHTML = `\r\n    <div class=\"total-price\">Total: $${cart[\"discountTotal\"].toFixed(2)}</div>`;\r\n    document.querySelector(\".checkout-button\").insertAdjacentElement(\"beforebegin\", total);\r\n}\r\nfunction getCardProductFromId(productId) {\r\n    return cart.find((product) => product.id === productId);\r\n}\r\n/**\r\n * Updates the price of a product on the frontend\r\n * @param cartProductItem\r\n * @returns {Promise<void>}\r\n */\r\nasync function updateProduct(cartProductItem) {\r\n\r\n    const productId = Number(cartProductItem.getAttribute(\"product-id\"));\r\n    const newPriceNode = cartProductItem.querySelector(`.cartpage-product-price[product-id=\"${productId}\"]`);\r\n    // const updatedProduct = await getCartProductForId(productId);\r\n    const updatedProduct =  getCardProductFromId(productId);\r\n    newPriceNode.innerHTML = `$${updatedProduct[\"discountedPrice\"].toFixed(2)}`;\r\n    value = 0;\r\n}\r\n\r\n/**\r\n * Debounces the update of the product\r\n * @type {(function(...[*]): void)|*}\r\n */\r\nconst debounceUpdateProduct = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(async (productId) => {\r\n    if (!isPressedOnce) {\r\n        isPressedOnce = true;\r\n        await updateCountForProduct(productId);\r\n        isPressedOnce = false;\r\n    }\r\n});\r\n\r\n\r\n/**\r\n * Updates the total price of the cart\r\n */\r\nfunction updateCartpageTotalPrice() {\r\n    document.querySelector(\".total-price\").innerHTML = `Total: $${cart[\"discountTotal\"].toFixed(2)}`;\r\n}\r\n\r\n\r\n/**\r\n * Updates the count of a product\r\n * @param productId\r\n * @returns {Promise<void>}\r\n */\r\nasync function updateCountForProduct(productId) {\r\n    console.log('updateCountForProduct');\r\n    const quantityNode = document.querySelector(`.quantity[product-id=\"${productId}\"]`);\r\n\r\n    if (Number(quantityNode.innerHTML) + value < 1) {\r\n        const product = document.querySelector(`.cartpage-product[product-id=\"${productId}\"]`);\r\n        product.remove();\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_0__.removeFromCartAPI)(productId))['data'];\r\n        await saveCartToLocalStorage();\r\n        updateCartpageTotalPrice();\r\n    } else {\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_0__.updateProductAPI)(productId, value))['data'];\r\n        await saveCartToLocalStorage();\r\n        quantityNode.innerHTML = String(Number(quantityNode.innerHTML) + value);\r\n        const cartProductItem = document.querySelector(`.cartpage-product[product-id=\"${productId}\"]`);\r\n        await updateProduct(cartProductItem);\r\n        updateCartpageTotalPrice();\r\n    }\r\n\r\n}\r\n\r\n/**\r\n * Removes all the items from the cart\r\n * @returns {Promise<void>}\r\n */\r\nasync function removeAllItemsFromCart() {\r\n    const cartProducts = document.querySelectorAll(\".cartpage-product\");\r\n    for (const cartProduct of cartProducts) {\r\n        cartProduct.remove();\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_0__.removeFromCartAPI)(cart.products[0].id))['data'];\r\n        updateCartpageTotalPrice();\r\n        // await updateHeaderCartNumbers(cart);\r\n    }\r\n\r\n}\r\n\r\n//Adds the click event listener for the checkout button\r\nasync function handleCheckoutButton() {\r\n    const checkoutButton = document.querySelector('.checkout-button');\r\n    checkoutButton.addEventListener('click', () => {\r\n        alert('Checkout button clicked');\r\n        //removeAllItemsFromCart();\r\n    });\r\n}\r\n\r\ngetCartFromLocalStorage().then(()=>{\r\n    loadCartPage();\r\n});\r\n//attach the click event listener for the checkout button\r\nawait handleCheckoutButton();\r\n\r\n\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/cart/cart_page_script.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   debounce: () => (/* binding */ debounce)\n/* harmony export */ });\nfunction debounce(func, timeout = 800) {\r\n    let timer;\r\n    return (...args) => {\r\n        clearTimeout(timer);\r\n        timer = setTimeout(() => {\r\n            func.apply(this, args);\r\n        }, timeout);\r\n    };\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/utils.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/cart/cart_page_script.js");
/******/ 	
/******/ })()
;