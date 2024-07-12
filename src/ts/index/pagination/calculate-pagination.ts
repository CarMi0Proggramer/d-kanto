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

/* IT ESTIMATES THE FINAL COMPONENT THAT THE USER IS SEEING */
const paginationContainer = document.getElementById(
    "pagination-container"
) as HTMLElement;
export let sectionsNumber: number;

/* CALCULATE PAGINATION OPTIONS */
type CalculatePaginationOptions = {
    productsLength: number;
    pageNumber: number;
};

/* ESTIMATING PAGINATION */
export function calculatePagination(options: CalculatePaginationOptions) {
    /* GETTING SECTIONS NUMBER */
    sectionsNumber = calculateSections(options.productsLength);
    /* SETTING PAGINATION */
    paginationContainer.innerHTML = loadPagination(sectionsNumber, options.pageNumber);
    /* ADDING EVENTS */
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