let products = [];
let skipPagination = 0;
let limitPagination = 6;
const API_CART_ID = '64c3aa50d27ba';

const cartItems = document.querySelector('.cart-items');

function createProducts(productsJSON) {
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
        const lastPrice = Math.floor(product.price + product.price * product.discountPercentage / 100);
        discountPercentage.innerText = `$${lastPrice}`;
        discountPercentage.classList.add('product-discount-percentage');

        productContainer.setAttribute('data-id', product.id);

        const price = document.createElement('h3');
        price.innerText = `$${product.price}`;
        price.classList.add('product-price');


        const rating = document.createElement('h3');
        rating.innerText = `Rating: ${product.rating}/5.00`;
        rating.classList.add('product-rating');

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
        productsContainer.appendChild(productContainer);
    }
}

export async function getProducts() {
    const API_GET_PRODUCTS_URL = `https://dummyjson.com/products?limit=${limitPagination}&skip=${skipPagination}&select=id,title,brand,category,description,price,stock,rating,discountPercentage,images`
    const response = await fetch(API_GET_PRODUCTS_URL);
    const productsJSON = await response.json();
    createProducts(productsJSON);
    products = products.concat(productsJSON.products);
    skipPagination += limitPagination;
}

let cartIds = [];
let total = 0;

export function shoppingCartCount() {
    const shoppingCartCount = document.querySelector('.shopping-cart-count');
    if (cartItems.children.length-1 === 0) {
        shoppingCartCount.style.display = 'none';
        return;
    }
    shoppingCartCount.innerText = cartItems.children.length-1;
    shoppingCartCount.style.display = 'flex';
}

export function addToCartPopUp() {
    const buttons = document.querySelectorAll('.product-button:not([data-event="true"])');
    const popUp = document.querySelector('.pop-up');
    buttons.forEach(button => {
        button.setAttribute('data-event', 'true');
        button.addEventListener('click', () => {
            popUp.style.display = 'flex';
            const id = button.parentElement.getAttribute('data-id');
            cartIds.push(id);
            if (cartIds.length > 0) {
                shoppingCartCount();
            }
            let counterId = 0;
            for (const cartId of cartIds) {
                if (cartId === id) {
                    counterId++;
                }
            }
            if (counterId > 1) {
                const item = cartItems.querySelector(`[data-id="${id}"]`);
                const itemCounter = item.querySelector('h3');
                itemCounter.innerText = `x${counterId}`;
            } else {
                const cartItem = document.createElement('div');
                cartItem.setAttribute('data-id', id);
                cartItem.classList.add('cart-item');
                const product = products[id - 1];
                const counter = document.createElement('h3')
                counter.innerText = 'x1'
                const title = document.createElement('h3');
                title.innerText = product.title;
                title.classList.add('cart-item-title');
                const image = document.createElement('img');
                image.setAttribute('src', product.images[0]);
                image.setAttribute('alt', product.title + "image");
                image.classList.add('cart-item-image');
                const price = document.createElement('h3');
                price.innerText = `$${product.price}`;
                price.classList.add('cart-item-price');
                const removeButton = document.createElement('button');
                removeButton.innerText = 'X';
                removeButton.classList.add('cart-item-remove');
                removeButton.addEventListener('click', () => {
                    let counterId = 0;
                    for (const cartId of cartIds) {
                        if (cartId === id) {
                            counterId++;
                        }
                    }
                    if (counterId > 1) {
                        const cartItems = document.querySelector('.cart-items');
                        const item = cartItems.querySelector(`[data-id="${id}"]`);
                        const itemCounter = item.querySelector('h3');
                        itemCounter.innerText = `x${counterId - 1}`;
                        addToTotal(total-products[id - 1].price);
                        const index = cartIds.indexOf(id);
                        cartIds.splice(index, 1);
                        removeFromCart(id).then(
                            () => {
                                shoppingCartCount();
                            });
                    } else {
                        const cartItems = document.querySelector('.cart-items');
                        const item = cartItems.querySelector(`[data-id="${id}"]`);
                        cartItems.removeChild(item);
                        addToTotal(total-products[id - 1].price);
                        const index = cartIds.indexOf(id);
                        cartIds.splice(index, 1);
                        deleteFromCart(id).then(
                            () => {
                                shoppingCartCount();
                            });
                    }
                });
                cartItem.appendChild(image);
                cartItem.appendChild(counter);
                cartItem.appendChild(title);
                cartItem.appendChild(price);
                cartItem.appendChild(removeButton);
                cartItems.appendChild(cartItem);

                addToCart(id).then(
                    () => {

                    }
                );
            }
            addToTotal(total+products[id - 1].price);
            button.innerText = 'Added to cart';
            setTimeout(() => {
                popUp.style.display = 'none';
                button.innerText = 'Add to cart';
            }, 2000);
        });
    });
}

function nextImage(image) {
    const parent = image.parentElement;
    const nextImage = image.nextElementSibling;
    if (nextImage) {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        nextImage.style.display = 'block';
        nextImage.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        parent.firstElementChild.style.display = 'block';
        parent.firstElementChild.style.animation = 'fadeIn 0.5s ease-in-out';
    }
}

