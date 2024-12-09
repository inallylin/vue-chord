<template>
  <text
    x="50%"
    :y="Number(fontSize) + 4"
    :font-size="fontSize"
    fill="currentColor"
    text-anchor="middle"
    letter-spacing="-0.5">
    <template v-for="(part, i) in chordNameParts">
      <tspan
        v-if="part.super"
        :key="i"
        font-size="75%"
        baseline-shift="super">
        {{ part.text }}
      </tspan>
      <template v-else>{{ part.text }}</template>
    </template>
  </text>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { getChordNameWithSuper } from '@/components/chord'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  fontSize: {
    type: Number,
    default: 28
  }
})

const chordNameParts = computed(() => {
  return getChordNameWithSuper(props.name)
})
</script>