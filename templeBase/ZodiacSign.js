const { STATUS_CLASSES } = require('./types')
class ZodiacSign {
    sign = "";
    active = false;
    node;
    constructor(sign) {
        this.sign = sign;
        this.active = false;
        const button = document.createElement("button");
        button.onclick = function () {
            ipcRenderer.send("zodiac-clicked", sign);
            button.setAttribute("disabled", true);
            button.classList.add(STATUS_CLASSES.nodeselect.loading);
        };
        button.innerText = sign;
        button.classList.add(STATUS_CLASSES.nodeselect.root);
        button.classList.add(STATUS_CLASSES.nodeselect.offline);
        button.id = `node-${sign}`;
        this.node = button;
    }
    get isActive() {
        return this.active;
    }
    toggleActive() {
        this.active = !this.active;
        this.node.classList.remove(STATUS_CLASSES.nodeselect.loading);
        this.node.removeAttribute("disabled");
        if (this.active) {
            this.node.classList.add(STATUS_CLASSES.nodeselect.online);
            this.node.classList.remove(STATUS_CLASSES.nodeselect.offline);
        } else {
            this.node.classList.add(STATUS_CLASSES.nodeselect.offline);
            this.node.classList.remove(STATUS_CLASSES.nodeselect.online);
        }
        return this;
    }
}
module.exports = ZodiacSign