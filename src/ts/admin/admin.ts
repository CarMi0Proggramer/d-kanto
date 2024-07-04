import { createProductForm } from "./add-product/add-product";
import { confirmDeleteButton, validateDelete } from "./delete-product/delete-product";
import { updateProduct } from "./edit-product/edit-product";
import { current, estimateCurrentPage, paginate } from "./pagination/pagination";
import { searchProduct } from "./search-box/search";

/* CREATING PRODUCT */
const buttonsContainer = document.getElementById("buttons-container") as HTMLDivElement;
const formAddProduct = document.getElementById("add-product-form");

if (formAddProduct instanceof HTMLFormElement) {
    formAddProduct.addEventListener("submit", async event => {
        event.preventDefault();
        createProductForm(formAddProduct, buttonsContainer);
    })
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
const editForm = document.getElementById("drawer-update-product") as HTMLFormElement;

editForm.addEventListener("submit", async event => {
    event.preventDefault();
    updateProduct(editForm);
});

/* PRODUCTS PAGINATION */
window.addEventListener("load", () => {
    paginate();
    /* CHANGING BG COLOR WHEN TOUCHES THEME ICON */
    const iconTheme = document.getElementById("theme-toggle") as HTMLButtonElement;
    iconTheme.addEventListener("click", () => estimateCurrentPage({ current: current, searchOption: false}));
});

/* SEARCH SECTION */
const searchInput = document.getElementById("simple-search") as HTMLInputElement;
searchInput.addEventListener("input", () => searchProduct(searchInput));