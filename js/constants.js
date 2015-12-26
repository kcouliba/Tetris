// Constants

// Display
const WIDTH = 280;
const HEIGHT = WIDTH * 2;

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
};

// Rotation matrix
const ROT_MATRIX = [0, -1, 1, 0];

const matrixTest = [0, 0, 1, 0, 1, 1, 2, 1];
