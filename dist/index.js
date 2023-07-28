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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nlet selectedItem;\r\nlet numberOfItemsLoaded = 0;\r\nconst numberOfItemsPerPage = 3;\r\n\r\nconst cartCounter = document.getElementById('cart-counter');\r\n\r\n\r\nasync function init() {\r\n    await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);\r\n    setupLoadButton();\r\n\r\n    setupUI();\r\n    setupCartUI();\r\n}\r\n\r\nasync function setupNewItems() {\r\n    await loadShopProducts(numberOfItemsLoaded, numberOfItemsPerPage);\r\n    setupAddToCartButtons();\r\n\r\n    numberOfItemsLoaded += 3;\r\n}\r\n\r\nasync function loadShopProducts(numItemsAlreadyLoaded, numItemsPerPage) {\r\n    const productObjectsArray = (await getProductsPaginatedJSON(numItemsAlreadyLoaded, numItemsPerPage)).products;\r\n    const productsContainer = document.getElementById(\"products-list\");\r\n\r\n    for (const product of productObjectsArray) {\r\n        const productHTML = getProductHTML(product);\r\n        productsContainer.appendChild(productHTML);\r\n    }\r\n}\r\n\r\nfunction getProductHTML(productObject)\r\n{\r\n    const productId = productObject[\"id\"];\r\n    const productTitle = productObject[\"title\"];\r\n    const productThumbnail = productObject[\"thumbnail\"];\r\n    const productDescription = productObject[\"description\"];\r\n    const productRating = productObject[\"rating\"];\r\n    const productPrice = productObject[\"price\"];\r\n    const productDiscount = productObject[\"discountPercentage\"];\r\n    const productPriceWithDiscount = productPrice * (100 - productDiscount) / 100;\r\n\r\n    let thumbnailsHTML = '';\r\n\r\n    for(const imageURL of productObject[\"images\"])\r\n    {\r\n        //TODO: avoid inline styling\r\n        thumbnailsHTML += `<img class=\"item-thumbnail\" src=\"${imageURL}\" alt=\"thumbnail image\" loading=\"lazy\" style=\"display: none\"/>\\n`;\r\n    }\r\n\r\n    const productHTML = document.createElement('div');\r\n    productHTML.setAttribute('class', \"item-container\");\r\n    productHTML.setAttribute('data-id', productId);\r\n    productHTML.innerHTML = `\r\n        <div class=\"carousel-container\">\r\n            <div class=\"thumbnails-container\">\r\n                ${thumbnailsHTML}\r\n            </div>\r\n            <div class=\"nav-arrows\">\r\n                <button class=\"navigation-button\"><</button>\r\n                <button class=\"navigation-button\">></button>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-title\">${productTitle}</p>\r\n        <p class=\"item-description\">${productDescription}</p>\r\n        <p class=\"item-rating\">Rating: <div class=\"star-rating\" style=\"--rating: ${productRating};\"></div> ${productRating}/5.00</p>\r\n        \r\n        <div class=\"item-purchase-details\">\r\n          <p class=\"item-price\">Price: <s>$${productPrice}</s>   <span style=\"color: red\">$${productPriceWithDiscount.toFixed(2)}</span></p>\r\n          <button class=\"add-to-cart-button\">Add To Cart</button>\r\n        </div>\r\n    `;\r\n\r\n    productHTML.addEventListener('click', (clickEvent) =>{\r\n        if(selectedItem !== undefined)\r\n            selectedItem.removeEventListener('keydown', keyboardSelectGalleryImage);\r\n        selectedItem = clickEvent.currentTarget;\r\n        addEventListener('keydown',keyboardSelectGalleryImage);\r\n    });\r\n\r\n    productHTML.querySelector('.thumbnails-container').lastElementChild.removeAttribute('style');\r\n\r\n    let navButtons = productHTML.querySelectorAll('.nav-arrows button');\r\n\r\n    navButtons[0].addEventListener('click', (clickEvent) =>\r\n    {\r\n        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 0);\r\n    });\r\n\r\n    navButtons[1].addEventListener('click', (clickEvent) =>\r\n    {\r\n        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 1);\r\n    });\r\n\r\n    return productHTML;\r\n}\r\n\r\nfunction getProductsPaginatedJSON(numberOfProductsSkipped, numberOfProductsToFetch)\r\n{\r\n    console.log(numberOfProductsSkipped);\r\n    console.log(numberOfItemsPerPage)\r\n    return fetch(`https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`)\r\n        .then(res => {return res.json();});\r\n}\r\n\r\nfunction getAllProductsJSON() {\r\n    return fetch('https://dummyjson.com/products')\r\n        .then(res => {return res.json();});\r\n}\r\n\r\nfunction setupAddToCartButtons()\r\n{\r\n    const addToCartButtons = document.getElementsByClassName(\"add-to-cart-button\");\r\n\r\n    for(const button of addToCartButtons)\r\n    {\r\n        button.addEventListener('click', function (event){\r\n            button.textContent = \"Added to cart\";\r\n            button.style.setProperty(\"background-color\", \"var(--button-pressed)\");\r\n\r\n            const itemContainer = button.parentElement.parentElement;\r\n\r\n            const buttonID = itemContainer.getAttribute('data-id');\r\n            const buttonTitle = itemContainer.getElementsByTagName('p')[0].innerText;\r\n            const newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);\r\n            document.getElementById('app').appendChild(newPopup);\r\n\r\n            setTimeout(function (){\r\n                button.textContent = \"Add to cart\";\r\n                button.style.removeProperty(\"background-color\");\r\n                newPopup.remove();\r\n            }, 4000);\r\n        });\r\n\r\n        button.addEventListener('click', function(clickEvent) {\r\n            console.log('event fired');\r\n\r\n            let itemHTML = button.parentElement.parentElement;\r\n\r\n            let id = itemHTML.getAttribute('data-id');\r\n            let thumbnail = itemHTML.querySelector('img').getAttribute('src');\r\n            let title = itemHTML.querySelector('p[class=\"item-title\"]').innerText;\r\n            let price = itemHTML.querySelector('p[class=\"item-price\"]').innerText.split(' ')[1];\r\n\r\n            const addedToCartEvent = new CustomEvent(\"addedToCart\", {\r\n                detail: {\r\n                    id: id,\r\n                    thumbnail: thumbnail,\r\n                    title: title,\r\n                    price: price,\r\n                    amount: 1\r\n                }\r\n            });\r\n            cartCounter.dispatchEvent(addedToCartEvent);\r\n        });\r\n    }\r\n}\r\n\r\nfunction createAddToCartPopup(text=\"The product has been added to your cart successfully!\"){\r\n    const newPopup = document.createElement('div');\r\n    const popupContent = document.createElement('div');\r\n    newPopup.appendChild(popupContent);\r\n    newPopup.setAttribute('class', 'add-to-cart-popup');\r\n    popupContent.innerText = text;\r\n\r\n    return newPopup;\r\n}\r\n\r\nfunction selectGalleryImage(currentCarousel, direction)\r\n{\r\n    let enabledImage = currentCarousel.querySelector(\"img:not([style*='display: none'])\");\r\n    let nextImage;\r\n\r\n    if(direction === 0)\r\n    {\r\n        nextImage = enabledImage.previousElementSibling;\r\n        if(nextImage === null)\r\n        {\r\n            nextImage = currentCarousel.lastElementChild;\r\n        }\r\n    }\r\n    else\r\n    {\r\n        nextImage = enabledImage.nextElementSibling;\r\n        if(nextImage === null)\r\n        {\r\n            nextImage = currentCarousel.firstElementChild;\r\n        }\r\n    }\r\n\r\n    console.log(nextImage);\r\n    enabledImage.style.setProperty('display', 'none');\r\n    nextImage.style.setProperty('display', 'inline');\r\n}\r\n\r\nfunction keyboardSelectGalleryImage(keyEvent)\r\n{\r\n    console.log(selectedItem);\r\n    if(keyEvent.keyCode === 37)\r\n    {\r\n        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 0);\r\n    }\r\n\r\n    if(keyEvent.keyCode === 39)\r\n    {\r\n        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 1);\r\n    }\r\n}\r\n\r\nfunction setupCartUI()\r\n{\r\n\r\n    console.log(cartCounter);\r\n    cartCounter.addEventListener('addedToCart', (cartEvent) =>{\r\n        console.log('fdf');\r\n        let currentCount = Number(cartEvent.target.innerText);\r\n        cartEvent.target.innerText = currentCount + 1;\r\n\r\n        const cartContainer = cartEvent.target.nextElementSibling;\r\n\r\n        const existingItem = cartContainer.querySelector(`.cart-item-container[data-id=\"${cartEvent.detail.id}\"]`);\r\n        console.log(existingItem);\r\n        if(existingItem == null) {\r\n            let itemHTML = createCartHTMLForItem(cartEvent.detail);\r\n            cartContainer.appendChild(itemHTML);\r\n        }\r\n        else{\r\n            let currentCount = Number(existingItem.lastElementChild.innerText.substring(1));\r\n            currentCount++;\r\n            existingItem.lastElementChild.innerText = `x${currentCount}`;\r\n        }\r\n\r\n        console.log(cartContainer);\r\n    });\r\n\r\n    const cartIcon = document.getElementById('cart-icon');\r\n    const cartContents = document.getElementsByClassName('cart-contents')[0];\r\n    cartIcon.addEventListener('mouseover', ()=>{\r\n        console.log(\"on icon\");\r\n        cartContents.style.setProperty('display', 'inline-block');\r\n    });\r\n\r\n    cartIcon.addEventListener('mouseout', ()=>{\r\n        console.log(\"out of wrapper\");\r\n        cartContents.style.removeProperty('display');\r\n    });\r\n}\r\n\r\nfunction createCartHTMLForItem(item)\r\n{\r\n    let mainItemDiv = document.createElement('div');\r\n    mainItemDiv.setAttribute('data-id', item[\"id\"]);\r\n    mainItemDiv.setAttribute('class', 'cart-item-container');\r\n\r\n    let itemThumbnail = document.createElement('img');\r\n    itemThumbnail.setAttribute('class', 'cart-item-thumbnail');\r\n    itemThumbnail.setAttribute('src', item['thumbnail']);\r\n\r\n    let itemTitle = document.createElement('p');\r\n    itemTitle.setAttribute('class', 'cart-item-title');\r\n    itemTitle.innerText = item['title'];\r\n\r\n    let itemPrice = document.createElement('p');\r\n    itemPrice.setAttribute('class', 'cart-item-price');\r\n    itemPrice.innerText = `${item['price']}`;\r\n\r\n    let itemAmount = document.createElement('p');\r\n    itemAmount.setAttribute('class', 'cart-item-amount');\r\n    itemAmount.innerText = `x${item['amount']}`;\r\n\r\n    mainItemDiv.appendChild(itemThumbnail);\r\n    mainItemDiv.appendChild(itemTitle);\r\n    mainItemDiv.appendChild(itemPrice);\r\n    mainItemDiv.appendChild(itemAmount);\r\n\r\n    return mainItemDiv;\r\n}\r\n\r\nfunction setupLoadButton(){\r\n    const loadButton = document.getElementById('load-more-button');\r\n    loadButton.addEventListener('click', async () => {\r\n        await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);\r\n    });\r\n}\r\n\r\n\r\nfunction setupUI()\r\n{\r\n    document.getElementById('load-checkout-button').addEventListener('click', () =>{\r\n        console.log(\"ffdfd\");\r\n        window.location = `/public/checkout.html/?=cart-id=1`;\r\n    });\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

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