<script setup lang="ts">
import { useCursor } from 'ipad-cursor/vue'
import { projects } from '~/constants/projects'

const { cachedUrls, opened, activePeek } = usePeek()
const { disposeCursor, initCursor } = useCursor()

const peekClipElRef = ref<HTMLElement | null>(null)
const peekViewSize = ref({ w: 0, h: 0 })
const animatingPeek = ref<{ url: string, from: HTMLElement } | null>(null)
const clipStyle = ref<Record<string, any>>({})

function onResize() {
  const windowW = window.innerWidth
  const windowH = window.innerHeight
  const isMobile = windowW < 768
  const w = isMobile ? windowW - 40 : Math.min(1400, windowW * 0.8)
  const h = isMobile
    ? windowH * 0.9
    : Math.min(
      windowH * 0.8,
      w * (9 / 16),
    )
  peekViewSize.value = { w, h }
}

const urlList = computed(() => cachedUrls.value)
const roundedPeekViewSize = computed(() => ({
  w: Math.round(peekViewSize.value.w),
  h: Math.round(peekViewSize.value.h),
}))
const peekViewRect = computed(() => ({
  left: window.innerWidth / 2 - roundedPeekViewSize.value.w / 2,
  top: window.innerHeight / 2 - roundedPeekViewSize.value.h / 2,
  width: roundedPeekViewSize.value.w,
  height: roundedPeekViewSize.value.h,
} as DOMRect))

const finalClipStyle = computed(() => {
  const pos = animatingPeek.value
    ? clipStyle.value
    : opened.value
      ? {
          width: `${peekViewSize.value.w}px`,
          height: `${peekViewSize.value.h}px`,
          top: `${window.innerHeight / 2 - peekViewSize.value.h / 2}px`,
          left: `${window.innerWidth / 2 - peekViewSize.value.w / 2}px`,
        }
      : {}
  return {
    background: projects.find(p => p.url === activePeek.value?.url)?.background,
    ...pos,
  }
})

watch(activePeek, (newPeek, oldPeek) => {
  if (newPeek === null) {
    animatingPeek.value = oldPeek
    animateClose()
    initCursor?.()
  }
  else {
    animatingPeek.value = newPeek
    animateOpen()
    disposeCursor?.()
  }
})

function animateOpen() {
  const peek = animatingPeek.value
  if (!peek)
    return
  const fromRect = peek.from.getBoundingClientRect()
  const toRect = peekViewRect.value

  animate(fromRect, toRect, 'in', 300)
}
function animateClose() {
  const peek = animatingPeek.value
  if (!peek)
    return

  const fromRect = peekViewRect.value
  const toRect = peek.from.getBoundingClientRect()
  animate(fromRect, toRect, 'out', 150)
}

function animate(
  from: DOMRect,
  to: DOMRect,
  dir: 'in' | 'out' = 'in',
  duration = 300,
) {
  const clip = peekClipElRef.value
  if (!clip)
    return
  clipStyle.value = {
    width: `${from.width}px`,
    height: `${from.height}px`,
    top: `${from.top}px`,
    left: `${from.left}px`,
    opacity: dir === 'in' ? '0' : '1',
  }

  clip.style.transition = `all ${duration}ms ease`

  nextTick(() => {
    requestAnimationFrame(() => {
      clipStyle.value = {
        width: `${to.width}px`,
        height: `${to.height}px`,
        top: `${to.top}px`,
        left: `${to.left}px`,
        opacity: dir === 'in' ? '1' : '0.2',
      }
    })
  })

  Promise.race([
    new Promise(resolve => setTimeout(resolve, duration)),
    new Promise((resolve) => {
      peekClipElRef.value?.addEventListener('transitionend', resolve, { once: true })
    }),
  ]).then(() => {
    animatingPeek.value = null
    clip.style.transition = 'none'
  })
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="mask"
      bg-black-10 absolute left-0 top-0 h-full w-full
      :class="[
        opened ? 'opened block' : 'opacity-0 pointer-events-none',
      ]"
      @click="activePeek = null"
    >
      <div
        ref="peekClipElRef"
        class="clip"
        :style="finalClipStyle"
        absolute flex-center overflow-hidden bg-dialog @click.stop
      >
        <iframe
          v-for="url in urlList"
          :key="url"
          :width="`${peekViewRect.width}px`"
          :height="`${peekViewRect.height}px`"
          :src="url"
          :class="[
            url === activePeek?.url || url === animatingPeek?.url
              ? 'z1 pointer-events-auto block'
              : 'z0 pointer-events-none hidden',
          ]"
          absolute
        />
      </div>

      <a
        :href="activePeek?.url"
        target="_blank"
        absolute
        bottom-10 class="left-1/2 -translate-x-1/2"
        @click.stop
      >
        <button
          v-cursor-block
          rounded-xl bg-dialog px5 py2 class="with-hover"
        >
          <!-- <div class="" -->
          <span>Open in new tab</span>
        </button>
      </a>
    </div>
  </Teleport>
</template>

<style scoped>
.mask {
  transition: opacity .3s ease 0.1s;
  background: rgba(0,0,0, 0.3);
}
.mask.opened {
  transition-duration: 0.2s;
}
.clip {
  border-radius: 16px;
  box-shadow: 0px 10px 20px rgba(0,0,0,0.1), 0px 2px 4px rgba(0,0,0,0.05);
}
</style>
