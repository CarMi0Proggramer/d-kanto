import { Product } from "../../../components/product";
import { getProducts } from "./get-products";
import { calculateShowing } from "./products-showing";
import { updateListProduct } from "../update-product/update-list-product";
import {
    changeSearchCurrent,
    changeSearchFinalIndex,
    changeSearchInitIndex,
    changeSearchPagesNumber,
    finalIndex,
    initIndex,
    searchCurrent,
    searchMatches,
    searchPages,
    searchSections,
} from "../search-box/search";
import { LoadOptions, calcInitLastIndex } from "./calculate-indexs";
import { changeFilterCurrent, changeFilterFinalIndex, changeFilterInitIndex, changeFilterPagesNumber, filterCurrent, filterInit, filterLast, filterMatches, filterPages, filterSections } from "../filters/filter";

/* ELEMENT STRINGS */
const previous = `<li>
                        <a id="previous-page" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>`;
const next = `<li>
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

/* LOAD PRODUCTS FUNCTION */
export let products: Product[];
export let lastIndex = 0;
export let initialIndex: number;
export let count = 0;
let one = 0;

export function loadProducts(
    arrProduct: Product[],
    initIndex: number,
    finalIndex: number,
    options: LoadOptions
) {
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
    }else if(options.filterOption){
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
            filterOption: options.filterOption
        });
    }
    /* SHOWING RESULTS */
    calculateShowing(init, arrProduct);
    if (one == 0) {
        if (options.searchOptions) {
            estimateCurrentPage({ current: searchPages, searchOption: options.searchOptions, filterOption: options.filterOption });
        }else if(options.filterOption){
            estimateCurrentPage({ current: filterCurrent, searchOption: options.searchOptions, filterOption: options.filterOption})
        } else {
            estimateCurrentPage({ current: current, searchOption: options.searchOptions, filterOption: options.filterOption });
        }
        one++;
    }

    /* CHANGING LAST INDEXS */
    if (options.searchOptions) {
        changeSearchFinalIndex(final);
    }else if(options.filterOption){
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

type CalculatePaginationOptions = {
    productsLength: number;
    pageNumber: number;
    searchOption: boolean;
    filterOption: boolean
};
export function calculatePagination(options: CalculatePaginationOptions) {
    sectionsNumber = calculateSections(options.productsLength);
    tableNavigation.innerHTML =
        `${showing}` + loadPagination(sectionsNumber, options.pageNumber);
    addEvents({ searchOption: options.searchOption, filterOption: options.filterOption });
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
export let current = 0;
type EstimatePageOptions = {
    current: number;
    searchOption: boolean;
    filterOption: boolean;
    especificPage?: number;
};
export function estimateCurrentPage(options: EstimatePageOptions) {
    const bgColor = getBgColor();
    const alternateColor = getAlternateColor();
    const ceils = Array.from(
        document.querySelectorAll(`a[name="pagination-ceil"]`)
    );

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

    if (options.searchOption) {
        changeSearchCurrent(options.current);
    } else if(options.filterOption) {
        changeFilterCurrent(options.current);
    } else {
        current = options.current;
    }
}

/* GETTING BG COLOR */
function getBgColor() {
    const lightMode = "bg-gray-300";
    const darkMode = "dark:bg-gray-700";
    
    if (document.documentElement.classList.contains("dark")) {
        return darkMode;
    }else{
        return lightMode;
    }
}

/* GETTING ALTERNATE COLOR */
function getAlternateColor() {
    const lightMode = "bg-white";
    const darkMode = "dark:bg-gray-800";

    if (document.documentElement.classList.contains("dark")){
        return darkMode;
    }else{
        return lightMode
    }
}

/* ADDING EVENTS TO PREVIOUS AND NEXT ELEMENT */
type PaginationOptions = {
    searchOption: boolean;
    filterOption: boolean;
};
function addEvents(options: PaginationOptions) {
    const previusEl = document.getElementById("previous-page") as HTMLElement;
    const nextEl = document.getElementById("next-page") as HTMLElement;

    /* DUE TO THE PAGINATION COMPONENT IT'S CREATED AGAIN WHEN THERE'S ANY OF THIS OPTIONS, I NEED TO ADD THE EVENTS AGAIN */
    if (options.searchOption) {
        previusEl.addEventListener("click", () => previousPage(options));
        nextEl.addEventListener("click", () => nextPage(options));
    } else if(options.filterOption) {
        previusEl.addEventListener("click", () => previousPage(options));
        nextEl.addEventListener("click", () => nextPage(options));
    } else {
        previusEl.addEventListener("click", () => previousPage(options));
        nextEl.addEventListener("click", () => nextPage(options));
    }
}

/* INITIALIZATING PRODUCT´S ARRAY */
export async function paginate() {
    products = await getProducts();
    loadProducts(products, initialIndex, lastIndex, { inverse: false, searchOptions: false, filterOption: false });
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

/* CHANGING TO A PREVIOUS PAGE */
function previousPage(options: PaginationOptions) {
    const containers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    containers.forEach((el) => el.remove());

    if (options.searchOption) {
        loadProducts(searchMatches, initIndex, finalIndex, { inverse: true, searchOptions: true, filterOption: false });
        changePage({
            next: false,
            init: initIndex,
            final: finalIndex,
            current: searchCurrent,
            pages: searchPages,
            sectionsNumber: searchSections,
            arrProduct: searchMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });
    } else if(options.filterOption) {
        loadProducts(filterMatches, filterInit, filterLast, { inverse: true, searchOptions: false, filterOption: true });
        changePage({
            next: false,
            init: filterInit,
            final: filterLast,
            current: filterCurrent,
            pages: filterPages,
            sectionsNumber: filterSections,
            arrProduct: filterMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });
    } else {
        loadProducts(products, initialIndex, lastIndex, { inverse: true, searchOptions: false, filterOption: false });
        changePage({
            next: false,
            init: initialIndex,
            final: lastIndex,
            current: current,
            pages: pages,
            sectionsNumber: sectionsNumber,
            arrProduct: products,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });
    }
}

/* CHANGING TO A NEXT PAGE */
function nextPage(options: PaginationOptions) {
    const containers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    containers.forEach((el) => el.remove());

    if (options.searchOption) {
        loadProducts(searchMatches, initIndex, finalIndex, { inverse: false, searchOptions: true, filterOption: false });
        changePage({
            next: true,
            init: initIndex,
            final: finalIndex,
            current: searchCurrent,
            pages: searchPages,
            sectionsNumber: searchSections,
            arrProduct: searchMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });
    } else if(options.filterOption){
        loadProducts(filterMatches, filterInit, filterLast, { inverse: false, searchOptions: false, filterOption: true });
        changePage({
            next: true,
            init: filterInit,
            final: filterLast,
            current: filterCurrent,
            pages: filterPages,
            sectionsNumber: filterSections,
            arrProduct: filterMatches,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });
    } else {
        loadProducts(products, initialIndex, lastIndex, { inverse: false, searchOptions: false, filterOption: false });
        changePage({
            next: true,
            init: initialIndex,
            final: lastIndex,
            current: current,
            pages: pages,
            sectionsNumber: sectionsNumber,
            arrProduct: products,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });
    }
}

/* CHANGE PAGE FUNCTION */
type ChangePageOptions = {
    next: boolean;
    init: number;
    final: number;
    current: number;
    pages: number;
    sectionsNumber: number;
    arrProduct: Product[];
    searchOption: boolean;
    filterOption: boolean;
};

let pages = 0;
function changePage(options: ChangePageOptions) {
    /* VARS */
    const ceils = document.querySelectorAll(`a[name="pagination-ceil"]`);
    const bgColor = getBgColor();
    const alternateColor = getAlternateColor();
    let usedPage = options.current;
    let lastNum = Number(ceils[usedPage].textContent);

    /* REMOVING CURRENT PAGE */
    ceils[usedPage].classList.remove(bgColor);
    ceils[usedPage].classList.add(alternateColor);
    /* NEXT OR PREVIOUS PAGE */
    usedPage = options.next ? usedPage + 1 : usedPage - 1;
    usedPage = usedPage == ceils.length ? usedPage - 1 : usedPage;

    /* IF A NEW PAGINATION NEEDS TO BE LOADED */
    if (usedPage < 3 || !document.getElementById("pagination-dots")) {
        /* IF IT'S A NEXT PAGE */
        if (options.next) {
            /* SETTING BG COLOR */
            if (ceils[usedPage].textContent == String(options.sectionsNumber)) {
                ceils[usedPage].classList.remove(bgColor);
                ceils[usedPage].classList.add(alternateColor);
                usedPage = ceils.length - 1;
            }
            estimateCurrentPage({ current: usedPage, searchOption: options.searchOption, filterOption: options.filterOption });
        } else {
            /* IF IT'S A PREVIOUS PAGE */
            let numPage = 0;

            if (usedPage == -1) {
                numPage = Number(ceils[0].textContent);
            }
            if (usedPage < 0 && numPage > 1) {
                let previousPage = getPreviousPage(numPage);
                calculatePagination({
                    productsLength: options.arrProduct.length,
                    pageNumber: previousPage,
                    searchOption: options.searchOption,
                    filterOption: options.filterOption
                });
                calculateShowing(options.init, options.arrProduct);
            }
            if (usedPage < 0) {
                usedPage += 1;
                estimateCurrentPage({
                    current: usedPage,
                    especificPage: numPage - 1,
                    searchOption: options.searchOption,
                    filterOption: options.filterOption
                });
            } else {
                estimateCurrentPage({
                    current: usedPage,
                    searchOption: options.searchOption,
                    filterOption: options.filterOption
                });
            }
        }
    } else {
        /* CALCULATING A NEW PAGINATION */
        if (
            options.sectionsNumber > 5 &&
            options.sectionsNumber - lastNum > 5
        ) {
            options.pages = lastNum + 1;
        } else {
            options.pages = options.sectionsNumber - 4;
        }

        if (options.searchOption) {
            calculatePagination({
                productsLength: options.arrProduct.length,
                pageNumber: options.pages,
                searchOption: true,
                filterOption: false
            });
        }else if(options.filterOption){
            calculatePagination({
                productsLength: options.arrProduct.length,
                pageNumber: options.pages,
                searchOption: false,
                filterOption: true
            });
        } else {
            calculatePagination({
                productsLength: options.arrProduct.length,
                pageNumber: options.pages,
                searchOption: false,
                filterOption: false
            });
        }

        calculateShowing(options.init, options.arrProduct);
        usedPage = 0;
        estimateCurrentPage({
            current: usedPage,
            especificPage: lastNum + 1,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });
    }

    /* CHANGING PAGES VALUES */
    if (options.searchOption) {
        changeSearchPagesNumber(options.pages);
    }else if(options.filterOption){
        changeFilterPagesNumber(options.pages);
    } else {
        pages = options.pages;
    }
}

function getPreviousPage(page: number) {
    let num = page - 3;
    if (num <= 0) {
        num = 1;
    }
    return num;
}

/* DETECTING PAGINATION WHEN THE USER ADDS OR DELETES A PRODUCT */
type DetectPaginationOptions = {
    arrProduct: Product[]
    add: boolean;
    searchOption: boolean;
    filterOption: boolean;
    current: number;
};
export function detectPagination(options: DetectPaginationOptions) {
    const ceils = Array.from(
        document.querySelectorAll(`a[name="pagination-ceil"]`)
    );
    let currentPageEl = ceils[options.current];

    let sections = calculateSections(options.arrProduct.length);
    let num = Number(currentPageEl?.textContent);
    if (options.add) {
        let finalAddNum;
        if (num == sections && num > 4) {
            finalAddNum = num - 4
        } else if (num + 1 == sections && num > 3) {
            finalAddNum = num - 3;
        } else if (num + 2 == sections && num > 2) {
            finalAddNum = num - 2;
        } else if (num + 3 == sections && num > 1) {
            finalAddNum = num - 1;
        } else if (num + 4 == sections && num > 0) {
            finalAddNum = num;
        } else {
            finalAddNum = num;
        }

        calculatePagination({
            productsLength: options.arrProduct.length, pageNumber: finalAddNum,
            searchOption: options.searchOption,
            filterOption: options.filterOption
        });

        loadCurrentPage()

    } else {
        if ((sections == num - 1 || sections == num) && num > 4) {
            calculatePagination({ productsLength: options.arrProduct.length, pageNumber: sections - 4, searchOption: options.searchOption, filterOption: options.filterOption});

            loadCurrentPage();
        } else {
            let allow = false;
            if (ceils.length > 2) {
                for (let i = 0; i < 3; i++) {
                    if (Number(ceils[i].textContent) == num) {
                        allow = true;
                    }
                }
            }

            if (allow) {
                calculatePagination({ 
                    productsLength: options.arrProduct.length,
                    pageNumber: Number(ceils[0].textContent),
                    searchOption: options.searchOption,
                    filterOption: options.filterOption
                });
            } else {
                if ((options.searchOption && num - 4 < 0) || (options.filterOption && num - 4 < 0)) {
                    calculatePagination({ productsLength: options.arrProduct.length, pageNumber: 1, searchOption: options.searchOption, filterOption: options.filterOption});
                }else{
                    calculatePagination({ productsLength: options.arrProduct.length, pageNumber: sections - 4, searchOption: options.searchOption, filterOption: options.filterOption});
                }
            }

            loadCurrentPage();
        }
    }

    /* MAKING MORE EASY TO LOAD ESTIMATE CURRENT PAGE IN AN INTERN WAY */
    function loadCurrentPage() {
        if (options.searchOption) {
            estimateCurrentPage({
                current: searchCurrent,
                especificPage: num,
                searchOption: options.searchOption,
                filterOption: options.filterOption
            });
        }else if (options.filterOption) {
            estimateCurrentPage({
                current: filterCurrent,
                especificPage: num,
                searchOption: options.searchOption,
                filterOption: options.filterOption
            });
        }else{
            estimateCurrentPage({
                current: current,
                especificPage: num,
                searchOption: options.searchOption,
                filterOption: options.filterOption
            });
        }
    }
}
