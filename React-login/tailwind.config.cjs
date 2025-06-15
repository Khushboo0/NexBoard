/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    // other paths
  ],
  darkMode: "class", // if you use class strategy for dark mode
  theme: { extend: {} },
  plugins: [],
};
