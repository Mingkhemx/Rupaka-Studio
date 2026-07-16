/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0C1424',
        white: '#FFFFFF',
        'page-bg': '#FDFBFB',
        'panel-bg': '#F6F1F1',
        'soft-card': '#F0EAEB',
        'soft-card-2': '#F8F4F4',
        'text-dark': '#1A253A',
        'muted-grey': '#828B9B',
        'muted-light': '#B8C0CC',
        'line-grey': '#D7DBE2',
        'black-dark': '#131E32',
        'deep-black': '#0C1424',
        'white-card': '#FFFFFF',
        'white-soft': '#FDFBFB',
        'primary-dark': '#1A253A',
        'primary-blue': '#2D4A70',
        'accent-coral': '#F3A8B0',
        'accent-orange': '#E08E9B',
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
