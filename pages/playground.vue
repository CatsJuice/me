<script setup>
import { useCursor } from 'ipad-cursor/vue'

useCursor()
</script>

<template>
  <div mx-auto max-w-2xl w-full flex="~ col" items-start>
    <div data-cursor="block" rounded bg-slate-100 px4 py2>
      Button
    </div>
  </div>
</template>
