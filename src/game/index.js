import {
  // moveDownward,
  moveLeft,
  moveRight,
  rotateClockwise,
  rotateCounterClockwise,
} from './controls'
import {
  TETRIMINO_BLOCK_SIZE,
  WIDTH,
} from './constants'
import { tetriminoNotFit } from './validators'
import {
  initGrid,
  getRandomTetrimino,
  // lockTetrimino,
  // scanLines,
} from '../core'
import { Vector2d } from '../lib/math'

/**
 * our tetrimino starts at the middle of the grid
 */
const TETRIMINO_START_POS = Vector2d.create(
  WIDTH / 2 - TETRIMINO_BLOCK_SIZE / 2,
  0
)

let running = false
let paused = false

let grid = null
let tetrimino = null
let tetriminoPos = null

const blockAction = () => !running || paused

/**
 * rollback a moving action
 * returns true if a rollback action occured
 * @param {Function} rollBackFn the function which applies the rollback action
 * @returns {Boolean}
 */
const rollBack = rollBackFn => {
  if (tetriminoNotFit(grid, tetrimino, tetriminoPos)) {
    tetriminoPos = rollBackFn(tetriminoPos)
    return true
  }
  return false
}

/**
 * @todo
 * try to move the piece until it fits
 * returns true if it succeeded placing the block
 * @param {Function} rollBackFn the function which applies the rollback action
 * @returns {Boolean}
 */
const moveToFit = rollBackFn => {
  return rollBack(rollBackFn) === false
}

/**
 * places the current tetrimino onto the grid
 */
const updateGrid = () => {
  const newGrid = [...grid]

  for (let y = 0; y < TETRIMINO_BLOCK_SIZE; y++) {
    for (let x = 0; x < TETRIMINO_BLOCK_SIZE; x++) {
      newGrid[tetriminoPos.y + y][tetriminoPos.x + x] = tetrimino[y][x]
    }
  }
  return newGrid
}

// const blockTetrimino = () => {
//   if (tetriminoNotFit(grid, tetrimino, tetriminoPos)) {
//     tetriminoPos = rollBackFn(tetriminoPos)
//   }
// }

/**
 * initializes a grid and set the game state to running
 */
export const newGame = () => {
  grid = initGrid()
  tetrimino = getRandomTetrimino()
  tetriminoPos = TETRIMINO_START_POS
  running = true

  return {
    grid,
    paused,
    running,
  }
}

/**
 * moves a tetrimino to the left (-1) or to the right (1)
 * returns true if action succeeded
 * @param {Number} direction
 * @returns {Boolean}
 */
export const move = direction => {
  console.log('move', direction)
  if (blockAction()) {
    return false
  }
  console.log('move validated')
  const moveFn = direction < 0 ? moveLeft : moveRight
  const rollBackFn = direction < 0 ? moveRight : moveLeft

  tetriminoPos = moveFn(tetriminoPos)
  return rollBack(rollBackFn) === false
}

/**
 * rotates a tetrimino clockwise (1) or counter clockwise (-1)
 * returns true if action succeeded
 * @param {Number} clockwise
 * @returns {Boolean}
 */
export const rotate = clockwise => {
  if (blockAction()) {
    return false
  }
  const rotationFn = clockwise > 0 ? rotateClockwise : rotateCounterClockwise
  const rollBackFn = clockwise > 0 ? rotateCounterClockwise : rotateClockwise

  tetrimino = rotationFn(tetrimino)
  return moveToFit(rollBackFn)
}

// export const start = () => { running = true }
export const pause = () => { paused = true }
export const resume = () => { paused = false }

/**
 * return a promise with updated information
 * * grid - the game grid
 * * paused - the game playing state
 * * running - the game running state
 * @returns {Promise<Object>}
 */
export const update = () => ({
  grid: updateGrid(),
  paused,
  running,
})
