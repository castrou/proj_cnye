const steps = [
	'RAT-MODE-ON',
	'OX-MODE-ON',
	'OX-MODE-OFF',
	'RAT-MODE-ON',
	'OX-MODE-OFF RAT-MODE-OFF',
	'TIGER-MODE-ON',
	'RABBIT-MODE-ON',
	'RABBIT-MODE-OFF',
	'RABBIT-MODE-ON TIGER-MODE-OFF',
	'TIGER-MODE-ON',
	'TIGER-MODE-OFF',
	'TIGER-MODE-ON',
	'TIGER-MODE-OFF RABBIT-MODE-OFF',
	'DRAGON-MODE-ON',
	'SNAKE-MODE-ON',
	'HORSE-MODE-ON',
	'GOAT-MODE-ON',
	'MONKEY-MODE-ON',
	'DRAGON-MODE-OFF SNAKE-MODE-OFF HORSE-MODE-OFF GOAT-MODE-OFF MONKEY-MODE-OFF',
	'ROOSTER-MODE-ON',
	'ROOSTER-MODE-OFF',
	'DOG-MODE-ON',
	'PIG-MODE-ON',
	'ROOSTER-MODE-ON',
	'PIG-MODE-OFF DOG-MODE-OFF',
	'DOG-MODE-ON',
	'PIG-MODE-ON',
	'ROOSTER-MODE-ON',
	'ALL-MODE-ON',
	'ALL-MODE-OFF',
]

export class ListNode<T> {
	previous?: ListNode<T>
	next?: ListNode<T>
	value: T
	constructor(value: T) {
		this.value = value
	}
	setNext(node: ListNode<T>) {
		this.next = node
		node.previous = this as ListNode<T>
	}
	setPrevious(node: ListNode<T>) {
		this.previous = node
	}
	hasNext() {
		return !!this.next
	}
	hasPrevious() {
		return !!this.previous
	}
	reset() {
		let cursor: ListNode<T> = this
		while(!!cursor.previous) {
			cursor = cursor!.previous
		}
		return cursor
	}
}
let cursor = new ListNode<string>('nothing')
steps.forEach(step => {
	const node = new ListNode<string>(step)
	console.log(node)
	cursor.setNext(node)
	cursor = node
})
const head = cursor.reset()
export default head
class List {
	list: string[] = [];
	stepNumber: number = 0
	constructor(list: string[]) {
		this.list = list
		this.stepNumber = 0
	}
	get currentStep() {
		return this.list[this.stepNumber]
	}
	get nextStep() {
		if(this.stepNumber + 1 < this.list.length ) {
			return this.list[this.stepNumber + 1]
		} else {
			return undefined
		}
	}
	get previousStep() {
		if(this.stepNumber - 1 >= 0) {
			return this.list[this.stepNumber - 1]
		} else {
			return undefined
		}
	}
	moveForward() {
		if(this.stepNumber + 1 < this.list.length ) {
			this.stepNumber++
			return this.list[this.stepNumber]
		} else {
			return undefined
		}
	}
	moveBack() {
		if(this.stepNumber - 1 >= 0) {
			this.stepNumber--
			return this.list[this.stepNumber]
		} else {
			return undefined
		}
	}
	reset() {
		this.stepNumber = 0
	}
}
export const stepList = new List(steps)