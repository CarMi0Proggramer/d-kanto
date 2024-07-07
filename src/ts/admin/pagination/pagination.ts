/* IMPORTS */
import { Product } from "../../../components/product";
import { getProducts } from "./get-products";
import { calculateShowing } from "./products-showing";
import { updateListProduct } from "../update-product/update-list-product";
import {
    changeSearchCurrent,
    changeSearchFinalIndex,
    changeSearchInitIndex,
    searchPages,
} from "../search-box/search";
import { LoadOptions, calcInitLastIndex } from "./calculate-indexs";
import {
    changeFilterCurrent,
    changeFilterFinalIndex,
    changeFilterInitIndex,
    filterCurrent,
} from "../filters/filter";
import { addEvents } from "./add-events";

/* ELEMENT STRINGS */
export const previous = `<li>
                        <a id="previous-page" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>`;
export const next = `<li>
                    <a id="next-page" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none">
                        <span class="sr-only">Next</span>
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </li>`;
const dots = `<li>
                    <a id="pagination-dots" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none">...</a>
                </li>`;

/* SOME VARIABLES */
export let products: Product[];
export let lastIndex = 0;
export let initialIndex: number;
export let count = 0;
let one = 0;

/* LOADING PRODUCTS */
export function loadProducts(
    arrProduct: Product[],
    initIndex: number,
    finalIndex: number,
    options: LoadOptions
) {
    /* GETTING INDEXS */
    let values = calcInitLastIndex(
        arrProduct,
        initIndex,
        finalIndex,
        count,
        options
    );
    let init = values.initIndex;
    let final = values.finalIndex;

    /* IF IT'S SEARCH OPTIONS, CHANGE THE OTHER INDEXS */
    if (options.searchOptions) {
        changeSearchInitIndex(init);
    } else if (options.filterOption) {
        changeFilterInitIndex(init);
    } else {
        initialIndex = init;
    }

    /* RESTARTING COUNTER */
    count = 0;

    /* LOAD SIX PRODUCTS */
    for (let i = 0; i < 6; i++) {
        if (arrProduct[final]) {
            updateListProduct(arrProduct[final]);
            final++;
            count++;
        }
    }

    /* FIRST PAGINATION */
    if (one == 0) {
        calculatePagination({
            productsLength: arrProduct.length,
            pageNumber: 1,
            searchOption: options.searchOptions,
            filterOption: options.filterOption,
        });
    }
    /* SHOWING RESULTS */
    calculateShowing(init, arrProduct);
    if (one == 0) {
        if (options.searchOptions) {
            estimateCurrentPage({
                current: searchPages,
                searchOption: options.searchOptions,
                filterOption: options.filterOption,
            });
        } else if (options.filterOption) {
            estimateCurrentPage({
                current: filterCurrent,
                searchOption: options.searchOptions,
                filterOption: options.filterOption,
            });
        } else {
            estimateCurrentPage({
                current: current,
                searchOption: options.searchOptions,
                filterOption: options.filterOption,
            });
        }
        one++;
    }

    /* CHANGING LAST INDEXS */
    if (options.searchOptions) {
        changeSearchFinalIndex(final);
    } else if (options.filterOption) {
        changeFilterFinalIndex(final);
    } else {
        lastIndex = final;
    }
}

/* IT ESTIMATES THE FINAL COMPONENT THAT THE USER IS SEEING */
const tableNavigation = document.getElementById(
    "table-navigation"
) as HTMLElement;
const showing = tableNavigation.innerHTML;
export let sectionsNumber: number;

/* CALCULATE PAGINATION OPTIONS */
type CalculatePaginationOptions = {
    productsLength: number;
    pageNumber: number;
    searchOption: boolean;
    filterOption: boolean;
};

/* ESTIMATING PAGINATION */
export function calculatePagination(options: CalculatePaginationOptions) {
    /* GETTING SECTIONS NUMBER */
    sectionsNumber = calculateSections(options.productsLength);
    /* SETTING PAGINATION */
    tableNavigation.innerHTML =
        `${showing}` + loadPagination(sectionsNumber, options.pageNumber);
    /* ADDING EVENTS */
    addEvents({
        searchOption: options.searchOption,
        filterOption: options.filterOption,
    });
}

/* GENERATING A CONTAINER WITH ITS CORRECT NUMBER */
function generateCeil(num: number) {
    const ceilNumber = `<li>
                            <a name="pagination-ceil"
                            class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none">${num}</a>
                        </li>`;
    return ceilNumber;
}

