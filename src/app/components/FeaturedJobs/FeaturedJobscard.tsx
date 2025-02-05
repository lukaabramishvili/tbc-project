import React from 'react'
import leftWhiteArrow from "../../../../public/lwa.png";
import leftblackArrow from "../../../../public/lba.png";
import rightWhiteArrow from "../../../../public/rwa.png";
import rightblackArrow from "../../../../public/rba.png";
import { useState, useEffect } from "react";
import { createClient } from '@/utils/supabase/client';
import chrysler from "../../../../public/car-photo.webp";
import infiniti from "../../../../public/infiniti-q60.jpg";
import bmw from "../../../../public/BMW-6.jpg";
import Image from 'next/image';
import Clock from '../../../../public/clock.png';
import Location from '../../../../public/location.png';
import Money from '../../../../public/money.png';
import { useLanguage } from '@/app/context/LanguageContext';

const FeaturedJobscard = () => {
    const slides = [
        <img src={chrysler.src} alt="Chrysler car" />,
        <img src={infiniti.src} alt="Infiniti Q60" />,
        <img src={bmw.src} alt="BMW 6" />,
    ];

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


    interface job {
        id: number;
        created_at: string;
        title: string;
        img_url: string;
        location: string;
        salary: number;
        position: string;
        working_time: string;
    }

    const [jobs, setJobs] = useState<job[]>([]);

    useEffect(() => {
        async function fetchJobs() {
          try {
            const response = await fetch("/api/fetchJobs");
            if (response.ok) {
              const { data } = await response.json();
              setJobs(data);
            } else {
              console.error("Failed to fetch jobs.");
            }
          } catch (error) {
            console.error("Error fetching jobs:", error);
          }
        }
        fetchJobs();
    }, []);
      
    const { language } = useLanguage();
      
  return (
      <div className="relative h-full w-full max-w-[calc(100vw-10rem)] my-16 overflow-hidden bg-white dark:bg-gray-700 dark:text-white rounded-xl shadow-xl p-8">
        <h2 className='mb-4'>
            <strong className='text-5xl'>
              {language === 'eng' ? 'Featured Jobs' : 'გამორჩეული ვაკანსიები'}
            </strong>
        </h2>
        <p>
            <strong>{language === 'eng' ? 'Over 10k opening jobs.' : '10 ათასზე მეტი სამუშაო ადგილი. '}</strong>
            {language === 'eng' ? 'You can best of them see here ' : 'მათგან საუკეთესო შეგიძლიათ ნახოთ აქ '}<br/>
        </p>

        {jobs.map((job, index) => (
            <div 
                className="job-container w-full flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-12 mt-8 hover:scale-95 shadow-md duration-200 py-4 px-4"
                key={index}
            >
                <div className="job-logo flex-shrink-0">
                    <img src={job.img_url} alt={job.title} className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
                </div>
                <div className="job-context text-center md:text-left">
                    <h3 className="flex justify-center md:justify-start">
                        <strong className='text-lg md:text-2xl'>{job.title}</strong>
                    </h3>
                    <div className="job-main-text flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mt-2">
                        <div className="flex items-center gap-2">
                            <Image src={Clock.src} width={20} height={20} alt="Clock" />
                            <p className="text-sm md:text-base">{job.created_at.slice(0, 10)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={Location.src} width={20} height={20} alt="Location" />
                            <p className="text-sm md:text-base">{job.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={Money.src} width={20} height={20} alt="Money" />
                            <p className="text-sm md:text-base">${job.salary.toLocaleString()}</p>
                        </div>
                        <p className="cursor-pointer p-2 text-sm md:text-base bg-[#0DCAF0] rounded-full text-white hover:bg-[#7F73EB] duration-100">
                            {job.position}
                        </p>
                        <p className="cursor-pointer p-2 text-sm md:text-base bg-[#0DCAF0] rounded-full text-white hover:bg-[#7F73EB] duration-100">
                            {job.working_time}
                        </p>
                    </div>
                </div>
                <button className="p-3 md:p-4 bg-[#7F73EB] rounded-full text-white hover:bg-[#0DCAF0] duration-100">
                    {language === 'eng' ? 'Apply now' : 'მიმართეთ ახლავე'}
                </button>
            </div>
        ))}

        <div className='h-2'></div>
        {/* <div className="homeSlide min-w-full transition-opacity duration-500 ease-in-out">
          {slides[currentSlide]}
        </div>
        <button
          className="absolute top-[40%] left-8 p-8 bg-white dark:bg-black bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-white dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
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
          className="absolute top-[40%] right-8 p-8 bg-white dark:bg-black bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-white dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
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
        </button> */}
      </div>
  )
}

export default FeaturedJobscard