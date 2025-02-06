"use client";

import './index.css';
import Image from "next/image";
import WebDesign from "../../../public/browse-by-categories/ui-ux.png";
import Marketing from "../../../public/browse-by-categories/marketing.png";
import Video from "../../../public/browse-by-categories/play-button.png";
import Website from "../../../public/browse-by-categories/world-wide-web.png";
import CustomerSupport from "../../../public/browse-by-categories/customer-support.png";
import { IntroductionJobFinder } from "../components/ForHome/IntroductionJobFinder";
import FeaturedJobscard from '../components/FeaturedJobs/FeaturedJobscard';
import { useLanguage } from '../context/LanguageContext';
import ProgrammingMeme from '../components/ProgrammingMemes/ProgrammingMeme';


export default function Home() {

  const { language } = useLanguage();

  return (
    <main className="flex flex-col items-center justify-center w-full dark:bg-gray-700 text-center">
      <div className="search-job w-full flex items-center justify-evenly lg:flex-row flex-col gap-10 p-10">
        <div className="serach-job-left flex flex-col gap-8 items-center justify-center">
          <h4 className="text-white text-xl">
            {language === 'eng' ? 'Are you looking for your dream job?' : 'ეძებთ თქვენი საოცნებო სამსახურს?'}
          </h4>
          <h2 className="text-white text-5xl font-bold">{language === 'eng' ? 'Online Platform.' : 'ონლაინ პლათფორმა.'} <br /> {language === 'eng' ? 'Best Job portal' : 'საუკეთესო სამუშაო პორტალი'}</h2>
          <button className="border-2 font-bold border-[#0dcaf0] rounded-full bg-transparent px-4 py-2 hover:bg-[#0dcaf0] text-[#0dcaf0] hover:text-white">
            {language === 'eng' ? 'Browse Categories' : 'კატეგორიების დათვალიერება'}
          </button>
        </div>
        <div className="search-job-right flex flex-col justify-center gap-6 bg-[#2C2758] p-8 sm:p-12 rounded-xl shadow-lg">
          <h3 className="text-center sm:text-start text-white text-3xl sm:text-4xl font-extrabold">
            {language === 'eng' ? 'Search Your Dream Job' : 'მოძებნეთ თქვენი ოცნების სამუშაო'}
          </h3>
          <p className="text-white text-lg sm:text-xl text-center sm:text-left leading-relaxed max-w-2xl">
            {language === 'eng' ? 
              'Discover amazing career opportunities tailored to your skills and interests. Find the perfect job that matches your aspirations and start your journey today.' :
              'აღმოაჩინეთ საოცარი კარიერული შესაძლებლობები, რომლებიც მორგებულია თქვენს უნარებსა და ინტერესებზე. იპოვეთ სრულყოფილი სამუშაო, რომელიც შეესაბამება თქვენს მისწრაფებებს და დაიწყეთ თქვენი მოგზაურობა დღესვე.'}
          </p>
        </div>
      </div>
      
      <div className="browse-by-categories mt-24 mb-10">
        <h3 className="text-5xl font-bold text-gray-900 dark:text-gray-200 mb-12">
          {language === 'eng' ? 'Our Jobs Categories' : 'ჩვენი სამუშაოების კატეგორიები'}
        </h3>
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

      <IntroductionJobFinder />

      <FeaturedJobscard />

      {/* <ProgrammingMeme /> */}

    </main>
  );
}
