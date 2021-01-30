const ZODIAC_SWITCH_ON = 'ZODIAC_SWITCH_ON'
const ZODIAC_SWITCH_OFF = 'ZODIAC_SWITCH_OFF'

const REGISTER_ZODIAC_ON = (sign) => `REGISTER_ZODIAC_ON_${sign.toUpperCase()}`
const REGISTER_ZODIAC_OFF = (sign) => `REGISTER_ZODIAC_OFF_${sign.toUpperCase()}`

module.exports = {
	ZODIAC_SWITCH_ON,
	ZODIAC_SWITCH_OFF,
	REGISTER_ZODIAC_ON,
	REGISTER_ZODIAC_OFF
}