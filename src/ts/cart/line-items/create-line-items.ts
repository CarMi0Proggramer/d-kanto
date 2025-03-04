import { Product } from "../../../components/index-product";
import { getProducts } from "../../index/pagination/get-products";
import { ProductQuantity } from "../load-cart/load-cart";

type LineItem = {
    data: Product,
    quantity: number
}

export async function createLineItems(itemsQuantities: ProductQuantity[]) {
    let products = await getProducts();
    let lineItems: LineItem[] = [];

    products.forEach(product => {
        for (const {id, quantity} of itemsQuantities) {
            if (product.id == id) {
                lineItems.push({
                    data: product,
                    quantity: quantity
                });
            }
        }
    })
    
    localStorage.setItem("line-items", JSON.stringify(lineItems));
    return lineItems;
}