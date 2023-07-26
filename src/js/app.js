export async function init() {
    const response = await fetch('https://dummyjson.com/products');
    const products = await response.json();
    const productsContainer = document.querySelector('.products');
    console.log(products)
    for (const product of products.products) {
        const productContainer = document.createElement('div');
        productContainer.classList.add('products-item');
        // Creez item ul

        const image = document.createElement('img'); // Prima imagine momentan
        image.setAttribute('src', product.images[0]);
        image.setAttribute('alt', product.brand + "image");
        image.classList.add('product-image');

        const title = document.createElement('h2');
        title.innerText = product.title;
        title.classList.add('product-title');

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

        productContainer.appendChild(image);
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


