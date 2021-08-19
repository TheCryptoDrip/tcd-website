const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  purge: process.env.NODE_ENV === 'production'
    ? ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}']
    : [],
  darkMode: 'class',
  theme: {
    fontFamily: {
      heading: ['sk-modernist', ...defaultTheme.fontFamily.sans],
      body: ['open sans', ...defaultTheme.fontFamily.sans],
      mono: ['sk-modernist-mono', ...defaultTheme.fontFamily.mono]
    },
    fontSize: {
      '4xl': '51px',
      '3xl': '38px',
      '2xl': '28px',
      'xl': '21px',
      'lg': '19px',
      'base': '16px',
      'sm': '14px'
    },
    lineHeight: {
      '4xl': '61px',
      '3xl': '46px',
      '2xl': '42px',
      'xl': '32px',
      'lg': '29px',
      'base': '26px',
      'sm': '23px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      cobalt: {
        light: '#111932',
        base: '#0A1538',
        dark: '#040B23'
      },
      gray: {
        light: '#ffffff',
        base: '#F4F6F9',
        dark: '#DCE0EF'
      },
      white: '#ffffff',
      black: '#000000',
      primary: {
        light: '#3A67F0',
        base: '#FF1975',
        dark: '#16389F'
      },
      info: {
        base: '#3D94F2'
      },
      warning: {
        base: '#FFB54C'
      },
      danger: {
        base: '#FA6557'
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      const baseHeadingStyles = {
        color: theme('colors.cobalt.dark'),
        fontFamily: theme('fontFamily.heading'),
        fontWeight: theme('fontWeight.bold'),
      };

      // Dark theme overrides are defined in ~/styles/modules/dark.css
      addBase({
        'body': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.base'),
          color: theme('colors.cobalt.base'),
          lineHeight: theme('lineHeight.base'),
          letterSpacing: '0.1px'
        },
        'a': {
          color: theme('colors.primary.base'),
          fontWeight: theme('fontWeight.bold')
        },
        'small': {
          fontSize: theme('fontSize.sm'),
          lineHeight: theme('lineHeight.sm'),
          letterSpacing: '0.1px',
        },
        'p': {
          marginBottom: theme('spacing.5'),
          maxWidth: theme('maxWidth.prose')
        },
        'h1': {
          ...baseHeadingStyles,
          fontSize: theme('fontSize.4xl'),
          lineHeight: theme('lineHeight.4xl')
        },
        'h2': {
          ...baseHeadingStyles,
          fontSize: theme('fontSize.3xl'),
          lineHeight: theme('lineHeight.3xl')
        },
        'h3': {
          ...baseHeadingStyles,
          fontSize: theme('fontSize.2xl'),
          lineHeight: theme('lineHeight.2xl')
        },
        'h4': {
          ...baseHeadingStyles,
          fontSize: theme('fontSize.xl'),
          lineHeight: theme('lineHeight.xl')
        },
        'h5': {
          ...baseHeadingStyles,
          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.base')
        },
        'h6': {
          ...baseHeadingStyles,
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.lg'),
          lineHeight: theme('lineHeight.lg')
        }
      })
    })
  ],
}
