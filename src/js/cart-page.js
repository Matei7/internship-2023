import * as events from "events";
import {addToCart, getCart, removeFromCart, updateCart} from "./cart";

let cart
const cartID = "64ca2f11625dd"
/**
 * totalPresses = {
 *     id: number { quantity: number }
 * }
 */
let totalPresses = {}

// creates a template for a product in HTML format
function productTemplate(product) {
    return `
        <div class="cart-page-product">
            <img src="${product.thumbnail}" class="cart-product-img" />
            <p>${product.title}</p>
            <p>$${Math.floor(product.discountedPrice)}</p>
            <div class="cart-page-quantity">
                <button class="q-btn" id="minus-${product.id}"><i class="fa fa-minus" aria-hidden="true"></i>
</button>
                <p>${product.quantity}</p>
                <button class="q-btn" id="plus-${product.id}"><i class="fa fa-plus" aria-hidden="true"></i>
</button>
            </div>
        </div>    
    `
}

// initialize cart page
async function initCartPage() {
    await updateProducts(false)
    generateQuantityBtnListeners()
    generateBuyBtnListener()
}

// create event listeners for quantity buttons of cart product
function generateQuantityBtnListeners() {
    for (let btn of document.getElementsByClassName("q-btn")) {
        document.getElementById(btn.id).addEventListener("click", quantityEvent)
    }
}
let currentQEvent
function quantityEvent(event) {
    let currentProduct
    for (let product of cart.products) {
        if (String(product.id) === event.currentTarget.id.split("-")[1])
            currentProduct = product
    }

    currentQEvent = event
    processChanges(currentProduct)
}

// I made this function to use it in debounce and keep debounce function clean
function modifyQuantity(event) {
    // check if item is in total presses
    let id = event.currentTarget.id.split("-")[1]
    if (totalPresses[id] !== undefined)
        event.currentTarget.id.split("-")[0] === "minus" ? totalPresses[id].quantity--: totalPresses[id].quantity++
    else {
        event.currentTarget.id.split("-")[0] === "minus" ? totalPresses[id] = { quantity: -1 }: totalPresses[id] = { quantity: 1 }
    }
}

// debounce function for fetching only once
function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
        modifyQuantity(currentQEvent)
    };
}

// process changes after the user stops clicking
const processChanges = debounce(async (currentProduct) => {
    // make changes after user stops pressing button
    await modifyCart(currentProduct)

    // reset total presses
    totalPresses = {}
});

// currentProduct: current selected product from the cart before modification, because I needed to know whether I have to remove it or just modify quantity
async function modifyCart(currentProduct) {
    let requestProducts = []
    let toDelete = []

    for (let productId in totalPresses) {
        let quantity = Number(totalPresses[productId].quantity)
        if (currentProduct.quantity + quantity <= 0)
            toDelete.push(productId)
        else
            requestProducts.push({
                id: Number(productId),
                quantity
            })
    }
    await updateCart(requestProducts, toDelete)
    totalPresses = {}

    // reinitialize cart
    await updateProducts(true)
    generateQuantityBtnListeners()
    generateBuyBtnListener()
}


// update current products and make call to api if modified is true
async function updateProducts(modified) {
    cart = await getCart(modified)
    document.getElementById("products").innerHTML = ""
    for (let product of cart.products) {
        document.getElementById("products").innerHTML += productTemplate(product)
    }
    document.getElementById("cart-page-price").innerText = `$${Math.floor(cart.discountTotal)}`
}

// generates listener for the buy button
function generateBuyBtnListener() {
    document.getElementById("buy-btn").addEventListener("click", buyEvent)
}

// listener for the buy button
async function buyEvent() {
    let stringOfProducts = ""
    for (let product of cart.products) {
        stringOfProducts += `products[]=${product.id}&`
    }

    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}?${stringOfProducts}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
    await updateProducts(true).finally(() => alert("Congratulations! You've been scammed!"))
}

await initCartPage()