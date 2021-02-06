import { computed, ref, defineComponent, PropType } from 'vue'
import { Zodiac } from '../../types'
import { apiHelper } from '../../services/axios.helper'
const component = defineComponent({
	props: {
		zodiac: {
			type: Object as PropType<Zodiac>,
			required: true
		}
	},
	setup(props) {
		const lightOn = ref(false)
		const color = ref('blue')

		const buttonClasses = computed(() => {
			const basedOnLight = lightOn.value ? ['bg-gray-50', 'text-black'] : ['bg-none', 'text-gray-50']
			return [basedOnLight]
		})
		return {
			lightOn,
			color,
			buttonClasses
		}
	},
	methods: {
		async toggle() {
			this.lightOn = !this.lightOn
			const command = this.lightOn ? 'on' : 'off'
			await apiHelper.sendCommand(this.zodiac.name, command)
		}
	}
})
export default component;
