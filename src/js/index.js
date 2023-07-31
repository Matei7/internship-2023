import '../sass/styles.scss';
import '../sass/product_styles.scss';
import '../sass/cart_page_style.scss';
import { init } from "./app";
import {loadFilterSection, loadItems} from "./main_products_script";
import {handleCartHoverEvent, loadCart} from "./cart/cart_script";
init();
loadItems().catch((error)=>{
    document.querySelector("main").innerHTML='ERROR 404';
});
await loadCart();
handleCartHoverEvent();