import {getItemById} from "../product_api";

const sampleItem =
    {
        "id": 1,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        ]
    }
let currentImageIndex = 0;

function showCurrentImage(index){
    const imagesContainer=document.querySelector(".images");
    const images=imagesContainer.querySelectorAll("img");

    for (let i=0; i<images.length; i++){
        if (i===index)
            images[i].classList.remove("hidden");
        else
            images[i].classList.add("hidden");
    }
}
function nextImage() {

    currentImageIndex++;
    const imagesContainer = document.querySelector(".images");
    const width = imagesContainer.clientWidth;
    const translateX = currentImageIndex * width;

    if (currentImageIndex >= sampleItem.images.length) {
        currentImageIndex = -1;
        imagesContainer.style.transform = `translateX(0)`;
        showCurrentImage(currentImageIndex+1);
    } else{
        imagesContainer.style.transform = `translateX(-${translateX}px)`;
        showCurrentImage(currentImageIndex);
    }

}

function prevImage() {

    const imagesContainer = document.querySelector(".images");
    const width = imagesContainer.clientWidth;
    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = sampleItem.images.length - 1;
        imagesContainer.style.transform = `translateX(-${currentImageIndex * width}px)`;
        showCurrentImage(currentImageIndex);
    } else {
        const translateX = currentImageIndex * width;
        imagesContainer.style.transform = `translateX(-${translateX}px)`;
        showCurrentImage(currentImageIndex);
    }


}

function loadProduct(jsonItem) {
    const imagesContainer = document.querySelector(".images");
    imagesContainer.innerHTML = "";

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
        <p>Price: $${jsonItem.price}</p>
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
async function getJsonProduct(){
    const itemId = Number(new URLSearchParams(window.location.search).get("id"));
    const jsonItem = await getItemById(itemId);
    return jsonItem;
}
document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        const jsonItem = getJsonProduct();
        getJsonProduct().then((jsonItem) => {
            loadProduct(jsonItem);
            showCurrentImage(currentImageIndex);
        });

        //loadProduct(jsonItem);

    }, 1000);


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


});

