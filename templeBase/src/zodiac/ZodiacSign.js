const { REGISTER_ZODIAC_ON, REGISTER_ZODIAC_OFF } = require("../events");
const { buttonStyles } = require("../types");

class ZodiacSign {
    sign = "";
    isActive = false;
    node;
    uiNode;
    ipcHandler;
    constructor(sign, uiNode, buttonNode, ipcHandler) {
        this.sign = sign;
        this.isActive = false;
        this.ipcHandler = ipcHandler 
        this.uiNode = uiNode;
        this.node = buttonNode;
        this.node.onclick = () => {
            this.sendSwitchEvent()
        }
    }
    sendSwitchEvent() {
        this.node.setAttribute("disabled", true);
        this.node.classList.add(buttonStyles.loading);
        if (this.isActive) {
            this.ipcHandler.sendSwitchOff();
        } else {
            this.ipcHandler.sendSwitchOn();
        }
    }
    setUILoading() {
        this.node.setAttribute("disabled", true);
        this.node.classList.add(buttonStyles.loading);
    }
    toggleUIOff() {
        this.isActive = !this.isActive;
        this.node.classList.remove(buttonStyles.loading);
        this.node.removeAttribute("disabled");
        swapClass(this.node, buttonStyles.offline, buttonStyles.online);
        swapClass(this.uiNode, "disappear", "appear");
    }
    toggleUIOn() {
        this.isActive = !this.isActive;
        this.node.classList.remove(buttonStyles.loading);
        this.node.removeAttribute("disabled");
        swapClass(this.node, buttonStyles.online, buttonStyles.offline);
        swapClass(this.uiNode, "appear", "disappear");
    }
    toggleUIActive() {
        this.isActive = !this.isActive;
        this.node.classList.remove(buttonStyles.loading);
        this.node.removeAttribute("disabled");

        if (this.isActive) {
            this.toggleUIOff();
        } else {
            this.toggleUIOn();
        }
        return this;
    }
}
module.exports = ZodiacSign;
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
