/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        400: "400px",
        500: "500px",
        760: "760px",
        900: "900px",
        1000: "1000px",
        1100: "1100px",
        1200: "1200px",
        1600: "1600px",
        1300: "1300px",
      },
    },
  },
  plugins: [],
};
