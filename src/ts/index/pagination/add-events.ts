import { sectionsNumber } from "./calculate-pagination";
import { changePage, pages } from "./change-page";
import { current } from "./estimate-page";
import { count, lastIndex, loadProducts } from "./load-products";
import { products } from "./paginate";

export function addEvents() {
    const previusEl = document.getElementById("previous-page") as HTMLElement;
    const nextEl = document.getElementById("next-page") as HTMLElement;

    /* DUE TO THE PAGINATION COMPONENT IT'S CREATED AGAIN WHEN THERE'S ANY OF THIS OPTIONS, I NEED TO ADD THE EVENTS AGAIN */
    previusEl.addEventListener("click", previousPage);
    nextEl.addEventListener("click", nextPage);
}

/* CHANGING TO A PREVIOUS PAGE */
function previousPage() {
    /* DELETING CONTAINERS */
    const containers = document.querySelectorAll(
        `.product-container`
    );
    containers.forEach((el) => el.remove());

    /* LOADING PRODUCTS */
    loadProducts({
        inverse: true,
        arrProduct: products,
        index: lastIndex,
        counter: count
    });
        changePage({
        next: false,
        current: current,
        pages: pages,
        sectionsNumber: sectionsNumber,
        arrProduct: products,
    });
}

/* CHANGING TO A NEXT PAGE */
function nextPage() {
    /* DELETING CONTAINERS */
    const containers = document.querySelectorAll(
        `.product-container`
    );
    containers.forEach((el) => el.remove());

    /* LOADING PRODUCTS */
    loadProducts({
        inverse: false,
        arrProduct: products,
        index: lastIndex,
        counter: count
    });
    changePage({
        next: true,
        current: current,
        pages: pages,
        sectionsNumber: sectionsNumber,
        arrProduct: products,
    });
}