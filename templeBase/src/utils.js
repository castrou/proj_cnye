const { debounce } = require('lodash')
const dependencies = new Set()
const watchers = []
const watchersDependingOn = (symbol) => {
	watchers.filter(watcher => symbol === watcher.dependencies.has(symbol))
}
const reactive = (obj) => {
	// create empty object to be reactive based on 
	// param ob
	const reactiveObj = {}
	// iterate over the properties of the object
	for(let [key, val] of Object.entries(obj)){
		let internalValue = val;
		const symbol = Symbol(key)
		// define the property within the reactive object
		// with getters and setters
		Object.defineProperty(reactiveObj, key, {
			get() {
				dependencies.add(symbol)
				return internalValue
			},
			set(value) {
				internalValue = value;
				// run the watchers which are watching this key
				watchersDependingOn(symbol).forEach(watcher => {
					const { callback } = watcher
					callback()
				})
			}
		})
	}
	return reactiveObj
}

const runAndGetDependencies = (callback) => {
	dependencies.clear()
	callback()
	const deps = new Set(dependencies)
	dependencies.clear()
	return deps
}
const watch = (callback) => {
	const deps = runAndGetDependencies(callback)
	watchers.push({
		dependencies: deps,
		callback: debounce(callback)
	})
}
module.exports = {
	watch,
	reactive
}