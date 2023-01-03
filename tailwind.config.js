/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",
      lightgrey: "#EEEEEE",
      text1: "#F1D3B3",
      bg1: "#65647C",
      bg2: "#C7BCA1",
      footer: "#8B7E74",
    },
  },
  plugins: [],
};
