import { clearData, clearErrors, getErrArray, showErrors } from "../../errors/show-errors";

/* VARS */
export const paymentForm = document.getElementById("payment-form") as HTMLFormElement;
const nameInput = document.getElementById("full_name") as HTMLInputElement;
const cardNumberInput = document.getElementById("card-number-input") as HTMLInputElement;
const cardExpirationInput = document.getElementById("card-expiration-input") as HTMLInputElement;
const cvvInput = document.getElementById("cvv-input") as HTMLInputElement;
const payBtn = document.getElementById("pay-now") as HTMLButtonElement;

export function executePayment() {
    let data = {
        name: nameInput.value,
        cardNumber: Number( cardNumberInput.value ),
        cardExpiration: cardExpirationInput.value,
        cvv: Number( cvvInput.value )
    }

    fetch("http://localhost:3000/payments/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify(data),
        credentials: "include"
    })
    .then(async res => {
        const data = await res.json();
        if (res.ok) {
            clearErrors("payment-errors");
            /* clearData([nameInput, cardNumberInput, cardExpirationInput, cvvInput]); */
        } else if(res.status == 403) {
            localStorage.setItem("navigation-current", "3");
            location.href = window.origin + "/src/pages/login.html"
        } else if(res.status == 400){
            throw new Error(JSON.stringify(data));
        }
    })
    .catch(err => {
        try {
            const errArray = getErrArray(err);
            clearErrors("payment-errors");
            showErrors(errArray, "payment-errors", paymentForm, payBtn);
        } catch (error) {
            location.href = window.origin + "/src/pages/500.html"
        }
    })
}