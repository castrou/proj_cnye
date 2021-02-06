import { computed, ref, defineComponent, PropType } from 'vue'
import { ColorOption, Zodiac } from '../../types'
import { apiHelper } from '../../services/axios.helper'
import ColorSet from '../ColorSet.vue'
const component = defineComponent({
	components: {
		ColorSet
	},
	props: {
		zodiac: {
			type: Object as PropType<Zodiac>,
			required: true
		}
	},
	setup(props) {
		const lightOn = ref(false)
		const color = ref('BLUE1')
		const menu = ref(false)

		const buttonClasses = computed(() => {
			const basedOnLight = lightOn.value ? ['bg-gray-50', 'text-black'] : ['bg-none', 'text-gray-50']
			return [basedOnLight]
		})
		return {
			lightOn,
			color,
			buttonClasses,
			menu
		}
	},
	methods: {
		colorSelected(color: ColorOption) {
			if(!this.lightOn) {
				this.lightOn = true;
			}
			this.color = color;
		},
		async toggle() {
			this.lightOn = !this.lightOn
			const command = this.lightOn ? 'on' : 'off'
			await apiHelper.sendCommand(this.zodiac.name, command)
		},
		menuToggle() {
			this.menu = !this.menu
		}
	}
})
export default component;
