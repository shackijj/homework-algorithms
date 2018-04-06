const suggest = require('./suggest')

describe('suggest', () => {
  describe('given an array of strings and string which we need to find', () => {
    let haystack
    let needle
    let result

    beforeEach(() => {
      result = suggest(needle, haystack)
    })

    describe('given that there is a strings in the array that matches substring', () => {
      beforeAll(() => {
        haystack = [
          'foo'
        ]
        needle = 'foo'
      })
      it('will return the string', () => {
        expect(result).toEqual(['foo'])
      })
    })
    describe('given that there is not a strings in the array that matches substring', () => {
      beforeAll(() => {
        haystack = [
          'boo'
        ]
        needle = 'foo'
      })
      it('will return an empty array', () => {
        expect(result).toEqual([])
      })
    })

    describe('given that there are strings which match substring but have diffrent register', () => {
      beforeAll(() => {
        haystack = [
          'foo',
          'Foo',
          'fOo',
          'foO',
          'FOo',
          'FOO',
          'fOO'
        ]
        needle = 'foo'
      })
      it('will return all of them', () => {
        expect(result).toEqual(haystack)
      })
    })

    describe('given that there are strings which contains a substring', () => {
      beforeAll(() => {
        haystack = [
          '123fooЯЫВ',
          'ASDFOOzx as'
        ]
        needle = 'foo'
      })
      it('will return all of them', () => {
        expect(result).toEqual(haystack)
      })
    })
  })

  describe('given that MAX_COUNT parameter is passed', () => {
    let haystack
    let needle
    let maxCount
    let result

    beforeEach(() => {
      result = suggest(needle, haystack, maxCount)
    })

    beforeAll(() => {
      haystack = [
        'foo1',
        'foo2',
        'foo3',
        'foo4'
      ]
      needle = 'foo'
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
