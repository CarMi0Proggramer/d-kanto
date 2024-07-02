import { Product } from "../../../components/product";
import { showAddSuccessMessage } from "../modals/success-messages";
import { changeLastIndex, changeSections, detectPagination, initialIndex, products } from "../pagination/pagination";
import { calculateShowing } from "../pagination/products-showing";
import { updateListProduct } from "../update-product/update-list-product";

const closeModalButton = document.getElementById("close-add-product");
const inputName = document.getElementById("name") as HTMLInputElement;
const price = document.getElementById("price") as HTMLInputElement;
const description = document.getElementById("description") as HTMLTextAreaElement;
const category = document.getElementById("category") as HTMLSelectElement;
const urlimg = document.getElementById("product-img") as HTMLInputElement;
const stock = document.getElementById("add-product-stock") as HTMLInputElement;
const discardButton = document.getElementById("discard-button");
/* const server = "https://d-kanto-backend.onrender.com"; */

export async function createProductForm(form: HTMLFormElement, buttonsContainer: HTMLDivElement) {
    await fetch("http://localhost:3000/products/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: inputName.value,
            price: Number(price.value) + 0.99,
            description: description.value,
            category: category.value,
            urlimg: urlimg.value,
            stock: Number(stock.value)
        })
    })
    .then(async res => {
        if (res.ok) {
            const product: Product = await res.json();
            products.push(product);
            let productContainers = document.querySelectorAll(
                `tr[name="product-container"]`
            );
            if (productContainers.length < 6) {
                changeLastIndex(false,false,1, "plus");
                updateListProduct(product);
            }

            detectPagination(true);
            calculateShowing(initialIndex, products);
            changeSections(products.length);
            clearData(false);
            clearErrors("errors-container");
            showAddSuccessMessage();
        }
        else if (res.status === 400 ) {
            return res.json().then(errorData => {
                // Lanzar un error para ser atrapado en el siguiente bloque .catch()
                throw new Error(JSON.stringify(errorData));
            });
        }else {
            location.href = window.origin + "src/pages/500.html";
            console.error(res);
        }
    })
    .catch(errors => {
        try {
            errors = JSON.parse(errors.message);
            let err_messages = []
            for (const err of errors.message) {
                err_messages.push(err.message)
            }

            clearErrors("errors-container");
            showErrors(err_messages, "errors-container", form, buttonsContainer);
        } catch (err) {
            location.href = window.origin + "/src/pages/500.html";
        }
    });
}

/* SHOW ERRORS ON THE CONTAINER */
export function showErrors(errors: string[], idElement: string, fatherElement: HTMLElement, beforeElement: HTMLElement) {
    const errorsContainer = document.createElement("div");
    errorsContainer.id = idElement;
    errorsContainer.classList.add("mb-4", "text-sm", "font-medium", "sm:col-span-2", "text-red-500");
    for (const err of errors) {
        const p = document.createElement("p");
        p.classList.add("mb-2");
        p.innerHTML = err;
        errorsContainer.appendChild(p);
    }
    fatherElement.insertBefore(errorsContainer, beforeElement);
}

/* DELETE ERRORS CONTAINER */
export function clearErrors(idElement:string) {
    const errorsContainer = document.getElementById(idElement);
    if (errorsContainer instanceof HTMLDivElement) {
        errorsContainer.remove();
    }
}

/* CLEANING DATA WHEN TOUCHES DISCARD BUTTON */
if (discardButton instanceof HTMLButtonElement) {
    discardButton.addEventListener("click", () => {
        clearErrors("errors-container"); 
        clearData(true);
    });
}

//CLEAR DATA FUNCTION
function clearData(discard: boolean) {
    inputName.value = '';
    description.value = '';
    urlimg.value = '';
    category.value = '';
    price.value = '';
    stock.value = '';

    if (discard) {
        return;
    }else{
        if (closeModalButton instanceof HTMLButtonElement) {
            closeModalButton.click();
        }
    }
}