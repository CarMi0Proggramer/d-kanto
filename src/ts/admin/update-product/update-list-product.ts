import { Product, createProduct } from "../../../components/product";
import { confirmDeleteButton, validateDelete } from "../delete-product/delete-product";
import { updateModals } from "../modals/flowbite-modals";

const productBox = document.getElementById("product-box") as HTMLTableSectionElement;

/* UPDATING PRODUCT LIST */
export function updateListProduct(product: Product) {
    const firstProduct = productBox.firstChild;
    const newProduct = createProduct(product);

    /* ADDING DELETE EVENT */
    let deleteBtn = newProduct.querySelector(`button[name="delete-product"]`);
    if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.addEventListener("click", () => {
            /* ACCEPTING DELETE */
            if (confirmDeleteButton instanceof HTMLButtonElement) {
                confirmDeleteButton.onclick = () => {
                    const productContainers = document.querySelectorAll(
                        `tr[name="product-container"]`
                    );
                    validateDelete(productContainers);
                }
            }
        });
    }

    productBox.insertBefore(newProduct, firstProduct);
    updateModals();
}
