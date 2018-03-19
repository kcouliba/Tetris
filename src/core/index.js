import {
  WIDTH,
  HEIGHT,
  EMPTY_CELL,
  ACTIVE_CELL,
  LOCKED_CELL,
} from './constants'
import { TETRIMINO } from './tetriminos'
import { Vector2d } from '../lib/math'

// const isCellEmpty = cell => cell === EMPTY_CELL
const isCellActive = cell => cell === ACTIVE_CELL
const isCellLocked = cell => cell === LOCKED_CELL

/**
 * initializes a grid
 * @param {Object}
 *  @param {Number} width grid width
 *  @param {Number} height grid height
 * @returns {Array}
 */
export const initGrid = ({ width = WIDTH, height = HEIGHT }) => {
  const grid = Array(height).fill(null)

  for (let idx = 0; idx < height; idx++) {
    grid[idx] = Array(width).fill(EMPTY_CELL)
  }
  return grid
}

/**
 * a 4x4 grid where active cells represents a form
 * @param {Enum<String>} form the tetrimino form
 * one of [L, R_L, S, R_S, T, O, I]
 * @returns {Array}
 */
export const getTetrimino = form => TETRIMINO[form]

/**
 * locks a tetrimino block
 * @param {Array} tetrimino
 */
export const lockTetrimino = tetrimino => tetrimino.map(
  line => line.map(cell => isCellActive(cell) ? LOCKED_CELL : cell)
)

/**
 * provides a rotation matrix according to the passed angle (radians)
 * @param {Number} angle
 * @returns {Array}
 */
const getRotationMatrix = angle => [
  Math.round(Math.cos(angle)),
  Math.round(Math.sin(angle)),
  Math.round(-Math.sin(angle)),
  Math.round(Math.cos(angle)),
]

/**
 * rotates a tetrimino block
 * @param {Array} tetrimino the block we want to rotate
 * @param {Number} angle rotation angle (radians)
 * @param {Object} offset offset to replace block into the right quadrant
 *  @param {Number} xOffset
 *  @param {Number} yOffset
 * @returns {Array}
 */
const rotateTetrimino = (tetrimino, angle, { xOffset = 0, yOffset = 0 }) => {
  const newTetrimino = initGrid({
    height: tetrimino.length,
    width: tetrimino[0].length,
  })
  const rotationMatrix = getRotationMatrix(angle)

  for (let y = 0; y < tetrimino.length; y++) {
    for (let x = 0; x < tetrimino[y].length; x++) {
      if (isCellActive(tetrimino[y][x])) {
        const rX = x * rotationMatrix[0] + y * rotationMatrix[1] + xOffset
        const rY = x * rotationMatrix[2] + y * rotationMatrix[3] + yOffset

        newTetrimino[rY][rX] = ACTIVE_CELL
      }
    }
  }
  return newTetrimino
}

/**
 * rotate a tetrimino clockwise
 * @param {Array} tetrimino
 * @returns {Array}
 */
export const rotateClockwise = tetrimino => rotateTetrimino(
  tetrimino, 3 * Math.PI / 2, { xOffset: tetrimino[0].length }
)

/**
 * rotate a tetrimino counter clockwise
 * @param {Array} tetrimino
 * @returns {Array}
 */
export const rotateCounterClockwise = tetrimino => rotateTetrimino(
  tetrimino, Math.PI / 2, { yOffset: tetrimino.length }
)

/**
 * translate a tetrimino position
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Vector2d} direction tetrimino moving vector
 * @returns {Vector2d}
 */
const moveTetrimino = (tetriminoPos, direction) => {
  return Vector2d.add(tetriminoPos, direction)
}

/**
 * translate a tetrimino position to the left
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Number} speed translation speed
 * @returns {Vector2d}
 */
export const moveLeft = (tetriminoPos, speed = 1) => moveTetrimino(
  tetriminoPos, Vector2d.create(-1 * speed, 0)
)

