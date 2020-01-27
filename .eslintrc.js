module.exports = {
  extends: 'standard',
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': ['off'],
  },
  globals: {
    describe: true,
    test: true,
    expect: true,
  },
}
