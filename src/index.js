import '../assets/stylesheets/styles.scss'
import * as Game from './game'
import * as Graphics from './ui'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
let gameInstance = null

// initialization phase
Game.newGame()
Graphics.initCanvas(canvas)

// loop phase
gameInstance = Game.update()
Graphics.update(ctx, gameInstance)

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
