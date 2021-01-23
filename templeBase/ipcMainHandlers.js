const { ZODIAC_SWITCH_ON, ZODIAC_SWITCH_OFF, REGISTER_ZODIAC_OFF, REGISTER_ZODIAC_ON } = require("./events")
const { apiToggleSign } = require('./api')

const SWITCH_ON = {
	name: ZODIAC_SWITCH_ON,
	handler: (event, sign) => {
		const registerEvent = REGISTER_ZODIAC_ON(sign)
		apiToggleSign(sign).then(() => {
			event.reply(registerEvent, {
				success: true,
				sign
			})
		}).catch(err => {
		})
	}
}
const SWITCH_OFF = {
	name: ZODIAC_SWITCH_OFF,
	handler: (event, sign) => {
		const registerEvent = REGISTER_ZODIAC_OFF(sign)
		apiToggleSign(sign).then(() => {
			event.reply(registerEvent, {
				success: true,
				sign
			})
		}).catch(err => {
		})
	}
}
module.exports = {
	SWITCH_ON,
	SWITCH_OFF
}