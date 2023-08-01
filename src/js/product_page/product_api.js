/**
 * Fetches 10 items from the api
 * @param api
 * @returns {Promise<[{quantity: *, id: *}]|[{quantity: *, id: *}]|*>}
 */
export async function getItems(api = 'https://dummyjson.com/products/?limit=10&skip=10') {
    const response = await fetch(api);
    const items = await response.json();
    console.log(items.products);
    return items.products;
}

/**
 * Fetches a single item from the api
 * @param id
 * @param api
 * @returns {Promise<any>}
 */
export async function getItemById(id, api = 'https://dummyjson.com/products') {
    const response = await fetch(`${api}/${id}`);
    const item = await response.json();
    return item;
}

/**
 * Fetches items from the api based on the category
 * @param category
 * @returns {Promise<any>}
 */
export async function getProductsForCategory(category) {
    console.log('fetched');
    return await fetch(`https://dummyjson.com/products/category/${category}?limit=3&skip=2`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => {
            return res.json();
        });


}


/**
 * Fetches all available categories from the api
 * @returns {Promise<any>}
 */
export async function getAllAvailableCategories() {
    return await fetch('https://dummyjson.com/products/categories', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json()).then((json) => {
        return json;
    });
}

/**
 * Fetches all items from the api
 * @returns {Promise<any>}
 */
export async function getAllItems() {
    return await fetch('https://dummyjson.com/products/?limit=1000&skip=0', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json()).then((json) => {
        return json;
    });
}
