<template>
  <text
    x="50%"
    :y="Number(fontSize) + 4"
    :font-size="fontSize"
    fill="currentColor"
    text-anchor="middle"
    letter-spacing="-0.5">
    <template v-for="(text, i) in displayTexts">
      <tspan
        v-if="text.super"
        :key="i"
        font-size="75%"
        baseline-shift="super">
        {{ text.context }}
      </tspan>
      <template v-else>{{ text.context }}</template>
    </template>
  </text>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
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

const displayTexts = computed(() => {
  const matches = props.name.match(/(\d.*)|(\w)/ig)
  if (!matches?.length) {
    return []
  }
  return matches.map((t) => {
    return {
      context: t,
      super: /B|#|\d/i.test(t) ? true : false
    }
  })
})
</script>