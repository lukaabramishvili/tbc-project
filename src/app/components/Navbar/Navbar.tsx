"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

export default function Navbar() {
  const { language } = useLanguage();

  return (
    <nav className="flex justify-between items-center p-4">
      <ul className="dark:text-white flex space-x-4">
        <li>
          <Link data-cy="nav-home" href="/">
            {language === "eng" ? "Home" : "მთავარი"}
          </Link>
        </li>
        <li>
          <Link data-cy="nav-products" href="/products">
            {language === "eng" ? "Products" : "პროდუქტები"}
          </Link>
        </li>
        <li>
          <Link data-cy="nav-contact" href="/contact">
            {language === "eng" ? "Contact" : "კონტაქტი"}
          </Link>
        </li>
        <li>
          <Link data-cy="nav-about" href="/about">
            {language === "eng" ? "About" : "ჩვენს შესახებ"}
          </Link>
        </li>
        <li>
          <Link data-cy="nav-posts" href="/posts">
            {language === "eng" ? "Posts" : "პოსტები"}
          </Link>
        </li>
        <li>
          <Link data-cy="nav-pricing" href="/pricing">
            {language === "eng" ? "Pricing" : "ფასები"}
          </Link>
        </li>
        <li>
          <Link data-cy="nav-subscribed" href="/subscribedUserView">
            {language === "eng" ? "Subscribed" : "გამოწერა"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
