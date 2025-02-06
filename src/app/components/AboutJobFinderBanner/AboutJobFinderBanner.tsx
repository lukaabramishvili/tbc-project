'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import JobMeeting from '../../../../public/home/people-working-as-team-company.jpg'

export default function JobFinderPage() {

    const { language } = useLanguage()

    return (
        <div className="main min-w-[calc(100vw-12rem)] flex flex-col xl:flex-row items-center justify-between mx-4 xl:mx-28 text-center xl:text-left gap-8 bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 rounded-3xl mt-16 p-8 xl:p-12 mb-8 shadow-lg">
            <div className="introduction-second max-w-[35rem] text-white p-6 xl:p-10">
                <h2 className="text-4xl xl:text-5xl font-extrabold pb-6 leading-tight">
                    {language === 'eng' ? 'Job Finder helps you an easier way to get new job' : 'Job Finder გეხმარებათ ახალი სამუშაოს უფრო მარტივად საპოვნელად'}
                </h2>
                <p className="max-w-xl mx-auto xl:mx-0 pb-6 text-lg xl:text-xl font-medium opacity-90">
                    {language === "eng" ? 
                        'Discover a streamlined way to search and apply for jobs, making your job search more efficient and hassle-free.' : 
                        'აღმოაჩინეთ სამუშაო ადგილების ძებნისა და განაცხადის გამარტივებული გზა, რაც გახდის თქვენს სამუშაოზე ძებნას უფრო ეფექტურს და უპრობლემოდ.'
                    } 
                </p>
                {/* <button className="px-6 py-3 mt-4 bg-white text-purple-800 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-100 transition duration-300">
                    Get Started
                </button> */}
            </div>
            <div className="introduction-third relative h-[24rem] w-full xl:w-[28rem] rounded-3xl overflow-hidden shadow-xl">
                <Image 
                    src={JobMeeting.src} 
                    alt="professional-asian-businesswoman" 
                    fill 
                    className="object-cover"
                />
            </div>
        </div>
    );
    }
