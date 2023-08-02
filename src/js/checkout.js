let checkoutWindow = document.querySelector(".checkout-window__grid");
let totalText = document.querySelector(".checkout-window-total");
const ID_CART = "64c77ddd8e88f";
let changedQuantityForProduct = 0;
const cartLocalStorage = "cartStorage";
let mapForDebounce={};//id:[op,op,op]


function getProductsCartFromLocalStorage() {
    const cachedProducts = localStorage.getItem(cartLocalStorage);
    if (cachedProducts) {
        return JSON.parse(cachedProducts);
    }
    return null;
}

function saveProductsCartInLocalStorage(products) {
    let cartFromStorage = getProductsCartFromLocalStorage();
    if (getProductsCartFromLocalStorage() != null) {
        localStorage.setItem(cartLocalStorage, JSON.stringify(products));
    } else {
        localStorage.setItem(cartLocalStorage, JSON.stringify(products));
    }

}

function fetchCart() {
    return fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}`, {
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
        await increaseQuantityRequest(productId, changedQuantityForProduct);
    } else {
        await decreaseQuantityRequest(productId, changedQuantityForProduct);
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
        await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}`, {
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
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
            .then(data => {
                const products = data?.data.products;
                saveProductsCartInLocalStorage(products);
            });
        updateQuantityProducts();
    } catch (error) {
        console.error('Error increasing product quantity:', error);
    }
}


async function decreaseQuantityRequest(productId, quantity = 1) {
    const productsFromCart= getProductsCartFromLocalStorage();
    const productToUpdate = productsFromCart.find(product => product.id === Number(productId));
    if (productToUpdate && productToUpdate.quantity + (-1) * quantity < 1) {
        try {
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}?products[]=${productId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            }) .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
                .then(data => {
                    const products = data?.data.products;
                    saveProductsCartInLocalStorage(products);
                });
            updateQuantityProducts();
            checkoutWindow.removeChild(document.querySelector(`.checkout-window__grid__box-item[data-id="${productId}"]`));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    } else {
        increaseQuantityRequest(productId, -1 * quantity);
    }
}

async function updateQuantityProducts() {
    try {
            const productsFromCart=getProductsCartFromLocalStorage();
            const total = productsFromCart.reduce((acc, product) => {
            const price = product.price - (product.price * product.discountPercentage) / 100;
            const totalPrice = product.quantity * price;
            return acc + totalPrice;
        }, 0);
        productsFromCart.forEach(product => {
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

function prepareCheckoutUI(productsFromCartStorage){
    for (const product of productsFromCartStorage) {
        let card = createItemBoxCheckout(product);
        checkoutWindow.appendChild(card);
        plusMinusBtnListener(card);
    }
    const total = productsFromCartStorage.reduce((acc, product) => {
        const price = product.price - (product.price * product.discountPercentage) / 100;
        return acc + product.quantity * price;
    }, 0);
    totalText.textContent = total.toFixed(2);
}

function showCheckoutProducts() {
        const productsFromCartStorage = getProductsCartFromLocalStorage();
        if (productsFromCartStorage) {
            prepareCheckoutUI(productsFromCartStorage);
        } else {
            fetchCart()
                .then(productsFromCart => {
                    prepareCheckoutUI(productsFromCart);
                })
                .catch(error => {
                    console.error('Error show cart items:', error);
                });
        }

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
            localStorage.clear();
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            localStorage.removeItem(cartLocalStorage);
            setTimeout(window.location.href = "index.html", 3000);

        }
    );
    const titleShop = document.getElementById("meta-shop");
    titleShop.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

function initCheckout() {
    showCheckoutProducts();
    generalListenerOnPage();
}

initCheckout();

