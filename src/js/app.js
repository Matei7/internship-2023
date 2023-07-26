export async function init() {
    const response = await fetch('https://dummyjson.com/products');
    const products = await response.json();
    const productsContainer = document.querySelector('.products');
    console.log(products)
    for (const product of products.products) {
        const productContainer = document.createElement('div');
        productContainer.classList.add('products-item');
        // Creez item ul

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

export function addToCartPopUp() {
    const buttons = document.querySelectorAll('.product-button');
    const popUp = document.querySelector('.pop-up');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            popUp.style.display = 'flex';
            button.innerText = 'Added to cart';
            setTimeout(() => {
                popUp.style.display = 'none';
                button.innerText = 'Add to cart';
            }, 5000);
        });
    });
}

export function nextImage() {
    const images = document.querySelectorAll('.product-image');
    images.forEach(image => {
        image.addEventListener('click', () => {
            const clickX = event.clientX - image.getBoundingClientRect().left;

            const containerWidth = image.clientWidth;

            const clickPercentage = (clickX / containerWidth) * 100;

            console.log(clickPercentage, clickX, containerWidth);

            const threshold= 50;


            if (clickPercentage >= threshold) {
                const nextImage = image.nextElementSibling;
                if (nextImage) {
                    image.style.animation = 'fadeOut 0.3s ease-in-out';
                    image.style.display = 'none';
                    nextImage.style.display = 'block';
                    nextImage.style.animation = 'fadeIn 0.5s ease-in-out';
                }
                console.log("Clicked on the right side.");
            } else {
                const previousImage = image.previousElementSibling;
                if (previousImage) {
                    image.style.animation = 'fadeOut 0.3s ease-in-out';
                    image.style.display = 'none';
                    previousImage.style.display = 'block';
                    previousImage.style.animation = 'fadeIn 0.5s ease-in-out';
                }
                console.log("Clicked on the left side.");
            }

        });
    });
}

