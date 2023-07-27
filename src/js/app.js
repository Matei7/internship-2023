let products = [];

export async function init() {
    const response = await fetch('https://dummyjson.com/products');
    const productsJSON = await response.json();
    const productsContainer = document.querySelector('.products');
    products = productsJSON.products;
    console.log(productsJSON)
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

let cartIds = [];
let total=0;

function shoppingCartCount() {
    const shoppingCartCount = document.querySelector('.shopping-cart-count');
    shoppingCartCount.innerText = cartIds.length;
    shoppingCartCount.style.display = 'flex';
}
export function addToCartPopUp() {
    const buttons = document.querySelectorAll('.product-button');
    const popUp = document.querySelector('.pop-up');
    buttons.forEach(button => {
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
                const cartItems = document.querySelector('.cart-items');

                const item = cartItems.querySelector(`[data-id="${id}"]`);

                const itemCounter = item.querySelector('h3');
                itemCounter.innerText = `x${counterId}`;
            } else {
                const cartItems = document.querySelector('.cart-items');
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
                        total-=products[id-1].price;
                        const cartTotal = document.querySelector('h3');
                        cartTotal.innerText = `Total: $${total}`;
                        const index = cartIds.indexOf(id);
                        cartIds.splice(index, 1);
                        shoppingCartCount();
                    } else {
                        const cartItems = document.querySelector('.cart-items');
                        const item = cartItems.querySelector(`[data-id="${id}"]`);
                        cartItems.removeChild(item);
                        total-=products[id-1].price;
                        const cartTotal = document.querySelector('h3');
                        cartTotal.innerText = `Total: $${total}`;
                        const index = cartIds.indexOf(id);
                        cartIds.splice(index, 1);
                        shoppingCartCount();
                    }

                });

                cartItem.appendChild(image);
                cartItem.appendChild(counter);
                cartItem.appendChild(title);
                cartItem.appendChild(price);
                cartItem.appendChild(removeButton);
                cartItems.appendChild(cartItem);
            }
            total+=products[id-1].price;
            const cartTotal = document.querySelector('h3');
            cartTotal.innerText = `Total: $${total}`;
            const cartItems = document.querySelector('.cart-items');
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
    const images = document.querySelectorAll('.product-image');
    images.forEach(image => {
        image.addEventListener('click', (event) => {
            calculateClickPosition(image, event);
        });
    });
}

export function hoverItem() {
    const items = document.querySelectorAll('.products-item');

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
