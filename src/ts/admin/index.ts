import { createProductForm } from "./functions/addProduct";
import { confirmDeleteButton, validateDelete } from "./functions/deleteProduct";
import { updateProduct } from "./functions/editProduct";
import { paginate } from "./functions/pagination";

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
window.addEventListener("load", paginate);