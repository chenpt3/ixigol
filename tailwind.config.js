module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './dist/*.html'],
  darkMode: 'selector',
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      },
      boxShadow: {
        'white-glow': '0 0 20px #70D8FD',
        'dark-glow': '0 0 20px #1c012f',
      },
      textShadow: {
        'white': '0 0 15px rgba(255, 255, 255, 0.7)',
        'black': '0 0 15px rgba(0, 0, 0, 0.7)'
      },
    },
  },
  variants: {},
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-white': {
          textShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
        },
        '.text-shadow-black': {
          textShadow: '0 0 20px rgba(0, 0, 0, 0.7)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
  darkMode: 'class'
}

