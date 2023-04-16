module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["turbo", "prettier"],
  plugins: ["unused-imports", "simple-import-sort", "import"],
  rules: {
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports": "error",
  },
};
