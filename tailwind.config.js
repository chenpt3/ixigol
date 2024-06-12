module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './dist/*.html'],
  darkMode: 'selector',
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      },
      boxShadow: {
        'white-glow': '0 0 30px #70D8FD',
        'dark-glow': '0 0 30px #1c012f',
      },
    },
  },
  variants: {},
  plugins: [],
  darkMode: 'class'
}

