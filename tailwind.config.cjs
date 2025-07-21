/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fustat: ['Fustat', 'serif'],
        danching: ['Dancing Script', 'cursive'],
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255, 193, 7, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(168, 148, 233, 0.8)' },
          '100%': { boxShadow: '0 0 10px rgba(255, 193, 7, 0.4)' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};