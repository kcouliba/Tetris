// Constants

// Display
const WIDTH = 280
const HEIGHT = WIDTH * 2

// Display grid
const COLUMN_COUNT = 10
const ROW_COUNT = 20

// Block size
export const BLOCK_WIDTH = WIDTH / COLUMN_COUNT
export const BLOCK_HEIGHT = HEIGHT / ROW_COUNT

// Orientation
export const ORIENTATION = {
  RIGHT: 0,
  UP: 90,
  LEFT: 180,
  DOWN: 270,
}

// Colors
export const BLOCK_COLOR = {
  NONE: '#efefef',
  BORDER: '#090909',
  BAR: '#0ca2e2',
  SQUARE: '#d9ca0b',
  L: '#d90bd1',
  RL: '#ab1f01',
  S: '#da010e',
  RS: '#0fc316',
  T: '#d9ca0b'
}

// Facing
export const FACING = {
  STRAIGHT: 1,
  REVERSE: -1
}

// Rotation matrix
export const ROT_MATRIX = [0, -1, 1, 0]

export const matrixTest = [0, 0, 1, 0, 1, 1, 2, 1]
