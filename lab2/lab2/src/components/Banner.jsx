import React, { useState, useEffect } from 'react';
import banner from '../images/banner.png';
import banner1 from '../images/banner1.png';
import banner2 from '../images/banner2.png';
import banner3 from '../images/banner3.png';
import banner4 from '../images/banner4.png';

export default function Banner() {
  const slides = [
    {
      title: "Neapolitan Pizza",
      description: "If you are looking for a traditional Italian pizza, the Neapolitan is the best option!",
      image: banner
    },
    {
      title: "Delicious Pizza",
      description: "Discover our amazing selection of handcrafted pizzas with fresh ingredients.",
      image: banner1
    },
    {
      title: "Authentic Italian",
      description: "Experience the authentic taste of Italy with our traditional recipes.",
      image: banner2
    },
    {
      title: "Fresh & Tasty",
      description: "Made with the freshest ingredients and baked to perfection.",
      image: banner3
    },
    {
      title: "Gourmet Selection",
      description: "Premium pizzas crafted by our expert chefs for the ultimate taste.",
      image: banner4
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="position-relative" style={{ 
      backgroundImage: `url(${slides[currentSlide].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '500px',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-image 0.5s ease-in-out'
    }}>
      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
      
      {/* Navigation Arrows */}
      <button 
        className="btn position-absolute start-0 ms-3" 
        style={{ 
          top: '50%', 
          transform: 'translateY(-50%)', 
          zIndex: 10,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          color: 'white',
          fontSize: '24px',
          padding: '10px'
        }}
        onClick={prevSlide}
      >
        ◀
      </button>
      
      <button 
        className="btn position-absolute end-0 me-3" 
        style={{ 
          top: '50%', 
          transform: 'translateY(-50%)', 
          zIndex: 10,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          color: 'white',
          fontSize: '24px',
          padding: '10px'
        }}
        onClick={nextSlide}
      >
        ▶
      </button>

      {/* Content */}
      <div className="container position-relative text-white text-center">
        <h1 className="display-3 fw-bold mb-3">{slides[currentSlide].title}</h1>
        <p className="lead mb-4">
          {slides[currentSlide].description}
        </p>
        
        {/* Dots Indicator */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm rounded-circle ${
                index === currentSlide ? 'btn-light' : 'btn-outline-light'
              }`}
              style={{ width: '12px', height: '12px', padding: 0 }}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}