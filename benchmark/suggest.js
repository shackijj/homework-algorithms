const Benchmark = require('benchmark')
const suggest = require('../src/suggest')
const streets = require('../data/streets.json')

const suite = new Benchmark.Suite()

suite
  .add('suggest. Реальный пример', () => {
    suggest('толстого', streets)
  })
  .add('suggest. Несуществующая улица', () => {
    suggest('фывщшрд', streets)
  })
  .on('complete', function () {
    this.forEach((bench) => {
      const {mean, deviation} = bench.stats
      console.log(bench.toString(), `mean ${mean}, deviation ${deviation}`)
    })
  })
  .run({ 'async': true })
