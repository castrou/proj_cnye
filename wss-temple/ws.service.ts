import * as WebSocket from 'ws'
class SocketHelper {
	port?: number
	server?: WebSocket.Server
	clients: Set<WebSocket> = new Set()
	constructor(port: number) {
		this.port = port;
		this.ensureInit()
	}
	private ensureInit(): WebSocket.Server {
		if(!this.server) {
			this.server = new WebSocket.Server({
				port: this!.port,
			})
		}
		this.server.on('connection', (socket: WebSocket) => {
			this.clients.add(socket)
			socket.on('close', () => {
				this.clients.delete(socket)
			})
		})
		return this.server
	}
	sendZodiacCommand(zodiac: string, command: string, value: string) {
		const emitEvent = `${zodiac}-${command}-${value}`;
		this.clients.forEach(socket => {
			socket.send(emitEvent)
		})
	}
}
const PORT = +(process.env.WSS_PORT || 42069)
const socketHelper = new SocketHelper(PORT)
export default socketHelper
