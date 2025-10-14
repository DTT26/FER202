import React from 'react';
import { Carousel } from 'react-bootstrap';
import { carouselMovies } from '../../data/carousel';
import './HomeCarousel.css';

export default function HomeCarousel() {
  return (
    <div className="home-carousel-wrapper mb-4">
      <Carousel 
        controls={true} 
        indicators={true} 
        interval={3000}
        fade
      >
        {carouselMovies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              className="d-block w-100 carousel-image"
              src={movie.poster}
              alt={movie.title}
              style={{ 
                height: '500px', 
                objectFit: 'cover',
                borderRadius: '0'
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}