const { ipcRenderer } = require("electron");
const {
    REGISTER_ZODIAC_ON,
    ZODIAC_SWITCH_ON,
    REGISTER_ZODIAC_OFF,
    ZODIAC_SWITCH_OFF,
} = require("./events");
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
        ipcRenderer.on(REGISTER_ZODIAC_OFF(sign), (event, arg) => {
            if (arg.success) {
                this.toggleUIActive();
            } else {
                console.log("error", arg.error);
            }
        });
        ipcRenderer.on(REGISTER_ZODIAC_ON(sign), (event, arg) => {
            if (arg.success) {
                this.toggleUIActive();
            } else {
                console.log("error", arg.error);
            }
        });
        button.onclick = () => {
            this.sendSwitchEvent();
        };
        button.innerText = sign;
        button.classList.add(buttonStyles.root);
        button.classList.add(buttonStyles.offline);
        button.id = `node-${sign}`;
        this.uiNode = uiNode;
        this.node = button;
    }
    sendSwitchEvent() {
        this.node.setAttribute("disabled", true);
        this.node.classList.add(buttonStyles.loading);
        if (this.isActive) {
            this.sendSwitchOff();
        } else {
            this.sendSwitchOn();
        }
    }
    sendSwitchOn() {
        ipcRenderer.send(ZODIAC_SWITCH_ON, this.sign);
    }
    sendSwitchOff() {
        ipcRenderer.send(ZODIAC_SWITCH_OFF, this.sign);
    }
    toggleUIOn() {
        swapClass(this.node, buttonStyles.offline, buttonStyles.online);
        swapClass(this.uiNode, "disappear", "appear");
    }
    toggleUIOff() {
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
