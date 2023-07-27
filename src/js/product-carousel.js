import * as events from "events";

let currentInd = 1;
let isMouseHover = false;
let defaultLength = 4

async function initCarousel() {
    // fetch product and add images to carousel
    const queryParams = new URLSearchParams(window.location.search)
    generateCarouselImages(await fetchProduct(queryParams.get("id")))

    // add all necessary event listeners
    addListenersForKeys()
    addListenersForMouse()
    addListenersForButtons()

    // set current image
    setImage(currentInd)
}

function generateCarouselImages(product) {
    defaultLength = product.images.length
    let id = 1
    for (let imageUrl of product.images) {
        document.getElementById("carousel").innerHTML +=
            `<img id=${id} class="carousel-img" src="${imageUrl}" loading="lazy">`
        id++
    }
}

function addListenersForMouse() {
    // add event listeners for mouse over image
    document.getElementById("carousel").addEventListener("mouseover", () => {
        isMouseHover = true
    })
    document.getElementById("carousel").addEventListener("mouseleave", () => {
        isMouseHover = false
    })
}

function addListenersForKeys() {
    // add event listener for keys
    document.addEventListener("keydown", moveByKey)
}

function addListenersForButtons() {
    // add event listeners for buttons
    document.getElementById("btn-left").addEventListener("click", moveLeft)
    document.getElementById("btn-right").addEventListener("click", moveRight)
}

function setImage(ind) {
    // set every image that isn't active to display none
    for (let i = 1; i <= defaultLength; i++) {
        if (i !== ind) {
            document.getElementById(String(i)).style.display = "none"
        }
        else document.getElementById(String(i)).style.display = "inherit"
    }
}

function moveRight() {
    if (currentInd + 1 > defaultLength)
        currentInd = 1
    else currentInd++
    setImage(currentInd)
}

function moveLeft() {
    if (currentInd - 1 < 1)
        currentInd = defaultLength
    else currentInd--
    setImage(currentInd)
}

function moveByKey(event) {
    if (event.keyCode === 37 && isMouseHover) {
        moveLeft()
    }

    else if (event.keyCode === 39 && isMouseHover)
        moveRight()
}

async function fetchProduct(id) {
    return fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
}

initCarousel()