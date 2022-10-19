module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "all",
        "tabWidth": 2,
        "endOfLine": "auto",
        "comma-dangle": false
      }
    ],
    "no-var": [
      2
    ],
    "no-unneeded-ternary": [
      1
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "arrow-spacing": [
      1,
      {
        "before": true,
        "after": true
      }
    ],
    "prefer-const": [
      1
    ],
    "no-dupe-keys": [
      2
    ],
    "eqeqeq": [
      2,
      "always"
    ],
    "no-console": [
      1
    ],
    "block-spacing": [
      2
    ],
    "comma-spacing": [
      2,
      {
        "before": false,
        "after": true
      }
    ],
    "@typescript-eslint/no-inferrable-types": [
      0
    ],
    "@typescript-eslint/camelcase": [
      0,
      {
        "properties": "never"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      0
    ],
    "@typescript-eslint/member-delimiter-style": [
      0
    ],
    "@typescript-eslint/no-var-requires": [
      0
    ]
  },
};
