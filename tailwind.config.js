/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : "#3FA9A9",
        customColor: 'rgb(63, 169, 169)',
      }
    },
  },
  plugins: [],
}

