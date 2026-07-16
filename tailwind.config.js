/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#FAFAF8',
        'panel-bg': '#F0EDE8',
        'soft-card': '#F5F1ED',
        'soft-card-2': '#F8F5F1',
        'text-dark': '#1A1F2E',
        'muted-grey': '#8B96A8',
        'muted-light': '#C5D1DB',
        'line-grey': '#E0E5EB',
        'black-dark': '#0F1419',
        'deep-black': '#0A0D10',
        'white-card': '#FEFDFB',
        'white-soft': '#FAF9F7',
        'primary-dark': '#2C3E52',
        'primary-blue': '#3D5A7F',
        'accent-coral': '#E8654D',
        'accent-orange': '#F39237',
        'accent-green': '#4CAF7B',
        'accent-purple': '#8B6BB5',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
      },
    },
  },
};
