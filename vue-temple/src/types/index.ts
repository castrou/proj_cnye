export interface Zodiac {
	name: string;
}
export type ColorOption =
	| 'LED_ORANGE1'
	| 'LED_ORANGE2'
	| 'LED_ORANGE3'
	| 'LED_YELLOW'
	| 'LED_GREEN1'
	| 'LED_GREEN2'
	| 'LED_BLUE1'
	| 'LED_BLUE2'
	| 'LED_BLUE3'
	| 'LED_BLUE4'
	| 'LED_PURPLE1'
	| 'LED_PURPLE2'
	| 'LED_PINK'
	| 'LED_WHITE'
	| 'LED_RED'
	export interface ColorSelectionOption {
		option: ColorOption;
		bg: string
	}
export const colorSelectionOptions: ColorSelectionOption[] = [
	{option: 'LED_ORANGE1', bg: 'bg-yellow-600'},
	{option: 'LED_ORANGE2', bg: 'bg-yellow-500'},
	{option: 'LED_ORANGE3', bg: 'bg-yellow-400'},
	{option: 'LED_YELLOW', bg: 'bg-yellow-300'},
	{option: 'LED_GREEN1', bg: 'bg-green-600'},
	{option: 'LED_GREEN2', bg: 'bg-green-400'},
	{option: 'LED_BLUE1', bg: 'bg-blue-800'},
	{option: 'LED_BLUE2', bg: 'bg-blue-700'},
	{option: 'LED_BLUE3', bg: 'bg-blue-600'},
	{option: 'LED_BLUE4', bg: 'bg-blue-500'},
	{option: 'LED_PURPLE1', bg: 'bg-purple-500'},
	{option: 'LED_PURPLE2', bg: 'bg-purple-400'},
	{option: 'LED_PINK', bg: 'bg-pink-600'},
	{option: 'LED_WHITE', bg: 'bg-gray-50'},
	{option: 'LED_RED', bg: 'bg-red-600'},
]

export type LightMode = ''
	| 'LED_ON'
	| 'LED_OFF'
	| 'LED_SPEEDUP'
	| 'LED_SPEEDDOWN'
	| 'LED_FLASH'
	| 'LED_STROBE'
	| 'LED_FADE'
	| 'LED_SMOOTH'
export const ligthModes: LightMode[] = [
	'LED_ON',
	'LED_OFF',
	'LED_SPEEDUP',
	'LED_SPEEDDOWN',
	'LED_FLASH',
	'LED_STROBE',
	'LED_FADE',
	'LED_SMOOTH',
]

export const zodiacs: Zodiac[] = [
	'TIGER',
	'OX',
	'RABBIT',
	'DRAGON',
	'SNAKE',
	'HORSE',
	'GOAT',
	'MONKEY',
	'ROOSTER',
	'DOG',
	'PIG',
	'RAT',
].map(name => {
	return { name }
})