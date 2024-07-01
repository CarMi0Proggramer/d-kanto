import { createProductForm } from "./add-product/addProduct";
import { confirmDeleteButton, validateDelete } from "./delete-product/deleteProduct";
import { updateProduct } from "./edit-product/editProduct";
import { paginate } from "./pagination/pagination";

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