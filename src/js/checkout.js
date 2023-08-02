import '../sass/checkout.scss';

const cartID = window.location.href.split('?')[1].split('=')[1];
const totalText = document.getElementById('total-text');
const cartURL = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartID}`;

let numFetchesInProgress = 0;

window.onload = function() {
    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = 'It looks like you have been editing something. '
            + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
};
await init();

async function init() {
    await loadItemsToCart();
    await setupUI();
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
    itemAmount.setAttribute('min', '0');
    //itemAmount.setAttribute('onKeyDown', "return false");
    itemAmount.value = item['quantity'];
    itemAmount.setAttribute('class', 'cart-item-amount');
    itemAmount.setAttribute('data-value', item['quantity']);

    itemAmount.addEventListener("keypress", (e) => {
        e.preventDefault();
    });

    const itemQuantityChangeFunction =
        async function (changeEvent) {
            let addedAmount = 0;

            let oldValue = changeEvent.target.getAttribute('data-value');
            let newValue = changeEvent.target.value;

            changeEvent.target.setAttribute('data-value', newValue);

            addedAmount = newValue - oldValue;

            console.log('-------------');
            console.log(`new value: ${newValue}`);
            console.log(`added amount: ${addedAmount}`);
            console.log('-------------');
            console.log(' ');

            if(addedAmount !== 0) {
                if (newValue > 0) {
                    numFetchesInProgress++;
                    setLoaderState();
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
                        .then(console.log).then(() => {
                            numFetchesInProgress--;
                            setLoaderState();
                        });
                } else {
                    console.log("This should delete it now");
                    numFetchesInProgress++;
                    setLoaderState();
                    const deleteFetchRequest = fetch(`${cartURL}?products[]=${item["id"]}`, {
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }).then(() => {
                        numFetchesInProgress--;
                        setLoaderState();
                    });

                    const itemsContainer = document.getElementById('products-list');
                    const itemToDelete = itemsContainer.querySelector(`div[data-id="${item["id"]}"]`);

                    await deleteFetchRequest;
                    itemToDelete.remove();
                }

                totalText.innerText = `Total: ${(await loadCartData(cartURL, true)).total}`;
            }
        };


    const eventHandlerDebounce = debounce(itemQuantityChangeFunction);
    itemAmount.addEventListener("change", eventHandlerDebounce);

    mainItemDiv.appendChild(itemThumbnail);
    mainItemDiv.appendChild(itemTitle);
    mainItemDiv.appendChild(itemPrice);
    mainItemDiv.appendChild(itemAmount);

    return mainItemDiv;
}

async function loadCartData(cartURL, fullRefresh = false) {
    let cartStringData = sessionStorage.getItem("cart-products");

    let cartData = JSON.parse(cartStringData);
    if(cartData !== null && fullRefresh === false)
    {
        return cartData;
    }

    let startTime = performance.now();
    numFetchesInProgress++;
    await fetch(cartURL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(r => r.json()).then(response => cartData = response).then(numFetchesInProgress--);

    let endTime = performance.now();
    let timeElapsed = endTime - startTime;

    console.log(`The fetch took ${timeElapsed / 1000} seconds to run.`);



    const stringObjData = JSON.stringify(cartData);

    sessionStorage.setItem("cart-products", stringObjData);
    return cartData;
}

async function setupUI() {
    totalText.innerText = `Total: ${(await loadCartData(cartURL)).total}`;

    window.onload = function (){
        window.addEventListener("beforeunload", function (event){
            if(numFetchesInProgress === 0){
                return undefined;
            }

            event.returnValue = "it looks like the changes you have made to your cart haven't finished yet. \nIf you exit now, these changes will be lost.";
        });
    };

}

function debounce(func, timeout = 1000){

    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function setLoaderState()
{
    console.log(numFetchesInProgress);
    console.log(document.getElementsByClassName('loader')[0]);
    if(numFetchesInProgress === 0)
        document.getElementsByClassName('loader')[0].classList.add("hidden-attribute");
    else
        document.getElementsByClassName('loader')[0].classList.remove("hidden-attribute");
}
