type Handler<T extends Event> = (event: T) => void

const _handlesMap = new Map<
  keyof WindowEventMap,
  Array<Handler<WindowEventMap[keyof WindowEventMap]>>
>()

function initGlobalEvent<T extends keyof WindowEventMap>(name: T) {
  const prev = _handlesMap.get(name)
  if (!prev) {
    const handlers = [] as Handler<WindowEventMap[T]>[]
    window.addEventListener(name, (e) => {
      handlers.forEach((handler) => {
        handler(e)
      })
    })
    _handlesMap.set(name, handlers as any)
    return handlers
  }
  return prev
}
function addListener<T extends keyof WindowEventMap>(
  name: T,
  handler: (e: WindowEventMap[T]) => void,
) {
  initGlobalEvent(name).push(handler)
}

function removeListener<T extends keyof WindowEventMap>(
  name: T,
  handler: Handler<WindowEventMap[T]>,
) {
  const handlers = _handlesMap.get(name) as Handler<WindowEventMap[T]>[]
  const idx = handlers.indexOf(handler)
  if (idx !== -1) {
    handlers.splice(idx, 1)
  }
}

export function useGlobalEvents<T extends keyof WindowEventMap>(name: T) {
  const innerComponentHandlers = [] as Handler<WindowEventMap[T]>[]

  const clear = () => {
    while (innerComponentHandlers.length)
      removeListener(name, innerComponentHandlers.pop()!)
  }

  const listen = (handler: Handler<WindowEventMap[T]>) => {
    innerComponentHandlers.push(handler)
    addListener(name, handler)

    return () => {
      const idx = innerComponentHandlers.indexOf(handler)
      if (idx !== -1) {
        innerComponentHandlers.splice(idx, 1)
        removeListener(name, handler)
      }
    }
  }

  onMounted(() => {
    initGlobalEvent(name)
  })
  onBeforeUnmount(() => {
    clear()
  })

  return { listen, clear }
}
