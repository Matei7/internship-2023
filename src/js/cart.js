function undone(){
    alert("The developer did not work on this functionality yet. However, if you really want to order this product, contact him at (0712) 345 678.")
}

function increaseQuantity(item){
    let minusButton = item.getElementsByClassName("cart-product-minus")[0];
    minusButton.style.opacity = "1";
    minusButton.style.cursor = "pointer";
    let quantityBox = item.getElementsByClassName("cart-product-quantity")[0];
    quantityBox.innerHTML = String(parseInt(quantityBox.innerHTML) + 1);
}

function decreaseQuantity(item){
    let quantityBox = item.getElementsByClassName("cart-product-quantity")[0];
    if(parseInt(quantityBox.innerHTML) === 1){
        let minusButton = item.getElementsByClassName("cart-product-minus")[0];
        minusButton.style.opacity = "0.5";
        minusButton.style.cursor = "default";
    }
    if(parseInt(quantityBox.innerHTML) === 0){
        return;
    }
    quantityBox.innerHTML = String(parseInt(quantityBox.innerHTML) - 1);
}