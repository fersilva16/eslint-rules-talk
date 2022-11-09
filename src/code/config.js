const { forbidElements } = require('./forbidElements');
const { noRestrictedSyntax } = require('./noRestrictedSyntax');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
    'cypress/globals': true,
    serviceworker: true,
  },
  plugins: [
    'react',
    'import',
    'cypress',
    'relay',
    '@typescript-eslint',
    'react-hooks',
    'no-only-tests',
    'testing-library',
    '@woovi',
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:relay/ts-strict',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:testing-library/react',
  ],
  rules: {
    // ...

    '@woovi/box-flex': 'error',
    '@woovi/fetch-key': 'error',
    '@woovi/with-relay-boundary': 'error',
  },
};
