/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
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
  },
  plugins: [],
};

export default config;
