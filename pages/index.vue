<script setup lang="ts">
import { codepen, github, twitter } from '../constants/social'

useCursor()

const socials = [
  {
    name: 'Github',
    icon: 'i-mdi:github',
    href: github,
  },
  {
    name: 'Twitter',
    icon: 'i-mdi:twitter',
    href: twitter,
  },
  {
    name: 'Codepen',
    icon: 'i-mdi:codepen',
    href: codepen,
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

    <div flex="~" gap-2 text-5>
      <a
        v-for="social in socials"
        :key="social.name"
        p1
        data-cursor="rect"
        :href="social.href"
      >
        <div :class="{ [social.icon]: true }" />
      </a>
    </div>
  </div>
</template>
