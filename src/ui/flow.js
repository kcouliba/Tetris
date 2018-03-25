let running = false
let paused = false

/**
 * returns true is the game is in paused state
 * @returns {Boolean}
 */
export const isPaused = () => paused

/**
 * returns true is the game is in running state
 * @returns {Boolean}
 */
export const isRunning = () => running

/**
 * put the game in a paused state
 * @returns {Boolean}
 */
export const pause = () => { paused = running ? true : paused }

/**
 * put the game in a not paused state
 * @returns {Boolean}
 */
export const resume = () => { paused = running ? false : paused }

/**
 * set the game state to running
 */
export const start = () => { running = true }
