export async function init() {
    await loadShopProducts();
    setupAddToCartButtons();
}

async function loadShopProducts() {
    let productObjectsArray = (await getAllProductsJSON()).products;

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
    let productDiscount = productObject["discountPercentage"];
    let productPriceWithDiscount = productPrice * (100 - productDiscount) / 100;

    let productHTML = document.createElement('div');
    productHTML.setAttribute('class', "item-container");
    productHTML.setAttribute('data-id', productId);
    productHTML.innerHTML = `
\t\t\t\t<img class="item-thumbnail" src="${productThumbnail}" alt="placeholder image thumbnail"/>
\t\t\t\t<p class="item-title">${productTitle}</p>
\t\t\t\t<p class="item-description">${productDescription}</p>
\t\t\t\t<p class="item-rating">Rating: ${productRating}/5.00</p>
\t\t\t\t<div class="item-purchase-details">
\t\t\t\t\t<p class="item-price">Price: <s>$${productPrice}</s>   <span style="color: red">$${productPriceWithDiscount.toFixed(2)}</span></p>
\t\t\t\t\t<button class="add-to-cart-button">Add To Cart</button>
\t\t\t\t</div>
    `;

    return productHTML;
}

function getAllProductsJSON() {
    return fetch('https://dummyjson.com/products')
        .then(res => {return res.json();});
}

function setupAddToCartButtons()
{
    let addToCartButtons = document.getElementsByClassName("add-to-cart-button");


    for(const button of addToCartButtons)
    {
        button.addEventListener('click', function (event){
            button.textContent = "Added to cart";
            button.style.setProperty("background-color", "var(--button-pressed)");

            let buttonID = button.parentElement.parentElement.getAttribute('data-id');
            let buttonTitle = button.parentElement.parentElement.firstElementChild.nextElementSibling.innerText;
            let newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);
            document.getElementById('app').appendChild(newPopup);

            setTimeout(function (){
                button.textContent = "Add to cart";
                button.style.removeProperty("background-color");
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