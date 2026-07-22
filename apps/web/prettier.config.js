//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const combined = {
  ...config,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default combined
