import { loadOrderSummary } from "../order-summary/load-order-summary";

export function updateRemoveFromCart(container: HTMLDivElement) {
    /* UPDATING DELETE BUTTON */
    const deleteBtn = container.querySelector("#cart-remove") as HTMLButtonElement;
    deleteBtn.addEventListener("click", () => deleteContainer(container));
}

/* DELETING A CONTAINER */
function deleteContainer(container: HTMLDivElement) {
    let items: number[] = JSON.parse(localStorage.getItem("items") as string);
    const id = Number( container.dataset.id );

    items = items.filter(item => item != id);
    localStorage.setItem("items", JSON.stringify(items));

    container.remove();
    loadOrderSummary();
}