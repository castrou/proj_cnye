import * as WebSocket from 'ws'
class SocketHelper {
	port?: number
	server?: WebSocket.Server
	constructor(port: number) {
		this.port = port;
		this.ensureInit()
	}
	private ensureInit(): WebSocket.Server {
		if (!this.server) {
			this.server = new WebSocket.Server({
				port: this!.port
			})
		}
		this.server.on('connection', (socket: WebSocket) => {
			socket.on('message', (data: WebSocket.Data) => {
			})
		})
		return this.server
	}
	sendZodiacCommand(zodiac: string, command: string) {
		const emitEvent = `${zodiac}-${command}`;
		const server = this.ensureInit()
		server.emit(emitEvent)
	}
}
const PORT = +(process.env.WSS_PORT || 8000)
const socketHelper = new SocketHelper(PORT)
export default socketHelper
