import '../sass/product-page.scss';
import '../sass/nav.scss';
import {init} from "./app";
import {loadProductPage} from "./product-info";

init();
if (await loadProductPage() > 1) {
    document.querySelector('.prev').addEventListener('click', goToPrevSlide);
    document.querySelector('.next').addEventListener('click', goToNextSlide);
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide(index + 1);
        });
    });
}

let slideIndex = 0;
let prevIndex = 0;
initSlides();

function goToPrevSlide() {
    plusSlides(-1);
}

function goToNextSlide() {
    plusSlides(1);
}

function initSlides() {
    document.getElementsByClassName("slide")[0].className += " slide-active";
    document.getElementsByClassName("dot")[0].className += " dot-active";
}

function plusSlides(n) {
    prevIndex = slideIndex;
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    prevIndex = slideIndex;
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length - 1) {
        slideIndex = 0;
        prevIndex = slides.length - 1;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
        prevIndex = 0;
    }

    console.log(prevIndex, slideIndex, slides.length - 1);

    if (prevIndex === 0 && slideIndex === slides.length - 1) {
        slides[slideIndex].className += " slide-in-right slide-active in";
        slides[prevIndex].className += " slide-out-right out";
    }
    else if (slideIndex === 0 && prevIndex === slides.length - 1) {
        slides[slideIndex].className += " slide-in-left slide-active out";
        slides[prevIndex].className += " slide-out-left in";
    }
    else if (prevIndex < slideIndex) {
        slides[slideIndex].className += " slide-in-left slide-active";
        slides[prevIndex].className += " slide-out-left";
    } else {
        slides[slideIndex].className += " slide-in-right slide-active";
        slides[prevIndex].className += " slide-out-right";
    }

    document.querySelector('.prev').removeEventListener('click', goToPrevSlide);
    document.querySelector('.next').removeEventListener('click', goToNextSlide);

    setTimeout(() => {
        slides[slideIndex].className = "slide slide-active";
        slides[prevIndex].className = "slide";
        document.querySelector('.prev').addEventListener('click', goToPrevSlide);
        document.querySelector('.next').addEventListener('click', goToNextSlide);
    }, 1000);
    dots[slideIndex].className += " dot-active";
    dots[prevIndex].className = dots[prevIndex].className.replace(" dot-active", "");
}