<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout id="app-layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --text: #333;
  --bg: #f8f7f6;
  --border-color-1: #ddd;
  --card-bg: #fcfcfc;
  --dialog: #fff;
  --hover: rgba(0, 0, 0, 0.1);
}
html.dark {
  --text: #fff;
  --bg: #222;
  --border-color-1: #cccccc30;
  --card-bg: #1d1d1e;
  --dialog: #333;
  --hover: rgba(255,255, 255, 0.1);
}

html, body , #__nuxt{
  margin: 0;
  padding: 0;
}

/* html {
  color: var(--text);
  background: var(--bg);
} */

html, body {
  height: 100vh;
  overflow: hidden;
}

#app-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}
.with-hover {
  position: relative;
  overflow: hidden;
}
.with-hover:hover::after {
  opacity: 1;
}
.with-hover::after {
  opacity: 0;
  transition: opacity 0.23s;
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--hover);
  pointer-events: none;
}
</style>
