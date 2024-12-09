<template>
  <template
    v-for="(mark, i) in marks"
    :key="i">
    <circle
      v-if="mark === 0"
      r="4"
      :cx="(i + 1) * 20 + 5"
      :cy="15"
      fill="none"
      stroke="currentColor"
      stroke-width="1">
    </circle>
    <g
      v-else-if="mark === -1"
      :transform="`translate(${20 * (i + 1)} 10)`">
      <path d="M 1 1 l 8 8, M 9 1 l -8 8" stroke="currentColor" stroke-width="1"/>
    </g>
  </template>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { getPositionMarks } from '@/components/chord'

const props = defineProps({
  positions: {
    type: String,
    default: ''
  }
})

const marks = computed(() => {
  return getPositionMarks(props.positions)
})
</script>
