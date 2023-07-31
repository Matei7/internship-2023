import {addToCart, handleCartHoverEvent} from "./cart_script.js";
import {getItems} from "./product_api.js";

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
    loadMoreButton.addEventListener('click',loadItems);

    document.querySelector('#cart').addEventListener('click',()=>{
        window.open('cart_page.html','_blank');
    });
}

export async function loadItems(){

    const shopContainer=document.getElementsByClassName('shop-items')[0];
    const items=await getItems();
    for (const item of items){
        const itemNode=getHtmlNodeItem(item);
        const thumbnailContainer=itemNode.getElementsByClassName('item_thumbnail_container')[0];
        thumbnailContainer.addEventListener('click',()=>{
            const url=`product.html?id=${item.id}`;
            window.open(url,'_blank');
        });
        shopContainer.appendChild(itemNode);

    }
    // for (let index=0; index<30; index++){
    //     shopContainer.appendChild(getHtmlNodeItem(sampleItem))
    // }

    handleButtonEvents();
}


