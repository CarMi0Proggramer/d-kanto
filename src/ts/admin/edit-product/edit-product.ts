import { Product } from "../../../components/product";
import { showUpdateSuccessMessage } from "../modals/success-messages";
import { clearErrors, showErrors } from "../add-product/add-product";
import { xBtn, editDrawer } from "../modals/flowbite-modals";
import { currentProductId } from "../update-product/update-edit-preview-data";
import { confirmDeleteButton, deleteProduct } from "../delete-product/delete-product";


const drawerName = document.getElementById("drawer-name") as HTMLInputElement;
const drawerUrlImage = document.getElementById("update-product-img") as HTMLInputElement;
const drawerCategory = document.getElementById("drawer-category") as HTMLSelectElement;
const drawerPrice = document.getElementById("update-product-price") as HTMLInputElement;
const drawerDescription = document.getElementById("drawer-description") as HTMLTextAreaElement;
const drawerStock = document.getElementById("update-product-stock") as HTMLInputElement;
const drawerDeleteButton = document.getElementById("drawer-delete-button") as HTMLButtonElement;
const drawerButtonsContainer = document.getElementById("drawer-buttons-container") as HTMLDivElement;

export function updateProduct(form: HTMLFormElement) {
    fetch(`http://localhost:3000/products/${currentProductId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: drawerName.value,
            price: Number(drawerPrice.value) + 0.99,
            description: drawerDescription.value,
            category: drawerCategory.value,
            urlimg: drawerUrlImage.value,
            stock: Number(drawerStock.value)
        })
    })
    .then(async res => {
        if (res.ok) {
            const data: Product = await res.json();
            const productContainers = document.querySelectorAll(
                `tr[name="product-container"]`
            );
            const container = getProductContainer(productContainers, currentProductId);
            if (container instanceof HTMLTableRowElement) {
                updateProductContainer(container, data);
            }
            
            xBtn.click();
            clearErrors("drawer-errors-container");
            showUpdateSuccessMessage();
        }else if(res.status === 400){
            return res.json().then(errorData => {
                    throw new Error(JSON.stringify(errorData));
                });
        }else if(res.status === 404){
            location.href = window.origin + "/src/pages/404.html"
        }else{
            location.href = window.origin + "/src/pages/500.html"
        }
    })
    .catch(errors => {
        try{
            errors = JSON.parse(errors.message);
                let err_messages = []
                for (const err of errors.message) {
                    err_messages.push(err.message)
                }

                clearErrors("drawer-errors-container");
                showErrors(err_messages, "drawer-errors-container", form, drawerButtonsContainer);
        }
        catch (err) {
            location.href = window.origin + "/src/pages/500.html"
        }
    });
}

export function getProductContainer(containers: NodeListOf<Element>, id: number) {
    for (const container of containers) {
        if (container instanceof HTMLTableRowElement && Number(container.dataset.id) === id) {
            return container;
        }
    }
}

function updateProductContainer(container: HTMLTableRowElement, newData: Product) {
    const nameEl = container.querySelector(`div[name="product-name"]`) as HTMLDivElement;
    const imgEl = nameEl.querySelector("img") as HTMLImageElement;
    const categoryEl = container.querySelector(`span[name="span-product-category"]`) as HTMLSpanElement;

    categoryEl.innerText = newData.category;
    imgEl.src = newData.urlimg;
    nameEl.innerText = newData.name;
    nameEl.insertBefore(imgEl, nameEl.firstChild);
}

drawerDeleteButton.addEventListener("click", () => {
    if (confirmDeleteButton instanceof HTMLButtonElement) {
        confirmDeleteButton.addEventListener("click", () => {
            deleteProduct(currentProductId);
            editDrawer.hide();
        })
    }
});