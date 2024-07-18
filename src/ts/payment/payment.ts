import { executePayment, paymentForm } from "./execute-payment/execute-payment";
import { loadOrderSummary } from "./order-summary/order-summary";

window.addEventListener("load", () => {
    loadOrderSummary();
    paymentForm.addEventListener("submit", event => {
        event.preventDefault();
        executePayment();
    });
});