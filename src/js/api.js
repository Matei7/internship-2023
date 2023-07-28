export async function fetchProducts(limitNumber = 12, skipNumber = 0) {
    console.log(limitNumber, skipNumber);
    let jsonProducts = await fetch(`https://dummyjson.com/products?limit=${limitNumber}&skip=${skipNumber}`)
        .then(res => res.json());
    return jsonProducts['products'];
}

export async function getProductAfterId(id) {
    return await fetch('https://dummyjson.com/products/' + id)
        .then(res => res.json());
}

export async function getCartAPI(cartId = '64c3a47146628') {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {method: 'GET'})
        .then(res => res.json());
}

export async function addProductToCartAPI(product, cartId = '64c3a47146628') {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            products: [product]
        })
    }).then(res => res.json())
}

export async function removeProductFromCartAPI(productId, cartId = '64c3a47146628') {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}?products[]=${productId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json())
}

export async function updateProductQuantityAPI(productId, quantity, cartId = '64c3a47146628') {
    return await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            products: [{
                id: productId,
                quantity: quantity
            }]
        })
    }).then(res => res.json())
}