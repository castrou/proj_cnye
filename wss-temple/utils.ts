export const log = (...args: any[]) => {
	if(process.env.LOGGING) {
		console.log(...args)
	}
}