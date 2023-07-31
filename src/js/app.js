import {createCard} from "./createProduct.js";
import {addDocumentListener} from "./galleryFunctions";

let totalProductsInPage=0;
let totalProductsInCart;
let mainContainer = document.querySelector(".product-grid");
const idCart="64c77ddd8e88f";

// function setCookie(name, value, days) {
//     const expirationDate = new Date();
//     expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + expirationDate.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }
//
// // obține conținutul unui cookie
// function getCookie(name) {
//     const cookieName = name + "=";
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const cookieArray = decodedCookie.split(';');
//     for (let i = 0; i < cookieArray.length; i++) {
//         let cookie = cookieArray[i];
//         while (cookie.charAt(0) === ' ') {
//             cookie = cookie.substring(1);
//         }
//         if (cookie.indexOf(cookieName) === 0) {
//             return cookie.substring(cookieName.length, cookie.length);
//         }
//     }
//     return null;
// }

export function getTotalProductsInPage(){
    return totalProductsInPage;
}
export function fetchCartProducts() {
    return fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`, {
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
    fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`)
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
    fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`, {
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




