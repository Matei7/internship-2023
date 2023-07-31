let selectedItem;
let numberOfItemsLoaded = 0;
const numberOfItemsPerPage = 3;
const cartID = require('../../cart_id.json').token;

const cartURL = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`;
const cartCounter = document.getElementById('cart-counter');
let productFilteringCriterium = "";



export async function init() {
    await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);
    setupLoadButton();
    await setupUI();
    setupCartUI();
    await loadCartUIContent();
    //handleFilterCriteriaChange();
}

async function setupNewItems() {
    await loadShopProducts(numberOfItemsLoaded, numberOfItemsPerPage);
    setupAddToCartButtons();

    numberOfItemsLoaded += 3;
}

async function loadShopProducts(numberOfItemsLoaded, numberOfItemsPerPage) {
    let sessionStorageData = sessionStorage.getItem('store-products');
    let alreadyStoredItems = sessionStorageData !== null ? JSON.parse(sessionStorageData): [];

    let productObjectsArray = [];
    if(alreadyStoredItems === [] || numberOfItemsLoaded + numberOfItemsPerPage > alreadyStoredItems.length) {
        console.log((await getProductsPaginatedJSON(numberOfItemsLoaded, numberOfItemsPerPage)));
        const fetchResult = (await getProductsPaginatedJSON(numberOfItemsLoaded, numberOfItemsPerPage));
        productObjectsArray.forEach(x => {alreadyStoredItems.push(x);});
        sessionStorage.setItem('store-products', JSON.stringify(alreadyStoredItems));
    }
    else{
        for(let index = numberOfItemsLoaded; index < numberOfItemsLoaded + numberOfItemsPerPage; index++)
        {
            productObjectsArray.push(alreadyStoredItems[index]);
        }
    }

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

async function getProductsPaginatedJSON(numberOfProductsSkipped, numberOfProductsToFetch, filterCategory = "") {
    //const greaterBatch = [];

    //while(greaterBatch.length < numberOfProductsToFetch) {
        //let newBatch = [];
        return fetch(`https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`)
            .then(res => {
                return res.json();
            });
        /*console.log(newBatch);
        for(const item of newBatch)
        {
            //console.log(item[])
            if(item["category"] === filterCategory || filterCategory === "")
                greaterBatch.push(item);
        }
        numberOfProductsSkipped += numberOfProductsToFetch;
    }
    console.log(numberOfProductsSkipped);
    return {products: greaterBatch, numberOfProductsSkipped};*/
}

function getProductsCategories()
{
    return fetch('https://dummyjson.com/products/categories')
        .then(res => {return res.json();})
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
        if(button.getAttribute('data-setup') == 'true')
        {
            continue;
        }

        button.setAttribute('data-setup', 'true');

        button.addEventListener('click', function (event){
            button.textContent = "Added to cart";
            button.style.setProperty("background-color", "var(--button-pressed)");
            //button.disabled = true;

            const itemContainer = button.parentElement.parentElement;

            const buttonID = itemContainer.getAttribute('data-id');
            const buttonTitle = itemContainer.getElementsByTagName('p')[0].innerText;
            const newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);
            document.getElementById('app').appendChild(newPopup);

            setTimeout(function (){
                button.textContent = "Add to cart";
                button.style.removeProperty("background-color");
                button.disabled = false;
                newPopup.remove();
            }, 4000);
        });

        button.addEventListener('click', async function (clickEvent) {
            const itemHTML = button.parentElement.parentElement;

            const id = itemHTML.getAttribute('data-id');
            const thumbnail = itemHTML.querySelector('img').getAttribute('src');
            const title = itemHTML.querySelector('p[class="item-title"]').innerText;
            const price = itemHTML.querySelector('p[class="item-price"]').innerText.split(' ')[1];

            const addedToCartEvent = new CustomEvent("addedToCart", {
                detail: {
                    id: id,
                    thumbnail: thumbnail,
                    title: title,
                    price: price,
                    amount: 1
                }
            });

            await fetch(cartURL, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    products: [{
                        id,
                        quantity: 1
                    }]
                })
            }).then((value) => value.json())
                .then(() => cartCounter.dispatchEvent(addedToCartEvent));
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
    const mainItemDiv = document.createElement('div');
    mainItemDiv.setAttribute('data-id', item["id"]);
    mainItemDiv.setAttribute('class', 'cart-item-container');

    const itemThumbnail = document.createElement('img');
    itemThumbnail.setAttribute('class', 'cart-item-thumbnail');
    itemThumbnail.setAttribute('src', item['thumbnail']);

    const itemTitle = document.createElement('p');
    itemTitle.setAttribute('class', 'cart-item-title');
    itemTitle.innerText = item['title'];

    const itemPrice = document.createElement('p');
    itemPrice.setAttribute('class', 'cart-item-price');
    itemPrice.innerText = `${item['price']}`;

    const itemAmount = document.createElement('p');
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
    await setupProductCategoriesList();

    document.getElementById('load-checkout-button').addEventListener('click', () => {
        window.location = `checkout.html?cart-id=${cartID}`;
    });

    let numberOfElementsInCart = (await loadCartData(cartURL, false)).totalProducts;
    document.getElementById('cart-counter').innerText = numberOfElementsInCart;
}

async function loadCartUIContent(cartEvent) {
    let cartData = await loadCartData(cartURL, true);

    let currentCount = cartData.totalProducts;

    const cartContainer = document.getElementById('cart-contents');

    cartContainer.previousElementSibling.innerText = currentCount;

    cartContainer.innerHTML = "";

    for (const item of cartData.products) {
        let itemHTML = createCartHTMLForItem(item);
        cartContainer.appendChild(itemHTML);
    }
}

async function loadCartData(cartURL, fullRefresh = false) {
    let cartStringData = sessionStorage.getItem("cart-products");

    let cartData = JSON.parse(cartStringData);
    if(cartData !== null && fullRefresh === false)
    {
        return cartData;
    }

    let startTime = performance.now();

    await fetch(cartURL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(r => r.json()).then(response => cartData = response);

    let endTime = performance.now();
    let timeElapsed = endTime - startTime;

    console.log(`The fetch took ${timeElapsed / 1000} seconds to run.`);



    const stringObjData = JSON.stringify(cartData);

    sessionStorage.setItem("cart-products", stringObjData);
    return cartData;
}

async function setupProductCategoriesList() {
    const productCategoriesList = document.getElementsByClassName('product-categories')[0];

    const productCategories = (await getProductsCategories());

    for(const category of productCategories)
    {
        const categoryHTML = getHTMLForCategory(category);
        productCategoriesList.appendChild(categoryHTML);
    }
}

function getHTMLForCategory(category)
{
    const listItem = document.createElement('li');
    const checkboxInput = document.createElement('input');

    checkboxInput.setAttribute('type', 'radio');
    checkboxInput.setAttribute('id', 'category-selection');
    checkboxInput.setAttribute('name', 'category-selection');
    const textNode = document.createTextNode(category);

    listItem.appendChild(checkboxInput);
    listItem.appendChild(textNode);


    return listItem;
}

function handleFilterCriteriaChange()
{
    const categorySelectionRadio = document.getElementById('category-selection');
    categorySelectionRadio.addEventListener('change', async (event) => {
        sessionStorage.clear();
        productFilteringCriterium = categorySelectionRadio.value;
        console.log(productFilteringCriterium);

        const productsContainer = document.getElementById("products-list");
        console.log(productsContainer);
        productsContainer.innerHTML = "";

        await loadShopProducts(numberOfItemsLoaded, numberOfItemsPerPage, productFilteringCriterium);
        setupAddToCartButtons();
    });
}

