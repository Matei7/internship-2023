export async function getItems(api='https://dummyjson.com/products'){
    const response=await fetch(api);
    const items=await response.json();
    return items.products;
}
export async function getItemById(id,api='https://dummyjson.com/products'){
    const response=await fetch(`${api}/${id}`);
    const item=await response.json();
    return item;
}