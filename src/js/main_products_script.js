import {addToCart, handleCartHoverEvent} from "./cart/cart_script.js";
import {getItems ,getProductsForCategory,getAllAvailableCategories, getAllItems} from "./product_page/product_api.js";
import {getNewCart} from "./cart/cart_api";

let selectedCategory='';
let allItems=[];

/**
 * Loads all items from the server and stores them in the local storage
 * @type {*[]}
 */
async function loadAllItems(){
    if (localStorage.getItem('allItems')===null){
        localStorage.setItem('allItems',JSON.stringify((await getAllItems())['products']));
    }
    allItems=JSON.parse(localStorage.getItem('allItems'));
}
/**
 * Returns a HTML node for a product item
 * @param jsonItem
 * @returns {HTMLDivElement}
 */
function getHtmlNodeItem(jsonItem){

    if (!jsonItem.currentImageIndex)
        jsonItem['currentImageIndex']=0;

    const itemNode=document.createElement('div');
    itemNode.classList.add('item');
    // const discountPrice=jsonItem.price-jsonItem.price*(jsonItem.discountPercentage/100);
    const discountPrice=jsonItem.price*(1-jsonItem.discountPercentage/100);
    itemNode.innerHTML=`

        
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
function showNotification(message){
    const notification=document.getElementById('notification');
    const notificationParent=document.getElementsByClassName('notification-container')[0];
    notificationParent.style.visibility='visible';
    notification.innerHTML=message;
    setTimeout(()=>{
        notificationParent.style.visibility='hidden';
    },5000);
}

/**
 * Attaches events to the buttons on the main page
 */
function handleButtonEvents(){
    const buttons=document.getElementsByClassName('add_to_cart_btn');
    for (const btn of buttons){
        if (btn.getAttribute('event-set')==='false') {
            btn.setAttribute('event-set','true');
            btn.addEventListener('click', (event) => {
                const productId = event.target.getAttribute("product-id");
                addToCart(productId);
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
    const loadMoreButton=document.querySelector('.load-more-btn');
    if (loadMoreButton.getAttribute('event-set')==='false'){
        loadMoreButton.setAttribute('event-set','true');
        loadMoreButton.addEventListener('click',async ()=>{
            await loadItems(true);
        });
    }


    document.querySelector('#cart').addEventListener('click',()=>{
        window.open('cart_page.html','_blank');
    });
}


/**
 * Appends nodes to the container and attaches listeners to the nodes so that they open the product page
 * @param items
 * @param container
 * @returns {Promise<void>}
 */
async function appendNodesAndAttachSelfPageListeners(items,container){
    for (const item of items) {
        const itemNode = getHtmlNodeItem(item);
        const thumbnailContainer = itemNode.getElementsByClassName('item_thumbnail_container')[0];
        thumbnailContainer.addEventListener('click', () => {
            const url = `product.html?id=${item.id}`;
            window.open(url, '_blank');
        });
        container.appendChild(itemNode);
    }
}

/**
 * Loads items from the server and appends them to the shop page
 * @param loadMorePressed
 * @returns {Promise<void>}
 */
export async function loadItems(loadMorePressed=false){

    const shopContainer=document.getElementsByClassName('shop-items')[0];

    loadAllItems();
    if (localStorage.getItem('loadedItems') === null){
        console.log('Loaded items');
        localStorage.setItem('loadedItems', JSON.stringify(await getItems()));
    }
    if (!loadMorePressed){
        let items=localStorage.getItem('loadedItems');
        items=JSON.parse(items);
        await appendNodesAndAttachSelfPageListeners(items,shopContainer);
    }
    else{

        // const newItems=selectedCategory!='' ? (await getProductsForCategory(selectedCategory))['products'] : await getItems();
        const filteredItems=allItems.filter((item)=>item.category===selectedCategory);
        const newItems=selectedCategory!='' ? filteredItems : await getItems();
        console.log(newItems.length);
        await appendNodesAndAttachSelfPageListeners(newItems,shopContainer);
    }


    handleButtonEvents();
    await loadFilterSection();

}


/**
 * Loads the filter section
 * @returns {Promise<void>}
 */
export async function loadFilterSection(){
    const filterSectionWrapper=document.querySelector('.filter-section');
   filterSectionWrapper.innerHTML='<p>Categories:</p>';
    let categories=[];
    if (localStorage.getItem('allCategories')===null){
        localStorage.setItem('allCategories',JSON.stringify(await getAllAvailableCategories()));
    }
    categories=JSON.parse(localStorage.getItem('allCategories'));

    for (const category of categories){
        const categoryButtonNode=document.createElement('button');
        categoryButtonNode.setAttribute('title',category);
        categoryButtonNode.classList.add('filter-btn');
        categoryButtonNode.innerHTML=category;
        filterSectionWrapper.appendChild(categoryButtonNode);
        categoryButtonNode.addEventListener('click',async ()=>{
            await loadShopPageForCategory(category);
            selectedCategory=category;
        });
    }
}

/**
 * Loads the shop page in order to list products for a specific category
 * @param category
 * @returns {Promise<void>}
 */
export async function loadShopPageForCategory(category){

    // const items=(await getProductsForCategory(category))['products'];
    const items=allItems.filter((item)=>item.category===category);
    console.log(items);
    const shopContainer=document.getElementsByClassName('shop-items')[0];
    shopContainer.innerHTML='';
    await appendNodesAndAttachSelfPageListeners(items,shopContainer);
    handleButtonEvents();
}


