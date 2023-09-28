<script setup lang="ts">
import { useCursor } from 'ipad-cursor/vue'
import { codepen, github, twitter } from '../constants/social'

useCursor({
  normalStyle: {
    backdropBlur: '20px',
  },
  blockStyle: {
    backdropBlur: '0px',
    durationBackdropFilter: '1s',
  },
})

const socials = [
  {
    name: 'Github',
    icon: 'i-mdi:github',
    href: github,
  },
  {
    name: 'Codepen',
    icon: 'i-mdi:codepen',
    href: codepen,
  },
  {
    name: 'Twitter',
    href: twitter,
    textIcon: '𝕏',
  },
]
</script>

<template>
  <div flex="~ col" mx-auto max-w-800px w-full px-lg>
    <ClientOnly>
      <ProfileTitle />
    </ClientOnly>
    <h1 display-none>
      Hi, I'm CatsJuice
    </h1>

    <br>
    <br>
    <br>

    <div flex="~" items-center gap-2 text-5>
      <a
        v-for="social in socials"
        :key="social.name"
        flex="~" h8 w8 items-center justify-center rounded-2.5 p1
        data-cursor="block"
        :href="social.href"
      >
        <div v-if="social.icon" :class="{ [social.icon]: true }" />
        <div v-else-if="social.textIcon">{{ social.textIcon }}</div>
      </a>
    </div>
  </div>
</template>
