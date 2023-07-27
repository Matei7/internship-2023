let selectedItem;
const cartCounter = document.getElementById('cart-counter');
export async function init() {
    await loadShopProducts();
    setupAddToCartButtons();
    setupCartUI();
}

async function loadShopProducts() {
    const productObjectsArray = (await getAllProductsJSON()).products;
    const productsContainer = document.getElementById("products-list");

    for (const product of productObjectsArray) {
        const productHTML = getProductHTML(product);
        productsContainer.appendChild(productHTML);
    }
}

function getProductHTML(productObject)
{
    const productId = productObject["id"];
    const productTitle = productObject["title"];
    const productThumbnail = productObject["thumbnail"];
    const productDescription = productObject["description"];
    const productRating = productObject["rating"];
    const productPrice = productObject["price"];
    const productDiscount = productObject["discountPercentage"];
    const productPriceWithDiscount = productPrice * (100 - productDiscount) / 100;

    let thumbnailsHTML = '';

    for(const imageURL of productObject["images"])
    {
        //TODO: avoid inline styling
        thumbnailsHTML += `<img class="item-thumbnail" src="${imageURL}" alt="thumbnail image" loading="lazy" style="display: none"/>\n`;
    }

    const productHTML = document.createElement('div');
    productHTML.setAttribute('class', "item-container");
    productHTML.setAttribute('data-id', productId);
    productHTML.innerHTML = `
        <div class="carousel-container">
            <div class="thumbnails-container">
                ${thumbnailsHTML}
            </div>
            <div class="nav-arrows">
                <button class="navigation-button"><</button>
                <button class="navigation-button">></button>
            </div>
        </div>
        <p class="item-title">${productTitle}</p>
        <p class="item-description">${productDescription}</p>
        <p class="item-rating">Rating: <div class="star-rating" style="--rating: ${productRating};"></div> ${productRating}/5.00</p>
        
        <div class="item-purchase-details">
          <p class="item-price">Price: <s>$${productPrice}</s>   <span style="color: red">$${productPriceWithDiscount.toFixed(2)}</span></p>
          <button class="add-to-cart-button">Add To Cart</button>
        </div>
    `;

    productHTML.addEventListener('click', (clickEvent) =>{
        if(selectedItem !== undefined)
            selectedItem.removeEventListener('keydown', keyboardSelectGalleryImage);
        selectedItem = clickEvent.currentTarget;
        addEventListener('keydown',keyboardSelectGalleryImage);
    });

    productHTML.querySelector('.thumbnails-container').lastElementChild.removeAttribute('style');

    let navButtons = productHTML.querySelectorAll('.nav-arrows button');

    navButtons[0].addEventListener('click', (clickEvent) =>
    {
        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 0);
    });

    navButtons[1].addEventListener('click', (clickEvent) =>
    {
        selectGalleryImage(clickEvent.target.parentElement.previousElementSibling, 1);
    });

    return productHTML;
}

function getAllProductsJSON() {
    return fetch('https://dummyjson.com/products')
        .then(res => {return res.json();});
}

function setupAddToCartButtons()
{
    const addToCartButtons = document.getElementsByClassName("add-to-cart-button");

    for(const button of addToCartButtons)
    {
        button.addEventListener('click', function (event){
            button.textContent = "Added to cart";
            button.style.setProperty("background-color", "var(--button-pressed)");

            const itemContainer = button.parentElement.parentElement;

            const buttonID = itemContainer.getAttribute('data-id');
            const buttonTitle = itemContainer.getElementsByTagName('p')[0].innerText;
            const newPopup = createAddToCartPopup(`The product with ID: ${buttonID} and title: ${buttonTitle} has been added to your cart successfully`);
            document.getElementById('app').appendChild(newPopup);

            setTimeout(function (){
                button.textContent = "Add to cart";
                button.style.removeProperty("background-color");
                newPopup.remove();
            }, 4000);
        });

        button.addEventListener('click', function(clickEvent) {
            console.log('event fired');

            let itemHTML = button.parentElement.parentElement;

            let id = itemHTML.getAttribute('data-id');
            let thumbnail = itemHTML.querySelector('img').getAttribute('src');
            let title = itemHTML.querySelector('p[class="item-title"]').innerText;
            let price = itemHTML.querySelector('p[class="item-price"]').innerText.split(' ')[1];

            const addedToCartEvent = new CustomEvent("addedToCart", {
                detail: {
                    id: id,
                    thumbnail: thumbnail,
                    title: title,
                    price: price,
                    amount: 1
                }
            });
            cartCounter.dispatchEvent(addedToCartEvent);
        });
    }
}

