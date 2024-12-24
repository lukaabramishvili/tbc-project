import "./Header.css";
import Navbar from '../Navbar/Navbar';
import Link from 'next/link';
import profilImage from "../../../../public/profile-icon.png";
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';

export default function Header() {
  return (
    <header className="bg-silver dark:bg-gray-800 max-w-full h-24 flex items-center justify-around transition-colors duration-300">
      <Link href="/">
        <h1 className="text-5xl uppercase cursor-pointer text-black dark:text-white">tbc</h1>
      </Link>
      <Navbar/>
      <div className="profileIcon flex items-center gap-4">
        <ThemeToggle/>
        <LanguageToggle/>
        <Link href="/profile">
          <img className="max-h-20 cursor-pointer" src={profilImage.src} alt="profile icon" />
        </Link>
      </div>
    </header>
  );
}
