<template>
  <g
    v-for="(pos, i) in fingerPositions"
    :key="i"
    :fret="pos.fret"
    :sfret="startingFret"
    :transform="
      `translate(
        ${(6 - pos.string + 1) * 20 }
        ${ (pos.fret - (startingFret ? startingFret - 1 : 0 )) * 20 }
      )`
    ">
    <circle r="8" cx="5" cy="15" fill="currentColor"></circle>
    <text
      v-if="pos.fingering"
      x="1"
      y="20"
      fill="white"
      font-size="14">
      {{ pos.fingering }}
    </text>
  </g>
  <g
    v-for="(pos, i) in barPositions"
    :key="i"
    :transform="`translate(0 ${ (pos.fret - (startingFret ? startingFret - 1 : 0 )) * 20})`">
    <rect
      :width="(pos.start - pos.end) * 20 + 10"
      height="16"
      :x="(6 - pos.start + 1) * 20"
      y="7"
      rx="8"
      ry="8"
      fill="currentColor"
      :transform="pos.fret === 1 ? `translate(0 0.5)` : undefined" />
    <text
      v-if="pos.fingering"
      :s="pos.start"
      :e="pos.end"
      :x="((6 - pos.start + 1) * 20) + (pos.start - pos.end) * 20 / 2"
      y="20"
      fill="white"
      font-size="14">
      {{ pos.fingering }}
    </text>
  </g>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { getDisplayPositions, getFingeringByGuitarString, getStartingFret } from '@/components/chord.utils.ts'
import type { ChordDiagramPosition, ChordFingering, ChordPosition } from '../chord.types';

type ChordPositionWithFinger = ChordDiagramPosition & {
  fingering: ChordFingering | null
}

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

const startingFret = computed(() => getStartingFret(props.positions))

const displayPositions = computed(() : ChordPositionWithFinger[] => {
 const a = getDisplayPositions(props.positions).map(c => {
    return {
      ...c,
      fingering: getFingeringByGuitarString(props.fingerings, c.string)
    }
  })
  console.log(a)
  return a
})


const groupedPositionByFinger = computed(() => {
  return displayPositions.value
  .filter(p => !!p.fingering)
  .reduce((acc, chordPosition) => {
    const k = [chordPosition.fret, chordPosition.fingering!].join()
    acc[k] = [...(acc[k] || []), chordPosition]
    return acc;
  }, {} as Record<string, ChordPositionWithFinger[]>)
})

const fingerPositions = computed(() => {
  return Object.values(groupedPositionByFinger.value)
  .filter(g => g.length === 1)
  .flat()
})


const barPositions = computed(() => {
  return Object.keys(groupedPositionByFinger.value)
  .filter(k => groupedPositionByFinger.value[k].length > 1)
  .map(k => {
    const arr = groupedPositionByFinger.value[k]
    const usedStrings = arr.map(p => p.string)
    return {
      fingering: arr[0].fingering,
      start: Math.max(...usedStrings),
      end: Math.min(...usedStrings),
      fret: arr[0].fret
    }
  })
})

</script>
