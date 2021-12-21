const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'burnt-sienna': '#66615B',
        'creme': '#F4F3EE',
        'green': '#79C29A',
        'blue': '#68B3C7',
        'orange': '#FF8F5D',
        'lime': '#D6E4A3',
        'yellow': '#F3BB44'
      },
      fontFamily: {
        'capitals': ['Sen', ...defaultTheme.fontFamily.sans],
        'sans': ['Nunito', ...defaultTheme.fontFamily.sans]
      },
      maxWidth: {
        '10': '10rem',
        '60pc': '60%',
        '350px': '350px',
      },
      minWidth: {
        '21': '21rem',
        '250px': '250px',
        '150px': '150px'
      },
      transitionProperty: {
        'width': 'width'
      }
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
