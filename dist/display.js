function addToCart(element){
    console.log(element.parentElement.id);
}

let lastID = 1000;
let allItems = [];

function addAnItem(itemData){
    const itemToAdd = document.createElement("div");
    itemToAdd.classList.add("shop-item");
    itemToAdd.id = itemData.id;

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
    fetch('https://dummyjson.com/products')
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