"use client";

import Image from "next/image";
import english from "../../../../public/united-states.png";
import georgian from "../../../../public/geo.png";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div
      className="flex items-center justify-center cursor-pointer dark:bg-transparent bg-transparent rounded-full"
      onClick={toggleLanguage}
    >
      {language === "eng" ? (
        <Image className="w-10" src={english.src} width={50} height={50} alt="English" />
      ) : (
        <Image className="w-10" src={georgian.src} width={50} height={50} alt="English" />
      )}
    </div>
  );
}
