const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'burnt-sienna': '#484040',
        'burnt-sienna-darker': '#484040',
        'creme': '#F4F3EE',
        'lightgrey': '#E6E6E6',
        'greycreme': '#e9e8e3',
        'green': '#93CCAC',
        'deep-green': '#1da359',
        'blue': '#68B3C7',
        'ash-blue': '#a8c8c8',
        'orange': '#EA9470',
        'lime': '#D6E4A3',
        'yellow': '#F3BB44',
        'red': '#EB5E28',
        'pink-red': '#C65673',
        'pink': '#e19193',
        'ash-pink': '#E8C1B4',
        'purple': '#9a92c4',
      },
      width: {
        '800px': '800px'
      },
      height: {
        'fit': 'fit-content'
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
      backgroundColor: ['odd', 'even'],
    },
  },
  plugins: [],
}
