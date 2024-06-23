export function showAddSuccessMessage() {
    const successButton = document.getElementById('create-product-success-button');
    if (successButton instanceof HTMLButtonElement) {
        successButton.click();
    }
}