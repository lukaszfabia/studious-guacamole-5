import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/main/resources/templates/**/*.html"],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      lato: ["Lato", "sans-serif"],
      shantell: ["Shantell Sans", "sans-serif"],
      ubuntu: ["Ubutnu", "sans-serif"],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake", "sunset"],
  },
  darkMode: ["class", '[data-theme="sunset"]'],
};
