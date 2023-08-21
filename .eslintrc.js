module.exports = {
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript', 'prettier', 'plugin:storybook/recommended'],
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  overrides: [{
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      project: ['tsconfig.json']
    }
  }],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    'no-continue': 'off',
    'consistent-return': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/button-has-type': 0,
    'react/no-unstable-nested-components': [2, {
      allowAsProps: true
    }],
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    'import/order': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'simple-import-sort/exports': 1,
    'simple-import-sort/imports': [1, {
      groups: [
      // External packages.
      ['^'],
      // Internal packages.
      ['^@/'],
      // Side effect imports.
      ['^\\u0000'],
      // Parent imports.
      ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
      // Other relative imports.
      ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
      // Style imports.
      ['^.+\\.s?css$']]
    }]
  }
};