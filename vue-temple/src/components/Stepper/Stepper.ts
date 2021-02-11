import { defineComponent, onMounted, ref } from 'vue'
import { apiHelper } from '../../services/axios.helper'
import StepHistory from './StepHistory/StepHistory.vue'
export default defineComponent({
	setup(props) {
		const previousStep = ref('')
		const currentStep = ref('')
		const nextStep = ref('')
		const isLoading = ref(false)
		const stepHistory = ref([] as string[])
		const updateValues = (data: { prev: string, current: string, next: string}) => {
			previousStep.value = data.prev || ''
			currentStep.value = data.current || ''
			nextStep.value = data.next || ''
			stepHistory.value.push(data.current)
		}
		const clearStepHistory = () => stepHistory.value = []

		onMounted( async () => {
			const fetchedStep = await apiHelper.client.get('step')
			updateValues(fetchedStep.data)
		})

		return {
			previousStep,
			currentStep,
			nextStep,
			stepHistory,
			isLoading,
			updateValues,
			clearStepHistory,
		}
	},
	components: {
		StepHistory
	},
	computed: {
		hasPrev() { return !!this.previousStep },
		hasNext() { return !!this.nextStep },
	},
	methods: {
		async goToNextStep() {
			this.isLoading = true
			const moved = await apiHelper.client.post('step/executeNext')
			this.updateValues(moved.data)
			this.isLoading = false
		},
		async goToPrevStep() {
			const moved = await apiHelper.client.post('step/executePrev')
			this.updateValues(moved.data)
		},
		async resetLights() {
			const reset = await apiHelper.client.post('step/reset')
			this.updateValues(reset.data)
			const got = await apiHelper.client.get('step')
			this.updateValues(got.data)
		}
	}
})