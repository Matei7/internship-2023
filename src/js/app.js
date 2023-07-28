import * as events from "events";
import {initCart} from "./cart";

// variable to keep track of the current number of products for pagination
let currentNr = 0

export async function init() {
	// fetch products and generate cards
	generateCards(await fetchProducts())

	// add event listeners for every button
	addButtons()

	// add event listeners for every image
	addListenersForImg()

	// initialize cart functionality
	initCart()
}

// Generate pop up when clicking "Add to cart button"
function popUp(event) {
	let popUpElement = document.getElementById("popUp")

	// set style for clicked button
	popUpElement.classList.replace("popUpHidden", "popUpVisible")
	let btn = document.getElementById(`${event.target.id}`)
	btn.classList.replace("buy-btn", "buy-btn-clicked")
	btn.innerText = "Added to cart"

	// wait and set it back to its initial state
	setTimeout(() => {
		popUpElement.classList.replace("popUpVisible", "popUpHidden")
		btn.classList.replace("buy-btn-clicked", "buy-btn")
		btn.innerText = "Add to cart"
	}, 5000)
}

// Add event listeners for buttons
function addButtons() {
	// add to cart buttons
	for (let btn of document.getElementsByClassName("buy-btn"))
		btn.addEventListener("click", popUp)

	// show more button
	document.getElementById("btn-show-more").addEventListener("click", async () => {
		generateCards(await fetchProducts())
		addListenersForImg()
		addButtons()
		initCart()
	})
}

// Add event listeners for thumbnails
function addListenersForImg() {
	for (let img of document.getElementsByClassName("item-image"))
		img.addEventListener("click", () => {
			location.href = `product.html?id=${img.id}`
		})
}

// Generate and add cards to html
function generateCards(products) {
	let cards = []

	for (const product of products.products) {
		let price = `<h2 class="price">$${product.price}</h2>`;
		if (product.discountPercentage > 0.0) {
			let newPrice = Math.floor((100.0 - product.discountPercentage) * product.price / 100)
			price = `<div class="price"><del><span>$${product.price}</span></del><ins><span>${newPrice}</span></ins></div>`;
		}

		const card =
			`<div class='item-card' id="card${product.id}">` +
			`<img alt= \"\" id="${product.id}" src=\"${product.thumbnail}" class=\"item-image\">` +
			`<div class=\"item-information-wrapper\">` +
			`<div class="item-title-wrapper">` +
			`<h2>${product.title}</h2>` +
			`<p><i class="fa fa-star" aria-hidden="true"></i><span> ${product.rating}</span></p>` +
			`</div>` +
			`<p class=\"item-description\">${product["description"]}</p>` +
			`<div class="item-title-wrapper">` +
			price +
			`<button class="buy-btn" id="btn-${product.id}">Add to cart</button>` +
			`</div>` +
			`</div>` +
			`</div>`

		cards.push(card)
	}

	let items = document.getElementById('items');
	items.innerHTML += cards.join("\n");
}

// Fetch products from dummy json
async function fetchProducts() {
	return fetch(`https://dummyjson.com/products?limit=10&skip=${currentNr*10}`)
		.then(res => {
			currentNr++
			return res.json()
		})
}