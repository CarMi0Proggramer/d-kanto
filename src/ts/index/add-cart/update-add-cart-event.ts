export function updateAddCartEvent(container: HTMLDivElement) {
    const addBtn = container.querySelector(".add-to-cart") as HTMLAnchorElement;
    addBtn.addEventListener("click", () => {
        /* EXTRACTING DATA */
        const id = Number(container.dataset.id);
        
        /* SETTING ELEMENTS */
        let items: number[] = [];
        const localItems = JSON.parse(localStorage.getItem("items") as string);

        if (localItems instanceof Array) {
            items = localItems;
        }
        items.push(id)

        /* PUTTING AWAY THE ITEMS */
        localStorage.setItem("items", JSON.stringify(items));
    });
}