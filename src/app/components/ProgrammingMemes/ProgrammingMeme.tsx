"use client"

import React, { useEffect, useState } from 'react'
import leftblackArrow from "../../../../public/lba.png";
import leftWhiteArrow from "../../../../public/lwa.png";
import rightWhiteArrow from "../../../../public/rwa.png";
import rightblackArrow from "../../../../public/rba.png";
import meme1 from "../../../../public/MEMES/meme1.jpg"
import meme2 from "../../../../public/MEMES/meme2.webp";
import meme3 from "../../../../public/MEMES/meme3.jpg";
import meme4 from "../../../../public/MEMES/meme4.jpg";
import meme5 from "../../../../public/MEMES/meme5.webp";
import meme6 from "../../../../public/MEMES/meme6.webp";
import Image from 'next/image';

const ProgrammingMeme = () => {

    const slides = [
        <Image width={950} height={950} src={meme1.src} alt="meme" className="w-full h-full object-cover" />,
        <Image width={950} height={950} src={meme2.src} alt="meme" className="w-full h-full object-cover" />,
        <Image width={950} height={950} src={meme3.src} alt="meme" className="w-full h-full object-cover" />,
        <Image width={950} height={950} src={meme4.src} alt="meme" className="w-full h-full object-cover" />,
        <Image width={950} height={950} src={meme5.src} alt="meme" className="w-full h-full object-cover" />,
        <Image width={950} height={950} src={meme6.src} alt="meme" className="w-full h-full object-cover" />,
    ];
    
    const [currentSlide, setCurrentSlide] = useState(0);
    
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
        <div className="relative max-w-full md:max-w-[calc(100vw-10rem)] my-16 overflow-hidden bg-white dark:bg-gray-700 dark:text-white rounded-xl shadow-xl p-4 md:p-8">
            <h2 className='mb-4 text-center'>
                <strong className='text-3xl md:text-5xl'>MEMES of programming</strong>
            </h2>
           <div className="homeSlide w-full aspect-[16/9] min-w-full transition-opacity duration-500 ease-in-out">
              {slides[currentSlide]}
            </div>
            <button
              className="absolute top-[50%] left-4 md:left-8 p-4 md:p-8 bg-white dark:bg-black bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-white dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
              onClick={prevSlide}
            >
              <img
                className="w-6 md:w-10 hidden dark:block"
                src={leftWhiteArrow.src}
                alt="dark"
              />
              <img
                className="w-6 md:w-10 dark:hidden"
                src={leftblackArrow.src}
                alt="light"
              />
            </button>
            <button
              className="absolute top-[50%] right-4 md:right-8 p-4 md:p-8 bg-white dark:bg-black bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-white dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
              onClick={nextSlide}
            >
              <img
                className="w-6 md:w-10 dark:hidden"
                src={rightblackArrow.src}
                alt="light"
              />
              <img
                className="w-6 md:w-10 hidden dark:block"
                src={rightWhiteArrow.src}
                alt="dark"
              />
            </button>
        </div>
    );
}

export default ProgrammingMeme
