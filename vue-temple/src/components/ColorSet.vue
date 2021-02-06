<template lang="pug">
.flex.flex-wrap.p-2
	button.h-12.w-12.rounded-sm.mb-2.ml-2(v-for="color in colors",
	:key="color.option",
	@click.prevent="selected(color.option)"
	:class="color.bg")
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ColorOption, colorSelectionOptions } from '../types'
const ColorSet = defineComponent({
	setup(props) {
		const selectedIndex = ref(0);
		return {
			colors: colorSelectionOptions,
		}
	},
	methods: {
		selected(colorOption: ColorOption) {
			this.$emit('selected', colorOption)
		}
	}
})
export default ColorSet
</script>