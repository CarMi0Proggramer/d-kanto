import { Product } from "../../components/product";
import { updateListProduct } from "./updateListProduct";

async function getProducts() {
    let products: Product[] = await fetch("http://localhost:3000/products/")
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                return data;
            } else if (res.status === 404) {
                location.href = window.origin + "/src/pages/404.html";
            } else {
                location.href = window.origin + "/src/pages/500.html";
            }
        })
        .catch((err) => {
            if (err) {
                location.href = window.origin + "/src/pages/500.html";
            }
        });

    totalProductsSpan.innerText = String(products.length);
    return products;
}

const totalProductsSpan = document.getElementById(
    "total-products-quantity"
) as HTMLSpanElement;

/* LOAD PRODUCTS FUNCTION */
const products = await getProducts();
let lastIndex = 0;

export function loadProducts() {
    const initialIndex = lastIndex + 1;
    for (let i = 0; i < 6; i++) {
        if (products[lastIndex]) {
            updateListProduct(products[lastIndex]);
            lastIndex++;
        }
    }

    calculateShowing(initialIndex, products);
    calculatePagination(products.length);
    estimateCurrentPage();
}

/* CALCULATING THE NUMBER OF PRODUCTS THAT IT HAS BEEN SHOWED */
const productsShowing = document.getElementById(
    "products-showing"
) as HTMLHeadingElement;
const showingTooltip = document.getElementById(
    "results-tooltip"
) as HTMLDivElement;
const tooltipArrow = document.getElementById("tooltip-arrow") as HTMLDivElement;
const showingBelowRange = document.getElementById(
    "products-showing-below-range"
) as HTMLSpanElement;
const showingBelowQuantity = document.getElementById(
    "products-showing-below-quantity"
) as HTMLSpanElement;

/* THE NUMBER OF PRODUCTS THAT THE USER IS SEEING */
function calculateShowing(index: number, products: Product[]) {
    if (index + 5 <= products.length) {
        productsShowing.innerText = `${index}-${index + 5} (${
            products.length
        })`;
        showingTooltip.innerText = `Showing ${index}-${index + 5} of ${
            products.length
        } results`;
        showingBelowRange.innerText = `${index}-${index + 5}`;
    } else {
        productsShowing.innerText = `${index}-${products.length} (${products.length})`;
        showingTooltip.textContent = `Showing ${index}-${products.length} of ${products.length} results`;
        showingBelowRange.innerText = `${index}-${products.length}`;
    }

    showingTooltip.appendChild(tooltipArrow);
    showingBelowQuantity.innerText = String(products.length);
}

/* IT ESTIMATES THE FINAL COMPONENTE THAT THE USER IS SEEING */
function calculatePagination(productsLength: number) {
    const tableNavigation = document.getElementById("table-navigation") as HTMLElement;
    const sectionsNumber = calculateSections(productsLength);
    tableNavigation.innerHTML = `${tableNavigation.innerHTML}` + loadPagination(sectionsNumber);
}

/* GENERATING A CONTAINER WITH ITS CORRECT NUMBER */
function generateCeil(num: number) {
    const ceilNumber = `<li>
                            <a href="#" name="pagination-ceil"
                            class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${num}</a>
                        </li>`;
    return ceilNumber;
}

/* ESTIMATING ALL THE CONTAINERS IT WOULD BE SHOWN */
function generateMultipleCeils(num: number) {
    let finalString = ``;
    for (let i = 1; i <= num; i++) {
        if (num <= 4) {
            finalString+= generateCeil(i);
        }else{
            if (i <=3) {
                finalString+= generateCeil(i);
            }else if(i == 4){
                finalString += dots;
            }else if (i == num) {
                finalString+= generateCeil(i);
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
        return (Math.floor(num) + 1);
    }else {
        return num;
    }
}

/* ELEMENTS */

const previous = `<li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>`;
const next = `<li>
                    <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </li>`;
const dots = `<li>
                    <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                </li>`;

function estimateCurrentPage() {
    const bgColor = getBgColor();
    const ceils = document.querySelectorAll(`a[name="pagination-ceil"]`);
    const currentPage = getCurrentPage(ceils, bgColor);
    
    if (bgColor == "dark:bg-gray-700") {
        ceils[currentPage].classList.remove("dark:bg-gray-800");
        ceils[currentPage].classList.add(bgColor);
    }else{
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