const sampleItem={
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
};

function getHtmlNodeItem(jsonItem){
    const itemNode=document.createElement('div');
    itemNode.classList.add('item');
    itemNode.innerHTML=`
    <div class="item_thumbnail">
        <img src="${jsonItem.thumbnail}" alt="${jsonItem.title}">
    </div>
    <div class="item_title">${jsonItem.title}</div>
    <div class="item_price">
        <p class="item_price_original">$${jsonItem.price}</p>
    </div>
    <p class="item_discount">${jsonItem.discountPercentage}% off</p>
    <p class="item_rating">Rating: ${jsonItem.rating}</p>
    `;
    return itemNode;
}
export function loadItems(){
    const shopContainer=document.getElementsByClassName('shop-items')[0];
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
    shopContainer.appendChild(getHtmlNodeItem(sampleItem));
}

