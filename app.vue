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
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html {
  /* background: linear-gradient(to top, #bbb 0%, #eee 100%); */
  color: #222;
  background: #fff;
}

html.dark {
  color: white;
  /* background: linear-gradient(to top, #111 0%, #222 100%); */
  background: #222;
}
</style>
