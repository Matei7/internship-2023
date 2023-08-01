import {getItemById} from "../product_page/product_api";
import {getCart, addToCartAPI, removeFromCartAPI, updateProductAPI} from "./cart_api";
import {loadItems} from "../main_products_script";
import {debounce} from "../utils";

let cart = await getCart();
let removeBtnIsPressed=false;
let value=0;

/**
 * Loads the cart section
 * @param _cart - json object
 * @returns {Promise<void>}
 */
export async function loadCart(_cart=cart) {


    for (let cartItem of _cart.products) {
        let cartItemHTML = findItemInCartHTML(cartItem.id);
        if (!cartItemHTML) {
            addNodeElementToCart(cartItem);
        } else {
            const cartItemCount = cartItemHTML.querySelector('.cart-item-count');
            const count = parseInt(cartItemCount.innerText.split('x')[1]);
            if (count !== cartItem.quantity) {
                cartItemCount.innerText = ` x${cartItem.quantity}`;
            }
        }
    }
    await updateCartTotalPrice();
    await updateCartCount();


}

/**
 * Attaches hover event to the cart icon
 */
export function handleCartHoverEvent() {
    const cartNode = document.getElementById('cart');
    const cartItemsNode = document.querySelector('#cart-items');
    const cartProductsNode = document.querySelector('.cart-products');
    cartNode.addEventListener('mouseover', () => {
        cartItemsNode.style.display = 'flex';
    });

    cartItemsNode.addEventListener('mouseout', () => {
        cartItemsNode.style.display = 'none';
    });
    cartProductsNode.addEventListener('mouseover', () => {
        cartItemsNode.style.display = 'block';
    });
}

/**
 * Removes an item from the cart
 * @param productId
 * @returns {Promise<void>}
 */
async function removeItemFromCart(productId) {
    const cartItemNode = document.querySelector(`.cart-item[product_id="${productId}"]`);
    const cartItemCount = cartItemNode.querySelector('.cart-item-count');
    const count = parseInt(cartItemCount.innerText.split('x')[1]);
    console.log(count, value);
    if (count + value >= 1) {
        cart = (await updateProductAPI(productId, value))['data'];
        await updateCountForItem(productId, value);
        console.log('fetched');
    } else {
        cartItemNode.remove();
        cart = (await removeFromCartAPI(productId))['data'];
        console.log('fetched');
    }
    await updateCartTotalPrice();
    await updateCartCount();
    value=0;

}

/**
 * Finds an item in the cart based on the product id
 * @param productId
 * @returns {Element}
 */
function findItemInCartHTML(productId) {
    return document.querySelector(`.cart-item[product_id="${productId}"]`);

}

/**
 * Adds a node element to the cart
 * @param jsonItem
 */
function addNodeElementToCart(jsonItem) {
    const cartContainer = document.querySelector('.cart-products');
    const cartItemNode = document.createElement('div');
    const discountedPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);
    const quantity = jsonItem.quantity ? jsonItem.quantity : 1;


    cartItemNode.classList.add('cart-item');
    cartItemNode.setAttribute('product_id', jsonItem.id);
    cartItemNode.innerHTML = `
        <div class="cart-item-thumbnail-container">
            <img src="${jsonItem.thumbnail}" alt="item thumbnail" class="cart-item-thumbnail">
        </div>
        <div class="cart-item-info-container">
            <span class="cart-title-wrapper">
                <span class="cart-item-title">  ${jsonItem.title}</span>
                <span class="cart-item-count" product_id="${jsonItem.id}"> x${quantity}</span>
            </span>
            <p class="cart-item-price"> <s>$${jsonItem.price * quantity}</s> $${discountedPrice.toFixed(2)}</p>
            <button class="remove-from-cart-btn" product_id="${jsonItem.id}">Remove</button>
        </div>
        `;

    cartItemNode.querySelector('.cart-item-thumbnail-container').addEventListener('click', (event) => {
        const url = `product.html?id=${jsonItem.id}`;
        window.open(url, '_blank');
    });

    cartItemNode.querySelector('.remove-from-cart-btn').addEventListener('click', async (event) => {
        value-=1;
        debounceRemoveProduct(jsonItem.id);
    });
    cartContainer.appendChild(cartItemNode);
}

const debounceRemoveProduct = debounce(async (productId)=>{
    if (!removeBtnIsPressed){
        removeBtnIsPressed=true;
        await removeItemFromCart(productId);
        removeBtnIsPressed=false;
    }
});

/**
 * Updates the cart total price and count
 * @param _cart
 * @returns {Promise<void>}
 */
export async function updateHeaderCartNumbers(_cart=cart){
    await updateCartTotalPrice(_cart);
    await updateCartCount(_cart);
}

/**
 * Updates the cart total price
 * @param _cart
 * @returns {Promise<void>}
 */
async function updateCartTotalPrice(_cart=cart){
    const totalPriceNode = document.querySelector('.cart-total');
    const cartItemsNode = document.querySelector('.cart-products');
    if (_cart.products.length === 0) {
        cartItemsNode.style.paddingBottom = '0';
        totalPriceNode.style.display = 'none';
        return;
    }
    cartItemsNode.style.paddingBottom = '3rem';
    totalPriceNode.style.display = 'block';

    let totalPrice = cart.total;
    totalPriceNode.innerHTML = `<p>Total: <s>$${totalPrice}</s> $${cart["discountTotal"].toFixed(2)}</p>`;
}

/**
 * Adds an item to the cart
 * @param productId
 * @returns {Promise<void>}
 */
export async function addToCart(productId) {
    cart = (await addToCartAPI(productId, 1))['data']; //update cart
    await loadCart();
}

/**
 * Updates the cart count
 * @param _cart
 * @returns {Promise<void>}
 */
async function updateCartCount(_cart=cart) {
    let count = 0;
    for (const cartItem of _cart.products) {
        count += cartItem.quantity;
    }
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = String(count);


}

/**
 * Updates the count for an item in the cart
 * @param productId
 * @param value
 */
function updateCountForItem(productId, value) {
    const cartItemNode = document.querySelector(`.cart-item-count[product_id="${productId}"]`);
    const count = parseInt(cartItemNode.innerText.split('x')[1]);
    cartItemNode.innerText = ` x${count + value}`;
}

