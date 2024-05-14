/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        xxs:['0.65em',{lineHeight:'1rem'}],
        xxxs:['0.5em',{lineHeight:'1rem'}],
    },
    },
  },
  plugins: [],
}

