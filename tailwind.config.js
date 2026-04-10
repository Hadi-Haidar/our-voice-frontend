export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Cairo', 'sans-serif'],
      },
      colors: {
        red: {
          50: '#fcf3f4',
          100: '#f8e4e6',
          200: '#f2cacd',
          300: '#ea9ea4',
          400: '#e06b74',
          500: '#d73e4a',
          600: '#E63946', // The requested color
          700: '#CE2029', // The requested darker shade
          800: '#9d1921',
          900: '#831920',
          950: '#480a0f',
        }
      }
    },
  },
  plugins: [],
}
