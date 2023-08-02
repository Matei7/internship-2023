async function increaseQuantityRequest(productId,quantity){
    await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            products: [
                {
                    id: productId,
                    quantity: quantity
                }
            ]
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    })
        .then(data => {
            const products = data?.data.products;
            saveProductsCartInLocalStorage(products);
        });
}