/* DETECTING PAGINATION WHEN THE USER ADDS OR DELETES A PRODUCT */

import { Product } from "../../../components/product";
import { filterCurrent } from "../filters/filter";
import { searchCurrent } from "../search-box/search";
import { calculatePagination, calculateSections, current, estimateCurrentPage } from "./pagination";

/* OPTIONS */
type DetectPaginationOptions = {
    arrProduct: Product[];
    add: boolean;
    searchOption: boolean;
    filterOption: boolean;
    current: number;
};
export function detectPagination(options: DetectPaginationOptions) {
    /* GETTING BASIC VARIABLES */
    const ceils = Array.from(
        document.querySelectorAll(`a[name="pagination-ceil"]`)
    );
    let currentPageEl = ceils[options.current];

    let sections = calculateSections(options.arrProduct.length);
    let num = Number(currentPageEl?.textContent);

    /* IF IT´S AN ADD PRODUCT EVENT */
    if (options.add) {
        /* GETTING SECTIONS */
        let finalAddNum;
        if (num == sections && num > 4) {
            finalAddNum = num - 4;
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

        /* ESTIMATING PAGINATION */
        calculatePagination({
            productsLength: options.arrProduct.length,
            pageNumber: finalAddNum,
            searchOption: options.searchOption,
            filterOption: options.filterOption,
        });

        /* LOADING CURRENT PAGE */
        loadCurrentPage(num);
    }
    /* IF IT´S A DELETE PRODUCT EVENT */ 
    else {
        /* ESTIMATING NEW SECTIONS */
        if ((sections == num - 1 || sections == num) && num > 4) {
            calculatePagination({
                productsLength: options.arrProduct.length,
                pageNumber: sections - 4,
                searchOption: options.searchOption,
                filterOption: options.filterOption,
            });

            /* LOADING CURRENT PAGE */
            loadCurrentPage(sections);
        } else {
            /* GETTING IF THE PAGE EXISTS ON THE CURRENT CEILS */
            let allow = false;
            if (ceils.length > 2) {
                for (let i = 0; i < 3; i++) {
                    if (Number(ceils[i].textContent) == num) {
                        allow = true;
                    }
                }
            }

            /* GETTING NEW PAGINATION */
            if (allow) {
                /* LOADING PAGINATION */
                calculatePagination({
                    productsLength: options.arrProduct.length,
                    pageNumber: Number(ceils[0].textContent),
                    searchOption: options.searchOption,
                    filterOption: options.filterOption,
                });
            } else {
                if (
                    (options.searchOption && num - 4 < 0) ||
                    (options.filterOption && num - 4 < 0)
                ) {
                    /* LOADING PAGINATION */
                    calculatePagination({
                        productsLength: options.arrProduct.length,
                        pageNumber: 1,
                        searchOption: options.searchOption,
                        filterOption: options.filterOption,
                    });
                } else {
                    /* LOADING PAGINATION */
                    calculatePagination({
                        productsLength: options.arrProduct.length,
                        pageNumber: sections - 4,
                        searchOption: options.searchOption,
                        filterOption: options.filterOption,
                    });
                }
            }

            /* LOADING CURRENT PAGE */
            loadCurrentPage(num);
        }
    }

    /* MAKING MORE EASY TO LOAD ESTIMATE CURRENT PAGE IN AN INTERN WAY */
    function loadCurrentPage(especific: number) {
        /* LOADING NEW PAGE PER OPTIONS */
        if (options.searchOption) {
            estimateCurrentPage({
                current: searchCurrent,
                especificPage: especific,
                searchOption: options.searchOption,
                filterOption: options.filterOption,
            });
        } else if (options.filterOption) {
            estimateCurrentPage({
                current: filterCurrent,
                especificPage: especific,
                searchOption: options.searchOption,
                filterOption: options.filterOption,
            });
        } else {
            estimateCurrentPage({
                current: current,
                especificPage: especific,
                searchOption: options.searchOption,
                filterOption: options.filterOption,
            });
        }
    }
}