// TODO: Add to cart logic
function updateCartCount(){
    const cartCount=document.getElementById('cart-count');
    const count=parseInt(cartCount.innerText);
    cartCount.innerText=String(count+1);
}
export function addToCart(productId){
    updateCartCount();

}