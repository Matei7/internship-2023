let cartID = "64ca3b5518e75";

function undone(){
    alert("The developer did not work on this functionality yet. However, if you really want to order this product, contact him at (0712) 345 678.")
}

function increaseQuantity(item){
    let minusButton = item.getElementsByClassName("cart-product-minus")[0];
    minusButton.style.opacity = "1";
    minusButton.style.cursor = "pointer";
    let quantityBox = item.getElementsByClassName("cart-product-quantity")[0];
    quantityBox.innerHTML = String(parseInt(quantityBox.innerHTML) + 1);
    computeTotal();
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
    computeTotal();
}

async function deleteItem(item){
    let itemID = String(item.id).slice(8);
    console.log(itemID);
    console.log(sendDelete(itemID));
    const itemToDelete = document.getElementById("cartitem" + itemID);
    itemToDelete.remove();
}

async function updateCart(){
    const items = Array.from(document.getElementsByClassName('cart-product'));

    items.forEach(item => {
        item.remove();
    });
    addItemsInCart();
}

async function sendDelete(itemID){
    return await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64ca3b5518e75?products[]=${itemID}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json()).then((json) => {
        return json;
    });
}

function displayItemInCart(itemData){
    const itemToAdd = document.createElement("div");
    itemToAdd.classList.add('cart-product');
    let newId = "cartitem" + String(itemData.id)
    itemToAdd.id = newId;
    // console.log(newId);

    if (updateDuplicate(newId)){
        return;
    }

    const newItemIMG = document.createElement("img");
    newItemIMG.src=itemData.thumbnail;
    newItemIMG.alt="Cart Product Picture";
    newItemIMG.classList.add("cart-product-pic");
    itemToAdd.append(newItemIMG);
    newItemIMG.setAttribute("onerror", "loadfallback(this)");

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
    if (itemData.quantity === 0){
        newItemMinus.style.opacity = "0.5";
        newItemMinus.style.cursor = "default";
    }

    const newItemQuantity = document.createElement("div");
    newItemQuantity.classList.add("cart-product-quantity");
    newItemQuantity.innerHTML = String(itemData.quantity);
    itemToAdd.append(newItemQuantity);

    const newItemPlus = document.createElement("div");
    newItemPlus.classList.add("cart-product-plus");
    newItemPlus.innerHTML = "+";
    newItemPlus.setAttribute("onclick", "increaseQuantity(this.parentElement)")
    itemToAdd.append(newItemPlus);

    const newItemPrice = document.createElement("div");
    newItemPrice.classList.add("cart-product-price");
    newItemPrice.innerHTML = "$"+String(parseInt(itemData.price));
    itemToAdd.append(newItemPrice);

    const newItemHeart = document.createElement("div");
    newItemHeart.classList.add("cart-product-heart");
    newItemHeart.innerHTML = "🖤";
    itemToAdd.append(newItemHeart);

    document.getElementsByClassName("cart-items")[0].append(itemToAdd);
}

function loadfallback(image){
    image.src="https://picsum.photos/200/300";
}

function updateDuplicate(itemID){
    let itemsListHTML = document.getElementsByClassName("cart-product");
    let itemsList = Array.prototype.slice.call(itemsListHTML)
    for (let i = 0; i < itemsList.length; i++){
        let currentItemID = String(itemsList[i].id);
        if (currentItemID === String(itemID)){
            let existingItem = document.getElementById(itemID);
            increaseQuantity(existingItem);
            return true;
        }
    }
    return false;
}

function computeTotal(){
    let totalMoney = 0;
    let totalQuantity = 0;
    let itemsListHTML = document.getElementsByClassName("cart-product");
    let itemsList = Array.prototype.slice.call(itemsListHTML)
    for (let i = 0; i < itemsList.length; i++){
        let currentMoney = parseInt((itemsList[i].querySelector(".cart-product-price").innerHTML).slice(1));
        let currentQuantity = parseInt(itemsList[i].querySelector(".cart-product-quantity").innerHTML);
        totalMoney += currentMoney * currentQuantity;
        totalQuantity += currentQuantity;
    }
    let totalItem = document.querySelector(".summary-total-value");
    totalItem.innerHTML = "$"+String(totalMoney);
    let priceItem = document.querySelector(".summary-price-value");
    priceItem.innerHTML = "$"+String(totalMoney);
    let itemsItem = document.querySelector(".summary-items-value");
    itemsItem.innerHTML = String(itemsList.length);
    let quantityItem = document.querySelector(".summary-quantity-value");
    quantityItem.innerHTML = String(totalQuantity);
}

//64ca3b5518e75

async function addItemsInCart(){
    return await fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64ca3b5518e75')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.products.length; i++){
                displayItemInCart(data.products[i]);
            }
            computeTotal();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

addItemsInCart();