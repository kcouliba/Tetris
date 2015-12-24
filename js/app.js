// Constants

// Display
const WIDTH = 320;
const HEIGHT = 640;

// Display grid
const COLUMN_COUNT = 10;
const ROW_COUNT = 20;

// Block size
const BLOCK_WIDTH = WIDTH / COLUMN_COUNT;
const BLOCK_HEIGHT = HEIGHT / ROW_COUNT;

// Orientation
const ORIENTATION = {
  RIGHT: 0,
  UP: 90,
  LEFT: 180,
  DOWN: 270,
};

// Colors
const BLOCK_COLOR = {
  NONE: "#efefef",
  BORDER: "#090909",
  BAR: "#0ca2e2",
  SQUARE: "#d9ca0b",
  L: "#d90bd1",
  RL: "#ab1f01",
  S: "#da010e",
  RS: "#0fc316",
  T: "#d9ca0b"
};

// Siding
const SIDING = {
  STRAIGHT: 1,
  REVERSE: -1
};

// Cell state
const CELL_STATE = {
  INACTIVE: 0,
  ACTIVE: 1,
  LOCKED: 2
}

// Function to convert degrees to radians
const deg2rad = (deg) => {
  return (deg / 180) * Math.PI;
};

// Function that check if value is an array
const isArray = (obj) => {
  return (typeof(obj) === "object" && obj.length);
};

// Function that check all array values are equals
const isArrayEquals = (arr1, arr2) => {
  "use strict";

  let isArr = true;

  if (isArray(arr1) && isArray(arr2) && (arr1.length === arr2.length)) {
    for (let index = arr1.length - 1; index >= 0; index--) {
      if (!equals(arr1[index], arr2[index])) {
        return false;
      }
    }
  }
  return true;
};

// Function to check equality between two elements
const equals = (obj1, obj2) => {
  "use strict";

  let isEqual = true;
  let val1 = [];
  let val2 = [];

  if (typeof(obj1) !== typeof(obj2)) {
    return false;
  }
  if (isArray(obj1) && isArray(obj2)) {
    return isArrayEquals(obj1, obj2);
  }
  if (type === "object") {
    for (let val in obj1) {
      val1.push(val);
    }
    for (let val in obj2) {
      val2.push(val);
    }
    return (isArrayEquals(val1, val2));
  }
  return (obj1 === obj2);
};

const uniq = (arr1, arr2) => {
  "use strict";

  const uniqValues = [];
  let index = 0;
  let index2 = 0;

  if (isArray(arr1) && isArray(arr2)) {
    index = (arr1.length < arr2.length) ? arr1.length : arr2.length;
    index2 = (arr1.length > arr2.length) ? arr1.length : arr2.length;
    index2 -= index;
    for (index = index - 1; index >= 0; index--) {
      if (uniqValues.indexOf(arr1[index]) < 0) {
        uniqValues.push(arr1[index]);
      }
      if (uniqValues.indexOf(arr2[index]) < 0) {
        uniqValues.push(arr2[index]);
      }
    }
    for (index2 - 1; index2 >= 0; index2--) {
      if (uniqValues.indexOf(arr2[index2]) < 0) {
        uniqValues.push(arr2[index2]);
      }
    }
  }
  return uniqValues;
};

