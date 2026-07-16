/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#F0F4F8',
        'panel-bg': '#E8EEF4',
        'soft-card': '#E0E8F0',
        'soft-card-2': '#EBF0F6',
        'text-dark': '#1A2332',
        'muted-grey': '#7A8FA3',
        'muted-light': '#B4C5D9',
        'line-grey': '#D0DCE8',
        'black-dark': '#0F1419',
        'deep-black': '#0A0D10',
        'white-card': '#F8FAFC',
        'white-soft': '#F0F4F8',
        'primary-dark': '#1B3A52',
        'primary-blue': '#2E5A8C',
        'accent-coral': '#E8654D',
        'accent-orange': '#F39237',
        'accent-green': '#4CAF7B',
        'accent-purple': '#8B6BB5',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'Poppins', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
};
