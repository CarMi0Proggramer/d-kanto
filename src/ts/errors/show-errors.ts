/* ERRORS FUNCTION */
export function showErrors(errors: string[], idElement: string, fatherElement: HTMLFormElement, beforeElement: HTMLElement) {
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


export function clearErrors(id: string) {
    const errorsContainer = document.getElementById(id);
    if (errorsContainer instanceof HTMLDivElement) {
        errorsContainer.remove();
    }
}

export function clearData(elements: HTMLInputElement[]) {
    for (const el of elements) {
        el.value = '';
    }
}