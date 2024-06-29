import { Product } from "../../../components/product";
import { getProducts } from "./getProducts";
import { calculateShowing } from "./productsShowing";
import { updateListProduct } from "./updateListProduct";

/* LOAD PRODUCTS FUNCTION */
export let products:Product[];
export let lastIndex = 0;
export let initialIndex: any;
let count = 0;

export function loadProducts(inverse: boolean, deleteBackOption?: boolean) {
    if (count == 6) {
        initialIndex = inverse ? lastIndex - 11: lastIndex + 1;
        lastIndex = inverse ? lastIndex - 12: lastIndex;
    }else if(deleteBackOption){
        initialIndex = inverse ? products.length - 5 : lastIndex + 1;
        lastIndex = inverse ? products.length - 6 : lastIndex;
    }else{
        initialIndex = inverse ? (lastIndex + 1) - (6 + count): lastIndex + 1;
        lastIndex = inverse ? lastIndex - (6 + count): lastIndex;
    }

    if (initialIndex <= 0) {
        initialIndex = 1;
        lastIndex = 0;
    } else if(lastIndex == products.length && !inverse) {
        initialIndex = (lastIndex + 1) - count;
        lastIndex = lastIndex - count;
    }

    count = 0;

    for (let i = 0; i < 6; i++) {
        if (products[lastIndex]) {
            updateListProduct(products[lastIndex]);
            lastIndex++;
            count++;
        }
    }

    calculatePagination(products.length);
    calculateShowing(initialIndex, products);
    estimateCurrentPage();
}

/* IT ESTIMATES THE FINAL COMPONENTE THAT THE USER IS SEEING */
const tableNavigation = document.getElementById(
    "table-navigation"
) as HTMLElement;
const showing = tableNavigation.innerHTML;
function calculatePagination(productsLength: number) {
    const sectionsNumber = calculateSections(productsLength);
    tableNavigation.replaceChildren();
    tableNavigation.innerHTML =
        `${showing}` + loadPagination(sectionsNumber);
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
function generateMultipleCeils(num: number) {
    let finalString = ``;
    for (let i = 1; i <= num; i++) {
        if (num <= 4) {
            finalString += generateCeil(i);
        } else {
            if (i <= 3) {
                finalString += generateCeil(i);
            } else if (i == 4) {
                finalString += dots;
            } else if (i == num) {
                finalString += generateCeil(i);
            }
        }
    }

    return finalString;
}

function loadPagination(num: number) {
    const ul = `<ul class="inline-flex items-stretch -space-x-px">
    ${previous}
    ${generateMultipleCeils(num)}
    ${next}
    </ul>`;

    return ul;
}

function calculateSections(length: number) {
    const num = length / 6;
    if (/\.\d+/.test(String(num))) {
        return Math.floor(num) + 1;
    } else {
        return num;
    }
}

/* ELEMENTS */

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
                    <a class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white select-none">...</a>
                </li>`;

function estimateCurrentPage() {
    const bgColor = getBgColor();
    const ceils = document.querySelectorAll(`a[name="pagination-ceil"]`);
    const currentPage = getCurrentPage(ceils, bgColor);

    if (bgColor == "dark:bg-gray-700") {
        ceils[currentPage].classList.remove("dark:bg-gray-800");
        ceils[currentPage].classList.add(bgColor);
    } else {
        ceils[currentPage].classList.remove("bg-white");
        ceils[currentPage].classList.add(bgColor);
    }
}

function getBgColor() {
    const lightMode = "bg-slate-300";
    const darkMode = "dark:bg-gray-700";
    const preferences = localStorage.getItem("color-theme");

    return preferences == "dark" ? darkMode : lightMode;
}

function getCurrentPage(nodes: NodeListOf<Element>, bgColor: string) {
    let current = 0;
    let index = 0;
    for (let node of nodes) {
        if (node.classList.contains(bgColor)) {
            current = index;
            break;
        }
        index++;
    }

    return current;
}

function addEvents() {
    const previusEl = document.getElementById("previous-page") as HTMLElement;
    const nextEl = document.getElementById("next-page") as HTMLElement;

    previusEl.addEventListener("click", previousPage);

    nextEl.addEventListener("click", nextPage);

    function previousPage() {
        const containers  = document.querySelectorAll(`tr[name="product-container"]`);
        containers.forEach(el => el.remove());

        loadProducts(true);
    }

    function nextPage() {
        const containers  = document.querySelectorAll(`tr[name="product-container"]`);
        containers.forEach(el => el.remove());

        loadProducts(false);
    }
}

export async function paginate() {
    products = await getProducts();
    loadProducts(false);
    return;
}

export function changeProducts(name: string) {
    products = products.filter(product => product.name != name);
    return products;
}

const enum Operations{
    PLUS = "plus",
    MINUS = "minus",
}
export function changeLastIndex(absolute: boolean,convertInitial:boolean,num?: number, operation?: string) {
    if (absolute) {
        lastIndex = products.length;
    }else if (convertInitial) {
        lastIndex = initialIndex -1;
    }else{
        if (lastIndex == products.length) {
            lastIndex-=1;
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