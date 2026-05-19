import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        secondary: "#1D3557",
        accent: "#A8DADC",
        brand: {
          bg: "#F1FAEE",
          bgDark: "#0F1B2D",
          surface: "#E8F4F5",
          surfaceDark: "#1D3557",
          border: "#A8DADC",
          borderDark: "#2A4A6B",
        },
      },
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
  },
};
