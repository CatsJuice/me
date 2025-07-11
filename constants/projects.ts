export interface Project {
  id: number
  name: string
  url: string
  thumb: string | VNode | ((dark?: boolean) => string | VNode)

  github?: string
  npm?: string
  codepen?: string
  background?: string
}

export const projects: Project[] = [
  {
    id: 2,
    name: 'iPad Cursor',
    github: 'https://github.com/CatsJuice/ipad-cursor',
    url: 'https://cursor.oooo.so',
    thumb: dark => dark ? 'cursor.dark.gif' : 'cursor.light.gif',
    npm: 'https://www.npmjs.com/package/ipad-cursor',
  },
  {
    id: 4,
    name: 'Masonry Flow',
    github: 'https://github.com/CatsJuice/masonry-flow',
    url: 'https://masonry.oooo.so',
    thumb: dark => dark ? 'masonry.dark.gif' : 'masonry.light.gif',
    npm: 'https://www.npmjs.com/package/masonry-flow',
  },

  {
    id: 3,
    name: 'Dockbar',
    github: 'https://github.com/catsjuice/dockbar',
    url: 'https://dock.oooo.so',
    thumb: dark => dark ? 'dock.dark.gif' : 'dock.light.gif',
    npm: 'https://www.npmjs.com/package/dockbar',
  },
  {
    id: 5,
    name: 'SSR Contribution Image',
    github: 'https://github.com/CatsJuice/ssr-contributions-img',
    url: 'https://contribution.oooo.so',
    thumb: dark => dark
      ? 'https://contribution.oooo.so/_/CatsJuice?chart=3dbar&gap=0.6&scale=2&animation=wave&animation_duration=4&animation_delay=0.06&animation_amplitude=24&animation_frequency=0.1&animation_wave_center=0_3&format=svg&weeks=30&theme=native&dark=true'
      : 'https://contribution.oooo.so/_/CatsJuice?chart=3dbar&gap=0.6&scale=2&animation=wave&animation_duration=4&animation_delay=0.06&animation_amplitude=24&animation_frequency=0.1&animation_wave_center=0_3&format=svg&weeks=30&theme=native',
  },
  {
    id: 1,
    name: 'Svg Drawing',
    github: 'https://github.com/CatsJuice/svg-drawing',
    url: 'https://draw.oooo.so',
    thumb: dark => dark ? 'svg-drawing.dark.svg' : 'svg-drawing.svg',
    background: 'white',
  },
  {
    id: 6,
    name: 'Noise Generator',
    github: 'https://github.com/CatsJuice/noise-maker',
    url: 'https://noise.oooo.so',
    thumb: dark => dark ? 'noise.dark.png' : 'noise.light.png',
  },
  {
    id: 10,
    name: 'Clock Clock White',
    url: 'https://clock.oooo.so',
    github: 'https://github.com/CatsJuice/clock-clock-white',
    thumb: dark => dark
      ? 'clock.dark.gif'
      : 'clock.light.gif',
  },
  {
    id: 7,
    name: 'CSS Curve Paper',
    github: 'https://github.com/CatsJuice/css-paper-curve',
    url: 'https://codepen.io/catsjuice/full/ZEwommv',
    thumb: dark => dark ? 'css-curve-paper.dark.gif' : 'css-curve-paper.light.gif',
    codepen: 'https://codepen.io/catsjuice/full/ZEwommv',
  },
  {
    id: 8,
    name: 'Figma Sticky Note',
    url: 'https://codepen.io/catsjuice/full/RwqzGxV',
    thumb: dark => dark ? 'figma-sticker.dark.gif' : 'figma-sticker.light.gif',
    codepen: 'https://codepen.io/catsjuice/full/RwqzGxV',
  },
  {
    id: 9,
    name: 'CSS Leopold FC750R PD',
    url: 'https://codepen.io/catsjuice/full/RwKBJgN',
    thumb: dark => dark ? 'leopold.dark.png' : 'leopold.light.png',
    codepen: 'https://codepen.io/catsjuice/full/RwKBJgN',
  },
  {
    id: 11,
    name: 'Morph pargraph by chars',
    url: 'https://html.oooo.so/text-morph/index.html',
    thumb: dark => dark ? 'text-morph.dark.gif' : 'text-morph.light.gif',
    codepen: 'https://codepen.io/catsjuice/full/QwbwWqx',
  },
  {
    id: 12,
    name: 'Canvas Calendar',
    url: 'https://canvas-calendar.oooo.so',
    thumb: dark => dark ? 'canvas-calendar.dark.gif' : 'canvas-calendar.light.gif',
    github: 'https://github.com/CatsJuice/canvas-calendar',
  },
]
