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
import JobFinderPage from '../components/AboutJobFinderBanner/AboutJobFinderBanner';


export default function Home() {

  const { language } = useLanguage();

  const categories = [
    { name: 'Web Design', bgColor: 'bg-[#5d52ba]', borderColor: 'border-[#7b6df4]', icon: WebDesign },
    { name: 'Marketing', bgColor: 'bg-[#f59e0b]', borderColor: 'border-[#f4b850]', icon: Marketing },
    { name: 'Video', bgColor: 'bg-[#10b981]', borderColor: 'border-[#40f6b9]', icon: Video },
    { name: 'Website', bgColor: 'bg-[#3b82f6]', borderColor: 'border-[#629eff]', icon: Website },
    { name: 'Customer Support', bgColor: 'bg-[#ef4444]', borderColor: 'border-[#fa7474]', icon: CustomerSupport },
  ];

  return (
    <main className="flex flex-col items-center justify-center w-full dark:bg-[#2C2758] text-center">
      <div className="search-job w-full flex items-center justify-evenly lg:flex-row flex-col gap-10 p-10">
        <div className="serach-job-left flex flex-col gap-8 items-center justify-center">
          <h4 className="text-white text-xl">
            {language === 'eng' ? 'Are you looking for your dream job?' : 'ეძებთ თქვენი საოცნებო სამსახურს?'}
          </h4>
          <h2 className="text-white text-5xl font-bold">{language === 'eng' ? 'Online Platform.' : 'ონლაინ პლათფორმა.'} <br /> {language === 'eng' ? 'Best Job portal' : 'საუკეთესო სამუშაო პორტალი'}</h2>
          <button className="border-2 font-bold border-[#2C2758] rounded-full bg-transparent px-4 py-2 hover:bg-[#2C2758] text-[#2C2758] hover:text-white">
            {language === 'eng' ? 'Browse Categories' : 'კატეგორიების დათვალიერება'}
          </button>
        </div>
        <div className="search-job-right flex flex-col justify-center gap-6 bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 p-8 sm:p-12 rounded-xl shadow-lg">
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
      
      <div className="browse-by-categories mt-24 mb-10 px-4 md:px-8 lg:px-16">
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 text-center mb-12">
          {language === 'eng' ? 'Our Job Categories' : 'ჩვენი სამუშაოების კატეგორიები'}
        </h3>
        <div className="categories grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center">
          {categories.map(({ name, bgColor, borderColor, icon }, index) => (
            <div
              key={index}
              className={`cursor-pointer p-6 rounded-full flex flex-col items-center justify-center w-40 h-40 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 border-8 transition-all duration-300 ${bgColor} ${borderColor} hover:border-gray-300 dark:hover:border-gray-600 shadow-lg hover:shadow-xl`}
            >
              <Image src={icon.src} alt={name} width={50} height={50} />
              <span className="mt-2 text-white text-center text-sm sm:text-base">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <IntroductionJobFinder />

      <FeaturedJobscard />

      <JobFinderPage />

      {/* <ProgrammingMeme /> */}

    </main>
  );
}
