import '../assets/stylesheets/styles.scss'
import * as Game from './game'
import * as UI from './ui'
import { DOWNWARD } from './game/constants'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

window.requestAnimationFrame(run())

function run() {
  const MIN_TS = 50
  let prevTs
  let level = 25

  UI.initCanvas(canvas)
  UI.initInputs(({ actions, key }) => {
    const gInstance = Game.update()

    if (key === 'ARROWUP') {
      ++level
    }
    if (key === 'ARROWDOWN') {
      --level
    }
    level = level < 0 ? 0 : level > 25 ? 25 : level
    console.log(`actions ${actions} for key ${key}`)
    console.log(`level ${level}`)
    console.log(gInstance)
  })
  Game.newGame()

  function draw(ts) {
    if (!prevTs) prevTs = ts
    if (ts - prevTs >= MIN_TS * (1 + 25 - level)) {
      prevTs = ts
      Game.move(DOWNWARD)
      // const lineCount = Game.scan()

      // console.log(lineCount)
    }
    UI.update(ctx, Game.update())
    window.requestAnimationFrame(draw)
  }

  return draw
}
