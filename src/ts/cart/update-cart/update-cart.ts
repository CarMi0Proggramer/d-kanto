import { CartProduct, createCartProduct } from "../../../components/cart-product";

const productBox = document.getElementById("product-box") as HTMLDivElement;

export function updateCart(data: CartProduct) {
    const product = createCartProduct(data);
    const before = productBox.firstChild;

    productBox.insertBefore(product, before);
}