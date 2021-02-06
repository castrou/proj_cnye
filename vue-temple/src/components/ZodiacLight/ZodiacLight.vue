<template lang="pug">
div.text-gray-50
	div.bg-gray-600.rounded-m.p-2.space-y-2
		.flex.items-baseline.space-x-2
			h2 {{ zodiac.name  }}
			p.text-sm current color is {{ color }}
		.flex.space-x-2.items-center
			p Switch
			button.my.border.px-2.rounded-sm(@click="toggle" :class="buttonClasses") {{ lightOn ? 'Off': 'On'}} 
</template>
<script lang="ts">
import ZodiacLight from './ZodiacLight'
export default ZodiacLight
</script>
<style scoped>

</style>