import * as events from "events";
let cart = {}
let nrOfProducts = 0
function productTemplate(product) {
    return {
        title: product.title,
        price: product.price,
        nr: 1
    }
}

export function initCart() {
    generateCartListener()
    generateAddToCartListener()
}

// display cart container when clicking cart button
function generateCartListener() {
    document.getElementById("cart-btn").addEventListener("mouseover", () => {
        let cart = document.getElementById("cart")
            cart.classList.replace("cartHidden", "cartVisible")
    })
    document.getElementById("cart-btn").addEventListener("mouseleave", () => {
        let cart = document.getElementById("cart")
        cart.classList.replace("cartVisible", "cartHidden")
    })
}

// add another listener for each add to cart button to push products in an array
function generateAddToCartListener() {
    for (let btn of document.getElementsByClassName("buy-btn"))
        btn.addEventListener("click", async () => {
            // fetch the wanted product and push it in the cart
            let product = await fetchProduct(btn.id.at(btn.id.length - 1))

            // add product to cart hashmap
            if (cart[product.id] !== undefined) {
                cart[product.id].nr++
            }
            else cart[product.id] = productTemplate(product)

            // calculate total products
            nrOfProducts = 0
            for (let id in cart)
                nrOfProducts += cart[id].nr
            displayProducts()
        })
}

// generate html code for current products in cart and display them
function displayProducts() {
    // set the correct number of products
    document.getElementById("cart-nr").innerText = String(nrOfProducts)

    // set the correct products and calculate total price
    let totalPrice = 0
    let newCartHtml = ``;
    for (let id in cart) {
        newCartHtml += `<div class="cart-product"><p>${cart[id].title}<br><small>$${cart[id].price}</small></p><p>x${cart[id].nr}</p></div>`
        totalPrice += cart[id].price * cart[id].nr
    }
    document.getElementById("cart").innerHTML = newCartHtml
    document.getElementById("cart").innerHTML +=
        `<p>Total Price: $${totalPrice}</p>`
}

// fetch certain product to place in cart
async function fetchProduct(id) {
    return fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
}