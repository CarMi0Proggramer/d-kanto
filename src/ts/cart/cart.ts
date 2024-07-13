/* import { getProducts } from "../index/pagination/get-products"; */

/* CONTINUE SHOPPING */
let continueShopping = document.getElementById("continue-shopping") as HTMLAnchorElement;
continueShopping.addEventListener("click", () => {
    localStorage.setItem("navigation-current", "0");
})

window.addEventListener("load", async () => {/* 
    const products = await getProducts(); */
    const items: number[] = JSON.parse(localStorage.getItem("items") as string);
    let quantities: {
        id: number,
        quantity: number
    }[] = [];

    let match: number[] = [];
    for(let i of items){
        let count = 0;
        for(let j of items){
            if (j == i) {
                count++;
            }
        }
        

        if (!match.includes(i)) {
            quantities.push({
                id: i,
                quantity: count
            })
        }

        match.push(i);
    }

    console.log("Items: ", items);
    console.log("Quantities: ", quantities);
})