<template lang="pug">
.container.p-4.flex.flex-col.h-full
	.conatiner.flex-1.space-y-2
		h2.text-white.flex-1.text-center just executed {{ currentStep }}
		.flex.space-x-2.align-middle
			button.rounded-sm.p-4.bg-gray-50.flex-1(@click.prevent="goToPrevStep",
			class="disabled:opacity-50"
			:disabled="!previousStep"
			) {{ isLoading ? 'loading' : previousStep }}
			button.rounded-sm.p-4.bg-gray-50.flex-1(@click.prevent="goToNextStep",
			class="disabled:opacity-50"
			:disabled="!nextStep"
			) {{  isLoading ? 'loading' : nextStep }}
		button.rounded-sm.p-4.bg-gray-50.w-full(
			@click.prevent="resetLights"
		) Reset
	.container.flex-1
		button.rounded-sm.p-2.bg-gray-50(@click.prevent="clearStepHistory") Clear History
		StepHistory(:history="stepHistory")
</template>
<script lang="ts">
import Stepper from './Stepper'
export default Stepper
</script>