import '../sass/styles.scss';
import {hoverItem, addToCartPopUp, init, nextImageEvent, hoverCart} from "./app";

await init();
addToCartPopUp();
nextImageEvent();
hoverItem();
hoverCart();