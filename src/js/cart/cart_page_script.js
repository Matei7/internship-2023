import {getCart, getCartProductForId, removeFromCartAPI, updateProductAPI} from "./cart_api";
import {debounce} from "../utils";

let cart=null;
let value = 0;
let isPressedOnce = false;


/**
 * Saves the cart to the local storage
 * @returns {Promise<void>}
 */
async function saveCartToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
    await getCartFromLocalStorage();
}

/**
 * Gets the cart from the local storage
 * @returns {Promise<void>}
 */
async function getCartFromLocalStorage(){
    if (localStorage.getItem('cart') === null){
        cart=await getCart();
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    else{
        cart=JSON.parse(localStorage.getItem('cart'));
    }
}

/**
 * Loads the cart page
 */
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
                <div class="cartpage-product-price" product-id="${cartProduct.id}">$${cartProduct.discountedPrice.toFixed(2)}</div>
                <div class="cartpage-product-controls">
                    <div class="lower-btn" product-id="${cartProduct.id}" unselectable="on">&lt;</div>
                    <div class="quantity" product-id="${cartProduct.id}">${cartProduct.quantity}</div>
                    <div class="higher-btn" product-id="${cartProduct.id}" unselectable="on">&gt;</div>
                </div>
            </div>`;
        const lowerButtonForCurrentProduct = cartProductItem.querySelector(".lower-btn");
        const higherButtonForCurrentProduct = cartProductItem.querySelector(".higher-btn");

        //Add the click event listeners for the buttons that change the quantity of the product
        //Update the cart on the fronted aswell as on the backend
        lowerButtonForCurrentProduct.addEventListener("click", async (event) => {
            value -= 1;
            debounceUpdateProduct(cartProduct.id);

        });
        higherButtonForCurrentProduct.addEventListener("click", async (event) => {
            value += 1;
            debounceUpdateProduct(cartProduct.id);

        });
        cartProductsContainer.appendChild(cartProductItem);
    }
    //Update the total price of the cart
    const total = document.createElement("div");
    total.classList.add("cartpage-total");
    total.innerHTML = `
    <div class="total-price">Total: $${cart["discountTotal"].toFixed(2)}</div>`;
    document.querySelector(".checkout-button").insertAdjacentElement("beforebegin", total);
}
function getCardProductFromId(productId) {
    return cart.find((product) => product.id === productId);
}

/**
 * Updates the price of a product on the frontend
 * @param cartProductItem
 * @returns {Promise<void>}
 */
async function updateProduct(cartProductItem) {
    const productId = Number(cartProductItem.getAttribute("product-id"));
    const newPriceNode = cartProductItem.querySelector(`.cartpage-product-price[product-id="${productId}"]`);
    const updatedProduct = await getCartProductForId(productId);
    // const updatedProduct =  getCardProductFromId(productId);
    newPriceNode.innerHTML = `$${updatedProduct["discountedPrice"].toFixed(2)}`;
    value = 0;
}

/**
 * Debounces the update of the product
 * @type {(function(...[*]): void)|*}
 */
const debounceUpdateProduct = debounce(async (productId) => {
    if (!isPressedOnce) {
        isPressedOnce = true;
        await updateCountForProduct(productId);
        isPressedOnce = false;
    }
});


/**
 * Updates the total price of the cart
 */
function updateCartpageTotalPrice() {
    document.querySelector(".total-price").innerHTML = `Total: $${cart["discountTotal"].toFixed(2)}`;
}


/**
 * Updates the count of a product
 * @param productId
 * @returns {Promise<void>}
 */
async function updateCountForProduct(productId) {
    console.log('updateCountForProduct');
    const quantityNode = document.querySelector(`.quantity[product-id="${productId}"]`);

    if (Number(quantityNode.innerHTML) + value < 1) {
        const product = document.querySelector(`.cartpage-product[product-id="${productId}"]`);
        product.remove();
        cart = (await removeFromCartAPI(productId))['data'];
        await saveCartToLocalStorage();
        updateCartpageTotalPrice();
    } else {
        cart = (await updateProductAPI(productId, value))['data'];
        await saveCartToLocalStorage();
        quantityNode.innerHTML = String(Number(quantityNode.innerHTML) + value);
        const cartProductItem = document.querySelector(`.cartpage-product[product-id="${productId}"]`);
        await updateProduct(cartProductItem);
        updateCartpageTotalPrice();
    }

}

/**
 * Removes all the items from the cart
 * @returns {Promise<void>}
 */
async function removeAllItemsFromCart() {
    const cartProducts = document.querySelectorAll(".cartpage-product");
    for (const cartProduct of cartProducts) {
        cartProduct.remove();
        cart = (await removeFromCartAPI(cart.products[0].id))['data'];
        updateCartpageTotalPrice();
        // await updateHeaderCartNumbers(cart);
    }

}

//Adds the click event listener for the checkout button
async function handleCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', () => {
        alert('Checkout button clicked');
        //removeAllItemsFromCart();
    });
}

getCartFromLocalStorage().then(()=>{
    loadCartPage();
});
//attach the click event listener for the checkout button
await handleCheckoutButton();




