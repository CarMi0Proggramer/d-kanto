/* DELETE MODAL */
import { Drawer, Modal } from "flowbite";

const targetEl = document.getElementById("delete-modal") as HTMLDivElement;
const deleteModal = new Modal(targetEl);

const deleteModalBtns = targetEl.getElementsByTagName("button");
for (const btn of deleteModalBtns) {
    btn.addEventListener("click", () => {
        deleteModal.hide();
    });
}

function updateDeleteButtons() {
    const deleteProduct = document.getElementsByName("delete-product");
    deleteProduct.forEach((element) => {
        element.addEventListener("click", () => {
            deleteModal.show();
        });
    });
}

/* EDIT MODAL */
const drawerEl = document.getElementById(
    "drawer-update-product"
) as HTMLFormElement;
const editDrawer = new Drawer(drawerEl);

const xBtn = drawerEl.getElementsByTagName("button")[0];
xBtn.addEventListener("click", () => {
    editDrawer.hide();
});
const drawerDeleteBtn = document.getElementById("drawer-delete-button") as HTMLButtonElement;
drawerDeleteBtn.addEventListener("click", () => {
    deleteModal.show();
});

function updateEditButtons() {
    const editBtns = document.getElementsByName("edit-product");
    editBtns.forEach((element) => {
        element.addEventListener("click", () => {
            editDrawer.show();
        });
    });
}

/* PREVIEW MODAL */

const previewDrawerEl = document.getElementById("drawer-read-product-advanced") as HTMLDivElement;
const previewDrawer = new Drawer(previewDrawerEl);

const previewDrawerCloseBtn  = document.getElementById("preview-close-button") as HTMLButtonElement;
previewDrawerCloseBtn.addEventListener("click", () => {
    previewDrawer.hide();
});

const previewEditButton = document.getElementById("preview-edit-button") as HTMLButtonElement;
previewEditButton.addEventListener("click", () => {
    previewDrawer.hide();
    editDrawer.show();
});

const previewDeleteButton = document.getElementById("preview-delete-button") as HTMLButtonElement;
previewDeleteButton.addEventListener("click", () => {
    deleteModal.show();
});

function updatePreviewButtons() {
    const previewBtns = document.getElementsByName("preview-product");
    previewBtns.forEach((element) => {
        element.addEventListener("click", () => {
            previewDrawer.show();
        });
    })
}

export function updateModals() {
    updateDeleteButtons();
    updateEditButtons();
    updatePreviewButtons();
}

updateModals();