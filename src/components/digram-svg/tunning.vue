<template>
  <text
    v-for="(string, i) in displayStrings"
    :key="i"
    :x="20 * (i + 1) + 5"
    :y="140"
    text-anchor="middle"
    fill="currentColor">
    {{ string }}
  </text>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { getTunnings } from '@/components/chord.utils'

const props = defineProps({
  tunning: {
    type: String,
    default: 'EADGBe'
  }
})

const displayStrings = computed(() => {
  return getTunnings(props.tunning)
})
</script>