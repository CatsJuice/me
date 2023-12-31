<script setup lang="ts">
import { sleep } from '@catsjuice/utils'
import Typed from 'typed.js'
import { useCursor } from 'ipad-cursor/vue'

const $s1h = ref<HTMLElement>()
const $s1 = ref<HTMLElement>()
const $s2h = ref<HTMLElement>()
const $s2 = ref<HTMLElement>()
const $s3h = ref<HTMLElement>()
const $s3 = ref<HTMLElement>()

const { updateCursor } = useCursor()

onMounted(async () => {
  const t1 = await typeSentence1()
  updateCursor()
  t1.cursor.remove()
  await sleep(200)
  const t2 = await typeSentence2()
  t2.cursor.remove()
  updateCursor()
  await sleep(1000)
  await typeSentence3()
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

async function typeSentence3() {
  return new Promise<Typed>((resolve) => {
    const _ = new Typed($s3.value, {
      stringsElement: $s3h.value,
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
          <span data-cursor="text" inline-block text-nowrap>Hi, ^400I'm</span>
          <div data-cursor="block" ml2 inline-block px2 text-nowrap>
            <span class="catsjuice" inline-block>
              CatsJuice
            </span>
          </div>
        </div>
      </div>

      <div ref="$s2h" hidden>
        <div>
          <span data-cursor="text" inline-block>
            A Node.js ^200 fullstack
          </span>

          <div ml1 inline-block px1 italic>
            <code data-cursor="block" inline-block leading-none data-cursor-style="radius: 6px">
              &#60;developer&nbsp;/&#62;
            </code>
          </div>
        </div>
      </div>

      <div ref="$s3h" hidden>
        <div>
          <div flex="~" items-center>
            <div data-cursor="block" mr2 inline-block p1>
              <div i-fluent-emoji:face-with-peeking-eye />
            </div>
            <span inline-block data-cursor="text">
              I'm building this site
            </span>
          </div>
        </div>
      </div>
    </div>

    <div flex="~ wrap" items-center title-1>
      <div
        mr4
        class="avatar"
        data-cursor="block"
        data-cursor-style="--cursor-radius: 50%;--cursor-scale: 1.1;--cursor-blur-duration: 1.4s"
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
    <div mt3 class="s3" flex="~" items-center font-400 text-gray-4>
      <div ref="$s3" inline-flex items-center />
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
