import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
class APIHelper {
	client?: AxiosInstance
	constructor() {
		this.client = this.ensureInit()
	}
	ensureInit() {
		const config: AxiosRequestConfig = {
			baseURL: '/api/',
			timeout: 20000,
		}
		return Axios.create(config)
	}
	async sendCommand(zodiac: string, action: string) {
		if(!this.client) {
			this.client = this.ensureInit()
		}
		return await this.client.put(`${zodiac}/${action}`);
	}
}
export const apiHelper = new APIHelper()