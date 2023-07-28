import '../sass/styles.scss';
import '../sass/product_styles.scss'
import { init } from "./app";
import {loadItems} from "./main_products_script";
import {handleCartHoverEvent} from "./cart_script";
init();
loadItems();
handleCartHoverEvent();