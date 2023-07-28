import {getTotalProductsInPage} from "./app.js";

let lastActiveProduct = null;
let mapImageToProduct = {};

export function addArrowsListener(card){
    const leftArrows = card.querySelector(".arrow.left");
    const rightArrows = card.querySelector(".arrow.right");
    leftArrows.addEventListener("click", () => {
        arrowClicked(card, -1);
        lastActiveProduct = card;
    });

    rightArrows.addEventListener("click", () => {
        arrowClicked(card, 1);
        lastActiveProduct = card;
    });
}
export function addDocumentListener(){
    document.addEventListener("keyup", function (event) {
        console.log(event.key);
        console.log(event.target);
        const direction = event.key === "ArrowLeft" ? -1 : 1;
        if (event.key === "ArrowLeft" ) {
            arrowClicked(lastActiveProduct, direction);
        } else if (event.key === "ArrowRight" ) {
            arrowClicked(lastActiveProduct, direction);
        }
    });
}
function arrowClicked(card, direction) {
    if (direction === -1) {
        console.log("left arrow clicked");
        const productId = Number(card.dataset.id);
        changeImage(productId, -1, card);
    } else {
        console.log("right arrow clicked");
        const productId = Number(card.dataset.id);
        changeImage(productId, 1, card);
    }
}

export function changeImage(id, direction, card) {
    let totalProductsInPage=getTotalProductsInPage();
    fetch(`https://dummyjson.com/products?limit=${totalProductsInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const products = data.products;
            const currentProduct = products.find(product => product.id === id);
            const currentImageIndex = mapImageToProduct[id];
            const imagesLength = currentProduct.images.length;

            let newIndex = currentImageIndex + direction;

            if (newIndex >= imagesLength) {
                newIndex = 0; // de la prima imagine
            } else if (newIndex < 0) {
                newIndex = imagesLength - 1; //  de la ultima
            }

            mapImageToProduct[id] = newIndex;
            const mainImage = card.querySelector(`#product-grid__product-card__image-wrapper__image__id${card.dataset.id}`);
            mainImage.src = currentProduct.images[newIndex];
        })
        .catch(error => {
            console.error("Error changing image:", error);
            throw error;
        });
}


export function initiateMapGallery(id, imagesLength) {
    mapImageToProduct[id] = imagesLength - 1;
}

