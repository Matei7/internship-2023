import {handleCartHoverEvent, loadCart} from "./cart_script";
import {getCart} from "./cart_api";
handleCartHoverEvent();

loadCart();
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
                    <div class="lower-btn">&lt;</div>
                    <div class="quantity" product-id="${cartProduct.id}">${cartProduct.quantity}</div>
                    <div class="higher-btn">&gt;</div>
                </div>
            </div>`;
        cartProductsContainer.appendChild(cartProductItem);
    }
    const total= document.createElement("div");
    total.classList.add("cartpage-total");
    total.innerHTML = `
    <div>Total: $${cart.discountTotal.toFixed(2)}</div>`;
    document.querySelector(".checkout-button").insertAdjacentElement("beforebegin", total);
}
function updateCartTotalPrice() {}
function updateCartCount() {}
function updateCountForProduct(productId,value) {}
function removeAllItemsFromCart(){}
function handleCheckoutButton(){
    const checkoutButton=document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click',()=>{
        alert('Checkout button clicked');
        removeAllItemsFromCart();
    });
}

loadCartPage();
handleCheckoutButton();




