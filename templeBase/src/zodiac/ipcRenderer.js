const { ipcRenderer } = require("electron");
const { REGISTER_ZODIAC_ON, REGISTER_ZODIAC_OFF, ZODIAC_SWITCH_OFF, ZODIAC_SWITCH_ON } = require('../events')
const noop = () => null
class IPCRenderHandler {
	sign;
    constructor(zodiacSign) {
		this.sign = zodiacSign
    }
    registerHandler(eventName, handler) {
        ipcRenderer.on(eventName, handler);
    }
	sendSwitchOn() {
        ipcRenderer.send(ZODIAC_SWITCH_ON, this.sign);
	}
    sendSwitchOff() {
        ipcRenderer.send(ZODIAC_SWITCH_OFF, this.sign);
    }
}
const handlers = {
    REGISTER_ON: {
        makeName: (sign) => REGISTER_ZODIAC_ON(sign),
        makeHandler: (onSuccess = noop, onError = noop) => (event, arg) => {
            if (arg.success) {
                onSuccess()
            } else {
                onError()
            }
        }
    },
    REGISTER_OFF: {
        makeName: (sign) => REGISTER_ZODIAC_OFF(sign),
        makeHandler: (onSuccess = noop, onError = noop) => (event, arg) => {
            if (arg.success) {
                onSuccess()
            } else {
                onError()
            }
        }
    }
}

module.exports = {
    IPCRenderHandler,
    handlers
}
