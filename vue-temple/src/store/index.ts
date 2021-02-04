import Vuex from 'vuex'
import { ZodiacClass as ZodiacStore } from './zodiac' 

const store = new Vuex.Store({
	modules: {
		ZodiacStore
	},
})
export default store;
