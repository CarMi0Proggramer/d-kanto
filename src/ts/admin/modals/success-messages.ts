/* SHOWING ADD SUCCESS MESSAGE */
export function showAddSuccessMessage() {
    const successButton = document.getElementById('create-product-success-button');
    if (successButton instanceof HTMLButtonElement) {
        successButton.click();
    }
}

/* SHOWING DELETE SUCCESS MESSAGE */
export function showDeleteSuccessMessage() {
    const deleteSuccessButton = document.getElementById('delete-product-success-button');
    if (deleteSuccessButton instanceof HTMLButtonElement) {
        deleteSuccessButton.click();
    }
}

/* SHOWING UPDATE SUCCESS MESSAGE */
export function showUpdateSuccessMessage() {
    const updateSuccessButton = document.getElementById('update-product-success-button');
    if (updateSuccessButton instanceof HTMLButtonElement) {
        updateSuccessButton.click();
    }
}