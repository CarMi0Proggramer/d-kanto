import { Product, generateRating } from "../../../components/product";

/* CATEGORY ALLOWED TYPES */
const enum CATEGORY_TYPES {
    TV = "TV",
    PC = "PC",
    GA = "GA",
    CL = "CL",
    FU = "FU",
    BK = "BK",
    SF = "SF",
    TL = "TL",
}

/* FINDING CATEGORY */
export function findCategory(category: string, inverse: boolean) {
    if (inverse) {
        switch (category) {
            case "Clothes":
                return CATEGORY_TYPES.CL;
                break;
            case "Furniture":
                return CATEGORY_TYPES.FU;
                break;
            case "Gaming/Console":
                return CATEGORY_TYPES.GA;
                break;
            case "PC":
                return CATEGORY_TYPES.PC;
                break;
            case "TV/Monitors":
                return CATEGORY_TYPES.TV;
                break;
            case "Books":
                return CATEGORY_TYPES.BK;
                break;
            case "Software":
                return CATEGORY_TYPES.SF;
                break;
            case "Toiletries":
                return CATEGORY_TYPES.TL;
                break;
            default:
                return "";
                break;
        }
    } else {
        switch (category) {
            case CATEGORY_TYPES.CL:
                return "Clothes";
                break;
            case CATEGORY_TYPES.FU:
                return "Furniture";
                break;
            case CATEGORY_TYPES.GA:
                return "Gaming/Console";
                break;
            case CATEGORY_TYPES.PC:
                return "PC";
                break;
            case CATEGORY_TYPES.TV:
                return "TV/Monitors";
                break;
            case CATEGORY_TYPES.BK:
                return "Books";
                break;
            case CATEGORY_TYPES.SF:
                return "Software";
                break;
            case CATEGORY_TYPES.TL:
                return "Toiletries";
                break;
            default:
                return "";
                break;
        }
    }
}

export let currentProductId: number;

/* UPDATING PREVIEW OR EDIT DRAWER COMPONENTS */
export async function updateEditPreviewData(
    container: HTMLTableRowElement,
    nameContainer: HTMLInputElement | HTMLHeadingElement,
    urlImgContainer: HTMLInputElement | HTMLImageElement,
    categoryContainer: HTMLSelectElement | HTMLElement,
    priceContainer: HTMLInputElement | HTMLHeadingElement,
    descriptionContainer: HTMLTextAreaElement | HTMLElement,
    stockContainer: HTMLInputElement | null,
    ratingContainer?: HTMLElement
) {
    /* GETTING ORIGINAL PRODUCT */
    let originalProduct: Product = await getProductById(
        Number(container.dataset.id)
    );

    /* SETTING NAME */
    if (nameContainer instanceof HTMLInputElement) {
        nameContainer.value = originalProduct.name;
    } else {
        nameContainer.innerText = originalProduct.name;
    }

    /* SETTING IMAGE */
    if (urlImgContainer instanceof HTMLInputElement) {
        urlImgContainer.value = originalProduct.urlimg;
    } else {
        urlImgContainer.src = originalProduct.urlimg;
    }

    /* SETTING CATEGORY */
    if (categoryContainer instanceof HTMLSelectElement) {
        categoryContainer.value = originalProduct.category;
    } else {
        categoryContainer.innerText = findCategory(
            originalProduct.category,
            false
        );
    }

    /* SETTING PRICE */
    if (priceContainer instanceof HTMLInputElement) {
        priceContainer.value = String(originalProduct.price).replace(".99", "");
    } else {
        priceContainer.innerText = String(originalProduct.price);
    }

    /* SETTING DESCRIPTION */
    if (descriptionContainer instanceof HTMLTextAreaElement) {
        descriptionContainer.value = originalProduct.description;
    } else {
        descriptionContainer.innerText = originalProduct.description;
    }

    /* SETTING STOCK */
    if (stockContainer != null) {
        stockContainer.value = String(originalProduct.stock);
    }

    /* SETTING RATING */
    if (ratingContainer) {
        ratingContainer.innerHTML = generateRating(originalProduct.rating, {
            preview: true,
        });
    }

    currentProductId = originalProduct.id;
}

/* GETTING PRODUCT BY ID FROM DATABASE */
async function getProductById(id: number) {
    let product: Product = await fetch(`https://d-kanto-backend.onrender.com/products/${id}`)
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

    return product;
}
