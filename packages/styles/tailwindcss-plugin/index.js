const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  ({ addUtilities }) => {
    addUtilities({
      ...require("./height.util"),
      ...require("./gradient.util"),
    });
  },
  {
    theme: {
      extend: {
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  }
);
