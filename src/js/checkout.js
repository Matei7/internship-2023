let checkoutWindow = document.querySelector(".checkout-window__grid");
let totalText = document.querySelector(".checkout-window-total");

let productsArrayAfterUpdateAProduct = [];

async function updateTotalText() {
    try {
        const total = fetchCartsTotalPrice().then(total => {
            totalText.textContent = `Total: ${total.toFixed(2)}`;
        });
    } catch (error) {
        console.error('Error updating total text:', error);
    }
}

function fetchCartsTotalPrice() {
    return fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const total = data.products.reduce((acc, product) => acc + product.total, 0);
            return total;
        })
        .catch(error => {
            console.error('Error fetching cart products:', error);
            return 0; // În caz de eroare, returnăm 0 pentru total
        });
}
function fetchCart() {
    return fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.products;
        })
        .catch(error => {
            console.error('Error fetching cart products:', error);
            return [];
        });
}



function createItemBoxCheckout(product){
    let boxItem = document.createElement("div");
    boxItem.classList.add("checkout-window__grid__box-item");
    boxItem.setAttribute("data-id", product.id);
    const price=(product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
    let hmtlPart= `
        <img src=${product.thumbnail} alt="Product Image" class="box-item__image">
        <p class="box-item__title">${product.title}</p>
        <p class="box-item__price">${price}</p>
        <div class="quantity buttons_added">
          <input type="button" value="-" class="minus">
          <input type="number" step="1" min="1" max="" value=${product.quantity}  class="input-text qty text" size="4" >
          <input type="button" value="+" class="plus">
        </div>
        <p class="box-item__total-price"> ${(product.quantity * price).toFixed(2)}</p>
      </div>`;
    boxItem.innerHTML = hmtlPart;
    return boxItem;
}

function plusMinusBtnListener(card){
    const plusBtn = card.querySelector(".plus");
    const minusBtn = card.querySelector(".minus");
    const quantity = card.querySelector(".input-text.qty.text");
    plusBtn.addEventListener("click", () => {
        quantity.value++;
        increaseQuantityRequest(card);
        updateQuantityProducts(card);

    });
    minusBtn.addEventListener("click", () => {
        if(quantity.value>1){
            quantity.value--;
            decreaseQuantityRequest(card);
            updateQuantityProducts(card);
        }
    });
}

function increaseQuantityRequest(cardElement) {
    const productId = Number(cardElement.dataset.id);
    fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            products: [
                {
                    id: productId,
                    quantity: 1,
                }
            ]
        })
    })
        .then(res => res.json())
        .then(console.log);

}

function decreaseQuantityRequest(cardElement) {

    const productId = Number(cardElement.dataset.id);
    fetch('https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c3a491accd0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            products: [
                {
                    id: productId,
                    quantity: -1,
                }
            ]
        })
    })
        .then(res => res.json())
        .then(console.log);
}

function updateQuantityProducts(){
    fetchCart()
        .then(productsFromCart => {
            for (const product of productsFromCart) {
                console.log(product);
                const itemBox = document.querySelector(`.checkout-window__grid__box-item[data-id="${product.id}"]`);
                const itemQuantity = itemBox.querySelector(".input-text.qty.text");
                const itemTotalPrice = itemBox.querySelector(".box-item__total-price");
                itemQuantity.textContent = product.quantity;
                const price=product.price - (product.price * product.discountPercentage) / 100;
                itemTotalPrice.textContent = `${(product.quantity * price).toFixed(2)}`;
                updateTotalText();
            }
        })
        .catch(error => {
            console.error('Error show cart items:', error);
        });
}


function showCheckoutProducts(){
    fetchCart()
        .then(productsFromCart => {
            for (const product of productsFromCart) {
                console.log(product);
                let card=createItemBoxCheckout(product);
                checkoutWindow.appendChild(card);
                plusMinusBtnListener(card);
                updateTotalText();
            }
        })
        .catch(error => {
            console.error('Error show cart items:', error);
        });
}

const buyButton=document.querySelector(".checkout-window__button");
buyButton.addEventListener("click", ()=>{
    window.location.href = "index.html";
});

showCheckoutProducts();