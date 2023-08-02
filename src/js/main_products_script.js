import {addToCart, handleCartHoverEvent} from "./cart/cart_script.js";
import {getItems, getProductsForCategory, getAllAvailableCategories, getAllItems} from "./product_page/product_api.js";
import {getNewCart} from "./cart/cart_api";

let selectedCategory = 'fragrances';
let fetchedItems = [];
let loadedItemsOnPage = [];

let currentPageIndex = 0;
let currentFetchPageIndex = 0;
let itemsPerPage = 3;
let fetchCount = 9;
let api = `https://dummyjson.com/products/category/${selectedCategory}/?limit=${fetchCount}&skip=${currentPageIndex * fetchCount}`


/**
 * Returns a HTML node for a product item
 * @param jsonItem
 * @returns {HTMLDivElement}
 */
function getHtmlNodeItem(jsonItem) {

    if (!jsonItem.currentImageIndex)
        jsonItem['currentImageIndex'] = 0;

    const itemNode = document.createElement('div');
    itemNode.classList.add('item');
    // const discountPrice=jsonItem.price-jsonItem.price*(jsonItem.discountPercentage/100);
    const discountPrice = jsonItem.price * (1 - jsonItem.discountPercentage / 100);
    itemNode.innerHTML = `

        
       <div class="item_thumbnail_container" product-id="${jsonItem.id}">
          
           <img class="item_thumbnail" src="${jsonItem.thumbnail}" alt="${jsonItem.title}" loading="lazy">
       </div>

    
    <div class="item_info_container">
        <div class="item_main_info">
            <p class="item_title">${jsonItem.title}</p>
            <p class="item_price"><s>$${jsonItem.price}</s> $${discountPrice.toFixed(2)}</p>
        </div>
     <div class="item_secondary_info">
        <p class="item_rating">Rating: ${jsonItem.rating}/5</p>
        <button class="add_to_cart_btn" product-id="${jsonItem.id}" event-set="false">Add to cart</button> <!--"product id" may be without quotes-->
        
    </div>
    
    </div>
    `;

    return itemNode;
}

/**
 * Shows a notification for 5 seconds
 * @param message
 */
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationParent = document.getElementsByClassName('notification-container')[0];
    notificationParent.style.visibility = 'visible';
    notification.innerHTML = message;
    setTimeout(() => {
        notificationParent.style.visibility = 'hidden';
    }, 5000);
}

/**
 * Attaches events to the buttons on the main page
 */
function handleButtonEvents() {
    const buttons = document.getElementsByClassName('add_to_cart_btn');
    for (const btn of buttons) {
        if (btn.getAttribute('event-set') === 'false') {
            btn.setAttribute('event-set', 'true');
            btn.addEventListener('click', async (event) => {
                const productId = event.target.getAttribute("product-id");
                await addToCart(productId);
                showNotification("Added to cart");
                btn.innerHTML = 'Added to cart';
                btn.style.backgroundColor = '#d0ffd3';
                btn.setAttribute('disabled', 'true');
                setTimeout(() => {
                    btn.innerHTML = 'Add to cart';
                    btn.style.backgroundColor = '#f5f5f5';
                    btn.removeAttribute('disabled');
                }, 5000);
            });
        }
    }
    const loadMoreButton = document.querySelector('.load-more-btn');
    if (loadMoreButton.getAttribute('event-set') === 'false') {
        loadMoreButton.setAttribute('event-set', 'true');
        loadMoreButton.addEventListener('click', async () => {
            await loadItems(true);
        });
    }

    document.querySelector('#cart').addEventListener('click', () => {
        window.open('cart_page.html', '_blank');
    });
}


/**
 * Appends nodes to the container and attaches listeners to the nodes so that they open the product page
 * @param items
 * @param container
 * @returns {Promise<void>}
 */
async function appendNodesAndAttachSelfPageListeners(items, container) {
    for (const item of items) {

        const itemNode = getHtmlNodeItem(item);
        const thumbnailContainer = itemNode.getElementsByClassName('item_thumbnail_container')[0];
        thumbnailContainer.addEventListener('click', () => {
            const url = `product.html?id=${item.id}`;
            window.open(url, '_blank');
        });
        container.appendChild(itemNode);
        loadedItemsOnPage.push(item.id);
    }
}

/**
 * Loads items from the server and appends them to the shop page
 * @param loadMorePressed
 * @returns {Promise<void>}
 */

