const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'burnt-sienna': '#66615B',
        'creme': '#F4F3EE',
        'lightgrey': '#E6E6E6',
        'greycreme': '#e9e8e3',
        'green': '#79C29A',
        'blue': '#68B3C7',
        'orange': '#FF8F5D',
        'lime': '#D6E4A3',
        'yellow': '#F3BB44',
        'red': '#EB5E28'
      },
      fontFamily: {
        'sans': ['system-ui', ...defaultTheme.fontFamily.sans]
      },
      width: {
        '550px': '550px'
      },
      maxWidth: {
        '1/2': '50%',
        '10': '10rem',
        '60pc': '60%',
        '300px': '300px',
        '980px': '980px',
      },
      minWidth: {
        '21': '21rem',
        '250px': '250px',
        '150px': '150px'
      },
      maxHeight: {
        '600px': '600px'
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
