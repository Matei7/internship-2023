import '../sass/cart.scss'
import {fetchAddProductToCart, fetchRemoveProductFromCart, fetchDeleteProductFromCart} from "./app";

let cartTotal = 0;
let numberOfClicksAdd = 0;
let numberOfClicksRemove = 0;

const cartItems = document.querySelector('.cart-page-items');
const API_CART_ID = '64c3aa50d27ba';
const API_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`;

export async function initCartPageProducts() {
    if(localStorage.getItem('cart') === null) {
        const response = await fetch(API_CART_GET);
        const cartProducts = await response.json();
        console.log("Cart fetched from API...");
        createCartItems(cartProducts.products);
        updateCartTotal(cartProducts.total);
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
    else {
        console.log("Fetching cart from local storage...");
        const cartProducts = JSON.parse(localStorage.getItem('cart'));
        createCartItems(cartProducts.products);
        updateCartTotal(cartProducts.total);
    }
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
        if (numberOfClicksRemove >= product.quantity) {
            fetchDeleteProductFromCart(product.id).then(() => {
                updateCartTotal(cartTotal - product.price * product.quantity);
                cartItems.removeChild(cartItem);
                localStorage.removeItem('cart');
            });
        } else {
            cartItemCounter.innerText = `x${product.quantity - numberOfClicksRemove}`;
            fetchRemoveProductFromCart(product.id, -numberOfClicksRemove).then(() => {
                updateCartTotal(cartTotal - product.price * product.quantity);
                localStorage.removeItem('cart');
            });
        }
        numberOfClicksRemove = 0;
    };

    const debouncedRemoveButtonClickHandler = debounce(handleRemoveButtonClick);

    cartItemRemoveButton.addEventListener('click', () => {
        numberOfClicksRemove++;
        debouncedRemoveButtonClickHandler(); // Call the debounced version of removeButtonClickHandler
    });


    const cartItemAddButton = document.createElement('button');
    cartItemAddButton.innerText = '+';
    cartItemAddButton.classList.add('cart-item-edit-quantity');

    const handleAddButtonClick = () => {
        cartItemCounter.innerText = `x${product.quantity + numberOfClicksAdd}`;
        fetchAddProductToCart(product.id, numberOfClicksAdd).then(() => {
            updateCartTotal(cartTotal + product.price * numberOfClicksAdd);
            numberOfClicksAdd = 0;
            localStorage.removeItem('cart');
        });
    }

    const debouncedClickEventHandlerAdd = debounce(handleAddButtonClick, 1000);

    cartItemAddButton.addEventListener('click', () => {
        numberOfClicksAdd++;
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