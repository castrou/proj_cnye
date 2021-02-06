export interface Zodiac {
	name: string;
}
export type ColorOption =
	| 'ORANGE1'
	| 'ORANGE2'
	| 'ORANGE3'
	| 'YELLOW'
	| 'GREEN1'
	| 'GREEN2'
	| 'BLUE1'
	| 'BLUE2'
	| 'BLUE3'
	| 'BLUE4'
	| 'PURPLE1'
	| 'PURPLE2'
	| 'PINK'
	| 'WHITE'
	| 'RED'
	export interface ColorSelectionOption {
		option: ColorOption;
		bg: string
	}
export const colorSelectionOptions: ColorSelectionOption[] = [
	{option: 'ORANGE1', bg: 'bg-yellow-600'},
	{option: 'ORANGE2', bg: 'bg-yellow-500'},
	{option: 'ORANGE3', bg: 'bg-yellow-400'},
	{option: 'YELLOW', bg: 'bg-yellow-300'},
	{option: 'GREEN1', bg: 'bg-green-600'},
	{option: 'GREEN2', bg: 'bg-green-400'},
	{option: 'BLUE1', bg: 'bg-blue-800'},
	{option: 'BLUE2', bg: 'bg-blue-700'},
	{option: 'BLUE3', bg: 'bg-blue-600'},
	{option: 'BLUE4', bg: 'bg-blue-500'},
	{option: 'PURPLE1', bg: 'bg-purple-500'},
	{option: 'PURPLE2', bg: 'bg-purple-400'},
	{option: 'PINK', bg: 'bg-pink-600'},
	{option: 'WHITE', bg: 'bg-gray-50'},
	{option: 'RED', bg: 'bg-red-600'},
]

export type LightMode = ''
	| 'ON'
	| 'OFF'
	| 'SPEEDUP'
	| 'SPEEDDOWN'
	| 'FLASH'
	| 'STROBE'
	| 'FADE'
	| 'SMOOTH'
export const ligthModes: LightMode[] = [
	'ON',
	'OFF',
	'SPEEDUP',
	'SPEEDDOWN',
	'FLASH',
	'STROBE',
	'FADE',
	'SMOOTH',
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