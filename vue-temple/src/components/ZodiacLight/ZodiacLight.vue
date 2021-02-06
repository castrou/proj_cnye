<template lang="pug">
div.text-gray-50
	div.flex.bg-gray-600.rounded-m.p-2.space-y-2
		.flex-1
			.flex.items-baseline.space-x-2
				h2 {{ zodiac.name  }}
				p.text-sm currently {{ color }}
			.flex.space-x-2.items-center
				p Switch
				button.my.border.px-2.rounded-sm(@click="toggle" :class="buttonClasses") {{ lightOn ? 'Off': 'On'}}
		.flex-none
			button.h-8.w-8.mr-4(@click.prevent="menuToggle") {{ menu ? 'close' : 'open'}}
	.flex.p-2(v-show="menu")
		ColorSet(@selected="colorSelected")
</template>
<script lang="ts">
import ZodiacLight from './ZodiacLight'
export default ZodiacLight
</script>
<style scoped>

</style>