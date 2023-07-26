export async function init() {
    await loadShopProducts();
    setupAddToCartButtons();

}

async function loadShopProducts() {
    let productObjectsArray = (await getAllProductsJSON()).products;

    console.log(productObjectsArray);
    let productsContainer = document.getElementById("products-list");

    for (const product of productObjectsArray) {
        let productHTML = getProductHTML(product);
        productsContainer.appendChild(productHTML);
    }
}

function getProductHTML(productObject)
{
    let productId = productObject["id"];
    let productTitle = productObject["title"];
    let productThumbnail = productObject["thumbnail"];
    let productDescription = productObject["description"];
    let productRating = productObject["rating"];
    let productPrice = productObject["price"];

    let productHTML = document.createElement('div');
    productHTML.setAttribute('class', "item-container");
    productHTML.setAttribute('data-id', productId);
    productHTML.innerHTML = `
\t\t\t\t<p class="item-title">${productTitle}</p>
\t\t\t\t<img class="item-thumbnail" src="${productThumbnail}" alt="placeholder image thumbnail"/>
\t\t\t\t<p class="item-description">${productDescription}</p>
\t\t\t\t<p class="item-rating">${productRating}</p>
\t\t\t\t<div class="item-purchase-details">
\t\t\t\t\t<p class="item-price">${productPrice}</p>
\t\t\t\t\t<button class="add-to-cart-button">Add To Cart</button>
\t\t\t\t</div>
    `;

    return productHTML;
}

async function getAllProductsJSON() {
    return fetch('https://dummyjson.com/products')
        .then(res => {return res.json();});

    /*return `
    [
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
        },
    ]
    `*/
}

function setupAddToCartButtons()
{
    let addToCartButtons = document.getElementsByClassName("add-to-cart-button");

    console.log(addToCartButtons.length);

    for(const button of addToCartButtons)
    {
        button.addEventListener('click', function (event){
            button.textContent = "Added to cart";
            button.style.setProperty("background-color", "var(--green1)");

            let newPopup = createAddToCartPopup();
            document.getElementById('app').appendChild(newPopup);

            setTimeout(function (){
                button.textContent = "Add to cart";
                button.style.setProperty("background-color", "var(--yellow1)");
                newPopup.remove();
            }, 7000);
        });
    }
}

function createAddToCartPopup(text="The product has been added to your cart successfully!"){
    let newPopup = document.createElement('div');
    let popupContent = document.createElement('div');
    newPopup.appendChild(popupContent);
    newPopup.setAttribute('class', 'add-to-cart-popup');
    popupContent.innerText = text;

    return newPopup;
}