import { Product } from "../../../components/index-product";

/* OPTIONS */
export type CalcIndexsOptions = {
    arrProduct: Product[],
    index: number,
    counter: number,
    inverse: boolean,
}

/* ESTIMATING INIT AND LAST INDEXS */
export function calcInitLastIndex(options:CalcIndexsOptions) {
    /* GETTING VALUES */
    if (options.counter == 6) {
        options.index = options.inverse ? options.index - 12 : options.index;
    } else {
        options.index = options.inverse ? options.index - (6 + options.counter) : options.index;
    }

    /* CHECKING VALUES */
    if (options.index < 0) {
        options.index = 0;
    } else if (options.index == options.arrProduct.length && !options.inverse) {
        options.index = options.index - options.counter;
    }

    let index = options.index

    return index;
}