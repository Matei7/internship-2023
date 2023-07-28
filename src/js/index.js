import '../sass/styles.scss';
import {hoverItem, addToCartPopUp, getProducts, nextImageEvent, hoverCart} from "./app";

await getProducts();
addToCartPopUp();
nextImageEvent();
hoverItem();
hoverCart();