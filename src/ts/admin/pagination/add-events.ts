/* ADDING EVENTS TO PREVIOUS AND NEXT ELEMENT */

import { filterCurrent, filterInit, filterLast, filterMatches, filterPages, filterSections } from "../filters/filter";
import { finalIndex, initIndex, searchCurrent, searchMatches, searchPages, searchSections } from "../search-box/search";
import { changePage, pages } from "./change-page";
import { current, initialIndex, lastIndex, loadProducts, products, sectionsNumber } from "./pagination";

/* OPTIONS */
type PaginationOptions = {
    searchOption: boolean;
    filterOption: boolean;
};
export function addEvents(options: PaginationOptions) {
    const previusEl = document.getElementById("previous-page") as HTMLElement;
    const nextEl = document.getElementById("next-page") as HTMLElement;

    /* DUE TO THE PAGINATION COMPONENT IT'S CREATED AGAIN WHEN THERE'S ANY OF THIS OPTIONS, I NEED TO ADD THE EVENTS AGAIN */
    if (options.searchOption) {
        previusEl.addEventListener("click", () => previousPage(options));
        nextEl.addEventListener("click", () => nextPage(options));
    } else if (options.filterOption) {
        previusEl.addEventListener("click", () => previousPage(options));
        nextEl.addEventListener("click", () => nextPage(options));
    } else {
        previusEl.addEventListener("click", () => previousPage(options));
        nextEl.addEventListener("click", () => nextPage(options));
    }
}

/* CHANGING TO A PREVIOUS PAGE */
function previousPage(options: PaginationOptions) {
    /* DELETING CONTAINERS */
    const containers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    containers.forEach((el) => el.remove());

    /* LOADING PRODUCTS */
    if (options.searchOption) {
        loadProducts(searchMatches, initIndex, finalIndex, {
            inverse: true,
            searchOptions: true,
            filterOption: false,
        });
        changePage({
            next: false,
            init: initIndex,
            final: finalIndex,
            current: searchCurrent,
            pages: searchPages,
            sectionsNumber: searchSections,
            arrProduct: searchMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });
    } else if (options.filterOption) {
        loadProducts(filterMatches, filterInit, filterLast, {
            inverse: true,
            searchOptions: false,
            filterOption: true,
        });
        changePage({
            next: false,
            init: filterInit,
            final: filterLast,
            current: filterCurrent,
            pages: filterPages,
            sectionsNumber: filterSections,
            arrProduct: filterMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });
    } else {
        loadProducts(products, initialIndex, lastIndex, {
            inverse: true,
            searchOptions: false,
            filterOption: false,
        });
        changePage({
            next: false,
            init: initialIndex,
            final: lastIndex,
            current: current,
            pages: pages,
            sectionsNumber: sectionsNumber,
            arrProduct: products,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });
    }
}

/* CHANGING TO A NEXT PAGE */
function nextPage(options: PaginationOptions) {
    /* DELETING CONTAINERS */
    const containers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    containers.forEach((el) => el.remove());

    /* LOADING PRODUCTS */
    if (options.searchOption) {
        loadProducts(searchMatches, initIndex, finalIndex, {
            inverse: false,
            searchOptions: true,
            filterOption: false,
        });
        changePage({
            next: true,
            init: initIndex,
            final: finalIndex,
            current: searchCurrent,
            pages: searchPages,
            sectionsNumber: searchSections,
            arrProduct: searchMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });
    } else if (options.filterOption) {
        loadProducts(filterMatches, filterInit, filterLast, {
            inverse: false,
            searchOptions: false,
            filterOption: true,
        });
        changePage({
            next: true,
            init: filterInit,
            final: filterLast,
            current: filterCurrent,
            pages: filterPages,
            sectionsNumber: filterSections,
            arrProduct: filterMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });
    } else {
        loadProducts(products, initialIndex, lastIndex, {
            inverse: false,
            searchOptions: false,
            filterOption: false,
        });
        changePage({
            next: true,
            init: initialIndex,
            final: lastIndex,
            current: current,
            pages: pages,
            sectionsNumber: sectionsNumber,
            arrProduct: products,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });
    }
}