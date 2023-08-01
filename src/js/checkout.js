let checkoutWindow = document.querySelector(".checkout-window__grid");
let totalText = document.querySelector(".checkout-window-total");
let productsArrayAfterUpdateAProduct = [];
const idCart = "64c77ddd8e88f";

let changedQuantityForProduct = 0;


function fetchCart() {
    return fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.products;
        })
        .catch(error => {
            console.error('Error fetching cart products:', error);
            return [];
        });
}

function createItemBoxCheckout(product) {
    let boxItem = document.createElement("div");
    boxItem.classList.add("checkout-window__grid__box-item");
    boxItem.setAttribute("data-id", product.id);
    const price = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
    let hmtlPart = `
        <img src=${product.thumbnail} alt="Product Image" class="box-item__image">
        <p class="box-item__title">${product.title}</p>
        <p class="box-item__price">${price}</p>
        <div class="quantity buttons_added">
          <input type="button" value="-" class="minus">
          <input type="number" step="1" min="1" max="" value=${product.quantity}  class="input-text qty text" size="4" >
          <input type="button" value="+" class="plus">
        </div>
        <p class="box-item__total-price"> ${(product.quantity * price).toFixed(2)}</p>
      </div>`;
    boxItem.innerHTML = hmtlPart;
    return boxItem;
}

function debounce(func, timeout = 700) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        changedQuantityForProduct++;
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const changes = debounce(async (productId, operation) => {
    await modifyQuantity(productId, operation);
    changedQuantityForProduct = 0;
})


async function modifyQuantity(productId, operation) {
    if (operation === "increase") {
        increaseQuantityRequest(productId, changedQuantityForProduct);
    } else {
        decreaseQuantityRequest(productId, changedQuantityForProduct);
    }
}


function plusMinusBtnListener(card) {
    const plusBtn = card.querySelector(".plus");
    const minusBtn = card.querySelector(".minus");
    const quantity = card.querySelector(".input-text.qty.text");
    plusBtn.addEventListener("click", () => {
        changes(card.dataset.id, "increase");
    });

    minusBtn.addEventListener("click", function () {
        changes(card.dataset.id, "decrease");
    });
}


async function increaseQuantityRequest(productId, quantity = 1) {
    try {
        await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                products: [
                    {
                        id: productId,
                        quantity: quantity
                    }
                ]
            })
        });
        const productToUpdate = productsArrayAfterUpdateAProduct.find(product => product.id === Number(productId));
        if (productToUpdate) {
            productToUpdate.quantity += quantity;
        }
        updateQuantityProducts();
    } catch (error) {
        console.error('Error increasing product quantity:', error);
    }
}


async function decreaseQuantityRequest(productId, quantity = 1) {
    const productToUpdate = productsArrayAfterUpdateAProduct.find(product => product.id === Number(productId));
    if (productToUpdate && productToUpdate.quantity + (-1) * quantity < 1) {
        try {
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}?products[]=${productId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });
            productsArrayAfterUpdateAProduct = productsArrayAfterUpdateAProduct.filter(product => product.id !== Number(productId));
            updateQuantityProducts();
            checkoutWindow.removeChild(document.querySelector(`.checkout-window__grid__box-item[data-id="${productId}"]`));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    } else {
        try {
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: [
                        {
                            id: productId,
                            quantity: -1 * quantity,
                        }
                    ]
                })
            });
            const productToUpdate = productsArrayAfterUpdateAProduct.find(product => product.id === Number(productId));
            if (productToUpdate) {
                productToUpdate.quantity -= quantity;
            }
            updateQuantityProducts();
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    }
}

async function updateQuantityProducts() {
    try {
        const total = productsArrayAfterUpdateAProduct.reduce((acc, product) => {
            const price = product.price - (product.price * product.discountPercentage) / 100;
            const totalPrice = product.quantity * price;
            return acc + totalPrice;
        }, 0);
        productsArrayAfterUpdateAProduct.forEach(product => {
            const itemBox = document.querySelector(`.checkout-window__grid__box-item[data-id="${product.id}"]`);
            const itemQuantity = itemBox.querySelector(".input-text.qty.text");
            const itemTotalPrice = itemBox.querySelector(".box-item__total-price");
            itemQuantity.value = product.quantity;
            const price = product.price - (product.price * product.discountPercentage) / 100;
            itemTotalPrice.textContent = `${(product.quantity * price).toFixed(2)}`
        });
        totalText.innerText = total.toFixed(2);
    } catch (error) {
        console.error('Error updating quantity products:', error);
    }
}


async function showCheckoutProducts() {
    fetchCart()
        .then(productsFromCart => {
            for (const product of productsFromCart) {
                let card = createItemBoxCheckout(product);
                checkoutWindow.appendChild(card);
                plusMinusBtnListener(card);
            }
            productsArrayAfterUpdateAProduct = productsFromCart;
            const total = productsArrayAfterUpdateAProduct.reduce((acc, product) => {
                const price = product.price - (product.price * product.discountPercentage) / 100;
                return acc + product.quantity * price;
            }, 0);
            totalText.textContent = total.toFixed(2);
        })
        .catch(error => {
            console.error('Error show cart items:', error);
        });
}

function generalListenerOnPage() {
    const buyButton = document.querySelector(".checkout-window__button");
    buyButton.addEventListener("click", async () => {
        const cart = document.querySelector(".checkout-section");
        setTimeout(
            function () {
                cart.style.display = "none";
            }, 3000);
            alert("Thank you for your order! Have a nice day!");
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${idCart}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
    );


    const titleShop = document.getElementById("meta-shop");
    titleShop.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}


showCheckoutProducts();
generalListenerOnPage();