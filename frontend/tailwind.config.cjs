/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 50px rgba(44, 24, 7, 0.12)",
      },
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#d97706",
          600: "#c2410c",
          700: "#b45309",
        },
      },
    },
  },
  plugins: [],
};