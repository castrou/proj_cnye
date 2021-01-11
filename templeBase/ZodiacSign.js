const { buttonStyles } = require("./types");
class ZodiacSign {
    sign = "";
    isActive = false;
    node;
    uiNode;
    constructor(sign, uiNode) {
        this.sign = sign;
        this.isActive = false;
        const button = document.createElement("button");
        button.onclick = function () {
            ipcRenderer.send("zodiac-clicked", sign);
            button.setAttribute("disabled", true);
            button.classList.add(buttonStyles.loading);
        };
        button.innerText = sign;
        button.classList.add(buttonStyles.root);
        button.classList.add(buttonStyles.offline);
        button.id = `node-${sign}`;
        this.uiNode = uiNode;
        this.node = button;
    }
    turnOn() {
        swapClass(this.node, buttonStyles.offline, buttonStyles.online);
        swapClass(this.uiNode, 'disappear', 'appear')
    }
    turnOff() {
        swapClass(this.node, buttonStyles.online, buttonStyles.offline);
        swapClass(this.uiNode, 'appear', 'disappear')
    }
    toggleActive() {
        this.isActive = !this.isActive;
        this.node.classList.remove(buttonStyles.loading);
        this.node.removeAttribute("disabled");

        if (this.isActive) {
            this.turnOff()
        } else {
            this.turnOn()
        }

        return this;
    }
}
module.exports = ZodiacSign;
const swapClass = (element, addClass, removeClass) => {
    if (addClass instanceof Array) {
        element.classList.add(...addClass);
    } else if (typeof addClass === 'string') {
        element.classList.add(addClass);
    } else {
        throw new Error(`addClass must be either an array or a string.
        received ${addClass} instead`);
    }
    if (removeClass instanceof Array) {
        element.classList.remove(...removeClass);
    } else if (typeof removeClass === 'string') {
        element.classList.remove(removeClass);
    } else {
        throw new Error(`removeClass must be either an array or a string
        received ${removeClass} instead`);
    }
};
