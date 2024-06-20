import { Product, createProduct } from "../components/product";

const productBox = document.getElementById("product-box") as HTMLTableSectionElement;
const firstProduct = productBox.firstChild;

export function updateListProduct(product: Product) {
    const newProduct = createProduct(product);
    productBox.insertBefore(newProduct, firstProduct);
}
