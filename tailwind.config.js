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
  plugins: [],
}
