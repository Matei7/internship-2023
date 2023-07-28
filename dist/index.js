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

/***/ "./src/sass/check-out.scss":
/*!*********************************!*\
  !*** ./src/sass/check-out.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://internship-2023/./src/sass/check-out.scss?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addAddToCardBtnListener: () => (/* binding */ addAddToCardBtnListener),\n/* harmony export */   getTotalProductsInPage: () => (/* binding */ getTotalProductsInPage),\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _createProduct_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProduct.js */ \"./src/js/createProduct.js\");\n/* harmony import */ var _galleryFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./galleryFunctions */ \"./src/js/galleryFunctions.js\");\n\r\n\r\n\r\nlet totalProductsInPage=0;\r\nlet totalProductsInCart;\r\nlet mainContainer = document.querySelector(\".product-grid\");\r\n\r\nfunction getTotalProductsInPage(){\r\n    return totalProductsInPage;\r\n}\r\n\r\nfunction getHowManyProductsInCart() {\r\n    fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0')\r\n        .then(response => response.json())\r\n        .then(data => {\r\n            totalProductsInCart = data.totalQuantity;\r\n            if (data.totalQuantity>0) {\r\n                for (const product of data.products) {\r\n                    updateCartItemsContainer();\r\n                }\r\n                 console.log(totalProductsInCart);\r\n                cart.textContent = `Cart: ${totalProductsInCart} Products`;//intrebare? imi face intarziere si nu pe loc update\r\n            }\r\n        });\r\n}\r\n\r\nfunction loadProductsInPage() {\r\n    fetch(`https://dummyjson.com/products?limit=9&skip=${totalProductsInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`)\r\n        .then(response => {\r\n            if (!response.ok) {\r\n                throw new Error(`Request failed with status ${response.status}`);\r\n            }\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            const productsDummy = data.products;\r\n            productsDummy.forEach(product => {\r\n                const cardElement = (0,_createProduct_js__WEBPACK_IMPORTED_MODULE_0__.createCard)(product);\r\n                addAddToCardBtnListener(cardElement);\r\n                mainContainer.appendChild(cardElement);\r\n            });\r\n            totalProductsInPage += 9;\r\n        })\r\n        .catch(error => {\r\n            console.error(\"Error loading products:\", error);\r\n            throw error;\r\n        });\r\n}\r\n\r\nfunction fetchCartProducts() {\r\n    return fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {\r\n        method: 'GET',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n        }\r\n    })\r\n        .then(response => {\r\n            if (!response.ok) {\r\n                throw new Error(`Request failed with status ${response.status}`);\r\n            }\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            return data.products;\r\n        })\r\n        .catch(error => {\r\n            console.error('Error fetching cart products:', error);\r\n            return [];\r\n        });\r\n}\r\n\r\n\r\nfunction updateCartItemsContainer() {\r\n    fetchCartProducts()\r\n        .then(productsFromCart => {\r\n            const cart = document.getElementById(\"cart\");\r\n            for (const product of productsFromCart) {\r\n                if (document.querySelector(`.item-box[data-id=\"${product.id}\"]`) != null) {\r\n                    const itemBox = document.querySelector(`.item-box[data-id=\"${product.id}\"]`);\r\n                    const itemQuantity = itemBox.querySelector(\".item-box-number\");\r\n                    const itemTotalPrice = itemBox.querySelector(\".item-box-total\");\r\n                    itemQuantity.textContent = product.quantity;\r\n                    itemTotalPrice.textContent = `$${(product.quantity * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;\r\n                } else {\r\n                    let cartList = document.getElementsByClassName(\"cart-window-list\");\r\n                    const itemBox = document.createElement(\"div\");\r\n                    itemBox.classList.add(\"item-box\");\r\n                    itemBox.setAttribute(\"data-id\", product.id);\r\n                    const itemImage = document.createElement(\"img\");\r\n                    itemImage.classList.add(\"item-box__image\");\r\n                    itemImage.src = product.thumbnail;\r\n                    itemImage.alt = product.title;\r\n                    const itemTitle = document.createElement(\"p\");\r\n                    itemTitle.classList.add(\"item-box-title\");\r\n                    itemTitle.textContent = product.title;\r\n                    const itemPrice = document.createElement(\"p\");\r\n                    itemPrice.classList.add(\"item-box-price\");\r\n                    itemPrice.textContent = `$${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}`;\r\n                    const itemQuantity = document.createElement(\"p\");\r\n                    itemQuantity.classList.add(\"item-box-number\");\r\n                    itemQuantity.textContent = product.quantity;\r\n                    const itemTotalPrice = document.createElement(\"p\");\r\n                    itemTotalPrice.classList.add(\"item-box-total\");\r\n\r\n                    itemTotalPrice.textContent = `$${(product.quantity * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;\r\n                    itemBox.appendChild(itemImage);\r\n                    itemBox.appendChild(itemTitle);\r\n                    itemBox.appendChild(itemPrice);\r\n                    itemBox.appendChild(itemQuantity);\r\n                    itemBox.appendChild(itemTotalPrice);\r\n                    cartList[0].appendChild(itemBox);\r\n                }\r\n            }\r\n        })\r\n        .catch(error => {\r\n            console.error('Error updating cart items:', error);\r\n        });\r\n}\r\n\r\nfunction showPopUp() {\r\n    const popUp = document.createElement(\"div\");\r\n    popUp.classList.add(\"pop-up\");\r\n    popUp.textContent = \"Product added successfully\";\r\n    const bodyElem = document.querySelector(\"body\");\r\n    bodyElem.appendChild(popUp);\r\n}\r\n\r\nfunction addProductInCartRequest(cardElement) {\r\n    const productId = Number(cardElement.dataset.id);\r\n    fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {\r\n        method: 'POST',\r\n        headers: { 'Content-Type': 'application/json',\r\n            },\r\n        body: JSON.stringify({\r\n            products: [\r\n                {\r\n                    id: productId,\r\n                    quantity: 1,\r\n                }\r\n            ]\r\n        })\r\n    })\r\n        .then(res => res.json())\r\n        .then(console.log);\r\n\r\n    getHowManyProductsInCart();\r\n}\r\n\r\nfunction addAddToCardBtnListener(product) {\r\n    let btnAddToCart = product.querySelector(\".product-grid__product-card__add-to-cart-button\");\r\n    btnAddToCart.addEventListener(\"click\", function () {\r\n        const initialColor = btnAddToCart.style.backgroundColor;\r\n        const initialText = btnAddToCart.textContent;\r\n        btnAddToCart.style.backgroundColor = \"#023020\";\r\n        btnAddToCart.textContent = \"Added to cart\";\r\n        btnAddToCart.style.scale = \"1.3\";\r\n        addProductInCartRequest(product);\r\n        showPopUp();\r\n        setTimeout(function () {\r\n            btnAddToCart.style.backgroundColor = initialColor;\r\n            btnAddToCart.textContent = initialText;\r\n            btnAddToCart.style.scale = \"1\";\r\n            const bodyElement = document.querySelector(\"body\");\r\n            bodyElement.removeChild(bodyElement.lastChild);\r\n        }, 3000);\r\n    });\r\n}\r\n\r\n\r\nfunction init() {\r\n    getHowManyProductsInCart();\r\n    loadProductsInPage();\r\n\t(0,_galleryFunctions__WEBPACK_IMPORTED_MODULE_1__.addDocumentListener)();\r\n    window.onscroll = function(ev) {\r\n        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {\r\n            loadProductsInPage();\r\n        }\r\n    };\r\n    const cartButton = document.getElementById(\"cart\");\r\n    cartButton.addEventListener(\"mouseover\", function () {\r\n        const cartWindow = document.querySelector(\".cart-window\");\r\n        cartWindow.setAttribute(\"style\", \"display:block\")\r\n        cartWindow.classList.add(\"show\")\r\n    });\r\n    cartButton.addEventListener(\"mouseout\", function () {\r\n        const cartWindow = document.querySelector(\".cart-window\");\r\n        cartWindow.setAttribute(\"style\", \"display:none\")\r\n        cartWindow.classList.remove(\"show\")\r\n    });\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/createProduct.js":
