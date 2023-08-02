import '../sass/cart.scss'
import {fetchAddProductToCart, fetchRemoveProductFromCart, fetchDeleteProductFromCart} from "./app";

let cartTotal = 0;
let numberOfClicksAdd;
let numberOfClicksRemove;
let products = [];

const cartItems = document.querySelector('.cart-page-items');
const API_CART_ID = '64c3aa50d27ba';
const API_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`;

export async function initCartPageProducts() {
    let cartProducts;
    if (localStorage.getItem('cart') === null) {
        const response = await fetch(API_CART_GET);
        cartProducts = await response.json();
        console.log("Cart fetched from API...");
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    } else {
        console.log("Fetching cart from local storage...");
        cartProducts = JSON.parse(localStorage.getItem('cart'));
    }
    createCartItems(cartProducts.products);
    updateCartTotal(cartProducts.total);
    products = cartProducts.products;
    numberOfClicksRemove = new Array(101).fill(0);
    numberOfClicksAdd = new Array(101).fill(0);
}

function createCartItems(cartProducts) {
    for (const product of cartProducts) {
        createCartItem(product);
    }
}

function createCartItem(product) {
    const cartItem = document.createElement('div');
    cartItem.setAttribute('data-id', product.id);
    cartItem.classList.add('cart-item');

    const cartItemCounter = document.createElement('h3')
    cartItemCounter.classList.add('cart-item-counter');
    cartItemCounter.innerText = `x${product.quantity}`;

    const cartItemTitle = document.createElement('h3');
    cartItemTitle.innerText = product.title;
    cartItemTitle.classList.add('cart-item-title');

    const cartItemImage = document.createElement('img');
    cartItemImage.setAttribute('src', product.images[0]);
    cartItemImage.setAttribute('alt', product.title + "image");
    cartItemImage.classList.add('cart-item-image');

    const cartItemPrice = document.createElement('h3');
    cartItemPrice.innerText = `$${product.price}`;
    cartItemPrice.classList.add('cart-item-price');

    const cartItemRemoveButton = document.createElement('button');
    cartItemRemoveButton.innerText = '-';
    cartItemRemoveButton.classList.add('cart-item-edit-quantity');

    const handleRemoveButtonClick = () => {
        const cartItem = cartItems.querySelector(`[data-id="${product.id}"]`);
        if (numberOfClicksRemove[product.id] === numberOfClicksAdd[product.id]) {

        } else if (numberOfClicksRemove[product.id] > numberOfClicksAdd[product.id]) {
            const difference = numberOfClicksRemove[product.id] - numberOfClicksAdd[product.id];
            if (difference >= product.quantity) {
                updateCartTotal(cartTotal - product.price * product.quantity);
                cartItems.removeChild(cartItem);
                localStorage.removeItem('cart');
                fetchDeleteProductFromCart(product.id).then(() => {
                });
            } else {
                cartItemCounter.innerText = `x${product.quantity - difference}`;
                updateCartTotal(cartTotal - product.price * difference);
                localStorage.removeItem('cart');
                fetchRemoveProductFromCart(product.id, -difference).then(() => {
                });
            }
        } else {
            const difference = numberOfClicksAdd[product.id] - numberOfClicksRemove[product.id];
            cartItemCounter.innerText = `x${product.quantity + difference}`;
            updateCartTotal(cartTotal + product.price * difference);
            localStorage.removeItem('cart');
            fetchAddProductToCart(product.id, difference).then(() => {
            });
        }
        numberOfClicksRemove[product.id] = 0;
        numberOfClicksAdd[product.id] = 0;
    }

    const debounceHandleEditQuantityButtonsClick = debounce(handleRemoveButtonClick);

    cartItemRemoveButton.addEventListener('click', () => {
        numberOfClicksRemove[product.id]++;
        debounceHandleEditQuantityButtonsClick();
    });

    const handleAddButtonClick = () => {
        // Same as Remove button, but needed for a new debounce handler
        handleRemoveButtonClick();
    }

    const debouncedClickEventHandlerAdd = debounce(handleAddButtonClick);

    const cartItemAddButton = document.createElement('button');
    cartItemAddButton.innerText = '+';
    cartItemAddButton.classList.add('cart-item-edit-quantity');

    cartItemAddButton.addEventListener('click', () => {
        numberOfClicksAdd[product.id]++;
        debouncedClickEventHandlerAdd();
    });

    cartItem.appendChild(cartItemImage);
    cartItem.appendChild(cartItemTitle);
    cartItem.appendChild(cartItemPrice);
    cartItem.appendChild(cartItemRemoveButton);
    cartItem.appendChild(cartItemCounter);
    cartItem.appendChild(cartItemAddButton);
    cartItems.appendChild(cartItem);
}

function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function updateCartTotal(newTotal) {
    cartTotal = newTotal;
    const totalElement = document.querySelector('.cart-total');
    totalElement.innerText = `TOTAL: $${newTotal}`;
}

await initCartPageProducts();