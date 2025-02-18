import { useState, useEffect } from "react";

export default function Slider() {
  const slides = [
    {
      textLine1: "WELCOME TO",
      textLine2: "BEYOND LIMITS FA",
      image: "/images/tcc23.jpg",
    },
    {
      textLine1: "WELCOME TO",
      textLine2: "BEYOND LIMITS FA",
      image: "/images/ysfon.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const currentSlide = slides[index];

  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="slider">
      <div
        className="slider-background"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(${currentSlide.image})`,
        }}
      >
        <div className="slider-text">
          <h1 className="line1">{currentSlide.textLine1}</h1>
          <h2 className="line2">{currentSlide.textLine2}</h2>
        </div>
      </div>

      {/* Add navigation controls */}
      <button className="prev-slide" onClick={prevSlide}>
        ❮
      </button>
      <button className="next-slide" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}
