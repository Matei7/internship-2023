import {addToCart, handleCartHoverEvent} from "./cart_script.js";
import {getItems} from "./product_api.js";

function getHtmlNodeItem(jsonItem){

    if (!jsonItem.currentImageIndex)
        jsonItem['currentImageIndex']=0;

    const itemNode=document.createElement('div');
    itemNode.classList.add('item');
    const discountPrice=jsonItem.price-jsonItem.price*(jsonItem.discountPercentage/100);
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
        <button class="add_to_cart_btn" product-id="${jsonItem.id}">Add to cart</button> <!--"product id" may be without quotes-->
        
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
        btn.addEventListener('click',(event)=>{
            const productId=event.target.getAttribute("product-id");
            // console.log(event);
            addToCart(productId);

            showNotification("Added to cart");
            btn.innerHTML='Added to cart';
            btn.style.backgroundColor='#d0ffd3';
            btn.setAttribute('disabled','true');
            setTimeout(() => {
                btn.innerHTML = 'Add to cart';
                btn.style.backgroundColor = '#f5f5f5';
                btn.removeAttribute('disabled');
            }, 5000);
        });

    }
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
    handleCartHoverEvent();
}
const sampleItem=
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
}

