/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "../../packages/ui/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("./tailwindcss-plugin"),
  ],
};
