<template>
  <pre>{{ chordConfig }}</pre>
  <input type="text" v-model="chordConfig.name">
  <input type="text" v-model="chordConfig.positions">
  <diagram-svg v-bind="chordConfig" />
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useDiagram, type ChordDiagramConfig } from '@/components/use-diagram.ts'
import DiagramSvg from '@/components/diagram-svg.vue'
const canvas = ref<HTMLCanvasElement>()
const chordConfig = reactive<ChordDiagramConfig>({
  name: 'D',
  positions: 'xx0232',
  fingerings: '---132'
})
</script>