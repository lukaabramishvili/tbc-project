"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";

export default function Navbar() {
  const { language } = useLanguage();

  return (
    <nav className="hidden justify-between items-center p-4 xl:flex">
      <ul className="dark:text-white flex space-x-4">
        <li className="font-bold">
          <Link data-cy="nav-home" href="/" className="p-4" >
            {language === "eng" ? "Home" : "მთავარი"}
          </Link>
        </li>
        <li className="font-bold">
          <Link data-cy="nav-products" href="/products" className="p-4">
            {language === "eng" ? "Products" : "პროდუქტები"}
          </Link>
        </li>
        <li className="font-bold">
          <Link data-cy="nav-posts" href="/posts" className="p-4">
            {language === "eng" ? "Posts" : "პოსტები"}
          </Link>
        </li>
        <li className="font-bold">
          <Link data-cy="nav-contact" href="/contact" className="p-4">
            {language === "eng" ? "Contact" : "კონტაქტი"}
          </Link>
        </li>
        <li className="font-bold">
          <Link data-cy="nav-about" href="/about" className="p-4">
            {language === "eng" ? "About" : "ჩვენს შესახებ"}
          </Link>
        </li>
        <li className="font-bold">
          <Link data-cy="nav-courses" href="/courses" className="p-4">
            {language === "eng" ? "Courses" : "კურსები"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
