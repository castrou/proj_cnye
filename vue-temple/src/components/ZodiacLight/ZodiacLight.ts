import { computed, ref, defineComponent, PropType } from 'vue'
import { Zodiac } from '../../types'
import { socket } from '../../sockets/sockets.helper'
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
		toggle () {
			this.lightOn = !this.lightOn
			const message = `${this.zodiac.name}/${this.lightOn ? 'on' : 'off'}`
			socket.emitMessage(message)
		}
	}
})
export default component;
