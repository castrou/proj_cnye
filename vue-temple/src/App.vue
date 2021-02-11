<template lang="pug">
.bg-gray-800.p-10.min-h-screen.flex
  .container.mx-auto(class="min-w-3/6")
    Stepper
  .container
    .flex.space-x-2.mx-auto(class="min-w-3/6")
      button.rounded-sm.bg-gray-50.flex-1(@click.prevent="allOn") All On
      button.rounded-sm.bg-gray-50.flex-1(@click.prevent="allOff") All Off
      button.rounded-sm.bg-gray-50.flex-1(@click.prevent="allFade") All Fade
    .flex.flex-col.space-y-2.mx-auto(class="min-w-3/6")
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
import Stepper from './components/Stepper/Stepper.vue'
import { zodiacs } from './types'
import { apiHelper } from './services/axios.helper'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    ZodiacLight,
    Stepper,
  },
  data () {
    return {
      zodiacs
    }
  },
  methods: {
    allOn(){
      apiHelper.sendCommand('ALL', 'ON')
    },
    allOff(){
      apiHelper.sendCommand('ALL', 'OFF')
    },
    allFade( ){
      apiHelper.sendCommand('ALL', 'FADE')
    }
  }
})
</script>