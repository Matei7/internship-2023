import * as events from "events";
import {addToCart, getCart, removeFromCart} from "./cart";
let cart
const cartID = "64c3b92532684"

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
    await updateProducts()
    await generateQuantityBtnListeners()
    await generateBuyBtnListener()
}

// create event listeners for quantity buttons of cart product
async function generateQuantityBtnListeners() {
    for (let btn of document.getElementsByClassName("q-btn")) {
        document.getElementById(btn.id).addEventListener("click", async () => {
            if (btn.id.split("-")[0] === "minus")
                await removeFromCart(btn.id.split("-")[1])
            else
                await addToCart(btn.id.split("-")[1])
            await initCartPage()
        })
    }
}

// update current products
async function updateProducts() {
    cart = await getCart()
    document.getElementById("products").innerHTML = ""
    for (let product of cart.products) {
        document.getElementById("products").innerHTML += productTemplate(product)
    }
    document.getElementById("cart-page-price").innerText = `$${cart.total}`
}

function generateBuyBtnListener() {
    document.getElementById("buy-btn").addEventListener("click", async () => {
        for (let product of cart.products) {
            fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}?products[]=${product.id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json()).finally(async () => {
                await updateProducts()
            })
        }
        alert("Congratulations! You got scammed!")
    })
}

initCartPage()