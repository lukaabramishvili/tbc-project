'use client'

import { useState, useEffect } from "react";
import light from '../../../../public/sun.png';
import eng from '../../../../public/united-states.png';
import geo from '../../../../public/geo.png';

const LanguageToggle = () => {
    const [language, setLanguage] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'eng') {
            setLanguage(true);
        } else {
            setLanguage(false);
        }
    }, []);

    useEffect(() => {
        if (language) {
            document.documentElement.classList.add('eng');
            localStorage.setItem('language', 'eng');
        } else {
            document.documentElement.classList.remove('eng');
            localStorage.setItem('theme', 'geo');
        }
    }, [language]);

    console.log(language);
    

    return (
        <div 
            className="flex items-center justify-center pl-10 cursor-pointer dark:bg-transparent bg-transparent rounded-full"
            onClick={() => setLanguage(!language)}
        >
            {language ? <img className="w-10" src={eng.src} alt="dark" /> : <img className="w-10" src={geo.src} alt="light" />}
        </div>
    );
};

export default LanguageToggle;
