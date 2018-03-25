import {
  moveTetrimino,
  rotateTetrimino,
} from '../core'
import {
  TETRIMINO_BLOCK_SIZE,
} from './constants'
import { Vector2d } from '../lib/math'

/**
 * translate a tetrimino position to the left
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Number} speed translation speed
 * @returns {Vector2d}
 */
export const moveLeft = (tetriminoPos, speed = 1) => moveTetrimino(
  tetriminoPos, Vector2d.create(-1 * speed, 0)
)

/**
 * translate a tetrimino position to the right
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Number} speed translation speed
 * @returns {Vector2d}
 */
export const moveRight = (tetriminoPos, speed = 1) => moveTetrimino(
  tetriminoPos, Vector2d.create(1 * speed, 0)
)
/**
 * translate a tetrimino position downward
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Number} speed translation speed
 * @returns {Vector2d}
 */
export const moveDownward = (tetriminoPos, speed = 1) => moveTetrimino(
  tetriminoPos, Vector2d.create(0, 1 * speed)
)

/**
 * rotate a tetrimino clockwise
 * @param {Array} tetrimino
 * @returns {Array}
 */
export const rotateClockwise = tetrimino => rotateTetrimino(
  tetrimino, 3 * Math.PI / 2, { xOffset: TETRIMINO_BLOCK_SIZE }
)

/**
 * rotate a tetrimino counter clockwise
 * @param {Array} tetrimino
 * @returns {Array}
 */
export const rotateCounterClockwise = tetrimino => rotateTetrimino(
  tetrimino, Math.PI / 2, { yOffset: TETRIMINO_BLOCK_SIZE }
)
