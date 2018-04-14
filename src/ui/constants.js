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

export const BACKGROUND_COLOR = '#AAA'
// export const BACKGROUND_COLOR = '#AAA'

export const BLOCK_COLOR = [
  BACKGROUND_COLOR,
  '#696969',
  '#0ca2e2',
  '#d9ca0b',
  '#d90bd1',
  '#ab1f01',
  '#da010e',
  '#0fc316',
  '#d9ca0b',
]

export const LEFT_INPUT = 'Q'
export const RIGHT_INPUT = 'D'
export const DOWN_INPUT = 'S'
export const ROT_CLOCKWISE_INPUT = 'O'
export const ROT_COUNTER_CLOCKWISE_INPUT = 'P'
