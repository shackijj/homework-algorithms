const suggest = require('./suggest')

describe('suggest', () => {
  describe('given an array of strings and string which we need to find', () => {
    let strArray
    let pattern
    let result

    beforeEach(() => {
      result = suggest(pattern, strArray)
    })

    describe('given that there is a strings in the array that matches substring', () => {
      beforeAll(() => {
        strArray = [
          'foo'
        ]
        pattern = 'foo'
      })
      it('will return the string', () => {
        expect(result).toEqual(['foo'])
      })
    })
    describe('given that there is not a strings in the array that matches substring', () => {
      beforeAll(() => {
        strArray = [
          'boo'
        ]
        pattern = 'foo'
      })
      it('will return an empty array', () => {
        expect(result).toEqual([])
      })
    })

    describe('given that there are strings which match substring but have diffrent register', () => {
      beforeAll(() => {
        strArray = [
          'foo',
          'Foo',
          'fOo',
          'foO',
          'FOo',
          'FOO',
          'fOO'
        ]
        pattern = 'foo'
      })
      it('will return all of them', () => {
        expect(result).toEqual(strArray)
      })
    })

    describe('given that there are strings which contains a substring', () => {
      beforeAll(() => {
        strArray = [
          '123fooЯЫВ',
          'ASDFOOzx as'
        ]
        pattern = 'foo'
      })
      it('will return all of them', () => {
        expect(result).toEqual(strArray)
      })
    })
  })

  describe('given that MAX_COUNT parameter is passed', () => {
    let strArray
    let pattern
    let maxCount
    let result

    beforeEach(() => {
      result = suggest(pattern, strArray, maxCount)
    })

    beforeAll(() => {
      strArray = [
        'foo1',
        'foo2',
        'foo3',
        'foo4'
      ]
      pattern = 'foo'
      maxCount = 3
    })

    it('will show only 3 items', () => {
      expect(result).toHaveLength(3)
    })

    it('will return first 3 found items', () => {
      expect(result).toEqual(['foo1', 'foo2', 'foo3'])
    })
  })
})
