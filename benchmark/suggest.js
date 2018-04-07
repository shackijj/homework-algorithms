const Benchmark = require('benchmark')
const {suggest, suggestUsingPreparedArray} = require('../src/suggest')
const fs = require('fs')
const path = require('path')

const suite = new Benchmark.Suite()

const streets =
  fs.readFileSync(path.resolve(__dirname, 'moscow-streets.csv'), 'utf-8')
    .split('\n')
    .map((line) => line.split(';')[2])

const streetsLowered = streets.map(str => ({lowered: str.toLowerCase(), original: str}))

suite
  .add('suggest. Реальный пример', () => {
    suggest('толстого', streets)
  })
  .add('suggest. Несуществующая улица', () => {
    suggest('фывщшрд', streets)
  })
  .add('suggestUsingPreparedArray. Реальный пример', () => {
    suggestUsingPreparedArray('толстого', streetsLowered)
  })
  .add('suggestUsingPreparedArray. Несуществующая улица', () => {
    suggestUsingPreparedArray('фывщшрд', streetsLowered)
  })
  .on('complete', function () {
    this.forEach((bench) => {
      const {mean, deviation} = bench.stats
      console.log(bench.toString(), `mean ${mean}, deviation ${deviation}`)
    })
  })
  .run({ 'async': true })
