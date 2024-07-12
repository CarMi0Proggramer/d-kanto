/* ESTIMATING THE CURRENT PAGE AND GIVING IT A BACKGROUND COLOR */
/* VARIABLES */
export let current = 0;
type EstimatePageOptions = {
    current: number;
    especificPage?: number;
};
/* ESTIMATING CURRENT PAGE FUNCTION */
export function estimateCurrentPage(options: EstimatePageOptions) {
    /* GETTING BASIC VARIABLES */
    const bgColor = getBgColor();
    const alternateColor = getAlternateColor();
    const ceils = Array.from(
        document.querySelectorAll(`a[name="pagination-ceil"]`)
    );

    /* SETTING BG COLOR */
    if (options.especificPage) {
        for (const ceil of ceils) {
            if (Number(ceil.textContent) === options.especificPage) {
                ceil.classList.remove(alternateColor);
                ceil.classList.add(bgColor);
                options.current = ceils.indexOf(ceil);
            }
        }
    } else {
        ceils[options.current].classList.remove(alternateColor);
        ceils[options.current].classList.add(bgColor);
    }

    /* CHANGING TO THE NEW VALUE */
    current = options.current;
}

/* GETTING BG COLOR */
export function getBgColor() {
    const lightMode = "bg-gray-300";
    const darkMode = "dark:bg-gray-700";

    if (document.documentElement.classList.contains("dark")) {
        return darkMode;
    } else {
        return lightMode;
    }
}

/* GETTING ALTERNATE COLOR */
export function getAlternateColor() {
    const lightMode = "bg-white";
    const darkMode = "dark:bg-gray-800";

    if (document.documentElement.classList.contains("dark")) {
        return darkMode;
    } else {
        return lightMode;
    }
}