/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003E3A',
          light: '#00645D',
          dark: '#002724',
        },
        secondary: {
          DEFAULT: '#4A897A',
          light: '#6BA594',
          dark: '#356B5E',
        },
        accent: {
          DEFAULT: '#F1844F',
          light: '#F5A576',
          dark: '#D66A35',
        },
        background: '#FFF0DC',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
        md: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
        lg: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
