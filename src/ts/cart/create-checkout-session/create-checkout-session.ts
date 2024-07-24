import { getLineItems } from "../line-items/get-line-items";

export async function createCheckoutSession() {
    const lineItems = await getLineItems();
    const summary = JSON.parse(localStorage.getItem("order-summary") as string);

    await fetch("https://d-kanto-backend.onrender.com/purchases/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            total_amount: summary.total,
            lineItems: lineItems
        })
    })
    .then(res => res.json())
    .then(data => {
        location.href = data.url
    })
    .catch(err => {
        console.log(err);        
    })
}