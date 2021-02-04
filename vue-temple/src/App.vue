<template lang="pug">
.bg-gray-800.p-10
  .flex.flex-col.space-y-2
    ZodiacLight(
    v-for="(zodiac, index) in zodiacs" 
    :zodiac="zodiac"
    :key="zodiac + index"
  )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ZodiacLight from './components/ZodiacLight/ZodiacLight.vue'
import { zodiacs } from './types'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    ZodiacLight
  },
  data () {
    return {
      zodiacs: zodiacs
    }
  }
})
</script>