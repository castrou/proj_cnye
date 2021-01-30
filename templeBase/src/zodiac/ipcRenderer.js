const { ipcRenderer } = require("electron");
const { 
    REGISTER_ZODIAC_ON, REGISTER_ZODIAC_OFF,  REGISTER_ZODIAC_COLOR,
    ZODIAC_SET_COLOR, ZODIAC_SWITCH_OFF, ZODIAC_SWITCH_ON } = require('../events')
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
        ipcRenderer.send(ZODIAC_SWITCH_ON, { sign: this.sign });
	}
    sendSwitchOff() {
        ipcRenderer.send(ZODIAC_SWITCH_OFF, { sign: this.sign });
    }
    sendSetColor(color) {
        console.log(this.sign)
        console.log(color)
        ipcRenderer.send(ZODIAC_SET_COLOR, { sign: this.sign, color })
    }
}
/**
 * These handlers are really handler configs
 * They handle the replies from the ipcMain channel.
 */
const makeHandler = (onSuccess = noop, onError = (args) => {
    console.warn(args)
}) => {
    return function(event, args) {
        if(args.success) {
            onSuccess(args)
        } else {
            onError(args)
        }
    }
}
const handlers = {
    REGISTER_ON: {
        makeName: (sign) => REGISTER_ZODIAC_ON(sign),
        makeHandler
    },
    REGISTER_OFF: {
        makeName: (sign) => REGISTER_ZODIAC_OFF(sign),
        makeHandler
    },
    REGISTER_COLOR_SET: {
        makeName: (sign) => REGISTER_ZODIAC_COLOR(sign),
        makeHandler
    }
}

module.exports = {
    IPCRenderHandler,
    handlers
}
