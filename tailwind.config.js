/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greyShade: "#959595",
        hoverGrey: "#687077",
        textGrey: "#373A3C",
        accentColor: "#5CB85C",
      },
    },
  },
  plugins: [],
};
