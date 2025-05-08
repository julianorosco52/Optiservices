import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Initialize dark mode based on user preference or localStorage
const initializeDarkMode = () => {
  // Check if user has previously set a preference
  const savedTheme = localStorage.getItem("darkMode");
  
  if (savedTheme === "true") {
    document.documentElement.classList.add("dark");
  } else if (savedTheme === null) {
    // If no preference is saved, use system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  }
};

// Run initialization
initializeDarkMode();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
