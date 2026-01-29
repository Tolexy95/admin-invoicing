/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        primary: {
          DEFAULT: "#4318FF",
        },
        white: "#FFFFFF",
        secondary: {
          grey: {
            300: "#F4F7FE",
            400: "#E9EDF7",
            600: "#A3AED0",
            700: "#707EAE",
            900: "#2B3674",
          },
          darkGrey: {
            900: "#1B2559",
          },
        },
      },
    },
  },

  plugins: [
    require("daisyui"),
  ],

  daisyui: {
    themes: ["light"],
  },
};
