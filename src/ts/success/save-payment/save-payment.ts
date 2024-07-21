export function savePayment() {
    const data = JSON.parse(localStorage.getItem("line-items") as string);
    const summary = JSON.parse(localStorage.getItem("order-summary") as string);
    fetch("https://d-kanto-backend.onrender.com/purchases/save-payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify({
            lineItems: data,
            total_amount: summary.total
        }),
        credentials: "include"
    })
    .then(async res => {
        const data = await res.json();
        
        if (res.ok) {
            clearLocalStorage();
        } else if(res.status == 403) {
            localStorage.setItem("navigation-current", "3");
            location.href = window.origin + "/src/pages/login.html"
        } else if(res.status == 400){
            throw new Error(JSON.stringify(data));
        }
    })
    .catch(err => console.log(err))
}

function clearLocalStorage() {
    localStorage.removeItem("items");
    localStorage.removeItem("line-items");
    localStorage.removeItem("order-summary");
}