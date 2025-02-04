"use client";

import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import profilImage from "../../../../public/profile-icon.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import Image from "next/image";
import Logo from "../../../../public/logo.png";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";



export default function Header() {

  const [burgerBar, setBurgerBar] = useState(false);
  const handleBurgerBar = () => {
    setBurgerBar(!burgerBar);
  }

  const { language } = useLanguage();

  return (
    <header className="bg-white dark:bg-[#2c2758] max-w-full h-24 flex items-center justify-around transition-colors duration-300">
      <div className="logoAndNavbar flex items-center gap-4">
      <Link href="/">
        <h1 className="text-5xl uppercase cursor-pointer text-black dark:text-white">
          <Image src={Logo} alt="logo" width={170} height={170} />
        </h1>
      </Link>
      <Navbar />
      </div>
      <div className="profileIcon flex items-center gap-4">
      <ThemeToggle />
      <LanguageToggle />
      <Link href="/profile" data-cy="profile-icon"> 
        <img
        className="max-h-20 cursor-pointer"
        src={profilImage.src}
        alt="profile icon"
        />
      </Link>
      </div>
      <div className="burger-bar">
      <button onClick={handleBurgerBar} className="burger-bar-button flex flex-col gap-1">
        <div className="w-8 h-1 bg-black"></div>
        <div className="w-8 h-1 bg-black"></div>
        <div className="w-8 h-1 bg-black"></div>
      </button>
      </div>
      {burgerBar && (
      <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-75 z-50">
        <nav className="flex flex-col items-center justify-center gap-4 text-[#7f73eb] bg-white dark:bg-[#2c2758] p-4 rounded-lg">
          <Link href="/profile" data-cy="profile-icon" onClick={handleBurgerBar}> 
            <img
            className="max-h-20 cursor-pointer"
            src={profilImage.src}
            alt="profile icon"
            />
          </Link>
          <ThemeToggle />
          <LanguageToggle />
          <Link href="/" className="text-xl" onClick={handleBurgerBar}>
            {language === "eng" ? "Home" : "მთავარი"}
          </Link>
          <Link href="/products" className="text-xl" onClick={handleBurgerBar}>
            {language === "eng" ? "Products" : "პროდუქტები"}
          </Link>
          <Link href="/posts" className="text-xl" onClick={handleBurgerBar}>
            {language === "eng" ? "Posts" : "პოსტები"}
          </Link>
          <Link href="/contact" className="text-xl" onClick={handleBurgerBar}>
            {language === "eng" ? "Contact" : "კონტაქტი"}
          </Link>
          <Link href="/about" className="text-xl" onClick={handleBurgerBar}>
            {language === "eng" ? "About" : "ჩვენს შესახებ"}
          </Link>
          <Link href="/courses" className="text-xl" onClick={handleBurgerBar}>
            {language === "eng" ? "Courses" : "კურსები"}
          </Link>
          <button onClick={handleBurgerBar} className="mt-4 p-2 bg-red-500 text-white rounded">Close</button>
        </nav>
      </div>
      )}
    </header>
  );
}
