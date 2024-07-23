<script setup lang="ts">
import { codepen, github, twitter } from '../constants/social'

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
  <div flex="~ col" justify-center>
    <ClientOnly>
      <ProfileTitle />
    </ClientOnly>
    <section hidden>
      <h1>
        Hi, I'm CatsJuice
      </h1>
      <p>
        A Node.js fullstack developer
      </p>
    </section>

    <br>
    <br>
    <br>

    <div flex="~" items-center gap-2 text-5>
      <a
        v-for="social in socials"
        :key="social.name"
        v-cursor-block
        flex="~" h8 w8 items-center justify-center rounded-2.5 p1
        :href="social.href"
      >
        <div v-if="social.icon" :class="{ [social.icon]: true }" />
        <div v-else-if="social.textIcon">{{ social.textIcon }}</div>
      </a>
    </div>
  </div>
</template>
