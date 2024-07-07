/* DELETE MODAL */
import { Drawer, Modal } from "flowbite";
import { currentProductId, findCategory, updateEditPreviewData } from "../update-product/update-edit-preview-data";
import { clearErrors } from "../add-product/add-product";
import { confirmDeleteButton, deleteProduct } from "../delete-product/delete-product";

/* SOME VARS */
const drawerName = document.getElementById("drawer-name") as HTMLInputElement;
const drawerUrlImage = document.getElementById(
    "update-product-img"
) as HTMLInputElement;
const drawerCategory = document.getElementById(
    "drawer-category"
) as HTMLSelectElement;
const drawerPrice = document.getElementById(
    "update-product-price"
) as HTMLInputElement;
const drawerDescription = document.getElementById(
    "drawer-description"
) as HTMLTextAreaElement;
const drawerStock = document.getElementById("update-product-stock") as HTMLInputElement;

const targetEl = document.getElementById("delete-modal") as HTMLDivElement;
const deleteModal = new Modal(targetEl);

/* ADDING DELETE MODAL EVENT TO THE BUTTONS */
const deleteModalBtns = targetEl.getElementsByTagName("button");
for (const btn of deleteModalBtns) {
    btn.addEventListener("click", () => {
        deleteModal.hide();
    });
}

/* UPDATING EVENTS ON DELETE MODAL BUTTONS */
function updateDeleteButtons() {
    const deleteProduct = document.getElementsByName("delete-product");
    deleteProduct.forEach((element) => {
        element.addEventListener("click", () => {
            deleteModal.show();
        });
    });
}

/* EDIT MODAL */
/* EDIT MODAL VARS */
const drawerEl = document.getElementById(
    "drawer-update-product"
) as HTMLFormElement;
export const editDrawer = new Drawer(drawerEl);

/* CLOSING THE DRAWER WITH XBTN BUTTON */
export const xBtn = drawerEl.getElementsByTagName("button")[0];
xBtn.addEventListener("click", () => {
    editDrawer.hide();
    clearErrors("drawer-errors-container");
});

/* SHOWING DELETE MODAL */
const drawerDeleteBtn = document.getElementById(
    "drawer-delete-button"
) as HTMLButtonElement;
drawerDeleteBtn.addEventListener("click", () => {
    deleteModal.show();
    if (confirmDeleteButton instanceof HTMLButtonElement) {
        confirmDeleteButton.onclick = () => {
            deleteProduct(currentProductId);
            editDrawer.hide();
        }
    }
});

/* UPDATING EDIT EVENT TO THE BUTTONS */
function updateEditButtons() {
    const productContainers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    for (const container of productContainers) {
        const editBtn = container.querySelector(`button[name="edit-product"]`);
        if (editBtn instanceof HTMLButtonElement) {
            editBtn.addEventListener("click", async () => {
                editDrawer.show();
                if (container instanceof HTMLTableRowElement) {
                    await updateEditPreviewData(
                        container,
                        drawerName,
                        drawerUrlImage,
                        drawerCategory,
                        drawerPrice,
                        drawerDescription,
                        drawerStock
                    );
                }
            });
        }
    }
}

/* PREVIEW MODAL */
/* VARS */
const previewDrawerEl = document.getElementById(
    "drawer-read-product-advanced"
) as HTMLDivElement;
const previewDrawer = new Drawer(previewDrawerEl);

const previewDrawerCloseBtn = document.getElementById(
    "preview-close-button"
) as HTMLButtonElement;
previewDrawerCloseBtn.addEventListener("click", () => {
    previewDrawer.hide();
});

/* ADDING DELETE EVENT */
const previewEditButton = document.getElementById(
    "preview-edit-button"
) as HTMLButtonElement;
previewEditButton.addEventListener("click", () => {
    previewDrawer.hide();
    editDrawer.show();

    drawerName.value = previewName.innerText;
    drawerUrlImage.value = previewImage.src;
    drawerCategory.value = findCategory(previewCategory.innerText, true);
    drawerPrice.value = previewPrice.innerText.replace("\.99","");
    drawerDescription.value = previewDescription.innerText;
});

const previewDeleteButton = document.getElementById(
    "preview-delete-button"
) as HTMLButtonElement;
/* WHEN YOU WANT TO DELETE FROM PREVIEW DRAWER COMPONENT */
previewDeleteButton.addEventListener("click", () => {
    deleteModal.show();
    if (confirmDeleteButton instanceof HTMLButtonElement) {
        confirmDeleteButton.onclick = () => {
            deleteProduct(currentProductId);
            previewDrawer.hide();
        }
    }
});

/* VARS */
const previewName = document.getElementById("read-drawer-label") as HTMLHeadingElement;
const previewCategory = document.getElementById("preview-category") as HTMLElement;
const previewPrice = document.getElementById("preview-price") as HTMLHeadingElement;
const previewDescription = document.getElementById("preview-description") as HTMLElement;
const previewImage = document.getElementById("preview-image") as HTMLImageElement;
const previewRating = document.getElementById("edit-rating") as HTMLElement;

/* UPDATING PREVIEW EVENT TO THE BUTTONS */
function updatePreviewButtons() {
    const productContainers = document.querySelectorAll(
        `tr[name="product-container"]`
    );
    for (const container of productContainers) {
        const previewBtn = container.querySelector(`button[name="preview-product"]`);
        if (previewBtn instanceof HTMLButtonElement) {
            previewBtn.addEventListener("click", async () => {
                previewDrawer.show();
                if (container instanceof HTMLTableRowElement) {
                    await updateEditPreviewData(
                        container,
                        previewName,
                        previewImage,
                        previewCategory,
                        previewPrice,
                        previewDescription,
                        null,
                        previewRating
                    );
                }
            });
        }
    }
}

/* UPDATING ALL MODALS EVENTS */
export function updateModals() {
    updateDeleteButtons();
    updateEditButtons();
    updatePreviewButtons();
}

/* UPDATING FIRST EVENTS */
updateModals();
