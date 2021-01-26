const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'routine-dark': '#292827',
        'routine-black': '#444',
        'routine-blue': '#4754DC',
        'routine-gray-1': '#F6F3EE',
        'routine-gray-3': '#BBB2A1',
        'routine-gray-4': '#D3CDB8',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ e, addUtilities, theme }) {
      colors = theme('colors')
      const caretColors = Object.keys(colors).reduce((acc, key) => {
        if (typeof colors[key] === 'string') {
          return {
            ...acc,
            [`.caret-${e(key)}`]: {
              'caret-color': colors[key],
            },
          }
        }

        const variants = Object.keys(colors[key])

        return {
          ...acc,
          ...variants.reduce(
            (a, variant) => ({
              ...a,
              [`.caret-${e(key)}-${variant}`]: {
                'caret-color': colors[key][variant],
              },
            }),
            {}
          ),
        }
      }, {})

      addUtilities(caretColors)
    }),
  ],
}
