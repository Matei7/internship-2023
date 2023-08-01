let products = [];
let cartProducts = null;
let cartQuantity = 0;
let cartTotal = 0;
let skipPagination = 0;
let limitPagination = 6;

const API_INTERNAL_CART_ID = '64c3aa50d27ba';
const API_INTERNAL_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`;
const cartProductsContainer = document.querySelector('.cart-items');

function createProductsInPage(productsJSON) {
    const productsContainer = document.querySelector('.products');

    for (const product of productsJSON.products) {

        const productContainer = document.createElement('div');
        productContainer.classList.add('products-item');

        const title = document.createElement('h2');
        title.innerText = product.title;
        title.classList.add('product-title');

        const imagesContainer = document.createElement('div');
        imagesContainer.classList.add('product-images');

        for (const imageSrc of product.images) {
            const image = document.createElement('img');
            image.setAttribute('src', imageSrc);
            image.setAttribute('alt', product.title + "image");
            image.classList.add('product-image');
            image.style.display = 'none';
            imagesContainer.appendChild(image);
        }
        imagesContainer.firstElementChild.style.display = 'block';

        const arrowLeft = document.createElement('div');
        const arrowRight = document.createElement('div');
        arrowLeft.classList.add('arrow-left');
        arrowRight.classList.add('arrow-right');

        const brand = document.createElement('h3');
        brand.innerText = `Made by ${product.brand}`;
        brand.classList.add('product-brand');

        const category = document.createElement('h5');
        category.innerText = `Category: ${product.category}`;
        category.classList.add('product-category');

        const description = document.createElement('p');
        description.innerText = product.description;
        description.classList.add('product-description');

        const discountPercentage = document.createElement('p');
        const priceWithoutDiscount = Math.floor(product.price + product.price * product.discountPercentage / 100);
        discountPercentage.innerText = `$${priceWithoutDiscount}`;
        discountPercentage.classList.add('product-discount-percentage');

        productContainer.setAttribute('data-id', product.id);

        const price = document.createElement('h3');
        price.innerText = `$${product.price}`;
        price.classList.add('product-price');


        const rating = document.createElement('h3');
        const starRating = document.createElement('span')
        starRating.classList.add('star-rating');
        starRating.style.setProperty('--rating', product.rating);
        rating.classList.add('product-rating');
        rating.appendChild(starRating);
        rating.innerHTML += ` ${product.rating}`;

        const stock = document.createElement('h3');
        stock.innerText = `Available: ${product.stock}`;
        stock.classList.add('product-stock');

        const button = document.createElement('button');
        button.classList.add('product-button');
        button.innerText = 'Add to cart';

        productContainer.appendChild(imagesContainer);
        productContainer.appendChild(arrowLeft);
        productContainer.appendChild(arrowRight);
        productContainer.appendChild(title);
        productContainer.appendChild(brand);
        productContainer.appendChild(category);
        productContainer.appendChild(rating);
        productContainer.appendChild(stock);
        productContainer.appendChild(description);
        productContainer.appendChild(discountPercentage);
        productContainer.appendChild(price);
        productContainer.appendChild(button);

        productContainer.style.display = 'none';
        productsContainer.appendChild(productContainer);
    }
}

export async function getProducts() {
    const API_GET_PRODUCTS_URL = `https://dummyjson.com/products?limit=${limitPagination}&skip=${skipPagination}&select=id,title,brand,category,description,price,stock,rating,discountPercentage,images`

    try {
        const response = await fetch(API_GET_PRODUCTS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseJSON = await response.json();
        createProductsInPage(responseJSON);
        products = products.concat(responseJSON.products);
        skipPagination += limitPagination;
        console.log("Products fetched successfully from API!")

    } catch (e) {
        console.log("Error fetching products from API! Trying to fetch from localStorage...");
        const allProducts = JSON.parse(localStorage.getItem('products'));
        products = allProducts.slice(skipPagination, skipPagination + limitPagination)
        createProductsInPage(products);
        skipPagination += limitPagination;
        console.log("Products fetched successfully from localStorage!");
    }
}

export function updateCartCount() {
    const shoppingCartCount = document.querySelector('.shopping-cart-count');
    if (cartQuantity === 0) {
        shoppingCartCount.style.display = 'none';
        return;
    }
    shoppingCartCount.innerText = cartQuantity;
    shoppingCartCount.style.display = 'flex';
}

function checkIfItemExistsInCartProducts(id) {
    if (cartProducts === null) {
        return false;
    }
    for (const product of cartProducts.products) {
        if (product.id === id) {
            return true;
        }
    }
    return false;
}

