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

/***/ "./src/sass/product_styles.scss":
/*!**************************************!*\
  !*** ./src/sass/product_styles.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://internship-2023/./src/sass/product_styles.scss?");

/***/ }),

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

/***/ "./src/js/cart_api.js":
/*!****************************!*\
  !*** ./src/js/cart_api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProductToCart: () => (/* binding */ addProductToCart),\n/* harmony export */   getCart: () => (/* binding */ getCart),\n/* harmony export */   removeProductFromCart: () => (/* binding */ removeProductFromCart),\n/* harmony export */   updateQuantityProduct: () => (/* binding */ updateQuantityProduct)\n/* harmony export */ });\nconst cartObject={\"success\":true,\"data\":{\"id\":\"64c38597d8f95\",\"total\":0,\"discountTotal\":0,\"totalProducts\":0,\"totalQuantity\":0,\"products\":[]}};\r\n\r\nasync function  getCart(){\r\n    const response= await fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95',{\r\n        method:'GET'\r\n    });\r\n    const json=await response.json();\r\n    return json;\r\n}\r\nasync function addProductToCart(productId,quantity){\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95`,{\r\n        method:'POST',\r\n        headers: { 'Content-Type': 'application/json' },\r\n        body: JSON.stringify({\"products\":[{\"id\":productId,\"quantity\":quantity}]}),\r\n    }).then(response=>response.json()).then((json)=>{\r\n        console.log(json);\r\n        return json;\r\n    });\r\n\r\n}\r\nasync function removeProductFromCart(productId){\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95?products[]=${productId}`,{\r\n        method:'DELETE',\r\n        headers: { 'Content-Type': 'application/json' },\r\n    }).then(response=>response.json()).then((json)=>{\r\n        console.log(json);\r\n        return json;\r\n    });\r\n}\r\n\r\nasync function updateQuantityProduct(productId,value){\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95`,{\r\n        method:'PUT',\r\n        headers: { 'Content-Type': 'application/json' },\r\n        body: JSON.stringify({\"products\":[{\"id\":productId,\"quantity\":value}]}),\r\n    }).then(response=>response.json()).then((json)=>{\r\n        console.log(json);\r\n        return json;\r\n    });\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/cart_api.js?");

/***/ }),