/*!*********************************!*\
  !*** ./src/js/createProduct.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard)\n/* harmony export */ });\n/* harmony import */ var _galleryFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./galleryFunctions.js */ \"./src/js/galleryFunctions.js\");\n\r\nfunction createCard(product) {\r\n    const card = document.createElement(\"div\");\r\n    card.setAttribute(\"data-id\", product.id);\r\n    card.classList.add(\"product-grid__product-card\");\r\n\r\n    const imageWrapper = document.createElement(\"div\");\r\n    imageWrapper.classList.add(\"product-grid__product-card__image-wrapper\");\r\n    const galleryWrapper = document.createElement(\"div\");\r\n    galleryWrapper.classList.add(\"product-grid__product-card__image-wrapper__gallery\");\r\n    const productImage = document.createElement(\"img\");\r\n    productImage.classList.add(\"product-grid__product-card__image-wrapper__image\");\r\n    productImage.id = `product-grid__product-card__image-wrapper__image__id${product.id}`;\r\n    const arrowsWrapper = document.createElement(\"div\");\r\n    arrowsWrapper.classList.add(\"product-grid__product-card__image-wrapper__arrows\");\r\n    const leftArrow = document.createElement(\"span\");\r\n    const rightArrow = document.createElement(\"span\");\r\n    leftArrow.innerHTML = \"&#8249;\";\r\n    rightArrow.innerHTML = \"&#8250;\";\r\n    leftArrow.classList.add(\"arrow\");\r\n    leftArrow.classList.add(\"left\");\r\n    rightArrow.classList.add(\"arrow\");\r\n    rightArrow.classList.add(\"right\");\r\n\r\n    const productDiscount = document.createElement(\"div\");\r\n    productDiscount.classList.add(\"product-grid__product-card__image-wrapper__discount\");\r\n    productDiscount.textContent = `-${product.discountPercentage}%`;\r\n    productImage.src = product.thumbnail;\r\n    productImage.alt = product.title;\r\n    galleryWrapper.appendChild(productImage);\r\n    arrowsWrapper.appendChild(leftArrow);\r\n    arrowsWrapper.appendChild(rightArrow);\r\n    galleryWrapper.appendChild(arrowsWrapper);\r\n    galleryWrapper.appendChild(productDiscount);\r\n    imageWrapper.appendChild(galleryWrapper);\r\n\r\n\r\n    const productTitle = document.createElement(\"h2\");\r\n    productTitle.classList.add(\"product-grid__product-card__title\");\r\n    productTitle.textContent = product.title;\r\n\r\n    const priceWrapper = document.createElement(\"div\");\r\n    priceWrapper.classList.add(\"product-grid__product-card__prices\");\r\n    const oldPrice = document.createElement(\"p\");\r\n    oldPrice.classList.add(\"product-grid__product-card__price__initial\");\r\n    oldPrice.textContent = `$${product.price}`;\r\n    const newPrice = document.createElement(\"p\");\r\n    newPrice.classList.add(\"product-grid__product-card__price__final\");\r\n    newPrice.textContent = `$${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}`;\r\n    priceWrapper.appendChild(oldPrice);\r\n    priceWrapper.appendChild(newPrice);\r\n\r\n    const productDescription = document.createElement(\"p\");\r\n    productDescription.classList.add(\"product-grid__product-card__description\");\r\n    productDescription.textContent = product.description;\r\n\r\n    const productDetails = document.createElement(\"div\");\r\n    productDetails.classList.add(\"product-grid__product-card__product-details\");\r\n\r\n    const brand = document.createElement(\"div\");\r\n    brand.classList.add(\"brand\");\r\n    brand.textContent = `Brand: ${product.brand}`;\r\n    const category = document.createElement(\"div\");\r\n    brand.classList.add(\"category\");\r\n    category.textContent = `Category: ${product.category}`;\r\n    const stock = document.createElement(\"div\");\r\n    brand.classList.add(\"stock\");\r\n    stock.textContent = `Stock: ${product.stock}`;\r\n    const rating = document.createElement(\"div\");\r\n    brand.classList.add(\"rating\");\r\n    rating.textContent = `Rating: ${product.rating}`;\r\n\r\n    productDetails.appendChild(brand);\r\n    productDetails.appendChild(category);\r\n    productDetails.appendChild(stock);\r\n    productDetails.appendChild(rating);\r\n\r\n    const addToCartButton = document.createElement(\"button\");\r\n    addToCartButton.classList.add(\"product-grid__product-card__add-to-cart-button\");\r\n    addToCartButton.textContent = \"Add to Cart\";\r\n\r\n    card.appendChild(imageWrapper);\r\n\r\n    card.appendChild(productTitle);\r\n    card.appendChild(priceWrapper);\r\n    card.appendChild(productDescription);\r\n    card.appendChild(productDetails);\r\n    card.appendChild(addToCartButton);\r\n\r\n    (0,_galleryFunctions_js__WEBPACK_IMPORTED_MODULE_0__.addArrowsListener)(card);\r\n    (0,_galleryFunctions_js__WEBPACK_IMPORTED_MODULE_0__.initiateMapGallery)(product.id, product.images.length-2);\r\n\r\n    return card;\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/createProduct.js?");

