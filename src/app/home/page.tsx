"use client";

import { useState, useEffect } from "react";
import chrysler from "../../../public/car-photo.webp";
import infiniti from "../../../public/infiniti-q60.jpg";
import bmw from "../../../public/BMW-6.jpg";
import leftWhiteArrow from "../../../public/lwa.png";
import leftblackArrow from "../../../public/lba.png";
import rightWhiteArrow from "../../../public/rwa.png";
import rightblackArrow from "../../../public/rba.png";
import { createClient } from "../../utils/supabase/client";
import './index.css';

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
    <main className="flex flex-col items-center justify-center w-full bg-gray-200 dark:bg-gray-700 text-center">
      <div className="search-job w-full flex items-center justify-evenly lg:flex-row flex-col gap-10 p-10">
        <div className="serach-job-left flex flex-col gap-8 items-center justify-center">
          <h4 className="text-white text-xl">Are you looking for your dream job?</h4>
          <h2 className="text-white text-5xl font-bold">Online Platform. <br /> Best Job portal</h2>
          <button className="border-2 font-bold border-[#0dcaf0] rounded-full bg-transparent px-4 py-2 hover:bg-[#0dcaf0] text-[#0dcaf0] hover:text-white">
            Browse Categories
          </button>
        </div>
        <div className="search-job-right flex flex-col justify-center gap-10 bg-[#7f73eb] p-10 rounded-xl ">
          <h3 className="text-start text-white text-3xl font-bold">Search your dream job</h3>
          <div className="search-job-right-inputs flex gap-4 sm:flex-row flex-col">
            <input 
              type="text" 
              id="job-title" 
              className="p-4 rounded-full"
              placeholder='job title'/>
            <input 
              type="text" 
              id="location" 
              className="p-4 rounded-full"
              placeholder="location"/>
          </div>
          <button className="rounded-full bg-transparent px-4 py-4 bg-[#5d52ba] hover:bg-[#0dcaf0] text-white hover:text-white">Find a job</button>
        </div>
      </div>
      
      {/* <h2 className="text-3xl dark:text-white">Welcome to Our Website!</h2>
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
      </div> */}
    </main>
  );
}
