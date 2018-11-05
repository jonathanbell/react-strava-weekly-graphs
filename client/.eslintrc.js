// Good ESLint defaults provided by Scott Tolinski:
// https://www.leveluptutorials.com/tutorials/react-16-for-everyone/eslinting-react-and-why-it-matters

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  settings: {
    ecmascript: 6,
    jsx: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-console': 'off' // only for development!
  }
};
