import '../sass/styles.scss';
import {buttonsClickAddToCartPopUp, getProducts, hoverCartEvent, hoverProductEvent, initCartProducts, nextImageInProductGalleryEvent, displayProductInPageByFilter, filterBar} from "./app";

await getProducts();
await initCartProducts();

buttonsClickAddToCartPopUp();
nextImageInProductGalleryEvent();
hoverProductEvent();
hoverCartEvent();
filterBar();
displayProductInPageByFilter('');