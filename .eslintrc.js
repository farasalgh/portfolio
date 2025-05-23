module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', {
      'varsIgnorePattern': '^_',
      'argsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }]
  }
}