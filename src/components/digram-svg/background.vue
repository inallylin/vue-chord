<template>
  <g fill="none" stroke="currentColor">
    <path
      v-if="!fret"
      stroke-width="4"
      d="M24.5 25 l101 0"
      />
    <path
      stroke-width="1"
      :d="backgroundPathD"
      stroke-linecap="square"
      />
  </g>
  <text
    v-if="fret"
    x="138"
    :y="40"
    font-size="85%"
    letter-spacing="-1"
    text-anchor="middle">
    {{ fret }}fr
  </text>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

defineProps({
  fret: {
    type: Number,
    default: 0
  }
})

const backgroundPathD = computed(() => {
  return Array(6).fill(null).map((_e, i) => {
    return [
      `M25 ${5 + (i + 1) * 20} l100 0`,
      `M${5 + (i + 1) * 20} ${25} l0 100`
    ]
  }).flat().join()
})

</script>
