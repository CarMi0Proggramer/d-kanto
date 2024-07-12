import { CalcIndexsOptions, calcInitLastIndex } from "./calculate-indexs";
import { calculatePagination } from "./calculate-pagination";
import { current, estimateCurrentPage } from "./estimate-page";
import { updateListProduct } from "./update-list";

/* SOME VARIABLES */
export let lastIndex = 0;
export let count = 0;
let one = 0;

/* LOADING PRODUCTS */
export function loadProducts(
    options: CalcIndexsOptions
) {
    /* GETTING INDEXS */
    let value = calcInitLastIndex({
        arrProduct: options.arrProduct,
        index: options.index,
        counter: options.counter,
        inverse: options.inverse
    });
    let init = value;

    /* RESTARTING COUNTER */
    count = 0;

    /* LOAD SIX PRODUCTS */
    for (let i = 0; i < 6; i++) {
        if (options.arrProduct[init]) {
            updateListProduct(options.arrProduct[init]);
            init++;
            count++;
        }
    }

    /* FIRST PAGINATION */
    if (one == 0) {
        calculatePagination({
            productsLength: options.arrProduct.length,
            pageNumber: 1
        });
    }
    /* SHOWING RESULTS */
    if (one == 0) {
        estimateCurrentPage({ current: current });
        one++;
    }

    /* CHANGING LAST INDEX */
    lastIndex = init;
}