/***/ "./src/js/cart_script.js":
/*!*******************************!*\
  !*** ./src/js/cart_script.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   handleCartHoverEvent: () => (/* binding */ handleCartHoverEvent),\n/* harmony export */   loadCart: () => (/* binding */ loadCart)\n/* harmony export */ });\n/* harmony import */ var _product_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product_api */ \"./src/js/product_api.js\");\n/* harmony import */ var _cart_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart_api */ \"./src/js/cart_api.js\");\n/* harmony import */ var _main_products_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main_products_script */ \"./src/js/main_products_script.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main_products_script__WEBPACK_IMPORTED_MODULE_2__]);\n_main_products_script__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\nlet cartJson = await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.getCart)();\r\n\r\nasync function loadCart() {\r\n    updateCartCount();\r\n    updateCartTotalPrice();\r\n\r\n    //remove all cart items with the class .cart-item\r\n    const cartItemsNode = document.querySelector('.cart-products');\r\n    for (const cartItem of cartItemsNode.querySelectorAll('.cart-item')) {\r\n        cartItem.remove();\r\n    }\r\n\r\n    let cart = await getCartProducts();\r\n    for (let cartItem of cart) {\r\n        addNodeElementToCart(cartItem);\r\n    }\r\n\r\n\r\n}\r\n\r\nfunction handleCartHoverEvent() {\r\n    const cartNode = document.getElementById('cart');\r\n    const cartItemsNode = document.querySelector('#cart-items');\r\n    const cartProductsNode = document.querySelector('.cart-products');\r\n    cartNode.addEventListener('mouseover', () => {\r\n        cartItemsNode.style.display = 'flex';\r\n    });\r\n\r\n    cartItemsNode.addEventListener('mouseout', () => {\r\n        cartItemsNode.style.display = 'none';\r\n    });\r\n    cartProductsNode.addEventListener('mouseover', () => {\r\n        cartItemsNode.style.display = 'block';\r\n    });\r\n}\r\n\r\nasync function removeItemFromCart(productId) {\r\n    const cartItemNode = document.querySelector(`.cart-item[product_id=\"${productId}\"]`);\r\n    const cartItemCount = cartItemNode.querySelector('.cart-item-count');\r\n    const count = parseInt(cartItemCount.innerText.split('x')[1]);\r\n    if (count > 1) {\r\n        //TODO: update price accordingly\r\n        (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.updateQuantityProduct)(productId, -1).then(() => {\r\n            updateCountForItem(productId, -1);\r\n            updateCartTotalPrice();\r\n            updateCartCount();\r\n        });\r\n    } else {\r\n        cartItemNode.remove();\r\n        (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.removeProductFromCart)(productId).then(() => {\r\n            updateCartTotalPrice();\r\n        }).then(() => {\r\n            updateCartCount();\r\n        });\r\n    }\r\n\r\n\r\n}\r\n\r\nfunction addNodeElementToCart(jsonItem) {\r\n    console.log(jsonItem);\r\n    const cartContainer = document.querySelector('.cart-products');\r\n    const cartItemNode = document.createElement('div');\r\n    const discountedPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);\r\n    const quantity = jsonItem.quantity ? jsonItem.quantity : 1;\r\n    cartItemNode.classList.add('cart-item');\r\n    cartItemNode.setAttribute('product_id', jsonItem.id);\r\n    cartItemNode.innerHTML = `\r\n        <div class=\"cart-item-thumbnail-container\">\r\n            <img src=\"${jsonItem.thumbnail}\" alt=\"item thumbnail\" class=\"cart-item-thumbnail\">\r\n        </div>\r\n        <div class=\"cart-item-info-container\">\r\n            <span class=\"cart-title-wrapper\">\r\n                <span class=\"cart-item-title\">  ${jsonItem.title}</span>\r\n                <span class=\"cart-item-count\" product_id=\"${jsonItem.id}\"> x${quantity}</span>\r\n            </span>\r\n            <p class=\"cart-item-price\"> <s>$${jsonItem.price * quantity}</s> $${discountedPrice.toFixed(2)}</p>\r\n            <button class=\"remove-from-cart-btn\" product_id=\"${jsonItem.id}\">Remove</button>\r\n        </div>\r\n        `;\r\n\r\n    cartItemNode.querySelector('.cart-item-thumbnail-container').addEventListener('click', (event) => {\r\n        const url = `product.html?id=${jsonItem.id}`;\r\n        window.open(url, '_blank');\r\n    });\r\n\r\n    cartItemNode.querySelector('.remove-from-cart-btn').addEventListener('click', (event) => {\r\n        removeItemFromCart(jsonItem.id);\r\n    });\r\n    cartContainer.appendChild(cartItemNode);\r\n}\r\n\r\nasync function getCartProducts() {\r\n    const products = (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.getCart)().then((json) => {\r\n        return Object.values(json.products);\r\n    });\r\n    return products;\r\n}\r\n\r\nasync function updateCartTotalPrice() {\r\n    let cartJson = await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.getCart)();\r\n\r\n    const totalPriceNode = document.querySelector('.cart-total');\r\n    const cartItemsNode = document.querySelector('.cart-products');\r\n    if (cartJson.products.length === 0) {\r\n        cartItemsNode.style.paddingBottom = '0';\r\n        totalPriceNode.style.display = 'none';\r\n        return;\r\n    }\r\n    cartItemsNode.style.paddingBottom = '3rem';\r\n    totalPriceNode.style.display = 'block';\r\n\r\n    let totalPrice = cartJson.total;\r\n    totalPriceNode.innerHTML = `<p>Total: <s>$${totalPrice}</s> $${cartJson.discountTotal.toFixed(2)}</p>`;\r\n}\r\n\r\nfunction addToCart(productId) {\r\n    (0,_product_api__WEBPACK_IMPORTED_MODULE_0__.getItemById)(productId).then(async (jsonItem) => {\r\n        let cart = await getCartProducts();\r\n        if (!cart.find(item => item.id === jsonItem.id)) {\r\n            addNodeElementToCart(jsonItem);\r\n        } else {\r\n            updateCountForItem(productId, 1);\r\n        }\r\n        (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.addProductToCart)(jsonItem.id, 1).then(() => {\r\n            updateCartTotalPrice();\r\n            updateCartCount();\r\n        });\r\n\r\n    });\r\n}\r\n\r\nfunction updateCartCount() {\r\n    const cartCount = document.getElementById('cart-count');\r\n    (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.getCart)().then((json) => {\r\n        cartCount.innerText = String(json.totalQuantity);\r\n    });\r\n}\r\n\r\nfunction updateCountForItem(productId, value) {\r\n    const cartItemNode = document.querySelector(`.cart-item-count[product_id=\"${productId}\"]`);\r\n    const count = parseInt(cartItemNode.innerText.split('x')[1]);\r\n    cartItemNode.innerText = ` x${count + value}`;\r\n}\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/cart_script.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _sass_product_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sass/product_styles.scss */ \"./src/sass/product_styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n/* harmony import */ var _main_products_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main_products_script */ \"./src/js/main_products_script.js\");\n/* harmony import */ var _cart_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cart_script */ \"./src/js/cart_script.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main_products_script__WEBPACK_IMPORTED_MODULE_3__, _cart_script__WEBPACK_IMPORTED_MODULE_4__]);\n([_main_products_script__WEBPACK_IMPORTED_MODULE_3__, _cart_script__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\r\n\r\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_2__.init)();\r\n(0,_main_products_script__WEBPACK_IMPORTED_MODULE_3__.loadItems)().catch((error)=>{\r\n    document.querySelector(\"main\").innerHTML='ERROR 404';\r\n});\r\n(0,_cart_script__WEBPACK_IMPORTED_MODULE_4__.loadCart)();\r\n(0,_cart_script__WEBPACK_IMPORTED_MODULE_4__.handleCartHoverEvent)();\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

