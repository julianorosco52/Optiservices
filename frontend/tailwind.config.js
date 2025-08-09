/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#86C232",
        secondary: "#61892F",
        "background-dark": "#222629",
        "background-dark-ui": "#474B4F",
        "background-light": "#F8F9FA",
        "background-light-ui": "#FFFFFF",
        "text-dark": "#FFFFFF",
        "text-light": "#222629",
        "text-muted": "#9E9E9E",
        "accent-error": "#E74C3C",
        "accent-warning": "#F39C12",
        "accent-info": "#3498DB",
        "accent-success": "#28A745",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [forms],
};
