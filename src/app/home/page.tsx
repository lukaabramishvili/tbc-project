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
import Image from "next/image";
import WebDesign from "../../../public/browse-by-categories/ui-ux.png";
import Marketing from "../../../public/browse-by-categories/marketing.png";
import Video from "../../../public/browse-by-categories/play-button.png";
import Website from "../../../public/browse-by-categories/world-wide-web.png";
import CustomerSupport from "../../../public/browse-by-categories/customer-support.png";

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
    <main className="flex flex-col items-center justify-center w-full dark:bg-gray-700 text-center">
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
          <button className="border-4 border-[#0dcaf0] hover:border-[#83def0]  rounded-full bg-transparent px-4 py-4 bg-[#5d52ba] hover:bg-[#0dcaf0] text-white hover:text-white">Find a job</button>
        </div>
      </div>
      
      <div className="browse-by-categories mt-24 mb-10">
        <h3 className="text-5xl font-bold text-gray-900 dark:text-gray-200 mb-12">Browse by Categories</h3>
        <div className="categories grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="web-design cursor-pointer bg-[#5d52ba] p-4 rounded-full flex flex-col items-center justify-center w-full aspect-square border-8 border-[#7b6df4] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <Image src={WebDesign.src} alt="WebDesign" width={50} height={50} />
            <span className="mt-2 text-white text-center">Web Design</span>
          </div>
          <div className="marketing cursor-pointer bg-[#f59e0b] p-4 rounded-full flex flex-col items-center justify-center w-full aspect-square border-8 border-[#f4b850] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <Image src={Marketing.src} alt="Marketing" width={50} height={50} />
            <span className="mt-2 text-white text-center">Marketing</span>
          </div>
          <div className="video cursor-pointer bg-[#10b981] p-4 rounded-full flex flex-col items-center justify-center w-full aspect-square border-8 border-[#40f6b9] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <Image src={Video.src} alt="Video" width={50} height={50} />
            <span className="mt-2 text-white text-center">Video</span>
          </div>
          <div className="website cursor-pointer bg-[#3b82f6] p-4 rounded-full flex flex-col items-center justify-center w-full aspect-square border-8 border-[#629eff] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <Image src={Website.src} alt="Website" width={50} height={50} />
            <span className="mt-2 text-white text-center">Website</span>
          </div>
          <div className="customer-support cursor-pointer bg-[#ef4444] p-4 rounded-full flex flex-col items-center justify-center w-full aspect-square border-8 border-[#fa7474] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
            <Image src={CustomerSupport.src} alt="Customer Support" width={50} height={50} />
            <span className="mt-2 text-white text-center">Customer Support</span>
          </div>
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
