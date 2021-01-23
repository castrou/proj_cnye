
async function apiToggleSign(sign) {
	// temporary filler async thing
	const seconds = Math.random() * 2
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, seconds * 1000)
	})
}
module.exports = {
	apiToggleSign
}