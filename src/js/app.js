let selectedItem;
let numberOfItemsLoaded = 0;
const numberOfItemsPerPage = 4;
const cartID = require('../../cart_id.json').token;

const cartURL = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`;
const cartCounter = document.getElementById('cart-counter');
let productFilteringCriterium = "all";
let categorySelectionRadio;

/**
 * Initializes the state of the website.
 * @returns {Promise<void>}
 */
export async function init() {
    await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);
    setupLoadButton();
    await setupUI();
    setupCartUI();
    await loadCartUIContent();
    handleFilterCriteriaChange();
}

/**
 * Adds a new page of unfiltered items from the API, keeping track of how many have already been loaded.
 * @returns {Promise<void>}
 */
async function setupNewItems() {
    let addedItemsCount = await addShopProducts(numberOfItemsLoaded, numberOfItemsPerPage, productFilteringCriterium);
    setupAddToCartButtons();

    numberOfItemsLoaded += addedItemsCount;
}

/**
 * Retrieves the next page of items to be loaded on the website and adds them, while also handling caching to improve
 * performance.
 * @param numberOfItemsLoaded The number of items that have already been loaded onto the site.
 * @param numberOfItemsPerPage The number of items that make up a page.
 * @returns {Promise<number>}
 */
async function addShopProducts(numberOfItemsLoaded, numberOfItemsPerPage) {
    let sessionStorageData = sessionStorage.getItem('store-products');

    let alreadyStoredItems = (sessionStorageData !== null) ? JSON.parse(sessionStorageData): [];

    let itemsNotYetAdded = [];
    let skippedItemsCount = 0;
    if(alreadyStoredItems === [] || numberOfItemsLoaded + numberOfItemsPerPage > alreadyStoredItems.length) {
        let fetchResult = (await getProductsPaginatedJSON(numberOfItemsLoaded, numberOfItemsPerPage));

        fetchResult.products.forEach(x => alreadyStoredItems.push(x));
        itemsNotYetAdded = fetchResult.products;
        skippedItemsCount = fetchResult.products.length;
        sessionStorage.setItem('store-products', JSON.stringify(alreadyStoredItems));
    }
    else {
        for(let index = numberOfItemsLoaded; index < numberOfItemsLoaded + numberOfItemsPerPage; index++)
            {
                skippedItemsCount++;
                itemsNotYetAdded.push(alreadyStoredItems[index]);
            }
    }

    addItemsToPage(itemsNotYetAdded);

    document.getElementById('products-list-loader').classList.add('hidden-attribute');
    document.getElementById('load-more-button').classList.remove('hidden-attribute');
    return skippedItemsCount;
}

/**
 * Takes an arrays of items and puts them on the page as HTML elements.
 * @param itemsArray The array containing the items.
 */
function addItemsToPage(itemsArray)
{
    const productsContainer = document.getElementById("products-list");

    for (const product of itemsArray) {
        const productHTML = getProductHTML(product);
        productsContainer.appendChild(productHTML);
    }
}

/**
 * Takes an object with all the information necessary for an item, and generates the corresponding HTML code for it.
 * @param productObject The object the HTML will be generated for.
 * @returns {HTMLDivElement} A div element representing the item on the site.
 */
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

    thumbnailsHTML += `<img class="item-thumbnail" src="${productThumbnail}" alt="thumbnail image" loading="lazy"/>\n`;

    for(const imageURL of productObject["images"])
    {

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

    //productHTML.querySelector('.thumbnails-container').lastElementChild.removeAttribute('style');

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

/**
 * Retrieves the next page of items requested by the site from an API.
 * @param numberOfProductsSkipped The number of products that have already been processed from the API and can be ignored this time.
 * @param numberOfProductsToFetch The number of products that make up a page and need to be fetched.
 * @returns {Promise<any>} A promise that contains the json corresponding to the request for the items.
 */
async function getProductsPaginatedJSON(numberOfProductsSkipped, numberOfProductsToFetch) {
    return fetch(`https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`)
        .then(async (res) => {
            return await res.json();
        });
}

/**
 * Loads all the item categories that can appear.
 * @returns {Promise<any>} A promise that contains the json corresponding to the request for the categories.
 */
function getProductsCategories()
{
    return fetch('https://dummyjson.com/products/categories')
        .then(res => {return res.json();})
}

/**
 * Goes through all the items' "Add to Cart" buttons in the page that have not been set up and gives them the proper
 * functionality, after which it flags them as fully set up.
 */
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

/**
 * Creates a pop-up element with the given text.
 * @param text The text that will be shown in the pop-up.
 * @returns {HTMLDivElement}
 */
function createAddToCartPopup(text="The product has been added to your cart successfully!"){
    const newPopup = document.createElement('div');
    const popupContent = document.createElement('div');
    newPopup.appendChild(popupContent);
    newPopup.setAttribute('class', 'add-to-cart-popup');
    popupContent.innerText = text;

    return newPopup;
}

/**
 * Selects the next image to be shown from an item's image carousel.
 * @param currentCarousel The carousel in question.
 * @param direction Which way we are iterating through the images. It can take 2 values:
 * - 0: forward
 * - 1: backward
 */
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

/**
 * Reacts to a keyPress event on one of the loaded items. Goes to the next image in the image carousel. Detects the
 * direction the carousel is iterated in based on the keycode pressed.
 * Right Arrow Key - forward
 * Left Arrow Key - backward
 * @param keyEvent The key event handled.
 */
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

/**
 * Sets up everything to do with the shopping cart's UI.
 */
function setupCartUI()
{
    cartCounter.addEventListener('addedToCart', loadCartUIContent);

    const cartIcon = document.getElementById('cart-icon');
    const cartContents = document.getElementById('cart-contents');
    let cartDisplayTimer;

    cartIcon.addEventListener('mouseover', ()=>{
        clearTimeout(cartDisplayTimer);
        cartContents.style.setProperty('display', 'inline-block');
    });

    cartIcon.addEventListener('mouseout', ()=>{
        cartDisplayTimer = setTimeout(() => {
                cartContents.style.removeProperty('display');
        }, 300);
    });


    cartContents.addEventListener('mouseover', ()=>{
        clearTimeout(cartDisplayTimer);
        cartContents.style.setProperty('display', 'inline-block');
    });

    cartContents.addEventListener('mouseout', ()=>{
        cartDisplayTimer = setTimeout(() => {
            cartContents.style.removeProperty('display');
        }, 300);
    });

}

/**
 * Takes an object with all the information necessary for an item, and generates the corresponding HTML code to display
 * it in the shopping cart.
 * @param item The object the HTML will be generated for.
 * @returns {HTMLDivElement} A div element representing the item in the shopping cart panel.
 */
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
    itemPrice.innerText = `$${item['price']}`;

    const itemAmount = document.createElement('p');
    itemAmount.setAttribute('class', 'cart-item-amount');
    itemAmount.innerText = `x${item['quantity']}`;

    mainItemDiv.appendChild(itemThumbnail);
    mainItemDiv.appendChild(itemTitle);
    mainItemDiv.appendChild(itemPrice);
    mainItemDiv.appendChild(itemAmount);

    return mainItemDiv;
}

/**
 * Gives functionality to the "Load More" button that is used to load more item pages at the user's request.
 */
function setupLoadButton(){
    const loadButton = document.getElementById('load-more-button');
    loadButton.addEventListener('click', async () => {
        document.getElementById('products-list-loader').classList.remove('hidden-attribute');
        document.getElementById('load-more-button').classList.add('hidden-attribute');

        if(productFilteringCriterium === "all")
            await setupNewItems(numberOfItemsLoaded, numberOfItemsPerPage);
        else
            await setupNewItemsFiltered();
    });
}

/**
 * Sets up the site's UI in general.
 * @returns {Promise<void>}
 */
async function setupUI() {
    await setupProductCategoriesList();

    document.getElementById('load-checkout-button').addEventListener('click', () => {
        window.location = `checkout.html?cart-id=${cartID}`;
    });

    //let numberOfElementsInCart = (await loadCartData(cartURL, false)).totalQuantity;
    //document.getElementById('cart-counter').innerText = numberOfElementsInCart;
}

/**
 * Loads the items present in the user's shopping cart and puts them on the shopping cart panel.
 * @returns {Promise<void>}
 */
async function loadCartUIContent() {
    let cartData = await loadCartData(cartURL, true);

    let currentCount = cartData.totalQuantity;

    const cartContainer = document.getElementById('cart-contents');

    cartContainer.previousElementSibling.innerText = currentCount;

    cartContainer.innerHTML = "";

    for (const item of cartData.products) {
        let itemHTML = createCartHTMLForItem(item);
        cartContainer.appendChild(itemHTML);
    }
}

/**
 * Fetches the contents of the user's shopping cart from the API that stores it,
 * while using caching to improve performance.
 * @param cartURL The URL to be queried for the cart data.
 * @param fullRefresh A boolean value that specifies whether the cache should be invalidated and rebuilt.
 * @returns {Promise<any>} A promise containing the cart data requested by the user.
 */
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

    const stringObjData = JSON.stringify(cartData);

    sessionStorage.setItem("cart-products", stringObjData);
    return cartData;
}

/**
 * Fetches every possible item category from the API and puts it on a list on the site.
 * @returns {Promise<void>}
 */
async function setupProductCategoriesList() {
    const productCategoriesList = document.getElementsByClassName('product-categories')[0];

    const productCategories = (await getProductsCategories());
    productCategories.push('all');
    for(const category of productCategories)
    {
        const categoryHTML = getHTMLForCategory(category);
        productCategoriesList.appendChild(categoryHTML);
    }
}

/**
 * Takes a string representing the name of a category and generates the required HTML code for displaying it on the site.
 * @param category The category string.
 * @returns {HTMLLIElement} A list element corresponding to the category param.
 */
function getHTMLForCategory(category)
{
    const listItem = document.createElement('li');
    const checkboxInput = document.createElement('input');

    checkboxInput.setAttribute('value', category);
    checkboxInput.setAttribute('type', 'radio');
    checkboxInput.setAttribute('id', 'category-selection');
    checkboxInput.setAttribute('name', 'category-selection');
    const textNode = document.createTextNode(category);

    listItem.appendChild(checkboxInput);
    listItem.appendChild(textNode);


    return listItem;
}

/**
 *  Adds event listeners to every single item category radio button so that we can react to changes in the filtering
 *  criteria.
 */
function handleFilterCriteriaChange()
{
    const categorySelectionRadioList = document.getElementsByName('category-selection');
    categorySelectionRadioList.forEach(checkbox => checkbox.addEventListener('change', (event) =>{
        categorySelectionRadio = event.target;
        numberOfItemsLoaded = 0;

        const productsContainer = document.getElementById("products-list");
        productsContainer.innerHTML = "";
        setupNewItemsFiltered();
    }));
}

/**
 * Manages the addition of new items to the page with filters, as well as the other elements in the page that are involved.
 * @param event The event that might trigger the addition. Will be a change event from the category radio buttons, or
 * null, if the filtering criterium hasn't changed since the last call.
 * @returns {Promise<void>}
 */
async function setupNewItemsFiltered()
{
    productFilteringCriterium = categorySelectionRadio.value;

    let newlyAddedItemsCount = await loadShopProductsFiltered(numberOfItemsLoaded, numberOfItemsPerPage, productFilteringCriterium);
    numberOfItemsLoaded += newlyAddedItemsCount;
    setupAddToCartButtons();

    document.getElementById('products-list-loader').classList.add('hidden-attribute');
    document.getElementById('load-more-button').classList.remove('hidden-attribute');
}

/**
 * Handles the fetching of new items to the site. It only returns the elements that respect the selected filter.
 * @param numberOfItemsLoaded The number of items that have been processed already and can be skipped on this call.
 * @param numberOfItemsPerPage The number of items that make up a page.
 * @param filteredCategory The category of items that will be selected.
 * @returns {Promise<number|*>}
 */
async function loadShopProductsFiltered(numberOfItemsLoaded, numberOfItemsPerPage, filteredCategory) {
    let itemsNotYetAdded = [];
    let skippedItemsCount = 0;
    let fetchResult = (await getProductsPaginatedFilteredJSON(numberOfItemsLoaded, numberOfItemsPerPage, filteredCategory));

    itemsNotYetAdded = fetchResult.products;
    skippedItemsCount = fetchResult.newSkippedItemsCount;

    addItemsToPage(itemsNotYetAdded);
    return skippedItemsCount;
}

/**
 * Does the actual fetching of items from the API. Makes sure to only return a page of filtered items.
 * @param numberOfItemsToSkip The number of items that have been processed already and can be skipped on this call.
 * @param pageSize The number of items that make up a page.
 * @param filterCategory The category of items that will be selected.
 * @returns {Promise<{newSkippedItemsCount: number, products: *[]}>}
 */
async function getProductsPaginatedFilteredJSON(numberOfItemsToSkip, pageSize, filterCategory) {
    if(filterCategory === "all")
    {
        productFilteringCriterium = "";
        let newSkippedItemsCount = 0;
        await setupNewItems();
        return;
    }

    const newPage = [];
    let newSkippedItemsCount = 0;
    while (newPage.length < pageSize) {
        let unfilteredPage;
        unfilteredPage = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${numberOfItemsToSkip + newSkippedItemsCount}`)
            .then(async (res) => {
                    return await res.json();
                }
            )

        if (unfilteredPage.products.length === 0)
            return {products: newPage, newSkippedItemsCount};
        for (const item of unfilteredPage.products) {
            newSkippedItemsCount++;
            //console.log(item[])
            if (item["category"] === filterCategory)
                newPage.push(item);
            if (newPage.length === pageSize) {
                break;
            }
        }
    }

    return {products: newPage, newSkippedItemsCount};
}