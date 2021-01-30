const { buttonStyles } = require('../types');
const { swapClass } = require('./helpers')

class ZodiacSign {
    sign = '';
    isActive = false;
    node;
    uiNode;
    ipcHandler;
    color;
    constructor(sign, uiNode, buttonNode, ipcHandler) {
        this.sign = sign;
        this.isActive = false;
        this.ipcHandler = ipcHandler 
        this.uiNode = uiNode;
        this.node = buttonNode;
        this.node.onclick = () => {
            this.sendSwitchEvent()
        }
        this.node.assignColorClickAction((color) => {
            this.sendSetColor(color)
        })
    }
    sendSetColor(color) {
        this.ipcHandler.sendSetColor(color)
    }
    sendSwitchEvent() {
        this.node.setAttribute('disabled', true);
        this.node.classList.add(buttonStyles.loading);
        if (this.isActive) {
            this.ipcHandler.sendSwitchOff();
        } else {
            this.ipcHandler.sendSwitchOn();
        }
    }
    setColor(color) {
        this.color = color;
        this.uiNode.innerText = `${this.sign}: ${this.color}`
    }
    setUILoading() {
        this.node.setAttribute('disabled', true);
        this.node.classList.add(buttonStyles.loading);
    }
    toggleUIOff() {
        this.isActive = !this.isActive;
        this.node.classList.remove(buttonStyles.loading);
        this.node.removeAttribute('disabled');
        swapClass(this.node, buttonStyles.offline, buttonStyles.online);
        swapClass(this.uiNode, 'disappear', 'appear');
    }
    toggleUIOn() {
        this.isActive = !this.isActive;
        this.node.classList.remove(buttonStyles.loading);
        this.node.removeAttribute('disabled');
        swapClass(this.node, buttonStyles.online, buttonStyles.offline);
        swapClass(this.uiNode, 'appear', 'disappear');
    }
    toggleUIActive() {
        this.isActive = !this.isActive;
        this.node.classList.remove(buttonStyles.loading);
        this.node.removeAttribute('disabled');

        if (this.isActive) {
            this.toggleUIOff();
        } else {
            this.toggleUIOn();
        }
        return this;
    }
}
module.exports = ZodiacSign;