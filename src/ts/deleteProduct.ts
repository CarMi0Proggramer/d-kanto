import { showDeleteSuccessMessage } from "./deleteProductSuccessMessage";

const confirmDeleteButton = document.getElementById("confirm-delete-button");
const checkboxAll = document.getElementById("checkbox-all");

if (confirmDeleteButton instanceof HTMLButtonElement) {
    confirmDeleteButton.addEventListener("click", () => {
        const productContainers = document.querySelectorAll(
            `tr[name="product-container"]`
        );
        for (const productContainer of productContainers) {
            if (productContainer instanceof HTMLTableRowElement) {
                validateDelete(productContainer);
            }
        }
    });
}

/* DELETE PRODUCT FUNCTION */
function validateDelete(container: HTMLTableRowElement) {
    const checkbox = container.querySelector(`input[name="product-checkbox"]`);
    const productName = container.querySelector(
        `div[name="product-name"]`
    ) as HTMLDivElement;
    if (checkbox instanceof HTMLInputElement && checkbox.checked) {
        fetch(`http://localhost:3000/delete-product/${productName.innerText}`, {
            method: "DELETE",
        })
        .then(async (res) => {
            if (res.ok) {
                container.remove();
                showDeleteSuccessMessage();
                /* IF IT'S A MASSIVVE DELETE */
                if (
                    checkboxAll instanceof HTMLInputElement &&
                    checkboxAll.checked
                ) {
                    checkboxAll.checked = false;
                }
            } else if (res.status === 404) {
                location.href = window.origin + "/src/pages/404.html";
            } else {
                const error: {
                    message: string;
                } = await res.json();
                throw new Error(error.message);
            }
        })
        .catch((err) => {
            if (err) {
                location.href = window.origin + "/src/pages/500.html";
            }
        });
    }
}

/* SELECT ALL */
if (checkboxAll instanceof HTMLInputElement) {
    checkboxAll.addEventListener("click", () => {
        const productContainers =
            document.getElementsByName("product-container");
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
