import * as events from "events";
const cartID = "64c39cd6304b2"
let cart = {};
function productTemplate(product) {
    return {
        userId: 1,
        products: [
            {
                id: product.id,
                quantity: 0
            }]
    }
}

export async function initCart() {
    cart = await getCart();
    displayProducts()
    generateCartListener()
    generateAddToCartListener()
}

// display cart container when clicking cart button
function generateCartListener() {
    document.getElementById("cart-btn").addEventListener("mouseover", () => {
        let cartHTML = document.getElementById("cart")
            cartHTML.classList.replace("cartHidden", "cartVisible")
    })

    document.getElementById("cart-btn").addEventListener("mouseleave", () => {
        let cartHTML = document.getElementById("cart")
        cartHTML.classList.replace("cartVisible", "cartHidden")
    })

    document.getElementById("cart-btn").addEventListener("click", () => {
        location.href = `cart.html?id=""`
    })
}

// add another listener for each add to cart button to push products in an array
function generateAddToCartListener() {
    for (let btn of document.getElementsByClassName("buy-btn"))
        btn.addEventListener("click", async () => {
            // fetch the wanted product and push it in the cart
            let product = await fetchProduct(btn.id.split("-")[1])
            // add product to cart hashmap
            if (cart["products"][product.id] !== undefined) {
                cart["products"][product.id].quantity++
            }
            else cart[product.id] = productTemplate(product)

            await addToCart(product.id)
            cart = await getCart()
            displayProducts()
        })
}

// generate html code for current products in cart and display them
function displayProducts() {
    // set the correct number of products
    document.getElementById("cart-nr").innerText = String(cart.totalProducts)

    // set the correct products and calculate total price
    let totalPrice = cart.total
    let newCartHtml = ``;
    for (let id in cart["products"]) {
        newCartHtml += `
            <div class="cart-product">
                <div class="cart-product-info">
                    <img src="${cart["products"][id].thumbnail}" class="cart-product-img">
                    &nbsp<p>${cart["products"][id].title}</p>
                </div>
                <p>x${cart["products"][id].quantity}<br><small>$${cart["products"][id].price}</small></p>
            </div>`
        totalPrice = cart.total
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

// GETTERS/SETTER FOR CART

export async function addToCart(productID) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: productID,
                    quantity: 1
                }]
        })
    }).then(res => res.json())
}

export async function removeFromCart(productID) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: productID,
                    quantity: -1
                }]
        })
    })
        .then(res => res.json())
}

export async function getCart() {
    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`)
        .then((res) => res.json())
}
