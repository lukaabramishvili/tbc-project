"use client";

import { useState, useEffect } from "react";
import light from "../../../../public/sun.png";
import dark from "../../../../public/moon.png";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="flex items-center justify-center pl-10 cursor-pointer dark:bg-transparent bg-transparent rounded-full"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <img className="w-10" src={dark.src} alt="dark" />
      ) : (
        <img className="w-10" src={light.src} alt="light" />
      )}
    </div>
  );
};

export default ThemeToggle;
