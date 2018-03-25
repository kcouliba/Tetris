import {
  WIDTH,
  HEIGHT,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  BACKGROUND_COLOR,
  BLOCK_COLOR,
} from './constants'

const clear = ctx => {
  ctx.fillStyle = BACKGROUND_COLOR
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

const drawAssets = ctx => {
  ctx.fillStyle = '#004'
  ctx.fillRect((WIDTH - BOARD_WIDTH) / 2, 0, BOARD_WIDTH, BOARD_HEIGHT)
  ctx.strokeStyle = '#FFF'
  ctx.strokeRect((WIDTH - BOARD_WIDTH) / 2, 0, BOARD_WIDTH, BOARD_HEIGHT)
}

const drawBoard = (ctx, {grid}) => {
  ctx.strokeStyle = '#FFF'
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== 0) {
        const xPos = x * BLOCK_WIDTH + (WIDTH - BOARD_WIDTH) / 2
        const yPos = y * BLOCK_HEIGHT

        ctx.fillStyle = BLOCK_COLOR[grid[y][x]]
        ctx.fillRect(xPos, yPos, BLOCK_WIDTH, BLOCK_HEIGHT)
        ctx.strokeRect(xPos, yPos, BLOCK_WIDTH, BLOCK_HEIGHT)
      }
    }
  }
}

export const initCanvas = canvas => {
  canvas.style.witdh = WIDTH
  canvas.style.height = HEIGHT
  canvas.setAttribute('width', WIDTH + 'px')
  canvas.setAttribute('height', HEIGHT + 'px')
}

export const update = (ctx, gameInstace) => {
  clear(ctx)
  drawAssets(ctx)
  drawBoard(ctx, gameInstace)
}
