<script setup lang="ts">
import type { Project } from '~/constants/projects'

interface Props {
  project: Project
}
const props = defineProps<Props>()

const { onKeydown } = useKeyboard()
const { openPeek, preload } = usePeek()
const thumbRef = ref<HTMLElement>()

const focused = ref(false)

onKeydown((e) => {
  if (e.code.toLocaleLowerCase() === 'space') {
    e.preventDefault()
    e.stopPropagation()
    if (focused.value) {
      openPeek(props.project.url, thumbRef.value!)
    }
  }
})

function getThumbSrc(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  if (url.startsWith('data:image/')) {
    return url
  }
  if (url.startsWith('projects/')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `projects/${url}`
}
</script>

<template>
  <div
    class="project"
    h-full w-full
    @click="openPeek(project.url, thumbRef!)"
    @mouseenter="() => {
      preload(project.url);
      focused = true;
    }"
    @mouseleave="() => {
      focused = false;
    }"
  >
    <div
      ref="thumbRef"
      class="project-thumb"
      h-200px overflow-hidden rounded-2 bg-card-bg
      border="~ 1 solid border-color-1"
    >
      <img
        v-if="typeof project.thumb === 'string'"
        h-full w-full select-none overflow-hidden object-cover
        draggable="false"
        :src="getThumbSrc(project.thumb)"
        :alt="project.name"
      >
      <template v-else>
        {{ project.thumb }}
      </template>
    </div>

    <div flex="~" h-40px items-center justify-between>
      <h6
        v-cursor-text="{ background: 'currentColor' }"
        inline-block h-full flex items-center px1 text-3.5 font-500
      >
        {{ project.name }}
      </h6>
      <div flex="~" gap-1 @click.stop>
        <a
          v-if="project.npm"
          v-cursor-block
          :href="project.npm"
          target="_blank"
          rel="noopener noreferrer"
          h6 w6 flex-center text-4.5 hover:color-npm
        >
          <span i-mdi:npm block />
        </a>
        <a
          v-if="project.codepen"
          v-cursor-block
          h6 w6 flex-center text-4.5
          :href="project.codepen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span i-mdi:codepen block />
        </a>
        <a
          v-if="project.github"
          v-cursor-block
          h6 w6 flex-center text-4.5
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span i-mdi:github block />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-thumb {
  transition: all 0.23s ease;
}
.project:hover .project-thumb {
  transform: scale(1.02);
}
</style>
