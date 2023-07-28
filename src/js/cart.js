import '../sass/cart.scss'
import {addToCart, removeFromCart, deleteFromCart} from "./app";

let total = 0;
const cartItems = document.querySelector('.cart-page-items');

export async function initCart() {
    const API_CART_ID = '64c3aa50d27ba';
    const API_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`;

    const cart = await fetch(API_CART_GET);
    const cartData = await cart.json();
    console.log(cartData);
    createItems(cartData.products);
    addToTotal(cartData.total);
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
    removeButton.addEventListener('click', () => {
        if (product.quantity > 1) {
            const item = cartItems.querySelector(`[data-id="${product.id}"]`);
            const itemCounter = item.querySelector('h3');
            itemCounter.innerText = `x${product.quantity - 1}`;
            removeFromCart(product.id).then(
                () => {
                    addToTotal(total-product.price);
                });
        } else {
            const item = cartItems.querySelector(`[data-id="${product.id}"]`);
            cartItems.removeChild(item);
            deleteFromCart(product.id).then(
                () => {
                    addToTotal(total-product.price);
                }
            );
        }
    });
    const addButton = document.createElement('button');
    addButton.innerText = '+';
    addButton.classList.add('cart-item-edit-quantity');
    addButton.addEventListener('click', () => {
        const item = cartItems.querySelector(`[data-id="${product.id}"]`);
        const itemCounter = item.querySelector('h3');
        itemCounter.innerText = `x${product.quantity + 1}`;
        addToCart(product.id).then(
            () => {
                addToTotal(total+product.price);
            }
        );
    });
    cartItem.appendChild(image);
    cartItem.appendChild(counter);
    cartItem.appendChild(title);
    cartItem.appendChild(price);
    cartItem.appendChild(removeButton);
    cartItem.appendChild(addButton);
    cartItems.appendChild(cartItem);
}

await initCart();

function addToTotal(newTotal) {
    total = newTotal;
    const totalElement = document.querySelector('.cart-total');
    totalElement.innerText = `TOTAL: $${newTotal}`;
}