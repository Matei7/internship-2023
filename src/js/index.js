import '../sass/styles.scss';
import '../sass/nav.scss';
import {init} from "./app";
import {initProducts} from "./products-grid";
import {initCartList} from "./cart";

init();
await initProducts();
await initCartList();
