/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        cursive: ['Dancing Script', 'cursive'],
        english: ['Fredoka', 'sans-serif'], // ضفنا الخط الإنجليزي الجديد
        arabic: ['Marhey', 'sans-serif'],   // ضفنا الخط العربي الجديد
      },
      colors: {
        rose: {
          deep: '#BE185D',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(0.8)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        flyRight: {
          '0%': { transform: 'translateX(-20px) translateY(5px) rotate(-10deg)' },
          '50%': { transform: 'translateX(5px) translateY(-5px) rotate(5deg)' },
          '100%': { transform: 'translateX(-20px) translateY(5px) rotate(-10deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fly-right': 'flyRight 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
