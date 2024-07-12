import { Product } from "../../../components/index-product";
import { getProducts } from "./get-products";
import { count, lastIndex, loadProducts } from "./load-products";

export let products: Product[];
/* INITIALIZATING PRODUCT´S ARRAY */
export async function paginate() {
    products = await getProducts();
    loadProducts({
        arrProduct: products,
        index: lastIndex,
        inverse: false,
        counter: count
    });
}