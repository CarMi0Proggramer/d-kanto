/* VARS */
const originalPriceElement = document.getElementById("order-original-price") as HTMLElement;
const savingsElement = document.getElementById("order-savings") as HTMLElement;
const taxElement = document.getElementById("order-tax") as HTMLElement;
const totalElement = document.getElementById("order-total") as HTMLElement;

export type OrderSummary = {
    originalPrice: number,
    savings: number,
    tax: number,
    total: number
}
export function loadOrderSummary() {
    const summary: OrderSummary = JSON.parse(localStorage.getItem("order-summary") as string);

    if (summary) {
        originalPriceElement.innerText = '$' + summary.originalPrice;
        savingsElement.innerText = '-$' + summary.savings;
        taxElement.innerText = '$' + summary.tax;
        totalElement.innerText = '$' + summary.total;
    }
}

export function clearOrderSummary() {
    originalPriceElement.innerText = "$" + 0;
    savingsElement.innerText = "-$" + 0;
    taxElement.innerText = "$" + 0;
    totalElement. innerText = "$" + 0;
}