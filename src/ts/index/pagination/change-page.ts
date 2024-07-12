/* CHANGE PAGE FUNCTION */

import { Product } from "../../../components/index-product";
import { calculatePagination } from "./calculate-pagination";
import { estimateCurrentPage, getAlternateColor, getBgColor } from "./estimate-page";

/* OPTIONS */
type ChangePageOptions = {
    next: boolean;
    current: number;
    pages: number;
    sectionsNumber: number;
    arrProduct: Product[];
};

export let pages = 0;
export function changePage(options: ChangePageOptions) {
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
            estimateCurrentPage({
                current: usedPage,
            });
        } else {
            /* IF IT'S A PREVIOUS PAGE */
            let numPage = 0;

            /* IF IT'S A NEGATIVE NUMBER THEN IT SETS IT TO THE FIRST CEIL VALUE */
            if (usedPage == -1) {
                numPage = Number(ceils[0].textContent);
            }
            /* GETTING PREVIOUS PAGE */
            if (usedPage < 0 && numPage > 1) {
                let previousPage = getPreviousPage(numPage);
                calculatePagination({
                    productsLength: options.arrProduct.length,
                    pageNumber: previousPage,
                });
            }
            /* CHANGING USED-PAGE TO A POSITIVE NUMBER */
            if (usedPage < 0) {
                usedPage += 1;
                estimateCurrentPage({
                    current: usedPage,
                    especificPage: numPage - 1,
                });
            } else {
                estimateCurrentPage({
                    current: usedPage,
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

        /* LOADING PAGINATION */
        calculatePagination({
            productsLength: options.arrProduct.length,
            pageNumber: options.pages
        });

        /* ESTIMATING SHOWING AND CURRENT PAGE */
        usedPage = 0;
        estimateCurrentPage({
            current: usedPage,
            especificPage: lastNum + 1,
        });
    }

    /* CHANGING PAGES VALUES */
    changePages(options.pages)
}

/* GETTING PREVIOUS PAGE */
function getPreviousPage(page: number) {
    let num = page - 3;
    /* IF IT'S NEGATIVE */
    if (num <= 0) {
        num = 1;
    }
    return num;
}

/* CHANGING PAGES VALUES */
export function changePages(value: number) {
    pages = value;
    return pages;
}