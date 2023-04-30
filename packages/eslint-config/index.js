/** @type {import('@types/eslint').Linter.Config} */

module.exports = {
  extends: ["next", "plugin:tailwindcss/recommended", "./base"],
  plugins: ["tailwindcss"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
