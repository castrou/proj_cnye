<template lang="pug">
.container.p-4.space-y-2
	h2.text-white.flex-1.text-center just executed {{ currentStep }}
	.flex.space-x-2.align-middle
		button.rounded-sm.p-4.bg-gray-50.flex-1(v-show="hasPrev" @click.prevent="goToPrevStep") {{ isLoading ? 'loading' : previousStep }}
		button.rounded-sm.p-4.bg-gray-50.flex-1(v-show="hasNext" @click.prevent="goToNextStep") {{  isLoading ? 'loading' : nextStep }}
	button.rounded-sm.p-4.bg-gray-50.w-full(
		@click.prevent="resetLights"
	) Reset
</template>
<script lang="ts">
import Stepper from './Stepper'
export default Stepper
</script>