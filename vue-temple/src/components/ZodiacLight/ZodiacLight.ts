import { computed, ref, defineComponent, PropType } from 'vue'
import { ColorOption, colorSelectionOptions, Zodiac } from '../../types'
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
		const color = ref(colorSelectionOptions[0].option)
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
		async colorSelected(color: ColorOption) {
			if(!this.lightOn) {
				this.lightOn = true;
			}
			this.color = color;
			if(this.lightOn) {
				await apiHelper.sendColor(this.zodiac.name, this.color)
			} else {
				await apiHelper.turnOff(this.zodiac.name)
			}
		},
		async toggle() {
			this.lightOn = !this.lightOn
			if(this.lightOn) {
				await apiHelper.turnOn(this.zodiac.name)
			} else {
				await apiHelper.turnOff(this.zodiac.name)
			}
		},
		menuToggle() {
			this.menu = !this.menu
		}
	}
})
export default component;
