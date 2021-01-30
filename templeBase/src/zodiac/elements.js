const { buttonStyles } = require('../types')
const colors = [ 'blue', 'red', 'green', 'yellow' ]
function createColorButton(color, sign) {
	const colorNode = document.createElement('div')
	colorNode.classList.add('color', color)
	colorNode.id = `${sign}-${color}`
	return colorNode
}
function createButtonElement(sign) {
    const button = document.createElement("button");
    button.innerText = sign;
    button.classList.add(buttonStyles.root);
    button.classList.add(buttonStyles.offline);
	button.id = `node-${sign}`;
	const set = document.createElement('div');
	set.classList.add('colorset')
	set.onclick = (event) => {
		event.preventDefault()
		event.stopPropagation()
	}
	const colorNodes = []
	colors.forEach(color => {
		const colorNode = createColorButton(color, sign)
		colorNodes.push({color, node: colorNode})
		set.appendChild(colorNode)
	})
	button.assignColorClickAction = function(func) {
		colorNodes.forEach(element => {
			element.node.onclick = event => {
				event.preventDefault()
				event.stopPropagation()
				func(element.color)
			}
		})
	}
	button.appendChild(set)
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