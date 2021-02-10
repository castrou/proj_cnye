export interface EventHandlerSet {
	turnOff: Function,
	turnOn: Function,
	setColor: Function,
}
class WSHelper {
	client?: WebSocket
	regsiteredHandlers: { [zodiac: string]: EventHandlerSet } = {}
	constructor() {
		this.client = this.ensureInit()
	}
	private ensureInit(): WebSocket {
		if (!this.client) {
			const url = import.meta.env.VITE_WSSERVER as string || 'ws://localhost:42069';
			this.client = new WebSocket(url)
		}
		this.client.onmessage = (event) => {
			this.parseEvent(event.data)
		}
		return this.client
	}
	public registerEvent(zodiac: string, handlers: EventHandlerSet) {
		console.log('registering', zodiac)
		this.ensureInit()
		this.regsiteredHandlers[zodiac] = handlers
	}
	private parseEvent(event: string) {
		const [zodiac, command, value] = event.split('-')
		if(this.regsiteredHandlers[zodiac]) {
			this.handleEvent(zodiac, command, value)
		} else if(zodiac === 'ALL') {
			for(let sign of Object.keys(this.regsiteredHandlers)) {
				this.handleEvent(sign, command, value)
			}
		}
	}
	private handleEvent(zodiac: string, command: string, value: string) {
		if(command === 'COLOUR') {
			this.regsiteredHandlers[zodiac].setColor(value)
		} else {
			if(value === 'ON') {
				this.regsiteredHandlers[zodiac].turnOn()
			} else {
				this.regsiteredHandlers[zodiac].turnOff()
			}
		}
	}
	emitMessage(message: string) {
		const client = this.ensureInit()
		client.send(message)
	}
}
export const socket = new WSHelper();