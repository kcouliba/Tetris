/**
 *
 * ██████╗ ███████╗██╗    ██╗██████╗ ██╗████████╗███████╗    ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███╗   ██╗ █████╗ ██╗         ███████╗████████╗██╗   ██╗██╗     ███████╗
 * ██╔══██╗██╔════╝██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝    ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║████╗  ██║██╔══██╗██║         ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝
 * ██████╔╝█████╗  ██║ █╗ ██║██████╔╝██║   ██║   █████╗      █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║██╔██╗ ██║███████║██║         ███████╗   ██║    ╚████╔╝ ██║     █████╗
 * ██╔══██╗██╔══╝  ██║███╗██║██╔══██╗██║   ██║   ██╔══╝      ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║██║╚██╗██║██╔══██║██║         ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝
 * ██║  ██║███████╗╚███╔███╔╝██║  ██║██║   ██║   ███████╗    ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║██║ ╚████║██║  ██║███████╗    ███████║   ██║      ██║   ███████╗███████╗
 * ╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝    ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝
 *
 */

// // import { } from 'module'

// // Object to handle the graphics
// function Graphics(context) {
//   "use strict";
//   const _ctx = context;

//   // Draws one block at posX, posY coordinates
//   const drawBlock = (posX, posY, color) => {
//     _ctx.fillStyle = color;
//     _ctx.fillRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
//     _ctx.strokeStyle = BLOCK_COLOR.BORDER;
//     _ctx.strokeRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
//   };

//   // Draws to the display
//   this.render = (grid) => {
//     let color;

//     for(var yIndex = 19; yIndex >= 0; yIndex--) {
//       for(var xIndex = 9; xIndex >= 0; xIndex--) {
//         color = grid[xIndex + COLUMN_COUNT * yIndex];
//         drawBlock(xIndex * BLOCK_WIDTH, yIndex * BLOCK_HEIGHT, color);
//       }
//     }
//   };

//   // parseInt(Math.cos(deg2rad(orientation)), 10);
//   const drawBar = (posX, posY, orientation) => {
//     if (orientation === ORIENTATION.UP || orientation === ORIENTATION.DOWN) {
//       for (var index = 0; index < 4; index++) {
//         drawBlock(posX, posY + BLOCK_HEIGHT * index, BLOCK_COLOR.BAR);
//       }
//     } else {
//       for (var index = 0; index < 4; index++) {
//         drawBlock(posX + BLOCK_WIDTH * index, posY, BLOCK_COLOR.BAR);
//       }
//     }
//   };

//   const drawSquare = (posX, posY) => {
//     for (var width = 0; width < 2; width++) {
//       for (var height = 0; height < 2; height++) {
//         drawBlock(posX + BLOCK_WIDTH * width, posY + BLOCK_HEIGHT * height, BLOCK_COLOR.SQUARE);
//       }
//     }
//   };

//   // To draw thre hook we imagine a wide 9 x 9 block
//   const drawHook = (posX, posY, orientation, reverse) => {
//     const color = (reverse === FACING.STRAIGHT) ? BLOCK_COLOR.L : BLOCK_COLOR.RL;
//     switch (orientation) {
//       case ORIENTATION.UP:
//         drawBlock(posX, posY - BLOCK_HEIGHT, color);
//         posX += BLOCK_WIDTH * reverse;
//         break;
//       case ORIENTATION.DOWN:
//         drawBlock(posX, posY + BLOCK_HEIGHT, color);
//         posX -= BLOCK_WIDTH * reverse;
//         break;
//       case ORIENTATION.LEFT:
//         drawBlock(posX - BLOCK_WIDTH, posY, color);
//         posY -= BLOCK_HEIGHT * reverse;
//         break;
//       case ORIENTATION.RIGHT:
//         drawBlock(posX + BLOCK_WIDTH, posY, color);
//         posY += BLOCK_HEIGHT * reverse;
//         break;
//       default:
//         // stop the program if we end up there
//     }
//     if (orientation === ORIENTATION.UP || orientation === ORIENTATION.DOWN) {
//       for (var index = 0; index < 3; index++) {
//         drawBlock(posX, posY + BLOCK_HEIGHT * (index - 1), color);
//       }
//     } else {
//       for (var index = 0; index < 3; index++) {
//         drawBlock(posX + BLOCK_WIDTH * (index - 1), posY, color);
//       }
//     }
//   };

