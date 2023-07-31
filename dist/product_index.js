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

/***/ "./src/js/cart/cart_script.js":
/*!************************************!*\
  !*** ./src/js/cart/cart_script.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   handleCartHoverEvent: () => (/* binding */ handleCartHoverEvent),\n/* harmony export */   loadCart: () => (/* binding */ loadCart),\n/* harmony export */   updateHeaderCartNumbers: () => (/* binding */ updateHeaderCartNumbers)\n/* harmony export */ });\n/* harmony import */ var _product_page_product_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../product_page/product_api */ \"./src/js/product_page/product_api.js\");\n/* harmony import */ var _cart_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart_api */ \"./src/js/cart/cart_api.js\");\n/* harmony import */ var _main_products_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../main_products_script */ \"./src/js/main_products_script.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ \"./src/js/utils.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main_products_script__WEBPACK_IMPORTED_MODULE_2__]);\n_main_products_script__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\n\r\nlet cart = await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.getCart)();\r\nlet removeBtnIsPressed=false;\r\nlet value=0;\r\nasync function loadCart(_cart=cart) {\r\n\r\n\r\n    for (let cartItem of _cart.products) {\r\n        let cartItemHTML = findItemInCartHTML(cartItem.id);\r\n        if (!cartItemHTML) {\r\n            addNodeElementToCart(cartItem);\r\n        } else {\r\n            const cartItemCount = cartItemHTML.querySelector('.cart-item-count');\r\n            const count = parseInt(cartItemCount.innerText.split('x')[1]);\r\n            if (count !== cartItem.quantity) {\r\n                cartItemCount.innerText = ` x${cartItem.quantity}`;\r\n            }\r\n        }\r\n    }\r\n    await updateCartTotalPrice();\r\n    await updateCartCount();\r\n\r\n\r\n}\r\n\r\nfunction handleCartHoverEvent() {\r\n    const cartNode = document.getElementById('cart');\r\n    const cartItemsNode = document.querySelector('#cart-items');\r\n    const cartProductsNode = document.querySelector('.cart-products');\r\n    cartNode.addEventListener('mouseover', () => {\r\n        cartItemsNode.style.display = 'flex';\r\n    });\r\n\r\n    cartItemsNode.addEventListener('mouseout', () => {\r\n        cartItemsNode.style.display = 'none';\r\n    });\r\n    cartProductsNode.addEventListener('mouseover', () => {\r\n        cartItemsNode.style.display = 'block';\r\n    });\r\n}\r\n\r\nasync function removeItemFromCart(productId) {\r\n    const cartItemNode = document.querySelector(`.cart-item[product_id=\"${productId}\"]`);\r\n    const cartItemCount = cartItemNode.querySelector('.cart-item-count');\r\n    const count = parseInt(cartItemCount.innerText.split('x')[1]);\r\n    console.log(count, value);\r\n    if (count + value > 1) {\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.updateProductAPI)(productId, value))['data'];\r\n        await updateCountForItem(productId, value);\r\n        console.log('fetched');\r\n    } else {\r\n        cartItemNode.remove();\r\n        cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.removeFromCartAPI)(productId))['data'];\r\n        console.log('fetched');\r\n    }\r\n    await updateCartTotalPrice();\r\n    await updateCartCount();\r\n\r\n}\r\n\r\nfunction findItemInCartHTML(productId) {\r\n    return document.querySelector(`.cart-item[product_id=\"${productId}\"]`);\r\n\r\n}\r\n\r\nfunction addNodeElementToCart(jsonItem) {\r\n    const cartContainer = document.querySelector('.cart-products');\r\n    const cartItemNode = document.createElement('div');\r\n    const discountedPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);\r\n    const quantity = jsonItem.quantity ? jsonItem.quantity : 1;\r\n\r\n\r\n    cartItemNode.classList.add('cart-item');\r\n    cartItemNode.setAttribute('product_id', jsonItem.id);\r\n    cartItemNode.innerHTML = `\r\n        <div class=\"cart-item-thumbnail-container\">\r\n            <img src=\"${jsonItem.thumbnail}\" alt=\"item thumbnail\" class=\"cart-item-thumbnail\">\r\n        </div>\r\n        <div class=\"cart-item-info-container\">\r\n            <span class=\"cart-title-wrapper\">\r\n                <span class=\"cart-item-title\">  ${jsonItem.title}</span>\r\n                <span class=\"cart-item-count\" product_id=\"${jsonItem.id}\"> x${quantity}</span>\r\n            </span>\r\n            <p class=\"cart-item-price\"> <s>$${jsonItem.price * quantity}</s> $${discountedPrice.toFixed(2)}</p>\r\n            <button class=\"remove-from-cart-btn\" product_id=\"${jsonItem.id}\">Remove</button>\r\n        </div>\r\n        `;\r\n\r\n    cartItemNode.querySelector('.cart-item-thumbnail-container').addEventListener('click', (event) => {\r\n        const url = `product.html?id=${jsonItem.id}`;\r\n        window.open(url, '_blank');\r\n    });\r\n\r\n    cartItemNode.querySelector('.remove-from-cart-btn').addEventListener('click', async (event) => {\r\n        // await removeItemFromCart(jsonItem.id);\r\n        value-=1;\r\n        debounceRemoveProduct(jsonItem.id);\r\n    });\r\n    cartContainer.appendChild(cartItemNode);\r\n}\r\n\r\nconst debounceRemoveProduct = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.debounce)(async (productId)=>{\r\n    if (!removeBtnIsPressed){\r\n        removeBtnIsPressed=true;\r\n        await removeItemFromCart(productId);\r\n        value=0;\r\n        removeBtnIsPressed=false;\r\n    }\r\n});\r\nasync function updateHeaderCartNumbers(_cart=cart){\r\n    await updateCartTotalPrice(_cart);\r\n    await updateCartCount(_cart);\r\n}\r\nasync function updateCartTotalPrice(_cart=cart){\r\n    const totalPriceNode = document.querySelector('.cart-total');\r\n    const cartItemsNode = document.querySelector('.cart-products');\r\n    if (_cart.products.length === 0) {\r\n        cartItemsNode.style.paddingBottom = '0';\r\n        totalPriceNode.style.display = 'none';\r\n        return;\r\n    }\r\n    cartItemsNode.style.paddingBottom = '3rem';\r\n    totalPriceNode.style.display = 'block';\r\n\r\n    let totalPrice = cart.total;\r\n    totalPriceNode.innerHTML = `<p>Total: <s>$${totalPrice}</s> $${cart[\"discountTotal\"].toFixed(2)}</p>`;\r\n}\r\n\r\nasync function addToCart(productId) {\r\n    cart = (await (0,_cart_api__WEBPACK_IMPORTED_MODULE_1__.addToCartAPI)(productId, 1))['data']; //update cart\r\n    await loadCart();\r\n}\r\n\r\nasync function updateCartCount(_cart=cart) {\r\n    let count = 0;\r\n    for (const cartItem of _cart.products) {\r\n        count += cartItem.quantity;\r\n    }\r\n    const cartCount = document.getElementById('cart-count');\r\n    cartCount.innerText = String(count);\r\n\r\n\r\n}\r\n\r\nfunction updateCountForItem(productId, value) {\r\n    const cartItemNode = document.querySelector(`.cart-item-count[product_id=\"${productId}\"]`);\r\n    const count = parseInt(cartItemNode.innerText.split('x')[1]);\r\n    cartItemNode.innerText = ` x${count + value}`;\r\n}\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/cart/cart_script.js?");