// Object to handle the graphics
function Graphics(context) {
  "use strict";
  const _ctx = context;

  // Draws one block at posX, posY coordinates
  const drawBlock = (posX, posY, color) => {
    _ctx.fillStyle = color;
    _ctx.fillRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
    _ctx.strokeStyle = BLOCK_COLOR.BORDER;
    _ctx.strokeRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
  };

  // Draws to the display
  this.render = (grid) => {
    let color;

    for(var yIndex = 19; yIndex >= 0; yIndex--) {
      for(var xIndex = 9; xIndex >= 0; xIndex--) {
        color = grid[xIndex + COLUMN_COUNT * yIndex];
        drawBlock(xIndex * BLOCK_WIDTH, yIndex * BLOCK_HEIGHT, color);
      }
    }
  };

  // parseInt(Math.cos(deg2rad(orientation)), 10);
  const drawBar = (posX, posY, orientation) => {
    if (orientation === ORIENTATION.UP || orientation === ORIENTATION.DOWN) {
      for (var index = 0; index < 4; index++) {
        drawBlock(posX, posY + BLOCK_HEIGHT * index, BLOCK_COLOR.BAR);
      }
    } else {
      for (var index = 0; index < 4; index++) {
        drawBlock(posX + BLOCK_WIDTH * index, posY, BLOCK_COLOR.BAR);
      }
    }
  };

  const drawSquare = (posX, posY) => {
    for (var width = 0; width < 2; width++) {
      for (var height = 0; height < 2; height++) {
        drawBlock(posX + BLOCK_WIDTH * width, posY + BLOCK_HEIGHT * height, BLOCK_COLOR.SQUARE);
      }
    }
  };

  // To draw thre hook we imagine a wide 9 x 9 block
  const drawHook = (posX, posY, orientation, reverse) => {
    const color = (reverse === SIDING.STRAIGHT) ? BLOCK_COLOR.L : BLOCK_COLOR.RL;
    switch (orientation) {
      case ORIENTATION.UP:
        drawBlock(posX, posY - BLOCK_HEIGHT, color);
        posX += BLOCK_WIDTH * reverse;
        break;
      case ORIENTATION.DOWN:
        drawBlock(posX, posY + BLOCK_HEIGHT, color);
        posX -= BLOCK_WIDTH * reverse;
        break;
      case ORIENTATION.LEFT:
        drawBlock(posX - BLOCK_WIDTH, posY, color);
        posY -= BLOCK_HEIGHT * reverse;
        break;
      case ORIENTATION.RIGHT:
        drawBlock(posX + BLOCK_WIDTH, posY, color);
        posY += BLOCK_HEIGHT * reverse;
        break;
      default:
        // stop the program if we end up there
    }
    if (orientation === ORIENTATION.UP || orientation === ORIENTATION.DOWN) {
      for (var index = 0; index < 3; index++) {
        drawBlock(posX, posY + BLOCK_HEIGHT * (index - 1), color);
      }
    } else {
      for (var index = 0; index < 3; index++) {
        drawBlock(posX + BLOCK_WIDTH * (index - 1), posY, color);
      }
    }
  };

  const drawSZ = (posX, posY, orientation, reverse) => {
    const color = (reverse === SIDING.STRAIGHT) ? BLOCK_COLOR.S : BLOCK_COLOR.RS;
    switch (orientation) {
      case ORIENTATION.UP:
        drawBlock(posX, posY - BLOCK_HEIGHT, color);
        posX += BLOCK_WIDTH * reverse;
        break;
      case ORIENTATION.DOWN:
        drawBlock(posX, posY + BLOCK_HEIGHT, color);
        posX -= BLOCK_WIDTH * reverse;
        break;
      case ORIENTATION.LEFT:
        for (var index = posX - BLOCK_WIDTH; index < posX + 1; index += BLOCK_WIDTH) {
          drawBlock(index, posY, color);
        }
        posY += BLOCK_HEIGHT;
        for (var index = posX; index < posX + BLOCK_WIDTH + 1; index += BLOCK_WIDTH) {
          drawBlock(index, posY, color);
        }
        drawBlock(posX - BLOCK_WIDTH, posY, color);
        drawBlock(posX - BLOCK_WIDTH, posY, color);
        posY -= BLOCK_HEIGHT * reverse;
        break;
      case ORIENTATION.RIGHT:
        drawBlock(posX + BLOCK_WIDTH, posY, color);
        posY += BLOCK_HEIGHT * reverse;
        break;
      default:
        // stop the program if we end up there
    }
  };

//  drawBar(BLOCK_WIDTH * 0, BLOCK_HEIGHT * 5, ORIENTATION.RIGHT);
//  drawBar(BLOCK_WIDTH * 0, BLOCK_HEIGHT * 0, ORIENTATION.UP);
//  drawSquare(BLOCK_WIDTH * 0, BLOCK_HEIGHT * 7);
//  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 0, ORIENTATION.RIGHT, SIDING.STRAIGHT);
//  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 4, ORIENTATION.UP, SIDING.STRAIGHT);
//  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 8, ORIENTATION.LEFT, SIDING.STRAIGHT);
//  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 11, ORIENTATION.DOWN,SIDING.STRAIGHT);
//
//  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 8, ORIENTATION.RIGHT, SIDING.REVERSE);
//  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 4, ORIENTATION.UP, SIDING.REVERSE);
//  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 0, ORIENTATION.LEFT, SIDING.REVERSE);
//  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 11, ORIENTATION.DOWN, SIDING.REVERSE);

//  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 17, ORIENTATION.RIGHT, SIDING.STRAIGHT);
//  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 17, ORIENTATION.UP, SIDING.STRAIGHT);
//  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 14, ORIENTATION.LEFT, SIDING.STRAIGHT);
//  drawSZ(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 17, ORIENTATION.DOWN, SIDING.STRAIGHT);
//  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 14, ORIENTATION.RIGHT, SIDING.REVERSE);
//  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 17, ORIENTATION.UP, SIDING.REVERSE);
//  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 17, ORIENTATION.LEFT, SIDING.REVERSE);
//  drawSZ(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 17, ORIENTATION.DOWN, SIDING.REVERSE);
  // this.drawBlock = (posX, posY) => {
  //
  // };
}

