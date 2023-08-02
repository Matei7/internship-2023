import '../sass/checkout.scss';
import '../sass/nav.scss';
import {getCartAPI, removeProductFromCartAPI, updateProductQuantityAPI} from "./api";
import {calculatePriceWithDiscount} from "./cart";
import {debounce} from "./app";

let quantityChangeButtons = {};
await initCheckout();

function createNewProductCheckoutHTML(product) {
    return `
    <div class="checkout-item" data-id="${product.id}">
        <div class="checkout-item-image">
            <img src="${product.thumbnail}" alt="${product.title}">
        </div>
        <div class="checkout-item-info">
            <div class="checkout-item-info-left-wrapper">
                <div class="checkout-item-info-title">${product.title}</div>
                <div class="checkout-item-info-description">${product.description}</div>
            </div>
            <div class="checkout-item-info-quantity">
                <div class="checkout-item-info-quantity-decrease"><span>-</span></div>
                <div class="checkout-item-info-quantity-value"><span>${product.quantity}</span></div>
                <div class="checkout-item-info-quantity-increase"><span>+</span></div>
             </div>
             <div class="checkout-item-info-right-wrapper">
                <div class="checkout-item-info-price-discount">$${Math.floor(product.discountedPrice)}</div>
                <div class="checkout-item-info-price"><del>$${product.price * product.quantity}</del></div>
                <div class="checkout-item-info-delete"><span class="material-symbols-outlined">delete</span></div>
            </div>
        </div>
    </div>`;
}

function createCheckoutContainer(cart) {
    return `
    <main class="checkout-container">
        <section class="checkout">
            <div class="checkout-header">
                <h1>Your Cart</h1>
            </div>
            <div class="checkout-body-grid">
                <div class="checkout-items">
                </div>
                <hr>
                <div class="checkout-summary">
                    <div>Total Price</div>
                    <div>$${Math.floor(cart.discountTotal)}</div>
                </div>
            </div>
            <div class="checkout-actions">
                <a href="index.html" class="checkout-actions-back">Continue Shopping</a>
                <button type="button" class="checkout-actions-buy">Buy items</button>
            </div>
        </section>
    </main>
    `;
}

function updateProductQuantity(addedProduct, productInfo, quantityToAdd) {
    updateProductQuantityAPI(productInfo.id, quantityToAdd);
    let quantity = Number(addedProduct.querySelector('.checkout-item-info-quantity-value').children[0].innerHTML) + quantityToAdd;
    addedProduct.querySelector('.checkout-item-info-quantity-value').children[0].innerHTML = quantity;
    let totalProductPrice = calculatePriceWithDiscount(productInfo.price, productInfo.discountPercentage, quantity);
    addedProduct.querySelector('.checkout-item-info-price-discount').innerHTML = '$' + totalProductPrice;
    addedProduct.querySelector('.checkout-item-info-price').children[0].innerHTML = '$' + productInfo.price * quantity;
    document.querySelector('.checkout-summary').children[1].innerHTML = '$' +
        Math.floor(Number(document.querySelector('.checkout-summary').children[1].innerHTML.replace('$', '')) +
            totalProductPrice - calculatePriceWithDiscount(productInfo.price, productInfo.discountPercentage, quantity - quantityToAdd));
}


async function decreaseProductQuantity(addedProduct, productInfo) {
    if (Number(addedProduct.querySelector('.checkout-item-info-quantity-value').children[0].innerHTML) + quantityChangeButtons[productInfo.id] <= 0) {
        await removeProductFromCart(addedProduct, productInfo, false);
        return;
    }
    updateProductQuantity(addedProduct, productInfo, quantityChangeButtons[productInfo.id]);
}

function increaseProductQuantity(addedProduct, productInfo) {
    updateProductQuantity(addedProduct, productInfo, quantityChangeButtons[productInfo.id]);
}

async function removeProductFromCart(addedProduct, productInfo, isBuyAction) {
    document.querySelector('.checkout-items').removeChild(addedProduct);
    removeProductFromCartAPI(productInfo.id);
    if (isBuyAction === false && document.querySelectorAll('.checkout-item').length === 0) {
        loadEmptyPage();
    }
    if (document.querySelector('.checkout-summary') === null) {
        return;
    }

    document.querySelector('.checkout-summary').children[1].innerHTML = '$' +
        Math.floor(Number(document.querySelector('.checkout-summary').children[1].innerHTML.replace('$', '')) -
            calculatePriceWithDiscount(productInfo.price, productInfo.discountPercentage, Number(addedProduct.querySelector('.checkout-item-info-quantity-value').children[0].innerHTML)));
}

const quantityChangeHandler = debounce(async (addedProduct, productInfo, changeType) => {
    if (changeType === 'decrease') {
        await decreaseProductQuantity(addedProduct, productInfo);
    } else {
        await increaseProductQuantity(addedProduct, productInfo);
    }
    quantityChangeButtons[productInfo.id] = 0;
});

function attachEventHandlersToProduct(addedProduct, product) {
    quantityChangeButtons[product.id] = 0;
    addedProduct.querySelector('.checkout-item-info-quantity-decrease').addEventListener('click', () => {
        quantityChangeButtons[product.id] = quantityChangeButtons[product.id] - 1;
        quantityChangeHandler(addedProduct, product, 'decrease');
    });
    addedProduct.querySelector('.checkout-item-info-quantity-increase').addEventListener('click', () => {
        quantityChangeButtons[product.id] = quantityChangeButtons[product.id] + 1;
        quantityChangeHandler(addedProduct, product, 'increase');
    });
    addedProduct.querySelector('.checkout-item-info-delete').addEventListener('click', () => removeProductFromCart(addedProduct, product, false));
}

function loadEmptyPage() {
    document.querySelector('.checkout').outerHTML = `
        <div class="checkout-empty">
            <h1>Your cart is empty</h1>
            <a href="index.html">Continue Shopping</a>
        </div>`;
}

function loadSuccessPage() {
    document.querySelector('.checkout').outerHTML = `
        <div class="checkout-empty">
            <h1>Thank you for your purchase!</h1>
            <a href="index.html">Continue Shopping</a>
        </div>`;
}

async function initCheckout() {
    document.getElementById("nav-placeholder").outerHTML = `
    <nav class="nav-bar">
        <h1 class="shop-name-single">Mogos-Hermanos</h1>
    </nav>`;

    let cart = await getCartAPI();
    document.querySelector('#checkout-container-placeholder').outerHTML = createCheckoutContainer(cart);

    if (cart.totalQuantity === 0) {
        loadEmptyPage();
        return;
    }

    document.querySelector('.checkout-actions-buy').addEventListener('click', () => {
        document.querySelectorAll('.checkout-item').forEach((item) => {
            removeProductFromCart(item, cart.products.find((product) => product.id === Number(item.dataset.id)), true);
        });
        loadSuccessPage();
    });

    for (let i = 0; i < cart.products.length; i++) {
        let product = cart.products[i];
        document.querySelector('.checkout-items').insertAdjacentHTML('beforeend', createNewProductCheckoutHTML(product));
        let addedProduct = document.querySelector(`.checkout-item:last-child`);
        attachEventHandlersToProduct(addedProduct, product);
    }
}
