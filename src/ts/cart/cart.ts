import { loadCartProducts } from "./load-cart/load-cart";
import { loadOrderSummary } from "./order-summary/load-order-summary";

/* CONTINUE SHOPPING */
let continueShopping = document.getElementById("continue-shopping") as HTMLAnchorElement;
continueShopping.addEventListener("click", () => {
    localStorage.setItem("navigation-current", "0");
})

window.addEventListener("load", async () => {
    await loadCartProducts();
    loadOrderSummary();
})