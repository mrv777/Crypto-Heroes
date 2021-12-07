module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      padding: {
        '1/2': '50%',
        full: '100%',
      },
    },
  },
  variants: {
    extend: {
      listStyleType: ['hover', 'focus'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
