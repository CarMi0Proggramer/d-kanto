import { InputCounter } from "flowbite";
import { products } from "../load-cart/load-cart";
import { generatePrice } from "../../../components/cart-product";
import { loadOrderSummary } from "../order-summary/load-order-summary";

export const inputCounters:InputCounter[] = [];

/* CREATING AN INPUT COUNTER AND ADDING EVENTS */
export function updateInputCounter(container: HTMLDivElement) {
    /* ELEMENTS */
    const input = container.querySelector("#counter-input") as HTMLInputElement;
    const increment = container.querySelector("#increment-button") as HTMLButtonElement;
    const decrement = container.querySelector("#decrement-button") as HTMLButtonElement;

    const inputCounter = new InputCounter(input, increment, decrement);
    inputCounters.push(inputCounter);

    /* UPDATING INCREMENT AND DECREMENT EVENTS */
    inputCounter.updateOnDecrement(() => {
        let target = inputCounter._targetEl as HTMLInputElement;
        let value = Number(target.value);

        if (value <=0) {
            value = 1;
        }

        target.value = String(value);
        updatePrice(container,value);
        updateItems({ add: false, container: container });
        loadOrderSummary();
    })

    inputCounter.updateOnIncrement(() => {
        updatePrice(container, Number(input.value));
        updateItems({ add: true, container: container });
        loadOrderSummary();
    });
}

/* UPDATING PRICE */
function updatePrice(container:HTMLDivElement ,quantity: number) {
    const id = Number(container.dataset.id);
    const priceContainer = container.querySelector("#cart-price-container") as HTMLParagraphElement;

    products.forEach( product => {
        if (product.id == id) {
            const price = generatePrice(product.price, quantity);
            priceContainer.innerText = "$" + price;
        }
    })
}

/* UPDATING ITEMS ARRAY */
type UpdateItemsOptions = {
    add: boolean,
    container: HTMLDivElement
}
function updateItems(options: UpdateItemsOptions) {
    const items:number[] = JSON.parse(localStorage.getItem("items") as string);

    let id = Number(options.container.dataset.id);

    if (options.add) {
        items.push(id);
        localStorage.setItem("items", JSON.stringify(items))
    }else{
        let one = 0;
        let newItems = items.filter(item => {
            if (one == 0 && item == id && notOnlyItem(items, item)) {
                one++;
                return;
            }

            return item;
        });

        localStorage.setItem("items", JSON.stringify(newItems));
    }
}

/* IF IT'S NOT THE ONLY ITEM, IT CAN REMOVE IT */
function notOnlyItem(items: number[], id: number) {
    let count = 0;
    for (const item of items) {
        if(item == id){
            count++;
        }
    }

    if (count > 1) {
        return true;
    }

    return false;
}