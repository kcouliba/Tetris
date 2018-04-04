import {
  rotateClockwise,
  rotateCounterClockwise,
  moveLeft,
  moveRight,
  moveDownward,
} from '../controls'
import { Vector2d } from '../../lib/math'
import { TETRIMINO } from '../../core/tetriminos'

describe('controls', () => {
  test('rotateClockwise should rotate a block as expected', () => {
    const tetrimino = TETRIMINO.L
    let nextRotation

    expect(tetrimino).toEqual([
      [1, 0],
      [1, 0],
      [1, 1],
    ])
    nextRotation = rotateClockwise(tetrimino)
    expect(nextRotation).toEqual([
      [1, 1, 1],
      [1, 0, 0],
    ])
    nextRotation = rotateClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [1, 1],
      [0, 1],
      [0, 1],
    ])
    nextRotation = rotateClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [0, 0, 1],
      [1, 1, 1],
    ])
  })

  test('rotateCounterClockwise should rotate a block as expected', () => {
    const tetrimino = TETRIMINO.L
    let nextRotation

    expect(tetrimino).toEqual([
      [1, 0],
      [1, 0],
      [1, 1],
    ])
    nextRotation = rotateCounterClockwise(tetrimino)
    expect(nextRotation).toEqual([
      [0, 0, 1],
      [1, 1, 1],
    ])
    nextRotation = rotateCounterClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [1, 1],
      [0, 1],
      [0, 1],
    ])
    nextRotation = rotateCounterClockwise(nextRotation)
    expect(nextRotation).toEqual([
      [1, 1, 1],
      [1, 0, 0],
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
