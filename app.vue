<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --bg: #fff;
  --light-text: #222;
}

html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html {
  --bg: #fff;
  --light-text: #222;

  color: var(--text);
  background: var(--bg);
}

html.dark {
  --text: #fff;
  --bg: #222;
}
</style>
