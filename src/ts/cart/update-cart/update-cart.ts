import { CartProduct, createCartProduct } from "../../../components/cart-product";
import { createSuggestedCartProduct } from "../../../components/cart-suggested-product";
import { Product } from "../../../components/index-product";
import { updateRemoveFromCart } from "./update-remove-from-cart";

const productBox = document.getElementById("product-box") as HTMLDivElement;

export function updateCart(data: CartProduct) {
    const product = createCartProduct(data);
    const before = productBox.firstChild;
    updateRemoveFromCart(product);

    productBox.insertBefore(product, before);
}

const suggestedBox = document.getElementById("suggested-product-box") as HTMLDivElement;
export function updateSuggestedProducts(data: Product){
    const product = createSuggestedCartProduct(data);
    const before = suggestedBox.firstChild;

    suggestedBox.insertBefore(product, before);
}