import {handleCartHoverEvent, loadCart, updateHeaderCartNumbers} from "./cart_script";
import {getCart, removeFromCartAPI, updateProductAPI} from "./cart_api";

handleCartHoverEvent();

await loadCart();
let cart = await getCart();

console.log(cart);

function loadCartPage() {
    const cartProductsContainer = document.querySelector(".cartpage-products");
    for (const cartProduct of cart.products) {
        let cartProductItem = document.createElement("div");
        cartProductItem.classList.add("cartpage-product");
        cartProductItem.setAttribute("product-id", cartProduct.id);
        cartProductItem.innerHTML = `
            <div class="cartpage-product-image">
            <img src="${cartProduct.thumbnail}" alt="${cartProduct.title}">
            </div>
            <div class="cartpage-product-info">
                <div class="cartpage-product-name">${cartProduct.title}</div>
                <div class="cartpage-product-price">$${cartProduct.discountedPrice.toFixed(2)}</div>
                <div class="cartpage-product-controls">
                    <div class="lower-btn" product-id="${cartProduct.id}">&lt;</div>
                    <div class="quantity" product-id="${cartProduct.id}">${cartProduct.quantity}</div>
                    <div class="higher-btn" product-id="${cartProduct.id}">&gt;</div>
                </div>
            </div>`;
        const lowerButtonForCurrentProduct = cartProductItem.querySelector(".lower-btn");
        const higherButtonForCurrentProduct = cartProductItem.querySelector(".higher-btn");
        lowerButtonForCurrentProduct.addEventListener("click", async (event) => {
            await updateCountForProduct(cartProduct.id, -1)
        });
        higherButtonForCurrentProduct.addEventListener("click", async (event) => {
            await updateCountForProduct(cartProduct.id, 1)
        });
        cartProductsContainer.appendChild(cartProductItem);
    }

    const total = document.createElement("div");
    total.classList.add("cartpage-total");
    total.innerHTML = `
    <div class="total-price">Total: $${cart.discountTotal.toFixed(2)}</div>`;
    document.querySelector(".checkout-button").insertAdjacentElement("beforebegin", total);
}

function updateCartpageTotalPrice() {
    document.querySelector(".total-price").innerHTML = `Total: $${cart.discountTotal.toFixed(2)}`;
}

function updateCartCount() {
}

async function updateCountForProduct(productId, value) {
    const quantityNode = document.querySelector(`.quantity[product-id="${productId}"]`);
    if (Number(quantityNode.innerHTML) + value < 1) {
        const product = document.querySelector(`.cartpage-product[product-id="${productId}"]`);
        product.remove();
        cart = (await removeFromCartAPI(productId))['data'];
    } else {
        await updateProductAPI(productId, value).then((json) => {
            cart = json['data'];
            console.log(quantityNode.innerHTML);
            quantityNode.innerHTML = Number(quantityNode.innerHTML) + value;
            updateCartpageTotalPrice();
            loadCart(cart);
        });
    }
    await updateHeaderCartNumbers(cart);
}

async function removeAllItemsFromCart() {
    const cartProducts = document.querySelectorAll(".cartpage-product");
    for (const cartProduct of cartProducts) {
        cartProduct.remove();
        cart = (await removeFromCartAPI(cart.products[0].id))['data'];
        updateCartpageTotalPrice();
        await updateHeaderCartNumbers(cart);
    }

}

async function handleCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', () => {
        alert('Checkout button clicked');
        //removeAllItemsFromCart();
    });
}

loadCartPage();
handleCheckoutButton();