export function buttonsClickAddToCartPopUp() {
    const buttons = document.querySelectorAll('.product-button:not([data-event="true"])');
    const popUpContainer = document.querySelector('.pop-up');
    buttons.forEach(button => {
        button.setAttribute('data-event', 'true');
        button.addEventListener('click', () => {
            popUpContainer.style.display = 'flex';
            button.style.pointerEvents = 'none';
            const productId = button.parentElement.getAttribute('data-id');

            if (checkIfItemExistsInCartProducts(productId)) {
                const item = cartProductsContainer.querySelector(`[data-cart-id="${productId}"]`);
                const itemCounter = item.querySelector('.cart-item-counter');
                const currentQuantity = parseInt(itemCounter.innerText.slice(1)); // x1 -> 1
                const newQuantity = currentQuantity + 1;
                itemCounter.innerText = `x${newQuantity}`;
            } else {
                const cartItem = document.createElement('div');
                cartItem.setAttribute('data-cart-id', productId);
                cartItem.classList.add('cart-item');

                const product = products[productId - 1];
                const cartItemCounter = document.createElement('h3')
                cartItemCounter.innerText = 'x1'
                cartItemCounter.classList.add('cart-item-counter');

                const cartItemTitle = document.createElement('h3');
                cartItemTitle.innerText = product.title;
                cartItemTitle.classList.add('cart-item-title');

                const cartItemImage = document.createElement('img');
                cartItemImage.setAttribute('src', product.images[0]);
                cartItemImage.setAttribute('alt', product.title + "image");
                cartItemImage.classList.add('cart-item-image');

                const cartItemPrice = document.createElement('h3');
                cartItemPrice.innerText = `$${product.price}`;
                cartItemPrice.classList.add('cart-item-price');

                cartItem.appendChild(cartItemImage);
                cartItem.appendChild(cartItemCounter);
                cartItem.appendChild(cartItemTitle);
                cartItem.appendChild(cartItemPrice);
                cartProductsContainer.appendChild(cartItem);
            }
            cartQuantity++;
            updateCartCount();
            fetchAddProductToCart(productId).then(() => {});
            updateCartTotal(cartTotal + products[productId - 1].price);
            localStorage.removeItem('cart');
            button.innerText = 'Added to cart';
            setTimeout(() => {
                popUpContainer.style.display = 'none';
                button.innerText = 'Add to cart';
                button.style.pointerEvents = 'all';
            }, 2000);
        });
    });
}

function nextImageInProductGallery(image) {
    const productContainer = image.parentElement;
    const nextImage = image.nextElementSibling;
    if (nextImage) {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        nextImage.style.display = 'block';
        nextImage.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        productContainer.firstElementChild.style.display = 'block';
        productContainer.firstElementChild.style.animation = 'fadeIn 0.5s ease-in-out';
    }
}

function previousImageInProductGallery(image) {
    const productContainer = image.parentElement;
    const previousImage = image.previousElementSibling;
    if (previousImage) {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        previousImage.style.display = 'block';
        previousImage.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        productContainer.lastElementChild.style.display = 'block';
        productContainer.lastElementChild.style.animation = 'fadeIn 0.5s ease-in-out';
    }
}

function calculateClickPositionOfGalleryImage(image, event) {
    const clickX = event.clientX - image.getBoundingClientRect().left;
    const containerWidth = image.clientWidth;
    const clickPercentage = (clickX / containerWidth) * 100;
    const threshold = 50;
    if (clickPercentage >= threshold) {
        nextImageInProductGallery(image);
    } else if (clickPercentage < threshold) {
        previousImageInProductGallery(image);
    }
}

export function nextImageInProductGalleryEvent() {
    const images = document.querySelectorAll('.product-image:not([data-event="true"])');
    images.forEach(image => {
        image.setAttribute('data-event', 'true');
        image.addEventListener('click', (event) => {
            calculateClickPositionOfGalleryImage(image, event);
        });
    });
}

const handleKeyDownEvent = (event) => {
    const hoveredProduct = document.querySelector('.hovered');
    const currentImage = hoveredProduct.querySelector('.product-image[style*="display: block"]');
    if (event.key === 'ArrowRight') {
        nextImageInProductGallery(currentImage);
    }
    if (event.key === 'ArrowLeft') {
        previousImageInProductGallery(currentImage);
    }
}

const handleClickOnArrowEvent = (event) => {
    const hoveredProduct = document.querySelector('.hovered');
    const currentImage = hoveredProduct.querySelector('.product-image[style*="display: block"]');
    if (event.target.classList.contains('arrow-right')) {
        nextImageInProductGallery(currentImage);
    }
    if (event.target.classList.contains('arrow-left')) {
        previousImageInProductGallery(currentImage);
    }
}

