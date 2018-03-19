import {
  initGrid,
  getTetrimino,
  rotateClockwise,
  rotateCounterClockwise,
} from '../index'

describe('core', () => {
  test('initGrid should return an initialzed grid', () => {
    expect(initGrid({ width: 2, height: 2 })).toEqual([[0, 0], [0, 0]])
  })

  test('getTetrimino should return a new tetrimino', () => {
    expect(getTetrimino('L')).toEqual([
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
    ])
  })

  test('rotateClockwise should rotate a block as expected', () => {
    const tetrimino = getTetrimino('L')
    let nextRotation

    expect(tetrimino).toEqual([
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
    ])
    nextRotation = rotateClockwise(tetrimino)
    expect(nextRotation).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ])
    nextRotation = rotateClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
    ])
    nextRotation = rotateClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 1, 1],
    ])
  })

  test('rotateCounterClockwise should rotate a block as expected', () => {
    const tetrimino = getTetrimino('L')
    let nextRotation

    expect(tetrimino).toEqual([
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
    ])
    nextRotation = rotateCounterClockwise(tetrimino)
    expect(nextRotation).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 1, 1],
    ])
    nextRotation = rotateCounterClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
    ])
    nextRotation = rotateCounterClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ])
  })
})
