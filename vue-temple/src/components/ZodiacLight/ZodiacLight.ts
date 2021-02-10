import { computed, ref, defineComponent, PropType } from 'vue'
import { ColorOption, colorSelectionOptions, Zodiac } from '../../types'
import { apiHelper } from '../../services/axios.helper'
import { socket } from '../../services/sockets.helper'
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
		const turnOff = () => { lightOn.value = false }
		const turnOn = ()=> { lightOn.value = true }
		const setColor = (selectedColor: ColorOption) => {
			color.value = selectedColor
		}
		socket.registerEvent(props.zodiac.name, {
			turnOff, turnOn, setColor
		})

		const buttonClasses = computed(() => {
			const basedOnLight = lightOn.value ? ['bg-gray-50', 'text-black'] : ['bg-none', 'text-gray-50']
			return [basedOnLight]
		})
		return {
			lightOn,
			color,
			buttonClasses,
			menu,
			turnOn,
			turnOff,
			setColor
		}
	},
	methods: {
		menuToggle () {
			this.menu = !this.menu
		},
		async colorSelected(color: ColorOption) {
			if(!this.lightOn) {
				this.turnOn()
			}
			this.setColor(color)
			if(this.lightOn) {
				await apiHelper.sendColor(this.zodiac.name, this.color)
			} else {
				await apiHelper.turnOff(this.zodiac.name)
			}
		},
		async toggle() {
			if(this.lightOn){
				await apiHelper.turnOff(this.zodiac.name)
				this.turnOff()
			} else {
				await apiHelper.turnOn(this.zodiac.name)
				this.turnOn()
			}
		},
	}
})
export default component;
