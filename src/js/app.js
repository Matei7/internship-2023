import {createCard,createCartCard} from "./createProduct.js";
import {addDocumentListener} from "./galleryFunctions";

let totalProductsInPage=0;
let totalProductsInCart;
let mainContainer = document.querySelector(".product-grid");
const idCart="64c77ddd8e88f";
const productsLocalStorage = "productsStorage"
let isFetching=false;//pentru scroll infinit
let categories=[];
let scrollAllProductsFilter=true;//sa nu se dea scroll decat daca sunt pe all products

function saveProductsInLocalStorage(products){
    let productsFromStorage = getProductsFromLocalStorage();
    if(productsFromStorage!=null){
        productsFromStorage = [...productsFromStorage, ...products];
        localStorage.setItem(productsLocalStorage, JSON.stringify(productsFromStorage));
    }
    else{
        localStorage.setItem(productsLocalStorage, JSON.stringify(products));
    }
}

function getProductsFromLocalStorage() {
    const cachedProducts = localStorage.getItem(productsLocalStorage);
    if (cachedProducts) {
        return JSON.parse(cachedProducts);
    }
    return null;
}

function saveCategoryFilters(category){
    if(!categories.includes(category)){
        categories.push(category);
        const categorySection = document.querySelector(".category-filter");
        const categoryElement = document.createElement("p");
        categoryElement.innerText = category;
        categoryElement.addEventListener("click", function () {
            scrollAllProductsFilter=false;
            document.querySelectorAll(".filtered-out").forEach(card => {
                card.classList.remove("filtered-out");
            });
            const cards = document.querySelectorAll(".product-grid__product-card");
            let counter=0;
            cards.forEach(card => {
                if (counter < totalProductsInPage) {
                    const categoryElement = card.querySelector(".category");
                    const categoryText = categoryElement.textContent.trim().split(":")[1].trim()
                    console.log(categoryText);
                    if (categoryText !== category) {
                        card.classList.add("filtered-out");
                    }
                }
                counter++;
            });
        });
        categorySection.appendChild(categoryElement);
    }
}

export function getTotalProductsInPage(){
    return totalProductsInPage;
}

async function loadProductsInPage() {
    const productsFromStorage = getProductsFromLocalStorage();
    if (productsFromStorage && productsFromStorage.length >= totalProductsInPage+9) {
        for (let i = totalProductsInPage; i < totalProductsInPage + 9; i++) {
            const cardElement = createCard(productsFromStorage[i]);
            addAddToCardBtnListener(cardElement);
            mainContainer.appendChild(cardElement);
            saveCategoryFilters(cardElement.querySelector(".category").textContent.trim().split(":")[1].trim());
        }
        totalProductsInPage += 9;
        return;
    }
    if(!isFetching){
        isFetching=true;
        await fetch(`https://dummyjson.com/products?limit=9&skip=${totalProductsInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const productsDummy = data.products;
                saveProductsInLocalStorage(productsDummy);
                productsDummy.forEach(product => {
                    saveCategoryFilters(product.category);
                    const cardElement = createCard(product);
                    addAddToCardBtnListener(cardElement);
                    mainContainer.appendChild(cardElement);
                });
                totalProductsInPage += 9;
                isFetching=false;
            })
            .catch(error => {
                console.error("Error loading products:", error);
                throw error;
            });
    }
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

async function getHowManyProductsInCart() {
    await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`)
        .then(response => response.json())
        .then(data => {
            totalProductsInCart = data.totalQuantity;
            if (data.totalQuantity>0) {
                for (const product of data.products) {
                    updateCartItemsContainer();
                }
                 console.log(totalProductsInCart);
                console.log(cart);
                 cart.textContent = `Cart: ${totalProductsInCart} Products`;
            }
        });
}



async function updateCartItemsContainer() {
    await fetchCartProducts()
        .then(productsFromCart => {
            for (const product of productsFromCart) {
                if (document.querySelector(`.item-box[data-id="${product.id}"]`) != null) {
                    const itemBox = document.querySelector(`.item-box[data-id="${product.id}"]`);
                    const itemQuantity = itemBox.querySelector(".item-box-number");
                    const itemTotalPrice = itemBox.querySelector(".item-box-total");
                    itemQuantity.textContent = product.quantity;
                    itemTotalPrice.textContent = `$${(product.quantity * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;
                } else {
                    createCartCard(product);
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
        .then(getHowManyProductsInCart);
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
        }, 2000);
    });
}

function addCartListener() {
    const cartButton = document.getElementById("cart");
    cartButton.addEventListener("mouseover", function () {
        const cartWindowList= document.querySelector(".cart-window-list");
        const cartWindow = document.querySelector(".cart-window");
        cartWindow.classList.add("show")
        cartWindow.setAttribute("style", "display:block")
        if(cartWindowList.children.length===0){
            const emptyCart=document.createElement("p");
            emptyCart.classList.add("empty-cart");
            emptyCart.textContent="YOUR CART IS EMPTY";
            cartWindowList.appendChild(emptyCart);
        }
        else{
            const emptyCart=document.querySelector(".empty-cart");
            if(emptyCart!=null){
                cartWindowList.removeChild(emptyCart);
            }
        }

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

export function init() {
    getHowManyProductsInCart();
    loadProductsInPage();
	addDocumentListener();
    addCartListener();
    window.onscroll = function (ev) {
            console.log(scrollAllProductsFilter);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollAllProductsFilter===true) {
                loadProductsInPage();
            }
        };

    const allProductsFilter=document.querySelector(".all-products-filter");
    allProductsFilter.addEventListener("click", function () {
        scrollAllProductsFilter=true;
        const cards=document.querySelectorAll(".product-grid__product-card");
        cards.forEach(card=>{
            if(card.classList.contains("filtered-out")){
                card.classList.remove("filtered-out");
            }
        });
    });
}




