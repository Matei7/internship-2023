const products = [
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
        "images": ["https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"]
    }
    , {
        "id": 2,
        "title": "iPhone X",
        "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        "price": 899,
        "discountPercentage": 17.94,
        "rating": 4.44,
        "stock": 34,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        "images": ["https://i.dummyjson.com/data/products/2/1.jpg", "https://i.dummyjson.com/data/products/2/2.jpg", "https://i.dummyjson.com/data/products/2/3.jpg", "https://i.dummyjson.com/data/products/2/thumbnail.jpg"]
    }, {
        "id": 3,
        "title": "Samsung Universe 9",
        "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
        "price": 1249,
        "discountPercentage": 15.46,
        "rating": 4.09,
        "stock": 36,
        "brand": "Samsung",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
        "images": ["https://i.dummyjson.com/data/products/3/1.jpg"]
    },
    {
        "id": 4,
        "title": "OPPOF19",
        "description": "OPPO F19 is officially announced on April 2021.",
        "price": 280,
        "discountPercentage": 17.91,
        "rating": 4.3,
        "stock": 123,
        "brand": "OPPO",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
        "images": ["https://i.dummyjson.com/data/products/4/1.jpg", "https://i.dummyjson.com/data/products/4/2.jpg", "https://i.dummyjson.com/data/products/4/3.jpg", "https://i.dummyjson.com/data/products/4/4.jpg", "https://i.dummyjson.com/data/products/4/thumbnail.jpg"]
    }
    , {
        "id": 14,
        "title": "Non-Alcoholic Concentrated Perfume Oil",
        "description": "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
        "price": 120,
        "discountPercentage": 15.6,
        "rating": 4.21,
        "stock": 114,
        "brand": "Al Munakh",
        "category": "fragrances",
        "thumbnail": "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
        "images": ["https://i.dummyjson.com/data/products/14/1.jpg", "https://i.dummyjson.com/data/products/14/2.jpg", "https://i.dummyjson.com/data/products/14/3.jpg", "https://i.dummyjson.com/data/products/14/thumbnail.jpg"]
    }, {
        "id": 15,
        "title": "Eau De Perfume Spray",
        "description": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
        "price": 30,
        "discountPercentage": 10.99,
        "rating": 4.7,
        "stock": 105,
        "brand": "Lord - Al-Rehab",
        "category": "fragrances",
        "thumbnail": "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
        "images": ["https://i.dummyjson.com/data/products/15/1.jpg", "https://i.dummyjson.com/data/products/15/2.jpg", "https://i.dummyjson.com/data/products/15/3.jpg", "https://i.dummyjson.com/data/products/15/4.jpg", "https://i.dummyjson.com/data/products/15/thumbnail.jpg"]
    }, {
        "id": 16,
        "title": "Hyaluronic Acid Serum",
        "description": "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
        "price": 19,
        "discountPercentage": 13.31,
        "rating": 4.83,
        "stock": 110,
        "brand": "L'Oreal Paris",
        "category": "skincare",
        "thumbnail": "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
        "images": ["https://i.dummyjson.com/data/products/16/1.png", "https://i.dummyjson.com/data/products/16/2.webp", "https://i.dummyjson.com/data/products/16/3.jpg", "https://i.dummyjson.com/data/products/16/4.jpg", "https://i.dummyjson.com/data/products/16/thumbnail.jpg"]
    }
]

let mapImageToProduct = {};

let mapQuantityProduct = {};
products.forEach(product => {
    mapImageToProduct[product.id] = product.images.length - 1;
});

products.forEach(product => {
    mapQuantityProduct[product.id] = 0;
});

let lastActiveProduct = null;
let productsInCart = 0;


