import { createProduct, Product } from "../../../components/index-product";
import { updateAddCartEvent } from "../add-cart/update-add-cart-event";

/* VARS */
const productBox = document.getElementById("product-box") as HTMLTableSectionElement;

/* UPDATING PRODUCT LIST */
export function updateListProduct(product: Product) {
    const firstProduct = productBox.firstChild;
    const newProduct = createProduct(product);

    productBox.insertBefore(newProduct, firstProduct);
    updateAddCartEvent(newProduct);
}