import * as Core from '../core/constants'

// display dimensions
export const WIDTH = 640
export const HEIGHT = WIDTH * 3 / 4

// board zone
export const BOARD_WIDTH = WIDTH / 2
export const BOARD_HEIGHT = HEIGHT

const COLUMN_COUNT = Core.WIDTH
const ROW_COUNT = Core.HEIGHT

// // Block size
export const BLOCK_WIDTH = BOARD_WIDTH / COLUMN_COUNT
export const BLOCK_HEIGHT = BOARD_HEIGHT / ROW_COUNT

export const COLOR = {
  BOARD: {
    BACKGROUND: '#AAA',
  },
  SCREEN: {
    BACKGROUND: '#004',
  },
}

// // Orientation
// export const ORIENTATION = {
//   RIGHT: 0,
//   UP: 90,
//   LEFT: 180,
//   DOWN: 270,
// }

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
