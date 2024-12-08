<template>
  <svg
    style="margin: 10px; border: 1px solid red"
    viewBox="0 0 150 180"
    width="80"
    xmlns="http://www.w3.org/2000/svg">
    <diagram-svg-name
      :name="name"
      :font-size="fontSize"
      :fill="color"
      />
    <g :color="color" :transform="`translate(0 ${fontSize})`">
      <diagram-svg-background :fret="startingFret" />
      <diagram-svg-tunning />
      <diagram-svg-string-marks :positions="positions" />
      <diagram-svg-positions
        :positions="positions"
        :fingerings="fingerings"
        />
    </g>
  </svg>
</template>
<script lang="ts" setup>
import diagramSvgBackground from '@/components/digram-svg/background.vue'
import diagramSvgName from '@/components/digram-svg/name.vue'
import diagramSvgTunning from '@/components/digram-svg/tunning.vue'
import diagramSvgStringMarks from '@/components/digram-svg/string-marks.vue'
import diagramSvgPositions from '@/components/digram-svg/positions.vue'
import { getStartingFret } from '@/components/chord.utils.ts'
import { computed } from 'vue'
import type { ChordDiagramConfig } from '@/components/chord.types'
const fontSize = 28

const props = defineProps<ChordDiagramConfig>()

const startingFret = computed(() => {
  return getStartingFret(props.positions)
})
</script>
