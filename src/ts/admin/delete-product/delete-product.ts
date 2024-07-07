import { detectPagination, changeLastIndex, changeProducts, initialIndex, loadProducts, changeSections, lastIndex, products, calculateSections, current } from "../pagination/pagination";
import { calculateShowing } from "../pagination/products-showing";
import { showDeleteSuccessMessage } from "../modals/success-messages";
import { changeSearchFinalIndex, changeSearchMatches, changeSearchSections, finalIndex, initIndex, searchCurrent, searchMatches } from "../search-box/search";
import { getProductContainer } from "../edit-product/edit-product";
import { changeFilterFinalIndex, changeFilterMatches, filterCurrent, filterInit, filterLast, filterMatches } from "../filters/filter";

export const confirmDeleteButton = document.getElementById(
    "confirm-delete-button"
);
const checkboxAll = document.getElementById("checkbox-all");

/* Validate PRODUCT FUNCTION */
export function validateDelete(containers: NodeListOf<Element>) {
    let validElements: number[] = [];

    /* getting valid elements */
    for (const container of containers) {
        if (container instanceof HTMLTableRowElement) {
            /* getting checkboxs */
            const checkbox = container.querySelector(
                `input[name="product-checkbox"]`
            );

            if (checkbox instanceof HTMLInputElement && checkbox.checked) {
                const validElement = Number(container.dataset.id);
                validElements.push(validElement);
            }
        }
    }

    for (const id of validElements) {
        deleteProduct(id);
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
export function deleteProduct(id: number) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    })
        .then(async (res) => {
            if (res.ok) {

                let productContainers = document.querySelectorAll(
                    `tr[name="product-container"]`
                );

                changeProducts(id);

                const searchOption: {
                    option: boolean
                } = JSON.parse(localStorage.getItem("search-option") as string);
                const filterOption: {
                    option: boolean
                } = JSON.parse(localStorage.getItem("filter-option") as string);

                if (searchOption.option) {
                    changeSearchMatches(id);
                }else if (filterOption.option) {
                    changeFilterMatches(id);
                }

                if (productContainers.length < 6) {
                    deleteContainer(productContainers, id);
                    productContainers = document.querySelectorAll(
                        `tr[name="product-container"]`
                    );

                    if (productContainers.length == 0) {
                        if (searchOption.option) {
                            loadProducts(searchMatches, initIndex, finalIndex,{ inverse: true, deleteBackOption: true, searchOptions: true, filterOption: false });
                        }else if(filterOption.option){
                            loadProducts(filterMatches, filterInit, filterLast,{ inverse: true, deleteBackOption: true, searchOptions: false, filterOption: true });
                        } else{
                            loadProducts(products, initialIndex, lastIndex,{ inverse: true, deleteBackOption: true, searchOptions: false, filterOption: false });
                        }
                    }
                    changeLastIndex(true,false);
                    if (searchOption.option) {
                        changeSearchFinalIndex(searchMatches.length);
                    }else if(filterOption.option){
                        changeFilterFinalIndex(filterMatches.length);
                    }
                }else{
                    for (const container of productContainers) {
                        container.remove();
                    }

                    changeLastIndex(false,true);
                    if (searchOption.option) {
                        changeSearchFinalIndex(initIndex - 1);
                    }else if(filterOption.option){
                        changeFilterFinalIndex(filterInit - 1);
                    }

                    if (searchOption.option) {
                        loadProducts(searchMatches, initIndex, finalIndex, { inverse: false, searchOptions: true, filterOption: false});
                    }else if(filterOption.option){
                        loadProducts(filterMatches, filterInit, filterLast, { inverse: false, searchOptions: false, filterOption: true});
                    } else{
                        loadProducts(products, initialIndex, lastIndex, { inverse: false, searchOptions: false, filterOption: false});
                    }
                }
                
                /* DETECTING PAGINATION */
                if (searchOption.option) {
                    detectPagination({ add: false, arrProduct: searchMatches, searchOption: true, filterOption: false, current: searchCurrent })
                    calculateShowing(initIndex,searchMatches);
                    changeSearchSections(calculateSections(searchMatches.length));
                }else if(filterOption.option){
                    detectPagination({ add: false, arrProduct: filterMatches, searchOption: false, filterOption: true, current: filterCurrent })
                    calculateShowing(filterInit,filterMatches);
                    changeSearchSections(calculateSections(filterMatches.length));
                } else{
                    detectPagination({ add: false, arrProduct: products, searchOption: false, filterOption: false, current: current })
                    calculateShowing(initialIndex,products);
                    changeSections(products.length);
                }
                /* SHOWING SUCCESS MESSAGE */
                showDeleteSuccessMessage();
                quitChecked();
                return;
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
                /* location.href = window.origin + "/src/pages/500.html"; */
                console.log(err);
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
function deleteContainer(productContainers: NodeListOf<Element>, id:number) {
    const container = getProductContainer(productContainers, id);
    if (container instanceof HTMLTableRowElement) {
        container.remove();
    }
}
