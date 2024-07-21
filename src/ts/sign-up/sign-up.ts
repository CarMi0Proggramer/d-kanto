import { clearData, clearErrors, getErrArray, showErrors } from "../errors/show-errors";

const signUpForm = document.getElementById("sign-up-form") as HTMLFormElement;

signUpForm.addEventListener("submit", event => {
    event.preventDefault();
    signUp();
});

/* VARS */
const nameInput = signUpForm.querySelector("#name") as HTMLInputElement;
const emailInput = signUpForm.querySelector("#email") as HTMLInputElement;
const passwordInput = signUpForm.querySelector("#password") as HTMLInputElement;
const confirmPasswordInput = signUpForm.querySelector("#confirm-password") as HTMLInputElement;
const createBtn = document.getElementById("create-account") as HTMLButtonElement;

function signUp() {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmedPassword = confirmPasswordInput.value;

    if (password != confirmedPassword) {
        clearErrors("sign-up-errors")
        showErrors(["Your password confirmation is incorrect"], "sign-up-errors", signUpForm, createBtn);
        return;
    }

    fetch("https://d-kanto-backend.onrender.com/users/signUp",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
        credentials: "include"
    })
    .then(async res => {
        const data = await res.json();

        if (res.ok) {
            /* CLEARING ERRORS AND DATA */
            clearErrors("sign-up-errors")
            clearData([nameInput, emailInput, passwordInput, confirmPasswordInput]);

            /* SETTING DATA */
            localStorage.setItem("session-data", JSON.stringify(data));
            location.href = window.origin + "/";
        }else if(res.status == 400){
            throw new Error(JSON.stringify(data));
        }else{
            location.href = window.origin + "/src/pages/500.html";
        }
    })
    .catch(err => {
        try {
            let errArray = getErrArray(err);

            /* CLEARING AND SHOWING ERRORS */
            clearErrors("sign-up-errors");
            showErrors(errArray, "sign-up-errors", signUpForm, createBtn); 
        } catch (err) {
            location.href = window.origin + "/src/pages/500.html";
        }
    })
}