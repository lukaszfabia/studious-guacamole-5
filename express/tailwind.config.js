/** @type {import('tailwindcss').Config} */
export const content = [
  "./public/**/*.{html,js,jsx,ts,tsx,css,ejs}",
  "./views/**/*.{html,js,jsx,ts,tsx,css,ejs}",
];
export const theme = {
  extend: {
    fontFamily: {
      fira: ["Fira Sans", "sans-serif"],
      open: ["Open Sans", "sans-serif"],
    },
  },
};
export const plugins = [];
