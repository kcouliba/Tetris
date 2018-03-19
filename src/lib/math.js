/**
 * converts degrees to radians
 * @param {Number} deg
 * @returns {Number}
 */
export const deg2rad = deg => Math.PI * (deg / 180)

export const Vector2d = {
  /**
   * create a new 2d vector
   * @param {Number} x
   * @param {Number} y
   * @returns {Vector2d}
   */
  create: (x, y) => ({x, y}),

  /**
   * add two vectors
   * @param {Vector2d} vA
   * @param {Vector2d} vB
   * @returns {Vector2d}
   */
  add: (vA, vB) => ({x: vA.x + vB.x, y: vA.y + vB.y}),

  /**
   * subtract two vectors
   * @param {Vector2d} vA
   * @param {Vector2d} vB
   * @returns {Vector2d}
   */
  subtract: (vA, vB) => ({x: vA.x - vB.x, y: vA.y - vB.y}),
}
