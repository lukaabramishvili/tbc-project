'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function yourCourses() {
    
    const { language } = useLanguage();

    return (
        <section className="flex flex-col gap-8 min-h-full items-center justify-center text-center max-w-[136rem] mx-auto p-8 bg-gray-100 dark:bg-[#2C2758] transition-all duration-300">
            <h1 className="text-4xl font-bold text-[#2C2758] dark:text-white">
                {language === "eng" ? "Web Programming Course Syllabus" : "Web Programming-ის კურსის სილაბუსი"}
            </h1>
            
            <div className="w-full max-w-4xl bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 text-start transition-all duration-300">
                <div className="space-y-8 text-gray-100">
                    
                    <div>
                        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2">
                            Front End Development
                        </h2>
                        <ul className="list-disc list-inside mt-3 space-y-2">
                            <li>
                                {language === 'eng' ? "Static website creation" : "სტატიკური ვებ გვერდების შექმნა"}
                            </li>
                            <li>
                                {language === "eng" ? "Web design adaptation from CSS to layout" : "ვებ დიზაინის ადაპტაცია CSS-დან ლეიაუთზე"}
                            </li>
                            <li>
                                {language === 'eng' ? "Website optimization for better performance" : "ვებ გვერდების გაუმჯობესება პერფორმანსისთვის"}
                            </li>
                            <li>
                                {language === 'eng' ? "Basic JavaScript knowledge" : "საწყისი JavaScript-ის ცოდნა"}
                            </li>
                        </ul>
                        <p className="mt-4">{language === 'eng' ? "Learn more about frontend development at " : "შეიტყვეთ მეტი frontend development-ის შესახებ აქ "}
                            <Link href="https://developer.mozilla.org/en-US/" className="text-blue-700 dark:text-blue-400 underline">
                                MDN Web Docs
                            </Link> {language === 'eng' ? "and" : "და"} 
                            <Link href="https://www.freecodecamp.org/" className="text-blue-700 dark:text-blue-400 underline">
                                FreeCodeCamp.
                            </Link>
                        </p>
                    </div>
    
                    <div>
                        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2">
                            React Front End Development
                        </h2>
                        <ul className="list-disc list-inside mt-3 space-y-2">
                            <li>
                                {language === 'eng' ? "Dynamic web application development with React technology" : "დინამიური ვებ აპლიკაციების დაწერა React ტექნოლოგიით"}
                            </li>
                            <li>
                                {language === 'eng' ? "JavaScript programming for modern functionality" : "JavaScript პროგრამირება თანამედროვე ფუნქციონალისთვის"}
                            </li>
                            <li>
                                {language === 'eng' ? "Fullstack app development with React/Firebase technology" : "Fullstack აპლიკაციების დაწერა React/Firebase ტექნოლოგიით"}
                            </li>
                        </ul>
                        <p className="mt-4">Learn React from <a href="https://react.dev/" className="text-blue-700 dark:text-blue-400 underline">React Official Documentation</a> and <a href="https://www.udemy.com/course/react-the-complete-guide-incl-redux/" className="text-blue-700 dark:text-blue-400 underline">Udemy Courses</a>.</p>
                    </div>
    
                    <div>
                        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2">
                            Node.js Backend Development
                        </h2>
                        <ul className="list-disc list-inside mt-3 space-y-2">
                            <li>
                                {language === "eng" ? "Node.js technology usage for server development" : "Node.js ტექნოლოგიის გამოყენება სერვერის დაწერისთვის"}
                            </li>
                            <li>
                                {language === "eng" ? "JavaScript backend skills" : "JavaScript-ის ბექენდ სკილები"}
                            </li>
                            <li>
                                {language === "eng" ? "REST API implementation and project structure creation" : "REST API-ს იმპლემენტაცია და პროექტის სტრუქტურის შექმნა"}
                            </li>
                            <li>
                                {language === "eng" ? "Database setup with supabase" : "supabase-ის მონაცემთა ბაზის დაყენება"}
                            </li>
                            <li>
                                {language === "eng" ? "Advanced testing with unit/integration tests" : "გაფართოებული ტესტირება ერთეული/ინტეგრაციის ტესტებით"}
                            </li>
                        </ul>
                        <p className="mt-4">{language === 'eng' ? "Learn backend development at " : "ისწავლეთ backend development-ი "}
                            <Link href="https://nodejs.org/en/docs/" className="text-blue-700 dark:text-blue-400 underline">
                                Node.js Documentation
                            </Link> {language === 'eng' ? "and" : "და"}
                            <Link href="https://www.mongodb.com/docs/" className="text-blue-700 dark:text-blue-400 underline">
                                MongoDB Docs.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
    
            <div className="w-full max-w-4xl bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 text-start transition-all duration-300">
                <h2 className="text-2xl font-semibold text-center text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                    {language === "eng" ? "How to Learn Frontend Development" : "როგორ შევისწავლოთ ფრონტენდ დეველოპმენტი"}
                </h2>
                <p className="mt-4 text-gray-100">
                    {language === "eng" ? "Learning frontend development requires a structured approach. Follow these steps:" : "სწავლის frontend development-ის განვითარება მოითხოვს სტრუქტურირებულ მიდგომას. მიჰყევით ამ ნაბიჯებს:"}
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-gray-100">
                    <li>{language === 'eng' ? "Start with HTML & CSS: Learn from " : "დაიწყეთ HTML და CSS-ით: ისწავლეთ "} 
                        <Link href="https://developer.mozilla.org/en-US/docs/Learn" className="text-blue-700 dark:text-blue-400 underline">
                            MDN Docs.
                        </Link>
                    </li>
                    <li>{language === 'eng' ? "Understand JavaScript: Explore " : "გაიგე JavaScript: გამოიკვლიე "}
                        <Link href="https://javascript.info/" className="text-blue-700 dark:text-blue-400 underline">
                            JavaScript.info.
                        </Link>
                    </li>
                    <li>
                        {language === 'eng' ? "Practice by building small projects." : "პრაქტიკული სწავლება პროექტების შექმნით."}
                    </li>
                    <li>{language === 'eng' ? "Learn a frontend framework like React: Use " : "ისწავლეთ frontend framework-ი, როგორიცაა React: გამოიყენე "} 
                        <a href="https://react.dev/" className="text-blue-700 dark:text-blue-400 underline">
                            React Docs.
                        </a>
                    </li>
                    <li>{language === "eng" ? "Contribute to open-source projects on" : "წვლილი შეიტანეთ open-source პროექტებში"}
                        <a href="https://github.com/" className="text-blue-700 dark:text-blue-400 underline">
                            GitHub.
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
        }