/**
 * translate a tetrimino position to the right
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Number} speed translation speed
 * @returns {Vector2d}
 */
export const moveRight = (tetriminoPos, speed = 1) => moveTetrimino(
  tetriminoPos, Vector2d.create(1 * speed, 0)
)

/**
 * translate a tetrimino position downward
 * @param {Vector2d} tetriminoPos current tetrimino coordinates
 * @param {Number} speed translation speed
 * @returns {Vector2d}
 */
export const moveDownward = (tetriminoPos, speed = 1) => moveTetrimino(
  tetriminoPos, Vector2d.create(0, 1 * speed)
)

const isLineComplete = line => line.every(isCellLocked)

export const scanLines = grid => grid.reduce((acc, line) => {
  if (isLineComplete(line)) {
    acc.unshift(Array(line.length).fill(EMPTY_CELL))
  } else {
    acc.push(line)
  }
  return acc
}, [])

// // The game logic
// function App() {
//   "use strict";

//   // The grid that stores game element
//   const grid = [];
//   // The current piece coordinates
//   let block = [];
//   // Stores lines to be cleared
//   let clear = [];

//   // Places a piece at the top of the grid
//   function placePiece() {
//     block = [];

//     for (var i = 3; i < 7; i++) {
//       // we store the piece
//       block.push({
//         x: i,
//         y: 0,
//         center: (i === 5) ? true : false
//       });
//       grid[i + COLUMN_COUNT * 0] = {
//         state: ACTIVE_CELL,
//         color: "#aabbcc"
//       };
//     }
//   }

//   // Cleans the block position on game grid
//   function clean() {
//     for (let index = block.length - 1; index >= 0; index--) {
//       grid[block[index].x + COLUMN_COUNT * block[index].y] = {
//         state: CELL_STATE.INACTIVE,
//         color: BLOCK_COLOR.NONE
//       };
//     }
//   }

//   // Update the current block position in the game grid
//   function updateBlockPosition() {
//     if (block.length === 0) {
//       placePiece();
//     }
//     for (let index = block.length - 1; index >= 0; index--) {
//       grid[block[index].x + COLUMN_COUNT * block[index].y] = {
//         state: ACTIVE_CELL,
//         color: "#aabbcc"
//       };
//     }
//   }

//   // Locks a dropped block
//   function lockBlocks(x, y) {
//     if ((y >= ROW_COUNT) || grid[x + COLUMN_COUNT * y].state !== ACTIVE_CELL) {
//       return;
//     }
//     grid[x + COLUMN_COUNT * y] = {
//       state: LOCKED_CELL,
//       color: "#0000ff"
//     };
//     lockBlocks(x + 1, y);
//     lockBlocks(x - 1, y);
//     lockBlocks(x, y + 1);
//     lockBlocks(x, y - 1);
//   }

//   function moveBlock(moveX, moveY) {
//     let cell = null;
//     let newPosition = [];

//     for (let index = block.length - 1; index >= 0; index--) {
//       cell = grid[(block[index].x + moveX) + COLUMN_COUNT * (block[index].y + moveY)];
//       // out of bounds test
//       if ((block[index].x + moveX < 0) || (block[index].x + moveX >= COLUMN_COUNT)) {
//         return false;
//       }
//       // test if it is a cell
//       if (!cell) {
//         return false;
//       }
//       // test if that cell isn't locked
//       if (cell.state === LOCKED_CELL) {
//         return false;
//       }
//       newPosition.push({
//         x: block[index].x + moveX,
//         y: block[index].y + moveY,
//         center: block[index].center
//       });
//     }
//     clean();
//     block = newPosition;
//     return true;
//   }

//   // scans the grid for complete line checking
//   function scan() {
//     let complete = true;

//     clear = [];
//     for (var yIndex = ROW_COUNT - 1; yIndex >= 0; yIndex--) {
//       complete = true;
//       for (var xIndex = COLUMN_COUNT - 1; xIndex >= 0; xIndex--) {
//         if (grid[xIndex + COLUMN_COUNT * yIndex].state !== LOCKED_CELL) {
//           complete = false;
//           break;
//         }
//       }
//       if (complete) {
//         clear.push(yIndex);
//       }
//     }
//     return clear;
//   }

