import { clearData, clearErrors, getErrArray, showErrors } from "../errors/show-errors";

const signInForm = document.getElementById("sign-in-form") as HTMLFormElement;
const emailInput = signInForm.querySelector("#email") as HTMLInputElement;
const passwordInput = signInForm.querySelector("#password") as HTMLInputElement;
const signInBtn = document.getElementById("sign-in-button") as HTMLButtonElement;

signInForm.addEventListener("submit", event => {
    event.preventDefault();
    signIn();
});

function signIn() {
    let email = emailInput.value;
    let password = passwordInput.value;

    fetch("https://d-kanto-backend.onrender.com/users/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
        credentials: "include"
    })
    .then(async res => {
        const data = await res.json();

        if (res.ok) {
            /* CLEARING ERRORS AND DATA */
            clearErrors("sign-in-errors")
            clearData([emailInput, passwordInput]);

            /* SETTING DATA */
            localStorage.setItem("session-data", JSON.stringify(data));
            location.href = window.origin + "/";
        }else if (res.status == 400) {
            throw new Error(JSON.stringify(data));
        }else {
            location.href = window.origin + "/src/pages/500.html";
        }
    })
    .catch(err => {
        try {
            let errArray = getErrArray(err);

            /* CLEARING AND SHOWING ERRORS */
            clearErrors("sign-in-errors");
            showErrors(errArray, "sign-in-errors", signInForm, signInBtn);
        } catch (error) {
            location.href = window.origin + "/src/pages/500.html";
        }
    });
}