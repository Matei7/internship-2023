import * as events from "events";
import {addToCart, getCart, removeFromCart} from "./cart";

// creates a template for a product in HTML format
function productTemplate(product) {
    return `
        <div class="cart-page-product">
            <img src="${product.thumbnail}" class="cart-product-img" />
            <title>${product.title}</title>
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
    let cart = await getCart()
    document.getElementById("products").innerHTML = ""
    for (let product of cart.products) {
        document.getElementById("products").innerHTML += productTemplate(product)
    }
}

initCartPage()