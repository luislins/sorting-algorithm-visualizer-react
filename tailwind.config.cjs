/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-navbar": "#695E93",
        "purple-dark": "#281C2D",
        "purple-haze": "#BEAFC2",
        "violet": "#8155BA",
      },
    },
  },
  plugins: [],
};
