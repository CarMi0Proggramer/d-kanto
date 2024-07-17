import { getQuantities } from "../load-cart/load-cart";
import { getLineItems } from "./get-line-items";

export async function loadLineItems() {
    let items: number[] = JSON.parse(localStorage.getItem("items") as string);
    let itemQuantities = getQuantities(items);
    let lineItems = await getLineItems(itemQuantities);

    localStorage.setItem("line-items", JSON.stringify(lineItems));
}