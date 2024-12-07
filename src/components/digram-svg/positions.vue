<template>
  <template
    v-for="(pos, i) in displayPositions">
    <g :transform="`translate(${(6 - pos.string) * 20 } ${ pos.fret * 20})`">
      <circle r="8" cx="25" cy="15" fill="currentColor"></circle>
      <text
        v-if="pos.fingering"
        x="21"
        y="20"
        fill="white"
        font-size="14">
        {{ pos.fingering }}
      </text>
    </g>
  </template>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { getDisplayPositions, getPositionFingering } from '@/components/chord.utils.ts'


const props = defineProps({
  positions: {
    type: String,
    default: ''
  },
  fingerings: {
    type: String,
    default: ''
  }
})

const displayPositions = computed(() => {
 return getDisplayPositions(props.positions).map(c => {
    return {
      ...c,
      fingering: getPositionFingering(props.fingerings, c.string)
    }
  })
})
</script>
