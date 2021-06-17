module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'and-red': '#FF323C',
        'and-blue': '#2897FF',
        'and-purple': '#A050FF',
        'and-yellow': '#FFC800',
        'and-green': '#5AC328',
        'and-pink': '#FF6ECF',
        'and-black': '#323234',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      maxWidth: {
        90: '90vw',
        144: '36rem',
      },
      container: {
        center: true,
      },
      boxShadow: {
        md: '-1px 10px 10px -2px rgba(0,0,0,0.49);',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