// function Timer() {
//   const tick = 0;
//   const that = this;
//   let elapsedTime = 0;
//
//   this.setTick = (tick) => {
//     that._tick = tick;
//   };
//
//   this.tickEvent = () => {
//     // console.log(that._tick);
//   };
//
//   this.start = () => {
//     elapsedTime = setTimeout(() => {
//       that.tickEvent();
//       that.start();
//       // console.log(elapsedTime);
//     }, this._tick);
//   };
//   return this;
// }

// The game logic
function App() {
  "use strict";

  // The grid that stores game element
  const grid = [];
  // The current piece coordinates
  let block = [];
  const activePiece = {
    x: 0,
    y: 0
  };
  // Represents an empty cell
  const emptyCell = {
    state: CELL_STATE.INACTIVE,
    color: BLOCK_COLOR.NONE
  };

  let activeCell = {
    state: CELL_STATE.ACTIVE,
    color: "#aabbcc"
  };

  this.init = () => {
    initGrid();
  };

  this.invokePiece = () => {
    placePiece();
  };

  this.update = () => {

  };

  // Initializes the grid
  function initGrid() {
    for(var yIndex = 19; yIndex >= 0; yIndex--) {
      for(var xIndex = 9; xIndex >= 0; xIndex--) {
        grid[xIndex + COLUMN_COUNT * yIndex] = emptyCell;
      }
    }
  }

  // Places a piece at the top of the grid
  function placePiece() {
    block = [];
    activePiece.x = 4;
    activePiece.y = 0;
    console.log(activeCell);
    for (var i = 4; i < 7; i++) {
      // we store the piece
      block.push({ x: i, y: 0 });
      grid[i + COLUMN_COUNT * 0] = {
        state: CELL_STATE.ACTIVE,
        color: "#aabbcc"
      };
    }
  }

  function lockBlocks(x, y) {
    if ((x < 0) || (x > 9) || (y < 0) || (y > 19)
        || (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE)) {
      return;
    }
    grid[x + COLUMN_COUNT * y].state = CELL_STATE.LOCKED;
    grid[x + COLUMN_COUNT * y].color = "#0000ff";
    lockBlocks(x + 1, y);
    lockBlocks(x - 1, y);
    lockBlocks(x, y + 1);
    lockBlocks(x, y - 1);
  }

  function checkRightContact(coordX, coordY) {
    const x = coordX + 1;
    const y = coordY;

    console.log(`checking right at coord : (${x}, ${y})`);
    if ((x > 9) || (grid[x + COLUMN_COUNT * y].state === CELL_STATE.LOCKED)) {
      return true;
    }
    if (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE) {
      return false;
    }
    return (checkRightContact(x, y));
  }

  function checkLeftContact(coordX, coordY) {
    const x = coordX - 1;
    const y = coordY;

    console.log(`checking left at coord : (${x}, ${y})`);
    if ((x < 0) || (grid[x + COLUMN_COUNT * y].state === CELL_STATE.LOCKED)) {
      return true;
    }
    if (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE) {
      return false;
    }
    return (checkLeftContact(x, y));
  }

  function checkDownRightContact(coordX, coordY) {
    const x = coordX + 1;
    const y = coordY + 1;

    console.log(`checking right at coord : (${x}, ${y})`);
    if ((x > 9) || (grid[x + COLUMN_COUNT * y].state === CELL_STATE.LOCKED)) {
      return true;
    }
    if (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE) {
      return false;
    }
    return (checkRightContact(x, y));
  }

  function checkDownLeftContact(coordX, coordY) {
    const x = coordX - 1;
    const y = coordY + 1;

    console.log(`checking left at coord : (${x}, ${y})`);
    if ((x < 0) || (grid[x + COLUMN_COUNT * y].state === CELL_STATE.LOCKED)) {
      return true;
    }
    if (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE) {
      return false;
    }
    return (checkLeftContact(x, y));
  }

  function checkDownContact(coordX, coordY) {
    const x = coordX;
    const y = coordY + 1;
    const contact = false;

    console.log(`checking down at coord : (${x}, ${y})`);
    if ((y > 19) || (grid[x + COLUMN_COUNT * y].state === CELL_STATE.LOCKED)) {
      return true;
    }
    if (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE) {
      return false;
    }
    return (checkDownContact(coordX, coordY) || checkLeftDownContact(coordX, coordY) || checkRightDownContact(coordX, coordY));
  }

  function checkContact(x, y) {
    console.log(`checking coord : (${x}, ${y})`);
    if ((x < 0 || x > 9) || (y < 0 || y > 19)
        || (grid[x + COLUMN_COUNT * y].state === CELL_STATE.LOCKED)) {
      return true;
    }
    if (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE) {
      return false;
    }
    return (checkLeftContact(x, y) || checkRightContact(x, y) || checkDownContact(x, y));
  }

  // Moves the piece one step toward the bottom of the grid
  this.movePieceDown = () => {
    let cell = null;
    let newPosition = [];

    for (let index = block.length - 1; index >= 0; index--) {
      cell = grid[block[index].x + COLUMN_COUNT * (block[index].y + 1)];
      if (cell && (cell.state !== CELL_STATE.LOCKED)) {
        newPosition.push({
          x: block[index].x,
          y: block[index].y + 1
        });
      } else {
        lockBlocks(block[index].x, block[index].y);
        placePiece();
        return ;
      }
    }
    // we clean previous block position
    for (let index = block.length - 1; index >= 0; index--) {
      grid[block[index].x + COLUMN_COUNT * block[index].y] = {
        state: CELL_STATE.INACTIVE,
        color: BLOCK_COLOR.NONE
      };
    }
    // we draw the block to its new position
    block = newPosition;
    for (let index = block.length - 1; index >= 0; index--) {
      grid[block[index].x + COLUMN_COUNT * block[index].y] = {
        state: CELL_STATE.ACTIVE,
        color: "#aabbcc"
      };
    }
  }

  // Moves the piece one step toward the left side of the grid
  this.movePieceLeft = () => {
    let cell = null;
    let newPosition = [];

    for (let index = block.length - 1; index >= 0; index--) {
      cell = grid[(block[index].x - 1) + COLUMN_COUNT * block[index].y];
      if ((block[index].x - 1 < 0) || (cell.state === CELL_STATE.LOCKED)) {
        return;
      }
      newPosition.push({
        x: block[index].x - 1,
        y: block[index].y
      });
    }
    // we clean previous block position
    for (let index = block.length - 1; index >= 0; index--) {
      grid[block[index].x + COLUMN_COUNT * block[index].y] = {
        state: CELL_STATE.INACTIVE,
        color: BLOCK_COLOR.NONE
      };
    }
    // we draw the block to its new position
    block = newPosition;
    for (let index = block.length - 1; index >= 0; index--) {
      grid[block[index].x + COLUMN_COUNT * block[index].y] = {
        state: CELL_STATE.ACTIVE,
        color: "#aabbcc"
      };
    }
  };

  // Moves the piece one step toward the right side of the grid
  this.movePieceRight = () => {
    let cell = null;
    let newPosition = [];

    for (let index = block.length - 1; index >= 0; index--) {
      cell = grid[(block[index].x + 1) + COLUMN_COUNT * block[index].y];
      if ((block[index].x + 1 > 9) || (cell.state === CELL_STATE.LOCKED)) {
        return;
      }
      newPosition.push({
        x: block[index].x + 1,
        y: block[index].y
      });
    }
    // we clean previous block position
    for (let index = block.length - 1; index >= 0; index--) {
      grid[block[index].x + COLUMN_COUNT * block[index].y] = {
        state: CELL_STATE.INACTIVE,
        color: BLOCK_COLOR.NONE
      };
    }
    // we draw the block to its new position
    block = newPosition;
    for (let index = block.length - 1; index >= 0; index--) {
      grid[block[index].x + COLUMN_COUNT * block[index].y] = {
        state: CELL_STATE.ACTIVE,
        color: "#aabbcc"
      };
    }
  };

  this.getGrid = () => {
    const returnedGrid = [];

    for(var yIndex = 19; yIndex >= 0; yIndex--) {
      for(var xIndex = 9; xIndex >= 0; xIndex--) {
        returnedGrid[xIndex + COLUMN_COUNT * yIndex] = grid[xIndex + COLUMN_COUNT * yIndex].color;
        if (grid[xIndex + COLUMN_COUNT * yIndex].state === CELL_STATE.ACTIVE) {
          returnedGrid[xIndex + COLUMN_COUNT * yIndex] = "#ff0000";
        }
      }
    }
    return returnedGrid;
  };
  return this;
};

