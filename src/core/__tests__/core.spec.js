import {
  initGrid,
  getTetrimino,
  scanLines,
} from '../index'
import {
  EMPTY_CELL,
  WIDTH,
  HEIGHT,
} from '../constants'

describe('core', () => {
  test('initGrid should return an initialzed grid with default params', () => {
    const grid = initGrid()

    expect(grid).toHaveLength(HEIGHT)
    expect(grid[0]).toHaveLength(WIDTH)
  })

  test('initGrid should return an initialzed grid', () => {
    expect(initGrid({ width: 2, height: 2 })).toEqual([
      [EMPTY_CELL, EMPTY_CELL], [EMPTY_CELL, EMPTY_CELL]
    ])
  })

  test('getTetrimino should return a new tetrimino', () => {
    expect(getTetrimino('L')).toEqual([
      [1, EMPTY_CELL],
      [1, EMPTY_CELL],
      [1, 1],
    ])
  })

  test('scanLines should clear a line when filled with locked cells', () => {
    const grid = initGrid({width: 3, height: 8})
    const expected = initGrid({width: 3, height: 8})

    grid[7].fill(EMPTY_CELL | 1)
    expect(scanLines(grid)).toEqual(expected)
  })
})
