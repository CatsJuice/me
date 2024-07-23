<script setup lang="ts">
import { MasonryFlowItem, MasonryFlowRoot } from 'masonry-flow/vue'
import { projects } from '~/constants/projects'

const theme = useColorMode()

const resolvedProjects = computed(() => projects.map((proj) => {
  return {
    ...proj,
    thumb: typeof proj.thumb === 'function'
      ? proj.thumb(theme.value === 'dark')
      : proj.thumb,
  }
}))

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
        :key="project.id"
        :height="240"
        :index="index"
      >
        <div h-full w-full>
          <div
            bg-card-bg h-200px rounded-2
            border="~ 1 solid border-color-1"
            @click="() => openInNewTab(project.url)"
          >
            <ClientOnly>
              <img
                v-if="typeof project.thumb === 'string'"
                h-full w-full select-none overflow-hidden rounded-2 object-cover
                draggable="false"
                :src="getThumbSrc(project.thumb)"
                :alt="project.name"
              >
              <template v-else>
                {{ project.thumb }}
              </template>
            </ClientOnly>
          </div>

          <div flex="~" h-40px items-center justify-between>
            <h6
              v-cursor-text="{
                background: 'currentColor',
              }"
              inline-block h-full flex items-center px1 text-3.5 font-500
            >
              {{ project.name }}
            </h6>
            <div flex="~" gap-1>
              <a
                v-if="project.npm"
                v-cursor-block
                :href="project.npm"
                target="_blank"
                rel="noopener noreferrer"
                hover:color-npm h6 w6 flex-center text-4.5
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
      </MasonryFlowItem>
    </MasonryFlowRoot>
  </div>
</template>
