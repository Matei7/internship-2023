export function init() {
	const jsonCard = {
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
	}

	const card = `<div class='item-card'>` +
		`<img alt= \"\" src=\"${jsonCard["images"][0]}" class=\"item-image\">` +
		`<div class=\"item-information-wrapper\">` +
		`<div class="item-title-button-wrapper">` +
		`<h2 class="price">$${jsonCard["price"]}</h2>` +
		`<button class="buy-btn">Add to cart</button>` +
		`</div>` +
		`<p class=\"item-description\">${jsonCard["description"]}</p>` +
		`</div>` +
		`</div>`

	let cards = []
	for (let i = 0; i < 4; i++)
		cards.push(card)

	let items = document.getElementById('items');
	let cardsGroup = cards.join("\n");
	items.innerHTML = cardsGroup;

}