/* ESTIMATING ALL THE CONTAINERS IT WOULD BE SHOWN */
function generateMultipleCeils(num: number, pageNumber: number) {
    let finalString = ``;
    let page = pageNumber;
    let count = 1;
    for (let i = page; i <= num; i++) {
        if (num < 5 || num - pageNumber < 5) {
            finalString += generateCeil(page);
        } else {
            if (count <= 3) {
                finalString += generateCeil(page);
            } else if (count == 4) {
                finalString += dots;
            } else if (i == num) {
                finalString += generateCeil(page);
            }
        }
        count++;
        page++;
    }

    return finalString;
}

/* CREATING PAGINATION COMPONENT */
function loadPagination(num: number, pageNumber: number) {
    const ul = `<ul class="inline-flex items-stretch -space-x-px">
    ${previous}
    ${generateMultipleCeils(num, pageNumber)}
    ${next}
    </ul>`;

    return ul;
}

/* ESTIMATING THE NUMBER OF SECTIONS THAT THERE WILL BE */
export function calculateSections(length: number) {
    const num = length / 6;
    if (/\.\d+/.test(String(num))) {
        return Math.floor(num) + 1;
    } else {
        return num;
    }
}

/* CHANGING THE NUMBER OF SECTIONS */
export function changeSections(length: number) {
    sectionsNumber = calculateSections(length);
    return sectionsNumber;
}

/* ESTIMATING THE CURRENT PAGE AND GIVING IT A BACKGROUND COLOR */
/* VARIABLES */
export let current = 0;
type EstimatePageOptions = {
    current: number;
    searchOption: boolean;
    filterOption: boolean;
    especificPage?: number;
};
/* ESTIMATING CURRENT PAGE FUNCTION */
export function estimateCurrentPage(options: EstimatePageOptions) {
    /* GETTING BASIC VARIABLES */
    const bgColor = getAdminBgColor();
    const alternateColor = getAdminAlternateColor();
    const ceils = Array.from(
        document.querySelectorAll(`a[name="pagination-ceil"]`)
    );

    /* SETTING BG COLOR */
    if (options.especificPage) {
        for (const ceil of ceils) {
            if (Number(ceil.textContent) === options.especificPage) {
                ceil.classList.remove(alternateColor);
                ceil.classList.add(bgColor);
                options.current = ceils.indexOf(ceil);
            }
        }
    } else {
        ceils[options.current].classList.remove(alternateColor);
        ceils[options.current].classList.add(bgColor);
    }

    /* CHANGING TO THE NEW VALUE */
    if (options.searchOption) {
        changeSearchCurrent(options.current);
    } else if (options.filterOption) {
        changeFilterCurrent(options.current);
    } else {
        current = options.current;
    }
}

/* GETTING BG COLOR */
export function getAdminBgColor() {
    const lightMode = "bg-gray-300";
    const darkMode = "dark:bg-gray-700";

    if (document.documentElement.classList.contains("dark")) {
        return darkMode;
    } else {
        return lightMode;
    }
}

/* GETTING ALTERNATE COLOR */
export function getAdminAlternateColor() {
    const lightMode = "bg-white";
    const darkMode = "dark:bg-gray-800";

    if (document.documentElement.classList.contains("dark")) {
        return darkMode;
    } else {
        return lightMode;
    }
}



/* INITIALIZATING PRODUCT´S ARRAY */
export async function paginate() {
    products = await getProducts();
    loadProducts(products, initialIndex, lastIndex, {
        inverse: false,
        searchOptions: false,
        filterOption: false,
    });
}

/* CHANGING PRODUCT´S ARRAY WHEN THE USER DELETES ONE */
export function changeProducts(id: number) {
    products = products.filter((product) => product.id != id);
    return products;
}

/* CHANGING LASTINDEX VALUE */
const enum Operations {
    PLUS = "plus",
    MINUS = "minus",
}
export function changeLastIndex(
    absolute: boolean,
    convertInitial: boolean,
    num?: number,
    operation?: string
) {
    /* DETECTING VALUE */
    if (absolute) {
        lastIndex = products.length;
    } else if (convertInitial) {
        lastIndex = initialIndex - 1;
    } else {
        if (lastIndex == products.length) {
            lastIndex -= 1;
        }
        if (num && operation) {
            switch (operation) {
                case Operations.PLUS:
                    lastIndex += num;
                    break;

                case Operations.MINUS:
                    lastIndex -= num;
                    break;
            }
        }
    }

    return lastIndex;
}