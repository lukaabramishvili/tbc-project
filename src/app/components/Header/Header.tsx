"use client";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import profilImage from "../../../../public/profile-icon.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import CartDialog from "../CartDialog/CartDialog";
import Image from "next/image";
import Logo from "../../../../public/logo.png";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-500 max-w-full h-24 flex items-center justify-around transition-colors duration-300">
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
        <Link href="/profile">
          <img
            className="max-h-20 cursor-pointer"
            src={profilImage.src}
            alt="profile icon"
          />
        </Link>
        <CartDialog></CartDialog>
      </div>
    </header>
  );
}
