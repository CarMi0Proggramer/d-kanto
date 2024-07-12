/* CONTINUE SHOPPING */
let continueShopping = document.getElementById("continue-shopping") as HTMLAnchorElement;
continueShopping.addEventListener("click", () => {
    localStorage.setItem("navigation-current", "0");
})