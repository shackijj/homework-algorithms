class EventEmitter {
  constructor () {
    this.events = {}
  }
  /**
  * Амортизированная сложность O(1)
  * @param {string} event
  * @param {Function} handler
  */
  on (event, handler) {
    const handlersMap = this.events[event]
    if (handlersMap) {
      if (handlersMap.has(handler)) {
        throw new Error(`This handler has already been subcribed for "${event}" event`)
      }
      handlersMap.set(handler, handler)
    } else {
      const handlersMap = new Map()
      handlersMap.set(handler, handler)
      this.events[event] = handlersMap
    }
  }
  /**
   * Амортизированная сложность O(1)
   * @param {string} event
   * @param {Function} handler
   */
  off (event, handler) {
    const handlersMap = this.events[event]
    if (handlersMap && handlersMap.has(handler)) {
      handlersMap.delete(handler)
    }
  }

  /**
   * Cложность O(N) без учета сложности обработчиков.
   * @param {string} event
   */
  emit (event) {
    const handlersMap = this.events[event]
    if (handlersMap) {
      for (let handler of handlersMap.values()) {
        /** Обработчик можно вызвать асинхронно setTimeout(handler, 0) */
        handler()
      }
    }
  }
}

module.exports = EventEmitter
