async function addToCart(element){
    if (element.innerHTML === "🛒 Added!"){
        return;
    }
    addElementToCart(element.parentElement.id);
    element.innerHTML = "🛒 Added!";
    element.classList.remove("item-add-to-car");
    element.classList.add("item-added-to-cart");
    let popup = document.getElementById("cart-popup");
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
    setTimeout(() => {
        showCartAgain(element);
    }, 1000);
}

function showCartAgain(element){
    element.innerHTML = "🛒 ADD!";
    element.classList.remove("item-added-to-cart");
    element.classList.add("item-add-to-car");
    let popup = document.getElementById("cart-popup");
    popup.style.opacity = "1";
    let fadeEffect = setInterval(function () {
        if (popup.style.opacity > 0.4) {
            popup.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
            popup.style.visibility = "hidden";
        }
    }, 100);
}

async function addToCartExtern(){
    let previewPanel = document.getElementById("product-preview");

    let thisId = previewPanel.getAttribute("idshowing");
    let itemElement = document.getElementById(thisId);
    let buttonElement = document.getElementById("previewbtn");
    if (buttonElement.innerHTML === "🛒 Added!"){
        return;
    }
    addElementToCart(itemElement.id);
    buttonElement.innerHTML = "🛒 Added!";
    buttonElement.classList.remove("preview-add-to-cart");
    buttonElement.classList.add("preview-added-to-cart");
    let popup = document.getElementById("cart-popup");
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
    setTimeout(() => {
        showCartAgainExtern(buttonElement);
    }, 1000);

}

function showCartAgainExtern(element){
    element.innerHTML = "🛒 ADD!";
    element.classList.remove("preview-added-to-cart");
    element.classList.add("preview-add-to-cart");
    let popup = document.getElementById("cart-popup");
    popup.style.opacity = "1";
    let fadeEffect = setInterval(function () {
        if (popup.style.opacity > 0.4) {
            popup.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
            popup.style.visibility = "hidden";
        }
    }, 100);
}

let allItems = [];

function addAnItem(itemData){
    const itemToAdd = document.createElement("div");
    itemToAdd.classList.add("shop-item");
    let newId = "item" + String(itemData.id)
    itemToAdd.id = newId;

    const newItemCategory = document.createElement("div");
    newItemCategory.classList.add("item-category");
    newItemCategory.innerHTML=itemData.category;

    const newItemIMG = document.createElement("img");

    newItemIMG.src=itemData.thumbnail;
    newItemIMG.alt="Product for sale.";
    newItemIMG.classList.add("item-image");
    newItemIMG.setAttribute("onmouseover", "hoverItemOn(" + String(newId)+ ")");
    newItemIMG.setAttribute("onmouseout", "hoverItemOff(" + String(newId)+ ")");
    newItemIMG.setAttribute("onclick", "displayPreview(" + String(newId)+ ")");

    const newItemTitle = document.createElement("div");
    newItemTitle.classList.add("item-title");
    newItemTitle.innerHTML=itemData.title;

    const newItemPrice = document.createElement("div");
    newItemPrice.classList.add("item-price");
    newItemPrice.innerHTML="$"+itemData.price;

    const newItemCart = document.createElement("div");
    newItemCart.classList.add("item-add-to-cart");
    newItemCart.innerHTML="🛒 ADD";
    newItemCart.setAttribute("onclick", "addToCart(this)");

    itemToAdd.append(newItemCategory);
    itemToAdd.append(newItemIMG);
    itemToAdd.append(newItemTitle);
    itemToAdd.append(newItemPrice);
    itemToAdd.append(newItemCart);

    document.getElementById("list-of-products").append(itemToAdd);
}

