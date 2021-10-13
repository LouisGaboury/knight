const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    color: {
      transparent: "transparent",
      blue: colors.sky,
      gray: colors.blueGray,
    },
    boxShadow: {
      noBottom: "5px -8px 15px -3px rgba(0, 0, 0, 0.1)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
