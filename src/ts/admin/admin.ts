/* IMPORTS */
import { createProductForm } from "./add-product/add-product";
import { updateProduct } from "./edit-product/edit-product";
import { clearFilters, filter, filterCurrent, filterInit, filterLast, filterMatches } from "./filters/filter";
import {
    calculatePagination,
    current,
    estimateCurrentPage,
    initialIndex,
    lastIndex,
    loadProducts,
    paginate,
    products,
} from "./pagination/pagination";
import { calculateShowing } from "./pagination/products-showing";
import { finalIndex, initIndex, searchCurrent, searchMatches, searchProduct } from "./search-box/search";

/* CREATING PRODUCT */
const buttonsContainer = document.getElementById(
    "buttons-container"
) as HTMLDivElement;
const formAddProduct = document.getElementById("add-product-form");

if (formAddProduct instanceof HTMLFormElement) {
    formAddProduct.addEventListener("submit", async (event) => {
        event.preventDefault();
        /* OPTIONS IN LOCALSTORAGE */
        const searchOption: {
            option: boolean
        } = JSON.parse(localStorage.getItem("search-option") as string);
        const filterOption: {
            option: boolean
        } = JSON.parse(localStorage.getItem("filter-option") as string);
        /* ANALYZING OPTIONS */
        if (searchOption.option) {
            createProductForm(formAddProduct, buttonsContainer, {
                searchOption: true,
                initIndex: initIndex,
                finalIndex: finalIndex,
                arrProduct: searchMatches,
                filterOption: false
            });
        }else if(filterOption.option){
            createProductForm(formAddProduct, buttonsContainer, {
                searchOption: false,
                initIndex: filterInit,
                finalIndex: filterLast,
                arrProduct: filterMatches,
                filterOption: true
            });
        } else{
            createProductForm(formAddProduct, buttonsContainer, {
                searchOption: false,
                initIndex: initialIndex,
                finalIndex: lastIndex,
                arrProduct: products,
                filterOption: false
            });
        }
    });
}

/* EDITING PRODUCTS */
const editForm = document.getElementById(
    "drawer-update-product"
) as HTMLFormElement;

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    updateProduct(editForm);
});

/* PRODUCTS PAGINATION */
window.addEventListener("load", () => {
    paginate();

    /* SETTING OPTIONS */
    localStorage.setItem("search-option", JSON.stringify({
        'option': false
    }))
    localStorage.setItem("filter-option", JSON.stringify({
        'option': false
    }));

    /* CHANGING BG COLOR WHEN TOUCHES THEME ICON */
    const iconTheme = document.getElementById(
        "theme-toggle"
    ) as HTMLButtonElement;
    iconTheme.addEventListener("click", () => {
        /* GETTING OPTIONS */
        let filterOption: {
            option: boolean
        } = JSON.parse(localStorage.getItem("filter-option") as string);
        let searchOption: {
            option: boolean
        } = JSON.parse(localStorage.getItem("search-option") as string);
        /* ESTIMATING PER OPTION */
        if (filterOption.option) {
            estimateCurrentPage({ current: filterCurrent, searchOption: false, filterOption: true });
        }else if(searchOption.option) {
            estimateCurrentPage({ current: searchCurrent, searchOption: true, filterOption: false });
        } else{
            estimateCurrentPage({ current: current, searchOption: false, filterOption: false });
        }
    });
});

/* SEARCH SECTION */
const searchInput = document.getElementById(
    "simple-search"
) as HTMLInputElement;
searchInput.addEventListener("input", () => {
    if (searchInput.value != "") {
        searchProduct(searchInput);
    } else {
        restartProducts();
        localStorage.setItem("search-option", JSON.stringify({
            'option': false
        }))
    }

    /* clearing filters */
    clearFilters();
});

/* IF THE USER DOESN'T SEARCH ANYTHING */
function restartProducts() {
    /* deleting elements */
    const containers = document.querySelectorAll(`tr[name="product-container"]`);
    containers.forEach(el => el.remove());
    /* loading products */
    loadProducts(products, 1, 0, {
        inverse: false,
        searchOptions: false,
        filterOption: false
    });
    calculatePagination({ productsLength: products.length, pageNumber: 1, searchOption: false, filterOption: false});
    calculateShowing(1, products);
    estimateCurrentPage({ current: 0 ,searchOption: false, filterOption: false });
}

/* FILTERING PRODUCTS */
const filterSave = document.getElementById("filter-save-view") as HTMLLinkElement;
const filterClear = document.getElementById("filter-clear-all") as HTMLLinkElement;

/* SAVING FILTERS */
filterSave.addEventListener("click", filter);

/* CLEARING FILTERS */
filterClear.addEventListener("click", clearFilters);
