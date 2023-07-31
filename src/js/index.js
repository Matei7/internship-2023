import '../sass/styles.scss';
import {addToCartPopUp, getProducts, hoverCart, hoverItem, initCart, nextImageEvent, displayItems, filterBar} from "./app";

await getProducts();
addToCartPopUp();
nextImageEvent();
hoverItem();
hoverCart();
filterBar();
displayItems('');
await initCart();
