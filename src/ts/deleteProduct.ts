const confirmDeleteButton = document.getElementById("confirm-delete-button");
const checkboxAll = document.getElementById("checkbox-all");

if (confirmDeleteButton instanceof HTMLButtonElement) {
    confirmDeleteButton.addEventListener("click", () => {
        const productContainers = document.getElementsByName("product-container");
        for (const productContainer of productContainers) {
            if (productContainer instanceof HTMLTableRowElement) {
                validateDelete(productContainer);
            }
        }
    });
}

/* DELETE PRODUCT FUNCTION */
function validateDelete(container: HTMLTableRowElement) {
        const checkbox = container.querySelector(
            `input[name="product-checkbox"]`
        );
        if (checkbox instanceof HTMLInputElement && checkbox.checked) {
            container.remove();
        }
}

/* SELECT ALL */
if (checkboxAll instanceof HTMLInputElement) {
    checkboxAll.addEventListener("click", () => {
        const productContainers = document.getElementsByName("product-container");
        const productCheckboxs = getCheckboxs(productContainers);
        if (checkboxAll.checked) {
            for (const productCheckbox of productCheckboxs) {
                productCheckbox.checked = true;
            }
        } else {
            for (const productCheckbox of productCheckboxs) {
                productCheckbox.checked = false;
            }
        }
    });
}

/* GETTING ALL CHECKBOXS */
function getCheckboxs(containers: NodeListOf<HTMLElement>) {
    let productCheckboxs: HTMLInputElement[] = [];
    for (const container of containers) {
        const checkbox = container.querySelector(
            `input[name="product-checkbox"]`
        );
        if (checkbox instanceof HTMLInputElement) {
            productCheckboxs.push(checkbox);
        }
    }

    return productCheckboxs;
}
