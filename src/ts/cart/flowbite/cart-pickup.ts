import { InputCounter } from "flowbite";
import { products } from "../load-cart/load-cart";
import { generatePrice } from "../../../components/cart-product";

export function updateInputCounter(container: HTMLDivElement) {
    const input = container.querySelector("#counter-input") as HTMLInputElement;
    const increment = container.querySelector("#increment-button") as HTMLButtonElement;
    const decrement = container.querySelector("#decrement-button") as HTMLButtonElement;

    const inputCounter = new InputCounter(input, increment, decrement);
    inputCounter.updateOnDecrement(() => {
        let target = inputCounter._targetEl as HTMLInputElement;
        let value = Number(target.value);

        if (value <=0) {
            value = 1;
        }

        target.value = String(value);
        updatePrice(container,value);
    })

    inputCounter.updateOnIncrement(() => updatePrice(container, Number(input.value)));
}

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