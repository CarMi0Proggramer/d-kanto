export function showDeleteSuccessMessage() {
    const deleteSuccessButton = document.getElementById('delete-product-success-button');
    if (deleteSuccessButton instanceof HTMLButtonElement) {
        deleteSuccessButton.click();
    }
}