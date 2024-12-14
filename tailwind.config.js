/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: '#c0c0c0',
        profileSecondaryColor: '#708090', 
        profileTextColor: '#333333',      
        profileAccent: '#50C878',         
      },
      boxShadow: {
        custom: '0.1rem 0.1rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25)', 
        white: 
          '0 0.5rem 1.5rem rgba(255, 255, 255, 0.3), 0 0.5rem 1.5rem rgba(255, 255, 255, 0.1)', 
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