function importItems() {
    fetch('https://dummyjson.com/products?limit=100')
        .then(response => response.json())
        .then(data => {
            allItems = data;
            displayItems(allItems);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayItems(items){
    for (let i=0; i<items.products.length; i++){
        let currentItem = items.products[i];
        addAnItem(currentItem);
    }
}

importItems();

function hoverItemOn(theId){
    let itemToHover = document.getElementById(theId.id);
    itemToHover.style.border = "3px solid #FFFFFF";
    itemToHover.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    let insidePic = itemToHover.getElementsByTagName('img')[0];
    insidePic.style.filter = "opacity(100%)";
    insidePic.style.cursor = "pointer";
}

function hoverItemOff(theId){
    let itemToHover = document.getElementById(theId.id);
    itemToHover.style.border = "3px solid transparent";
    itemToHover.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    let insidePic = itemToHover.getElementsByTagName('img')[0];
    insidePic.style.filter = "opacity(95%)";
}

function displayPreview(theId) {
    // let itemToHover = document.getElementById(theId.id);
    let previewPanel = document.getElementById("product-preview");
    let backgroundCover = document.getElementById("background-cover");
    // let headerTitle = document.getElementsByClassName("giga-header")[0];
    // headerTitle.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    previewPanel.style.visibility = "visible";
    backgroundCover.style.visibility = "visible";

    previewPanel.setAttribute("idshowing", String(theId.id));

    let previewTitle = document.getElementsByClassName("preview-title")[0];
    let previewDescription = document.getElementsByClassName("preview-description")[0];
    let previewPrice = document.getElementsByClassName("preview-price")[0];
    // let previewRating = document.getElementsByClassName("preview-rating")[0];
    let previewImage = document.getElementsByClassName("preview-image")[0];

    let itemTitle = theId.getElementsByTagName("div")[1].innerHTML;
    let itemPrice = theId.getElementsByTagName("div")[2].innerHTML;
    let itemImage = theId.getElementsByTagName("img")[0].src;

    previewTitle.innerHTML = itemTitle;
    previewPrice.innerHTML = itemPrice;
    // previewImage.src = itemImage;

    let backID = String(theId.id).slice(4);
    let myItem;
    let itemRating;
    fetch('https://dummyjson.com/product/' + String(backID))
        .then(response => response.json())
        .then(data => {
            myItem = data;
            previewDescription.innerHTML = myItem.description;
            itemRating = parseInt(myItem.rating);
            for (let i=1; i<=5; i++){
                let myStar = document.getElementById("star-"+String(i));
                if (itemRating >= parseInt(String(myStar.id).slice(5,6))){
                    myStar.style.color = "#f80";
                } else {
                    myStar.style.color = "#ddd";
                }
            }
            previewImage.src = myItem.images[0];
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function leftPic(){
    let picList = [];
    let previewPanel = document.getElementById("product-preview");
    let thisId = previewPanel.getAttribute("idshowing");
    thisId = thisId.slice(4);
    fetch('https://dummyjson.com/product/' + String(thisId))
        .then(response => response.json())
        .then(data => {
            myItem = data;
            picList = myItem.images;
            let previewImage = document.getElementsByClassName("preview-image")[0];
            for (i = 1; i < picList.length; i++){
                if(previewImage.src == picList[i]){
                    previewImage.src = picList[i-1];
                    return;
                }
            }
            if (previewImage.src == picList[0]){
                previewImage.src = picList[picList.length - 1];
            }
        })
}

function rightPic(){
    let picList = [];
    let previewPanel = document.getElementById("product-preview");
    let thisId = previewPanel.getAttribute("idshowing");
    thisId = thisId.slice(4);
    fetch('https://dummyjson.com/product/' + String(thisId))
        .then(response => response.json())
        .then(data => {
            myItem = data;
            picList = myItem.images;
            let previewImage = document.getElementsByClassName("preview-image")[0];
            for (i = 0; i < picList.length - 1; i++){
                if(previewImage.src == picList[i]){
                    previewImage.src = picList[i+1];
                    return;
                }
            }
            if (previewImage.src == picList[picList.length - 1]){
                previewImage.src = picList[0];
            }
        })
}

document.addEventListener("keydown", function(event){
    if (event.key === "ArrowLeft"){
        leftPic();
    }
    if (event.key === "ArrowRight"){
        rightPic();
    }
});

function closePreview(){
    let previewPanel = document.getElementById("product-preview");
    let backgroundCover = document.getElementById("background-cover");
    // let headerTitle = document.getElementsByClassName("giga-header")[0];
    // headerTitle.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    previewPanel.style.visibility = "hidden";
    backgroundCover.style.visibility = "hidden";

}

async function addElementToCart(elementID){
    let itemID = String(elementID).slice(4);

    return await fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64ca3b5518e75', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: itemID,
                    quantity: 1,
                },
            ]
        })
    })
        .then(res => res.json())
        .then(console.log);
}

async function setCartNumber(){
    let numberItems = 0;
    return await fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64ca3b5518e75')
        .then(response => response.json())
        .then(data => {
            numberItems = data.totalProducts;
            console.log(numberItems);
            let cartItem = document.getElementsByClassName("cart-in-title")[0];
            cartItem.innerHTML = "🛒" + String(numberItems);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

setCartNumber();