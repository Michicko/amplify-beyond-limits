import { useState, useEffect } from 'react';

export default function Slider() {
  const slides = [
    { textLine1: "WELCOME TO", textLine2: "BEYOND LIMITS FA",image: "/images/tcc23.jpg" },
    { textLine1: "WELCOME TO", textLine2: "BEYOND LIMITS FA", image: "/images/ysfon.jpg" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider">
      <div
        className="slider-background"
        style={{ backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(${slides[currentSlide].image})` }}>
        <div className="slider-text">
          <h1 className="line1">{slides[currentSlide].textLine1}</h1>
          <h2 className="line2">{slides[currentSlide].textLine2}</h2>
        </div>
      </div>

      {/* Add navigation controls */}
      <button className="prev-slide" onClick={prevSlide}>❮</button>
      <button className="next-slide" onClick={nextSlide}>❯</button>
    </div>
  );
}