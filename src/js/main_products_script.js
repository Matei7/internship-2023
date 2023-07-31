import {addToCart, handleCartHoverEvent} from "./cart/cart_script.js";
import {getItems} from "./product_page/product_api.js";
import {getAllAvailableCategories, getAllItems, getProductsForCategory} from "./utils.js";
import {getNewCart} from "./cart/cart_api";
// const newCart=await getNewCart();
// console.log(newCart);

const allItems=(await getAllItems())['products'];
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

function showNotification(message){
    const notification=document.getElementById('notification');
    const notificationParent=document.getElementsByClassName('notification-container')[0];
    notificationParent.style.visibility='visible';
    notification.innerHTML=message;
    setTimeout(()=>{
        notificationParent.style.visibility='hidden';
    },5000);
}
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
let selectedCategory='';
export async function loadItems(loadMorePressed=false){

    const shopContainer=document.getElementsByClassName('shop-items')[0];

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
        const fitleredItems=allItems.filter((item)=>item.category===selectedCategory);
        const newItems=selectedCategory!='' ? fitleredItems : await getItems();
        console.log(newItems.length);
        await appendNodesAndAttachSelfPageListeners(newItems,shopContainer);
    }


    handleButtonEvents();
    await loadFilterSection();

}


export async function loadFilterSection(){
    const filterSectionWrapper=document.querySelector('.filter-section');
   filterSectionWrapper.innerHTML='<p>Categories:</p>';
    const categories=await getAllAvailableCategories();
    for (const category of categories){
        const categoryNode=document.createElement('button');
        categoryNode.setAttribute('title',category);
        categoryNode.classList.add('filter-btn');
        categoryNode.innerHTML=category;
        filterSectionWrapper.appendChild(categoryNode);
        categoryNode.addEventListener('click',async ()=>{
            await loadShopPageForCategory(category);
            selectedCategory=category;
        });
    }
}

export async function loadShopPageForCategory(category){

    // const items=(await getProductsForCategory(category))['products'];
    const items=allItems.filter((item)=>item.category===category);
    console.log(items);
    const shopContainer=document.getElementsByClassName('shop-items')[0];
    shopContainer.innerHTML='';
    await appendNodesAndAttachSelfPageListeners(items,shopContainer);
    handleButtonEvents();
}


