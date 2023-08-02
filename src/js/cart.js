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

function deleteItem(item){
    console.log(item);
}

function displayItemInCart(itemData){
    const itemToAdd = document.createElement("div");
    itemToAdd.classList.add('cart-product');
    let newId = "cartitem" + String(itemData.id)
    itemToAdd.id = newId;

    const newItemIMG = document.createElement("img");
    newItemIMG.src=itemData.thumbnail;
    newItemIMG.alt="Cart Product Picture";
    newItemIMG.classList.add("cart-product-pic");
    itemToAdd.append(newItemIMG);

    const newItemTitle = document.createElement("div");
    newItemTitle.classList.add("cart-product-title");
    newItemTitle.innerHTML = itemData.title;
    itemToAdd.append(newItemTitle);

    const newItemDelete = document.createElement("div");
    newItemDelete.classList.add("cart-product-delete");
    newItemDelete.innerHTML = "🗑";
    itemToAdd.append(newItemDelete);
    newItemDelete.setAttribute("onclick", "deleteItem(this.parentElement)")


    const newItemMinus = document.createElement("div");
    newItemMinus.classList.add("cart-product-minus");
    newItemMinus.innerHTML = "-";
    itemToAdd.append(newItemMinus);
    newItemMinus.setAttribute("onclick", "decreaseQuantity(this.parentElement)")

    const newItemQuantity = document.createElement("div");
    newItemQuantity.classList.add("cart-product-quantity");
    newItemQuantity.innerHTML = "0";
    itemToAdd.append(newItemQuantity);

    const newItemPlus = document.createElement("div");
    newItemPlus.classList.add("cart-product-plus");
    newItemPlus.innerHTML = "+";
    newItemPlus.setAttribute("onclick", "increaseQuantity(this.parentElement)")
    itemToAdd.append(newItemPlus);

    const newItemPrice = document.createElement("div");
    newItemPrice.classList.add("cart-product-price");
    newItemPrice.innerHTML = itemData.price;
    itemToAdd.append(newItemPrice);

    const newItemHeart = document.createElement("div");
    newItemHeart.classList.add("cart-product-heart");
    newItemHeart.innerHTML = "🖤";
    itemToAdd.append(newItemHeart);
}

function addItemsInCart(){
    console.log("hi");
    fetch('https://dummyjson.com/product/' + String(15))
        .then(response => response.json())
        .then(data => {
            displayItemInCart(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

addItemsInCart();