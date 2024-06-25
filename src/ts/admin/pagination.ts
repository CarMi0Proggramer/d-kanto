import { Product } from "../../components/product";
import { updateListProduct } from "./updateListProduct";

async function getProducts() {
    let products:Product[] = await fetch("http://localhost:3000/products/")
    .then(async res => {
        if (res.ok) {
            const data = await res.json();
            return data;
        }else if (res.status === 404) {
            location.href= window.origin + "/src/pages/404.html"
        }else{
            location.href= window.origin + "/src/pages/500.html"
        }
    })
    .catch(err => {
        if(err) {
            location.href= window.origin + "/src/pages/500.html"
        }
    });

    totalProductsSpan.innerText = String(products.length);
    return products;
}

const totalProductsSpan = document.getElementById("total-products-quantity") as HTMLSpanElement;

/* LOAD PRODUCTS FUNCTION */
const products = await getProducts();
let lastIndex: number = 0;

export function loadProducts() {
    const initialIndex = lastIndex + 1;
    for (let i = 0; i < 6; i++) {
        if (products[lastIndex]) {
            updateListProduct(products[lastIndex])
            lastIndex++;
        }
    }

    calculateShowing(initialIndex, products);
}

/* CALCULATING THE NUMBER OF PRODUCTS THAT IT HAS BEEN SHOWED */
const productsShowing = document.getElementById("products-showing") as HTMLHeadingElement;
const showingTooltip = document.getElementById("results-tooltip") as HTMLDivElement;
const tooltipArrow = document.getElementById("tooltip-arrow") as HTMLDivElement;
const showingBelowRange = document.getElementById("products-showing-below-range") as HTMLSpanElement;
const showingBelowQuantity = document.getElementById("products-showing-below-quantity") as HTMLSpanElement;

function calculateShowing(index:number, products: Product[]) {
    if ((index + 5) <= products.length) {
        productsShowing.innerText = `${index}-${index + 5} (${products.length})`;
        showingTooltip.innerText= `Showing ${index}-${index + 5} of ${products.length} results`;
        showingBelowRange.innerText = `${index}-${index + 5}`
    }else{
        productsShowing.innerText = `${index}-${products.length} (${products.length})`;
        showingTooltip.textContent= `Showing ${index}-${products.length} of ${products.length} results`;
        showingBelowRange.innerText= `${index}-${products.length}`;
    }

    showingTooltip.appendChild(tooltipArrow);
    showingBelowQuantity.innerText = String(products.length);
}