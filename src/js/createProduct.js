import {addArrowsListener,initiateMapGallery} from "./galleryFunctions.js";
export function createCard(product) {
    const card = document.createElement("div");
    card.setAttribute("data-id", product.id);
    card.classList.add("product-grid__product-card");

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("product-grid__product-card__image-wrapper");
    const galleryWrapper = document.createElement("div");
    galleryWrapper.classList.add("product-grid__product-card__image-wrapper__gallery");
    const productImage = document.createElement("img");
    productImage.classList.add("product-grid__product-card__image-wrapper__image");
    productImage.id = `product-grid__product-card__image-wrapper__image__id${product.id}`;
    const arrowsWrapper = document.createElement("div");
    arrowsWrapper.classList.add("product-grid__product-card__image-wrapper__arrows");
    const leftArrow = document.createElement("span");
    const rightArrow = document.createElement("span");
    leftArrow.innerHTML = "&#8249;";
    rightArrow.innerHTML = "&#8250;";
    leftArrow.classList.add("arrow");
    leftArrow.classList.add("left");
    rightArrow.classList.add("arrow");
    rightArrow.classList.add("right");

    const productDiscount = document.createElement("div");
    productDiscount.classList.add("product-grid__product-card__image-wrapper__discount");
    productDiscount.textContent = `-${product.discountPercentage}%`;
    productImage.src = product.thumbnail;
    productImage.alt = product.title;
    galleryWrapper.appendChild(productImage);
    arrowsWrapper.appendChild(leftArrow);
    arrowsWrapper.appendChild(rightArrow);
    galleryWrapper.appendChild(arrowsWrapper);
    galleryWrapper.appendChild(productDiscount);
    imageWrapper.appendChild(galleryWrapper);


    const productTitle = document.createElement("h2");
    productTitle.classList.add("product-grid__product-card__title");
    productTitle.textContent = product.title;

    const priceWrapper = document.createElement("div");
    priceWrapper.classList.add("product-grid__product-card__prices");
    const oldPrice = document.createElement("p");
    oldPrice.classList.add("product-grid__product-card__price__initial");
    oldPrice.textContent = `$${product.price}`;
    const newPrice = document.createElement("p");
    newPrice.classList.add("product-grid__product-card__price__final");
    newPrice.textContent = `$${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}`;
    priceWrapper.appendChild(oldPrice);
    priceWrapper.appendChild(newPrice);

    const productDescription = document.createElement("p");
    productDescription.classList.add("product-grid__product-card__description");
    productDescription.textContent = product.description;

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-grid__product-card__product-details");

    const brand = document.createElement("div");
    brand.classList.add("brand");
    brand.textContent = `Brand: ${product.brand}`;
    const category = document.createElement("div");
    category.classList.add("category");
    category.textContent = `Category: ${product.category}`;
    const stock = document.createElement("div");
    stock.classList.add("stock");
    stock.textContent = `Stock: ${product.stock}`;
    const rating = document.createElement("div");
    rating.classList.add("rating");
    rating.textContent = `Rating: ${product.rating}`;

    productDetails.appendChild(brand);
    productDetails.appendChild(category);
    productDetails.appendChild(stock);
    productDetails.appendChild(rating);

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("product-grid__product-card__add-to-cart-button");
    addToCartButton.textContent = "Add to Cart";

    card.appendChild(imageWrapper);

    card.appendChild(productTitle);
    card.appendChild(priceWrapper);
    card.appendChild(productDescription);
    card.appendChild(productDetails);
    card.appendChild(addToCartButton);

    addArrowsListener(card);
    initiateMapGallery(product.id, product.images.length-2);

    return card;
}