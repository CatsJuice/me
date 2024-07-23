import { ipadCursorPlugin } from 'ipad-cursor/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ipadCursorPlugin)
})
