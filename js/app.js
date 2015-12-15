"use strict";

// Constants
const WIDTH = 320;
const HEIGHT = 640;

function Graphics(context) {
  const _ctx = context;

  this.drawRect = (posX, posY, width, height) => {
    console.log(`Drawing at coords ({posX}, {posY})`);
  };
}

const app = () => {

};

// App entrance
(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const graphics = new Graphics(ctx);

  graphics.drawRect(0, 0, 25, 25);
})();
