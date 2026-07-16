/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#0a0a0a',
        'primary-blue': '#1e40af',
        'text-dark': '#1a1a1a',
        'muted-grey': '#6b7280',
        'panel-bg': '#f9fafb',
        'line-grey': '#e5e7eb',
        'page-bg': '#ffffff',
        'black-dark': '#000000',
      },
    },
  },
  plugins: [],
};
