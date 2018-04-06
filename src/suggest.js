/**
 * Вычислительная сложность O(N) * O(M) где,
 * N - кол-во элементов в массиве
 * M - кол-во элементов в строке
 * Память:
 * O(N), где N число символов в самой длинной строке в массиве
 * @param {string} needle
 * @param {string[]} haystack
 * @param {number=} MAX_COUNT
 */
function suggest (needle, haystack, MAX_COUNT = 10) {
  const length = haystack.length
  const rc = []
  const needleLower = needle.toLowerCase()

  for (let i = 0, c = 0; i < length && c < MAX_COUNT; i++) {
    const stringLower = haystack[i].toLowerCase()

    if (stringLower.indexOf(needleLower) > -1) {
      rc.push(haystack[i])
      c++
    }
  }
  return rc
}

module.exports = suggest