/***/ }),

/***/ "./src/js/main_products_script.js":
/*!****************************************!*\
  !*** ./src/js/main_products_script.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadFilterSection: () => (/* binding */ loadFilterSection),\n/* harmony export */   loadItems: () => (/* binding */ loadItems),\n/* harmony export */   loadShopPageForCategory: () => (/* binding */ loadShopPageForCategory)\n/* harmony export */ });\n/* harmony import */ var _cart_cart_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart/cart_script.js */ \"./src/js/cart/cart_script.js\");\n/* harmony import */ var _product_page_product_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product_page/product_api.js */ \"./src/js/product_page/product_api.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/js/utils.js\");\n/* harmony import */ var _cart_cart_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart/cart_api */ \"./src/js/cart/cart_api.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cart_cart_script_js__WEBPACK_IMPORTED_MODULE_0__]);\n_cart_cart_script_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\n// const newCart=await getNewCart();\r\n// console.log(newCart);\r\n\r\nconst allItems=(await (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getAllItems)())['products'];\r\nfunction getHtmlNodeItem(jsonItem){\r\n\r\n    if (!jsonItem.currentImageIndex)\r\n        jsonItem['currentImageIndex']=0;\r\n\r\n    const itemNode=document.createElement('div');\r\n    itemNode.classList.add('item');\r\n    // const discountPrice=jsonItem.price-jsonItem.price*(jsonItem.discountPercentage/100);\r\n    const discountPrice=jsonItem.price*(1-jsonItem.discountPercentage/100);\r\n    itemNode.innerHTML=`\r\n\r\n        \r\n       <div class=\"item_thumbnail_container\" product-id=\"${jsonItem.id}\">\r\n          \r\n           <img class=\"item_thumbnail\" src=\"${jsonItem.thumbnail}\" alt=\"${jsonItem.title}\" loading=\"lazy\">\r\n       </div>\r\n\r\n    \r\n    <div class=\"item_info_container\">\r\n        <div class=\"item_main_info\">\r\n            <p class=\"item_title\">${jsonItem.title}</p>\r\n            <p class=\"item_price\"><s>$${jsonItem.price}</s> $${discountPrice.toFixed(2)}</p>\r\n        </div>\r\n     <div class=\"item_secondary_info\">\r\n        <p class=\"item_rating\">Rating: ${jsonItem.rating}/5</p>\r\n        <button class=\"add_to_cart_btn\" product-id=\"${jsonItem.id}\" event-set=\"false\">Add to cart</button> <!--\"product id\" may be without quotes-->\r\n        \r\n    </div>\r\n    \r\n    </div>\r\n    `;\r\n\r\n    return itemNode;\r\n}\r\n\r\nfunction showNotification(message){\r\n    const notification=document.getElementById('notification');\r\n    const notificationParent=document.getElementsByClassName('notification-container')[0];\r\n    notificationParent.style.visibility='visible';\r\n    notification.innerHTML=message;\r\n    setTimeout(()=>{\r\n        notificationParent.style.visibility='hidden';\r\n    },5000);\r\n}\r\nfunction handleButtonEvents(){\r\n    const buttons=document.getElementsByClassName('add_to_cart_btn');\r\n    for (const btn of buttons){\r\n        if (btn.getAttribute('event-set')==='false') {\r\n            btn.setAttribute('event-set','true');\r\n            btn.addEventListener('click', (event) => {\r\n                const productId = event.target.getAttribute(\"product-id\");\r\n                (0,_cart_cart_script_js__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId);\r\n                showNotification(\"Added to cart\");\r\n                btn.innerHTML = 'Added to cart';\r\n                btn.style.backgroundColor = '#d0ffd3';\r\n                btn.setAttribute('disabled', 'true');\r\n                setTimeout(() => {\r\n                    btn.innerHTML = 'Add to cart';\r\n                    btn.style.backgroundColor = '#f5f5f5';\r\n                    btn.removeAttribute('disabled');\r\n                }, 5000);\r\n            });\r\n        }\r\n    }\r\n    const loadMoreButton=document.querySelector('.load-more-btn');\r\n    if (loadMoreButton.getAttribute('event-set')==='false'){\r\n        loadMoreButton.setAttribute('event-set','true');\r\n        loadMoreButton.addEventListener('click',async ()=>{\r\n            await loadItems(true);\r\n        });\r\n    }\r\n\r\n\r\n    document.querySelector('#cart').addEventListener('click',()=>{\r\n        window.open('cart_page.html','_blank');\r\n    });\r\n}\r\nasync function appendNodesAndAttachSelfPageListeners(items,container){\r\n    for (const item of items) {\r\n        const itemNode = getHtmlNodeItem(item);\r\n        const thumbnailContainer = itemNode.getElementsByClassName('item_thumbnail_container')[0];\r\n        thumbnailContainer.addEventListener('click', () => {\r\n            const url = `product.html?id=${item.id}`;\r\n            window.open(url, '_blank');\r\n        });\r\n        container.appendChild(itemNode);\r\n    }\r\n}\r\nlet selectedCategory='';\r\nasync function loadItems(loadMorePressed=false){\r\n\r\n    const shopContainer=document.getElementsByClassName('shop-items')[0];\r\n\r\n    if (localStorage.getItem('loadedItems') === null){\r\n        console.log('Loaded items');\r\n        localStorage.setItem('loadedItems', JSON.stringify(await (0,_product_page_product_api_js__WEBPACK_IMPORTED_MODULE_1__.getItems)()));\r\n    }\r\n    if (!loadMorePressed){\r\n        let items=localStorage.getItem('loadedItems');\r\n        items=JSON.parse(items);\r\n        await appendNodesAndAttachSelfPageListeners(items,shopContainer);\r\n    }\r\n    else{\r\n\r\n        // const newItems=selectedCategory!='' ? (await getProductsForCategory(selectedCategory))['products'] : await getItems();\r\n        const fitleredItems=allItems.filter((item)=>item.category===selectedCategory);\r\n        const newItems=selectedCategory!='' ? fitleredItems : await (0,_product_page_product_api_js__WEBPACK_IMPORTED_MODULE_1__.getItems)();\r\n        console.log(newItems.length);\r\n        await appendNodesAndAttachSelfPageListeners(newItems,shopContainer);\r\n    }\r\n\r\n\r\n    handleButtonEvents();\r\n    await loadFilterSection();\r\n\r\n}\r\n\r\n\r\nasync function loadFilterSection(){\r\n    const filterSectionWrapper=document.querySelector('.filter-section');\r\n   filterSectionWrapper.innerHTML='<p>Categories:</p>';\r\n    const categories=await (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getAllAvailableCategories)();\r\n    for (const category of categories){\r\n        const categoryNode=document.createElement('button');\r\n        categoryNode.setAttribute('title',category);\r\n        categoryNode.classList.add('filter-btn');\r\n        categoryNode.innerHTML=category;\r\n        filterSectionWrapper.appendChild(categoryNode);\r\n        categoryNode.addEventListener('click',async ()=>{\r\n            await loadShopPageForCategory(category);\r\n            selectedCategory=category;\r\n        });\r\n    }\r\n}\r\n\r\nasync function loadShopPageForCategory(category){\r\n\r\n    // const items=(await getProductsForCategory(category))['products'];\r\n    const items=allItems.filter((item)=>item.category===category);\r\n    console.log(items);\r\n    const shopContainer=document.getElementsByClassName('shop-items')[0];\r\n    shopContainer.innerHTML='';\r\n    await appendNodesAndAttachSelfPageListeners(items,shopContainer);\r\n    handleButtonEvents();\r\n}\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://internship-2023/./src/js/main_products_script.js?");

