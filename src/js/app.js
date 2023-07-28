let selectedItem;
let numberOfItemsLoaded = 0;
const numberOfItemsPerPage = 3;
const cartID = require('../../cart_id.json').token;

const cartURL = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`;
const cartCounter = document.getElementById('cart-counter');


export async function init() {
    await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);
    setupLoadButton();

    await setupUI();
    setupCartUI();
    await loadCartUIContent();
}

async function setupNewItems() {
    await loadShopProducts(numberOfItemsLoaded, numberOfItemsPerPage);
    setupAddToCartButtons();

    numberOfItemsLoaded += 3;
}

async function loadShopProducts(numItemsAlreadyLoaded, numItemsPerPage) {
    const productObjectsArray = (await getProductsPaginatedJSON(numItemsAlreadyLoaded, numItemsPerPage)).products;
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

    let thumbnailsHTML = '';

    for(const imageURL of productObject["images"])
    {
        //TODO: avoid inline styling
        thumbnailsHTML += `<img class="item-thumbnail" src="${imageURL}" alt="thumbnail image" loading="lazy" style="display: none"/>\n`;
    }

    const productHTML = document.createElement('div');
    productHTML.setAttribute('class', "item-container");
    productHTML.setAttribute('data-id', productId);
    productHTML.innerHTML = `
        <div class="carousel-container">
            <div class="thumbnails-container">
                ${thumbnailsHTML}
            </div>
            <div class="nav-arrows">
                <button class="navigation-button"><</button>
                <button class="navigation-button">></button>
            </div>
        </div>
        <p class="item-title">${productTitle}</p>
        <p class="item-description">${productDescription}</p>
        <p class="item-rating">Rating: <div class="star-rating" style="--rating: ${productRating};"></div> ${productRating}/5.00</p>
        
        <div class="item-purchase-details">
          <p class="item-price">Price: <s>$${productPrice}</s>   <span style="color: red">$${productPriceWithDiscount.toFixed(2)}</span></p>
          <button class="add-to-cart-button">Add To Cart</button>
        </div>
    `;

    productHTML.addEventListener('click', (clickEvent) =>{
        if(selectedItem !== undefined)
            selectedItem.removeEventListener('keydown', keyboardSelectGalleryImage);
        selectedItem = clickEvent.currentTarget;
        addEventListener('keydown',keyboardSelectGalleryImage);
    });

    productHTML.querySelector('.thumbnails-container').lastElementChild.removeAttribute('style');

    let navButtons = productHTML.querySelectorAll('.nav-arrows button');

    navButtons[0].addEventListener('click', (clickEvent) =>
    {
        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 0);
    });

    navButtons[1].addEventListener('click', (clickEvent) =>
    {
        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 1);
    });

    return productHTML;
}

function getProductsPaginatedJSON(numberOfProductsSkipped, numberOfProductsToFetch)
{
    return fetch(`https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`)
        .then(res => {return res.json();});
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
        console.log(button.getAttribute('data-setup'));

        if(button.getAttribute('data-setup') == 'true')
        {
            continue;
        }

        button.setAttribute('data-setup', 'true');

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
            }, 4000);
        });

        button.addEventListener('click', function(clickEvent) {

            let itemHTML = button.parentElement.parentElement;

            let id = itemHTML.getAttribute('data-id');
            let thumbnail = itemHTML.querySelector('img').getAttribute('src');
            let title = itemHTML.querySelector('p[class="item-title"]').innerText;
            let price = itemHTML.querySelector('p[class="item-price"]').innerText.split(' ')[1];

            const addedToCartEvent = new CustomEvent("addedToCart", {
                detail: {
                    id: id,
                    thumbnail: thumbnail,
                    title: title,
                    price: price,
                    amount: 1
                }
            });

            fetch(cartURL, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    products:[{
                        id,
                        quantity: 1
                    }]
                })
            }).then((value) => value.json())
                .then(console.log);

            cartCounter.dispatchEvent(addedToCartEvent);

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

function selectGalleryImage(currentCarousel, direction)
{
    let enabledImage = currentCarousel.querySelector("img:not([style*='display: none'])");
    let nextImage;

    if(direction === 0)
    {
        nextImage = enabledImage.previousElementSibling;
        if(nextImage === null)
        {
            nextImage = currentCarousel.lastElementChild;
        }
    }
    else
    {
        nextImage = enabledImage.nextElementSibling;
        if(nextImage === null)
        {
            nextImage = currentCarousel.firstElementChild;
        }
    }

    enabledImage.style.setProperty('display', 'none');
    nextImage.style.setProperty('display', 'inline');
}

function keyboardSelectGalleryImage(keyEvent)
{
    if(keyEvent.keyCode === 37)
    {
        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 0);
    }

    if(keyEvent.keyCode === 39)
    {
        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 1);
    }
}

function setupCartUI()
{
    cartCounter.addEventListener('addedToCart', loadCartUIContent);

    const cartIcon = document.getElementById('cart-icon');
    const cartContents = document.getElementById('cart-contents');
    cartIcon.addEventListener('mouseover', ()=>{

        cartContents.style.setProperty('display', 'inline-block');
    });

    cartIcon.addEventListener('mouseout', ()=>{

        cartContents.style.removeProperty('display');
    });
}

function createCartHTMLForItem(item)
{
    let mainItemDiv = document.createElement('div');
    mainItemDiv.setAttribute('data-id', item["id"]);
    mainItemDiv.setAttribute('class', 'cart-item-container');

    let itemThumbnail = document.createElement('img');
    itemThumbnail.setAttribute('class', 'cart-item-thumbnail');
    itemThumbnail.setAttribute('src', item['thumbnail']);

    let itemTitle = document.createElement('p');
    itemTitle.setAttribute('class', 'cart-item-title');
    itemTitle.innerText = item['title'];

    let itemPrice = document.createElement('p');
    itemPrice.setAttribute('class', 'cart-item-price');
    itemPrice.innerText = `${item['price']}`;

    let itemAmount = document.createElement('p');
    itemAmount.setAttribute('class', 'cart-item-amount');
    itemAmount.innerText = `x${item['quantity']}`;

    mainItemDiv.appendChild(itemThumbnail);
    mainItemDiv.appendChild(itemTitle);
    mainItemDiv.appendChild(itemPrice);
    mainItemDiv.appendChild(itemAmount);

    return mainItemDiv;
}

function setupLoadButton(){
    const loadButton = document.getElementById('load-more-button');
    loadButton.addEventListener('click', async () => {
        await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);
    });
}


async function setupUI() {
    document.getElementById('load-checkout-button').addEventListener('click', () => {
        window.location = `checkout.html?cart-id=${cartID}`;
    });

    let numberOfElementsInCart = (await loadCartData(cartURL)).totalProducts;
    document.getElementById('cart-counter').innerText = numberOfElementsInCart;
}

async function loadCartUIContent(cartEvent) {
    let cartData = await loadCartData(cartURL);

    let currentCount = cartData.totalProducts;

    const cartContainer = document.getElementById('cart-contents');

    cartContainer.previousElementSibling.innerText = currentCount;

    cartContainer.innerHTML = "";

    for (const item of cartData.products) {
        let itemHTML = createCartHTMLForItem(item);
        cartContainer.appendChild(itemHTML);
    }
}

async function loadCartData(cartURL) {
    let cartData;

    let startTime = performance.now();

    await fetch(cartURL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(r => r.json()).then(response => cartData = response);

    let endTime = performance.now();
    let timeElapsed = endTime - startTime;

    console.log(`The fetch took ${timeElapsed / 1000} seconds to run.`);

    console.log(cartData);
    console.log("The data is in the house");

    return cartData;
}