/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          800: '#18141c',
          900: '#120f16',
        },
        yellow: {
          400: '#FEDE00',
        },
      },
    },
    plugins: [],
  },
};
