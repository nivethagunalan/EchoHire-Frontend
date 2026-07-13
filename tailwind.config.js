/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 🔥 REQUIRED FOR DARK MODE

  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],

  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 70px rgba(88, 91, 255, 0.18)'
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at top, rgba(144, 180, 255, 0.18), transparent 36%), radial-gradient(circle at right, rgba(125, 106, 255, 0.13), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)'
      }
    }
  },

  plugins: [require('@tailwindcss/forms')]
};