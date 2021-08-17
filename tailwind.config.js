module.exports = {
  mode: 'jit',
  purge: process.env.NODE_ENV === 'production'
    ? ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}']
    : [],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
