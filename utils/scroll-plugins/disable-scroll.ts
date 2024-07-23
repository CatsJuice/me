import { ScrollbarPlugin } from 'smooth-scrollbar'
import type { Data2d } from 'smooth-scrollbar/interfaces'
import type { Scrollbar } from 'smooth-scrollbar/scrollbar'

export class DisableScrollPlugin extends ScrollbarPlugin {
  static pluginName = 'disable-scroll'

  static defaultOptions = {
    disable: false,
  }

  private _prevDelta: Data2d = { x: 0, y: 0 }

  transformDelta(delta: Data2d) {
    if (this.options.disable)
      return this._prevDelta

    this._prevDelta = delta
    return delta
  }
}

export function disableScroll(scrollbar: Scrollbar) {
  scrollbar.updatePluginOptions('disable-scroll', {
    disable: true,
  })
}

export function enableScroll(scrollbar: Scrollbar) {
  scrollbar.updatePluginOptions('disable-scroll', {
    disable: false,
  })
}
