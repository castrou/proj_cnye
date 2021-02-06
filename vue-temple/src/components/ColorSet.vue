<template lang="pug">
.flex.flex-wrap.p-2
	button.h-12.w-12.rounded-sm.mb-2.ml-2(v-for="(color, index) in colors",
	:key="color.option",
	@click.prevent="selected(color.option, index)"
	:class="[ index === selectedIndex ? activeClass : '', color.bg ]"
	)
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ColorOption, colorSelectionOptions } from '../types'
const ColorSet = defineComponent({
	setup(props) {
		const selectedIndex = ref(0);
		const isActive = computed((index: number) => {
			return selectedIndex.value === index
		})
		return {
			colors: colorSelectionOptions,
			selectedIndex,
			isActive,
			activeClass: 'border-white border-2 border-dotted'
		}
	},
	methods: {
		selected(colorOption: ColorOption, index: number) {
			this.selectedIndex = index;
			this.$emit('selected', colorOption)
		},
	}
})
export default ColorSet
</script>