function previousImage(image) {
    const parent = image.parentElement;
    const previousImage = image.previousElementSibling;
    if (previousImage) {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        previousImage.style.display = 'block';
        previousImage.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
        image.style.animation = 'fadeOut 0.3s ease-in-out';
        image.style.display = 'none';
        parent.lastElementChild.style.display = 'block';
        parent.lastElementChild.style.animation = 'fadeIn 0.5s ease-in-out';
    }
}

function calculateClickPosition(image, event) {
    const clickX = event.clientX - image.getBoundingClientRect().left;
    const containerWidth = image.clientWidth;
    const clickPercentage = (clickX / containerWidth) * 100;
    const threshold = 50;
    if (clickPercentage >= threshold) {
        nextImage(image);
    } else if (clickPercentage < threshold) {
        previousImage(image);
    }
}

export function nextImageEvent() {
    const images = document.querySelectorAll('.product-image:not([data-event="true"])');
    images.forEach(image => {
        image.setAttribute('data-event', 'true');
        image.addEventListener('click', (event) => {
            calculateClickPosition(image, event);
        });
    });
}

export function hoverItem() {
    const items = document.querySelectorAll('.products-item:not([data-event="true"])');

    const handleKeyDown = (event) => {
        const hoveredItem = document.querySelector('.hovered');
        const currentImage = hoveredItem.querySelector('.product-image[style*="display: block"]');
        if (event.key === 'ArrowRight') {
            nextImage(currentImage);
        }
        if (event.key === 'ArrowLeft') {
            previousImage(currentImage);
        }
    }

    const handleClickOnArrow = (event) => {
        const hoveredItem = document.querySelector('.hovered');
        const currentImage = hoveredItem.querySelector('.product-image[style*="display: block"]');
        if (event.target.classList.contains('arrow-right')) {
            nextImage(currentImage);
        }
        if (event.target.classList.contains('arrow-left')) {
            previousImage(currentImage);
        }
    }

    items.forEach(item => {
        item.setAttribute('data-event', 'true');
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.01)';
            item.classList.add('hovered');
            document.addEventListener('keydown', handleKeyDown);
            item.addEventListener('click', handleClickOnArrow);
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
            item.classList.remove('hovered');
            document.removeEventListener('keydown', handleKeyDown);
            item.removeEventListener('click', handleClickOnArrow);
        });
    });
}

export function hoverCart() {
    const cart = document.querySelector('.shopping-cart');
    const cartItems = cart.querySelector('.cart-items');
    cart.addEventListener('mouseover', () => {
        cartItems.style.display = 'flex';
    });
    cart.addEventListener('mouseout', () => {
        cartItems.style.display = 'none';
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
            addToCartPopUp();
            nextImageEvent();
            hoverItem();
        });
    }
}, {passive: true});

export async function addToCart(productID) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: productID,
                    quantity: 1
                }]
        })
    }).then(res => res.json())
}

export async function removeFromCart(productID) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: productID,
                    quantity: -1
                }]
        })
    })
        .then(res => res.json())
}

export async function deleteFromCart(productID) {
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}?products[]=${productID}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
}

export async function initCart() {
    const API_CART_GET = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${API_CART_ID}`;

    const cart = await fetch(API_CART_GET);
    const cartData = await cart.json();
    console.log(cartData);
    for (const product of cartData.products) {
        createItemInCart(product);
        cartIds.push(product.id);
    }
    shoppingCartCount();
    addToTotal(cartData.total);
}

function addToTotal(newTotal) {
    total = newTotal;
    const totalElement = document.querySelector('.cart-total');
    totalElement.innerText = `TOTAL: $${newTotal}`;
}
function createItemInCart(product) {
    const cartItem = document.createElement('div');
    cartItem.setAttribute('data-id', product.id);
    cartItem.classList.add('cart-item');

    const counter = document.createElement('h3')
    counter.innerText = `x${product.quantity}`;

    const title = document.createElement('h3');
    title.innerText = product.title;
    title.classList.add('cart-item-title');

    const image = document.createElement('img');
    image.setAttribute('src', product.images[0]);
    image.setAttribute('alt', product.title + "image");
    image.classList.add('cart-item-image');

    const price = document.createElement('h3');
    price.innerText = `$${product.price}`;
    price.classList.add('cart-item-price');

    const removeButton = document.createElement('button');
    removeButton.innerText = 'X';
    removeButton.classList.add('cart-item-remove');
    removeButton.addEventListener('click', () => {
        if (product.quantity > 1) {
            const item = cartItems.querySelector(`[data-id="${product.id}"]`);
            const itemCounter = item.querySelector('h3');
            itemCounter.innerText = `x${product.quantity - 1}`;
            removeFromCart(product.id).then(
                () => {
                    addToTotal(total-product.price);
                    shoppingCartCount();
                });
        } else {
            const item = cartItems.querySelector(`[data-id="${product.id}"]`);
            cartItems.removeChild(item);
            deleteFromCart(product.id).then(
                () => {
                    addToTotal(total-product.price);
                    shoppingCartCount();
                }
            );
        }
    });
    cartItem.appendChild(image);
    cartItem.appendChild(counter);
    cartItem.appendChild(title);
    cartItem.appendChild(price);
    cartItem.appendChild(removeButton);
    cartItems.appendChild(cartItem);
}