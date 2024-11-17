/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        padding: "2rem",
      },
      colors: {
        wallbitBlue: "#0D99FF",
        containerBackground: "#1C1C1E",
        containerHover: "#242426",
        lightBackground: "#F8F8F8",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        screenDynamic: "100dvw",
      },
      height: {
        screenDynamic: "100dvh",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
