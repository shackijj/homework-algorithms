class EventEmitter {
  constructor () {
    this.events = {}
  }
  /**
  * Амортизированная вычислительная сложность O(1)
  * Дополнительная память O(N), где N кол-во обработчиков
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
   * Амортизированная вычислительная сложность O(1)
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
   * Амортизированная вычислительная O(N) без учета сложности обработчиков.
   * @param {string} event
   */
  emit (event) {
    const handlersMap = this.events[event]
    if (handlersMap) {
      for (let handler of handlersMap.values()) {
        handler()
      }
    }
  }
}

module.exports = EventEmitter
