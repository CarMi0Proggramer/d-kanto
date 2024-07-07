import { Product } from "../../../components/product";
import { calculatePagination, calculateSections, estimateCurrentPage, loadProducts, products } from "../pagination/pagination";
import { calculateShowing } from "../pagination/products-showing";

export let initIndex: number;
export let finalIndex: number;
export let searchMatches: Product[] = [];
export let searchSections:number;
export let searchCurrent: number;
export let searchPages: number;

export function searchProduct(inputElement: HTMLInputElement) {
    /* INITIALIZING SOME VARIABLES */
    initIndex = 1;
    finalIndex = 0;
    searchCurrent = 0;
    searchPages = 0;
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

    loadProducts(searchMatches, initIndex, finalIndex, { inverse:false, searchOptions: true, filterOption: false });
    calculatePagination({ productsLength: searchMatches.length, pageNumber: 1, searchOption: true, filterOption: false});
    searchSections = calculateSections(searchMatches.length);
    calculateShowing(initIndex, searchMatches);
    estimateCurrentPage({ current: searchCurrent ,searchOption: true, filterOption: false });

    localStorage.setItem("search-option", JSON.stringify({"option": true}));
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

/* CHANGING SEARCH MATCHES */
export function changeSearchMatches(id: number) {
    searchMatches = searchMatches.filter((product) => product.id != id);
    return searchMatches;
}