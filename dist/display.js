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

    const newItemTitle = document.createElement("div");
    newItemTitle.classList.add("item-title");
    newItemTitle.innerHTML=itemData.title;
    newItemTitle.setAttribute("onmouseover", "hoverItemOn(" + String(newId)+ ")");
    newItemTitle.setAttribute("onmouseout", "hoverItemOff(" + String(newId)+ ")");

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
    itemToHover.style.border = "3px solid #6667AB";
    itemToHover.style.cursor = "pointer";
    itemToHover.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
}

function hoverItemOff(theId){
    itemToHover = document.getElementById(theId.id);
    itemToHover.style.border = "3px solid transparent";
    itemToHover.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    itemToHover.style.cursor = "default";
}