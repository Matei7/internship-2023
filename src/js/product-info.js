import { getProductAfterId } from "./api.js";

export async function loadProductPage() {
    let productId = Number(new URLSearchParams(window.location.search).get("id"));
    let product = await getProductAfterId(productId);
    let innerHtml  = `
        <div class="product-image">`;
    product.images.forEach(image => {
        innerHtml += `<img class="slide" src="${image}" alt="product-image">`
    });
    if(product.images.length > 1) {
        innerHtml += `<a href="#" class="prev"><</a>
            <a href="#" class="next">></a>
        
            <div class="slideshow-dots">`;
        for (let i = 0; i < product.images.length; i++) {
            innerHtml += `<span class="dot"></span>`;
        }
    }
    innerHtml += `</div>
        </div>
        <div class="product-details">
            <div class="product-name" onclick="">${product.title}</div>
            <div class="product-price">$ ${product.price}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-quantity">
                <label for="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" min="1" max="5" value="1">
            </div>
            <div class="">
                <button class="button product-add-to-cart">Add to cart</button>
                <button><span class="button material-symbols-outlined">favorite</span></button>
            </div>
        </div>`;
    document.querySelector('.product-info').innerHTML = innerHtml;
    return product.images.length;
}