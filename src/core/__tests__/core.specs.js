import {
  initGrid,
  getTetrimino,
  rotateClockwise,
  rotateCounterClockwise,
  moveLeft,
  moveRight,
  moveDownward,
} from '../index'
import { Vector2d } from '../../lib/math'

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

  test('moveLeft should move a block to the left', () => {
    const tetriminoPos = Vector2d.create(5, 7)
    const expected = Vector2d.create(4, 7)

    expect(moveLeft(tetriminoPos)).toMatchObject(expected)
  })

  test('moveRight should move a block to the right', () => {
    const tetriminoPos = Vector2d.create(5, 7)
    const expected = Vector2d.create(6, 7)

    expect(moveRight(tetriminoPos)).toMatchObject(expected)
  })

  test('moveDownward should move a block downward', () => {
    const tetriminoPos = Vector2d.create(5, 7)
    const expected = Vector2d.create(5, 8)

    expect(moveDownward(tetriminoPos)).toMatchObject(expected)
  })
})
