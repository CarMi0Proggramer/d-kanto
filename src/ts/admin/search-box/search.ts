import { Product } from "../../../components/product";
import { calculatePagination, calculateSections, estimateCurrentPage, loadProducts, products } from "../pagination/pagination";
import { calculateShowing } from "../pagination/products-showing";

export let initIndex = 1;
export let finalIndex = 0;
export let searchMatches: Product[] = [];
export let searchSections:number;
export let searchCurrent = 0;
export let searchPages = 0;

export function searchProduct(inputElement: HTMLInputElement) {
    searchMatches = [];
    const searchTerm = inputElement.value.toLowerCase();

    /* LOOKING FOR SOME COINCIDENCE */
    for(let product of products){
        const name = product.name.toLowerCase();
        if (name.includes(searchTerm)) {
            searchMatches.push(product);
        }
    }

    /* IF MATCHES A PRODUCT */
    if (searchMatches) {
        document.querySelectorAll(
            `tr[name="product-container"]`
        ).forEach(el => el.remove());
    }

    loadProducts(searchMatches, initIndex, finalIndex, { inverse:false, searchOptions: true });
    calculatePagination({ productsLength: searchMatches.length, pageNumber: 1, searchOption: true});
    searchSections = calculateSections(searchMatches.length);
    calculateShowing(initIndex, searchMatches);
    estimateCurrentPage({ current: searchCurrent ,searchOption: true });
}

/* CHANGING SEARCH INIT-INDEX */
export function changeSearchInitIndex(value: number) {
    initIndex = value;
    return initIndex;
}

/* CHANGING SEARCH FINAL-INDEX */
export function changeSearchFinalIndex(value: number) {
    finalIndex = value;
    return finalIndex;
}

/* CHANGING SEARCH CURRENT PAGE */
export function changeSearchCurrent(value: number) {
    searchCurrent = value;
    return searchCurrent;
}

/* CHANGING SEARCH SECTIONS NUMBER */
export function changeSearchSections(value: number) {
    searchSections = value;
    return searchSections;
}

/* CHANGING SEARCH PAGES NUMBER */
export function changeSearchPagesNumber(value: number) {
    searchPages = value;
    return searchPages;
}