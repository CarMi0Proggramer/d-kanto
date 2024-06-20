export function showSuccessMessage() {
        const successButton = document.getElementById('successButton');
        if (successButton instanceof HTMLButtonElement) {
            successButton.click();
        }
    }