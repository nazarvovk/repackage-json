/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    'prettier',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        printWidth: 100,
        semi: false,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'all',
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off',
    'no-debugger': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'jest/valid-title': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-unreachable': 'error',
  },
  settings: {
    tailwindcss: {
      callees: ['cn'],
    },
  },
}
