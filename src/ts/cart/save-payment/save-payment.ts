export function savePayment() {
    const data = JSON.parse(localStorage.getItem("line-items") as string);
    fetch("http://localhost:3000/purchases/save-payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify(data),
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
}