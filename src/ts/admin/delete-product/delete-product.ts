import { getProductContainers } from "../edit-product/edit-product";
import { detectPagination, changeLastIndex, changeProducts, initialIndex, loadProducts, changeSections, lastIndex } from "../pagination/pagination";
import { calculateShowing } from "../pagination/products-showing";
import { showDeleteSuccessMessage } from "../modals/success-messages";

export const confirmDeleteButton = document.getElementById(
    "confirm-delete-button"
);
const checkboxAll = document.getElementById("checkbox-all");

/* Validate PRODUCT FUNCTION */
export function validateDelete(containers: NodeListOf<Element>) {
    let validElements: string[] = [];

    /* getting valid elements */
    for (const container of containers) {
        if (container instanceof HTMLTableRowElement) {
            /* getting checkboxs */
            const checkbox = container.querySelector(
                `input[name="product-checkbox"]`
            );
            /* getting names */
            const productName = container.querySelector(
                `div[name="product-name"]`
            ) as HTMLDivElement;

            if (checkbox instanceof HTMLInputElement && checkbox.checked) {
                const validElement = productName.innerText
                validElements.push(validElement);
            }
        }
    }

    const filteredNames = validElements.filter((item, index) => {
        return validElements.indexOf(item) === index
    });

    for (const name of filteredNames) {
        deleteProduct(name);
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

/* DELETING A PRODUCT */
export function deleteProduct(name: string) {
    fetch(`http://localhost:3000/products/${name}`, {
        method: "DELETE",
    })
        .then(async (res) => {
            if (res.ok) {
                let productContainers = document.querySelectorAll(
                    `tr[name="product-container"]`
                );

                const newProducts = changeProducts(name);
                if (productContainers.length < 6) {
                    deleteContainers(productContainers,name);

                    productContainers = document.querySelectorAll(
                        `tr[name="product-container"]`
                    );
                    if (productContainers.length == 0) {
                        loadProducts(newProducts, initialIndex, lastIndex,{ inverse: true, deleteBackOption: true });
                    }
                    changeLastIndex(true,false)
                }else{
                    for (const container of productContainers) {
                        container.remove();
                    }

                    changeLastIndex(false,true);
                    loadProducts(newProducts, initialIndex, lastIndex, { inverse: false});
                }
                
                detectPagination({ add: false })
                calculateShowing(initialIndex,newProducts);
                changeSections(newProducts.length);
                showDeleteSuccessMessage();
                quitChecked();
                return;
            } else if (res.status === 404) {
                /* location.href = window.origin + "/src/pages/404.html"; */
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

/* REMOVING CHECKED FROM CHECKBOX_ALL */
function quitChecked() {
    /* IF IT'S A MASSIVVE DELETE */
    if (checkboxAll instanceof HTMLInputElement) {
        checkboxAll.checked = false;
        const checkboxs = document.querySelectorAll(
            `input[name="product-checkbox"]`
        );
        checkboxs.forEach((element) => {
            if (element instanceof HTMLInputElement) {
                element.checked = false;
            }
        });
    }
}

/* DELETE CONTAINERS FUNCTION */
function deleteContainers(productContainers: NodeListOf<Element>, name:string) {
    const containers = getProductContainers(productContainers, name);
        for(let container of containers){
            container.remove();
        }
    return containers.length;
}