// App entrance
(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const app = new App();
  const graphics = new Graphics(ctx);

  app.init();
  app.invokePiece();
  graphics.render(app.getGrid());

  // Debug
  document.addEventListener("keypress", (evt) => {
    if (evt.which === "n".charCodeAt(0)) {
      app.invokePiece();
    } else if (evt.which === "l".charCodeAt(0)) {
      app.movePieceLeft();
    } else if (evt.which === "r".charCodeAt(0)) {
      app.movePieceRight();
    } else if (evt.which === "d".charCodeAt(0)) {
      app.movePieceDown();
    } else if (evt.which === "s".charCodeAt(0)) {
      app.lockPiece();
    }
    app.update();
    graphics.render(app.getGrid());
  });
})();


















// const repeatTime = 1000;

// const timer = () => {
//   const elapsedTime = setTimeout(() => {
//     console.log(`Hello at ${elapsedTime} s`);
//     if (elapsedTime >= 10) {
//       clearTimeout(elapsedTime);
//     } else {
//       timer();
//     }
//   }, repeatTime);
// };

// timer();
// const timer = new Timer();
//
// timer.setTick(60 / 1000);
// timer.tickEvent = () => {
//   // console.log(this);
// };
// timer.start();
// graphics.drawRect(0, 0, 25, 25);

// const clientData = {
//     id: 094545,
//     fullName: "Not Set",
//
//     setUserName: function (firstName, lastName)  {
//       this.fullName = firstName + " " + lastName;
//     }
// };
//
// function getUserInput(firstName, lastName, callback) {
//   callback.apply(clientData, [firstName, lastName]);
// }
//
// getUserInput ("Barack", "Obama", clientData.setUserName);
// console.log (clientData.fullName);// Not Set
// console.log (window.fullName); // Barack Obama
