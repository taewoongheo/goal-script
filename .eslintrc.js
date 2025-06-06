module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.tsx']}],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'global-require': 'off',
    'react/style-prop-object': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-unused-prop-types': 'warn',
    'react/no-array-index-key': 'off',
    'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['draft'],
      },
    ],
    // [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
  },
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
    react: {
      version: 'detect',
    },
    'import/ignore': ['@gorhom/bottom-sheet'],
  },
};
