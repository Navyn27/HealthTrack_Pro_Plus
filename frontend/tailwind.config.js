/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extends: {
      backgroundImage: {
        "dashboard-bg": "url('./src/assets/statics/background.png')",
      },
    },
  },
  plugins: [],
};
