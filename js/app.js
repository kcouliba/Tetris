"use strict";

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

// Siding
const SIDING = {
  STRAIGHT: 1,
  REVERSE: -1
};

const deg2rad = (deg) => {
  return (deg / 180) * Math.PI;
};

function Graphics(context) {
  const _ctx = context;

  const drawBlock = (posX, posY, color) => {
    console.log(`Drawing at coords (${posX}, ${posY})`);
    _ctx.fillStyle = color;
    _ctx.fillRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
    _ctx.strokeStyle = "#090909";
    _ctx.strokeRect(posX, posY, BLOCK_WIDTH, BLOCK_HEIGHT);
  };

  // parseInt(Math.cos(deg2rad(orientation)), 10);
  const drawBar = (posX, posY, orientation) => {
    if (orientation === ORIENTATION.UP || orientation === ORIENTATION.DOWN) {
      for (var index = 0; index < 4; index++) {
        drawBlock(posX, posY + BLOCK_HEIGHT * index, "#0ca2e2");
      }
    } else {
      for (var index = 0; index < 4; index++) {
        drawBlock(
          posX + BLOCK_WIDTH * index,
          posY
        );
      }
    }
  };

  const drawSquare = (posX, posY) => {
    for (var width = 0; width < 2; width++) {
      for (var height = 0; height < 2; height++) {
        drawBlock(posX + BLOCK_WIDTH * width, posY + BLOCK_HEIGHT * height, "#d9ca0b");
      }
    }
  };

  // To draw thre hook we imagine a wide 9 x 9 block
  const drawHook = (posX, posY, orientation, reverse) => {
    const color = (reverse === SIDING.STRAIGHT) ? "#d90bd1" : "#ab1f01";
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
    const color = (reverse === SIDING.STRAIGHT) ? "#da010e" : "#0fc316";
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

  drawBar(0, 0, ORIENTATION.UP);
  drawSquare(64, 0);
  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 1, ORIENTATION.RIGHT, SIDING.STRAIGHT);
  drawHook(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 5, ORIENTATION.UP, SIDING.STRAIGHT);
  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 9, ORIENTATION.LEFT, SIDING.STRAIGHT);
  drawHook(BLOCK_WIDTH * 1, BLOCK_HEIGHT * 11, ORIENTATION.DOWN,SIDING.STRAIGHT);

  drawHook(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 1, ORIENTATION.RIGHT, SIDING.REVERSE);
  drawHook(BLOCK_WIDTH * 7, BLOCK_HEIGHT * 5, ORIENTATION.UP, SIDING.REVERSE);
  drawHook(BLOCK_WIDTH * 4, BLOCK_HEIGHT * 9, ORIENTATION.LEFT, SIDING.REVERSE);
  drawHook(BLOCK_WIDTH * 1, BLOCK_HEIGHT * 11, ORIENTATION.DOWN, SIDING.REVERSE);

  drawSZ(BLOCK_WIDTH * 8, BLOCK_HEIGHT * 15, ORIENTATION.LEFT, SIDING.STRAIGHT);
  drawSZ(BLOCK_WIDTH * 1, BLOCK_HEIGHT * 15, ORIENTATION.LEFT, SIDING.REVERSE);
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

const app = () => {

};

// App entrance
(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const graphics = new Graphics(ctx);

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
})();

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
// console.log (clientData.fullName);// Not Set​
// console.log (window.fullName); // Barack Obama
