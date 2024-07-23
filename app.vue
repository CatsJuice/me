<script setup lang="ts">
import Scrollbar from 'smooth-scrollbar'
import { DisableScrollPlugin } from './utils/scroll-plugins/disable-scroll'
import { appName } from '~/constants'

const layoutWrapper = ref<any | null>(null)
const scrollbar: Ref<Scrollbar | null> = ref(null)
provide('scrollbar', scrollbar)

useHead({
  title: appName,
})

onMounted(() => {
  Scrollbar.use(DisableScrollPlugin)
  const el = layoutWrapper.value?.$el
  scrollbar.value = Scrollbar.init(el, {
    damping: 0.1,
  })
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout id="app-layout" ref="layoutWrapper">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --text: #333;
  --bg: #f8f7f6;
  --border-color-1: #ddd;
  --card-bg: #fcfcfc;
}
html.dark {
  --text: #fff;
  --bg: #222;
  --border-color-1: #cccccc30;
  --card-bg: #333;
}

html, body , #__nuxt{
  margin: 0;
  padding: 0;
}

html {
  color: var(--text);
  background: var(--bg);
}

html, body {
  height: 100vh;
  overflow: hidden;
}

#app-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}
</style>
