const handlers = [] as Array<(e: KeyboardEvent) => void>

function _onKeydown(e: KeyboardEvent) {
  handlers.forEach((handler) => {
    handler(e)
  })
}

let registered = false
function listenKeyboard() {
  if (registered) {
    return
  }
  registered = true

  window.addEventListener('keydown', _onKeydown)

  return () => {
    window.removeEventListener('keydown', _onKeydown)
  }
}

export function useKeyboard() {
  const innerComponentHandlers = [] as Array<(e: KeyboardEvent) => void>

  const onKeydown = (handler: (e: KeyboardEvent) => void) => {
    handlers.push(handler)
    innerComponentHandlers.push(handler)

    return () => {
      const idx = handlers.indexOf(handler)
      if (idx !== -1) {
        handlers.splice(idx, 1)
      }

      const idx2 = innerComponentHandlers.indexOf(handler)
      if (idx2 !== -1) {
        innerComponentHandlers.splice(idx2, 1)
      }
    }
  }

  onMounted(() => {
    listenKeyboard()
  })

  onBeforeUnmount(() => {
    innerComponentHandlers.forEach((handler) => {
      const idx = handlers.indexOf(handler)
      if (idx !== -1) {
        handlers.splice(idx, 1)
      }
    })
  })

  return { onKeydown }
}
