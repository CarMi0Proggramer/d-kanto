import { getQuantities } from "../load-cart/load-cart";
import { createLineItems } from "./create-line-items";

export async function getLineItems() {
    let items: number[] = JSON.parse(localStorage.getItem("items") as string);
    let itemQuantities = getQuantities(items);
    let lineItems = await createLineItems(itemQuantities);

    return lineItems;
}