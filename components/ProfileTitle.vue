<script setup lang="ts">
import { sleep } from '@catsjuice/utils'
import Typed from 'typed.js'
import { useCursor } from 'ipad-cursor/vue'

const $s1h = ref<HTMLElement>()
const $s1 = ref<HTMLElement>()
const $s2h = ref<HTMLElement>()
const $s2 = ref<HTMLElement>()

const { updateCursor } = useCursor()

onMounted(async () => {
  const t1 = await typeSentence1()
  updateCursor()
  t1.cursor.remove()
  await sleep(200)
  await typeSentence2()
  updateCursor()
})

async function typeSentence1() {
  return new Promise<Typed>((resolve) => {
    const _ = new Typed($s1.value, {
      stringsElement: $s1h.value,
      typeSpeed: 50,
      onComplete(self) {
        // self.cursor.remove()
        resolve(self)
      },
    })
  })
}

async function typeSentence2() {
  return new Promise<Typed>((resolve) => {
    const _ = new Typed($s2.value, {
      stringsElement: $s2h.value,
      typeSpeed: 10,
      onComplete(self) {
        resolve(self)
      },
    })
  })
}
</script>

<template>
  <div class="profile-title" select-none>
    <div>
      <div ref="$s1h" hidden>
        <div>
          <span v-cursor-text inline-block text-nowrap>Hi, ^400I'm</span>
          <div v-cursor-block ml2 inline-block px2 text-nowrap>
            <span class="catsjuice" inline-block>
              CatsJuice
            </span>
          </div>
        </div>
      </div>

      <div ref="$s2h" hidden>
        <div>
          <span v-cursor-text inline-block>
            A Node.js ^200 fullstack
          </span>

          <div ml1 inline-block px1 italic>
            <code
              v-cursor-block="{ radius: '6px' }"
              inline-block leading-none
            >
              &#60;developer&nbsp;/&#62;
            </code>
          </div>
        </div>
      </div>
    </div>

    <div flex="~ wrap" items-center title-1>
      <div
        v-cursor-block="{
          '--cursor-radius': '50%',
          '--cursor-scale': 1.1,
          '--cursor-blur-duration': '1.4s',
        }"
        mr4
        class="avatar"
      >
        <img
          src="/imgs/catsjuice-avatar.jpg"
          h-12 w-12 rounded-full
        >
      </div>
      <div ref="$s1" inline-flex flex="nowrap" items-center />
    </div>
    <div font-500 title-2>
      <div ref="$s2" inline />
    </div>
  </div>
</template>

<style>
/* Cursor */
.typed-cursor {
  font-weight: normal;
}
.s3 .typed-cursor {
  margin-top: -5px;
}

.catsjuice {
  position: relative;
}
.catsjuice::after {
  padding: inherit;
  content: 'CatsJuice';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  transition: all 0.5s;
  z-index: 1;

  background: -webkit-linear-gradient(0deg, #e81e57 0%, #910aff 80%, #af38ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.catsjuice:hover::after {
  width: 100%;
}

.profile-title code {
  padding: 3px 0.2em;
  background-color: rgba(100, 100, 100, 0.1);
  border-radius: 0.25em;
  border: 1px solid rgba(100, 100, 100, 0.1);
}

.avatar img {
  transition: all 0.2s cubic-bezier(.68,.09,.53,1.4);
}
.avatar:hover img {
  transform: rotate(-5deg);
}
</style>
