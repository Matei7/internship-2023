export async function init() {
    await loadShopProducts();
    setupAddToCartButtons();
}

async function loadShopProducts() {
    const productObjectsArray = (await getAllProductsJSON()).products;
    const productsContainer = document.getElementById("products-list");

    for (const product of productObjectsArray) {
        const productHTML = getProductHTML(product);
        productsContainer.appendChild(productHTML);
    }
}

function getProductHTML(productObject)
{
    const productId = productObject["id"];
    const productTitle = productObject["title"];
    const productThumbnail = productObject["thumbnail"];
    const productDescription = productObject["description"];
    const productRating = productObject["rating"];
    const productPrice = productObject["price"];
    const productDiscount = productObject["discountPercentage"];
    const productPriceWithDiscount = productPrice * (100 - productDiscount) / 100;

    const productHTML = document.createElement('div');
    productHTML.setAttribute('class', "item-container");
    productHTML.setAttribute('data-id', productId);
    productHTML.innerHTML = `
        <img class="item-thumbnail" src="${productThumbnail}" alt="placeholder image thumbnail"/>
        <p class="item-title">${productTitle}</p>
        <p class="item-description">${productDescription}</p>
        <p class="item-rating">Rating: <div class="star-rating" style="--rating: ${productRating};"></div> ${productRating}/5.00</p>
        
        <div class="item-purchase-details">
          <p class="item-price">Price: <s>$${productPrice}</s>   <span style="color: red">$${productPriceWithDiscount.toFixed(2)}</span></p>
          <button class="add-to-cart-button">Add To Cart</button>
        </div>
    `;

    return productHTML;
}

function getAllProductsJSON() {
    return fetch('https://dummyjson.com/products')
        .then(res => {return res.json();});
}

function setupAddToCartButtons()
{
    const addToCartButtons = document.getElementsByClassName("add-to-cart-button");

    for(const button of addToCartButtons)
    {
        button.addEventListener('click', function (event){
            button.textContent = "Added to cart";
            button.style.setProperty("background-color", "var(--button-pressed)");

            const itemContainer = button.parentElement.parentElement;

            const buttonID = itemContainer.getAttribute('data-id');
            const buttonTitle = itemContainer.getElementsByTagName('p')[0].innerText;
            const newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);
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
    const newPopup = document.createElement('div');
    const popupContent = document.createElement('div');
    newPopup.appendChild(popupContent);
    newPopup.setAttribute('class', 'add-to-cart-popup');
    popupContent.innerText = text;

    return newPopup;
}