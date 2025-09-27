/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,otf}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfpro: ["SF-Pro-Display", "SF-Pro-Text", "SF-ProRounded", "sans-serif"],
      },
    },
  },
  plugins: [],
};
