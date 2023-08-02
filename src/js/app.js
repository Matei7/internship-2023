import {initCartList} from "./cart";

export function init() {
    if (localStorage.getItem('products') === null) {
        localStorage.setItem('products', JSON.stringify([]));
    }
    document.addEventListener("DOMContentLoaded", function () {
        fetch("nav.html")
            .then(function (response) {
                return response.text();
            })
            .then(function (navContent) {
                document.getElementById("nav-placeholder").outerHTML = navContent;
                initCartList().then(() => {});
            })
            .catch(function (error) {
                console.log("Error loading navigation: ", error);
            });
    });
}

export function debounce(func, timeout = 800){
    let timer= {};
    return (...args) => {
        clearTimeout(timer[args[1].id]);
        timer[args[1].id] = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
