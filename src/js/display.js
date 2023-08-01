async function addToCart(element){
    console.log(element.parentElement.id);
    element.innerHTML = "🛒 Added!";
    element.classList.remove("item-add-to-car");
    element.classList.add("item-added-to-cart");
    let popup = document.getElementById("cart-popup");
    popup.style.visibility = "visible";
    popup.style.opacity = 1;
    setTimeout(() => {
        showCartAgain(element);
    }, 1000);
}

function addToCartExtern(element){
    thisId = element.id;
    console.log(document.getElementsByClassName("preview-title")[0].innerHTML);
    itemElement = document.getElementById(thisId);
    addToCart(itemElement);
}

function showCartAgain(element){
    element.innerHTML = "🛒 ADD!";
    element.classList.remove("item-added-to-cart");
    element.classList.add("item-add-to-car");
    let popup = document.getElementById("cart-popup");
    popup.style.opacity = 1;
    var fadeEffect = setInterval(function () {
        if (popup.style.opacity > 0.4) {
            popup.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
            popup.style.visibility = "hidden";
        }
    }, 100);
}

let lastID = 1000;
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
    let picURL = "https://picsum.photos/30";
    picURL += String(Math.floor(Math.random() * 9));
    picURL += "/40";
    picURL += String(Math.floor(Math.random() * 9));
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
    for (i=0; i<items.products.length; i++){
        let currentItem = items.products[i];
        addAnItem(currentItem);
    }
}

importItems();

function hoverItemOn(theId){
    itemToHover = document.getElementById(theId.id);
    itemToHover.style.border = "3px solid #FFFFFF";
    itemToHover.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    insidePic = itemToHover.getElementsByTagName('img')[0];
    insidePic.style.filter = "opacity(100%)";
    insidePic.style.cursor = "pointer";
}

function hoverItemOff(theId){
    itemToHover = document.getElementById(theId.id);
    itemToHover.style.border = "3px solid transparent";
    itemToHover.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    insidePic = itemToHover.getElementsByTagName('img')[0];
    insidePic.style.filter = "opacity(95%)";
}

function displayPreview(theId) {
    itemToHover = document.getElementById(theId.id);
    previewPanel = document.getElementById("product-preview");
    backgroundCover = document.getElementById("background-cover");
    previewPanel.style.visibility = "visible";
    backgroundCover.style.visibility = "visible";

    let previewTitle = document.getElementsByClassName("preview-title")[0];
    let previewDescription = document.getElementsByClassName("preview-description")[0];
    let previewPrice = document.getElementsByClassName("preview-price")[0];
    let previewRating = document.getElementsByClassName("preview-rating")[0];
    let previewImage = document.getElementsByClassName("preview-image")[0];

    let itemTitle = theId.getElementsByTagName("div")[1].innerHTML;
    let itemPrice = theId.getElementsByTagName("div")[2].innerHTML;
    let itemImage = theId.getElementsByTagName("img")[0].src;

    previewTitle.innerHTML = itemTitle;
    previewPrice.innerHTML = itemPrice;
    previewImage.src = itemImage;

    let backID = String(theId.id).slice(4);
    let myItem;
    let itemRating;
    fetch('https://dummyjson.com/product/' + String(backID))
        .then(response => response.json())
        .then(data => {
            myItem = data;
            previewDescription.innerHTML = myItem.description;
            itemRating = parseInt(myItem.rating);
            for (i=1; i<=5; i++){
                let myStar = document.getElementById("star-"+String(i));
                if (itemRating >= parseInt(String(myStar.id).slice(5,6))){
                    myStar.style.color = "#f80";
                } else {
                    myStar.style.color = "#ddd";
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}