import { themes } from '@storybook/theming';
import '../styles/tailwind.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  darkMode: {
    darkClass: 'dark',
    lightClass: 'light',
    stylePreview: true,
    dark: {
      ...themes.dark,
      appBg: '#040B23',
      appContentBg: '#0A1538',
      barBg: '#040B23',
    }
  }
}
