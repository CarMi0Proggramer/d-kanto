import { navigate } from "./ts/index/navigation/navigation";
import { current, estimateCurrentPage } from "./ts/index/pagination/estimate-page";
import { paginate } from "./ts/index/pagination/paginate";

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
        paginate();
        setThemeIcon();
    }
    navigate();
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