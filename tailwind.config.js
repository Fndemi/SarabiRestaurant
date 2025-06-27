/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './pages/**/*.html',
    './components/**/*.html',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        goldenrod: '#daa520',
        greenCustom: '#016f32',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  darkMode: 'class', 
  plugins: [],
}

