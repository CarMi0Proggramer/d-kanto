import { createProductForm } from "./add-product/add-product";
import {
    confirmDeleteButton,
    validateDelete,
} from "./delete-product/delete-product";
import { updateProduct } from "./edit-product/edit-product";
import {
    calculatePagination,
    current,
    estimateCurrentPage,
    loadProducts,
    paginate,
    products,
} from "./pagination/pagination";
import { calculateShowing } from "./pagination/products-showing";
import { searchProduct } from "./search-box/search";

/* CREATING PRODUCT */
const buttonsContainer = document.getElementById(
    "buttons-container"
) as HTMLDivElement;
const formAddProduct = document.getElementById("add-product-form");

if (formAddProduct instanceof HTMLFormElement) {
    formAddProduct.addEventListener("submit", async (event) => {
        event.preventDefault();
        createProductForm(formAddProduct, buttonsContainer);
    });
}

/* ACCEPTING DELETE */
if (confirmDeleteButton instanceof HTMLButtonElement) {
    confirmDeleteButton.addEventListener("click", () => {
        const productContainers = document.querySelectorAll(
            `tr[name="product-container"]`
        );
        validateDelete(productContainers);
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
    }
});

/* IF THE USER DOESN'T SEARCH ANYTHING */
function restartProducts() {
    loadProducts(products, 1, 0, {
        inverse: false,
        searchOptions: false,
    });
    calculatePagination({ productsLength: products.length, pageNumber: 1, searchOption: false});
    calculateShowing(1 , products);
    estimateCurrentPage({ current: 0 ,searchOption: false });
}
