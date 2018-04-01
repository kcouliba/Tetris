import {
  move,
  rotate,
} from '../game'
import {
  DOWNWARD,
  LEFT,
  RIGHT,
  CLOCKWISE,
  COUNTER_CLOCKWISE,
  LEFT_INPUT,
  RIGHT_INPUT,
  DOWN_INPUT,
  ROT_CLOCKWISE_INPUT,
  ROT_COUNTER_CLOCKWISE_INPUT,
} from './constants'

const actions = {
  [LEFT_INPUT]: () => {
    move(LEFT)
    return `move(LEFT)`
  },
  [RIGHT_INPUT]: () => {
    move(RIGHT)
    return `move(RIGHT)`
  },
  [DOWN_INPUT]: () => {
    move(DOWNWARD)
    return `move(DOWNWARD)`
  },
  [ROT_CLOCKWISE_INPUT]: () => {
    rotate(CLOCKWISE)
    return `rotate(CLOCKWISE)`
  },
  [ROT_COUNTER_CLOCKWISE_INPUT]: () => {
    rotate(COUNTER_CLOCKWISE)
    return `rotate(COUNTER_CLOCKWISE)`
  },
}

const keyPressed = {}
const activateKey = key => {
  keyPressed[key] = true
}
const deactivateKey = key => {
  if (keyPressed[key]) {
    return delete keyPressed[key]
  }
}

const triggerAction = key => {
  if (actions[key]) {
    return actions[key]()
  }
  // return `no action for key ${key}`
}
const handleActions = () => {
  return Object.keys(keyPressed).map(triggerAction)
}

export const initControls = (onKeyboardEvent) => {
  let executedActions

  document.addEventListener('keydown', evt => {
    const key = evt.key.toUpperCase()

    activateKey(key)
    executedActions = handleActions().join(', ')

    onKeyboardEvent({actions: executedActions, key})
  })
  document.addEventListener('keyup', evt => {
    const key = evt.key.toUpperCase()

    deactivateKey(key)
    executedActions = handleActions().join(', ')

    onKeyboardEvent({actions: executedActions, key})
  })
}
