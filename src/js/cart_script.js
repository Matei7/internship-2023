import {getItemById} from "./product_api";

let cart = [];
export function handleCartHoverEvent(){
    const cartNode=document.getElementById('cart');
    const cartItemsNode=document.getElementById('cart-items');
    cartNode.addEventListener('mouseover',()=>{
        cartItemsNode.style.display='block';
    });
    cartNode.addEventListener('mouseout',()=>{
        cartItemsNode.style.display='none';
    });
}
function removeItemFromCart(productId){
    const cartItemNode=document.querySelector(`.cart-item[product_id="${productId}"]`);
    const cartItemCount=cartItemNode.querySelector('.cart-item-count');
    const count=parseInt(cartItemCount.innerText.split('x')[1]);
    if (count>1){
        updateCountForItem(productId,-1);
    }
    else{
        cartItemNode.remove();
    }
    for (let cartItem of cart){
        if (cartItem.id===productId){
            cart.splice(cart.indexOf(cartItem),1);
            break;
        }
    }
    updateCartCount();

}
function addNodeElementToCart(jsonItem){
    const cartContainer=document.getElementById('cart-items');
    const cartItemNode=document.createElement('div');
    cartItemNode.classList.add('cart-item');
    cartItemNode.setAttribute('product_id',jsonItem.id);
    cartItemNode.innerHTML=`
        <div class="cart-item-thumbnail-container">
            <img src="${jsonItem.thumbnail}" alt="item thumbnail" class="cart-item-thumbnail">
        </div>
        <div class="cart-item-info-container">
            <span class="cart-title-wrapper">
                <span class="cart-item-title">  ${jsonItem.title}</span>
                <span class="cart-item-count" product_id="${jsonItem.id}"> x1</span>
            </span>
            <p class="cart-item-price"><s>$${jsonItem.price}</s>  $${(jsonItem.price-jsonItem.price*(jsonItem.discountPercentage/100)).toFixed(2)}</p>
            <button class="remove-from-cart-btn" product_id="${jsonItem.id}">Remove</button>
        </div>
        
        `;
    cartItemNode.querySelector('.cart-item-thumbnail-container').addEventListener('click',(event)=>{
        const url=`product.html?id=${jsonItem.id}`;
        window.open(url,'_blank');
    });

    cartItemNode.querySelector('.remove-from-cart-btn').addEventListener('click',(event)=>{
        removeItemFromCart(jsonItem.id);
    });
    cartContainer.appendChild(cartItemNode);
}
function updateCountForItem(productId,value){
    const cartItemNode=document.querySelector(`.cart-item-count[product_id="${productId}"]`);
    const count=parseInt(cartItemNode.innerText.split('x')[1]);
    cartItemNode.innerText=` x${count+value}`;
}
export function addToCart(productId){

    getItemById(productId).then((jsonItem)=>{
        if (!cart.find(item=>item.id===jsonItem.id)){
            cart.push(jsonItem);
            addNodeElementToCart(jsonItem);
        }
        else{
            updateCountForItem(productId,1);
            cart.push(jsonItem);
        }
        updateCartCount();
        console.log(cart.length);
    });

}
function updateCartCount(){
    const cartCount=document.getElementById('cart-count');
    cartCount.innerText=String(cart.length);
}


