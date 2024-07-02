import { loadProducts, products } from "../pagination/pagination";

let initIndex = 1;
let finalIndex = 0;

export function searchProduct(inputElement: HTMLInputElement) {
    const searchTerm = inputElement.value.toLowerCase();
    let matches = [];

    for(let product of products){
        const name = product.name.toLowerCase();
        if (name.includes(searchTerm)) {
            matches.push(product);
        }
    }

    if (matches) {
        document.querySelectorAll(
            `tr[name="product-container"]`
        ).forEach(el => el.remove());
    }

    loadProducts(matches, initIndex, finalIndex, { inverse:false });
}

export function changeSearchInitIndex(value: number) {
    initIndex = value;
    return initIndex;
}

export function changeSearchFinalIndex(value: number) {
    finalIndex = value;
    return finalIndex;
}