import { loadCartProducts } from "./load-cart/load-cart";
import { applyDiscountCode } from "./order-summary/apply-code";
import { loadOrderSummary } from "./order-summary/load-order-summary";

/* CONTINUE SHOPPING */
let continueShopping = document.getElementById("continue-shopping") as HTMLAnchorElement;
continueShopping.addEventListener("click", () => {
    localStorage.setItem("navigation-current", "0");
})

window.addEventListener("load", async () => {
    await loadCartProducts();
    loadOrderSummary();
    if (!("applied-code" in localStorage)) {
        localStorage.setItem("applied-code", "false");
    }

    const applyCodeForm = document.getElementById("apply-code-form") as HTMLFormElement;
    applyCodeForm.addEventListener("submit", event => {
        event.preventDefault();

        const applied = localStorage.getItem("applied-code") as string;
        if (applied == "false") {
            applyDiscountCode();
        }
    });
})