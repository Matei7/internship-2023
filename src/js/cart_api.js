const cartObject={"success":true,"data":{"id":"64c38597d8f95","total":0,"discountTotal":0,"totalProducts":0,"totalQuantity":0,"products":[]}};

export async function  getCart(){
    const response= await fetch('http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95',{
        method:'GET'
    });
    const json=await response.json();
    return json;
}
export async function addProductToCart(productId,quantity){
    await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"products":[{"id":productId,"quantity":quantity}]}),
    }).then(response=>response.json()).then((json)=>{
        console.log(json);
        return json;
    });

}
export async function removeProductFromCart(productId){
    await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95?products[]=${productId}`,{
        method:'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }).then(response=>response.json()).then((json)=>{
        console.log(json);
        return json;
    });
}

export async function updateQunatityProduct(productId,value){
    await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c38597d8f95`,{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"products":[{"id":productId,"quantity":value}]}),
    }).then(response=>response.json()).then((json)=>{
        console.log(json);
        return json;
    });
}