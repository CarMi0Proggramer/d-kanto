const termsCheckBox = document.getElementById("terms");
const termAccept = document.getElementById("terms-accept")
const termDecline = document.getElementById("terms-decline")

if (termsCheckBox instanceof HTMLInputElement) {
    if (termAccept instanceof HTMLButtonElement) {
        termAccept.addEventListener("click", () => {
            termsCheckBox.checked = true;
        });
    }
    
    if (termDecline instanceof HTMLButtonElement) {
        termDecline.addEventListener("click", () => {
            termsCheckBox.checked = false;
        });
    }
}
