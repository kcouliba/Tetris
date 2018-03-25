import {
  WIDTH,
  HEIGHT,
  EMPTY_CELL,
} from './constants'
import { Vector2d } from '../lib/math'

const isCellOOB = cellCoords => cellCoords.x < 0 || cellCoords.x >= WIDTH ||
  cellCoords.y < 0 || cellCoords.y >= HEIGHT

/**
 * check if a tetrimino shape at given coordinates collides or is out of bounds
 * in a given a grid
 * @param {Array} grid game grid
 * @param {Array} tetrimino tetrimino shape
 * @param {Vector2d} tetriminoPos tetrimino position
 */
export const tetriminoNotFit = (grid, tetrimino, tetriminoPos) => {
  for (let y = 0; y < tetrimino.length; y++) {
    for (let x = 0; x < tetrimino[y].length; x++) {
      // if tetrimino active cell is out of bounds
      // or if we are trying to overlap with a locked block
      if (tetrimino[y][x] !== EMPTY_CELL) {
        const cellPos = Vector2d.add(tetriminoPos, Vector2d.create(x, y))

        if (isCellOOB(cellPos)) {
          return true
        }
        if (grid[cellPos.y][cellPos.x] !== EMPTY_CELL) {
          return true
        }
      }
    }
  }
  return false
}
