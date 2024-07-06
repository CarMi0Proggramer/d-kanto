import { Product, generateRating } from "../../../components/product";

const enum CATEGORY_TYPES{
    TV = "TV",
    PC = "PC",
    GA = "GA",
    CL = "CL",
    FU = "FU",
    BK = "BK",
    SF = "SF",
    TL = "TL"
}

export function findCategory(category: string, inverse: boolean) {
    if (inverse) {
        switch (category) {
            case "Clothes":
                return CATEGORY_TYPES.CL
                break;
            case "Furniture":
                return CATEGORY_TYPES.FU
                break;
            case "Gaming/Console":
                return CATEGORY_TYPES.GA
                break;
            case "PC":
                return CATEGORY_TYPES.PC
                break;
            case "TV/Monitors":
                return CATEGORY_TYPES.TV
                break;
            case "Books":
                return CATEGORY_TYPES.BK
                break;
            case "Software":
                return CATEGORY_TYPES.SF
                break;
            case "Toiletries":
                return CATEGORY_TYPES.TL
                break;
            default:
                return ""
                break;
        }
    }else{
        switch (category) {
            case CATEGORY_TYPES.CL:
                return "Clothes"
                break;
            case CATEGORY_TYPES.FU:
                return "Furniture"
                break;
            case CATEGORY_TYPES.GA:
                return "Gaming/Console"
                break;
            case CATEGORY_TYPES.PC:
                return "PC"
                break;
            case CATEGORY_TYPES.TV:
                return "TV/Monitors"
                break;
            case CATEGORY_TYPES.BK:
                return "Books"
                break;
            case CATEGORY_TYPES.SF:
                return "Software"
                break;
            case CATEGORY_TYPES.TL:
                return "Toiletries"
                break;
            default:
                return ""
                break;
        }
    }
}

export let currentProductId: number;

export async function updateEditPreviewData(container: HTMLTableRowElement, nameContainer: HTMLInputElement | HTMLHeadingElement, urlImgContainer:HTMLInputElement | HTMLImageElement, categoryContainer: HTMLSelectElement | HTMLElement, priceContainer: HTMLInputElement | HTMLHeadingElement, descriptionContainer: HTMLTextAreaElement | HTMLElement, stockContainer: HTMLInputElement | null, ratingContainer?: HTMLElement) {
    let originalProduct: Product = await getProductById(Number(container.dataset.id));

    if (nameContainer instanceof HTMLInputElement) {
        nameContainer.value = originalProduct.name;
    } else{
        nameContainer.innerText = originalProduct.name;
    }

    if (urlImgContainer instanceof HTMLInputElement) {
        urlImgContainer.value = originalProduct.urlimg;
    }else{
        urlImgContainer.src = originalProduct.urlimg;
    }

    if (categoryContainer instanceof HTMLSelectElement) {
        categoryContainer.value = originalProduct.category;
    }else{
        categoryContainer.innerText = findCategory(originalProduct.category, false)
    }

    if (priceContainer instanceof HTMLInputElement) {
        priceContainer.value = String(originalProduct.price).replace("\.99", "");
    }else{
        priceContainer.innerText = String(originalProduct.price);
    }

    if (descriptionContainer instanceof HTMLTextAreaElement) {
        descriptionContainer.value = originalProduct.description;
    }else{
        descriptionContainer.innerText = originalProduct.description;
    }

    if (stockContainer != null) {
        stockContainer.value = String(originalProduct.stock);
    }

    if (ratingContainer) {
        ratingContainer.innerHTML = generateRating(originalProduct.rating, { preview: true });
    }

    currentProductId = originalProduct.id;
}

async function getProductById(id: number) {
    let product: Product = await fetch(`http://localhost:3000/products/${id}`)
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