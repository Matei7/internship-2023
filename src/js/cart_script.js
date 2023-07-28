import {getItemById} from "./product_api";
import {getCart,addProductToCart,removeProductFromCart} from "./cart_api";

let cart = await getCartProducts();
console.log(cart.length);
for (let cartItem of cart) {
    console.log(cartItem.id);
    removeProductFromCart(cartItem.id).then((json)=>{
        console.log(json);
    });
}
updateCartCount();
updateCartTotalPrice();
console.log(cart.length);

export function handleCartHoverEvent() {
    const cartNode = document.getElementById('cart');
    const cartItemsNode = document.querySelector('#cart-items');
    const cartProductsNode = document.querySelector('.cart-products');
    cartNode.addEventListener('mouseover', () => {
        cartItemsNode.style.display = 'block';
    });

    cartItemsNode.addEventListener('mouseout', () => {
        cartItemsNode.style.display = 'none';
    });
    cartProductsNode.addEventListener('mouseover', () => {
        cartItemsNode.style.display = 'block';
    });
}

function removeItemFromCart(productId) {
    const cartItemNode = document.querySelector(`.cart-item[product_id="${productId}"]`);
    const cartItemCount = cartItemNode.querySelector('.cart-item-count');
    const count = parseInt(cartItemCount.innerText.split('x')[1]);
    if (count > 1) {
        updateCountForItem(productId, -1);
    } else {
        cartItemNode.remove();
    }
    for (let cartItem of cart) {
        if (cartItem.id === productId) {
            cart.splice(cart.indexOf(cartItem), 1);
            break;
        }
    }
    updateCartTotalPrice();
    updateCartCount();

}

function addNodeElementToCart(jsonItem) {
    // const cartContainer=document.getElementById('cart-items');
    const cartContainer = document.querySelector('.cart-products');
    const cartItemNode = document.createElement('div');
    cartItemNode.classList.add('cart-item');
    cartItemNode.setAttribute('product_id', jsonItem.id);
    cartItemNode.innerHTML = `
        <div class="cart-item-thumbnail-container">
            <img src="${jsonItem.thumbnail}" alt="item thumbnail" class="cart-item-thumbnail">
        </div>
        <div class="cart-item-info-container">
            <span class="cart-title-wrapper">
                <span class="cart-item-title">  ${jsonItem.title}</span>
                <span class="cart-item-count" product_id="${jsonItem.id}"> x1</span>
            </span>
            <p class="cart-item-price"> <s>$${jsonItem.price}</s> $${(jsonItem.price - jsonItem.price * (jsonItem.discountPercentage / 100)).toFixed(2)}</p>
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
async function getCartProducts(){
    const products=getCart().then((json)=>{
        return Object.values(json.products);
    });
    return products;
}
function updateCartTotalPrice() {
    const totalPriceNode = document.querySelector('.cart-total');
    // const cartItemsNode=document.getElementById('cart-items');
    const cartItemsNode = document.querySelector('.cart-products');
    if (cart.length === 0) {
        cartItemsNode.style.paddingBottom = '0';
        totalPriceNode.style.display = 'none';
        return;
    }
    cartItemsNode.style.paddingBottom = '3rem';
    totalPriceNode.style.display = 'block';

    let totalPrice = 0;
    for (let cartItem of cart) {
        totalPrice += cartItem.price - cartItem.price * (cartItem.discountPercentage / 100);
    }
    totalPriceNode.innerHTML = `<p>Total: $${totalPrice.toFixed(2)}</p>`;
}

function updateCountForItem(productId, value) {
    const cartItemNode = document.querySelector(`.cart-item-count[product_id="${productId}"]`);
    const count = parseInt(cartItemNode.innerText.split('x')[1]);
    cartItemNode.innerText = ` x${count + value}`;
}

export function addToCart(productId) {
    getItemById(productId).then((jsonItem) => {
        if (!cart.find(item => item.id === jsonItem.id)) {
            cart.push(jsonItem);
            addNodeElementToCart(jsonItem);
        } else {
            updateCountForItem(productId, 1);
            cart.push(jsonItem);
        }
        addProductToCart(jsonItem.id, 1);
        console.log(getCart());
        updateCartCount();
        updateCartTotalPrice();
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    getCart().then((json)=>{
        cartCount.innerText = String(json.totalQuantity);
    });
}


