/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#FF7A00",
        "dark-bg": "#121212",
        "light-text": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
