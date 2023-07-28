import '../sass/checkout.scss';


const cartID = window.location.href.split('?')[1].split('=')[1];
const totalText = document.getElementById('total-text');
const cartURL = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`;

await init();

async function init() {
    await loadItemsToCart();
    setupUI();
}

async function loadItemsToCart()
{
    console.log(cartURL);
    const cartData = await loadCartData(cartURL);
    const itemsContainer = document.getElementById('products-list');

    for(const item of cartData.products)
    {
        let itemHTML = createCartHTMLForItem(item);
        itemsContainer.appendChild(itemHTML);
    }
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
    itemPrice.innerText = `$${item['price']}`;

    let itemAmount = document.createElement('input');
    itemAmount.setAttribute('type', 'number');
    itemAmount.setAttribute('min', '1');
    //itemAmount.setAttribute('onKeyDown', "return false");
    itemAmount.value = item['quantity'];
    itemAmount.setAttribute('class', 'cart-item-amount');
    itemAmount.setAttribute('data-value', item['quantity']);

    itemAmount.addEventListener("keypress", (e) => {
        e.preventDefault();
    })
    itemAmount.addEventListener("change", async function (changeEvent) {
        let addedAmount = 0;

        let oldValue = changeEvent.target.getAttribute('data-value');
        let newValue = changeEvent.target.value;

        changeEvent.target.setAttribute('data-value', newValue);

        addedAmount = newValue - oldValue;

        await fetch(cartURL, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                products: [{
                    id: item["id"],
                    quantity: addedAmount
                }]
            })
        }).then((value) => value.json())
            .then(console.log);

        totalText.innerText = `Total: ${(await loadCartData(cartURL)).total}`;
    });


    mainItemDiv.appendChild(itemThumbnail);
    mainItemDiv.appendChild(itemTitle);
    mainItemDiv.appendChild(itemPrice);
    mainItemDiv.appendChild(itemAmount);

    return mainItemDiv;
}

async function loadCartData(queryURL = queryURL) {
    let cartData;

    let startTime = performance.now();

    await fetch(queryURL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(r => r.json()).then(response => cartData = response);

    let endTime = performance.now();
    let timeElapsed = endTime - startTime;

    console.log(`The fetch took ${timeElapsed / 1000} seconds to run.`);

    console.log(cartData);
    console.log("The data is in the house");

    return cartData;
}

async function setupUI() {
    totalText.innerText = `Total: ${(await loadCartData(cartURL)).total}`;
}