/***/ }),

/***/ "./src/js/main_products_script.js":
/*!****************************************!*\
  !*** ./src/js/main_products_script.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadItems: () => (/* binding */ loadItems)\n/* harmony export */ });\n/* harmony import */ var _cart_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart_script.js */ \"./src/js/cart_script.js\");\n/* harmony import */ var _product_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product_api.js */ \"./src/js/product_api.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cart_script_js__WEBPACK_IMPORTED_MODULE_0__]);\n_cart_script_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\nfunction getHtmlNodeItem(jsonItem){\r\n\r\n    if (!jsonItem.currentImageIndex)\r\n        jsonItem['currentImageIndex']=0;\r\n\r\n    const itemNode=document.createElement('div');\r\n    itemNode.classList.add('item');\r\n    // const discountPrice=jsonItem.price-jsonItem.price*(jsonItem.discountPercentage/100);\r\n    const discountPrice=jsonItem.price*(1-jsonItem.discountPercentage/100);\r\n    itemNode.innerHTML=`\r\n\r\n        \r\n       <div class=\"item_thumbnail_container\" product-id=\"${jsonItem.id}\">\r\n          \r\n           <img class=\"item_thumbnail\" src=\"${jsonItem.thumbnail}\" alt=\"${jsonItem.title}\" loading=\"lazy\">\r\n       </div>\r\n\r\n    \r\n    <div class=\"item_info_container\">\r\n        <div class=\"item_main_info\">\r\n            <p class=\"item_title\">${jsonItem.title}</p>\r\n            <p class=\"item_price\"><s>$${jsonItem.price}</s> $${discountPrice.toFixed(2)}</p>\r\n        </div>\r\n     <div class=\"item_secondary_info\">\r\n        <p class=\"item_rating\">Rating: ${jsonItem.rating}/5</p>\r\n        <button class=\"add_to_cart_btn\" product-id=\"${jsonItem.id}\" event-set=\"false\">Add to cart</button> <!--\"product id\" may be without quotes-->\r\n        \r\n    </div>\r\n    \r\n    </div>\r\n    `;\r\n\r\n    return itemNode;\r\n}\r\nfunction showNotification(message){\r\n    const notification=document.getElementById('notification');\r\n    const notificationParent=document.getElementsByClassName('notification-container')[0];\r\n    notificationParent.style.visibility='visible';\r\n    notification.innerHTML=message;\r\n    setTimeout(()=>{\r\n        notificationParent.style.visibility='hidden';\r\n    },5000);\r\n}\r\nfunction handleButtonEvents(){\r\n    const buttons=document.getElementsByClassName('add_to_cart_btn');\r\n    for (const btn of buttons){\r\n        if (btn.getAttribute('event-set')==='false')\r\n            btn.addEventListener('click',(event)=>{\r\n                const productId=event.target.getAttribute(\"product-id\");\r\n                (0,_cart_script_js__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId);\r\n\r\n                showNotification(\"Added to cart\");\r\n                btn.innerHTML='Added to cart';\r\n                btn.style.backgroundColor='#d0ffd3';\r\n                btn.setAttribute('disabled','true');\r\n                setTimeout(() => {\r\n                    btn.innerHTML = 'Add to cart';\r\n                    btn.style.backgroundColor = '#f5f5f5';\r\n                    btn.removeAttribute('disabled');\r\n                }, 5000);\r\n            });\r\n\r\n    }\r\n    const loadMoreButton=document.querySelector('.load-more-btn');\r\n    loadMoreButton.addEventListener('click',loadItems);\r\n}\r\n\r\nasync function loadItems(){\r\n\r\n    const shopContainer=document.getElementsByClassName('shop-items')[0];\r\n    const items=await (0,_product_api_js__WEBPACK_IMPORTED_MODULE_1__.getItems)();\r\n    for (const item of items){\r\n        const itemNode=getHtmlNodeItem(item);\r\n        const thumbnailContainer=itemNode.getElementsByClassName('item_thumbnail_container')[0];\r\n        thumbnailContainer.addEventListener('click',()=>{\r\n            const url=`product.html?id=${item.id}`;\r\n            window.open(url,'_blank');\r\n        });\r\n        shopContainer.appendChild(itemNode);\r\n\r\n    }\r\n    // for (let index=0; index<30; index++){\r\n    //     shopContainer.appendChild(getHtmlNodeItem(sampleItem))\r\n    // }\r\n\r\n    handleButtonEvents();\r\n}\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://internship-2023/./src/js/main_products_script.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;