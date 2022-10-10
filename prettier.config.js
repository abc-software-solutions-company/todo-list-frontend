module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  overrides: [
    {
      files: '*.yaml|*.yml',
      options: {
        singleQuote: false
      }
    },
    {
      files: '.editorconfig',
      options: {parser: 'yaml'}
    },
    {
      files: 'LICENSE',
      options: {parser: 'markdown'}
    }
  ],

  // tailwind
  tailwindConfig: './tailwind.config.js',
  plugins: [require('prettier-plugin-tailwindcss')]
};
