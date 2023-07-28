import {
    getProductAfterId,
    getCartAPI,
    addProductToCartAPI,
    updateProductQuantityAPI,
    removeProductFromCartAPI
} from "./api";

let cartListClicked = false;
let cartListTimeout = null;

export async function initCartList() {
    document.querySelector('.nav-bar-menu-right ul li:last-child').onmouseover = () => {
        document.querySelector('.cart-list').classList.add('show');
        clearTimeout(cartListTimeout);
    }

    document.querySelector('.nav-bar-menu-right ul li:last-child').onmouseout = () => {
        if (cartListClicked) {
            return;
        }
        cartListTimeout = setTimeout(() => {
            document.querySelector('.cart-list').classList.remove('show');
        }, 1000);
    }

    document.querySelector('.nav-bar-menu-right ul li:last-child').onclick = () => {
        cartListClicked = true;
        document.querySelector('.cart-list').classList.add('show');
    }

    document.querySelector('.cart-list-header-close').onclick = () => {
        cartListClicked = false;
        document.querySelector('.cart-list').classList.remove('show');
    }

    document.querySelector('.cart-list').onmouseover = () => {
        document.querySelector('.cart-list').classList.add('show');
        clearTimeout(cartListTimeout);
    }

    document.querySelector('.cart-list').onmouseout = () => {
        if (cartListClicked) {
            return;
        }
        cartListTimeout = setTimeout(() => {
            document.querySelector('.cart-list').classList.remove('show');
        }, 1000);
    }

    let cart = await getCartAPI();
    document.querySelector('.quantity-cart').innerHTML = cart.totalQuantity;
    document.querySelector('.cart-list-footer-total').innerHTML = 'Total: $' + cart.total;
    if (cart.totalQuantity !== 0) {
        document.querySelector('.quantity-cart').classList.remove('quantity-empty');
        for (let i = 0; i < cart.products.length; i++) {
            let product = cart.products[i];
            document.querySelector('.cart-list-body').insertAdjacentHTML('beforeend', createNewProductCartHTML(product));
            let addedProduct = document.querySelector(`.cart-list-body-item:last-child`);
            addedProduct.querySelector('.cart-list-body-item-quantity-value').innerHTML = product.quantity;
            addedProduct.querySelector('.cart-list-body-item-total').innerHTML = '$' + String(product.price * product.quantity);
            attachEventHandlersToProduct(addedProduct, product);
        }
    }
}

function createNewProductCartHTML(product) {
    return `
    <div class="cart-list-body-item" data-id="${product.id}">
        <div class="cart-list-body-item-image">
            <img src="${product.thumbnail}" alt="${product.title}">
        </div>
        <div class="cart-list-body-item-info">
            <div class="cart-list-body-item-info-title">${product.title}</div>
            <div class="cart-list-body-item-info-price">$${product.price}</div>
        </div>
        <div class="cart-list-body-item-quantity">
            <div class="cart-list-body-item-quantity-decrease">-</div>
            <div class="cart-list-body-item-quantity-value">1</div>
            <div class="cart-list-body-item-quantity-increase">+</div>
        </div>
        <div class="cart-list-body-item-total">$${product.price}</div>
        <div class="cart-list-body-item-remove"><span class="material-symbols-outlined">close</span></div>
    </div>
    `;
}

function showNotification() {
    let notification = document.querySelector('.notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function modifyAddToCartButton(btn) {
    btn.innerHTML = 'Added to cart';
    btn.classList.add('added-to-cart');
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = 'Add to cart';
        btn.classList.remove('added-to-cart');
        btn.disabled = false;
    }, 3000);
}

async function addToCart(btn, productId) {
    showNotification();
    modifyAddToCartButton(btn);
    await updateCart(productId);
}

export function addAddToCartListeners() {
    document.querySelectorAll('.add-to-cart-button').forEach((button) => {
        button.addEventListener('click', async () => {
            await addToCart(button, button.attributes[1].value);
        });
    });
}

