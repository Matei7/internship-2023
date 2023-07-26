export async function getItems(api='https://dummyjson.com/products'){
    const response=await fetch(api);
    const items=await response.json();
    return items.products;
}