import * as events from "events";

let currentInd = 1;
let isMouseHover = false;

function initCarousel() {
    // add all necessary event listeners
    addListenersForKeys()
    addListenersForMouse()
    addListenersForButtons()

    // set current image
    setImage(currentInd)
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
    for (let i = 1; i < 5; i++) {
        if (i !== ind) {
            document.getElementById(String(i)).style.display = "none"
        }
        else document.getElementById(String(i)).style.display = "inherit"
    }
}

function moveRight() {
    if (currentInd + 1 > 4)
        currentInd = 1
    else currentInd++
    setImage(currentInd)
}

function moveLeft() {
    if (currentInd - 1 < 1)
        currentInd = 4
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

initCarousel()