function updateQuantityInCart(quantityToAdd) {
    if (document.querySelector('.quantity-cart').innerHTML === '0') {
        document.querySelector('.quantity-cart').classList.remove('quantity-empty');
    }
    document.querySelector('.quantity-cart').innerHTML = Number(document.querySelector('.quantity-cart').innerHTML) + quantityToAdd;
    if (document.querySelector('.quantity-cart').innerHTML === '0') {
        document.querySelector('.quantity-cart').classList.add('quantity-empty');
    }
}

function updateProductQuantity(addedProduct, productInfo, quantityToAdd) {
    updateProductQuantityAPI(productInfo.id, quantityToAdd);
    let quantity = Number(addedProduct.querySelector('.cart-list-body-item-quantity-value').innerHTML) + quantityToAdd;
    addedProduct.querySelector('.cart-list-body-item-quantity-value').innerHTML = quantity;
    addedProduct.querySelector('.cart-list-body-item-total').innerHTML = '$' + (productInfo.price * quantity);
    updateQuantityInCart(quantityToAdd);
    document.querySelector('.cart-list-footer-total').innerHTML = 'Total: $' + String(Number(document.querySelector('.cart-list-footer-total').innerHTML.split('$')[1]) + (productInfo.price * quantityToAdd));
}


async function decreaseProductQuantity(addedProduct, productInfo) {
    if (addedProduct.querySelector('.cart-list-body-item-quantity-value').innerHTML === '1') {
        await removeProductFromCart(addedProduct, productInfo);
        return;
    }
    updateProductQuantity(addedProduct, productInfo, -1);
}

function increaseProductQuantity(addedProduct, productInfo) {
    updateProductQuantity(addedProduct, productInfo, 1);
}

async function removeProductFromCart(addedProduct, productInfo) {
    document.querySelector('.cart-list-body').removeChild(addedProduct);
    removeProductFromCartAPI(productInfo.id);
    document.querySelector('.cart-list-footer-total').innerHTML = 'Total: $' + String(Number(document.querySelector('.cart-list-footer-total').innerHTML.replace('Total: $', '')) - productInfo.price * Number(addedProduct.querySelector('.cart-list-body-item-quantity-value').innerHTML));
    updateQuantityInCart(addedProduct.querySelector('.cart-list-body-item-quantity-value').innerHTML * -1);
}

function attachEventHandlersToProduct(addedProduct, product) {
    addedProduct.querySelector('.cart-list-body-item-quantity-decrease').addEventListener('click', () => decreaseProductQuantity(addedProduct, product));
    addedProduct.querySelector('.cart-list-body-item-quantity-increase').addEventListener('click', () => increaseProductQuantity(addedProduct, product));
    addedProduct.querySelector('.cart-list-body-item-remove').addEventListener('click', () => removeProductFromCart(addedProduct, product));
}

async function updateCart(productId) {
    let product = await getProductAfterId(productId);
    let cartProducts = document.querySelectorAll('.cart-list-body-item');
    let productsExists = false;
    let cart = null;
    for (let cartIndex = 0; cartIndex < cartProducts.length; cartIndex++) {
        if (cartProducts[cartIndex].getAttribute('data-id') === String(productId)) {
            let newQuantity = Number(cartProducts[cartIndex].querySelector('.cart-list-body-item-quantity-value').innerHTML) + 1;
            cart = updateProductQuantityAPI(product.id, 1);
            cartProducts[cartIndex].querySelector('.cart-list-body-item-quantity-value').innerHTML = String(newQuantity);
            productsExists = true;
            break;
        }
    }

    if (!productsExists) {
        document.querySelector('.cart-list-body').insertAdjacentHTML('beforeend', createNewProductCartHTML(product));
        product.quantity = 1;
        const addedProduct = document.querySelector('.cart-list-body-item:last-child');
        attachEventHandlersToProduct(addedProduct, product);
        cart = addProductToCartAPI(product);
    }
    document.querySelector('.cart-list-footer-total').innerHTML = 'Total: $' + (Number(document.querySelector('.cart-list-footer-total').innerHTML.replace('Total: $', '')) + product.price);
    updateQuantityInCart(1);
}
