async function fetchProducts() {
    let jsonProducts = await fetch('https://dummyjson.com/products')
        .then(res => res.json());
    return jsonProducts['products'];
}

function createCssClass(className, urlSimple) {
    let style = document.createElement('style');
    style.textContent = 'style';
    style.innerHTML = `
    .product .${className} {
        background-image: url(${urlSimple});
        background-size: cover;
        margin: 0;
        padding: 0;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
}

function showNotification() {
    let notification = document.querySelector('.notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function addToCart() {
    showNotification();
}

function addAddToCartListeners() {
    document.querySelectorAll('.add-to-cart-button').forEach((button) => {
        button.addEventListener('click', addToCart);
    });
}

export async function loadProducts() {
    let products = await fetchProducts();

    products.forEach((product) => {
        let productHTML = `
        <div class="product">
            <div class="product-image id${product.id}">
                <img src="${product.images[product.images.length - 1]}" alt="${product.title}">` + (product.discountPercentage > 7 ? `<div>-${product.discountPercentage}%</div>` : '') +
            `</div>
            <div class="product-info">
                <div class="product-info-left">
                    <div class="product-info-name">${product.title}</div>
                    <div class="product-info-price">$ ${product.price}</div>
                </div>
                <div class="product-info-right">
                    <button class="button add-to-cart-button">Add to cart</button>
                </div>
            </div>
        </div>
        `;
        document.querySelector('.products-grid').insertAdjacentHTML('beforeend', productHTML);
        createCssClass('id' + product.id, product.images[0]);
    });

    addAddToCartListeners();
}