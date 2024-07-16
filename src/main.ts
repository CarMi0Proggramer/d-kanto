import { navigate } from "./ts/index/navigation/navigation";
import { current, estimateCurrentPage } from "./ts/index/pagination/estimate-page";
import { paginate } from "./ts/index/pagination/paginate";
import { changeToLogOut } from "./ts/sign-up/change-to-log-out";

const indexLocation = [
    window.origin,
    window.origin + '/',
    window.origin + '/index.html',
    window.origin + '/index.html#',
]

/* ADDING NAVIGATE EVENT */
window.addEventListener("load", () => {
    if (indexLocation.includes(location.href)) {
        localStorage.setItem("navigation-current", "0");
        
        if (!("items" in localStorage)) {
            localStorage.setItem("items", JSON.stringify( [] ));
        }

        paginate();
        setThemeIcon();
    }
    navigate();

    if ("session-data" in localStorage) {
        changeToLogOut();
    }
})

/* SET THEME ICON FUNCTION */
function setThemeIcon() {
    const iconTheme = document.getElementById(
        "theme-toggle"
    ) as HTMLButtonElement;
    iconTheme.addEventListener("click", () => {
        setTimeout(() => {
            estimateCurrentPage({ current: current });
        }, 0);
    });
}