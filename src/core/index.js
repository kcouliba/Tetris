import {
  EMPTY_CELL,
  HEIGHT,
  WIDTH,
  TETRIMINO_BLOCK_SIZE,
  TETRIMINO_BLOCKS,
} from './constants'
import { TETRIMINO } from './tetriminos'
import { Vector2d } from '../lib/math'

const isCellNotEmpty = cell => cell !== EMPTY_CELL

/**
 * initializes a grid
 * @param {Object}
 *  @param {Number} width grid width
 *  @param {Number} height grid height
 * @returns {Array}
 */
export const initGrid = ({ width = WIDTH, height = HEIGHT } = {}) => {
  const grid = Array(height).fill(null)

  for (let idx = 0; idx < height; idx++) {
    grid[idx] = Array(width).fill(EMPTY_CELL)
  }
  return grid
}

/**
 * a 4x4 grid where active cells represents a shape
 * @param {Enum<String>} shape the tetrimino shape
 * one of [L, R_L, S, R_S, T, O, I]
 * @returns {Array}
 */
export const getTetrimino = shape => TETRIMINO[shape]
export const getRandomTetrimino = () => getTetrimino(
  TETRIMINO_BLOCKS[Math.round(Math.random() * 100) % TETRIMINO_BLOCKS.length]
)

// /**
//  * locks a tetrimino block
//  * @param {Array} tetrimino
//  */
// export const lockTetrimino = tetrimino => tetrimino.map(
//   line => line.map(cell => isCellNotEmpty(cell) ? LOCKED_CELL : cell)
// )

/**
 * provides a rotation matrix according to the passed angle (radians)
 * @param {Number} angle
 * @returns {Array}
 */
const getRotationMatrix = angle => [
  Math.round(Math.cos(angle)),
  Math.round(Math.sin(angle)),
  Math.round(-Math.sin(angle)),
  Math.round(Math.cos(angle)),
]

/**
 * rotates a tetrimino block
 * @param {Array} tetrimino the block we want to rotate
 * @param {Number} angle rotation angle (radians)
 * @param {Object} offset offset to replace block into the right quadrant
 *  @param {Number} xOffset
 *  @param {Number} yOffset
 * @returns {Array}
 */
export const rotateTetrimino = (tetrimino, angle, { xOffset = 0, yOffset = 0 }) => {
  const newTetrimino = initGrid({
    height: TETRIMINO_BLOCK_SIZE,
    width: TETRIMINO_BLOCK_SIZE,
  })
  const rotationMatrix = getRotationMatrix(angle)

  for (let y = 0; y < TETRIMINO_BLOCK_SIZE; y++) {
    for (let x = 0; x < TETRIMINO_BLOCK_SIZE; x++) {
      if (isCellNotEmpty(tetrimino[y][x])) {
        const rX = x * rotationMatrix[0] + y * rotationMatrix[1] + xOffset
        const rY = x * rotationMatrix[2] + y * rotationMatrix[3] + yOffset

        newTetrimino[rY][rX] = tetrimino[y][x]
      }
    }
  }
  return newTetrimino
}

/**
 * translate a tetrimino position
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Vector2d} direction tetrimino moving vector
 * @returns {Vector2d}
 */
export const moveTetrimino = (tetriminoPos, direction) => {
  return Vector2d.add(tetriminoPos, direction)
}

const isLineComplete = line => line.every(isCellNotEmpty)

export const scanLines = grid => grid.reduce((acc, line) => {
  if (isLineComplete(line)) {
    acc.unshift(Array(line.length).fill(EMPTY_CELL))
  } else {
    acc.push(line)
  }
  return acc
}, [])
