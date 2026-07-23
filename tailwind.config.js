/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zpay: {
          green: '#70E000',
          dark: '#0A0E1A',
          card: '#141A29',
          border: '#222B3E'
        }
      }
    },
  },
  plugins: [],
}
