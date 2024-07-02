import { Product } from "../../../components/product";
import { getProducts } from "./get-products";
import { calculateShowing } from "./products-showing";
import { updateListProduct } from "../update-product/update-list-product";
import { changeSearchFinalIndex, changeSearchInitIndex } from "../search-box/search";
import { LoadOptions, calcInitLastIndex } from "./calculate-indexs";

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

export function loadProducts(arrProduct: Product[], initIndex:number, finalIndex: number, options: LoadOptions) {
    let values = calcInitLastIndex(arrProduct, initIndex, finalIndex, count, options);
    let init = values.initIndex;
    let final = values.finalIndex;

    /* IF IT'S SEARCH OPTIONS, CHANGE THE OTHER INDEXS */
    if (options.searchOptions) {
        changeSearchInitIndex(init);
    }else{
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
        calculatePagination(arrProduct.length, 1);
    }
    /* SHOWING RESULTS */
    calculateShowing(init, arrProduct);
    if (one == 0) {
        estimateCurrentPage();
        one++;
    }

    /* CHANGING LAST INDEXS */
    if (options.searchOptions) {
        changeSearchFinalIndex(final);
    }else{
        lastIndex = final;
    }
}

/* IT ESTIMATES THE FINAL COMPONENT THAT THE USER IS SEEING */
const tableNavigation = document.getElementById("table-navigation") as HTMLElement;
const showing = tableNavigation.innerHTML;
export let sectionsNumber: number;

function calculatePagination(
    productsLength: number,
    pageNumber: number
) {
    sectionsNumber = calculateSections(productsLength);
    tableNavigation.innerHTML =
        `${showing}` + loadPagination(sectionsNumber, pageNumber);
    addEvents();
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
let current = 0;
export function estimateCurrentPage(especificPage?: number) {
    const bgColor = getBgColor();
    const alternateColor = getAlternateColor();
    const ceils = Array.from(
        document.querySelectorAll(`a[name="pagination-ceil"]`)
    );

    if (especificPage) {
        for (const ceil of ceils) {
            if (Number(ceil.textContent) === especificPage) {
                ceil.classList.remove(alternateColor);
                ceil.classList.add(bgColor);
                current = ceils.indexOf(ceil);
            }
        }
    } else {
        ceils[current].classList.remove(alternateColor);
        ceils[current].classList.add(bgColor);
    }
}

/* GETTING BG COLOR */
function getBgColor() {
    const lightMode = "bg-gray-300";
    const darkMode = "dark:bg-gray-700";
    const preferences = localStorage.getItem("color-theme");

    return preferences == "dark" ? darkMode : lightMode;
}

/* GETTING ALTERNATE COLOR */
function getAlternateColor() {
    const lightMode = "bg-white";
    const darkMode = "dark:bg-gray-800";
    const preferences = localStorage.getItem("color-theme");

    return preferences == "dark" ? darkMode : lightMode;
}

/* ADDING EVENTS TO PREVIOUS AND NEXT ELEMENT */
function addEvents() {
    const previusEl = document.getElementById("previous-page") as HTMLElement;
    const nextEl = document.getElementById("next-page") as HTMLElement;

    previusEl.addEventListener("click", previousPage);
    nextEl.addEventListener("click", nextPage);
}

/* INITIALIZATING PRODUCT´S ARRAY */
export async function paginate() {
    products = await getProducts();
    loadProducts(products, initialIndex, lastIndex, { inverse: false });
    return;
}

/* CHANGING PRODUCT´S ARRAY WHEN THE USER DELETES ONE */
export function changeProducts(name: string) {
    products = products.filter(product => product.name != name);
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
function previousPage() {
    const containers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    containers.forEach((el) => el.remove());

    loadProducts(products, initialIndex, lastIndex, { inverse:true });
    changePage(false);
}

/* CHANGING TO A NEXT PAGE */
function nextPage() {
    const containers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    containers.forEach((el) => el.remove());

    loadProducts(products, initialIndex, lastIndex, { inverse:false });
    changePage(true);
}

/* CHANGE PAGE FUNCTION */
let pages = 0;
function changePage(next: boolean) {
    const ceils = document.querySelectorAll(`a[name="pagination-ceil"]`);
    const bgColor = getBgColor();
    const alternateColor = getAlternateColor();
    let lastNum = Number(ceils[current].textContent);

    ceils[current].classList.remove(bgColor);
    ceils[current].classList.add(alternateColor);
    current = next ? current + 1 : current - 1;
    current = current == ceils.length ? current - 1 : current;

    if (current < 3 || !document.getElementById("pagination-dots")) {
        if (next) {
            if (ceils[current].textContent == String(sectionsNumber)) {
                ceils[current].classList.remove(bgColor);
                ceils[current].classList.add(alternateColor);
                current = ceils.length - 1;
            }
            estimateCurrentPage();
        } else {
            let numPage = 0;

            if (current == -1) {
                numPage = Number(ceils[0].textContent);
            }
            if (current < 0 && numPage > 1) {
                let previousPage = getPreviousPage(numPage);
                calculatePagination(products.length, previousPage);
                calculateShowing(initialIndex, products);
            }
            if (current < 0) {
                current += 1;
                estimateCurrentPage(numPage - 1);
            }else{
                estimateCurrentPage();
            }
        }
    } else {
        if (sectionsNumber > 5 && sectionsNumber - lastNum  > 5) {
            pages = lastNum + 1;
        }else{
            pages = sectionsNumber - 4;
        }
        calculatePagination(products.length, pages);
        calculateShowing(initialIndex, products);
        current = 0;
        estimateCurrentPage(lastNum + 1);
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
export function detectPagination(add:boolean) {
    const ceils = Array.from(
        document.querySelectorAll(`a[name="pagination-ceil"]`)
    );
    let currentPageEl = ceils[current];

    let sections = calculateSections(products.length);
    let num = Number(currentPageEl?.textContent);
    if (add) {
        if (num == sections) {
            calculatePagination(products.length, num - 4);
            estimateCurrentPage(num);
        }else if ((num + 1) == sections) {
            calculatePagination(products.length, num - 3);
            estimateCurrentPage(num);
        }else if((num + 2) == sections){
            calculatePagination(products.length, num - 2);
            estimateCurrentPage(num);
        }else if((num + 3) == sections){
            calculatePagination(products.length, num - 1);
            estimateCurrentPage(num);
        }else if((num + 4) == sections){
            calculatePagination(products.length, num);
            estimateCurrentPage(num);
        }else{
            calculatePagination(products.length, num);
            estimateCurrentPage(num);
        }
    }else{
        if (sections == num - 1 || sections == num) {
            calculatePagination(products.length, sections - 4);
            estimateCurrentPage(sections);
        }else{
            let allow = false;
            for (let i = 0; i < 3; i++) {
                if (Number(ceils[i].textContent) == num) {
                    allow = true;
                }
            }

            if (allow) {
                calculatePagination(products.length, Number(ceils[0].textContent));
                estimateCurrentPage(num);
            }else{
                calculatePagination(products.length, sections - 4);
                estimateCurrentPage(num);
            }
        }
    }
}