function getNextProductsForPage(){
    let itemsToAppend = [];
    for (let i = currentPageIndex*itemsPerPage; i < currentPageIndex*itemsPerPage+itemsPerPage; i++) {
        if (fetchedItems.length === 0)
            break;
        const item = fetchedItems.shift();
        if (!loadedItemsOnPage.includes(item.id))
            itemsToAppend.push(item);
    }
    return itemsToAppend;
}

export async function loadItems(loadMorePressed = false) {
    const shopContainer = document.getElementsByClassName('shop-items')[0];

    if (!localStorage.getItem('loadedItems')) {
        fetchedItems = await getItems(api);
        localStorage.setItem('loadedItems', JSON.stringify(fetchedItems));
    }

    if (!loadMorePressed) {
        let items = localStorage.getItem('loadedItems');
        fetchedItems = JSON.parse(items);
        items = getNextProductsForPage();
        currentPageIndex++;
        await appendNodesAndAttachSelfPageListeners(items, shopContainer);
    } else {

        if (fetchedItems.length === 0) {
            currentFetchPageIndex++;
            currentPageIndex=0;
            if (selectedCategory!=='all')
                api = `https://dummyjson.com/products/category/${selectedCategory}/?limit=${fetchCount}&skip=${currentFetchPageIndex * fetchCount}`;
            else api=`https://dummyjson.com/products/?limit=${fetchCount}&skip=${currentFetchPageIndex * fetchCount}`;

            fetchedItems = await getItems(api);
            console.log('load more pressed, fetchedItems length: ' + fetchedItems.length);
            if (fetchedItems.length === 0) {
                const loadMoreButton = document.querySelector('.load-more-btn');
                loadMoreButton.style.visibility = 'hidden';
                return;
            }

        }

        let itemsToAppend=getNextProductsForPage();
        await appendNodesAndAttachSelfPageListeners(itemsToAppend, shopContainer);


    }

    handleButtonEvents();
    await loadFilterSection();

}


/**
 * Loads the filter section
 * @returns {Promise<void>}
 */
export async function loadFilterSection() {
    const filterSectionWrapper = document.querySelector('.filter-section');
    filterSectionWrapper.innerHTML = '<p>Categories:</p>';
    let categories = [];
    if (!localStorage.getItem('allCategories')) {
        localStorage.setItem('allCategories', JSON.stringify(await getAllAvailableCategories()));
    }
    categories = JSON.parse(localStorage.getItem('allCategories'));

    const categoryButtonNode = document.createElement('button');
    categoryButtonNode.setAttribute('title', 'all');
    categoryButtonNode.classList.add('filter-btn');
    categoryButtonNode.innerHTML = 'all';
    filterSectionWrapper.appendChild(categoryButtonNode);
    categoryButtonNode.addEventListener('click', async () => {
        await loadShopPageForCategory('all');
    });

    for (const category of categories) {
        const categoryButtonNode = document.createElement('button');
        categoryButtonNode.setAttribute('title', category);
        categoryButtonNode.classList.add('filter-btn');
        categoryButtonNode.innerHTML = category;
        filterSectionWrapper.appendChild(categoryButtonNode);
        categoryButtonNode.addEventListener('click', async () => {
            await loadShopPageForCategory(category);
        });
    }


}

/**
 * Loads the shop page in order to list products for a specific category
 * @param category
 * @returns {Promise<void>}
 */
export async function loadShopPageForCategory(category) {

    selectedCategory = category;
    currentPageIndex = 0;
    currentFetchPageIndex= 0;
    console.log(fetchCount);
    if (category==='all'){
        api=`https://dummyjson.com/products/?limit=${fetchCount}&skip=${currentFetchPageIndex * fetchCount}`;
    }
    else{
        api = `https://dummyjson.com/products/category/${selectedCategory}/?limit=${fetchCount}&skip=${currentFetchPageIndex * fetchCount}`;
    }

    let items = await getItems(api);
    fetchedItems = items;

    const loadMoreButton = document.querySelector('.load-more-btn');
    loadMoreButton.style.visibility = 'visible';

    const shopContainer = document.getElementsByClassName('shop-items')[0];
    shopContainer.innerHTML = '';
    loadedItemsOnPage = [];

    items = getNextProductsForPage();
    await appendNodesAndAttachSelfPageListeners(items, shopContainer);
    handleButtonEvents();
}


