import '../sass/cart.scss'
import {addToCart, removeFromCart, deleteFromCart} from "./app";

let total = 0;
const cartItems = document.querySelector('.cart-page-items');
let numberOfClicksAdd = 0;
let numberOfClicksRemove = 0;

export async function initCart() {
    const API_CART_ID = '64c3aa50d27ba';
    const API_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`;

    if(localStorage.getItem('cart') === null) {
        const cart = await fetch(API_CART_GET);
        const cartData = await cart.json();
        console.log("Cart fetched from API...");
        createItems(cartData.products);
        addToTotal(cartData.total);
        localStorage.setItem('cart', JSON.stringify(cartData));
    }
    else {
        console.log("Fetching cart from local storage...");
        const cartData = JSON.parse(localStorage.getItem('cart'));
        createItems(cartData.products);
        addToTotal(cartData.total);
    }
}

function createItems(cartData) {
    for (const product of cartData) {
        createItem(product);
    }
}

function createItem(product) {
    const cartItem = document.createElement('div');
    cartItem.setAttribute('data-id', product.id);
    cartItem.classList.add('cart-item');

    const counter = document.createElement('h3')
    counter.innerText = `x${product.quantity}`;

    const title = document.createElement('h3');
    title.innerText = product.title;
    title.classList.add('cart-item-title');

    const image = document.createElement('img');
    image.setAttribute('src', product.images[0]);
    image.setAttribute('alt', product.title + "image");
    image.classList.add('cart-item-image');

    const price = document.createElement('h3');
    price.innerText = `$${product.price}`;
    price.classList.add('cart-item-price');

    const removeButton = document.createElement('button');
    removeButton.innerText = 'X';
    removeButton.classList.add('cart-item-edit-quantity');
    const removeButtonClickHandler = () => {
        const item = cartItems.querySelector(`[data-id="${product.id}"]`);
        if (numberOfClicksRemove >= product.quantity) {
            deleteFromCart(product.id).then(() => {
                addToTotal(total - product.price * product.quantity);
                cartItems.removeChild(item);
                localStorage.removeItem('cart');
            });
        } else {
            removeFromCart(product.id, -numberOfClicksRemove).then(() => {
                const itemCounter = item.querySelector('h3');
                itemCounter.innerText = `x${product.quantity - numberOfClicksRemove}`;
                addToTotal(total - product.price * product.quantity);
                localStorage.removeItem('cart');
            });
        }
        numberOfClicksRemove = 0;
    };

    const debouncedRemoveButtonClickHandler = debounce(removeButtonClickHandler);

    removeButton.addEventListener('click', () => {
        numberOfClicksRemove++;
        debouncedRemoveButtonClickHandler(); // Call the debounced version of removeButtonClickHandler
    });


    const addButton = document.createElement('button');
    addButton.innerText = '+';
    addButton.classList.add('cart-item-edit-quantity');

    const clickEventHandlerAdd = () => {
        const item = cartItems.querySelector(`[data-id="${product.id}"]`);
        const itemCounter = item.querySelector('h3');
        addToCart(product.id, numberOfClicksAdd).then(() => {
            itemCounter.innerText = `x${product.quantity + numberOfClicksAdd}`;
            addToTotal(total + product.price * numberOfClicksAdd);
            numberOfClicksAdd = 0;
            localStorage.removeItem('cart');
        });
    }

    const debouncedClickEventHandlerAdd = debounce(clickEventHandlerAdd, 1000);

    addButton.addEventListener('click', () => {
        numberOfClicksAdd++;
        debouncedClickEventHandlerAdd();
    });

    cartItem.appendChild(image);
    cartItem.appendChild(counter);
    cartItem.appendChild(title);
    cartItem.appendChild(price);
    cartItem.appendChild(removeButton);
    cartItem.appendChild(addButton);
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

await initCart();

function addToTotal(newTotal) {
    total = newTotal;
    const totalElement = document.querySelector('.cart-total');
    totalElement.innerText = `TOTAL: $${newTotal}`;
}