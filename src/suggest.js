/**
 * Вычислительная сложность O(N) * O(M) где,
 * N - кол-во элементов в массиве
 * M - кол-во элементов в строке
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

module.exports = suggest
