import {
  moveDownward,
  moveLeft,
  moveRight,
  rotateClockwise,
  rotateCounterClockwise,
} from './controls'
import {
  DOWNWARD,
  LEFT,
  RIGHT,
  CLOCKWISE,
  COUNTER_CLOCKWISE,
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

let running = false
let paused = false

let grid = null
let tetrimino = null
let tetriminoPos = null

const moveFns = {
  [LEFT]: moveLeft,
  [RIGHT]: moveRight,
  [DOWNWARD]: moveDownward,
}

const rotationFns = {
  [CLOCKWISE]: rotateClockwise,
  [COUNTER_CLOCKWISE]: rotateCounterClockwise,
}

const blockAction = () => !running || paused

/**
 * @todo
 * try to move the piece until it fits
 * returns true if it succeeded placing the block
 * @param {Function} rollBackFn the function which applies the rollback action
 * @returns {Boolean}
 */
// const moveToFit = rollBackFn => {
//   return rollBack(rollBackFn) === false
// }

/**
 * places the current tetrimino onto the grid
 */
const updateGrid = () => {
  const newGrid = initGrid()

  for (let y = 0; y < tetrimino.length; y++) {
    for (let x = 0; x < tetrimino[0].length; x++) {
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
  tetriminoPos = Vector2d.create(
    Math.floor(WIDTH / 2 - tetrimino[0].length / 2),
    0
  )
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
 * @param {Enum<String>} direction one of [LEFT, RIGHT, DOWN]
 * @returns {Boolean}
 */
export const move = direction => {
  if (blockAction()) {
    return false
  }
  const moveFn = moveFns[direction]
  const nextPos = moveFn(tetriminoPos)

  if (tetriminoNotFit(grid, tetrimino, nextPos)) {
    return false
  }
  tetriminoPos = nextPos
  return true
}

/**
 * rotates a tetrimino clockwise or counter clockwise
 * returns true if action succeeded
 * @param {Enum<String>} senseOfRotation
 * @returns {Boolean}
 */
export const rotate = senseOfRotation => {
  if (blockAction()) {
    return false
  }
  const rotationFn = rotationFns[senseOfRotation]
  const nextTetrimino = rotationFn(tetrimino)

  if (tetriminoNotFit(grid, nextTetrimino, tetriminoPos)) {
    return false
  }

  tetrimino = nextTetrimino
  return true
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
