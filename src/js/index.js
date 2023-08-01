import '../sass/styles.scss';
import {buttonsClickAddToCartPopUp, getAllProductsAndSaveToLocalStorage ,getProducts, hoverCartEvent, hoverProductEvent, initCartProducts, nextImageInProductGalleryEvent, displayProductInPageByFilter, filterBar, handleWindowScrollEvent} from "./app";



await getProducts();
await initCartProducts();

buttonsClickAddToCartPopUp();
nextImageInProductGalleryEvent();
hoverProductEvent();
hoverCartEvent();
filterBar();
handleWindowScrollEvent();
displayProductInPageByFilter('');
await getAllProductsAndSaveToLocalStorage();