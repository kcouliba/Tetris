import '../assets/stylesheets/styles.scss'
import * as Game from './game'
import * as UI from './ui'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
// let gameInstance = null

// initialization phase
// gameInstance = Game.newGame()
Game.newGame()
UI.initCanvas(canvas)
UI.initInputs(({ actions, key }) => {
  const gInstance = Game.update()
  console.log(`actions ${actions} for key ${key}`)
  console.log(gInstance)
  UI.update(ctx, Game.update())
})

// // loop phase
// setInterval(() => {
//   // console.log('refresh')
//   const gInstance = Game.update()

//   console.log(gInstance)
//   UI.update(ctx, gInstance)
// }, 100000)
// // loop phase
// gameInstance = Game.update()
// UI.update(ctx, gameInstance)

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
