"use client";

import { useState, useEffect } from "react";
import "./index.css";
import chrysler from "../../../public/car-photo.webp";
import infiniti from "../../../public/infiniti-q60.jpg";
import bmw from "../../../public/BMW-6.jpg";
import leftWhiteArrow from "../../../public/lwa.png";
import leftblackArrow from "../../../public/lba.png";
import rightWhiteArrow from "../../../public/rwa.png";
import rightblackArrow from "../../../public/rba.png";
import { createClient } from "../../utils/supabase/client";

const slides = [
  <img src={chrysler.src} alt="Chrysler car" />,
  <img src={infiniti.src} alt="Infiniti Q60" />,
  <img src={bmw.src} alt="BMW 6" />,
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const supabase = createClient();
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    }
    fetchUser();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full bg-gray-200 dark:bg-gray-700 text-center ">
      <h2 className="text-3xl dark:text-white">Welcome to Our Website!</h2>
      <div className="relative w-full max-h-[calc(100vh-12.875rem)] my-4 overflow-hidden bg-gray-300 dark:bg-gray-800">
        <div className="homeSlide min-w-full transition-opacity duration-500 ease-in-out">
          {slides[currentSlide]}
        </div>
        <button
          className="absolute top-[40%] left-8 p-8 bg-white dark:bg-black bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
          onClick={prevSlide}
        >
          <img
            className="w-10 hidden dark:block"
            src={leftWhiteArrow.src}
            alt="dark"
          />
          <img
            className="w-10 dark:hidden"
            src={leftblackArrow.src}
            alt="light"
          />
        </button>
        <button
          className="absolute top-[40%] right-8 p-8 bg-white dark:bg-black bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
          onClick={nextSlide}
        >
          <img
            className="w-10 dark:hidden"
            src={rightblackArrow.src}
            alt="light"
          />
          <img
            className="w-10 hidden dark:block"
            src={rightWhiteArrow.src}
            alt="dark"
          />
        </button>
      </div>
    </main>
  );
}
