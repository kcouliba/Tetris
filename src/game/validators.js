import {
  WIDTH,
  HEIGHT,
  EMPTY_CELL,
} from './constants'
import { Vector2d } from '../lib/math'

/**
 * check if a tetrimino shape at given coordinates collides or is out of bounds
 * in a given a grid
 * @param {Array} grid game grid
 * @param {Array} tetrimino tetrimino shape
 * @param {Vector2d} tetriminoPos tetrimino position
 */
export const tetriminoNotFit = (grid, tetrimino, tetriminoPos) => {
  // if tetrimino active cell is out of bounds
  if (tetriminoPos.x < 0 || tetriminoPos.y < 0) {
    return true
  }
  if (tetriminoPos.x + tetrimino[0].length > WIDTH) {
    return true
  }
  if (tetriminoPos.y + tetrimino.length > HEIGHT) {
    return true
  }
  for (let y = 0; y < tetrimino.length; y++) {
    for (let x = 0; x < tetrimino[y].length; x++) {
      const cellPos = Vector2d.add(tetriminoPos, Vector2d.create(x, y))

      // if we are trying to overlap with a locked block
      if (grid[cellPos.y][cellPos.x] !== EMPTY_CELL) {
        return true
      }
    }
  }
  return false
}
