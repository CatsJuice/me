<script setup lang="ts">
import { BorderBox, type BorderBoxProps } from 'border-box/vue'
import { useCursor } from 'ipad-cursor/vue'

const $route = useRoute()

const hash = computed(() => $route.hash)
const hashParams = computed(() => new URLSearchParams(hash.value.slice(1)))
const isDark = computed(() => hashParams.value.get('dark')?.toLocaleLowerCase() === 'true')
const background = computed(() => hashParams.value.get('bg') ?? 'transparent')
const maxSize = computed(() => Number(hashParams.value.get('size')) || 36)

const { disposeCursor } = useCursor()

onMounted(() => {
  disposeCursor()
})

const borderBoxProps = computed(() => ({
  borderRadius: 10,
  borderWidth: 1.5,
  smooth: 1,
  borderColor: isDark.value
    ? 'linear-gradient(0deg, rgb(237 149 160) 0%, rgb(251 233 236 / 39%) 100%)'
    : 'linear-gradient(0deg, rgb(177 61 75 / 23%) 0%, rgb(164 46 66 / 8%) 100%)',
} satisfies BorderBoxProps))
</script>

<template>
  <div h-full w-full flex-center :style="{ background }">
    <div h-full w-full :style="{ maxWidth: `${maxSize}px`, maxHeight: `${maxSize}px` }">
      <BorderBox v-bind="borderBoxProps" class="border-box-root" :class="{ dark: isDark }">
        <a
          block h-full w-full cursor-pointer
          href="https://oooo.so"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img class="avatar" h-full w-full src="/imgs/catsjuice-avatar.jpg" draggable="false">
        </a>
        <template #borderMask>
          <div class="border-mask" />
        </template>
      </BorderBox>
    </div>
  </div>
</template>

<style scoped>
.border-mask {
  background: #FC909F;
  width: 100%;
  height: 0%;
  opacity: 0;
  transition: all .3s;
}
.border-box-root img.avatar {
  transition: all .3s;
}
.border-box-root:hover .border-mask {
  opacity: 1;
  height: 100%;
}
.border-box-root:hover img.avatar {
  transform: scale(1.15);
}
</style>
