import { useState, useEffect } from 'react';
import './index.css';
import chrysler  from '../../../public/car-photo.webp';
import infiniti  from '../../../public/infiniti-q60.jpg';
import bmw  from '../../../public/BMW-6.jpg';

const slides = [
  <img src={chrysler.src} alt="Chrysler car" />,
  <img src={infiniti.src} alt="Infiniti Q60" />,
  <img src={bmw.src} alt="BMW 6" />,
];

export default function Home() {
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
    <main className='flex flex-col items-center justify-center w-full bg-gray-200 text-center '>
      <h2 className='text-3xl'>Welcome to Our Website!</h2>
      <div className='relative w-full max-h-[calc(100vh-12.875rem)] my-4 overflow-hidden bg-gray-300'>
        <div className='homeSlide min-w-full transition-opacity duration-500 ease-in-out'>
          {slides[currentSlide]}
        </div>
        <button className='absolute top-[40%] left-8 p-8 bg-white bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-black hover:text-white' onClick={prevSlide}>
          &#10094;
        </button>
        <button className='absolute top-[40%] right-8 p-8 bg-white bg-opacity-70 border-none cursor-pointer transition-colors duration-200 hover:bg-black hover:text-white' onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </main>
  );
}
