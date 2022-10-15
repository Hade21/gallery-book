/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mochiy: ["Mochiy Pop P One", "sans-serif"],
      },
      width: {
        "1/3": "33.333333%",
        "2/3": "66.666667%",
      },
      height: {
        "1/3": "33.333333%",
        "2/3": "66.666667%",
      },
    },
  },
  plugins: [],
};
