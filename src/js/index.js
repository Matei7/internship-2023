import '../sass/styles.scss';
import {addToCartPopUp, getProducts, hoverCart, hoverItem, initCart, nextImageEvent} from "./app";

await getProducts();
addToCartPopUp();
nextImageEvent();
hoverItem();
hoverCart();
await initCart();
