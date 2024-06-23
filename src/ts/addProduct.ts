import { Product } from "../components/product";
import { updateListProduct } from "../ts/updateListProduct";
import { showAddSuccessMessage } from "./successMessages";
import { updateModals } from "./flowbiteModals";

const closeModalButton = document.getElementById("close-add-product");
const form = document.getElementById("add-product-form");
const inputName = document.getElementById("name") as HTMLInputElement;
const price = document.getElementById("price") as HTMLInputElement;
const description = document.getElementById("description") as HTMLTextAreaElement;
const category = document.getElementById("category") as HTMLSelectElement;
const urlimg = document.getElementById("product-img") as HTMLInputElement;
const discardButton = document.getElementById("discard-button");
const buttonsContainer = document.getElementById("buttons-container") as HTMLDivElement;
/* const server = "https://d-kanto-backend.onrender.com"; */

if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", async event => {
        event.preventDefault();
        await fetch("http://localhost:3000/create-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: inputName.value,
                price: Number(price.value) + 0.99,
                description: description.value,
                category: category.value,
                urlimg: urlimg.value
            })
        })
        .then(async res => {
            if (res.ok) {
                const product: Product = await res.json();
                updateListProduct(product);
                clearData();
                showAddSuccessMessage();
                updateModals();
            }
            else if (res.status === 400 ) {
                return res.json().then(errorData => {
                    // Lanzar un error para ser atrapado en el siguiente bloque .catch()
                    throw new Error(JSON.stringify(errorData));
                });
            }else {
                location.href = window.origin + "src/pages/500.html";
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
    })
}

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

export function clearErrors(idElement:string) {
    const errorsContainer = document.getElementById(idElement);
    if (errorsContainer instanceof HTMLDivElement) {
        errorsContainer.remove();
    }
}

if (discardButton instanceof HTMLButtonElement) {
    discardButton.addEventListener("click", () => clearErrors("errors-container"));
}

function clearData() {
    inputName.value = '';
    description.value = '';
    urlimg.value = '';
    category.value = '';
    price.value = '';

    if (closeModalButton instanceof HTMLButtonElement) {
        closeModalButton.click();
    }
}