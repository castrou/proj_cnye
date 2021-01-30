const { ZODIAC_SWITCH_ON, ZODIAC_SWITCH_OFF, REGISTER_ZODIAC_OFF, REGISTER_ZODIAC_ON, ZODIAC_SET_COLOR, REGISTER_ZODIAC_COLOR } = require("./events")
const api = require('./api')

/**
 * This events defined in this file handle the 
 * events coming from the button presses (on, off, color).
 * The `handler` defines the logic involved when the event `name`
 * is emitted from the ipcRenderer channel to ipcMain channel.
 * 
 * The "registerEvent" is the event which is to be replied to by the
 * ipcRenderer and will update the state of whatever is listening
 * to the event.
 */

const SWITCH_ON = {
	name: ZODIAC_SWITCH_ON,
	handler: (event, args) => {
		const { sign } = args;
		const registerEvent = REGISTER_ZODIAC_ON(sign)
		api.toggleSign(sign).then(() => {
			event.reply(registerEvent, {
				success: true,
				sign
			})
		}).catch(err => {
			event.reply(registerEvent, {
				success: false,
				error: err
			})
		})
	}
}
const SWITCH_OFF = {
	name: ZODIAC_SWITCH_OFF,
	handler: (event, args) => {
		const { sign } = args;
		const registerEvent = REGISTER_ZODIAC_OFF(sign)
		api.toggleSign(sign).then(() => {
			event.reply(registerEvent, {
				success: true,
				sign
			})
		}).catch(err => {
			event.reply(registerEvent, {
				success: false,
				error: err
			})
		})
	}
}
const SET_COLOR = {
	name: ZODIAC_SET_COLOR,
	handler: (event, args) => {
		const { sign, color } = args;
		const registerEvent = REGISTER_ZODIAC_COLOR(sign)
		api.setSignColor(sign, color).then(() => {
			event.reply(registerEvent, {
				success: true,
				sign, color
			})
		}).catch(err => {
			event.reply(registerEvent, {
				success: false,
				error: err
			})
		})
	}
}
module.exports = {
	SWITCH_ON,
	SWITCH_OFF,
	SET_COLOR
}