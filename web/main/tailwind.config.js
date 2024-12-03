/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/main/resources/templates/**/*.html",
    "./src/main/resources/templates/**/*.thymeleaf"
  ],
  theme: {
    extend: {

    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'lato': ['Lato', 'sans-serif'],
      'shantell': ['Shantell Sans', 'sans-serif'],
      'ubuntu': ['Ubutnu', 'sans-serif']
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "pastel",
      "sunset"
    ],
  },
  darkMode: ['class', '[data-theme="sunset"]']
};


