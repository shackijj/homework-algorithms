/**
 * Вычислительная сложность N * (M + K)  где,
 * N - кол-во элементов в массиве
 * M - кол-во символов в строке массива
 * K - длинна строки массива (Приведение к нижнему регистру)
 * Память:
 * O(N), где N число символов в самой длинной строке в массиве
 * @param {string} pattern
 * @param {string[]} strArray
 * @param {number=} MAX_COUNT
 */
function suggest (pattern, strArray, MAX_COUNT = 10) {
  const length = strArray.length
  const rc = []
  const patternLower = pattern.toLowerCase()

  for (let i = 0, c = 0; i < length && c < MAX_COUNT; i++) {
    const stringLower = strArray[i].toLowerCase()

    if (stringLower.indexOf(patternLower) > -1) {
      rc.push(strArray[i])
      c++
    }
  }
  return rc
}

/**
 * Выполнена простая оптимизация:
 * Принимаемый на вход массив данных уже содержит строку приведенную к нижнему регистру.
 * Чтобы увидеть результат (работает в 10 раз быстрее) в цифрах надо запустить npm run benchmark.
 * Вычислительная сложность N * M  где,
 * N - кол-во элементов в массиве
 * M - кол-во символов в строке массива
 * @param {string} pattern
 * @param {{lowered: string, original: string}} objArray
 * @param {number=} MAX_COUNT
 */
function suggestUsingPreparedArray (pattern, objArray, MAX_COUNT = 10) {
  const length = objArray.length
  const rc = []
  const patternLower = pattern.toLowerCase()

  for (let i = 0, c = 0; i < length && c < MAX_COUNT; i++) {
    const string = objArray[i]

    if (string.lowered.indexOf(patternLower) > -1) {
      rc.push(string.original)
      c++
    }
  }
  return rc
}

module.exports = {
  suggest,
  suggestUsingPreparedArray
}
