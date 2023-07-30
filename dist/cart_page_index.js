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

/***/ "./src/js/cart_api.js":
/*!****************************!*\
  !*** ./src/js/cart_api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCartAPI: () => (/* binding */ addToCartAPI),\n/* harmony export */   getCart: () => (/* binding */ getCart),\n/* harmony export */   removeFromCartAPI: () => (/* binding */ removeFromCartAPI),\n/* harmony export */   updateProductAPI: () => (/* binding */ updateProductAPI)\n/* harmony export */ });\nconst cartObject = {\r\n    \"success\": true,\r\n    \"data\": {\r\n        \"id\": \"64c38597d8f95\",\r\n        \"total\": 0,\r\n        \"discountTotal\": 0,\r\n        \"totalProducts\": 0,\r\n        \"totalQuantity\": 0,\r\n        \"products\": []\r\n    }\r\n};\r\n\r\nasync function getCart() {\r\n    const response = await fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95', {\r\n        method: 'GET'\r\n    });\r\n    const json = await response.json();\r\n    return json;\r\n}\r\n\r\nasync function addToCartAPI(productId, quantity) {\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95`, {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\"products\": [{\"id\": productId, \"quantity\": quantity}]}),\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n\r\n}\r\n\r\nasync function removeFromCartAPI(productId) {\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95?products[]=${productId}`, {\r\n        method: 'DELETE',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n}\r\n\r\nasync function updateProductAPI(productId, value) {\r\n    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95`, {\r\n        method: 'PUT',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\"products\": [{\"id\": productId, \"quantity\": value}]}),\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/cart_api.js?");

/***/ }),

/***/ "./src/js/cart_page_script.js":
/*!************************************!*\
  !*** ./src/js/cart_page_script.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart_script */ \"./src/js/cart_script.js\");\n/* harmony import */ var _cart_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart_api */ \"./src/js/cart_api.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cart_script__WEBPACK_IMPORTED_MODULE_0__]);\n_cart_script__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n(0,_cart_script__WEBPACK_IMPORTED_MODULE_0__.handleCartHoverEvent)();\r\n\r\nawait (0,_cart_script__WEBPACK_IMPORTED_MODULE_0__.loadCart)();\r\nlet cart = await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.getCart)();\r\n\r\nconsole.log(cart);\r\n\r\nfunction loadCartPage() {\r\n    const cartProductsContainer = document.querySelector(\".cartpage-products\");\r\n    for (const cartProduct of cart.products) {\r\n        let cartProductItem = document.createElement(\"div\");\r\n        cartProductItem.classList.add(\"cartpage-product\");\r\n        cartProductItem.setAttribute(\"product-id\", cartProduct.id);\r\n        cartProductItem.innerHTML = `\r\n            <div class=\"cartpage-product-image\">\r\n            <img src=\"${cartProduct.thumbnail}\" alt=\"${cartProduct.title}\">\r\n            </div>\r\n            <div class=\"cartpage-product-info\">\r\n                <div class=\"cartpage-product-name\">${cartProduct.title}</div>\r\n                <div class=\"cartpage-product-price\">$${cartProduct.discountedPrice.toFixed(2)}</div>\r\n                <div class=\"cartpage-product-controls\">\r\n                    <div class=\"lower-btn\" product-id=\"${cartProduct.id}\">&lt;</div>\r\n                    <div class=\"quantity\" product-id=\"${cartProduct.id}\">${cartProduct.quantity}</div>\r\n                    <div class=\"higher-btn\" product-id=\"${cartProduct.id}\">&gt;</div>\r\n                </div>\r\n            </div>`;\r\n        const lowerButtonForCurrentProduct = cartProductItem.querySelector(\".lower-btn\");\r\n        const higherButtonForCurrentProduct = cartProductItem.querySelector(\".higher-btn\");\r\n        lowerButtonForCurrentProduct.addEventListener(\"click\", async (event) => {\r\n            await updateCountForProduct(cartProduct.id, -1)\r\n        });\r\n        higherButtonForCurrentProduct.addEventListener(\"click\", async (event) => {\r\n            await updateCountForProduct(cartProduct.id, 1)\r\n        });\r\n        cartProductsContainer.appendChild(cartProductItem);\r\n    }\r\n\r\n    const total = document.createElement(\"div\");\r\n    total.classList.add(\"cartpage-total\");\r\n    total.innerHTML = `\r\n    <div class=\"total-price\">Total: $${cart.discountTotal.toFixed(2)}</div>`;\r\n    document.querySelector(\".checkout-button\").insertAdjacentElement(\"beforebegin\", total);\r\n}\r\n\r\nfunction updateCartpageTotalPrice() {\r\n    document.querySelector(\".total-price\").innerHTML = `Total: $${cart.discountTotal.toFixed(2)}`;\r\n}\r\n\r\nfunction updateCartCount() {\r\n}\r\n\r\nasync function updateCountForProduct(productId, value) {\r\n    const quantityNode = document.querySelector(`.quantity[product-id=\"${productId}\"]`);\r\n    if (Number(quantityNode.innerHTML) + value < 1) {\r\n        const product = document.querySelector(`.cartpage-product[product-id=\"${productId}\"]`);\r\n        product.remove();\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.removeFromCartAPI)(productId))['data'];\r\n    } else {\r\n        await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.updateProductAPI)(productId, value).then((json) => {\r\n            cart = json['data'];\r\n            console.log(quantityNode.innerHTML);\r\n            quantityNode.innerHTML = Number(quantityNode.innerHTML) + value;\r\n            updateCartpageTotalPrice();\r\n            (0,_cart_script__WEBPACK_IMPORTED_MODULE_0__.loadCart)(cart);\r\n        });\r\n    }\r\n    await (0,_cart_script__WEBPACK_IMPORTED_MODULE_0__.updateHeaderCartNumbers)(cart);\r\n}\r\n\r\nasync function removeAllItemsFromCart() {\r\n    const cartProducts = document.querySelectorAll(\".cartpage-product\");\r\n    for (const cartProduct of cartProducts) {\r\n        cartProduct.remove();\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.removeFromCartAPI)(cart.products[0].id))['data'];\r\n        updateCartpageTotalPrice();\r\n        await (0,_cart_script__WEBPACK_IMPORTED_MODULE_0__.updateHeaderCartNumbers)(cart);\r\n    }\r\n\r\n}\r\n\r\nasync function handleCheckoutButton() {\r\n    const checkoutButton = document.querySelector('.checkout-button');\r\n    checkoutButton.addEventListener('click', () => {\r\n        alert('Checkout button clicked');\r\n        //removeAllItemsFromCart();\r\n    });\r\n}\r\n\r\nloadCartPage();\r\nhandleCheckoutButton();\r\n\r\n\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/cart_page_script.js?");

