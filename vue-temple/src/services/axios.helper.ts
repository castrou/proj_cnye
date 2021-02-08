import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
class APIHelper {
	client?: AxiosInstance
	constructor() {
		this.ensureInit()
	}
	ensureInit() {
		const config: AxiosRequestConfig = {
			baseURL: '/api/',
			timeout: 20000,
		}
		this.client = Axios.create(config)
		return this.client
	}
	async turnOff(zodiac: string) {
		const client = this.ensureInit()
		return await client.put(`${zodiac}/mode/OFF`)
	}
	async sendCommand(zodiac: string, action: string) {
		const client = this.ensureInit()
		return await client.put(`${zodiac}/${action}`);
	}
	async sendColor(zodiac: string, color: string) {
		const client = this.ensureInit()
		return await client.put(`${zodiac}/color/${color}`)
	}
}
export const apiHelper = new APIHelper()