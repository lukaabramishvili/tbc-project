"use client";

import Image from "next/image";
import english from "../../../../public/united-states.png";
import georgian from "../../../../public/geo.png";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";

export default function LanguageToggle() {
  const [loading, setLoading] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const handleToggle = () => {
    setLoading(true);
    setTimeout(() => {
      toggleLanguage();
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
          <div
            className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
          >
            <div
              className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
            ></div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center cursor-pointer dark:bg-transparent bg-transparent rounded-full"
          onClick={handleToggle}
        >
          {language === "eng" ? (
            <Image className="w-10" src={english.src} width={50} height={50} alt="English" />
          ) : (
            <Image className="w-10" src={georgian.src} width={50} height={50} alt="Georgian" />
          )}
        </div>
      )}
    </div>
  );
}