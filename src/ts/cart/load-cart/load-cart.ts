import { Product } from "../../../components/index-product";
import { getProducts } from "../../index/pagination/get-products";
import { inputCounters } from "../flowbite/cart-pickup";
import {
    updateCart,
    updateSuggestedProducts,
} from "../update-cart/update-cart";

export type ProductQuantity = {
    id: number;
    quantity: number;
};

export let products: Product[];

/* LOADING ITEMS */
export async function loadCartProducts() {
    /* VARIABLES */
    products = await getProducts();
    const items: number[] = JSON.parse(localStorage.getItem("items") as string);

    if (items.length > 0) {
        let quantities: ProductQuantity[] = getQuantities(items);

        /* UPDATING LIST */
        for (let { id, quantity } of quantities) {
            products.forEach((product) => {
                if (product.id == id) {
                    updateCart({
                        ...product,
                        quantity,
                    });
                }
            });
        }

        /* INITIALIZING INPUT COUNTERS */
        for (const counter of inputCounters) {
            counter.init();
        }
    }

    generateSuggestedProducts(items);
}

/* GETTING QUANTITIES */
export function getQuantities(items: number[]) {
    let quantities: ProductQuantity[] = [];
    let match: number[] = [];

    items.forEach((item) => {
        let count = 0;

        items.forEach((other) => {
            if (item == other) {
                count++;
            }
        });

        if (!match.includes(item)) {
            quantities.push({
                id: item,
                quantity: count,
            });
        }

        match.push(item);
    });

    return quantities;
}

/* GENERATING SUGGESTED PRODUCTS */
export function generateSuggestedProducts(items: number[]) {
    let categories: string[] = [];
    let matches: Product[] = [];
    let count = 3;

    products.forEach((product) => {
        if (
            items.includes(product.id) &&
            !categories.includes(product.category)
        ) {
            categories.push(product.category);
        }
    });

    let sortedProducts = products.sort((a, b) => a.id - b.id);
    if (categories.length > 0) {
        sortedProducts.forEach((product) => {
            if (
                categories.includes(product.category) &&
                count > 0 &&
                !items.includes(product.id) &&
                !matches.includes(product)
            ) {
                count--;
                updateSuggestedProducts(product);
                matches.push(product);
            }
        });
    } else {
        let i = 0;
        while(i < 3) {
            const randomIndex = Math.round(
                Math.random() * (sortedProducts.length - 1)
            );
            if (!matches.includes(sortedProducts[randomIndex])) {
                updateSuggestedProducts(sortedProducts[randomIndex]);
                matches.push(sortedProducts[randomIndex]);
                i++;
            }
        }
    }
}
