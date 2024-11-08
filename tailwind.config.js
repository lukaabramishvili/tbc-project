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
        custom: '0.1rem 0.1rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25)', // Customize the color as needed
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
