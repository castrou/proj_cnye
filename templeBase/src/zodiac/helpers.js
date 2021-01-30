const swapClass = (element, addClass, removeClass) => {
    if (addClass instanceof Array) {
        element.classList.add(...addClass);
    } else if (typeof addClass === "string") {
        element.classList.add(addClass);
    } else {
        throw new Error(`addClass must be either an array or a string.
        received ${addClass} instead`);
    }
    if (removeClass instanceof Array) {
        element.classList.remove(...removeClass);
    } else if (typeof removeClass === "string") {
        element.classList.remove(removeClass);
    } else {
        throw new Error(`removeClass must be either an array or a string
        received ${removeClass} instead`);
    }
};
module.exports = {
	swapClass
}