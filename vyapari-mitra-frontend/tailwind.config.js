/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',   // ✅ Dark mode साठी
  theme: {
    extend: {
      colors: {
        'marathi': {
          50: '#fff8f0',
          100: '#ffe8d6',
          200: '#ffd1ad',
          300: '#ffb884',
          400: '#ffa05b',
          500: '#ff8832',
          600: '#ff7722',
          700: '#e65c1a',
          800: '#b84615',
          900: '#8a3410',
        },
        'saffron': '#FF6B35',
        'emerald-in': '#00A86B',
        'navy-in': '#1F4788',
      },
      fontFamily: {
        marathi: ['Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}