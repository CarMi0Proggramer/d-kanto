import { Product } from "../../../components/product";
import { calculatePagination, calculateSections, estimateCurrentPage, loadProducts, products } from "../pagination/pagination";
import { calculateShowing } from "../pagination/products-showing";

/* SOME VARIABLES */
export let filterMatches: Product[];
export let filterInit: number;
export let filterLast: number;
export let filterCurrent: number;
export let filterPages:number;
export let filterSections:number;

/* FILTERING PER CATEGORY ELEMENTS */
const categoryListEls = document.getElementsByClassName("category-li-element") as HTMLCollectionOf<HTMLLIElement>;

/* FILTERING PER PRICE ELEMENTS */
const priceFrom = document.getElementById("price-from") as HTMLSelectElement;
const priceTo = document.getElementById("price-to") as HTMLSelectElement;

/* FILTERING PER RATING ELEMENTS */
const ratingStars = document.getElementsByClassName("category-input-star") as HTMLCollectionOf<HTMLInputElement>;

/* FILTER FUNCTION */
export function filter() {
    filterInit = 1;
    filterLast = 0;
    filterCurrent = 0;
    filterPages = 0;
    filterMatches = getFilterMatches();

    /* IF MATCHES A PRODUCT */
    if (filterMatches) {
        document.querySelectorAll(
            `tr[name="product-container"]`
        ).forEach(el => el.remove());
    }

    /* LOADING PRODUCTS */
    loadProducts(
        filterMatches, 
        filterInit, 
        filterLast, 
        { 
            inverse:false, 
            searchOptions: false, 
            filterOption: true
        }
    );
    calculatePagination({ 
        productsLength: filterMatches.length, 
        pageNumber: 1, 
        searchOption: false,
        filterOption: true
    });
    filterSections = calculateSections(filterMatches.length);
    calculateShowing(filterInit, filterMatches);
    estimateCurrentPage({ 
        current: filterCurrent, 
        searchOption: false,
        filterOption: true
    });

    /* SETTING OPTION */
    localStorage.setItem("filter-option", JSON.stringify({"option": true}));
}

/* CLEAR FILTERS FUNCTION */
export function clearFilters() {
    /* CLEARING CATEGORY FILTERS */
    for (let el of categoryListEls) {
        let input = el.querySelector("input") as HTMLInputElement;
        input.checked = false;
    }
    
    /* CLEARING RATING FILTERS */
    for (let el of ratingStars) {
        if (el.checked) {
            el.checked = false;
        }
    }

    /* CLEARING PRICE FILTERS */
    priceFrom.value = "From";
    priceTo.value = "To";

    /* CLEARRING FILTER MATCHES */
    filterMatches = [];

    /* LOADING PRODUCTS AGAIN */
    loadProducts(products, 1, 0, {
        inverse: false,
        searchOptions: false,
        filterOption: false
    })
    calculatePagination({
        productsLength: products.length,
        pageNumber: 1,
        searchOption: false,
        filterOption: false
    })
    calculateShowing(1, products)
    estimateCurrentPage({
        current: 0,
        searchOption: false,
        filterOption: false
    })

    localStorage.setItem("filter-option", JSON.stringify({
        'option': false
    }));
}

/* GETTIN FILTERS */
const enum TypeFilters {
    RATING = "rating",
    CATEGORY = "category",
    PRICE = "price"
}
type FilterOptions = {
    type: TypeFilters.CATEGORY,
    value: string[]
} | {
    type: TypeFilters.PRICE,
    value: {
        from: number,
        to?: number
    }
} |
{
    type: TypeFilters.RATING,
    value: number
}
function getFilters() {
    let filters: FilterOptions[] = [];

    /* SETTING CATEGORY FILTERS */
    let categoryFilters = getCategoryFilters();
    if (categoryFilters.length > 0) {
        filters.push({
            type: TypeFilters.CATEGORY,
            value: categoryFilters
        })
    }

    /* SETTING RATING FILTER */
    let ratingFilter = getRatingFilter();
    if (ratingFilter) {
        filters.push({
            type: TypeFilters.RATING,
            value: ratingFilter
        })
    }

    /* SETTING PRICE FILTER */
    let priceFilter = getPriceFilter();
    filters.push({
        type: TypeFilters.PRICE,
        value: priceFilter
    })

    return filters;
}

/* GETTING CATEGORY FILTERS */
function getCategoryFilters() {
    let matches = [];
    for (let el of categoryListEls) {
        let input = el.querySelector("input");
        if (input?.checked) {
            matches.push(input.value);
        }
    }

    return matches;
}

/* GETTING RATING FILTER */
function getRatingFilter() {
    for (let star of ratingStars) {
        if (star.checked) {
            return Number(star.value);
        }
    }
}

/* GETTING PRICE FILTER */
function getPriceFilter() {
    let from:number;
    let to:number;

    /* GETTING FROM PRICE */
    if (!isNaN(Number(priceFrom.value))) {
        from = Number(priceFrom.value);
    }else{
        from = 0;
    }

    /* GETTING TO PRICE */
    if (!isNaN(Number(priceTo.value))) {
        to = Number(priceTo.value);
    }else{
        to = 0;
    }

    /* RETURNING VALUES */
    if (to) {
        return {
            from: from,
            to: to
        }
    }else{
        return {
            from: from
        }
    }
}

/* GETTING FILTER MATCHES */
function getFilterMatches() {
    let filters = getFilters();
    /* GETTING MATCHES */
    let matches:Product[] = [];
    for (let product of products) {
        /* LOOKING FOR A MATCH */
        let coincidences: boolean[] = [];

        for (let filter of filters) {
            /* MATCHING BY CATEGORY */
            if (filter.type == TypeFilters.CATEGORY) {
                for (let category of filter.value) {
                    if (category == product.category) {
                        coincidences.push(true);
                        break;
                    }
                }
            }
            /* MATCHING BY RATING */
            else if(filter.type == TypeFilters.RATING && product.rating <= filter.value){
                coincidences.push(true)
            }
            /* MATCHING BY PRICE */ 
            else if(filter.type == TypeFilters.PRICE){
                let from = filter.value.from;
                let to = filter.value.to ? filter.value.to : Infinity;

                if (product.price <= to && product.price >= from) {
                    coincidences.push(true);
                }
            }
        }

        if (coincidences.length == filters.length) {
            matches.push(product);
        }
    }

    return matches;
}

/* CHANGING FILTER INIT-INDEX */
export function changeFilterInitIndex(value: number) {
    filterInit = value;
    return filterInit;
}

/* CHANGING FILTER FINAL-INDEX */
export function changeFilterFinalIndex(value: number) {
    filterLast = value;
    return filterLast;
}

/* CHANGING FILTER CURRENT PAGE */
export function changeFilterCurrent(value: number) {
    filterCurrent = value;
    return filterCurrent;
}

/* CHANGING FILTER SECTIONS NUMBER */
export function changeFilterSections(value: number) {
    filterSections = value;
    return filterSections;
}

/* CHANGING FILTER PAGES NUMBER */
export function changeFilterPagesNumber(value: number) {
    filterPages = value;
    return filterPages;
}

/* CHANGING FILTER MATCHES */
export function changeFilterMatches(id: number) {
    filterMatches = filterMatches.filter((product) => product.id != id);
    return filterMatches;
}