import { createProductForm } from "./add-product/add-product";
import { updateProduct } from "./edit-product/edit-product";
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
import { finalIndex, initIndex, searchMatches, searchProduct } from "./search-box/search";

/* CREATING PRODUCT */
const buttonsContainer = document.getElementById(
    "buttons-container"
) as HTMLDivElement;
const formAddProduct = document.getElementById("add-product-form");

if (formAddProduct instanceof HTMLFormElement) {
    formAddProduct.addEventListener("submit", async (event) => {
        event.preventDefault();
        const searchOption: {
            option: true
        } = JSON.parse(localStorage.getItem("search-option") as string);
        if (searchOption.option) {
            createProductForm(formAddProduct, buttonsContainer, {
                searchOption: true,
                initIndex: initIndex,
                finalIndex: finalIndex,
                arrProduct: searchMatches
            });
        }else{
            createProductForm(formAddProduct, buttonsContainer, {
                searchOption: false,
                initIndex: initialIndex,
                finalIndex: lastIndex,
                arrProduct: products
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

    /* CHANGING BG COLOR WHEN TOUCHES THEME ICON */
    const iconTheme = document.getElementById(
        "theme-toggle"
    ) as HTMLButtonElement;
    iconTheme.addEventListener("click", () =>
        estimateCurrentPage({ current: current, searchOption: false })
    );
    localStorage.setItem("search-option", JSON.stringify({
        'option': false
    }))
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
});

/* IF THE USER DOESN'T SEARCH ANYTHING */
function restartProducts() {
    const containers = document.querySelectorAll(`tr[name="product-container"]`);
    containers.forEach(el => el.remove());
    loadProducts(products, 1, 0, {
        inverse: false,
        searchOptions: false,
    });
    calculatePagination({ productsLength: products.length, pageNumber: 1, searchOption: false});
    calculateShowing(1, products);
    estimateCurrentPage({ current: 0 ,searchOption: false });
}
