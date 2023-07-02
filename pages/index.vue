<script setup lang="ts">
import { codepen, github, twitter } from '../constants/social'

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
    <caption flex="~" items-center gap-2 text-left text-6 text-gray-500>
      <div i-fluent-emoji:face-with-peeking-eye />
      I'm building this site.
    </caption>

    <br>
    <br>
    <br>

    <div flex="~" gap-2>
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.href"
      >
        <div :class="{ [social.icon]: true }" />
      </a>
    </div>
  </div>
</template>
