const position = { x: 0, y: 0 }
const isServer = typeof document === 'undefined'
const cursorClassName = 'cursor'
const activeNodes = new Set<Element>()

const normalStyle = {
  '--cursor-width': '20px',
  '--cursor-height': '20px',
  '--cursor-radius': '10px',
  '--cursor-duration': '0.2s',
  '--cursor-bg': 'rgba(100, 100, 100, 0.1)',
  '--cursor-border': '1px solid rgba(100, 100, 100, 0.1)',
  '--cursor-z-index': '9999',
  '--cursor-font-size': '1rem',
}
const textStyle = {
  '--cursor-width': '4px',
  '--cursor-height': '1.2em',
  '--cursor-border': '0px solid rgba(100, 100, 100, 0)',
  '--cursor-bg': 'rgba(100, 100, 100, 0.5)',
}

let ready = false
let cursor: HTMLDivElement

function updateStyle(keyOrObj: string | Record<string, any>, value?: any) {
  if (!cursor)
    return
  if (typeof keyOrObj === 'string') {
    cursor.style.setProperty(keyOrObj, value)
  }
  else {
    Object.entries(keyOrObj).forEach(([key, value]) => {
      cursor.style.setProperty(key, value)
    })
  }
}

function init() {
  if (isServer || ready)
    return
  ready = true
  window.addEventListener('mousemove', (e) => {
    position.x = e.clientX
    position.y = e.clientY
  })
  createCursor()
  updateCursorPosition()

  const styleTag = document.createElement('style')
  styleTag.innerHTML = `
    body, * {
      cursor: none;
    }
    .${cursorClassName.split(/\s+/).join('.')} {
      pointer-events: none;
      position: fixed;
      left: calc(var(--cursor-x) - var(--cursor-width) / 2);
      top: calc(var(--cursor-y) - var(--cursor-height) / 2);
      width: var(--cursor-width);
      height: var(--cursor-height);
      border-radius: var(--cursor-radius);
      background-color: var(--cursor-bg);
      border: var(--cursor-border);
      z-index: var(--cursor-z-index);
      font-size: var(--cursor-font-size);
      transition:
        width var(--cursor-duration) ease,
        height var(--cursor-duration) ease,
        border-radius var(--cursor-duration) ease,
        border var(--cursor-duration) ease,
        background-color var(--cursor-duration) ease;
      }
  `
  document.head.appendChild(styleTag)
}

/**
 * create cursor element, append to body
 * @returns
 */
function createCursor() {
  if (isServer)
    return
  cursor = document.createElement('div')
  cursor.classList.add(cursorClassName)
  updateStyle(normalStyle)
  document.body.appendChild(cursor)
}

/**
 * update cursor position, request animation frame
 * @returns
 */
function updateCursorPosition() {
  if (isServer || !cursor)
    return
  updateStyle('--cursor-x', `${position.x}px`)
  updateStyle('--cursor-y', `${position.y}px`)
  window.requestAnimationFrame(updateCursorPosition)
}

function queryAllNodes() {
  if (isServer || !ready)
    return []
  const nodes = document.querySelectorAll('[data-cursor]')
  return nodes
}

function register() {
  if (isServer || !ready)
    return
  const nodes = queryAllNodes()
  const nodesMap = new Map()
  nodes.forEach((node) => {
    nodesMap.set(node, true)
    if (activeNodes.has(node))
      return
    registerNode(node)
  })

  activeNodes.forEach((node) => {
    if (nodesMap.has(node))
      return
    unregisterNode(node)
  })
}

function registerNode(node: Element) {
  const type = node.getAttribute('data-cursor')
  activeNodes.add(node)
  if (type === 'text')
    registerTextNode(node)
}

function unregisterNode(node: Element) {
  const type = node.getAttribute('data-cursor')
  activeNodes.delete(node)
  if (type === 'text')
    unregisterTextNode(node)
}

function registerTextNode(node: Element) {
  node.addEventListener('mouseover', onTextOver)
  node.addEventListener('mouseleave', recoverStyle)
}
function unregisterTextNode(node: Element) {
  node.removeEventListener('mouseover', onTextOver)
  node.removeEventListener('mouseleave', recoverStyle)
}

function onTextOver(e: Event) {
  updateStyle(textStyle)
  const dom = e.target as HTMLElement
  const fontSize = window.getComputedStyle(dom).fontSize
  updateStyle('--cursor-font-size', fontSize)
}
function recoverStyle() {
  updateStyle(normalStyle)
}

export function useCursor() {
  init()
  return {
    ...position,
    register,
  }
}
