import { OrderSummary } from "../../payment/order-summary/order-summary";

/* ACCEPTED DISCOUNT CODES */
const ACCEPTED_CODES = [
    "cm_dev06"
];

/* VARS */
const codeInput = document.getElementById("voucher") as HTMLInputElement;

export function applyDiscountCode(apply?: boolean) {
    if (ACCEPTED_CODES.includes(codeInput.value) || apply) {
        const summary: OrderSummary = JSON.parse(localStorage.getItem("order-summary") as string);

        /* SAVINGS */
        let rest = Math.round(summary.total * 20 / 100);
        summary.savings += rest;
        /* TOTAL */
        let newTotal = summary.total - rest;
        summary.total = newTotal;

        /* SETTING TOTAL */
        const totalElement = document.getElementById("order-total") as HTMLElement;
        totalElement.innerText = '$' + summary.total;
        /* SETTING SAVINGS */
        const savingsElement = document.getElementById("order-savings") as HTMLElement;
        savingsElement.innerText = '-$' + summary.savings;

        localStorage.setItem("order-summary", JSON.stringify(summary));
        localStorage.setItem("applied-code", "true");
    }
}