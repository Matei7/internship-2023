export function debounce(func, timeout = 800) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export async function getAllAvailableCategories() {
    return await fetch('https://dummyjson.com/products/categories', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json()).then((json) => {
        return json;
    });
}

export async function getAllItems() {
    return await fetch('https://dummyjson.com/products/?limit=1000&skip=0', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json()).then((json) => {
        return json;
    });
}

export async function getProductsForCategory(category) {
    console.log('fetched');
    return await fetch(`https://dummyjson.com/products/category/${category}?limit=5&skip=3`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => {
            return res.json();
        });


}
