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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nlet selectedItem;\r\nlet numberOfItemsLoaded = 0;\r\nconst numberOfItemsPerPage = 3;\r\nconst cartID = (__webpack_require__(/*! ../../cart_id.json */ \"./cart_id.json\").token);\r\n\r\nconst cartURL = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`;\r\nconst cartCounter = document.getElementById('cart-counter');\r\nlet productFilteringCriterium = \"\";\r\n\r\n\r\n\r\nasync function init() {\r\n    await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);\r\n    setupLoadButton();\r\n    await setupUI();\r\n    setupCartUI();\r\n    await loadCartUIContent();\r\n    handleFilterCriteriaChange();\r\n}\r\n\r\nasync function setupNewItems() {\r\n    await loadShopProducts(numberOfItemsLoaded, numberOfItemsPerPage);\r\n    setupAddToCartButtons();\r\n}\r\n\r\nasync function loadShopProducts() {\r\n    let sessionStorageData = sessionStorage.getItem('store-products');\r\n    let alreadyStoredItems = sessionStorageData !== null ? JSON.parse(sessionStorageData): [];\r\n\r\n    let productObjectsArray = [];\r\n    if(alreadyStoredItems === [] || numberOfItemsLoaded + numberOfItemsPerPage > alreadyStoredItems.length) {\r\n        console.log((await getProductsPaginatedJSON(numberOfItemsLoaded, numberOfItemsPerPage)));\r\n        const fetchResult = (await getProductsPaginatedJSON(numberOfItemsLoaded, numberOfItemsPerPage, productFilteringCriterium));\r\n        productObjectsArray = fetchResult.products;\r\n        numberOfItemsLoaded = fetchResult.numberOfProductsSkipped;\r\n        productObjectsArray.forEach(x => {alreadyStoredItems.push(x);});\r\n        sessionStorage.setItem('store-products', JSON.stringify(alreadyStoredItems));\r\n    }\r\n    else{\r\n        for(let index = numberOfItemsLoaded; index < numberOfItemsLoaded + numberOfItemsPerPage; index++)\r\n        {\r\n            productObjectsArray.push(alreadyStoredItems[index]);\r\n        }\r\n    }\r\n\r\n    const productsContainer = document.getElementById(\"products-list\");\r\n\r\n    for (const product of productObjectsArray) {\r\n        const productHTML = getProductHTML(product);\r\n        productsContainer.appendChild(productHTML);\r\n    }\r\n}\r\n\r\nfunction getProductHTML(productObject)\r\n{\r\n    const productId = productObject[\"id\"];\r\n    const productTitle = productObject[\"title\"];\r\n    const productThumbnail = productObject[\"thumbnail\"];\r\n    const productDescription = productObject[\"description\"];\r\n    const productRating = productObject[\"rating\"];\r\n    const productPrice = productObject[\"price\"];\r\n    const productDiscount = productObject[\"discountPercentage\"];\r\n    const productPriceWithDiscount = productPrice * (100 - productDiscount) / 100;\r\n\r\n    let thumbnailsHTML = '';\r\n\r\n    for(const imageURL of productObject[\"images\"])\r\n    {\r\n        //TODO: avoid inline styling\r\n        thumbnailsHTML += `<img class=\"item-thumbnail\" src=\"${imageURL}\" alt=\"thumbnail image\" loading=\"lazy\" style=\"display: none\"/>\\n`;\r\n    }\r\n\r\n    const productHTML = document.createElement('div');\r\n    productHTML.setAttribute('class', \"item-container\");\r\n    productHTML.setAttribute('data-id', productId);\r\n    productHTML.innerHTML = `\r\n        <div class=\"carousel-container\">\r\n            <div class=\"thumbnails-container\">\r\n                ${thumbnailsHTML}\r\n            </div>\r\n            <div class=\"nav-arrows\">\r\n                <button class=\"navigation-button\"><</button>\r\n                <button class=\"navigation-button\">></button>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-title\">${productTitle}</p>\r\n        <p class=\"item-description\">${productDescription}</p>\r\n        <p class=\"item-rating\">Rating: <div class=\"star-rating\" style=\"--rating: ${productRating};\"></div> ${productRating}/5.00</p>\r\n        \r\n        <div class=\"item-purchase-details\">\r\n          <p class=\"item-price\">Price: <s>$${productPrice}</s>   <span style=\"color: red\">$${productPriceWithDiscount.toFixed(2)}</span></p>\r\n          <button class=\"add-to-cart-button\">Add To Cart</button>\r\n        </div>\r\n    `;\r\n\r\n    productHTML.addEventListener('click', (clickEvent) =>{\r\n        if(selectedItem !== undefined)\r\n            selectedItem.removeEventListener('keydown', keyboardSelectGalleryImage);\r\n        selectedItem = clickEvent.currentTarget;\r\n        addEventListener('keydown',keyboardSelectGalleryImage);\r\n    });\r\n\r\n    productHTML.querySelector('.thumbnails-container').lastElementChild.removeAttribute('style');\r\n\r\n    let navButtons = productHTML.querySelectorAll('.nav-arrows button');\r\n\r\n    navButtons[0].addEventListener('click', (clickEvent) =>\r\n    {\r\n        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 0);\r\n    });\r\n\r\n    navButtons[1].addEventListener('click', (clickEvent) =>\r\n    {\r\n        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 1);\r\n    });\r\n\r\n    return productHTML;\r\n}\r\n\r\nasync function getProductsPaginatedJSON(numberOfProductsSkipped, numberOfProductsToFetch, filterCategory = \"\") {\r\n    const greaterBatch = [];\r\n\r\n    debugger;\r\n    console.log(`The desired category is ${filterCategory}`);\r\n\r\n    while(greaterBatch.length < numberOfProductsToFetch) {\r\n        let newBatch = [];\r\n        await fetch(`https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`)\r\n            .then(async res => {\r\n                newBatch = (await res.json()).products;\r\n            });\r\n\r\n        for(const item of newBatch)\r\n        {\r\n            console.log(`This item's category is ${item[\"category\"]}`);\r\n            if(item[\"category\"] === filterCategory || filterCategory === \"\")\r\n                greaterBatch.push(item);\r\n        }\r\n        numberOfProductsSkipped += numberOfProductsToFetch;\r\n    }\r\n    console.log(numberOfProductsSkipped);\r\n    return {products: greaterBatch, numberOfProductsSkipped};\r\n}\r\n\r\nfunction getProductsCategories()\r\n{\r\n    return fetch('https://dummyjson.com/products/categories')\r\n        .then(res => {return res.json();})\r\n}\r\n\r\nfunction getAllProductsJSON() {\r\n    return fetch('https://dummyjson.com/products')\r\n        .then(res => {return res.json();});\r\n}\r\n\r\nfunction setupAddToCartButtons()\r\n{\r\n    const addToCartButtons = document.getElementsByClassName(\"add-to-cart-button\");\r\n\r\n    for(const button of addToCartButtons)\r\n    {\r\n        if(button.getAttribute('data-setup') == 'true')\r\n        {\r\n            continue;\r\n        }\r\n\r\n        button.setAttribute('data-setup', 'true');\r\n\r\n        button.addEventListener('click', function (event){\r\n            button.textContent = \"Added to cart\";\r\n            button.style.setProperty(\"background-color\", \"var(--button-pressed)\");\r\n            //button.disabled = true;\r\n\r\n            const itemContainer = button.parentElement.parentElement;\r\n\r\n            const buttonID = itemContainer.getAttribute('data-id');\r\n            const buttonTitle = itemContainer.getElementsByTagName('p')[0].innerText;\r\n            const newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);\r\n            document.getElementById('app').appendChild(newPopup);\r\n\r\n            setTimeout(function (){\r\n                button.textContent = \"Add to cart\";\r\n                button.style.removeProperty(\"background-color\");\r\n                button.disabled = false;\r\n                newPopup.remove();\r\n            }, 4000);\r\n        });\r\n\r\n        button.addEventListener('click', async function (clickEvent) {\r\n            const itemHTML = button.parentElement.parentElement;\r\n\r\n            const id = itemHTML.getAttribute('data-id');\r\n            const thumbnail = itemHTML.querySelector('img').getAttribute('src');\r\n            const title = itemHTML.querySelector('p[class=\"item-title\"]').innerText;\r\n            const price = itemHTML.querySelector('p[class=\"item-price\"]').innerText.split(' ')[1];\r\n\r\n            const addedToCartEvent = new CustomEvent(\"addedToCart\", {\r\n                detail: {\r\n                    id: id,\r\n                    thumbnail: thumbnail,\r\n                    title: title,\r\n                    price: price,\r\n                    amount: 1\r\n                }\r\n            });\r\n\r\n            await fetch(cartURL, {\r\n                method: 'PUT',\r\n                headers: {'Content-Type': 'application/json'},\r\n                body: JSON.stringify({\r\n                    products: [{\r\n                        id,\r\n                        quantity: 1\r\n                    }]\r\n                })\r\n            }).then((value) => value.json())\r\n                .then(() => cartCounter.dispatchEvent(addedToCartEvent));\r\n        });\r\n    }\r\n}\r\n\r\nfunction createAddToCartPopup(text=\"The product has been added to your cart successfully!\"){\r\n    const newPopup = document.createElement('div');\r\n    const popupContent = document.createElement('div');\r\n    newPopup.appendChild(popupContent);\r\n    newPopup.setAttribute('class', 'add-to-cart-popup');\r\n    popupContent.innerText = text;\r\n\r\n    return newPopup;\r\n}\r\n\r\nfunction selectGalleryImage(currentCarousel, direction)\r\n{\r\n    let enabledImage = currentCarousel.querySelector(\"img:not([style*='display: none'])\");\r\n    let nextImage;\r\n\r\n    if(direction === 0)\r\n    {\r\n        nextImage = enabledImage.previousElementSibling;\r\n        if(nextImage === null)\r\n        {\r\n            nextImage = currentCarousel.lastElementChild;\r\n        }\r\n    }\r\n    else\r\n    {\r\n        nextImage = enabledImage.nextElementSibling;\r\n        if(nextImage === null)\r\n        {\r\n            nextImage = currentCarousel.firstElementChild;\r\n        }\r\n    }\r\n\r\n    enabledImage.style.setProperty('display', 'none');\r\n    nextImage.style.setProperty('display', 'inline');\r\n}\r\n\r\nfunction keyboardSelectGalleryImage(keyEvent)\r\n{\r\n    if(keyEvent.keyCode === 37)\r\n    {\r\n        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 0);\r\n    }\r\n\r\n    if(keyEvent.keyCode === 39)\r\n    {\r\n        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 1);\r\n    }\r\n}\r\n\r\nfunction setupCartUI()\r\n{\r\n    cartCounter.addEventListener('addedToCart', loadCartUIContent);\r\n\r\n    const cartIcon = document.getElementById('cart-icon');\r\n    const cartContents = document.getElementById('cart-contents');\r\n    cartIcon.addEventListener('mouseover', ()=>{\r\n\r\n        cartContents.style.setProperty('display', 'inline-block');\r\n    });\r\n\r\n    cartIcon.addEventListener('mouseout', ()=>{\r\n\r\n        cartContents.style.removeProperty('display');\r\n    });\r\n}\r\n\r\nfunction createCartHTMLForItem(item)\r\n{\r\n    const mainItemDiv = document.createElement('div');\r\n    mainItemDiv.setAttribute('data-id', item[\"id\"]);\r\n    mainItemDiv.setAttribute('class', 'cart-item-container');\r\n\r\n    const itemThumbnail = document.createElement('img');\r\n    itemThumbnail.setAttribute('class', 'cart-item-thumbnail');\r\n    itemThumbnail.setAttribute('src', item['thumbnail']);\r\n\r\n    const itemTitle = document.createElement('p');\r\n    itemTitle.setAttribute('class', 'cart-item-title');\r\n    itemTitle.innerText = item['title'];\r\n\r\n    const itemPrice = document.createElement('p');\r\n    itemPrice.setAttribute('class', 'cart-item-price');\r\n    itemPrice.innerText = `${item['price']}`;\r\n\r\n    const itemAmount = document.createElement('p');\r\n    itemAmount.setAttribute('class', 'cart-item-amount');\r\n    itemAmount.innerText = `x${item['quantity']}`;\r\n\r\n    mainItemDiv.appendChild(itemThumbnail);\r\n    mainItemDiv.appendChild(itemTitle);\r\n    mainItemDiv.appendChild(itemPrice);\r\n    mainItemDiv.appendChild(itemAmount);\r\n\r\n    return mainItemDiv;\r\n}\r\n\r\nfunction setupLoadButton(){\r\n    const loadButton = document.getElementById('load-more-button');\r\n    loadButton.addEventListener('click', async () => {\r\n        await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);\r\n    });\r\n}\r\n\r\n\r\nasync function setupUI() {\r\n    await setupProductCategoriesList();\r\n\r\n    document.getElementById('load-checkout-button').addEventListener('click', () => {\r\n        window.location = `checkout.html?cart-id=${cartID}`;\r\n    });\r\n\r\n    let numberOfElementsInCart = (await loadCartData(cartURL, false)).totalProducts;\r\n    document.getElementById('cart-counter').innerText = numberOfElementsInCart;\r\n}\r\n\r\nasync function loadCartUIContent(cartEvent) {\r\n    let cartData = await loadCartData(cartURL, true);\r\n\r\n    let currentCount = cartData.totalProducts;\r\n\r\n    const cartContainer = document.getElementById('cart-contents');\r\n\r\n    cartContainer.previousElementSibling.innerText = currentCount;\r\n\r\n    cartContainer.innerHTML = \"\";\r\n\r\n    for (const item of cartData.products) {\r\n        let itemHTML = createCartHTMLForItem(item);\r\n        cartContainer.appendChild(itemHTML);\r\n    }\r\n}\r\n\r\nasync function loadCartData(cartURL, fullRefresh = false) {\r\n    let cartStringData = sessionStorage.getItem(\"cart-products\");\r\n\r\n    let cartData = JSON.parse(cartStringData);\r\n    if(cartData !== null && fullRefresh === false)\r\n    {\r\n        return cartData;\r\n    }\r\n\r\n    let startTime = performance.now();\r\n\r\n    await fetch(cartURL, {\r\n        method: 'GET',\r\n        headers: {'Content-Type': 'application/json'}\r\n    }).then(r => r.json()).then(response => cartData = response);\r\n\r\n    let endTime = performance.now();\r\n    let timeElapsed = endTime - startTime;\r\n\r\n    console.log(`The fetch took ${timeElapsed / 1000} seconds to run.`);\r\n\r\n\r\n\r\n    const stringObjData = JSON.stringify(cartData);\r\n\r\n    sessionStorage.setItem(\"cart-products\", stringObjData);\r\n    return cartData;\r\n}\r\n\r\nasync function setupProductCategoriesList() {\r\n    const productCategoriesList = document.getElementsByClassName('product-categories')[0];\r\n\r\n    const productCategories = (await getProductsCategories());\r\n\r\n    for(const category of productCategories)\r\n    {\r\n        const categoryHTML = getHTMLForCategory(category);\r\n        productCategoriesList.appendChild(categoryHTML);\r\n    }\r\n}\r\n\r\nfunction getHTMLForCategory(category)\r\n{\r\n    const listItem = document.createElement('li');\r\n    const checkboxInput = document.createElement('input');\r\n\r\n    checkboxInput.setAttribute('type', 'radio');\r\n    checkboxInput.setAttribute('id', 'category-selection');\r\n    checkboxInput.setAttribute('name', 'category-selection');\r\n    const textNode = document.createTextNode(category);\r\n\r\n    listItem.appendChild(checkboxInput);\r\n    listItem.appendChild(textNode);\r\n\r\n\r\n    return listItem;\r\n}\r\n\r\nfunction handleFilterCriteriaChange()\r\n{\r\n    const categorySelectionRadio = document.getElementById('category-selection');\r\n    categorySelectionRadio.addEventListener('change', async (event) => {\r\n        sessionStorage.clear();\r\n        productFilteringCriterium = categorySelectionRadio.value;\r\n        console.log(productFilteringCriterium);\r\n\r\n        const productsContainer = document.getElementById(\"products-list\");\r\n        console.log(productsContainer);\r\n        productsContainer.innerHTML = \"\";\r\n\r\n        await loadShopProducts();\r\n        setupAddToCartButtons();\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/app.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/js/app.js\");\n\r\n\r\n\r\n(0,_app__WEBPACK_IMPORTED_MODULE_1__.init)();\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/index.js?");

/***/ }),

/***/ "./cart_id.json":
/*!**********************!*\
  !*** ./cart_id.json ***!
  \**********************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"token\":\"64c3857749d71\"}');\n\n//# sourceURL=webpack://internship-2023/./cart_id.json?");

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