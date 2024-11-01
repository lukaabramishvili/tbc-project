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
    <main className='homeContainer'>
      <h2>Welcome to Our Website!</h2>
      <div className='homeSlider'>
        <div className='homeSlide'>
          {slides[currentSlide]}
        </div>
        <button className='prev' onClick={prevSlide}>
          &#10094;
        </button>
        <button className='next' onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </main>
  );
}
