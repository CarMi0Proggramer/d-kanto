import { Product } from "../../../components/index-product";
import { getProducts } from "../../index/pagination/get-products";
import { inputCounters } from "../flowbite/cart-pickup";
import { updateCart, updateSuggestedProducts } from "../update-cart/update-cart";

type ProductQuantity = {
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
            products.forEach(product => {
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

        generateSuggestedProducts(items);
    }
}

/* GETTING QUANTITIES */
function getQuantities(items: number[]) {
    let quantities: ProductQuantity[] = [];
    let match: number[] = [];
    
    items.forEach(item => {
        let count = 0;

        items.forEach(other => {
            if (item == other) {
                count++;
            }
        })

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

function generateSuggestedProducts(items: number[]) {
    let categories: string[] = [];
    let matches: string[] = [];
    let count = 3;

    products.forEach(product => {
        if (items.includes(product.id) && !categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    let sortedProducts = products.sort((a,b) => a.id - b.id);
    sortedProducts.forEach(product => {
        if (categories.includes(product.category) && count > 0 && !matches.includes(product.category)) {
            count--;
            updateSuggestedProducts(product);
            matches.push(product.category);
        }
    })
}
