import '../sass/styles.scss';
import {addToCartPopUp, getProducts, hoverCart, hoverItem, initCart, nextImageEvent, displayItems, filterBar} from "./app";

await getProducts();
await initCart();
addToCartPopUp();
nextImageEvent();
hoverItem();
hoverCart();
filterBar();
displayItems('');