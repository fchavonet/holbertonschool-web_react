export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getFooterCopy(isIndex) {
    if (isIndex === true) {
        return "Holberton School"
    } else {
        return "Holberton School main dashboard"
    }
}