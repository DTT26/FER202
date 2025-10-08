import React from "react";
import { Carousel, Badge } from "react-bootstrap";
import { carouselMovies } from "../../data/carousel";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;

  return (
    <div className="home-carousel">
      <Carousel interval={3000} pause={false} data-bs-theme="dark">
        {carouselMovies.map((m) => (
          <Carousel.Item key={m.id}>
            <img
              className="d-block w-100 carousel-poster"
              src={m.poster}
              alt={m.title}
            />
            <Carousel.Caption
              className="text-start carousel-caption-custom"
            >
              <h3 className="mb-1">
                {m.title} {" "}
                <Badge bg="info" className="text-dark">{m.genre}</Badge>{" "}
                <Badge bg="secondary">{m.year}</Badge>
              </h3>
              <p className="mb-0" style={{ fontSize: "0.95rem" }}>{m.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
