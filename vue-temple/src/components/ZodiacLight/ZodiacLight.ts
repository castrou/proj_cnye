import { computed, ref, defineComponent, PropType } from 'vue'
import { ColorOption, colorSelectionOptions, LightMode, Zodiac } from '../../types'
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
		const fade = ref(false);

		const turnOff = () => {
			lightOn.value = false;
			fade.value = false;
		}
		const turnOn = () => { lightOn.value = true }
		const setColor = (selectedColor: ColorOption) => {
			color.value = selectedColor
		}
		const fadeOn = () => { fade.value = true }
		const fadeOff = () => { fade.value = false }
		const toggleFade = () => { fade.value = !fade.value }

		socket.registerEvent(props.zodiac.name, {
			turnOff, turnOn, setColor, fadeOn
		})

		const makeClassList = (boolRef: boolean) => {
			return boolRef ? ['bg-gray-50', 'text-black'] : ['bg-none', 'text-gray-50']
		}

		const lightOnClassList = computed(() => {
			return makeClassList(lightOn.value)
		})
		const fadeClassList = computed(() => {
			return makeClassList(fade.value)
		})

		return {
			lightOn,
			color,
			lightOnClassList,
			fadeClassList,
			menu,
			fade,
			toggleFade,
			fadeOff,
			turnOn,
			turnOff,
			setColor,
		}
	},
	methods: {
		menuToggle () {
			this.menu = !this.menu
		},
		async sendToggleFade() {
			if(!this.lightOn) {
				this.turnOn()
			}
			this.toggleFade()
			if(this.lightOn) {
				if(!this.fade) {
					await apiHelper.sendCommand(this.zodiac.name, 'FADE')
				}
			} else {
				await apiHelper.turnOn(this.zodiac.name)
			}
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
				this.fadeOff()
			} else {
				await apiHelper.turnOn(this.zodiac.name)
				this.turnOn()
			}
		},
	}
})
export default component;
