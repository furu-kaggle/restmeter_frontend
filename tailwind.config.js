import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', ...defaultTheme.fontFamily.sans],
        heading: ['Zen Maru Gothic', 'sans-serif'],
        body: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
