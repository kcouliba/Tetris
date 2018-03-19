/**
 * deeply compares two inputs
 * @param {Number|Object|Array|String} inputA
 * @param {Number|Object|Array|String} inputB
 * @returns {Boolean}
 */
export const equals = (inputA, inputB) => {
  // type differs
  if (typeof inputA !== typeof inputB) {
    return false
  }
  // we are comparing arrays
  if (inputA instanceof Array && inputB instanceof Array) {
    if (inputA.length !== inputB.length) return false
    const refA = inputA.slice(0).sort()
    const refB = inputB.slice(0).sort()

    return refA.reduce((acc, val, idx) => acc && equals(val, refB[idx]), true)
  }
  // we are comparing objects
  if (inputA instanceof Object && inputB instanceof Object) {
    const keysA = Object.keys(inputA).sort()
    const keysB = Object.keys(inputB).sort()

    if (keysA.length === keysB.length && keysA.join('') === keysB.join('')) {
      for (let key of keysA) {
        return equals(inputA[key], inputB[key])
      }
    }
  }
  return inputA === inputB
}
