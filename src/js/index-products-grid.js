import {fetchProducts} from './api.js';
import {addAddToCartListeners} from "./cart";

let productsPerPage = 12;
let currentPage = 1;

export function initLoadMoreButton() {
    document.querySelector('.load-more-button').classList.remove('hidden');
    document.querySelector('.load-more-button').addEventListener('click', async () => {
        currentPage++;
        await loadProducts();
        if (currentPage * productsPerPage >= document.querySelector('#no-of-products').innerHTML.replace('Products: ', '')) {
            document.querySelector('.load-more-button').classList.add('hidden');
        }
    });
}

export async function initProducts() {
    // setTimeout(() => fetchProducts(10000).then(res => document.querySelector('#no-of-products').innerHTML = 'Products: ' + res.length), 1000);
    fetchProducts(10000).then(res => document.querySelector('#no-of-products').innerHTML = 'Products: ' + res.length);
    await loadProducts();
    initLoadMoreButton();
}

export function createCssClass(className, urlSimple) {
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

function goToProductPage() {
    document.querySelectorAll('.product-image').forEach((product) => {
        product.addEventListener('click', () => window.location.href = 'product-page.html?id=' + product.attributes[1].value);
    });
}

export function addListeners() {
    addAddToCartListeners();
    goToProductPage();
}

export function createNewProductGrid(product) {
    return `
    <div class="product">
        <div class="product-image id${product.id}" data-id="${product.id}">
            <img src="${product.images[product.images.length - 1]}" alt="${product.title}">` + (product.discountPercentage > 7 ? `<div>-${product.discountPercentage}%</div>` : '') +
        `</div>
        <div class="product-info">
            <div class="product-info-left">
                <div class="product-info-name">${product.title}</div>
                <div class="product-info-price">$ ${product.price}</div>
            </div>
            <div class="product-info-right">
                <button class="button add-to-cart-button" data-id="${product.id}">Add to cart</button>
            </div>
        </div>
    </div>
    `;
}

async function loadProducts() {
    let products;
    if (JSON.parse(localStorage.getItem('products')).length <= (currentPage - 1) * productsPerPage) {
        let newProducts = await fetchProducts(productsPerPage, (currentPage - 1) * productsPerPage);
        products = JSON.parse(localStorage.getItem('products')).concat(newProducts);
        localStorage.setItem('products', JSON.stringify(products));
        console.log('loaded new products');
    }
    products = JSON.parse(localStorage.getItem('products')).slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    products.forEach((product) => {
        document.querySelector('.products-grid').insertAdjacentHTML('beforeend', createNewProductGrid(product));
        createCssClass('id' + product.id, product.images[0]);
    });

    addListeners();
}