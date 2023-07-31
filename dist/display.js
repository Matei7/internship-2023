function addToCart(element){
    console.log(element.parentElement.id);
}

let lastID = 1000;

function addAnItem(){
    const itemToAdd = document.createElement("div");
    itemToAdd.classList.add("shop-item");
    itemToAdd.id = lastID;
    lastID++;

    const newItemCategory = document.createElement("div");
    newItemCategory.classList.add("item-category");
    newItemCategory.innerHTML="##CATEGORY##";

    const newItemIMG = document.createElement("img");
    let picURL = "https://picsum.photos/30";
    picURL += String(Math.floor(Math.random() * 9));
    picURL += "/40";
    picURL += String(Math.floor(Math.random() * 9));
    newItemIMG.src=picURL;
    newItemIMG.alt="Product for sale.";
    newItemIMG.classList.add("item-image");

    const newItemTitle = document.createElement("div");
    newItemTitle.classList.add("item-title");
    newItemTitle.innerHTML="##TITLE##";

    const newItemPrice = document.createElement("div");
    newItemPrice.classList.add("item-price");
    newItemPrice.innerHTML="##PRICE##";

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

function addItems(howMany){
    for(i = 0; i < howMany; i++){
        addAnItem();
    }
}

addItems(20);