/* NAVIGATE FUNCTION */
export function navigate() {
    /* ELEMENTS */
    let navigationElements = document.getElementsByClassName("navigation-element") as HTMLCollectionOf<HTMLAnchorElement>;

    /* REMOVING DEFAULT CLASSES FROM DEFAULT ELEMENT */
    navigationElements[0].className = commonClases;

    /* LOADING NEW PAGE */
    let current = Number(localStorage.getItem("navigation-current"));
    navigationElements[current].className = focusClases;

    /* ADDING EVENTS */
    for (let el of navigationElements) {
        el.addEventListener("click", () => {
            focusPage(navigationElements, el);
        });
    }
}

/* FOCUS CLASSES */
let focusClases = "navigation-element block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";

/* COMMON CLASSES */
let commonClases = "navigation-element block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

function focusPage(navigationElements: HTMLCollectionOf<HTMLAnchorElement> ,element: HTMLAnchorElement) {

    /* REMOVING CLASSES FROM PREVIOUS FOCUSED ELEMENT */
    for (let item of navigationElements) {
        if (item.className == focusClases) {
            item.className = commonClases;
        }
    }

    element.className = focusClases;

    /* changing navigation current */
    for (let i = 0; i < navigationElements.length; i++) {
        if (navigationElements[i] == element) {
            localStorage.setItem("navigation-current", `${i}`)
        }
    }
}