/***/ }),

/***/ "./src/js/galleryFunctions.js":
/*!************************************!*\
  !*** ./src/js/galleryFunctions.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addArrowsListener: () => (/* binding */ addArrowsListener),\n/* harmony export */   addDocumentListener: () => (/* binding */ addDocumentListener),\n/* harmony export */   changeImage: () => (/* binding */ changeImage),\n/* harmony export */   initiateMapGallery: () => (/* binding */ initiateMapGallery)\n/* harmony export */ });\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ \"./src/js/app.js\");\n\r\n\r\nlet lastActiveProduct = null;\r\nlet mapImageToProduct = {};\r\n\r\nfunction addArrowsListener(card){\r\n    const leftArrows = card.querySelector(\".arrow.left\");\r\n    const rightArrows = card.querySelector(\".arrow.right\");\r\n    leftArrows.addEventListener(\"click\", () => {\r\n        arrowClicked(card, -1);\r\n        lastActiveProduct = card;\r\n    });\r\n\r\n    rightArrows.addEventListener(\"click\", () => {\r\n        arrowClicked(card, 1);\r\n        lastActiveProduct = card;\r\n    });\r\n}\r\nfunction addDocumentListener(){\r\n    document.addEventListener(\"keyup\", function (event) {\r\n        console.log(event.key);\r\n        console.log(event.target);\r\n        const direction = event.key === \"ArrowLeft\" ? -1 : 1;\r\n        if (event.key === \"ArrowLeft\" ) {\r\n            arrowClicked(lastActiveProduct, direction);\r\n        } else if (event.key === \"ArrowRight\" ) {\r\n            arrowClicked(lastActiveProduct, direction);\r\n        }\r\n    });\r\n}\r\nfunction arrowClicked(card, direction) {\r\n    if (direction === -1) {\r\n        console.log(\"left arrow clicked\");\r\n        const productId = Number(card.dataset.id);\r\n        changeImage(productId, -1, card);\r\n    } else {\r\n        console.log(\"right arrow clicked\");\r\n        const productId = Number(card.dataset.id);\r\n        changeImage(productId, 1, card);\r\n    }\r\n}\r\n\r\nfunction changeImage(id, direction, card) {\r\n    let totalProductsInPage=(0,_app_js__WEBPACK_IMPORTED_MODULE_0__.getTotalProductsInPage)();\r\n    fetch(`https://dummyjson.com/products?limit=${totalProductsInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`)\r\n        .then(response => {\r\n            if (!response.ok) {\r\n                throw new Error(`Request failed with status ${response.status}`);\r\n            }\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            const products = data.products;\r\n            const currentProduct = products.find(product => product.id === id);\r\n            const currentImageIndex = mapImageToProduct[id];\r\n            const imagesLength = currentProduct.images.length;\r\n\r\n            let newIndex = currentImageIndex + direction;\r\n\r\n            if (newIndex >= imagesLength) {\r\n                newIndex = 0; // de la prima imagine\r\n            } else if (newIndex < 0) {\r\n                newIndex = imagesLength - 1; //  de la ultima\r\n            }\r\n\r\n            mapImageToProduct[id] = newIndex;\r\n            const mainImage = card.querySelector(`#product-grid__product-card__image-wrapper__image__id${card.dataset.id}`);\r\n            mainImage.src = currentProduct.images[newIndex];\r\n        })\r\n        .catch(error => {\r\n            console.error(\"Error changing image:\", error);\r\n            throw error;\r\n        });\r\n}\r\n\r\n\r\nfunction initiateMapGallery(id, imagesLength) {\r\n    mapImageToProduct[id] = imagesLength - 1;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/galleryFunctions.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _sass_check_out_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sass/check-out.scss */ \"./src/sass/check-out.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\r\n\r\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_2__.init)();\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

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