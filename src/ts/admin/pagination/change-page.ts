import { Product } from "../../../components/product";
import { changeFilterPagesNumber } from "../filters/filter";
import { changeSearchPagesNumber } from "../search-box/search";
import { calculatePagination, estimateCurrentPage, getAdminAlternateColor, getAdminBgColor } from "./pagination";
import { calculateShowing } from "./products-showing";

/* CHANGE PAGE FUNCTION */
/* OPTIONS */
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

export let pages = 0;
export function changePage(options: ChangePageOptions) {
    /* VARS */
    const ceils = document.querySelectorAll(`a[name="pagination-ceil"]`);
    const bgColor = getAdminBgColor();
    const alternateColor = getAdminAlternateColor();
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
                searchOption: options.searchOption,
                filterOption: options.filterOption,
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
                    searchOption: options.searchOption,
                    filterOption: options.filterOption,
                });
                calculateShowing(options.init, options.arrProduct);
            }
            /* CHANGING USED-PAGE TO A POSITIVE NUMBER */
            if (usedPage < 0) {
                usedPage += 1;
                estimateCurrentPage({
                    current: usedPage,
                    especificPage: numPage - 1,
                    searchOption: options.searchOption,
                    filterOption: options.filterOption,
                });
            } else {
                estimateCurrentPage({
                    current: usedPage,
                    searchOption: options.searchOption,
                    filterOption: options.filterOption,
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

        /* LOADING PAGINATION ACCORDING TO THE OPTIONS */
        if (options.searchOption) {
            calculatePagination({
                productsLength: options.arrProduct.length,
                pageNumber: options.pages,
                searchOption: true,
                filterOption: false,
            });
        } else if (options.filterOption) {
            calculatePagination({
                productsLength: options.arrProduct.length,
                pageNumber: options.pages,
                searchOption: false,
                filterOption: true,
            });
        } else {
            calculatePagination({
                productsLength: options.arrProduct.length,
                pageNumber: options.pages,
                searchOption: false,
                filterOption: false,
            });
        }

        /* ESTIMATING SHOWING AND CURRENT PAGE */
        calculateShowing(options.init, options.arrProduct);
        usedPage = 0;
        estimateCurrentPage({
            current: usedPage,
            especificPage: lastNum + 1,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });
    }

    /* CHANGING PAGES VALUES */
    if (options.searchOption) {
        changeSearchPagesNumber(options.pages);
    } else if (options.filterOption) {
        changeFilterPagesNumber(options.pages);
    } else {
        changePages(options.pages)
    }
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