<script setup lang="ts">
import { MasonryFlowItem, MasonryFlowRoot } from 'masonry-flow/vue'
import { projects } from '~/constants/projects'

const theme = useColorMode()
const { preload, cachedUrls, opened, closePeek } = usePeek()
const { onKeydown } = useKeyboard()

onKeydown((e) => {
  if (e.code.toLocaleLowerCase() === 'space') {
    e.preventDefault()
    e.stopPropagation()
    if (opened.value) {
      closePeek()
    }
  }
})

const resolvedProjects = computed(() => {
  const isDark = theme.value === 'dark'
  return projects.map((proj) => {
    const thumb = typeof proj.thumb === 'function'
      ? proj.thumb(isDark)
      : proj.thumb
    return {
      ...proj,
      thumb,
    }
  })
})

onMounted(() => {
  let allLoaded = false

  const check = () => {
    const nextToLoad = projects.find(({ url }) => {
      return !cachedUrls.value.has(url)
    })
    if (!nextToLoad) {
      allLoaded = true
    }
    else {
      preload(nextToLoad.url)
    }
  }

  const loop = setInterval(() => {
    check()
    if (allLoaded)
      clearInterval(loop)
  }, 1000)
})
</script>

<template>
  <div w-full pt10>
    <MasonryFlowRoot
      :transition-duration="500"
      transition-timing="cubic-bezier(.35,.38,.09,.99)"
      w-full
      width="280,400"
      :gap-x="24"
      :gap-y="16"
      :scrollable="false"
    >
      <MasonryFlowItem
        v-for="(project, index) in resolvedProjects"
        :key="`${theme}.${project.id}`"
        :height="240"
        :index="index"
      >
        <ProjectCard :project="project" />
      </MasonryFlowItem>
    </MasonryFlowRoot>
  </div>
</template>
