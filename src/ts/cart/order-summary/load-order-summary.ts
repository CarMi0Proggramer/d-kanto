import { applyDiscountCode } from "./apply-code";

/* VARS */
const originalPriceElement = document.getElementById("order-original-price") as HTMLElement;
const savingsElement = document.getElementById("order-savings") as HTMLElement;
const taxElement = document.getElementById("order-tax") as HTMLElement;
const totalElement = document.getElementById("order-total") as HTMLElement;

/* LOADING ORDER SUMMARY */
export function loadOrderSummary() {
    const items: number[] = JSON.parse(localStorage.getItem("items") as string);
    const applied = localStorage.getItem("applied-code") as string;

    let discount = generatePercentOff(items.length);

    /* SETTING ORIGINAL pRICE */
    let originalPrice = getOriginalPrice();
    originalPriceElement.innerText = '$' + originalPrice;

    /* SETTING SAVINGS */
    let savings = getSavings(originalPrice, discount);
    savingsElement.innerText = '-$' + savings;

    /* SETTING TAXES */
    let tax = getTax(originalPrice);
    taxElement.innerText = '$' + tax;

    /* SETTING TOTAL */
    let total = getTotalPrice(originalPrice, savings, tax);
    totalElement.innerText = '$' + total;

    localStorage.setItem("order-summary", JSON.stringify({
        originalPrice: originalPrice,
        savings: savings,
        tax: tax,
        total: total
    }));

    if (applied == "true") {
        applyDiscountCode(true);
    }

}

/* GENERATING A DISCOUNT */
function generatePercentOff(length: number) {
    if (length > 3 && length <= 7) {
        return 5;
    }else if(length > 7 && length <= 12){
        return 10
    }else if (length > 12) {
        return 15;
    }

    return 0;
}

/* GETTING ORIGINAL PRICE */
function getOriginalPrice() {
    let total = 0;

    const productContainers = document.getElementsByClassName("cart-product") as HTMLCollectionOf<HTMLDivElement>;
    for (const container of productContainers) {
        const priceContainer = container.querySelector("#cart-price-container") as HTMLParagraphElement;
        let value = Number( priceContainer.innerText.slice(1) );
        total+= value
    }

    return Math.round(total);
}

/* GETTING SAVIINGS */
function getSavings(originalPrice: number, discount: number) {
    let total =  (originalPrice * discount) / 100;
    return Math.round(total);
}

/* GETTING TAXES */
function getTax(originalPrice: number) {
    let total = originalPrice * 7 / 100;
    return Math.round(total);
}

/* GETTING TOTAL PRICE */
function getTotalPrice(originalPrice: number, savings: number, tax: number) {
    let total = originalPrice - savings + tax;
    return total;
}