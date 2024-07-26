const cachedUrls = ref(new Set<string>())
const activePeek = ref<{ url: string, from: HTMLElement } | null>(null)

function openPeek(url: string, from: HTMLElement) {
  cachedUrls.value.add(url)
  activePeek.value = { url, from }
}

function closePeek() {
  activePeek.value = null
}

function preload(url: string) {
  cachedUrls.value.add(url)
}

export function usePeek() {
  const opened = computed(() => activePeek.value !== null)

  return {
    preload,
    openPeek,
    closePeek,
    activePeek,
    opened,
    cachedUrls,
  }
}