/***/ }),

/***/ "./src/js/cart_script.js":
/*!*******************************!*\
  !*** ./src/js/cart_script.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   handleCartHoverEvent: () => (/* binding */ handleCartHoverEvent),\n/* harmony export */   loadCart: () => (/* binding */ loadCart),\n/* harmony export */   updateHeaderCartNumbers: () => (/* binding */ updateHeaderCartNumbers)\n/* harmony export */ });\n/* harmony import */ var _product_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product_api */ \"./src/js/product_api.js\");\n/* harmony import */ var _cart_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart_api */ \"./src/js/cart_api.js\");\n/* harmony import */ var _main_products_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main_products_script */ \"./src/js/main_products_script.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main_products_script__WEBPACK_IMPORTED_MODULE_2__]);\n_main_products_script__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\nlet cart = await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.getCart)();\r\n\r\nasync function loadCart(_cart=cart) {\r\n\r\n    for (let cartItem of _cart.products) {\r\n        let cartItemHTML = findItemInCartHTML(cartItem.id);\r\n        if (!cartItemHTML) {\r\n            addNodeElementToCart(cartItem);\r\n        } else {\r\n            const cartItemCount = cartItemHTML.querySelector('.cart-item-count');\r\n            const count = parseInt(cartItemCount.innerText.split('x')[1]);\r\n            if (count !== cartItem.quantity) {\r\n                cartItemCount.innerText = ` x${cartItem.quantity}`;\r\n            }\r\n        }\r\n    }\r\n    await updateCartTotalPrice();\r\n    await updateCartCount();\r\n\r\n\r\n}\r\n\r\nfunction handleCartHoverEvent() {\r\n    const cartNode = document.getElementById('cart');\r\n    const cartItemsNode = document.querySelector('#cart-items');\r\n    const cartProductsNode = document.querySelector('.cart-products');\r\n    cartNode.addEventListener('mouseover', () => {\r\n        cartItemsNode.style.display = 'flex';\r\n    });\r\n\r\n    cartItemsNode.addEventListener('mouseout', () => {\r\n        cartItemsNode.style.display = 'none';\r\n    });\r\n    cartProductsNode.addEventListener('mouseover', () => {\r\n        cartItemsNode.style.display = 'block';\r\n    });\r\n}\r\n\r\nasync function removeItemFromCart(productId) {\r\n    const cartItemNode = document.querySelector(`.cart-item[product_id=\"${productId}\"]`);\r\n    const cartItemCount = cartItemNode.querySelector('.cart-item-count');\r\n    const count = parseInt(cartItemCount.innerText.split('x')[1]);\r\n    if (count > 1) {\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.updateProductAPI)(productId, -1))['data'];\r\n        await updateCountForItem(productId, -1);\r\n    } else {\r\n        cartItemNode.remove();\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.removeFromCartAPI)(productId))['data'];\r\n    }\r\n    await updateCartTotalPrice();\r\n    await updateCartCount();\r\n\r\n}\r\n\r\nfunction findItemInCartHTML(productId) {\r\n    return document.querySelector(`.cart-item[product_id=\"${productId}\"]`);\r\n\r\n}\r\n\r\nfunction addNodeElementToCart(jsonItem) {\r\n    const cartContainer = document.querySelector('.cart-products');\r\n    const cartItemNode = document.createElement('div');\r\n    const discountedPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);\r\n    const quantity = jsonItem.quantity ? jsonItem.quantity : 1;\r\n\r\n\r\n    cartItemNode.classList.add('cart-item');\r\n    cartItemNode.setAttribute('product_id', jsonItem.id);\r\n    cartItemNode.innerHTML = `\r\n        <div class=\"cart-item-thumbnail-container\">\r\n            <img src=\"${jsonItem.thumbnail}\" alt=\"item thumbnail\" class=\"cart-item-thumbnail\">\r\n        </div>\r\n        <div class=\"cart-item-info-container\">\r\n            <span class=\"cart-title-wrapper\">\r\n                <span class=\"cart-item-title\">  ${jsonItem.title}</span>\r\n                <span class=\"cart-item-count\" product_id=\"${jsonItem.id}\"> x${quantity}</span>\r\n            </span>\r\n            <p class=\"cart-item-price\"> <s>$${jsonItem.price * quantity}</s> $${discountedPrice.toFixed(2)}</p>\r\n            <button class=\"remove-from-cart-btn\" product_id=\"${jsonItem.id}\">Remove</button>\r\n        </div>\r\n        `;\r\n\r\n    cartItemNode.querySelector('.cart-item-thumbnail-container').addEventListener('click', (event) => {\r\n        const url = `product.html?id=${jsonItem.id}`;\r\n        window.open(url, '_blank');\r\n    });\r\n\r\n    cartItemNode.querySelector('.remove-from-cart-btn').addEventListener('click', async (event) => {\r\n        await removeItemFromCart(jsonItem.id);\r\n    });\r\n    cartContainer.appendChild(cartItemNode);\r\n}\r\nasync function updateHeaderCartNumbers(_cart=cart){\r\n    await updateCartTotalPrice(_cart);\r\n    await updateCartCount(_cart);\r\n}\r\nasync function updateCartTotalPrice(_cart=cart){\r\n    const totalPriceNode = document.querySelector('.cart-total');\r\n    const cartItemsNode = document.querySelector('.cart-products');\r\n    if (_cart.products.length === 0) {\r\n        cartItemsNode.style.paddingBottom = '0';\r\n        totalPriceNode.style.display = 'none';\r\n        return;\r\n    }\r\n    cartItemsNode.style.paddingBottom = '3rem';\r\n    totalPriceNode.style.display = 'block';\r\n\r\n    let totalPrice = cart.total;\r\n    totalPriceNode.innerHTML = `<p>Total: <s>$${totalPrice}</s> $${cart.discountTotal.toFixed(2)}</p>`;\r\n}\r\n\r\nasync function addToCart(productId) {\r\n    cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.addToCartAPI)(productId, 1))['data']; //update cart\r\n    await loadCart();\r\n}\r\n\r\nasync function updateCartCount(_cart=cart) {\r\n    let count = 0;\r\n    for (const cartItem of _cart.products) {\r\n        count += cartItem.quantity;\r\n    }\r\n    const cartCount = document.getElementById('cart-count');\r\n    cartCount.innerText = String(count);\r\n\r\n\r\n}\r\n\r\nfunction updateCountForItem(productId, value) {\r\n    const cartItemNode = document.querySelector(`.cart-item-count[product_id=\"${productId}\"]`);\r\n    const count = parseInt(cartItemNode.innerText.split('x')[1]);\r\n    cartItemNode.innerText = ` x${count + value}`;\r\n}\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/cart_script.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/cart_page_script.js");
/******/ 	
/******/ })()
;