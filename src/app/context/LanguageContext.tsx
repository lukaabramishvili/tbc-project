"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type LanguageContextType = {
  language: "eng" | "geo";
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"eng" | "geo">("eng");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "eng" | "geo";
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "eng" ? "geo" : "eng";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);

    document.documentElement.classList.toggle("geo", newLanguage === "geo");
    document.documentElement.classList.toggle("eng", newLanguage === "eng");
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