/***/ }),

/***/ "./src/js/product_page/product_api.js":
/*!********************************************!*\
  !*** ./src/js/product_page/product_api.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getItemById: () => (/* binding */ getItemById),\n/* harmony export */   getItems: () => (/* binding */ getItems)\n/* harmony export */ });\nasync function getItems(api='https://dummyjson.com/products/?limit=10&skip=10'){\r\n    const response=await fetch(api);\r\n    const items=await response.json();\r\n    console.log(items.products);\r\n    return items.products;\r\n}\r\nasync function getItemById(id,api='https://dummyjson.com/products'){\r\n    const response=await fetch(`${api}/${id}`);\r\n    const item=await response.json();\r\n    return item;\r\n}\n\n//# sourceURL=webpack://internship-2023/./src/js/product_page/product_api.js?");

/***/ }),

/***/ "./src/js/product_page/product_index.js":
/*!**********************************************!*\
  !*** ./src/js/product_page/product_index.js ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _product_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product_api.js */ \"./src/js/product_page/product_api.js\");\n/* harmony import */ var _cart_cart_script_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cart/cart_script.js */ \"./src/js/cart/cart_script.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cart_cart_script_js__WEBPACK_IMPORTED_MODULE_1__]);\n_cart_cart_script_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\nconst sampleItem =\r\n    {\r\n        \"id\": 1,\r\n        \"title\": \"iPhone 9\",\r\n        \"description\": \"An apple mobile which is nothing like apple\",\r\n        \"price\": 549,\r\n        \"discountPercentage\": 12.96,\r\n        \"rating\": 4.69,\r\n        \"stock\": 94,\r\n        \"brand\": \"Apple\",\r\n        \"category\": \"smartphones\",\r\n        \"thumbnail\": \"https://i.dummyjson.com/data/products/1/thumbnail.jpg\",\r\n        \"images\": [\r\n            \"https://i.dummyjson.com/data/products/1/1.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/2.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/3.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/4.jpg\",\r\n            \"https://i.dummyjson.com/data/products/1/thumbnail.jpg\"\r\n        ]\r\n    }\r\nlet currentImageIndex = 0;\r\n\r\nfunction showCurrentImage(index){\r\n    const imagesContainer=document.querySelector(\".images\");\r\n    const images=imagesContainer.querySelectorAll(\"img\");\r\n\r\n    for (let i=0; i<images.length; i++){\r\n        if (i===index)\r\n            images[i].classList.remove(\"hidden\");\r\n        else\r\n            images[i].classList.add(\"hidden\");\r\n    }\r\n}\r\nfunction nextImage() {\r\n\r\n    currentImageIndex++;\r\n    const imagesContainer = document.querySelector(\".images\");\r\n    const width = imagesContainer.clientWidth;\r\n    const translateX = currentImageIndex * width;\r\n\r\n    if (currentImageIndex >= sampleItem.images.length) {\r\n        currentImageIndex = -1;\r\n        imagesContainer.style.transform = `translateX(0)`;\r\n        showCurrentImage(currentImageIndex+1);\r\n    } else{\r\n        imagesContainer.style.transform = `translateX(-${translateX}px)`;\r\n        showCurrentImage(currentImageIndex);\r\n    }\r\n\r\n}\r\n\r\nfunction prevImage() {\r\n\r\n    const imagesContainer = document.querySelector(\".images\");\r\n    const width = imagesContainer.clientWidth;\r\n    currentImageIndex--;\r\n\r\n    if (currentImageIndex < 0) {\r\n        currentImageIndex = sampleItem.images.length - 1;\r\n        imagesContainer.style.transform = `translateX(-${currentImageIndex * width}px)`;\r\n        showCurrentImage(currentImageIndex);\r\n    } else {\r\n        const translateX = currentImageIndex * width;\r\n        imagesContainer.style.transform = `translateX(-${translateX}px)`;\r\n        showCurrentImage(currentImageIndex);\r\n    }\r\n\r\n\r\n}\r\n\r\nfunction loadProduct(jsonItem) {\r\n    const imagesContainer = document.querySelector(\".images\");\r\n    imagesContainer.innerHTML = \"\";\r\n    const discountPrice=(jsonItem.price*(1-jsonItem.discountPercentage/100)).toFixed(2);\r\n    for (const url of jsonItem.images) {\r\n        const img = document.createElement(\"img\");\r\n        img.src = url;\r\n        img.alt = jsonItem.title;\r\n        img.loading = \"lazy\";\r\n        document.querySelector(\".images\").append(img);\r\n        img.classList.add(\"hidden\");\r\n    }\r\n    document.querySelector(\".info\").innerHTML = `\r\n    <div class=\"main-info\">\r\n        <h1>${jsonItem.title}</h1>\r\n        <p>Price: $${discountPrice}</p>\r\n    </div>\r\n    <div class=\"item-section-2\">\r\n        <p>Rating: ${jsonItem.rating}</p>\r\n        <p>Stock: ${jsonItem.stock}</p>\r\n    </div>\r\n    \r\n    <p>${jsonItem.description}</p>\r\n    \r\n    <div class=\"item-section-1\">\r\n        <p>Category: ${jsonItem.category}</p>\r\n        <p>Brand: ${jsonItem.brand}</p>\r\n    </div>\r\n\r\n    `;\r\n}\r\nasync function getJsonProduct(){\r\n    const itemId = Number(new URLSearchParams(window.location.search).get(\"id\"));\r\n    const jsonItem = await (0,_product_api_js__WEBPACK_IMPORTED_MODULE_0__.getItemById)(itemId);\r\n    return jsonItem;\r\n}\r\n\r\n    setTimeout( () => {\r\n        const jsonItem = getJsonProduct();\r\n        getJsonProduct().then(async (jsonItem) => {\r\n            loadProduct(jsonItem);\r\n            showCurrentImage(currentImageIndex);\r\n            await (0,_cart_cart_script_js__WEBPACK_IMPORTED_MODULE_1__.loadCart)();\r\n            (0,_cart_cart_script_js__WEBPACK_IMPORTED_MODULE_1__.handleCartHoverEvent)();\r\n        });\r\n    }, 1000);\r\n\r\n\r\n    const leftArrow = document.querySelector(\".left-arrow\");\r\n    const rightArrow = document.querySelector(\".right-arrow\");\r\n    rightArrow.addEventListener(\"click\", nextImage);\r\n    leftArrow.addEventListener(\"click\", prevImage);\r\n\r\n\r\n    document.addEventListener(\"keydown\", (event) => {\r\n        if (event.key === \"ArrowRight\")\r\n            nextImage();\r\n        else if (event.key === \"ArrowLeft\")\r\n            prevImage();\r\n    });\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://internship-2023/./src/js/product_page/product_index.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   debounce: () => (/* binding */ debounce),\n/* harmony export */   getAllAvailableCategories: () => (/* binding */ getAllAvailableCategories),\n/* harmony export */   getAllItems: () => (/* binding */ getAllItems),\n/* harmony export */   getProductsForCategory: () => (/* binding */ getProductsForCategory)\n/* harmony export */ });\nfunction debounce(func, timeout = 800) {\r\n    let timer;\r\n    return (...args) => {\r\n        clearTimeout(timer);\r\n        timer = setTimeout(() => {\r\n            func.apply(this, args);\r\n        }, timeout);\r\n    };\r\n}\r\n\r\nasync function getAllAvailableCategories() {\r\n    return await fetch('https://dummyjson.com/products/categories', {\r\n        method: 'GET',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n}\r\n\r\nasync function getAllItems() {\r\n    return await fetch('https://dummyjson.com/products/?limit=1000&skip=0', {\r\n        method: 'GET',\r\n        headers: {'Content-Type': 'application/json'},\r\n    }).then(response => response.json()).then((json) => {\r\n        return json;\r\n    });\r\n}\r\n\r\nasync function getProductsForCategory(category) {\r\n    console.log('fetched');\r\n    return await fetch(`https://dummyjson.com/products/category/${category}?limit=5&skip=3`, {\r\n        method: 'GET',\r\n        headers: {'Content-Type': 'application/json'},\r\n    })\r\n        .then(res => {\r\n            return res.json();\r\n        });\r\n\r\n\r\n}\r\n\n\n//# sourceURL=webpack://internship-2023/./src/js/utils.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/product_page/product_index.js");
/******/ 	
/******/ })()
;