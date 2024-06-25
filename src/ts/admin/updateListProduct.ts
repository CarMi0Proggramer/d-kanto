import { Product, createProduct } from "../../components/product";

const productBox = document.getElementById("product-box") as HTMLTableSectionElement;

export function updateListProduct(product: Product) {
    const firstProduct = productBox.firstChild;
    const newProduct = createProduct(product);
    productBox.insertBefore(newProduct, firstProduct);
}
