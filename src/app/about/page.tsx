'use client';

import React from 'react'
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function About() {

  const { language } = useLanguage();

  return (
    <section className="bg-white dark:bg-[#2C2758] text-gray-900 dark:text-white pt-8 pb-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6 transition-all duration-300 hover:scale-105">
          {language === "eng" ? "About" : "ჩვენს შესახებ"}
          <span className="text-[#2C2758] dark:text-white"> Job Finder</span>
        </h2>

        <p className="text-lg leading-relaxed">
          {language === "eng" ? "Welcome to" : "კეთილი იყოს თქვენი მობრძანება"} <strong>Job Finder,</strong> 
          {language === "eng" ? " the best platform for talented professionals in" : " საუკეთესო პლატფორმა ნიჭიერი პროფესიონალებისთვის"} 
          <span className="text-[#2C2758] dark:text-white font-medium">
            web design, video editing, marketing, software engineering, customer support, and development (frontend & backend).
          </span> 
          {language === "eng" ? "Apply for top-tier jobs and grow your career in the digital world." : "მიმართეთ უმაღლესი დონის სამუშაოებს და განავითარეთ თქვენი კარიერა ციფრულ სამყაროში."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 text-left">
          {[ 
            {
              title: `🔥 ${language === "eng" ? "Exclusive Job Listings" : "ექსკლუზიური სამუშაოები"}`,
              description: `${language === "eng" ? "Find high-quality job opportunities tailored for developers, designers, and marketers." : "მოძებნეთ სამუშაო შანსები დეველოპერების, დიზაინერების და მარკეტინგისთვის."}`,
            },
            {
              title: `🌍 ${language === "eng" ? "Global Opportunities" : "გლობალური შესაძლებლობები"}`,
              description: `${language === "eng" ? "Work remotely or find in-house jobs from top companies worldwide." : "იმუშავეთ დისტანციურად ან იპოვეთ ოფისის სამუშაოები მსოფლიოს წამყვანი კომპანიებიდან."}`,
            },
            {
              title: `🚀 ${language === "eng" ? "Career Growth" : "კარიერის განვითარება"}`,
              description: `${language === "eng" ? "Level up with training, networking, and career guidance." : "განვითარდით ტრენინგებით, ქსელური კონტაქტებით და კარიერული კონსულტაციებით."}`,
            },
            {
              title: `💡 ${language === "eng" ? "Easy Application" : "მარტივი აპლიკაცია"}`,
              description: `${language === "eng" ? "Apply with a single click and get hired faster." : "გააგზავნეთ განაცხადი ერთ დაჭერით და მიიღეთ სამუშაო სწრაფად."}`,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-5 bg-gray-100 dark:bg-[#211D45] rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 hover:scale-110 transition-all duration-300">
          <Link
            href="/#featuredJobs"
            className="px-6 py-3 bg-[#2C2758] dark:bg-white text-white dark:text-[#2C2758] font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            {language === "eng" ? "Explore Jobs" : "სამუშაო ადგილები"}
          </Link>
        </div>
      </div>
    </section>  
  );
}
