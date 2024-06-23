import { Product } from "../components/product";

const drawerName = document.getElementById("drawer-name") as HTMLInputElement;
const drawerUrlImage = document.getElementById("update-product-img") as HTMLInputElement;
const drawerCategory = document.getElementById("drawer-category") as HTMLSelectElement;
const drawerPrice = document.getElementById("update-product-price") as HTMLInputElement;
const drawerDescription = document.getElementById("drawer-description") as HTMLTextAreaElement;
export let currentProductName:string;

export async function updateEditData(container: HTMLTableRowElement) {
    const productName = container.querySelector(
        `div[name="product-name"]`
    ) as HTMLDivElement;
    const originalProduct: Product = await getProductByName(productName.innerText);
    drawerName.value = originalProduct.name;
    drawerUrlImage.value = originalProduct.urlimg;
    drawerCategory.value = originalProduct.category;
    drawerPrice.value = String(originalProduct.price);
    drawerDescription.value = originalProduct.description;

    currentProductName = originalProduct.name;
}

async function getProductByName(name: string) {
    let product: Product = await fetch(`http://localhost:3000/get-product/${name}`)
    .then(async res => {
        if (res.ok) {
            const data = await res.json();
            return data;
        }else if (res.status === 404) {
            location.href = window.origin + "/src/pages/404.html";
        }else{
            location.href = window.origin + "/src/pages/500.html";
        }
    })
    .catch(err => {
        if (err) {
            location.href = window.origin + "/src/pages/500.html";
        }
    });

    return product;
}