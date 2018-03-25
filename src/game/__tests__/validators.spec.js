import {
  tetriminoNotFit,
} from '../validators'
import {
  initGrid,
} from '../../core'
import {
  WIDTH,
  HEIGHT,
  EMPTY_CELL,
} from '../../core/constants'
import { TETRIMINO } from '../../core/tetriminos'
import { Vector2d } from '../../lib/math'

describe('validators', () => {
  describe('tetriminoNotFit', function () {
    test('should return true when tetrimino is out of bounds', () => {
      const grid = initGrid()
      const tetrimino = TETRIMINO.L

      expect(
        tetriminoNotFit(grid, tetrimino, Vector2d.create(-5, 0))
      ).toEqual(true)
      expect(
        tetriminoNotFit(grid, tetrimino, Vector2d.create(WIDTH, 0))
      ).toEqual(true)
      expect(
        tetriminoNotFit(grid, tetrimino, Vector2d.create(0, -2))
      ).toEqual(true)
      expect(
        tetriminoNotFit(grid, tetrimino, Vector2d.create(0, HEIGHT - 1))
      ).toEqual(true)
    })

    test('should return true when tetrimino collides a not empty cell', () => {
      const grid = initGrid()
        .map(
          line => line.map(() => EMPTY_CELL | 1)
        )
      const tetrimino = TETRIMINO.L

      expect(
        tetriminoNotFit(grid, tetrimino, Vector2d.create(0, 0))
      ).toEqual(true)
    })
  })
})
