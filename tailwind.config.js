module.exports = {
  purge: {
    content: ['./**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
    options: {
      whitelist: [
        'h-12', 'h-24', 'h-32',
        'w-12', 'w-24', 'w-32',
        'md:grid-cols-2', 'md:grid-cols-3'
      ]
    }
  },
  theme: {
    borderRadius: {
      sm: '0.125rem',
      default: '8px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
    extend: {
      colors: {
        white: '#FFFFFF',
        primary: '#5BC0EB',
        accent: '#C3423F',
        'base-back': '#f3f3f3',
        'base-font': '#141414',
        'base-gray': '#A2A7A5',
        'base-gray-light': '#DAE2DF',
        'base-twitter': '#20A1F1',
        'base-twitter-hover': '#94BCFA',
        'base-facebook': '#1A77F2',
        'base-facebook-hover': '#8B9CC2',
        'base-footer': '#4C4C4C',
        'base-google-hover': '#f4f4f4',
      },
      inset: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '5/5': '100%',
      },
      fill: {
        'base-font': '#141414',
      },
    },
  },
  variants: {},
  plugins: [],
};
