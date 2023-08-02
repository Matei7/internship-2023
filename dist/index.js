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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buttonsClickAddToCartPopUp: () => (/* binding */ buttonsClickAddToCartPopUp),\n/* harmony export */   displayProductInPageByFilter: () => (/* binding */ displayProductInPageByFilter),\n/* harmony export */   fetchAddProductToCart: () => (/* binding */ fetchAddProductToCart),\n/* harmony export */   fetchDeleteProductFromCart: () => (/* binding */ fetchDeleteProductFromCart),\n/* harmony export */   fetchRemoveProductFromCart: () => (/* binding */ fetchRemoveProductFromCart),\n/* harmony export */   filterBar: () => (/* binding */ filterBar),\n/* harmony export */   getAllProductsAndSaveToLocalStorage: () => (/* binding */ getAllProductsAndSaveToLocalStorage),\n/* harmony export */   getProducts: () => (/* binding */ getProducts),\n/* harmony export */   handleWindowScrollEvent: () => (/* binding */ handleWindowScrollEvent),\n/* harmony export */   hoverCartEvent: () => (/* binding */ hoverCartEvent),\n/* harmony export */   hoverProductEvent: () => (/* binding */ hoverProductEvent),\n/* harmony export */   initCartProducts: () => (/* binding */ initCartProducts),\n/* harmony export */   nextImageInProductGalleryEvent: () => (/* binding */ nextImageInProductGalleryEvent),\n/* harmony export */   updateCartCount: () => (/* binding */ updateCartCount)\n/* harmony export */ });\nlet products = [];\r\nlet cartProducts = null;\r\nlet cartQuantity = 0;\r\nlet cartTotal = 0;\r\nlet skipPagination = 0;\r\nlet limitPagination = 6;\r\n\r\nconst API_INTERNAL_CART_ID = '64c3aa50d27ba';\r\nconst API_INTERNAL_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`;\r\nconst cartProductsContainer = document.querySelector('.cart-items');\r\n\r\nfunction createProductsInPage(products) {\r\n    const productsContainer = document.querySelector('.products');\r\n\r\n    for (const product of products) {\r\n\r\n        const productContainer = document.createElement('div');\r\n        productContainer.classList.add('products-item');\r\n\r\n        const title = document.createElement('h2');\r\n        title.innerText = product.title;\r\n        title.classList.add('product-title');\r\n\r\n        const imagesContainer = document.createElement('div');\r\n        imagesContainer.classList.add('product-images');\r\n\r\n        for (const imageSrc of product.images) {\r\n            const image = document.createElement('img');\r\n            image.setAttribute('src', imageSrc);\r\n            image.setAttribute('alt', product.title + \"image\");\r\n            image.classList.add('product-image');\r\n            image.style.display = 'none';\r\n            imagesContainer.appendChild(image);\r\n        }\r\n        imagesContainer.firstElementChild.style.display = 'block';\r\n\r\n        const arrowLeft = document.createElement('div');\r\n        const arrowRight = document.createElement('div');\r\n        arrowLeft.classList.add('arrow-left');\r\n        arrowRight.classList.add('arrow-right');\r\n\r\n        const brand = document.createElement('h3');\r\n        brand.innerText = `Made by ${product.brand}`;\r\n        brand.classList.add('product-brand');\r\n\r\n        const category = document.createElement('h5');\r\n        category.innerText = `Category: ${product.category}`;\r\n        category.classList.add('product-category');\r\n\r\n        const description = document.createElement('p');\r\n        description.innerText = product.description;\r\n        description.classList.add('product-description');\r\n\r\n        const discountPercentage = document.createElement('p');\r\n        const priceWithoutDiscount = Math.floor(product.price + product.price * product.discountPercentage / 100);\r\n        discountPercentage.innerText = `$${priceWithoutDiscount}`;\r\n        discountPercentage.classList.add('product-discount-percentage');\r\n\r\n        productContainer.setAttribute('data-id', product.id);\r\n\r\n        const price = document.createElement('h3');\r\n        price.innerText = `$${product.price}`;\r\n        price.classList.add('product-price');\r\n\r\n\r\n        const rating = document.createElement('h3');\r\n        const starRating = document.createElement('span')\r\n        starRating.classList.add('star-rating');\r\n        starRating.style.setProperty('--rating', product.rating);\r\n        rating.classList.add('product-rating');\r\n        rating.appendChild(starRating);\r\n        rating.innerHTML += ` ${product.rating}`;\r\n\r\n        const stock = document.createElement('h3');\r\n        stock.innerText = `Available: ${product.stock}`;\r\n        stock.classList.add('product-stock');\r\n\r\n        const button = document.createElement('button');\r\n        button.classList.add('product-button');\r\n        button.innerText = 'Add to cart';\r\n\r\n        productContainer.appendChild(imagesContainer);\r\n        productContainer.appendChild(arrowLeft);\r\n        productContainer.appendChild(arrowRight);\r\n        productContainer.appendChild(title);\r\n        productContainer.appendChild(brand);\r\n        productContainer.appendChild(category);\r\n        productContainer.appendChild(rating);\r\n        productContainer.appendChild(stock);\r\n        productContainer.appendChild(description);\r\n        productContainer.appendChild(discountPercentage);\r\n        productContainer.appendChild(price);\r\n        productContainer.appendChild(button);\r\n\r\n        productContainer.style.display = 'none';\r\n        productsContainer.appendChild(productContainer);\r\n    }\r\n}\r\n\r\nasync function getProducts() {\r\n    const API_GET_PRODUCTS_URL = `https://dummyjson.com/products?limit=${limitPagination}&skip=${skipPagination}&select=id,title,brand,category,description,price,stock,rating,discountPercentage,images`\r\n\r\n    if (localStorage.getItem('products') === null) {\r\n        const response = await fetch(API_GET_PRODUCTS_URL);\r\n        const responseJSON = await response.json();\r\n        createProductsInPage(responseJSON.products);\r\n        products = products.concat(responseJSON.products);\r\n        skipPagination += limitPagination;\r\n        console.log(\"Products fetched successfully from API!\")\r\n    }\r\n    else {\r\n        const allProducts = JSON.parse(localStorage.getItem('products'));\r\n        const currentProducts = allProducts.slice(skipPagination, skipPagination + limitPagination);\r\n        createProductsInPage(currentProducts);\r\n        products = products.concat(currentProducts);\r\n        skipPagination += limitPagination;\r\n        console.log(\"Products fetched successfully from localStorage!\")\r\n    }\r\n}\r\n\r\nasync function getAllProductsAndSaveToLocalStorage() {\r\n    if (localStorage.getItem('products') === null)\r\n    {\r\n        const API_GET_PRODUCTS_URL = `https://dummyjson.com/products?limit=100&skip=0&select=id,title,brand,category,description,price,stock,rating,discountPercentage,images`\r\n        const response = await fetch(API_GET_PRODUCTS_URL);\r\n        const responseJSON = await response.json();\r\n        localStorage.setItem('products', JSON.stringify(responseJSON.products));\r\n    }\r\n}\r\n\r\nfunction updateCartCount() {\r\n    const shoppingCartCount = document.querySelector('.shopping-cart-count');\r\n    if (cartQuantity === 0) {\r\n        shoppingCartCount.style.display = 'none';\r\n        return;\r\n    }\r\n    shoppingCartCount.innerText = cartQuantity;\r\n    shoppingCartCount.style.display = 'flex';\r\n}\r\n\r\nfunction checkIfItemExistsInCartProducts(id) {\r\n    if (cartProducts === null) {\r\n        return false;\r\n    }\r\n    for (const product of cartProducts.products) {\r\n        if (product.id == id) {\r\n            return true;\r\n        }\r\n    }\r\n    return false;\r\n}\r\n\r\nfunction buttonsClickAddToCartPopUp() {\r\n    const buttons = document.querySelectorAll('.product-button:not([data-event=\"true\"])');\r\n    const popUpContainer = document.querySelector('.pop-up');\r\n    buttons.forEach(button => {\r\n        button.setAttribute('data-event', 'true');\r\n        button.addEventListener('click', () => {\r\n            popUpContainer.style.display = 'flex';\r\n            button.style.pointerEvents = 'none';\r\n            const productId = button.parentElement.getAttribute('data-id');\r\n\r\n            if (checkIfItemExistsInCartProducts(productId)) {\r\n                const item = cartProductsContainer.querySelector(`[data-cart-id=\"${productId}\"]`);\r\n                const itemCounter = item.querySelector('.cart-item-counter');\r\n                const currentQuantity = parseInt(itemCounter.innerText.slice(1)); // x1 -> 1\r\n                const newQuantity = currentQuantity + 1;\r\n                itemCounter.innerText = `x${newQuantity}`;\r\n            } else {\r\n                const cartItem = document.createElement('div');\r\n                cartItem.setAttribute('data-cart-id', productId);\r\n                cartItem.classList.add('cart-item');\r\n\r\n                const product = products[productId - 1];\r\n                const cartItemCounter = document.createElement('h3')\r\n                cartItemCounter.innerText = 'x1'\r\n                cartItemCounter.classList.add('cart-item-counter');\r\n\r\n                const cartItemTitle = document.createElement('h3');\r\n                cartItemTitle.innerText = product.title;\r\n                cartItemTitle.classList.add('cart-item-title');\r\n\r\n                const cartItemImage = document.createElement('img');\r\n                cartItemImage.setAttribute('src', product.images[0]);\r\n                cartItemImage.setAttribute('alt', product.title + \"image\");\r\n                cartItemImage.classList.add('cart-item-image');\r\n\r\n                const cartItemPrice = document.createElement('h3');\r\n                cartItemPrice.innerText = `$${product.price}`;\r\n                cartItemPrice.classList.add('cart-item-price');\r\n\r\n                cartItem.appendChild(cartItemImage);\r\n                cartItem.appendChild(cartItemCounter);\r\n                cartItem.appendChild(cartItemTitle);\r\n                cartItem.appendChild(cartItemPrice);\r\n                cartProductsContainer.appendChild(cartItem);\r\n            }\r\n            cartQuantity++;\r\n            updateCartCount();\r\n            fetchAddProductToCart(productId).then(() => {});\r\n            updateCartTotal(cartTotal + products[productId - 1].price);\r\n            localStorage.removeItem('cart');\r\n            button.innerText = 'Added to cart';\r\n            setTimeout(() => {\r\n                popUpContainer.style.display = 'none';\r\n                button.innerText = 'Add to cart';\r\n                button.style.pointerEvents = 'all';\r\n            }, 2000);\r\n        });\r\n    });\r\n}\r\n\r\nfunction nextImageInProductGallery(image) {\r\n    const productContainer = image.parentElement;\r\n    const nextImage = image.nextElementSibling;\r\n    if (nextImage) {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        nextImage.style.display = 'block';\r\n        nextImage.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    } else {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        productContainer.firstElementChild.style.display = 'block';\r\n        productContainer.firstElementChild.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    }\r\n}\r\n\r\nfunction previousImageInProductGallery(image) {\r\n    const productContainer = image.parentElement;\r\n    const previousImage = image.previousElementSibling;\r\n    if (previousImage) {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        previousImage.style.display = 'block';\r\n        previousImage.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    } else {\r\n        image.style.animation = 'fadeOut 0.3s ease-in-out';\r\n        image.style.display = 'none';\r\n        productContainer.lastElementChild.style.display = 'block';\r\n        productContainer.lastElementChild.style.animation = 'fadeIn 0.5s ease-in-out';\r\n    }\r\n}\r\n\r\nfunction calculateClickPositionOfGalleryImage(image, event) {\r\n    const clickX = event.clientX - image.getBoundingClientRect().left;\r\n    const containerWidth = image.clientWidth;\r\n    const clickPercentage = (clickX / containerWidth) * 100;\r\n    const threshold = 50;\r\n    if (clickPercentage >= threshold) {\r\n        nextImageInProductGallery(image);\r\n    } else if (clickPercentage < threshold) {\r\n        previousImageInProductGallery(image);\r\n    }\r\n}\r\n\r\nfunction nextImageInProductGalleryEvent() {\r\n    const images = document.querySelectorAll('.product-image:not([data-event=\"true\"])');\r\n    images.forEach(image => {\r\n        image.setAttribute('data-event', 'true');\r\n        image.addEventListener('click', (event) => {\r\n            calculateClickPositionOfGalleryImage(image, event);\r\n        });\r\n    });\r\n}\r\n\r\nconst handleKeyDownEvent = (event) => {\r\n    const hoveredProduct = document.querySelector('.hovered');\r\n    const currentImage = hoveredProduct.querySelector('.product-image[style*=\"display: block\"]');\r\n    if (event.key === 'ArrowRight') {\r\n        nextImageInProductGallery(currentImage);\r\n    }\r\n    if (event.key === 'ArrowLeft') {\r\n        previousImageInProductGallery(currentImage);\r\n    }\r\n}\r\n\r\nconst handleClickOnArrowEvent = (event) => {\r\n    const hoveredProduct = document.querySelector('.hovered');\r\n    const currentImage = hoveredProduct.querySelector('.product-image[style*=\"display: block\"]');\r\n    if (event.target.classList.contains('arrow-right')) {\r\n        nextImageInProductGallery(currentImage);\r\n    }\r\n    if (event.target.classList.contains('arrow-left')) {\r\n        previousImageInProductGallery(currentImage);\r\n    }\r\n}\r\n\r\nfunction hoverProductEvent() {\r\n    const items = document.querySelectorAll('.products-item:not([data-event=\"true\"])');\r\n    items.forEach(item => {\r\n        item.setAttribute('data-event', 'true');\r\n        item.addEventListener('mouseover', () => {\r\n            item.style.transform = 'scale(1.01)';\r\n            item.classList.add('hovered');\r\n            document.addEventListener('keydown', handleKeyDownEvent);\r\n            item.addEventListener('click', handleClickOnArrowEvent);\r\n        });\r\n        item.addEventListener('mouseout', () => {\r\n            item.style.transform = 'scale(1)';\r\n            item.classList.remove('hovered');\r\n            document.removeEventListener('keydown', handleKeyDownEvent);\r\n            item.removeEventListener('click', handleClickOnArrowEvent);\r\n        });\r\n    });\r\n}\r\n\r\nfunction hoverCartEvent() {\r\n    const cart = document.querySelector('.shopping-cart');\r\n    cart.addEventListener('mouseover', () => {\r\n        cartProductsContainer.style.display = 'flex';\r\n    });\r\n    cart.addEventListener('mouseout', () => {\r\n        cartProductsContainer.style.display = 'none';\r\n    });\r\n}\r\n\r\nconst hideLoader = () => {\r\n    const loader = document.querySelector('.loader');\r\n    loader.style.opacity = '0';\r\n};\r\nconst showLoader = () => {\r\n    const loader = document.querySelector('.loader');\r\n    loader.style.opacity = '1';\r\n};\r\n\r\nfunction handleWindowScrollEvent() {\r\n    window.addEventListener('scroll', () => {\r\n        if (skipPagination + limitPagination > 100) {\r\n            return;\r\n        }\r\n        const {\r\n            scrollTop,\r\n            scrollHeight,\r\n            clientHeight\r\n        } = document.documentElement;\r\n        if (scrollTop + clientHeight >= scrollHeight - 5) {\r\n            showLoader();\r\n            getProducts().then(() => {\r\n                hideLoader();\r\n                buttonsClickAddToCartPopUp();\r\n                nextImageInProductGalleryEvent();\r\n                hoverProductEvent();\r\n                const filter = document.querySelector('.filter-bar').value;\r\n                displayProductInPageByFilter(filter);\r\n            });\r\n        }\r\n    }, {passive: true});\r\n}\r\n\r\nasync function fetchAddProductToCart(productID, quantity = 1) {\r\n    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`, {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\r\n            userId: 1,\r\n            products: [\r\n                {\r\n                    id: productID,\r\n                    quantity: quantity\r\n                }]\r\n        })\r\n    }).then(res => res.json())\r\n}\r\n\r\nasync function fetchRemoveProductFromCart(productID, quantity = -1) {\r\n    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`, {\r\n        method: 'POST',\r\n        headers: {'Content-Type': 'application/json'},\r\n        body: JSON.stringify({\r\n            userId: 1,\r\n            products: [\r\n                {\r\n                    id: productID,\r\n                    quantity: quantity\r\n                }]\r\n        })\r\n    }).then(res => res.json())\r\n}\r\n\r\nasync function fetchDeleteProductFromCart(productID) {\r\n    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}?products[]=${productID}`, {\r\n        method: 'DELETE',\r\n        headers: {'Content-Type': 'application/json'}\r\n    }).then(res => res.json())\r\n}\r\n\r\nasync function initCartProducts() {\r\n    if (localStorage.getItem('cart') === null) {\r\n        const response = await fetch(API_INTERNAL_CART_GET);\r\n        cartProducts = await response.json();\r\n        console.log(\"No cart in local storage, fetching from API\")\r\n        localStorage.setItem('cart', JSON.stringify(cartProducts));\r\n    } else {\r\n        console.log(\"Cart found in local storage\")\r\n        cartProducts = JSON.parse(localStorage.getItem('cart'));\r\n    }\r\n    for (const product of cartProducts.products) {\r\n        createProductInCart(product);\r\n    }\r\n    updateCartCount();\r\n    updateCartTotal(cartProducts.total);\r\n}\r\n\r\nfunction updateCartTotal(newTotal) {\r\n    cartTotal = newTotal;\r\n    const totalElement = document.querySelector('.cart-total');\r\n    totalElement.innerText = `TOTAL: $${newTotal}`;\r\n}\r\n\r\nfunction createProductInCart(product) {\r\n    cartQuantity += product.quantity;\r\n\r\n    const cartItem = document.createElement('div');\r\n    cartItem.setAttribute('data-cart-id', product.id);\r\n    cartItem.classList.add('cart-item');\r\n\r\n    const cartItemCounter = document.createElement('h3')\r\n    cartItemCounter.classList.add('cart-item-counter');\r\n    cartItemCounter.innerText = `x${product.quantity}`;\r\n\r\n    const cartItemTitle = document.createElement('h3');\r\n    cartItemTitle.innerText = product.title;\r\n    cartItemTitle.classList.add('cart-item-title');\r\n\r\n    const cartItemImage = document.createElement('img');\r\n    cartItemImage.setAttribute('src', product.images[0]);\r\n    cartItemImage.setAttribute('alt', product.title + \"image\");\r\n    cartItemImage.classList.add('cart-item-image');\r\n\r\n    const cartItemPrice = document.createElement('h3');\r\n    cartItemPrice.innerText = `$${product.price}`;\r\n    cartItemPrice.classList.add('cart-item-price');\r\n\r\n    cartItem.appendChild(cartItemImage);\r\n    cartItem.appendChild(cartItemCounter);\r\n    cartItem.appendChild(cartItemTitle);\r\n    cartItem.appendChild(cartItemPrice);\r\n    cartProductsContainer.appendChild(cartItem);\r\n}\r\n\r\nfunction displayProductInPageByFilter(filter) {\r\n    if (filter === '') {\r\n        for (const product of products) {\r\n            const productToDisplay = document.querySelector(`[data-id=\"${product.id}\"]`);\r\n            productToDisplay.style.display = 'grid'\r\n        }\r\n        return;\r\n    }\r\n    const filteredItemsByCategory = products.filter(product => product.category.toLowerCase().startsWith(filter.toLowerCase()));\r\n    if (filteredItemsByCategory.length !== 0) {\r\n        for (const product of products) {\r\n            const productToDisplay = document.querySelector(`[data-id=\"${product.id}\"]`);\r\n            productToDisplay.style.display = 'none'\r\n        }\r\n        for (const product of filteredItemsByCategory) {\r\n            const productToDisplay = document.querySelector(`[data-id=\"${product.id}\"]`);\r\n            productToDisplay.style.display = 'grid'\r\n        }\r\n    } else {\r\n        const filteredItemsByTitle = products.filter(product => product.title.toLowerCase().startsWith(filter.toLowerCase()));\r\n        for (const product of products) {\r\n            const productToDisplay = document.querySelector(`[data-id=\"${product.id}\"]`);\r\n            productToDisplay.style.display = 'none'\r\n        }\r\n        for (const product of filteredItemsByTitle) {\r\n            const productToDisplay = document.querySelector(`[data-id=\"${product.id}\"]`);\r\n            productToDisplay.style.display = 'grid'\r\n        }\r\n    }\r\n}\r\n\r\nfunction filterBar() {\r\n    const filterBar = document.querySelector('.filter-bar')\r\n    filterBar.addEventListener('input', (event) => {\r\n        const filter = event.target.value;\r\n        displayProductInPageByFilter(filter);\r\n    });\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\r\n\r\n\r\n\r\n\r\nawait (0,_app__WEBPACK_IMPORTED_MODULE_1__.getProducts)();\r\nawait (0,_app__WEBPACK_IMPORTED_MODULE_1__.initCartProducts)();\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.buttonsClickAddToCartPopUp)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.nextImageInProductGalleryEvent)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.hoverProductEvent)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.hoverCartEvent)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.filterBar)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.handleWindowScrollEvent)();\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.displayProductInPageByFilter)('');\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

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