export function hoverProductEvent() {
    const items = document.querySelectorAll('.products-item:not([data-event="true"])');
    items.forEach(item => {
        item.setAttribute('data-event', 'true');
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.01)';
            item.classList.add('hovered');
            document.addEventListener('keydown', handleKeyDownEvent);
            item.addEventListener('click', handleClickOnArrowEvent);
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
            item.classList.remove('hovered');
            document.removeEventListener('keydown', handleKeyDownEvent);
            item.removeEventListener('click', handleClickOnArrowEvent);
        });
    });
}

export function hoverCartEvent() {
    const cart = document.querySelector('.shopping-cart');
    cart.addEventListener('mouseover', () => {
        cartProductsContainer.style.display = 'flex';
    });
    cart.addEventListener('mouseout', () => {
        cartProductsContainer.style.display = 'none';
    });
}

const hideLoader = () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
};
const showLoader = () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '1';
};

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && products.length < 100) {
        showLoader();
        getProducts().then(() => {
            hideLoader();
            buttonsClickAddToCartPopUp();
            nextImageInProductGalleryEvent();
            hoverProductEvent();
            const filter = document.querySelector('.filter-bar').value;
            displayProductInPageByFilter(filter);
        });
    }
}, {passive: true});

export async function fetchAddProductToCart(productID, quantity = 1) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: productID,
                    quantity: quantity
                }]
        })
    }).then(res => res.json())
}

export async function fetchRemoveProductFromCart(productID, quantity = -1) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: productID,
                    quantity: quantity
                }]
        })
    }).then(res => res.json())
}

export async function fetchDeleteProductFromCart(productID) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_INTERNAL_CART_ID}?products[]=${productID}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
}

export async function initCartProducts() {
    if (localStorage.getItem('cart') === null) {
        const response = await fetch(API_INTERNAL_CART_GET);
        cartProducts = await response.json();
        console.log("No cart in local storage, fetching from API")
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    } else {
        console.log("Cart found in local storage")
        cartProducts = JSON.parse(localStorage.getItem('cart'));
    }
    for (const product of cartProducts.products) {
        createProductInCart(product);
    }
    updateCartCount();
    updateCartTotal(cartProducts.total);
}

function updateCartTotal(newTotal) {
    cartTotal = newTotal;
    const totalElement = document.querySelector('.cart-total');
    totalElement.innerText = `TOTAL: $${newTotal}`;
}

function createProductInCart(product) {
    cartQuantity += product.quantity;

    const cartItem = document.createElement('div');
    cartItem.setAttribute('data-cart-id', product.id);
    cartItem.classList.add('cart-item');

    const cartItemCounter = document.createElement('h3')
    cartItemCounter.classList.add('cart-item-counter');
    cartItemCounter.innerText = `x${product.quantity}`;

    const cartItemTitle = document.createElement('h3');
    cartItemTitle.innerText = product.title;
    cartItemTitle.classList.add('cart-item-title');

    const cartItemImage = document.createElement('img');
    cartItemImage.setAttribute('src', product.images[0]);
    cartItemImage.setAttribute('alt', product.title + "image");
    cartItemImage.classList.add('cart-item-image');

    const cartItemPrice = document.createElement('h3');
    cartItemPrice.innerText = `$${product.price}`;
    cartItemPrice.classList.add('cart-item-price');

    cartItem.appendChild(cartItemImage);
    cartItem.appendChild(cartItemCounter);
    cartItem.appendChild(cartItemTitle);
    cartItem.appendChild(cartItemPrice);
    cartProductsContainer.appendChild(cartItem);
}

export function displayProductInPageByFilter(filter) {
    if (filter === '') {
        for (const product of products) {
            const productToDisplay = document.querySelector(`[data-id="${product.id}"]`);
            productToDisplay.style.display = 'grid'
        }
        return;
    }
    const filteredItemsByCategory = products.filter(product => product.category.toLowerCase().startsWith(filter.toLowerCase()));
    if (filteredItemsByCategory.length !== 0) {
        for (const product of products) {
            const productToDisplay = document.querySelector(`[data-id="${product.id}"]`);
            productToDisplay.style.display = 'none'
        }
        for (const product of filteredItemsByCategory) {
            const productToDisplay = document.querySelector(`[data-id="${product.id}"]`);
            productToDisplay.style.display = 'grid'
        }
    } else {
        const filteredItemsByTitle = products.filter(product => product.title.toLowerCase().startsWith(filter.toLowerCase()));
        for (const product of products) {
            const productToDisplay = document.querySelector(`[data-id="${product.id}"]`);
            productToDisplay.style.display = 'none'
        }
        for (const product of filteredItemsByTitle) {
            const productToDisplay = document.querySelector(`[data-id="${product.id}"]`);
            productToDisplay.style.display = 'grid'
        }
    }
}

export function filterBar() {
    const filterBar = document.querySelector('.filter-bar')
    filterBar.addEventListener('input', (event) => {
        const filter = event.target.value;
        displayProductInPageByFilter(filter);
    });
}