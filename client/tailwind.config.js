const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'burnt-sienna': '#66615B',
        'creme': '#F4F3EE',
      },
      fontFamily: {
        'capitals': ['Sen', ...defaultTheme.fontFamily.sans],
        'sans': ['Nunito', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringOffsetColor: ['focus-visible'],
    },
  },
  plugins: [],
}
