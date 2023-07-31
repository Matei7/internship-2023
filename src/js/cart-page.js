import * as events from "events";
import {addToCart, getCart, removeFromCart} from "./cart";

let cart
const cartID = "64c3b92532684"
let totalPresses = 0

// creates a template for a product in HTML format
function productTemplate(product) {
    return `
        <div class="cart-page-product">
            <img src="${product.thumbnail}" class="cart-product-img" />
            <p>${product.title}</p>
            <p>$${product.price}</p>
            <div class="cart-page-quantity">
                <button id="minus-${product.id}" class="q-btn"><i class="fa fa-minus" aria-hidden="true"></i>
</button>
                <p>${product.quantity}</p>
                <button id="plus-${product.id}" class="q-btn"><i class="fa fa-plus" aria-hidden="true"></i>
</button>
            </div>
        </div>    
    `
}

async function initCartPage() {
    await updateProducts(false)
    generateQuantityBtnListeners()
    generateBuyBtnListener()
}

// create event listeners for quantity buttons of cart product
function generateQuantityBtnListeners() {
    for (let btn of document.getElementsByClassName("q-btn")) {
        document.getElementById(btn.id).addEventListener("click", () => {
            let currentProduct
            for (let product of cart.products) {
                if (String(product.id) === btn.id.split("-")[1])
                    currentProduct = product
            }
            processChanges(btn, currentProduct)
        })
    }
}

// debounce function for fetching only once
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        totalPresses++
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const processChanges = debounce(async (btn, currentProduct) => {
    // make changes after user stops pressing button
    await modifyCart(btn, currentProduct)

    // reset total presses
    totalPresses = 0
});

async function modifyCart(btn, currentProduct) {
    if (btn.id.split("-")[0] === "minus")
        await removeFromCart(btn.id.split("-")[1], currentProduct.quantity, totalPresses)
    else
        await addToCart(btn.id.split("-")[1], totalPresses)

    // reinitialize cart
    await updateProducts(true)
    generateQuantityBtnListeners()
    generateBuyBtnListener()
}


// update current products
async function updateProducts(modified) {
    cart = await getCart(modified)
    document.getElementById("products").innerHTML = ""
    for (let product of cart.products) {
        document.getElementById("products").innerHTML += productTemplate(product)
    }
    document.getElementById("cart-page-price").innerText = `$${cart.total}`
}

function generateBuyBtnListener() {
    document.getElementById("buy-btn").addEventListener("click", buyEvent)
}

async function buyEvent() {
    let stringOfProducts = ""
    for (let product of cart.products) {
        stringOfProducts += `products[]=${product.id}&`
    }
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}?${stringOfProducts}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
    await updateProducts(true)
}

await initCartPage()