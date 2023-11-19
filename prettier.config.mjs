/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  semi: true,
  singleQuote: true,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