//   // updates the grid cell statuses
//   function updateGrid() {
//     let empty = true;
//     let offset = 0;

//     for (var rowIndex = ROW_COUNT - 1; rowIndex >= 0 + offset; rowIndex--) {
//       offset += (clear.indexOf(rowIndex) !== -1) ? 1 : 0;
//       for (var colIndex = COLUMN_COUNT - 1; colIndex >= 0; colIndex--) {
//         grid[colIndex + rowIndex * COLUMN_COUNT] = grid[colIndex + (rowIndex - offset) * COLUMN_COUNT];
//       }
//     }
//     --offset;
//     for (let rowIndex = offset; rowIndex >= 0; rowIndex--) {
//       for (var colIndex = COLUMN_COUNT - 1; colIndex >= 0; colIndex--) {
//         grid[colIndex + rowIndex * COLUMN_COUNT] = {
//           state: CELL_STATE.INACTIVE,
//           color: BLOCK_COLOR.NONE
//         };
//       }
//     }
//   }

//   // initializes application environnement
//   this.init = () => {
//     initGrid();
//   };

//   // starts a game
//   this.gameStart = () => {
//     placePiece();
//   };

//   // updates application environnement
//   this.update = () => {
//     scan();
//     updateGrid();
//     updateBlockPosition();
//   };

//   // moves the piece one step toward the bottom of the grid
//   this.movePieceDown = () => {
//     if (moveBlock(0, 1) === false) {
//       lockBlocks(block[0].x, block[0].y);
//       block = [];
//     }
//   };

//   // moves the piece one step toward the left side of the grid
//   this.movePieceLeft = () => {
//     moveBlock(-1, 0);
//   };

//   // moves the piece one step toward the right side of the grid
//   this.movePieceRight = () => {
//     moveBlock(1, 0);
//   };

//   this.getGrid = () => {
//     const returnedGrid = [];

//     for (var yIndex = ROW_COUNT - 1; yIndex >= 0; yIndex--) {
//       for (var xIndex = COLUMN_COUNT - 1; xIndex >= 0; xIndex--) {
//         returnedGrid[xIndex + COLUMN_COUNT * yIndex] = grid[xIndex + COLUMN_COUNT * yIndex].color;
//         if (grid[xIndex + COLUMN_COUNT * yIndex].state === ACTIVE_CELL) {
//           returnedGrid[xIndex + COLUMN_COUNT * yIndex] = "#ff0000";
//         }
//       }
//     }
//     return returnedGrid;
//   };
// };

// // App entrance
// (() => {
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//   const app = new App();
//   const graphics = new Graphics(ctx);

//   canvas.style.witdh = WIDTH;
//   canvas.style.height = HEIGHT;
//   canvas.setAttribute("width", WIDTH + "px");
//   canvas.setAttribute("height", HEIGHT + "px");
//   app.init();
//   app.update();
//   graphics.render(app.getGrid());

//   // Debug
//   document.addEventListener("keypress", (evt) => {
//     if (evt.which === "n".charCodeAt(0)) {
//       app.gameStart();
//     } else if (evt.which === "l".charCodeAt(0)) {
//       app.movePieceLeft();
//     } else if (evt.which === "r".charCodeAt(0)) {
//       app.movePieceRight();
//     } else if (evt.which === "d".charCodeAt(0)) {
//       app.movePieceDown();
//     } else if (evt.which === "y".charCodeAt(0)) {
//       app.rotatePieceClockwise();
//     } else if (evt.which === "t".charCodeAt(0)) {
//       app.rotatePieceAntiClockwise();
//     } else if (evt.which === "s".charCodeAt(0)) {

//     }
//     app.update();
//     graphics.render(app.getGrid());
//   });
// })();
