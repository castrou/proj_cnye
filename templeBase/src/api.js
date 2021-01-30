const randomTimeResolve = async () => {
	const seconds = Math.random() * 2
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, seconds * 1000)
	})
}

async function toggleSign(sign, fade = true) {
	// temporary filler async thing
	return await randomTimeResolve()
}
async function setSignColor(sign, color){
	return await randomTimeResolve()
}
module.exports = {
	toggleSign,
	setSignColor
}