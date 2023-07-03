<script setup lang="ts">
import Typed from 'typed.js'

const $content = ref<HTMLHeadElement>()

const { register } = useCursor()
onMounted(() => register())
onBeforeUnmount(() => register())

onMounted(() => {
  const _ = new Typed($content.value, {
    strings: [
      'Hi, ^300 I\'m CatsJuice' + '^200\n`<br>`'
      + 'A Node.js fullstack developer',
    ],
    typeSpeed: 50,
  })
})
</script>

<template>
  <div data-cursor="text" class="profile-title" min-h-150px text-10 leading-50px sm:text-13 sm:leading-70px>
    <span ref="$content" inline min-w-500px font-bold />
  </div>
</template>
