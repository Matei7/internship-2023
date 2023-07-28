import {createCard} from "./createProduct.js";
import {addDocumentListener} from "./galleryFunctions";

let totalProductsInPage=0;
let totalProductsInCart;
let mainContainer = document.querySelector(".product-grid");

export function getTotalProductsInPage(){
    return totalProductsInPage;
}
export function fetchCartProducts() {
    return fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.products;
        })
        .catch(error => {
            console.error('Error fetching cart products:', error);
            return [];
        });
}

function getHowManyProductsInCart() {
    fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0')
        .then(response => response.json())
        .then(data => {
            totalProductsInCart = data.totalQuantity;
            if (data.totalQuantity>0) {
                for (const product of data.products) {
                    updateCartItemsContainer();
                }
                 console.log(totalProductsInCart);
                cart.textContent = `Cart: ${totalProductsInCart} Products`;//intrebare? imi face intarziere si nu pe loc update
            }
        });
}

function loadProductsInPage() {
    fetch(`https://dummyjson.com/products?limit=9&skip=${totalProductsInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productsDummy = data.products;
            productsDummy.forEach(product => {
                const cardElement = createCard(product);
                addAddToCardBtnListener(cardElement);
                mainContainer.appendChild(cardElement);
            });
            totalProductsInPage += 9;
        })
        .catch(error => {
            console.error("Error loading products:", error);
            throw error;
        });
}







function updateCartItemsContainer() {
    fetchCartProducts()
        .then(productsFromCart => {
            const cart = document.getElementById("cart");
            for (const product of productsFromCart) {
                if (document.querySelector(`.item-box[data-id="${product.id}"]`) != null) {
                    const itemBox = document.querySelector(`.item-box[data-id="${product.id}"]`);
                    const itemQuantity = itemBox.querySelector(".item-box-number");
                    const itemTotalPrice = itemBox.querySelector(".item-box-total");
                    itemQuantity.textContent = product.quantity;
                    itemTotalPrice.textContent = `$${(product.quantity * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;
                } else {
                    let cartList = document.getElementsByClassName("cart-window-list");
                    const itemBox = document.createElement("div");
                    itemBox.classList.add("item-box");
                    itemBox.setAttribute("data-id", product.id);
                    const itemImage = document.createElement("img");
                    itemImage.classList.add("item-box__image");
                    itemImage.src = product.thumbnail;
                    itemImage.alt = product.title;
                    const itemTitle = document.createElement("p");
                    itemTitle.classList.add("item-box-title");
                    itemTitle.textContent = product.title;
                    const itemPrice = document.createElement("p");
                    itemPrice.classList.add("item-box-price");
                    itemPrice.textContent = `$${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}`;
                    const itemQuantity = document.createElement("p");
                    itemQuantity.classList.add("item-box-number");
                    itemQuantity.textContent = product.quantity;
                    const itemTotalPrice = document.createElement("p");
                    itemTotalPrice.classList.add("item-box-total");

                    itemTotalPrice.textContent = `$${(product.quantity * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;
                    itemBox.appendChild(itemImage);
                    itemBox.appendChild(itemTitle);
                    itemBox.appendChild(itemPrice);
                    itemBox.appendChild(itemQuantity);
                    itemBox.appendChild(itemTotalPrice);
                    cartList[0].appendChild(itemBox);
                }
            }
        })
        .catch(error => {
            console.error('Error updating cart items:', error);
        });
}

function showPopUp() {
    const popUp = document.createElement("div");
    popUp.classList.add("pop-up");
    popUp.textContent = "Product added successfully";
    const bodyElem = document.querySelector("body");
    bodyElem.appendChild(popUp);
}

function addProductInCartRequest(cardElement) {
    const productId = Number(cardElement.dataset.id);
    fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            products: [
                {
                    id: productId,
                    quantity: 1,
                }
            ]
        })
    })
        .then(res => res.json())
        .then(console.log);

    getHowManyProductsInCart();
}

export  function addAddToCardBtnListener(product) {
    let btnAddToCart = product.querySelector(".product-grid__product-card__add-to-cart-button");
    btnAddToCart.addEventListener("click", function () {
        const initialColor = btnAddToCart.style.backgroundColor;
        const initialText = btnAddToCart.textContent;
        btnAddToCart.style.backgroundColor = "#023020";
        btnAddToCart.textContent = "Added to cart";
        btnAddToCart.style.scale = "1.3";
        addProductInCartRequest(product);
        showPopUp();
        setTimeout(function () {
            btnAddToCart.style.backgroundColor = initialColor;
            btnAddToCart.textContent = initialText;
            btnAddToCart.style.scale = "1";
            const bodyElement = document.querySelector("body");
            bodyElement.removeChild(bodyElement.lastChild);
        }, 3000);
    });
}


export function init() {
    getHowManyProductsInCart();
    loadProductsInPage();
	addDocumentListener();
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            loadProductsInPage();
        }
    };
    const cartButton = document.getElementById("cart");
    cartButton.addEventListener("mouseover", function () {
        const cartWindow = document.querySelector(".cart-window");
        cartWindow.setAttribute("style", "display:block")
        cartWindow.classList.add("show")
    });
    cartButton.addEventListener("mouseout", function () {
        const cartWindow = document.querySelector(".cart-window");
        cartWindow.setAttribute("style", "display:none")
        cartWindow.classList.remove("show")
    });
    cartButton.addEventListener("click", function () {
        window.location.href = "checkoutPage.html";
    });

}



//checkout.js
// import {fetchCartProducts} from "./app";
//
// let checkoutWindow = document.querySelector(".checkout-window__grid");
// let totalText = document.querySelector(".checkout-window-total");
// async function updateTotalText() {
//     try {
//         const total = await fetchTotal();
//         totalText.textContent = `Total: ${total.toFixed(2)}`;
//     } catch (error) {
//         console.error('Error updating total text:', error);
//     }
// }
// export function fetchTotal() {
//     return fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Request failed with status ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             return data.total;
//         })
//         .catch(error => {
//             console.error('Error fetching cart products:', error);
//             return [];
//         });
// }
//
//
// function plusMinusButtonsListener(card) {
//     const minusButton = document.querySelector(".minus");
//     const plusButton = document.querySelector(".plus");
//     const input = document.querySelector(".input-text");
//     minusButton.addEventListener("click", function () {
//         input.value--;
//         console.log("aici");
//     });
//     plusButton.addEventListener("click", function () {
//         input.value++;
//         console.log("aici");
//     });
// }
//
// function createItemBoxCheckout(product){
//     let boxItem = document.createElement("div");
//     boxItem.classList.add("checkout-window__grid__box-item");
//     boxItem.setAttribute("data-id", product.id);
//     let hmtlPart= `
//         <img src=${product.thumbnail} alt="Product Image" class="box-item__image">
//         <p class="box-item__title">${product.title}</p>
//         <p class="box-item__price">${product.discountedPrice.toFixed(2)}</p>
//         <div class="quantity buttons_added">
//           <input type="button" value="-" class="minus">
//           <input type="number" step="1" min="1" max="" value=${product.quantity}  class="input-text qty text" size="4" >
//           <input type="button" value="+" class="plus">
//         </div>
//         <p class="box-item__total-price"> ${(product.quantity * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}</p>
//       </div>`;
//     boxItem.innerHTML = hmtlPart;
//     return boxItem;
//
// }
// function plusMinusBtnListener(card){
//     const plusBtn = card.querySelector(".plus");
//     const minusBtn = card.querySelector(".minus");
//     const quantity = card.querySelector(".input-text.qty.text");
//     plusBtn.addEventListener("click", () => {
//         quantity.value++;
//         increaseQuantityRequest(card);
//         showCheckoutProducts();
//
//     });
//     minusBtn.addEventListener("click", () => {
//         if(quantity.value>1){
//             quantity.value--;
//             //implemnt decrease quantity request---------------------------
//         }
//     });
// }
//
// function increaseQuantityRequest(cardElement) {
//     const productId = Number(cardElement.dataset.id);
//     fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             products: [
//                 {
//                     id: productId,
//                     quantity: 1,
//                 }
//             ]
//         })
//     })
//         .then(res => res.json())
//         .then(console.log);
//
// }
//
//
// export function showCheckoutProducts(){
//     fetchCartProducts()
//         .then(productsFromCart => {
//             for (const product of productsFromCart) {
//                 console.log(product);
//                 if(document.querySelector(`.checkout-window__grid__box-item[data-id="${product.id}"]`) != null){
//                     const itemBox = document.querySelector(`.checkout-window__grid__box-item[data-id="${product.id}"]`);
//                     const itemQuantity = itemBox.querySelector(".input-text.qty.text");
//                     const itemTotalPrice = itemBox.querySelector(".box-item__total-price");
//                     itemQuantity.textContent = product.quantity;
//                     itemTotalPrice.textContent = `${(product.quantity * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;
//                 }
//                 else{
//                     let card=createItemBoxCheckout(product);
//                     checkoutWindow.appendChild(card);
//                     plusMinusBtnListener(card);
//                     updateTotalText();
//
//                 }
//             }
//         })
//         .catch(error => {
//             console.error('Error show cart items:', error);
//         });
// }
//
// showCheckoutProducts();



