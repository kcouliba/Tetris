// Represents an empty cell
const emptyCell = {
  state: CELL_STATE.INACTIVE,
  color: BLOCK_COLOR.NONE
};

// Represents an active cell
const activeCell = {
  state: CELL_STATE.ACTIVE,
  color: "#aabbcc"
};

// The game logic
function App() {
  "use strict";

  // The grid that stores game element
  const grid = [];
  // The current piece coordinates
  let block = [];

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
    for(var yIndex = ROW_COUNT - 1; yIndex >= 0; yIndex--) {
      for(var xIndex = COLUMN_COUNT - 1; xIndex >= 0; xIndex--) {
        grid[xIndex + COLUMN_COUNT * yIndex] = emptyCell;
      }
    }
  }

  // Places a piece at the top of the grid
  function placePiece() {
    block = [];

    for (var i = 3; i < 7; i++) {
      // we store the piece
      block.push({ x: i, y: 0 });
      grid[i + COLUMN_COUNT * 0] = {
        state: CELL_STATE.ACTIVE,
        color: "#aabbcc"
      };
    }
  }

  function getPieceCenter() {
    const coord = {
      x: 0,
      y: 0
    };
    // to store the current x and y level
    const level = {
      x: block[block.length - 1].x,
      y: block[block.length - 1].y
    };
    for (var index = block.length - 1; index >= 0 ; index--) {
      if (block[index].x != level.x) {
        coord.y++;
      }
      if (block[index].y != level.y) {
        coord.x++;
      }
    }
    return { x: parseInt(coord.x / 2), y: parseInt(coord.y / 2) };
  }

  function lockBlocks(x, y) {
    if ((x < 0) || (x >= COLUMN_COUNT) || (y < 0) || (y >= ROW_COUNT)
        || (grid[x + COLUMN_COUNT * y].state !== CELL_STATE.ACTIVE)) {
      return;
    }
    grid[x + COLUMN_COUNT * y] = {
      state: CELL_STATE.LOCKED,
      color: "#0000ff"
    };
    lockBlocks(x + 1, y);
    lockBlocks(x - 1, y);
    lockBlocks(x, y + 1);
    lockBlocks(x, y - 1);
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
      if ((block[index].x + 1 > COLUMN_COUNT - 1) || (cell.state === CELL_STATE.LOCKED)) {
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

  this.rotatePieceClockwise = () => {
    console.log(getPieceCenter());
  };

  this.rotatePieceAntiClockwise = () => {
    console.log(getPieceCenter());
  };

  this.getGrid = () => {
    const returnedGrid = [];

    for(var yIndex = ROW_COUNT - 1; yIndex >= 0; yIndex--) {
      for(var xIndex = COLUMN_COUNT - 1; xIndex >= 0; xIndex--) {
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
    } else if (evt.which === "y".charCodeAt(0)) {
      app.rotatePieceClockwise();
    } else if (evt.which === "t".charCodeAt(0)) {
      app.rotatePieceAntiClockwise();
    } else if (evt.which === "s".charCodeAt(0)) {

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
