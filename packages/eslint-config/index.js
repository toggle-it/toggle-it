module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
