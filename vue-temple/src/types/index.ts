export interface Zodiac {
	name: string;
}
export type ColorOption = ''
	| 'LED_RED'
	| 'LED_GREEN1'
	| 'LED_BLUE1'
	| 'LED_WHITE'
	| 'LED_ORANGE1'
	| 'LED_ORANGE2'
	| 'LED_ORANGE3'
	| 'LED_YELLOW'
	| 'LED_GREEN2'
	| 'LED_BLUE2'
	| 'LED_BLUE3'
	| 'LED_BLUE4'
	| 'LED_PURPLE1'
	| 'LED_PURPLE2'
	| 'LED_PINK'

export type LightMode = ''
	| 'LED_ON'
	| 'LED_OFF'
	| 'LED_SPEEDUP'
	| 'LED_SPEEDDOWN'
	| 'LED_FLASH'
	| 'LED_STROBE'
	| 'LED_FADE'
	| 'LED_SMOOTH'

export type ZodiacOption = ''
	| 'ZOD_OX'
	| 'ZOD_TIGER'
	| 'ZOD_RABBIT'
	| 'ZOD_DRAGON'
	| 'ZOD_SNAKE'
	| 'ZOD_HORSE'
	| 'ZOD_GOAT'
	| 'ZOD_MONKE'
	| 'ZOD_COCK'
	| 'ZOD_DOG'
	| 'ZOD_PIG'
	| 'ZOD_RAT'

export const zodiacs: Zodiac[] = [
	'TIGER',
	'OX',
	'RABBIT',
	'DRAGON',
	'SNAKE',
	'HORSE',
	'GOAT',
	'MONKE',
	'COCK',
	'DOG',
	'PIG',
	'RAT',
].map(name => {
	return { name }
})