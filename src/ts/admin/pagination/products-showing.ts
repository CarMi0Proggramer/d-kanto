import { Product } from "../../../components/product";
import { products } from "./pagination";

/* THE NUMBER OF PRODUCTS THAT THE USER IS SEEING */
export function calculateShowing(index: number, arrProduct: Product[]) {
    /* CALCULATING THE NUMBER OF PRODUCTS THAT IT HAS BEEN SHOWED */
    const totalProductsSpan = document.getElementById(
        "total-products-quantity"
    ) as HTMLSpanElement;
    const productsShowing = document.getElementById(
        "products-showing"
    ) as HTMLHeadingElement;
    const showingTooltip = document.getElementById(
        "results-tooltip"
    ) as HTMLDivElement;
    const tooltipArrow = document.getElementById("tooltip-arrow") as HTMLDivElement;
    const showingBelowRange = document.getElementById(
        "products-showing-below-range"
    ) as HTMLSpanElement;
    const showingBelowQuantity = document.getElementById(
        "products-showing-below-quantity"
    ) as HTMLSpanElement;

    totalProductsSpan.innerText = String(products.length);

    if (index + 5 <= arrProduct.length) {
        productsShowing.innerText = `${index}-${index + 5} (${
            arrProduct.length
        })`;
        showingTooltip.innerText = `Showing ${index}-${index + 5} of ${
            arrProduct.length
        } results`;
        showingBelowRange.innerText = `${index}-${index + 5}`;
    } else {
        productsShowing.innerText = `${index}-${arrProduct.length} (${arrProduct.length})`;
        showingTooltip.textContent = `Showing ${index}-${arrProduct.length} of ${arrProduct.length} results`;
        showingBelowRange.innerText = `${index}-${arrProduct.length}`;
    }

    showingTooltip.appendChild(tooltipArrow);
    showingBelowQuantity.innerText = String(arrProduct.length);
}