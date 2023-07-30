import {getItemById} from "./product_api";
import {getCart, addToCartAPI, removeFromCartAPI, updateProductAPI} from "./cart_api";
import {loadItems} from "./main_products_script";

let cart = await getCart();

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

async function removeItemFromCart(productId) {
    const cartItemNode = document.querySelector(`.cart-item[product_id="${productId}"]`);
    const cartItemCount = cartItemNode.querySelector('.cart-item-count');
    const count = parseInt(cartItemCount.innerText.split('x')[1]);
    if (count > 1) {
        cart = (await updateProductAPI(productId, -1))['data'];
        await updateCountForItem(productId, -1);
    } else {
        cartItemNode.remove();
        cart = (await removeFromCartAPI(productId))['data'];
    }
    await updateCartTotalPrice();
    await updateCartCount();

}

function findItemInCartHTML(productId) {
    return document.querySelector(`.cart-item[product_id="${productId}"]`);

}

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
        await removeItemFromCart(jsonItem.id);
    });
    cartContainer.appendChild(cartItemNode);
}
export async function updateHeaderCartNumbers(_cart=cart){
    await updateCartTotalPrice(_cart);
    await updateCartCount(_cart);
}
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
    totalPriceNode.innerHTML = `<p>Total: <s>$${totalPrice}</s> $${cart.discountTotal.toFixed(2)}</p>`;
}

export async function addToCart(productId) {
    cart = (await addToCartAPI(productId, 1))['data']; //update cart
    await loadCart();
}

async function updateCartCount(_cart=cart) {
    let count = 0;
    for (const cartItem of _cart.products) {
        count += cartItem.quantity;
    }
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = String(count);


}

function updateCountForItem(productId, value) {
    const cartItemNode = document.querySelector(`.cart-item-count[product_id="${productId}"]`);
    const count = parseInt(cartItemNode.innerText.split('x')[1]);
    cartItemNode.innerText = ` x${count + value}`;
}

