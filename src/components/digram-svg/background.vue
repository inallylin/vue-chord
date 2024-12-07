<template>
  <g fill="none" stroke="currentColor">
    <path
      v-for="i in 6"
      :key="i"
      :stroke-width="i === 1 && !fret ? 4 : 1"
      :d="`M25 ${5 + i * 20} l100 0`">
    </path>
  </g>
  <g fill="none" stroke="currentColor">
    <path
      v-for="i in 6"
      :key="i"
      stroke-width="1"
      :d="`M${5 + i * 20} ${25} l0 100`">
    </path>
  </g>
  <text
    v-if="fret"
    x="138"
    :y="40"
    text-anchor="middle">
    {{ fret }}fr
  </text>
</template>
<script lang="ts" setup>
defineProps({
  fret: {
    type: Number,
    default: 0
  }
})
</script>
