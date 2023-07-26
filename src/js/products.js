/*
<div class="product">
                    <div class="product-image">
                        <img src="https://static.footshop.com/781861-full_product/232942.jpg" alt="Adidas White">
                        <div>-15%</div>
                    </div>
                    <div class="product-info">
                        <div class="product-info-name">Adidas Nmd 1</div>
                        <div class="product-info-price">$ 100</div>
                    </div>
                </div>
*/

let products = [
    {
        "id": 1,
        "name": "Adidas Nmd 1",
        "price": 100,
        "image": "https://static.footshop.com/781861/232942.jpg",
        "discount": 15
    },
    {
        "id": 2,
        "name": "Adidas Nmd S1",
        "price": 150,
        "image": "https://static.footshop.com/780280-full_product/232959.jpg",
        "discount": 20
    },
    {
        "id": 3,
        "name": "Asics",
        "price": 70,
        "image": "https://static.footshop.com/844153-full_product/265171.jpg",
        "discount": 0
    },
    {
        "id": 4,
        "name": "Adidas Nmd S1",
        "price": 150,
        "image": "https://static.footshop.com/781876/232942.jpg",
        "discount": 20
    },
    {
        "id": 5,
        "name": "Adidas Nmd S1",
        "price": 150,
        "image": "https://static.footshop.com/780280-full_product/232959.jpg",
        "discount": 20
    },
]



export function loadProducts() {
    

    products.forEach((product) => {
        let productHTML = `
        <div class="product">
            <div class="product-image id${product.id}">
                <img src="${product.image}" alt="${product.name}">` + (product.discount > 0 ? `<div>-${product.discount}%</div>` : '') +
            `</div>
            <div class="product-info">
                <div class="product-info-name">${product.name}</div>
                <div class="product-info-price">$ ${product.price}</div>
            </div>
        </div>
        `;
        document.querySelector('.products-grid').insertAdjacentHTML('beforeend', productHTML);
    });
}