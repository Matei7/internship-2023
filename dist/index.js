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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   addToCartPopUp: () => (/* binding */ addToCartPopUp),\n/* harmony export */   deleteFromCart: () => (/* binding */ deleteFromCart),\n/* harmony export */   getProducts: () => (/* binding */ getProducts),\n/* harmony export */   hoverCart: () => (/* binding */ hoverCart),\n/* harmony export */   hoverItem: () => (/* binding */ hoverItem),\n/* harmony export */   initCart: () => (/* binding */ initCart),\n/* harmony export */   nextImageEvent: () => (/* binding */ nextImageEvent),\n/* harmony export */   removeFromCart: () => (/* binding */ removeFromCart),\n/* harmony export */   shoppingCartCount: () => (/* binding */ shoppingCartCount)\n/* harmony export */ });\nlet products = [];\r\nlet skipPagination = 0;\r\nlet limitPagination = 6;\r\nconst API_CART_ID = '64c3aa50d27ba';\r\n\r\nconst cartItems = document.querySelector('.cart-items');\r\nlet cartData;\r\nlet cartQuantity = 0;\r\nfunction createProducts(productsJSON) {\r\n    const productsContainer = document.querySelector('.products');\r\n    for (const product of productsJSON.products) {\r\n        const productContainer = document.createElement('div');\r\n        productContainer.classList.add('products-item');\r\n\r\n        const title = document.createElement('h2');\r\n        title.innerText = product.title;\r\n        title.classList.add('product-title');\r\n\r\n        const imagesContainer = document.createElement('div');\r\n        imagesContainer.classList.add('product-images');\r\n\r\n        for (const imageSrc of product.images) {\r\n            const image = document.createElement('img');\r\n            image.setAttribute('src', imageSrc);\r\n            image.setAttribute('alt', product.title + \"image\");\r\n            image.classList.add('product-image');\r\n            image.style.display = 'none';\r\n            imagesContainer.appendChild(image);\r\n        }\r\n        imagesContainer.firstElementChild.style.display = 'block';\r\n        const arrowLeft = document.createElement('div');\r\n        const arrowRight = document.createElement('div');\r\n        arrowLeft.classList.add('arrow-left');\r\n        arrowRight.classList.add('arrow-right');\r\n\r\n        const brand = document.createElement('h3');\r\n        brand.innerText = `Made by ${product.brand}`;\r\n        brand.classList.add('product-brand');\r\n\r\n        const category = document.createElement('h5');\r\n        category.innerText = `Category: ${product.category}`;\r\n        category.classList.add('product-category');\r\n\r\n        const description = document.createElement('p');\r\n        description.innerText = product.description;\r\n        description.classList.add('product-description');\r\n\r\n        const discountPercentage = document.createElement('p');\r\n        const lastPrice = Math.floor(product.price + product.price * product.discountPercentage / 100);\r\n        discountPercentage.innerText = `$${lastPrice}`;\r\n        discountPercentage.classList.add('product-discount-percentage');\r\n\r\n        productContainer.setAttribute('data-id', product.id);\r\n\r\n        const price = document.createElement('h3');\r\n        price.innerText = `$${product.price}`;\r\n        price.classList.add('product-price');\r\n\r\n        // <p className=\"item-rating\">Rating: <div className=\"star-rating\"\r\n        //                                         style=\"--rating: ${productRating};\"></div> ${productRating}/5.00</p>\r\n        const rating = document.createElement('h3');\r\n        const starRating = document.createElement('span')\r\n        starRating.classList.add('star-rating');\r\n        starRating.style.setProperty('--rating', product.rating);\r\n        rating.classList.add('product-rating');\r\n        rating.appendChild(starRating);\r\n        rating.innerHTML += ` ${product.rating}`;\r\n\r\n        const stock = document.createElement('h3');\r\n        stock.innerText = `Available: ${product.stock}`;\r\n        stock.classList.add('product-stock');\r\n\r\n        const button = document.createElement('button');\r\n        button.classList.add('product-button');\r\n        button.innerText = 'Add to cart';\r\n\r\n        productContainer.appendChild(imagesContainer);\r\n        productContainer.appendChild(arrowLeft);\r\n        productContainer.appendChild(arrowRight);\r\n        productContainer.appendChild(title);\r\n        productContainer.appendChild(brand);\r\n        productContainer.appendChild(category);\r\n        productContainer.appendChild(rating);\r\n        productContainer.appendChild(stock);\r\n        productContainer.appendChild(description);\r\n        productContainer.appendChild(discountPercentage);\r\n        productContainer.appendChild(price);\r\n        productContainer.appendChild(button);\r\n        productsContainer.appendChild(productContainer);\r\n    }\r\n}\r\n\r\nasync function getProducts() {\r\n    const API_GET_PRODUCTS_URL = `https://dummyjson.com/products?limit=${limitPagination}&skip=${skipPagination}&select=id,title,brand,category,description,price,stock,rating,discountPercentage,images`\r\n    const response = await fetch(API_GET_PRODUCTS_URL);\r\n    const productsJSON = await response.json();\r\n    createProducts(productsJSON);\r\n    products = products.concat(productsJSON.products);\r\n    skipPagination += limitPagination;\r\n}\r\n\r\nlet total = 0;\r\n\r\nfunction shoppingCartCount() {\r\n    const shoppingCartCount = document.querySelector('.shopping-cart-count');\r\n    if (cartQuantity === 0) {\r\n        shoppingCartCount.style.display = 'none';\r\n        return;\r\n    }\r\n    shoppingCartCount.innerText = cartQuantity;\r\n    shoppingCartCount.style.display = 'flex';\r\n}\r\n\r\nfunction addToCartPopUp() {\r\n    const buttons = document.querySelectorAll('.product-button:not([data-event=\"true\"])');\r\n    const popUp = document.querySelector('.pop-up');\r\n    buttons.forEach(button => {\r\n        button.setAttribute('data-event', 'true');\r\n        button.addEventListener('click', () => {\r\n            popUp.style.display = 'flex';\r\n            const id = button.parentElement.getAttribute('data-id');\r\n            if (cartData.products.find(product => product.id === id)) {\r\n                const item = cartItems.querySelector(`[data-id=\"${id}\"]`);\r\n                const itemCounter = item.querySelector('h3');\r\n                itemCounter.innerText = `x${cartData.products.find(product => product.id === id).quantity}`;\r\n            } else {\r\n                const cartItem = document.createElement('div');\r\n                cartItem.setAttribute('data-id', id);\r\n                cartItem.classList.add('cart-item');\r\n                const product = products[id - 1];\r\n                const counter = document.createElement('h3')\r\n                counter.innerText = 'x1'\r\n                const title = document.createElement('h3');\r\n                title.innerText = product.title;\r\n                title.classList.add('cart-item-title');\r\n                const image = document.createElement('img');\r\n                image.setAttribute('src', product.images[0]);\r\n                image.setAttribute('alt', product.title + \"image\");\r\n                image.classList.add('cart-item-image');\r\n                const price = document.createElement('h3');\r\n                price.innerText = `$${product.price}`;\r\n                price.classList.add('cart-item-price');\r\n                const removeButton = document.createElement('button');\r\n                removeButton.innerText = 'X';\r\n                removeButton.classList.add('cart-item-remove');\r\n                removeButton.addEventListener('click', () => {\r\n                    if (cartData.products.find(product => product.id === id).quantity > 1) {\r\n                        const cartItems = document.querySelector('.cart-items');\r\n                        const item = cartItems.querySelector(`[data-id=\"${id}\"]`);\r\n                        const itemCounter = item.querySelector('h3');\r\n                        itemCounter.innerText = `x${cartData.products.find(product => product.id === id).quantity - 1}`;\r\n                        addToTotal(total-products[id - 1].price);\r\n                        removeFromCart(id).then(\r\n                            () => {\r\n                                shoppingCartCount();\r\n                            });\r\n                    } else {\r\n                        const cartItems = document.querySelector('.cart-items');\r\n                        const item = cartItems.querySelector(`[data-id=\"${id}\"]`);\r\n                        cartItems.removeChild(item);\r\n                        addToTotal(total-products[id - 1].price);\r\n                        deleteFromCart(id).then(\r\n                            () => {\r\n                                shoppingCartCount();\r\n                            });\r\n                    }\r\n                });\r\n                cartItem.appendChild(image);\r\n                cartItem.appendChild(counter);\r\n                cartItem.appendChild(title);\r\n                cartItem.appendChild(price);\r\n                cartItem.appendChild(removeButton);\r\n                cartItems.appendChild(cartItem);\r\n\r\n                addToCart(id).then(\r\n                    () => {\r\n                        shoppingCartCount();\r\n                    }\r\n                );\r\n            }\r\n            addToTotal(total+products[id - 1].price);\r\n            button.innerText = 'Added to cart';\r\n            setTimeout(() => {\r\n                popUp.style.display = 'none';\r\n                button.innerText = 'Add to cart';\r\n            }, 2000);\r\n        });\r\n    });\r\n}\r\n\r\nfunction nextImage(image) {\r\n    const parent = image.parentElement;\r\n    const nextImage = image.nextElementSibling;\r\n    if (nextImage) {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        nextImage.style.display = 'block';\r\n        nextImage.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    } else {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        parent.firstElementChild.style.display = 'block';\r\n        parent.firstElementChild.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    }\r\n}\r\n\r\nfunction previousImage(image) {\r\n    const parent = image.parentElement;\r\n    const previousImage = image.previousElementSibling;\r\n    if (previousImage) {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        previousImage.style.display = 'block';\r\n        previousImage.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    } else {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        parent.lastElementChild.style.display = 'block';\r\n        parent.lastElementChild.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    }\r\n}\r\n\r\nfunction calculateClickPosition(image, event) {\r\n    const clickX = event.clientX - image.getBoundingClientRect().left;\r\n    const containerWidth = image.clientWidth;\r\n    const clickPercentage = (clickX / containerWidth) * 100;\r\n    const threshold = 50;\r\n    if (clickPercentage >= threshold) {\r\n        nextImage(image);\r\n    } else if (clickPercentage < threshold) {\r\n        previousImage(image);\r\n    }\r\n}\r\n\r\nfunction nextImageEvent() {\r\n    const images = document.querySelectorAll('.product-image:not([data-event=\"true\"])');\r\n    images.forEach(image => {\r\n        image.setAttribute('data-event', 'true');\r\n        image.addEventListener('click', (event) => {\r\n            calculateClickPosition(image, event);\r\n        });\r\n    });\r\n}\r\n\r\nfunction hoverItem() {\r\n    const items = document.querySelectorAll('.products-item:not([data-event=\"true\"])');\r\n\r\n    const handleKeyDown = (event) => {\r\n        const hoveredItem = document.querySelector('.hovered');\r\n        const currentImage = hoveredItem.querySelector('.product-image[style*=\"display: block\"]');\r\n        if (event.key === 'ArrowRight') {\r\n            nextImage(currentImage);\r\n        }\r\n        if (event.key === 'ArrowLeft') {\r\n            previousImage(currentImage);\r\n        }\r\n    }\r\n\r\n    const handleClickOnArrow = (event) => {\r\n        const hoveredItem = document.querySelector('.hovered');\r\n        const currentImage = hoveredItem.querySelector('.product-image[style*=\"display: block\"]');\r\n        if (event.target.classList.contains('arrow-right')) {\r\n            nextImage(currentImage);\r\n        }\r\n        if (event.target.classList.contains('arrow-left')) {\r\n            previousImage(currentImage);\r\n        }\r\n    }\r\n\r\n    items.forEach(item => {\r\n        item.setAttribute('data-event', 'true');\r\n        item.addEventListener('mouseover', () => {\r\n            item.style.transform = 'scale(1.01)';\r\n            item.classList.add('hovered');\r\n            document.addEventListener('keydown', handleKeyDown);\r\n            item.addEventListener('click', handleClickOnArrow);\r\n        });\r\n        item.addEventListener('mouseout', () => {\r\n            item.style.transform = 'scale(1)';\r\n            item.classList.remove('hovered');\r\n            document.removeEventListener('keydown', handleKeyDown);\r\n            item.removeEventListener('click', handleClickOnArrow);\r\n        });\r\n    });\r\n}\r\n\r\nfunction hoverCart() {\r\n    const cart = document.querySelector('.shopping-cart');\r\n    const cartItems = cart.querySelector('.cart-items');\r\n    cart.addEventListener('mouseover', () => {\r\n        cartItems.style.display = 'flex';\r\n    });\r\n    cart.addEventListener('mouseout', () => {\r\n        cartItems.style.display = 'none';\r\n    });\r\n}\r\n\r\nconst hideLoader = () => {\r\n    const loader = document.querySelector('.loader');\r\n    loader.style.opacity = '0';\r\n};\r\nconst showLoader = () => {\r\n    const loader = document.querySelector('.loader');\r\n    loader.style.opacity = '1';\r\n};\r\n\r\nwindow.addEventListener('scroll', () => {\r\n    const {\r\n        scrollTop,\r\n        scrollHeight,\r\n        clientHeight\r\n    } = document.documentElement;\r\n    if (scrollTop + clientHeight >= scrollHeight - 5 && products.length < 100) {\r\n        showLoader();\r\n        getProducts().then(() => {\r\n            hideLoader();\r\n            addToCartPopUp();\r\n            nextImageEvent();\r\n            hoverItem();\r\n        });\r\n    }\r\n}, {passive: true});\r\n\r\nasync function addToCart(productID) {\r\n    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`, {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\r\n            userId: 1,\r\n            products: [\r\n                {\r\n                    id: productID,\r\n                    quantity: 1\r\n                }]\r\n        })\r\n    }).then(res => res.json())\r\n}\r\n\r\nasync function removeFromCart(productID) {\r\n    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`, {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\r\n            userId: 1,\r\n            products: [\r\n                {\r\n                    id: productID,\r\n                    quantity: -1\r\n                }]\r\n        })\r\n    })\r\n        .then(res => res.json())\r\n}\r\n\r\nasync function deleteFromCart(productID) {\r\n    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}?products[]=${productID}`, {\r\n        method: 'DELETE',\r\n        headers: {'Content-Type': 'application/json'}\r\n    }).then(res => res.json())\r\n}\r\n\r\nasync function initCart() {\r\n    const API_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`;\r\n\r\n    const cart = await fetch(API_CART_GET);\r\n    cartData = await cart.json();\r\n    console.log(cartData);\r\n    for (const product of cartData.products) {\r\n        createItemInCart(product);\r\n    }\r\n    shoppingCartCount();\r\n    addToTotal(cartData.total);\r\n}\r\n\r\nfunction addToTotal(newTotal) {\r\n    total = newTotal;\r\n    const totalElement = document.querySelector('.cart-total');\r\n    totalElement.innerText = `TOTAL: $${newTotal}`;\r\n}\r\nfunction createItemInCart(product) {\r\n    const cartItem = document.createElement('div');\r\n    cartItem.setAttribute('data-id', product.id);\r\n    cartItem.classList.add('cart-item');\r\n\r\n    const counter = document.createElement('h3')\r\n    counter.innerText = `x${product.quantity}`;\r\n\r\n    const title = document.createElement('h3');\r\n    title.innerText = product.title;\r\n    title.classList.add('cart-item-title');\r\n\r\n    const image = document.createElement('img');\r\n    image.setAttribute('src', product.images[0]);\r\n    image.setAttribute('alt', product.title + \"image\");\r\n    image.classList.add('cart-item-image');\r\n\r\n    const price = document.createElement('h3');\r\n    price.innerText = `$${product.price}`;\r\n    price.classList.add('cart-item-price');\r\n\r\n    const removeButton = document.createElement('button');\r\n    removeButton.innerText = 'X';\r\n    removeButton.classList.add('cart-item-remove');\r\n    removeButton.addEventListener('click', () => {\r\n        if (product.quantity > 1) {\r\n            const item = cartItems.querySelector(`[data-id=\"${product.id}\"]`);\r\n            const itemCounter = item.querySelector('h3');\r\n            itemCounter.innerText = `x${product.quantity - 1}`;\r\n            removeFromCart(product.id).then(\r\n                () => {\r\n                    addToTotal(total-product.price);\r\n                    shoppingCartCount();\r\n                });\r\n        } else {\r\n            const item = cartItems.querySelector(`[data-id=\"${product.id}\"]`);\r\n            cartItems.removeChild(item);\r\n            deleteFromCart(product.id).then(\r\n                () => {\r\n                    addToTotal(total-product.price);\r\n                    shoppingCartCount();\r\n                }\r\n            );\r\n        }\r\n    });\r\n    cartItem.appendChild(image);\r\n    cartItem.appendChild(counter);\r\n    cartItem.appendChild(title);\r\n    cartItem.appendChild(price);\r\n    cartItem.appendChild(removeButton);\r\n    cartItems.appendChild(cartItem);\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\r\n\r\n\r\nawait (0,_app__WEBPACK_IMPORTED_MODULE_1__.getProducts)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.addToCartPopUp)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.nextImageEvent)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.hoverItem)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.hoverCart)();\r\nawait (0,_app__WEBPACK_IMPORTED_MODULE_1__.initCart)();\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

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