function addProductInCartBox(cardElement) {
    const productId = Number(cardElement.dataset.id);
    const product = products.find(product => product.id === productId);
    if (mapQuantityProduct[product.id] >= 1) {
        const itemBox = document.querySelector(`.item-box[data-id="${product.id}"]`);
        const itemQuantity = itemBox.querySelector(".item-box-number");
        const itemTotalPrice = itemBox.querySelector(".item-box-total");
        mapQuantityProduct[product.id]++;
        itemQuantity.textContent = `x${mapQuantityProduct[product.id]}`;
        itemTotalPrice.textContent = `$${(mapQuantityProduct[product.id] * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;
        return;
    }
    let cartList = document.getElementsByClassName("cart-window-list");
    const itemBox = document.createElement("div");
    itemBox.classList.add("item-box");
    itemBox.setAttribute("data-id", product.id);
    const itemImage = document.createElement("img");
    itemImage.classList.add("item-box__image");
    itemImage.src = product.thumbnail;
    itemImage.alt = product.title;
    const itemTitle = document.createElement("p");
    itemTitle.classList.add("item-box-title");
    itemTitle.textContent = product.title;
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("item-box-price");
    itemPrice.textContent = `$${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}`;
    const itemQuantity = document.createElement("p");
    itemQuantity.classList.add("item-box-number");
    mapQuantityProduct[product.id]++;
    itemQuantity.textContent = `x${mapQuantityProduct[product.id]}`;
    const itemTotalPrice = document.createElement("p");
    itemTotalPrice.classList.add("item-box-total");
    //console.log(mapQuantityProduct[product.id])
    itemTotalPrice.textContent = `$${(mapQuantityProduct[product.id] * (product.price - (product.price * product.discountPercentage) / 100)).toFixed(2)}`;
    itemBox.appendChild(itemImage);
    itemBox.appendChild(itemTitle);
    itemBox.appendChild(itemPrice);
    itemBox.appendChild(itemQuantity);
    itemBox.appendChild(itemTotalPrice);
    cartList[0].appendChild(itemBox);

}

function showCart() {
    const cart = document.getElementById("cart");
    productsInCart++;
    cart.textContent = `Cart: ${productsInCart} Products`;
}

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
    brand.classList.add("category");
    category.textContent = `Category: ${product.category}`;
    const stock = document.createElement("div");
    brand.classList.add("stock");
    stock.textContent = `Stock: ${product.stock}`;
    const rating = document.createElement("div");
    brand.classList.add("rating");
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

    return card;
}

function showPopUp() {
    const popUp = document.createElement("div");
    popUp.classList.add("pop-up");
    popUp.textContent = "Product added successfully";
    const bodyElem = document.querySelector("body");
    bodyElem.appendChild(popUp);
}


export function addItemToCard(product) {
    let btnAddToCart = product.querySelector(".product-grid__product-card__add-to-cart-button");
    btnAddToCart.addEventListener("click", function () {
       // console.log("Adding item to cart");
       // console.log(product.dataset.id);
        const initialColor = btnAddToCart.style.backgroundColor;
        const initialText = btnAddToCart.textContent;
        btnAddToCart.style.backgroundColor = "#023020";
        btnAddToCart.textContent = "Added to cart";
        btnAddToCart.style.scale = "1.3";
        showCart();
        addProductInCartBox(product);
        showPopUp();
        setTimeout(function () {
            btnAddToCart.style.backgroundColor = initialColor;
            btnAddToCart.textContent = initialText;
            btnAddToCart.style.scale = "1";
            const bodyElement = document.querySelector("body");
            bodyElement.removeChild(bodyElement.lastChild);
        }, 3000);
    });
}

function changeImage(id, direction, card) {
    const currentProduct = products.find((product) => product.id === id);
    if (!currentProduct) {
        console.error("product doesn't exist.");
        return;
    }
    const currentImageIndex = mapImageToProduct[id];
    const imagesLength = currentProduct.images.length;

    let newIndex = currentImageIndex + direction;

    if (newIndex >= imagesLength) {
        newIndex = 0; // de la prima imagine
    } else if (newIndex < 0) {
        newIndex = imagesLength - 1; //  de la ultima
    }
    mapImageToProduct[id] = newIndex;
    const mainImage = card.querySelector(`#product-grid__product-card__image-wrapper__image__id${card.dataset.id}`)
    mainImage.src = currentProduct.images[newIndex];

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

export function init() {
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

    const mainContainer = document.querySelector(".product-grid");
    products.forEach(product => {
        const cardElement = createCard(product);
        mainContainer.appendChild(cardElement);
    });

    const cardElements = document.querySelectorAll(".product-grid__product-card");
    cardElements.forEach(card => {
        addItemToCard(card);

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


    });

    const cartButton = document.getElementById("cart");
    cartButton.addEventListener("mouseover", function () {
        if (productsInCart === 0) return;
        const cartWindow = document.querySelector(".cart-window");
        cartWindow.setAttribute("style", "display:block")
        cartWindow.classList.add("show")
    });
    cartButton.addEventListener("mouseout", function () {
        const cartWindow = document.querySelector(".cart-window");
        cartWindow.setAttribute("style", "display:none")
        cartWindow.classList.remove("show")
    });
}




