// import {
//   newGame,
//   move,
//   rotate,
//   start,
//   pause,
//   resume,
//   update,
// } from '../game'

// const isGameStalled = ({paused, running}) => running ^ paused

// const handleGameState = ({paused, running}) => {
//   if (!running()) {
//     return newGame()
//   }
//   if (paused) {
//     return resume()
//   }
//   return pause()
// }

// const handleInput = evt => {
//   if (evt.which === 'n'.charCodeAt(0)) {
//     handleGameState(gameInstance)
//   }
//   if (isGameStalled(gameInstance)) {
//     return
//   }
//   if (evt.which === 'q'.charCodeAt(0)) {
//     moveLeft()
//   }
//   if (evt.which === 'd'.charCodeAt(0)) {
//     moveRight()
//   }
//   if (evt.which === 's'.charCodeAt(0)) {
//     moveDownward()
//   }
//   if (evt.which === 'y'.charCodeAt(0)) {
//     rotateClockwise()
//   }
//   if (evt.which === 'u'.charCodeAt(0)) {
//     rotateCounterClockwise()
//   }
// }

// export const initControls = (gameInstance) => {
//   document.addEventListener('keypress', evt => {
//     if (evt.which === 'n'.charCodeAt(0)) {
//       handleGameState(gameInstance)
//     }
//     if (isGameStalled(gameInstance)) {
//       return
//     }
//     if (evt.which === 'q'.charCodeAt(0)) {
//       moveLeft()
//     }
//     if (evt.which === 'd'.charCodeAt(0)) {
//       moveRight()
//     }
//     if (evt.which === 's'.charCodeAt(0)) {
//       moveDownward()
//     }
//     if (evt.which === 'y'.charCodeAt(0)) {
//       rotateClockwise()
//     }
//     if (evt.which === 'u'.charCodeAt(0)) {
//       rotateCounterClockwise()
//     }
//   })
// }
