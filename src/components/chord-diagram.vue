<template>
  <pre>{{ chordConfig }}</pre>
  <div>
    <input type="text" v-model.lazy="chordConfig.name">
    <br>
    <input type="text" v-model.lazy="chordConfig.positions">
    <br>
    <input type="text" v-model.lazy="chordConfig.fingerings">
  </div>
  <diagram-svg v-bind="chordConfig" />
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import DiagramSvg from '@/components/diagram-svg.vue'
import type { ChordDiagramConfig } from '@/components/chord.types'

const chordConfig = reactive<ChordDiagramConfig>({
  name: 'F',
  positions: '133211',
  fingerings: '143211'
})
</script>