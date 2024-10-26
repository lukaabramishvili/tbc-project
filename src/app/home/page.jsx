import { useState } from 'react';
import './index.css';
import { authUser } from '../services/authService';

const slides = [
  'Slide 1 Content',
  'Slide 2 Content',
  'Slide 3 Content'
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };  

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
