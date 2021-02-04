class WSHelper {
	client?: WebSocket
	constructor(){
		this.client = this.ensureInit()
	}
	private ensureInit(): WebSocket {
		if(!this.client) {
			const url = import.meta.env.VITE_WSSERVER as string;
			this.client = new WebSocket(url)
		}
		return this.client
	}
	emitMessage(message: string) {
		const client = this.ensureInit()
		client.send(message)
	}
}
export const socket = new WSHelper();