function createAddToCartPopup(text="The product has been added to your cart successfully!"){
    const newPopup = document.createElement('div');
    const popupContent = document.createElement('div');
    newPopup.appendChild(popupContent);
    newPopup.setAttribute('class', 'add-to-cart-popup');
    popupContent.innerText = text;

    return newPopup;
}

function selectGalleryImage(currentCarousel, direction)
{
    let enabledImage = currentCarousel.querySelector("img:not([style*='display: none'])");
    let nextImage;

    if(direction === 0)
    {
        nextImage = enabledImage.previousElementSibling;
        if(nextImage === null)
        {
            nextImage = currentCarousel.lastElementChild;
        }
    }
    else
    {
        nextImage = enabledImage.nextElementSibling;
        if(nextImage === null)
        {
            nextImage = currentCarousel.firstElementChild;
        }
    }

    console.log(nextImage);
    enabledImage.style.setProperty('display', 'none');
    nextImage.style.setProperty('display', 'inline');
}

function keyboardSelectGalleryImage(keyEvent)
{
    console.log(selectedItem);
    if(keyEvent.keyCode === 37)
    {
        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 0);
    }

    if(keyEvent.keyCode === 39)
    {
        selectGalleryImage(selectedItem.querySelector('.thumbnails-container'), 1);
    }
}

function setupCartUI()
{

    console.log(cartCounter);
    cartCounter.addEventListener('addedToCart', (cartEvent) =>{
        console.log('fdf');
        let currentCount = Number(cartEvent.target.innerText);
        cartEvent.target.innerText = currentCount + 1;

        const cartContainer = cartEvent.target.nextElementSibling;

        const existingItem = cartContainer.querySelector(`.cart-item-container[data-id="${cartEvent.detail.id}"]`);
        console.log(existingItem);
        if(existingItem == null) {
            let itemHTML = createCartHTMLForItem(cartEvent.detail);
            cartContainer.appendChild(itemHTML);
        }
        else{
            let currentCount = Number(existingItem.lastElementChild.innerText.substring(1));
            currentCount++;
            existingItem.lastElementChild.innerText = `x${currentCount}`;
        }

        console.log(cartContainer);
    });

    const cartIcon = document.getElementById('cart-icon');
    const cartContents = document.getElementsByClassName('cart-contents')[0];
    cartIcon.addEventListener('mouseover', ()=>{
        console.log("on icon");
        cartContents.style.setProperty('display', 'inline-block');
    });

    cartIcon.addEventListener('mouseout', ()=>{
        console.log("out of wrapper");
        cartContents.style.removeProperty('display');
    });
}

function createCartHTMLForItem(item)
{
    let mainItemDiv = document.createElement('div');
    mainItemDiv.setAttribute('data-id', item["id"]);
    mainItemDiv.setAttribute('class', 'cart-item-container');

    let itemThumbnail = document.createElement('img');
    itemThumbnail.setAttribute('class', 'cart-item-thumbnail');
    itemThumbnail.setAttribute('src', item['thumbnail']);

    let itemTitle = document.createElement('p');
    itemTitle.setAttribute('class', 'cart-item-title');
    itemTitle.innerText = item['title'];

    let itemPrice = document.createElement('p');
    itemPrice.setAttribute('class', 'cart-item-price');
    itemPrice.innerText = `${item['price']}`;

    let itemAmount = document.createElement('p');
    itemAmount.setAttribute('class', 'cart-item-amount');
    itemAmount.innerText = `x${item['amount']}`;

    mainItemDiv.appendChild(itemThumbnail);
    mainItemDiv.appendChild(itemTitle);
    mainItemDiv.appendChild(itemPrice);
    mainItemDiv.appendChild(itemAmount);

    return mainItemDiv;
}