//   const drawSZ = (posX, posY, orientation, reverse) => {
//     const color = (reverse === FACING.STRAIGHT) ? BLOCK_COLOR.S : BLOCK_COLOR.RS;
//     switch (orientation) {
//       case ORIENTATION.UP:
//         drawBlock(posX, posY - BLOCK_HEIGHT, color);
//         posX += BLOCK_WIDTH * reverse;
//         break;
//       case ORIENTATION.DOWN:
//         drawBlock(posX, posY + BLOCK_HEIGHT, color);
//         posX -= BLOCK_WIDTH * reverse;
//         break;
//       case ORIENTATION.LEFT:
//         for (var index = posX - BLOCK_WIDTH; index < posX + 1; index += BLOCK_WIDTH) {
//           drawBlock(index, posY, color);
//         }
//         posY += BLOCK_HEIGHT;
//         for (var index = posX; index < posX + BLOCK_WIDTH + 1; index += BLOCK_WIDTH) {
//           drawBlock(index, posY, color);
//         }
//         drawBlock(posX - BLOCK_WIDTH, posY, color);
//         drawBlock(posX - BLOCK_WIDTH, posY, color);
//         posY -= BLOCK_HEIGHT * reverse;
//         break;
//       case ORIENTATION.RIGHT:
//         drawBlock(posX + BLOCK_WIDTH, posY, color);
//         posY += BLOCK_HEIGHT * reverse;
//         break;
//       default:
//         // stop the program if we end up there
//     }
//   };

// //  drawBar(BLOCK_WIDTH * 0, BLOCK_HEIGHT * 5, ORIENTATION.RIGHT);
// //  drawBar(BLOCK_WIDTH * 0, BLOCK_HEIGHT * 0, ORIENTATION.UP);
// //  drawSquare(BLOCK_WIDTH * 0, BLOCK_HEIGHT * 7);
// //  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 0, ORIENTATION.RIGHT, FACING.STRAIGHT);
// //  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 4, ORIENTATION.UP, FACING.STRAIGHT);
// //  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 8, ORIENTATION.LEFT, FACING.STRAIGHT);
// //  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 11, ORIENTATION.DOWN,FACING.STRAIGHT);
// //
// //  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 8, ORIENTATION.RIGHT, FACING.REVERSE);
// //  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 4, ORIENTATION.UP, FACING.REVERSE);
// //  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 0, ORIENTATION.LEFT, FACING.REVERSE);
// //  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 11, ORIENTATION.DOWN, FACING.REVERSE);

// //  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 17, ORIENTATION.RIGHT, FACING.STRAIGHT);
// //  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 17, ORIENTATION.UP, FACING.STRAIGHT);
// //  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 14, ORIENTATION.LEFT, FACING.STRAIGHT);
// //  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 17, ORIENTATION.DOWN, FACING.STRAIGHT);
// //  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 14, ORIENTATION.RIGHT, FACING.REVERSE);
// //  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 17, ORIENTATION.UP, FACING.REVERSE);
// //  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 17, ORIENTATION.LEFT, FACING.REVERSE);
// //  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 17, ORIENTATION.DOWN, FACING.REVERSE);
//   // this.drawBlock = (posX, posY) => {
//   //
//   // };
// }

// // function Timer() {
// //   const tick = 0;
// //   const that = this;
// //   let elapsedTime = 0;
// //
// //   this.setTick = (tick) => {
// //     that._tick = tick;
// //   };
// //
// //   this.tickEvent = () => {
// //     // console.log(that._tick);
// //   };
// //
// //   this.start = () => {
// //     elapsedTime = setTimeout(() => {
// //       that.tickEvent();
// //       that.start();
// //       // console.log(elapsedTime);
// //     }, this._tick);
// //   };
// //   return this;
// // }
