import { Product } from "../../../components/index-product";

/* GETTING ALL PRODUCTS FROM DATABASE */
export async function getProducts() {
    let products: Product[] = await fetch("http://localhost:3000/products/",{
        credentials: "include"
    })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                return data;
            } else if (res.status === 404) {
                location.href = window.origin + "/src/pages/404.html";
            } else {
                location.href = window.origin + "/src/pages/500.html";
            }
        })
        .catch((err) => {
            if (err) {
                location.href = window.origin + "/src/pages/500.html";
            }
        });

    return products;
}