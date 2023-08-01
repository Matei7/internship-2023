import {getItemById} from "./product_api.js";
import {handleCartHoverEvent, loadCart} from "../cart/cart_script.js";

let currentItem = {};
let currentImageIndex = 0;

/**
 * Shows the current image based on the index
 * @param index
 */
function showCurrentImage(index) {
    const imagesContainer = document.querySelector(".images");
    const images = imagesContainer.querySelectorAll("img");

    for (let i = 0; i < images.length; i++) {
        if (i === index)
            images[i].classList.remove("hidden");
        else
            images[i].classList.add("hidden");
    }
}

/**
 * Shows the next image
 */
function nextImage() {

    currentImageIndex++;
    const imagesContainer = document.querySelector(".images");
    const width = imagesContainer.clientWidth;
    const translateX = currentImageIndex * width;

    if (currentImageIndex >= currentItem.images.length) {
        currentImageIndex = -1;
        imagesContainer.style.transform = `translateX(0)`;
        showCurrentImage(currentImageIndex + 1);
    } else {
        imagesContainer.style.transform = `translateX(-${translateX}px)`;
        showCurrentImage(currentImageIndex);
    }

}

/**
 * Shows the previous image
 */
function prevImage() {

    const imagesContainer = document.querySelector(".images");
    const width = imagesContainer.clientWidth;
    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = currentItem.images.length - 1;
        imagesContainer.style.transform = `translateX(-${currentImageIndex * width}px)`;
        showCurrentImage(currentImageIndex);
    } else {
        const translateX = currentImageIndex * width;
        imagesContainer.style.transform = `translateX(-${translateX}px)`;
        showCurrentImage(currentImageIndex);
    }


}

/**
 * Loads the product based on the jsonItem
 * @param jsonItem
 */
function loadProduct(jsonItem) {
    const imagesContainer = document.querySelector(".images");
    imagesContainer.innerHTML = "";
    const discountPrice = (jsonItem.price * (1 - jsonItem.discountPercentage / 100)).toFixed(2);
    for (const url of jsonItem.images) {
        const img = document.createElement("img");
        img.src = url;
        img.alt = jsonItem.title;
        img.loading = "lazy";
        document.querySelector(".images").append(img);
        img.classList.add("hidden");
    }
    document.querySelector(".info").innerHTML = `
    <div class="main-info">
        <h1>${jsonItem.title}</h1>
        <p>Price: $${discountPrice}</p>
    </div>
    <div class="item-section-2">
        <p>Rating: ${jsonItem.rating}</p>
        <p>Stock: ${jsonItem.stock}</p>
    </div>
    
    <p>${jsonItem.description}</p>
    
    <div class="item-section-1">
        <p>Category: ${jsonItem.category}</p>
        <p>Brand: ${jsonItem.brand}</p>
    </div>

    `;
}

/**
 * Gets the jsonItem from the api based on the id
 * @returns {Promise<*>}
 */
async function getJsonProduct() {
    const itemId = Number(new URLSearchParams(window.location.search).get("id"));
    const jsonItem = await getItemById(itemId);
    return jsonItem;
}


/**
 * Adds event listeners to the arrows
 */
function addEventListeners() {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    rightArrow.addEventListener("click", nextImage);
    leftArrow.addEventListener("click", prevImage);
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight")
            nextImage();
        else if (event.key === "ArrowLeft")
            prevImage();
    });
}

setTimeout(() => {
    getJsonProduct().then(async (jsonItem) => {
        loadProduct(jsonItem);
        currentItem = jsonItem;
        showCurrentImage(currentImageIndex);
        await loadCart();
        handleCartHoverEvent();
    });
}, 1000);

addEventListeners();


