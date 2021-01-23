const { buttonStyles } = require('../types')
function createButtonElement(sign) {
    const button = document.createElement("button");
    button.innerText = sign;
    button.classList.add(buttonStyles.root);
    button.classList.add(buttonStyles.offline);
    button.id = `node-${sign}`;
    return button;
}
function createListElement(sign) {
	const listElement = document.createElement('li')
	listElement.id = `ui-node-${sign}`
	listElement.innerText = sign
	listElement.classList.add('ui-node')
	return listElement
}
module.exports = {
	createButtonElement,
	createListElement
}