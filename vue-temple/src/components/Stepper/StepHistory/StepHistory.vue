<template lang="pug">
.history
	p.text-gray-100.font-bold.text-sm.opacity-80(
		v-for="(item, index) in history",
		:key="index") {{ item }}
</template>
<script lang="ts">
import StepHistory from './StepHistory'
export default StepHistory
</script>