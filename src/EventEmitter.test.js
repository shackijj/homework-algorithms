const EventEmitter = require('./EventEmitter')

describe('EventEmitter', () => {
  let emitter

  beforeEach(() => {
    emitter = new EventEmitter()
  })

  function checkMethod (name) {
    it(`should have #${name} method`, () => {
      expect(emitter[name]).toBeInstanceOf(Function)
    })
  }

  ['on', 'off', 'emit'].map(checkMethod)

  describe('given that we subscribed three handlers, deleted second and emit the event', () => {
    const result = []
    const event = 'test'
    const handler1 = () => result.push(1)
    const handler2 = () => result.push(2)
    const handler3 = () => result.push(3)

    beforeEach(() => {
      emitter.on(event, handler1)
      emitter.on(event, handler2)
      emitter.on(event, handler3)
      emitter.off(event, handler2)
      emitter.emit(event)
    })
    it('will fire handlers in order of their subscription', () => {
      expect(result).toEqual([1, 3])
    })
  })

  describe('given that we subscribed a handler and then unsubscribed it', () => {
    const event = 'test'
    const mock1 = jest.fn()
    const mock2 = jest.fn()

    beforeEach(() => {
      emitter.on(event, mock1)
      emitter.on(event, mock2)
      emitter.off(event, mock2)
      emitter.emit(event)
    })
    it('will not fire the unsubscribed handler', () => {
      expect(mock2).not.toHaveBeenCalled()
    })
    it('will fire the remained handler', () => {
      expect(mock1).toHaveBeenCalled()
    })
  })

  describe('given that the same handler is registeredd twice for the same event', () => {
    const event = 'test'
    const mock = jest.fn()

    beforeEach(() => {
      emitter.on(event, mock)
    })
    it('will throw an error', () => {
      expect(() => emitter.on(event, mock))
        .toThrow('This handler has already been subcribed for "test" event')
    })
  })
})
