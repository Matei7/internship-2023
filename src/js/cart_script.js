import {getItemById} from "./product_api";
import {getCart, addProductToCart, removeProductFromCart, updateQuantityProduct} from "./cart_api";
import {loadItems} from "./main_products_script";

let cartJson = await getCart();

export async function loadCart() {
    updateCartCount();
    updateCartTotalPrice();

    //remove all cart items with the class .cart-item
    const cartItemsNode = document.querySelector('.cart-products');
    for (const cartItem of cartItemsNode.querySelectorAll('.cart-item')) {
        cartItem.remove();
    }

    let cart = await getCartProducts();
    for (let cartItem of cart) {
        addNodeElementToCart(cartItem);
    }


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
        //TODO: update price accordingly
        updateQuantityProduct(productId, -1).then(() => {
            updateCountForItem(productId, -1);
            updateCartTotalPrice();
            updateCartCount();
        });
    } else {
        cartItemNode.remove();
        removeProductFromCart(productId).then(() => {
            updateCartTotalPrice();
        }).then(() => {
            updateCartCount();
        });
    }


}

function addNodeElementToCart(jsonItem) {
    console.log(jsonItem);
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

    cartItemNode.querySelector('.remove-from-cart-btn').addEventListener('click', (event) => {
        removeItemFromCart(jsonItem.id);
    });
    cartContainer.appendChild(cartItemNode);
}

async function getCartProducts() {
    const products = getCart().then((json) => {
        return Object.values(json.products);
    });
    return products;
}

async function updateCartTotalPrice() {
    let cartJson = await getCart();

    const totalPriceNode = document.querySelector('.cart-total');
    const cartItemsNode = document.querySelector('.cart-products');
    if (cartJson.products.length === 0) {
        cartItemsNode.style.paddingBottom = '0';
        totalPriceNode.style.display = 'none';
        return;
    }
    cartItemsNode.style.paddingBottom = '3rem';
    totalPriceNode.style.display = 'block';

    let totalPrice = cartJson.total;
    totalPriceNode.innerHTML = `<p>Total: <s>$${totalPrice}</s> $${cartJson.discountTotal.toFixed(2)}</p>`;
}

export function addToCart(productId) {
    getItemById(productId).then(async (jsonItem) => {
        let cart = await getCartProducts();
        if (!cart.find(item => item.id === jsonItem.id)) {
            addNodeElementToCart(jsonItem);
        } else {
            updateCountForItem(productId, 1);
        }
        addProductToCart(jsonItem.id, 1).then(() => {
            updateCartTotalPrice();
            updateCartCount();
        });

    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    getCart().then((json) => {
        cartCount.innerText = String(json.totalQuantity);
    });
}

function updateCountForItem(productId, value) {
    const cartItemNode = document.querySelector(`.cart-item-count[product_id="${productId}"]`);
    const count = parseInt(cartItemNode.innerText.split('x')[1]);
    cartItemNode.innerText = ` x${count + value}`;
}

