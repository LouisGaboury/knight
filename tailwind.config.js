const colors = require("tailwindcss/colors")

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    color: {
      transparent: "transparent",
      blue: colors.sky,
      gray: colors.blueGray
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
