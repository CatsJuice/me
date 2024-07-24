<script setup lang="ts">
import { useCursor } from 'ipad-cursor/vue'
import type { Scrollbar } from 'smooth-scrollbar/scrollbar'
import { disableScroll, enableScroll } from '~/utils/scroll-plugins/disable-scroll'

useCursor({
  normalStyle: {
    backdropBlur: '20px',
  },
  blockStyle: {
    backdropBlur: '0px',
    durationBackdropFilter: '1s',
  },
})

const scrollbar = inject<Ref<Scrollbar>>('scrollbar')!

const scrollY = ref(0)
const windowH = ref(typeof window === 'undefined' ? 1080 : window.innerHeight)
const scrollYPercent = computed(() => scrollY.value / windowH.value)
const projectPageTranslateY = computed(() => {
  if (scrollYPercent.value > 0.5)
    return 0

  return (scrollYPercent.value - 0.5) * windowH.value / 2
})

function onScroll() {
  const scroll = scrollbar.value
  // _autoScroll()
  scrollY.value = scroll.offset.y
}
function onResize() {
  windowH.value = window.innerHeight
}
let prevScrollY = 0
let autoScrolling = false
function _autoScroll() {
  const scroll = scrollbar.value
  const currScrollY = scroll.offset.y
  const diff = currScrollY - prevScrollY
  prevScrollY = currScrollY

  if (diff > 0 && scrollYPercent.value > 0.2 && !autoScrolling) {
    autoScrolling = true
    disableScroll(scroll)
    scroll.scrollTo(0, windowH.value, 500, {
      callback: () => {
        autoScrolling = false
        enableScroll(scroll)
      },
    })
  }
  if (diff < 0 && scrollYPercent.value < 0.5 && !autoScrolling) {
    autoScrolling = true
    disableScroll(scroll)
    scroll.scrollTo(0, 0, 500, {
      callback: () => {
        autoScrolling = false
        enableScroll(scroll)
      },
    })
  }
}
onMounted(() => {
  scrollbar.value.addListener(onScroll)
  window.addEventListener('resize', onResize)
  onResize()
  onScroll()
})
onBeforeUnmount(() => {
  scrollbar.value.removeListener(onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div w-full px-lg :data-scroll-y="scrollY" :data-window-h="windowH">
    <profile-page class="snap" mx-auto h-75vh max-w-840px px5 />
    <ClientOnly>
      <project-page
        class="snap"
        :class="scrollYPercent > 0.5 ? 'max-w-1320px' : 'max-w-840px'"
        mx-auto min-h-screen px5 transition-all
        :style="{
          transform: `translateY(${projectPageTranslateY}px)`,
        }"
      />

      <div
        class="mask" :style="{
          top: 0,
          height: '200px',
          transform: `translate3d(0, ${scrollY + windowH - 200}px, 0)`,
        }"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.snap {
  scroll-snap-align: center;
}
.mask {
  pointer-events: none;
  width: 100%;
  left: 0;
  position: fixed;
  -webkit-user-select: none;
  user-select: none;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  will-change: transform;
  z-index: 1;

  background: linear-gradient(to bottom, transparent, var(--bg));
  -webkit-mask-image: linear-gradient(
    to top,
    var(--bg) 25%,
    transparent
  );
  mask-image: linear-gradient(to top, var(--bg) 25%, transparent);
}
</style>
