import * as events from "events";
import {initCart} from "./cart";

// variable to keep track of the current number of products for pagination
let currentBatchOfProducts = 1

// variable to keep track of filters
let checked = false

export async function init() {
	// fetch products and generate cards
	await generateCards(await fetchProducts())

	// add event listeners for every button
	addButtons()

	// add event listeners for every image
	addListenersForImg()

	// add event listeners for filters
	filterButtons()

	// initialize cart functionality
	await initCart()
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
	document.getElementById("btn-show-more").addEventListener("click", showMore)
}

// Add event listeners for filter
function filterButtons() {
	for (let checkBox of document.getElementsByClassName("filter-checkbox")) {
		// add an event listener for each checkbox
		checkBox.addEventListener("change", checkBoxEvent)
	}
}

async function checkBoxEvent() {
	// set the global variable "checked" accordingly
	let currentChecked = false;
	for (let checkBox of document.getElementsByClassName("filter-checkbox")) {
		if (checkBox.checked) {
			currentChecked = true
			break
		}
	}
	checked = currentChecked

	// restart from the first batch, but now with the correct filters
	currentBatchOfProducts = 1
	let items = document.getElementById('items');
	items.innerHTML = "";
	await generateCards(await fetchProducts())
	addListenersForImg()
	addButtons()
	await initCart()
}

function filterProducts(products, filters) {
	// go through each filter and apply it
	let resultProducts = new Set()
	for (let filter of filters) {
		let currentProducts = new Set(products.filter(product => product.category === filter))
		resultProducts = [...resultProducts, ...currentProducts]
	}
	return Array.from(resultProducts)
}

// get all checked filters and return them in an array
function getFilters() {
	let filters = []
	for (let checkBox of document.getElementsByClassName("filter-checkbox")) {
		if (checkBox.checked)
			filters.push(checkBox.id)
	}
	return filters
}

// event for when a user presses show more button
async function showMore() {
	// increase batch of products variable and generate card for the next batch
	currentBatchOfProducts++
	await generateCards(await fetchProducts())
	// reset listeners and reinitialize cart
	addListenersForImg()
	addButtons()
	await initCart()
}

// Add event listeners for thumbnails
function addListenersForImg() {
	for (let img of document.getElementsByClassName("item-image"))
		img.addEventListener("click", () => {
			location.href = `product.html?id=${img.id}`
		})
}

// Generate and add cards to html
async function generateCards(products) {
	let cards = []

	// when generating cards, we filter the products first if we have any filters selected
	let filters = getFilters()
	let filteredProducts = []

	if (filters.length > 0) {
		// search for products that belong to that filter
		filteredProducts = filterProducts(products, filters)

		// go through batches of products until we find the first batch that belongs to requested category
		while (filteredProducts.length === 0 && currentBatchOfProducts < 10) {
			filteredProducts = filterProducts(products, filters)
			products = await fetchProducts()
			currentBatchOfProducts++
		}
	}
	// we don't have any filter
	else filteredProducts = products

	// go through all filtered products and generate cards
	for (const product of filteredProducts) {
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

	// add the cards in HTML
	let items = document.getElementById('items');
	items.innerHTML += cards.join("\n");
}

// Fetch products from the API
async function fetchProducts() {
	// we first check if we already have stored the products in the local storage
	const localProducts = localStorage.getItem("products")

	if (localProducts !== null) {
		// products exist in the local storage, we need to check if the requested products exist
		let products = JSON.parse(localProducts)
		if (products.length >= currentBatchOfProducts * 10) {
			// the requested products already exist
			return products.slice(currentBatchOfProducts * 10 - 10, currentBatchOfProducts * 10)
		}
		else {
			// the requested products does not exist
			const newProducts = await fetch(`https://dummyjson.com/products?limit=10&skip=${currentBatchOfProducts * 10}`)
				.then(res => {
					return res.json()
				})

			// update local storage
			localStorage.setItem("products", JSON.stringify([...products, ...newProducts.products]))
			return newProducts.products
		}
	}

	// we do not have anything stored locally
	const products = await fetch(`https://dummyjson.com/products?limit=10&skip=${currentBatchOfProducts*10}`)
		.then(res => {
			return res.json()
		})
	localStorage.setItem("products", JSON.stringify(products.products))
	return products.products
}