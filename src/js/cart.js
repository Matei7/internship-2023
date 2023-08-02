import * as events from "events";

const cartID = "64c3b92532684"
let modified = false;
let cart = await getCart();

// returns a template for a newly added product
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

// initializes the cart
export async function initCart() {
    displayProducts()
    generateCartListener()
    generateAddToCartListener()
}

// display cart container when clicking cart button
function generateCartListener() {
    // event listener for when the user holds the mouse on the cart icon
    document.getElementById("cart-btn").addEventListener("mouseover", () => {
        let cartHTML = document.getElementById("cart")
            cartHTML.classList.replace("cartHidden", "cartVisible")
    })

    // event listener for when the user holds the mouse over the mini-cart
    document.getElementById("cart").addEventListener("mouseover", () => {
        let cartHTML = document.getElementById("cart")
        cartHTML.classList.replace("cartHidden", "cartVisible")
        clearTimeout(timeOutID)
    })

    let timeOutID
    // event listener for when the user moves the mouse from the cart icon
    document.getElementById("cart-btn").addEventListener("mouseleave", () => {
        timeOutID = setTimeout(() => {
            let cartHTML = document.getElementById("cart")
            cartHTML.classList.replace("cartVisible", "cartHidden")
        }, 300)
    })

    // event listener for when the user moves the mouse from the mini-cart
    document.getElementById("cart").addEventListener("mouseleave", () => {
        let cartHTML = document.getElementById("cart")
        cartHTML.classList.replace("cartVisible", "cartHidden")
    })

    // event listener for when a user presses the image of a product
    document.getElementById("cart-btn").addEventListener("click", () => {
        location.href = `cart.html?id=""`
    })
}

// add another listener for each add to cart button to push products in an array
function generateAddToCartListener() {
    // go through each button and add listeners
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

            cart = await getCart(true)
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
                <p>x${cart["products"][id].quantity}<br><small>$${Math.floor((100.0 - cart["products"][id].discountPercentage) / 100 * cart["products"][id].price)}</small></p>
            </div>`
        totalPrice = Math.floor(cart.discountTotal)
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

export async function addToCart(productID, quantity= 1) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: productID,
                    quantity
                }]
        })
    }).then(res => res.json())
    modified = true
}

export async function removeFromCart(productID, totalQuantity, quantity = 1) {
    if (totalQuantity - quantity > 0)
        await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1,
                products: [
                    {
                        id: productID,
                        quantity: quantity * (-1)
                    }]
            })
        }).then(res => res.json())
    else await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}?products[]=${productID}`, {
        method: 'DELETE'
        }).then(res => res.json())
    modified = true
}

// function for getting user's cart
export async function getCart(modified = false) {
    // we first check if we have the cart in local storage
    const localCart = localStorage.getItem("cart")
    if (localCart !== null && !modified) {
        return JSON.parse(localCart)
    }

    // otherwise, we fetch the cart and add it to the local storage
    const newCart = await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`)
        .then((res) => res.json())
    localStorage.setItem("cart", JSON.stringify(newCart))
    return newCart
}
